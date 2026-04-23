export const colors = {
  auth: {
    background: "#FDFBF8",
    surface: "#FFFFFF",
    accent: "#F4D6C6",
    accentMuted: "#F8E7DE",
    mint: "#DFF3EA",
    textPrimary: "#1A1A1A",
    textSecondary: "#7A7A7A",
    inputBackground: "#F3F3F3",
    borderSoft: "#EEE7E1"
  },
  primary: {
    1: "#EA6A05",
    2: "#FCAA69",
    3: "#FDC69B",
    4: "#FEE3CD",
    5: "#FFF9F5"
  },
  secondary: {
    1: "#37B047",
    2: "#77D483",
    3: "#B1E7B8",
    4: "#ECF9ED",
    5: "#F7FDF8"
  },
  grey: {
    1: "#373737",
    2: "#4D4D4D",
    3: "#999999",
    4: "#E6E6E6",
    5: "#FAFAFA",
    0: "#FFFFFF"
  },
  error: {
    1: "#CC2900",
    2: "#FF5C33",
    3: "#FFAD99",
    4: "#FFD6CC",
    5: "#FFEFEB"
  },
  success: {
    1: "#008500",
    2: "#00FF00",
    3: "#99FF99",
    4: "#CCFFCC",
    5: "#E5FFE5"
  },
  info: {
    1: "#FF9E2F",
    2: "#FFCF99",
    3: "#FFE7CC",
    4: "#FFF3E5",
    5: "#FFFAF5"
  },
  overlay: "rgba(26, 26, 26, 0.04)"
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40
} as const;

export const radii = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  pill: 999
} as const;

export const typography = {
  fontFamily: {
    heading: "BricolageGrotesque",
    body: "Inter"
  },
  h1: { fontSize: 52, lineHeight: 60, letterSpacing: -1.04 },
  h2: { fontSize: 36, lineHeight: 44, letterSpacing: -0.72 },
  h3: { fontSize: 30, lineHeight: 38, letterSpacing: 0 },
  h4: { fontSize: 24, lineHeight: 32, letterSpacing: 0 },
  h5: { fontSize: 20, lineHeight: 30, letterSpacing: 0 },
  subheading: { fontSize: 16, lineHeight: 24, letterSpacing: 0 },
  body: { fontSize: 14, lineHeight: 20, letterSpacing: 0 },
  caption: { fontSize: 12, lineHeight: 18, letterSpacing: 0 }
} as const;

export const shadows = {
  card: {
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2
  },
  authCard: {
    shadowColor: "#7A624C",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2
  }
} as const;
