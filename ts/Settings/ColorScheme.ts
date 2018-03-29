namespace MidnightLizard.Settings
{
    export type ColorSchemePropertyName = keyof ColorScheme;

    export const excludeSettingsForExport: Settings.ColorSchemePropertyName[] =
        ["isEnabled", "exist", "hostName", "userColorSchemes"];

    export const excludeSettingsForSave: Settings.ColorSchemePropertyName[] =
        ["isEnabled", "exist", "hostName", "colorSchemeName", "userColorSchemes"];

    /**
     * ColorScheme - MidnightLizard Settings
     */
    export interface ColorScheme
    {
        userColorSchemes?: Array<ColorScheme>;
        colorSchemeId: ColorSchemeName;
        colorSchemeName: string;
        exist?: boolean;
        hostName?: string;
        isEnabled?: boolean;
        blueFilter: number;

        useDefaultSchedule: boolean;
        scheduleStartHour: number;
        scheduleFinishHour: number

        runOnThisSite: boolean;
        restoreColorsOnCopy: boolean;

        backgroundSaturationLimit: number;
        backgroundContrast: number;
        backgroundLightnessLimit: number;
        backgroundGraySaturation: number;
        backgroundGrayHue: number;
        backgroundReplaceAllHues: boolean;

        buttonSaturationLimit: number;
        buttonContrast: number;
        buttonLightnessLimit: number;
        buttonGraySaturation: number;
        buttonGrayHue: number;
        buttonReplaceAllHues: boolean;

        textSaturationLimit: number;
        textContrast: number;
        textLightnessLimit: number;
        textGraySaturation: number;
        textGrayHue: number;
        textSelectionHue: number;
        textReplaceAllHues: boolean;

        linkSaturationLimit: number;
        linkContrast: number;
        linkLightnessLimit: number;
        linkDefaultSaturation: number;
        linkDefaultHue: number;
        linkVisitedHue: number;
        linkReplaceAllHues: boolean;

        borderSaturationLimit: number;
        borderContrast: number;
        borderLightnessLimit: number;
        borderGraySaturation: number;
        borderGrayHue: number;
        borderReplaceAllHues: boolean;

        imageLightnessLimit: number;
        imageSaturationLimit: number;
        useImageHoverAnimation: boolean;

        backgroundImageLightnessLimit: number;
        backgroundImageSaturationLimit: number;

        scrollbarSaturationLimit: number;
        scrollbarContrast: number;
        scrollbarLightnessLimit: number;
        scrollbarGrayHue: number;
        scrollbarSize: number;
    }
}