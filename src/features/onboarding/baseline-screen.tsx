import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingHeader, OnboardingPrimaryCta, OnboardingTopBar, onboardingUi } from "@/components/domain/onboarding";
import { AppText } from "@/components/ui/text";
import { onboardingRepository } from "@/services/mock/repositories";
import { theme } from "@/theme";

type StepKey = "mood" | "stressLevel" | "energyLevel" | "workLifeBalance";

type StepOption = {
  label: string;
  value: number;
  emoji: string;
};

type BaselineStep = {
  key: StepKey;
  question: string;
  options: StepOption[];
};

type BaselineSelections = Record<StepKey, { value?: number; label?: string; reason?: string }>;

const SHARED_REASONS = ["Work", "Family", "Breakup", "Sleep", "Social", "Food", "Love", "Exams", "+ Other"] as const;

const BASELINE_STEPS: BaselineStep[] = [
  {
    key: "mood",
    question: "What's your mood?",
    options: [
      { emoji: "😡", label: "Amazed", value: 1 },
      { emoji: "😰", label: "Stressed", value: 2 },
      { emoji: "😮‍💨", label: "Tired", value: 3 },
      { emoji: "🤗", label: "Excited", value: 5 },
      { emoji: "☺️", label: "Amazed", value: 4 },
      { emoji: "😈", label: "Infuriated", value: 1.5 }
    ]
  },
  {
    key: "stressLevel",
    question: "What's your stress level?",
    options: [
      { emoji: "😡", label: "Amazed", value: 1 },
      { emoji: "😰", label: "Stressed", value: 2 },
      { emoji: "😮‍💨", label: "Tired", value: 3 },
      { emoji: "🤗", label: "Excited", value: 4 },
      { emoji: "☺️", label: "Amazed", value: 2.5 },
      { emoji: "😈", label: "Infuriated", value: 5 }
    ]
  },
  {
    key: "energyLevel",
    question: "What's your energy levels?",
    options: [
      { emoji: "😡", label: "Amazed", value: 1 },
      { emoji: "😰", label: "Stressed", value: 2 },
      { emoji: "😮‍💨", label: "Tired", value: 2.5 },
      { emoji: "🤗", label: "Excited", value: 5 },
      { emoji: "☺️", label: "Amazed", value: 4 },
      { emoji: "😈", label: "Infuriated", value: 1.5 }
    ]
  },
  {
    key: "workLifeBalance",
    question: "Describe your work-life balance?",
    options: [
      { emoji: "😡", label: "Amazed", value: 1 },
      { emoji: "😰", label: "Stressed", value: 2 },
      { emoji: "😮‍💨", label: "Tired", value: 3 },
      { emoji: "🤗", label: "Excited", value: 5 },
      { emoji: "☺️", label: "Amazed", value: 4 },
      { emoji: "😈", label: "Infuriated", value: 1.5 }
    ]
  }
];

const INITIAL_SELECTIONS: BaselineSelections = {
  mood: {},
  stressLevel: {},
  energyLevel: {},
  workLifeBalance: {}
};

const EMOJI_BG_COLORS = [
  "#FFF0F0", // Light red
  "#F0F4FF", // Light blue
  "#FFF8E6", // Light yellow
  "#E6FFE6", // Light green
  "#F9F0FF", // Light purple
  "#FFF0F5"  // Light pink
];

