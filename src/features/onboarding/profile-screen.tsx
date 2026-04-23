import { router } from "expo-router";
import { ChevronDown, ChevronLeft } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/ui/button";
import { OnboardingProgressBar } from "@/components/ui/onboarding-progress";
import { SelectionSheet, SelectionSheetOption } from "@/components/ui/selection-sheet";
import { AppText } from "@/components/ui/text";
import { onboardingRepository } from "@/services/mock/repositories";
import { useSessionStore } from "@/state/session-store";
import { theme } from "@/theme";

const COUNTRIES: SelectionSheetOption[] = [
  { value: "afghanistan", label: "Afghanistan", leading: <AppText>{"\u{1F1E6}\u{1F1EB}"}</AppText> },
  { value: "albania", label: "Albania", leading: <AppText>{"\u{1F1E6}\u{1F1F1}"}</AppText> },
  { value: "algeria", label: "Algeria", leading: <AppText>{"\u{1F1E9}\u{1F1FF}"}</AppText> },
  { value: "andora", label: "Andora", leading: <AppText>{"\u{1F1E6}\u{1F1E9}"}</AppText> },
  { value: "angola", label: "Angola", leading: <AppText>{"\u{1F1E6}\u{1F1F4}"}</AppText> },
  { value: "armenia", label: "Armenia", leading: <AppText>{"\u{1F1E6}\u{1F1F2}"}</AppText> },
  { value: "brazil", label: "Brazil", leading: <AppText>{"\u{1F1E7}\u{1F1F7}"}</AppText> }
];

const STATES: Record<string, SelectionSheetOption[]> = {
  afghanistan: [
    { value: "kabul", label: "Kabul" },
    { value: "kandahar", label: "Kandahar" }
  ],
  albania: [
    { value: "tirana", label: "Tirana" },
    { value: "durres", label: "Durres" }
  ],
  algeria: [
    { value: "algiers", label: "Algiers" },
    { value: "oran", label: "Oran" }
  ],
  andora: [
    { value: "andorra-la-vella", label: "Andorra la Vella" }
  ],
  angola: [
    { value: "luanda", label: "Luanda" },
    { value: "benguela", label: "Benguela" }
  ],
  armenia: [
    { value: "yerevan", label: "Yerevan" }
  ],
  brazil: [
    { value: "sao-paulo", label: "Sao Paulo" },
    { value: "rio-de-janeiro", label: "Rio de Janeiro" }
  ]
};

type SheetType = "country" | "state" | null;

