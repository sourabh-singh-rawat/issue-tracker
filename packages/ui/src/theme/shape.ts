import "./mui-augmentation";

export type PineShape = {
  borderRadiusNone: string;
  borderRadiusExtraSmall: string;
  borderRadiusSmall: string;
  borderRadiusMedium: string;
  borderRadiusLarge: string;
  borderRadiusLargeIncreased: string;
  borderRadiusExtraLarge: string;
  borderRadiusExtraLargeIncreased: string;
  borderRadiusExtraExtraLarge: string;
  borderRadiusRounded: string;
};

export const pineShape = {
  borderRadiusNone: "0",
  borderRadiusExtraSmall: "0.25rem",
  borderRadiusSmall: "0.2rem",
  borderRadiusMedium: "0.4rem",
  borderRadiusLarge: "0.6rem",
  borderRadiusLargeIncreased: "1.25rem",
  borderRadiusExtraLarge: "1rem",
  borderRadiusExtraLargeIncreased: "2rem",
  borderRadiusExtraExtraLarge: "1.6rem",
  borderRadiusRounded: "9000px",
} satisfies PineShape;

type ThemeShapeSource = {
  shape: {
    borderRadius?: string | number;
    borderRadiusMedium?: string | number;
  };
};

export const themeBorderRadiusMedium = (theme: ThemeShapeSource): string | number =>
  theme.shape.borderRadiusMedium ?? theme.shape.borderRadius ?? pineShape.borderRadiusMedium;
