import { ReactNode } from "react";
import { Pressable, StyleSheet, Switch, TextInput, View } from "react-native";

import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  helperText,
  multiline
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "email-address" | "number-pad";
  helperText?: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.fieldGroup}>
      <AppText variant="subheading" weight="semibold">
        {label}
      </AppText>
      <TextInput
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.grey[3]}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline]}
      />
      {helperText ? <HelperText>{helperText}</HelperText> : null}
    </View>
  );
}

export function OtpField({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) {
  return (
    <TextField
      label="Verification code"
      placeholder="Enter the 6-digit code"
      keyboardType="number-pad"
      value={value}
      onChangeText={onChangeText}
      helperText="For demo purposes, use 123456."
    />
  );
}

export function SelectField({ label, value, helperText }: { label: string; value: string; helperText?: string }) {
  return (
    <View style={styles.fieldGroup}>
      <AppText variant="subheading" weight="semibold">
        {label}
      </AppText>
      <View style={styles.input}>
        <AppText color={value ? theme.colors.grey[1] : theme.colors.grey[3]}>{value || "Selection ready for design-mapped picker"}</AppText>
      </View>
      {helperText ? <HelperText>{helperText}</HelperText> : null}
    </View>
  );
}

export function ChipGroup({
  label,
  options,
  selected,
  onToggle
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <View style={styles.fieldGroup}>
      <AppText variant="subheading" weight="semibold">
        {label}
      </AppText>
      <View style={styles.chipWrap}>
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <Pressable key={option} onPress={() => onToggle(option)} style={[styles.chip, active && styles.chipActive]}>
              <AppText color={active ? theme.colors.primary[1] : theme.colors.grey[2]} weight={active ? "semibold" : "regular"}>
                {option}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function ToggleRow({ title, description, value, onValueChange }: { title: string; description: string; value: boolean; onValueChange: (value: boolean) => void }) {
  return (
    <View style={styles.toggleRow}>
      <View style={{ flex: 1 }}>
        <AppText weight="semibold">{title}</AppText>
        <AppText color={theme.colors.grey[2]}>{description}</AppText>
      </View>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ true: theme.colors.secondary[2], false: theme.colors.grey[4] }} />
    </View>
  );
}

export function HelperText({ children }: { children: ReactNode }) {
  return (
    <AppText variant="caption" color={theme.colors.grey[3]}>
      {children}
    </AppText>
  );
}

const styles = StyleSheet.create({
  fieldGroup: {
    gap: theme.spacing.sm
  },
  input: {
    height: 44,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.grey[4],
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.grey[0],
    justifyContent: "center",
    fontFamily: "Inter",
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.grey[1]
  },
  multiline: {
    height: 88,
    textAlignVertical: "top"
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm
  },
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.grey[0],
    borderWidth: 1,
    borderColor: theme.colors.grey[4]
  },
  chipActive: {
    backgroundColor: theme.colors.primary[5],
    borderColor: theme.colors.primary[3]
  },
  toggleRow: {
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.grey[0],
    padding: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md
  }
});
