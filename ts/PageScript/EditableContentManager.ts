namespace MidnightLizard.PageScript
{
    export class EditableContentManager
    {
        private readonly _newElementsObserverConfig: MutationObserverInit = {
            subtree: true, childList: true
        };
        constructor() { }

        public beginEditableContentHandling(doc: Document)
        {
            doc.addEventListener("DOMContentLoaded", () =>
            {
                doc.querySelectorAll('[contenteditable="true"]').forEach(tag =>
                {
                    this.overrideInnerHtml(tag as HTMLElement);
                });
            });
            new MutationObserver(this.newElementsObserverCallback.bind(this))
                .observe(doc.documentElement, this._newElementsObserverConfig);
        }

        private newElementsObserverCallback(mutations: MutationRecord[], observer: MutationObserver)
        {
            for (const mutation of mutations)
            {
                if (mutation.target instanceof HTMLElement &&
                    mutation.target.contentEditable === "true")
                {
                    this.overrideInnerHtml(mutation.target);
                }
            }
        }

        private overrideInnerHtml(tag: HTMLElement)
        {
            if (!tag.innerHtmlGetter)
            {
                tag.innerHtmlGetter = tag.__lookupGetter__<string>('innerHTML');
                Object.defineProperty(tag, "innerHTML",
                    {
                        get: this.getInnerHtml.bind(null, tag),
                        set: tag.__lookupSetter__('innerHTML').bind(tag)
                    });
            }
        }

        private getInnerHtml(tag: HTMLElement)
        {
            if (!tag.innerHtmlCache || Date.now() - tag.innerHtmlCache.timestamp > 1000)
            {
                tag.dispatchEvent(new CustomEvent("before-get-inner-html", { bubbles: true }));
                tag.innerHtmlCache = { timestamp: Date.now(), value: tag.innerHtmlGetter() };
                tag.dispatchEvent(new CustomEvent("after-get-inner-html", { bubbles: false }));
            }
            return tag.innerHtmlCache.value;
        }
    }
}

declare interface Node
{
    __lookupGetter__<T>(propertyName: string): () => T;
    __lookupSetter__<T>(propertyName: string): (value: T) => void;
    innerHtmlGetter: () => string;
    innerHtmlCache: { value: string, timestamp: number };
}