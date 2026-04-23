import { ReactNode } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

import { theme } from "@/theme";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "subheading" | "body" | "caption";
type Weight = "regular" | "medium" | "semibold" | "bold";

interface AppTextProps extends TextProps {
  children: ReactNode;
  variant?: Variant;
  weight?: Weight;
  color?: string;
}

const variantMap = {
  h1: theme.typography.h1,
  h2: theme.typography.h2,
  h3: theme.typography.h3,
  h4: theme.typography.h4,
  h5: theme.typography.h5,
  subheading: theme.typography.subheading,
  body: theme.typography.body,
  caption: theme.typography.caption
};

const weightMap = {
  regular: "Inter",
  medium: "InterMedium",
  semibold: "InterSemiBold",
  bold: "InterBold"
} as const;

export function AppText({ children, variant = "body", weight = "regular", color = theme.colors.grey[1], style, ...props }: AppTextProps) {
  const isHeading = ["h1", "h2", "h3", "h4", "h5"].includes(variant);

  return (
    <Text
      {...props}
      style={[
        styles.base,
        variantMap[variant],
        {
          color,
          fontFamily: isHeading ? (weight === "bold" ? "BricolageGrotesqueBold" : "BricolageGrotesque") : weightMap[weight]
        },
        style
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: theme.colors.grey[1]
  }
});
