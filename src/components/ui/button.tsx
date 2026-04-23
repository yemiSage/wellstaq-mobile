import { ActivityIndicator, Pressable, StyleSheet, ViewStyle } from "react-native";
import { ReactNode } from "react";

import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  style?: ViewStyle;
}

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <ButtonBase {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <ButtonBase {...props} variant="secondary" />;
}

export function IconButton({ label, icon, ...props }: ButtonProps) {
  return <ButtonBase {...props} label={label} icon={icon} variant="secondary" />;
}

function ButtonBase({ label, onPress, disabled, loading, icon, variant = "primary", style }: ButtonProps) {
  const styleMap = {
    primary: styles.primary,
    secondary: styles.secondary,
    ghost: styles.ghost
  };
  const textColor = variant === "primary" ? theme.colors.grey[0] : theme.colors.grey[1];

  return (
    <Pressable disabled={disabled || loading} onPress={onPress} style={({ pressed }) => [styles.base, styleMap[variant], disabled && variant === "primary" && styles.primaryDisabled, pressed && styles.pressed, style]}>
      {loading ? <ActivityIndicator color={textColor} /> : icon}
      <AppText color={textColor} variant="subheading" weight="medium">
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 44,
    borderRadius: theme.radii.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl
  },
  primary: {
    backgroundColor: theme.colors.primary[1]
  },
  primaryDisabled: {
    backgroundColor: theme.colors.primary[4]
  },
  secondary: {
    backgroundColor: theme.colors.grey[0],
    borderWidth: 1,
    borderColor: theme.colors.grey[4]
  },
  ghost: {
    backgroundColor: "transparent"
  },
  pressed: {
    opacity: 0.92
  }
});
