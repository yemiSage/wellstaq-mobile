import { theme } from "@/theme";

export const authStyleGuide = {
  titleVariant: "h4" as const,
  titleWeight: "bold" as const,
  bodyText: {
    fontSize: 15,
    lineHeight: 22.5
  },
  footerSpacing: theme.spacing["2xl"]
} as const;