export function BaselineScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<BaselineSelections>(INITIAL_SELECTIONS);

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slideAnim.setValue(0);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true
    }).start();
  }, [stepIndex, slideAnim]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0]
  });

  const activeStep = BASELINE_STEPS[stepIndex];
  const selection = selections[activeStep.key];
  const selectedLabel = selection.label?.toLowerCase();
  const canContinue = typeof selection.value === "number";

  async function handleContinue() {
    if (!canContinue) {
      return;
    }

    if (stepIndex < BASELINE_STEPS.length - 1) {
      setStepIndex((current) => current + 1);
      return;
    }

    await onboardingRepository.saveBaselineStep({
      mood: selections.mood.value ?? 3,
      stressLevel: selections.stressLevel.value ?? 3,
      energyLevel: selections.energyLevel.value ?? 3,
      workLifeBalance: selections.workLifeBalance.value ?? 3,
      createdAt: new Date().toISOString()
    });

    router.push("/(onboarding)/priorities");
  }

  function handleBack() {
    if (stepIndex === 0) {
      router.back();
      return;
    }

    setStepIndex((current) => current - 1);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <OnboardingTopBar progress={0.755} onBack={handleBack} />

        <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <OnboardingHeader
            title="Your starting wellbeing baseline"
            subtitle="Select the emoji that reflect the most, how you are feeling right now"
          />

          <Animated.View style={{ opacity: slideAnim, transform: [{ translateX }] }}>
            <View style={styles.card}>
              <AppText style={styles.question}>{activeStep.question}</AppText>

              <View style={styles.optionGrid}>
                {activeStep.options.map((option, index) => {
                  const isActive = selection.value === option.value && selection.label === option.label;
                  const bgColor = EMOJI_BG_COLORS[index % EMOJI_BG_COLORS.length];

                  return (
                    <Pressable
                      key={`${activeStep.key}-${option.label}-${index}`}
                      accessibilityRole="button"
                      onPress={() =>
                        setSelections((current) => ({
                          ...current,
                          [activeStep.key]: {
                            ...current[activeStep.key],
                            value: option.value,
                            label: option.label
                          }
                        }))
                      }
                      style={({ pressed }) => [styles.optionItem, pressed && styles.optionPressed]}
                    >
                      <View style={[styles.emojiShell, { backgroundColor: bgColor }, isActive && styles.emojiShellActive]}>
                        <View style={styles.emojiWrap}>
                          <AppText style={styles.emoji}>{option.emoji}</AppText>
                        </View>
                      </View>
                      <AppText numberOfLines={1} ellipsizeMode="clip" style={[styles.optionLabel, isActive && styles.optionLabelActive]}>
                        {option.label}
                      </AppText>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.reasonBlock}>
              <AppText style={styles.reasonTitle}>
                {selectedLabel ? `What reason makes you feel ${selectedLabel} today?` : "What reason makes you feel this way?"}
              </AppText>
              <View style={styles.reasonWrap}>
                {SHARED_REASONS.map((reason) => {
                  const active = selection.reason === reason;

                  return (
                    <Pressable
                      key={`${activeStep.key}-${reason}`}
                      accessibilityRole="button"
                      onPress={() =>
                        setSelections((current) => ({
                          ...current,
                          [activeStep.key]: {
                            ...current[activeStep.key],
                            reason
                          }
                        }))
                      }
                      style={({ pressed }) => [styles.reasonChip, active && styles.reasonChipActive, pressed && styles.optionPressed]}
                    >
                      <AppText style={[styles.reasonChipText, active && styles.reasonChipTextActive]}>{reason}</AppText>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <OnboardingPrimaryCta label="Continue" onPress={() => void handleContinue()} disabled={!canContinue} />
        </View>
      </View>
    </SafeAreaView>
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
  content: {
    paddingBottom: 24
  },
  card: {
    height: 242,
    marginHorizontal: onboardingUi.horizontalPadding,
    borderRadius: 12,
    padding: 12,
    marginBottom: 36,
    backgroundColor: "#FFFFFF"
  },
  question: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    lineHeight: 24,
    color: "#202020",
    marginBottom: 20
  },
  optionGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    gap: 24
  },
  optionItem: {
    width: 65,
    height: 77,
    alignItems: "center",
    gap: 2
  },
  emojiShell: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center"
  },
  emojiWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emojiShellActive: {
    borderColor: theme.colors.primary[1],
    backgroundColor: theme.colors.primary[4]
  },
  emoji: {
    fontSize: 30,
    textAlign: "center",
    includeFontPadding: false
  },
  optionLabel: {
    fontFamily: "InterMedium",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#5F5F5F",
    textAlign: "center",
    width: 70
  },
  optionLabelActive: {
    color: theme.colors.primary[1]
  },
  reasonBlock: {
    paddingHorizontal: onboardingUi.horizontalPadding,
    gap: 20
  },
  reasonTitle: {
    fontFamily: "BricolageGrotesqueBold",
    fontSize: 16,
    lineHeight: 24,
    color: "#202020"
  },
  reasonWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  },
  reasonChip: {
    height: 40,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "#636363",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  reasonChipActive: {
    borderColor: theme.colors.primary[1],
    backgroundColor: theme.colors.primary[4]
  },
  reasonChipText: {
    fontFamily: "Inter",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#5F5F5F"
  },
  reasonChipTextActive: {
    color: theme.colors.primary[1]
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: onboardingUi.horizontalPadding,
    backgroundColor: "#FAFAFA"
  },
  optionPressed: {
    opacity: 0.88
  }
});
