import { ReactNode } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react-native";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { OnboardingProgressBar } from "@/components/ui/onboarding-progress";
import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

export const onboardingUi = {
  horizontalPadding: 14,
  topPadding: 8,
  fieldGap: 4,
  sectionGap: 20,
  headerGap: 32,
  controlHeight: 44,
  radius: 8,
  topRowBottom: 18
} as const;

export function OnboardingTopBar({
  progress,
  onBack
}: {
  progress: number;
  onBack: () => void;
}) {
  return (
    <View style={styles.topRow}>
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
        <ChevronLeft size={24} color="#202020" />
      </Pressable>
      <View style={styles.progressWrap}>
        <OnboardingProgressBar progress={progress} />
      </View>
      <View style={styles.backSpacer} />
    </View>
  );
}

export function OnboardingHeader({
  title,
  subtitle,
  compact = false
}: {
  title: string;
  subtitle: string;
  compact?: boolean;
}) {
  return (
    <View style={[styles.headerBlock, compact && styles.headerBlockCompact]}>
      <AppText style={styles.headerTitle}>{title}</AppText>
      <AppText style={styles.headerSubtitle}>{subtitle}</AppText>
    </View>
  );
}

export function OnboardingFieldLabel({
  children,
  required
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <View style={styles.labelRow}>
      {required ? <AppText style={styles.requiredMark}>*</AppText> : null}
      <AppText style={styles.fieldLabel}>{children}</AppText>
    </View>
  );
}

export function OnboardingFieldShell({
  children,
  disabled = false,
  onPress
}: {
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
}) {
  const content = (
    <View style={[styles.fieldShell, disabled ? styles.fieldShellDisabled : styles.fieldShellDefault]}>
      {children}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

export function OnboardingTextInput({
  value,
  onChangeText,
  placeholder
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#7D7D7D"
      style={styles.textInput}
    />
  );
}

export function OnboardingSelectValue({
  value,
  placeholder
}: {
  value?: string | null;
  placeholder: string;
}) {
  return (
    <>
      <AppText style={styles.valueText}>{value || placeholder}</AppText>
      <ChevronDown size={18} color="#5F5F5F" />
    </>
  );
}

export function OnboardingPrimaryCta({
  label,
  disabled,
  onPress
}: {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.ctaButton,
        disabled && styles.ctaButtonDisabled,
        pressed && !disabled && styles.pressed
      ]}
    >
      <AppText style={styles.ctaText}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: onboardingUi.horizontalPadding,
    paddingVertical: onboardingUi.topPadding,
    gap: 4,
    marginBottom: onboardingUi.topRowBottom
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  backSpacer: {
    width: 24,
    height: 24
  },
  progressWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerBlock: {
    paddingHorizontal: onboardingUi.horizontalPadding,
    gap: 0,
    marginBottom: onboardingUi.headerGap
  },
  headerBlockCompact: {
    marginBottom: 32
  },
  headerTitle: {
    fontFamily: "BricolageGrotesqueBold",
    fontSize: theme.typography.h4.fontSize,
    lineHeight: theme.typography.h4.lineHeight,
    color: "#202020"
  },
  headerSubtitle: {
    fontFamily: "Inter",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#5F5F5F"
  },
  fieldLabel: {
    fontFamily: "InterMedium",
    fontSize: 16,
    lineHeight: 24,
    color: "#202020"
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  requiredMark: {
    fontFamily: "InterMedium",
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.error[1]
  },
  fieldShell: {
    height: onboardingUi.controlHeight,
    borderRadius: onboardingUi.radius,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  fieldShellDefault: {
    backgroundColor: "#F8F8F8"
  },
  fieldShellDisabled: {
    backgroundColor: "#F2F2F2"
  },
  textInput: {
    flex: 1,
    height: onboardingUi.controlHeight,
    fontFamily: "Inter",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#7D7D7D",
    paddingVertical: 0,
    textAlignVertical: "center",
    includeFontPadding: false
  },
  valueText: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#7D7D7D"
  },
  ctaButton: {
    height: onboardingUi.controlHeight,
    borderRadius: onboardingUi.radius,
    backgroundColor: theme.colors.primary[1],
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  ctaButtonDisabled: {
    opacity: 0.4
  },
  ctaText: {
    fontFamily: "InterMedium",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#FAFAFA"
  },
  pressed: {
    opacity: 0.9
  }
});