export function ProfileScreen() {
  const session = useSessionStore((state) => state.session);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState<SelectionSheetOption | null>(null);
  const [stateOption, setStateOption] = useState<SelectionSheetOption | null>(null);
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);

  const filteredCountries = useMemo(
    () => COUNTRIES.filter((item) => item.label.toLowerCase().includes(countrySearch.trim().toLowerCase())),
    [countrySearch]
  );

  const availableStates = useMemo(() => {
    const source = country ? STATES[country.value] ?? [] : [];
    return source.filter((item) => item.label.toLowerCase().includes(stateSearch.trim().toLowerCase()));
  }, [country, stateSearch]);

  const isDisabled = !firstName.trim() || !lastName.trim() || !country || !stateOption;

  async function handleContinue() {
    if (!country || !stateOption) {
      return;
    }

    await onboardingRepository.saveProfileStep({
      fullName: `${firstName.trim()} ${lastName.trim()}`.trim(),
      primaryCity: stateOption.label,
      workSetup: "hybrid"
    });
    router.push("/(onboarding)/baseline");
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <View style={styles.topRow}>
            <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={28} color={theme.colors.grey[1]} />
            </Pressable>
            <View style={styles.progressWrap}>
              <OnboardingProgressBar segments={3} activeSegments={1} />
            </View>
          </View>

          <View style={styles.headerBlock}>
            <AppText variant="h4" weight="bold" style={styles.title}>
              Personal Information
            </AppText>
            <AppText color="#676767" style={styles.subtitle}>
              Please provide your accurate personal information.
            </AppText>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <FieldLabel label="Email address" />
              <View style={[styles.inputShell, styles.disabledShell]}>
                <AppText color="#8F8F8F" style={styles.inputText}>
                  {session?.email ?? "user@example.com"}
                </AppText>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <FieldLabel label="First name" />
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                placeholderTextColor="#8F8F8F"
                style={styles.textInput}
              />
            </View>

            <View style={styles.fieldGroup}>
              <FieldLabel label="Last name" />
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                placeholderTextColor="#8F8F8F"
                style={styles.textInput}
              />
            </View>

            <View style={styles.fieldGroup}>
              <FieldLabel label="Country of residence" />
              <Pressable accessibilityRole="button" onPress={() => setActiveSheet("country")} style={({ pressed }) => [styles.selectShell, pressed && styles.pressed]}>
                <AppText color={country ? theme.colors.grey[1] : "#8F8F8F"} style={styles.inputText}>
                  {country?.label ?? "Select country"}
                </AppText>
                <ChevronDown size={26} color="#676767" />
              </Pressable>
            </View>

            <View style={styles.fieldGroup}>
              <FieldLabel label="State" />
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  if (!country) {
                    return;
                  }
                  setActiveSheet("state");
                }}
                style={({ pressed }) => [styles.selectShell, pressed && styles.pressed, !country && styles.disabledSelect]}
              >
                <AppText color={stateOption ? theme.colors.grey[1] : "#8F8F8F"} style={styles.inputText}>
                  {stateOption?.label ?? "Select state"}
                </AppText>
                <ChevronDown size={26} color="#676767" />
              </Pressable>
            </View>
          </View>

          <View style={styles.footer}>
            <PrimaryButton label="Continue" onPress={() => void handleContinue()} disabled={isDisabled} style={styles.footerButton} />
          </View>
        </View>
      </SafeAreaView>

      <SelectionSheet
        visible={activeSheet === "country"}
        title="Country"
        searchPlaceholder="Search Country"
        searchValue={countrySearch}
        onSearchChange={setCountrySearch}
        options={filteredCountries}
        selectedValue={country?.value}
        onSelect={(value) => {
          const next = COUNTRIES.find((item) => item.value === value) ?? null;
          setCountry(next);
          setStateOption(null);
          setCountrySearch("");
        }}
        onClose={() => setActiveSheet(null)}
      />

      <SelectionSheet
        visible={activeSheet === "state"}
        title="State/Province"
        searchPlaceholder="Search State or Province"
        searchValue={stateSearch}
        onSearchChange={setStateSearch}
        options={availableStates}
        selectedValue={stateOption?.value}
        onSelect={(value) => {
          const next = availableStates.find((item) => item.value === value) ?? null;
          setStateOption(next);
          setStateSearch("");
        }}
        onClose={() => setActiveSheet(null)}
      />
    </>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <AppText weight="medium" style={styles.fieldLabel}>
      {label}
    </AppText>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  screen: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 16
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 56
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center"
  },
  progressWrap: {
    flex: 1,
    maxWidth: 360
  },
  headerBlock: {
    gap: 6,
    marginBottom: 36
  },
  title: {
    color: theme.colors.grey[1]
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24
  },
  form: {
    gap: 18
  },
  fieldGroup: {
    gap: 12
  },
  fieldLabel: {
    color: theme.colors.grey[1],
    fontSize: 14,
    lineHeight: 20
  },
  inputShell: {
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    paddingHorizontal: 24
  },
  disabledShell: {
    backgroundColor: "#ECECEC"
  },
  textInput: {
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.grey[4],
    paddingHorizontal: 24,
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.grey[1],
    backgroundColor: "#FFFFFF"
  },
  selectShell: {
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.grey[4],
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  disabledSelect: {
    opacity: 0.72
  },
  inputText: {
    fontSize: 16,
    lineHeight: 24
  },
  footer: {
    marginTop: "auto",
    paddingBottom: 24,
    paddingTop: 24
  },
  footerButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#F8C396"
  },
  pressed: {
    opacity: 0.9
  }
});
