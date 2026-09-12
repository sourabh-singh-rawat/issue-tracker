export type PineTypeStyle = {
  fontWeight: number;
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
};

export type PineTypographyRoles = {
  displayLarge: PineTypeStyle;
  displayLargeEmphasized: PineTypeStyle;
  displayMedium: PineTypeStyle;
  displayMediumEmphasized: PineTypeStyle;
  displaySmall: PineTypeStyle;
  displaySmallEmphasized: PineTypeStyle;
  headlineLarge: PineTypeStyle;
  headlineLargeEmphasized: PineTypeStyle;
  headlineMedium: PineTypeStyle;
  headlineMediumEmphasized: PineTypeStyle;
  headlineSmall: PineTypeStyle;
  headlineSmallEmphasized: PineTypeStyle;
  titleLarge: PineTypeStyle;
  titleLargeEmphasized: PineTypeStyle;
  titleMedium: PineTypeStyle;
  titleMediumEmphasized: PineTypeStyle;
  titleSmall: PineTypeStyle;
  titleSmallEmphasized: PineTypeStyle;
  bodyLarge: PineTypeStyle;
  bodyLargeEmphasized: PineTypeStyle;
  bodyMedium: PineTypeStyle;
  bodyMediumEmphasized: PineTypeStyle;
  bodySmall: PineTypeStyle;
  bodySmallEmphasized: PineTypeStyle;
  labelLarge: PineTypeStyle;
  labelLargeEmphasized: PineTypeStyle;
  labelMedium: PineTypeStyle;
  labelMediumEmphasized: PineTypeStyle;
  labelSmall: PineTypeStyle;
  labelSmallEmphasized: PineTypeStyle;
};

const style = (
  fontWeight: number,
  fontSize: string,
  lineHeight: number,
  letterSpacing: string,
): PineTypeStyle => ({
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
});

export const pineTypography = {
  displayLarge: style(400, "3.5625rem", 1.12, "-0.015625rem"),
  displayLargeEmphasized: style(500, "3.5625rem", 1.12, "-0.015625rem"),
  displayMedium: style(400, "2.8125rem", 1.16, "0"),
  displayMediumEmphasized: style(500, "2.8125rem", 1.16, "0"),
  displaySmall: style(400, "2.25rem", 1.22, "0"),
  displaySmallEmphasized: style(500, "2.25rem", 1.22, "0"),
  headlineLarge: style(400, "2rem", 1.25, "0"),
  headlineLargeEmphasized: style(500, "2rem", 1.25, "0"),
  headlineMedium: style(400, "1.75rem", 1.29, "0"),
  headlineMediumEmphasized: style(500, "1.75rem", 1.29, "0"),
  headlineSmall: style(400, "1.5rem", 1.33, "0"),
  headlineSmallEmphasized: style(500, "1.5rem", 1.33, "0"),
  titleLarge: style(400, "1.375rem", 1.27, "0"),
  titleLargeEmphasized: style(500, "1.375rem", 1.27, "0"),
  titleMedium: style(500, "1rem", 1.5, "0.009375rem"),
  titleMediumEmphasized: style(600, "1rem", 1.5, "0.009375rem"),
  titleSmall: style(500, "0.875rem", 1.43, "0.00625rem"),
  titleSmallEmphasized: style(600, "0.875rem", 1.43, "0.00625rem"),
  bodyLarge: style(400, "1rem", 1.5, "0.03125rem"),
  bodyLargeEmphasized: style(500, "1rem", 1.5, "0.03125rem"),
  bodyMedium: style(400, "0.875rem", 1.43, "0.015625rem"),
  bodyMediumEmphasized: style(500, "0.875rem", 1.43, "0.015625rem"),
  bodySmall: style(400, "0.75rem", 1.33, "0.025rem"),
  bodySmallEmphasized: style(500, "0.75rem", 1.33, "0.025rem"),
  labelLarge: style(500, "0.875rem", 1.43, "0.00625rem"),
  labelLargeEmphasized: style(600, "0.875rem", 1.43, "0.00625rem"),
  labelMedium: style(500, "0.75rem", 1.33, "0.03125rem"),
  labelMediumEmphasized: style(600, "0.75rem", 1.33, "0.03125rem"),
  labelSmall: style(500, "0.6875rem", 1.45, "0.03125rem"),
  labelSmallEmphasized: style(600, "0.6875rem", 1.45, "0.03125rem"),
} satisfies PineTypographyRoles;
