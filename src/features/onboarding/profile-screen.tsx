import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  OnboardingFieldLabel,
  OnboardingFieldShell,
  OnboardingHeader,
  OnboardingPrimaryCta,
  OnboardingSelectValue,
  OnboardingTextInput,
  OnboardingTopBar,
  onboardingUi
} from "@/components/domain/onboarding";
import { SelectionSheet, SelectionSheetOption } from "@/components/ui/selection-sheet";
import { AppText } from "@/components/ui/text";
import { COUNTRIES, STATES_BY_COUNTRY, getFlagEmoji } from "@/features/onboarding/location-data";
import { onboardingRepository } from "@/services/mock/repositories";
import { useSessionStore } from "@/state/session-store";
import { theme } from "@/theme";

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

  const countryOptions = useMemo<SelectionSheetOption[]>(
    () =>
      COUNTRIES.map((item) => ({
        value: item.value,
        label: item.label,
        leading: <AppText>{getFlagEmoji(item.code)}</AppText>
      })),
    []
  );

  const filteredCountries = useMemo(
    () => countryOptions.filter((item) => item.label.toLowerCase().includes(countrySearch.trim().toLowerCase())),
    [countryOptions, countrySearch]
  );

  const availableStates = useMemo(() => {
    const source = country ? STATES_BY_COUNTRY[country.value] ?? [] : [];
    const options = source.map((label) => ({
      value: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      label
    }));
    return options.filter((item) => item.label.toLowerCase().includes(stateSearch.trim().toLowerCase()));
  }, [country, stateSearch]);

  const isDisabled = !firstName.trim() || !lastName.trim() || !country || !stateOption;

  async function handleContinue() {
    if (isDisabled || !country || !stateOption) {
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
        <Pressable style={styles.screen} onPress={Keyboard.dismiss}>
          <OnboardingTopBar progress={0.2} onBack={() => router.back()} />

          <OnboardingHeader
            title="Personal Information"
            subtitle="Please provide your accurate personal information."
          />

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <OnboardingFieldLabel required>Email address</OnboardingFieldLabel>
              <OnboardingFieldShell disabled>
                <AppText style={styles.valueText}>{session?.email ?? "user@example.com"}</AppText>
              </OnboardingFieldShell>
            </View>

            <View style={styles.fieldGroup}>
              <OnboardingFieldLabel required>First name</OnboardingFieldLabel>
              <OnboardingFieldShell>
                <OnboardingTextInput value={firstName} onChangeText={setFirstName} placeholder="Enter first name" />
              </OnboardingFieldShell>
            </View>

            <View style={styles.fieldGroup}>
              <OnboardingFieldLabel required>Last name</OnboardingFieldLabel>
              <OnboardingFieldShell>
                <OnboardingTextInput value={lastName} onChangeText={setLastName} placeholder="Enter last name" />
              </OnboardingFieldShell>
            </View>

            <View style={styles.fieldGroup}>
              <OnboardingFieldLabel required>Country of residence</OnboardingFieldLabel>
              <OnboardingFieldShell onPress={() => setActiveSheet("country")}>
                <OnboardingSelectValue value={country?.label} placeholder="Select country" />
              </OnboardingFieldShell>
            </View>

            <View style={styles.fieldGroup}>
              <OnboardingFieldLabel required>State</OnboardingFieldLabel>
              <OnboardingFieldShell
                onPress={() => {
                  if (country) {
                    setActiveSheet("state");
                  }
                }}
              >
                <OnboardingSelectValue value={stateOption?.label} placeholder="Select state" />
              </OnboardingFieldShell>
            </View>
          </View>

          <View style={styles.footer}>
            <OnboardingPrimaryCta label="Continue" disabled={isDisabled} onPress={() => void handleContinue()} />
          </View>
        </Pressable>
      </SafeAreaView>

      <SelectionSheet
        visible={activeSheet === "country"}
        title="Select a country"
        searchPlaceholder="Search Country"
        searchValue={countrySearch}
        onSearchChange={setCountrySearch}
        options={filteredCountries}
        selectedValue={country?.value}
        onSelect={(value) => {
          const next = countryOptions.find((item) => item.value === value) ?? null;
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  screen: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  form: {
    paddingHorizontal: onboardingUi.horizontalPadding,
    gap: onboardingUi.sectionGap
  },
  fieldGroup: {
    gap: onboardingUi.fieldGap
  },
  valueText: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#7D7D7D"
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: onboardingUi.horizontalPadding,
    paddingBottom: 24,
    paddingTop: 24
  }
});
