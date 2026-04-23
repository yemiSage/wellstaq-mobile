import { theme } from "@/theme";

export const authStyleGuide = {
  titleVariant: "h4" as const,
  titleWeight: "bold" as const,
  bodyText: {
    fontSize: 14,
    lineHeight: 20
  },
  footerSpacing: theme.spacing["2xl"]
} as const;
