import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/ui/button";
import { OnboardingProgressBar } from "@/components/ui/onboarding-progress";
import { AppText } from "@/components/ui/text";
import { onboardingRepository } from "@/services/mock/repositories";
import { theme } from "@/theme";

const SHARED_REASONS = ["Work", "Family", "Breakup", "Sleep", "Social", "Food", "Love", "Exams", "+ Other"] as const;

const BASELINE_STEPS = [
  {
    key: "mood",
    question: "What’s your mood?",
    options: [
      { emoji: "😡", label: "Angry", value: 1 },
      { emoji: "😰", label: "Stressed", value: 2 },
      { emoji: "😮‍💨", label: "Tired", value: 3 },
      { emoji: "🤗", label: "Excited", value: 5 },
      { emoji: "☺️", label: "Calm", value: 4 },
      { emoji: "😈", label: "Irritated", value: 2 }
    ]
  },
  {
    key: "stressLevel",
    question: "What’s your stress level?",
    options: [
      { emoji: "😌", label: "Relaxed", value: 1 },
      { emoji: "🙂", label: "Steady", value: 2 },
      { emoji: "😮‍💨", label: "Tense", value: 3 },
      { emoji: "😵", label: "Pressured", value: 4 },
      { emoji: "😰", label: "Stressed", value: 4 },
      { emoji: "🤯", label: "Overloaded", value: 5 }
    ]
  },
  {
    key: "energyLevel",
    question: "What’s your energy levels?",
    options: [
      { emoji: "🔋", label: "Charged", value: 5 },
      { emoji: "✨", label: "Upbeat", value: 4 },
      { emoji: "🌤️", label: "Okay", value: 3 },
      { emoji: "😴", label: "Sleepy", value: 2 },
      { emoji: "🥱", label: "Tired", value: 2 },
      { emoji: "🪫", label: "Drained", value: 1 }
    ]
  },
  {
    key: "workLifeBalance",
    question: "Describe your work-life balance?",
    options: [
      { emoji: "🧘", label: "Balanced", value: 5 },
      { emoji: "🙂", label: "Manageable", value: 4 },
      { emoji: "😐", label: "Uneven", value: 3 },
      { emoji: "🏃", label: "Busy", value: 2 },
      { emoji: "😵‍💫", label: "Overwhelmed", value: 2 },
      { emoji: "🚨", label: "Burning out", value: 1 }
    ]
  }
] as const;

type StepKey = (typeof BASELINE_STEPS)[number]["key"];

type BaselineSelections = Record<StepKey, { value?: number; reasons: string[] }>;

const INITIAL_SELECTIONS: BaselineSelections = {
  mood: { reasons: [] },
  stressLevel: { reasons: [] },
  energyLevel: { reasons: [] },
  workLifeBalance: { reasons: [] }
};

export function BaselineScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<BaselineSelections>(INITIAL_SELECTIONS);

  const activeStep = BASELINE_STEPS[stepIndex];
  const selection = selections[activeStep.key];
  const isLastStep = stepIndex === BASELINE_STEPS.length - 1;
  const canContinue = typeof selection.value === "number";

  const selectedReasons = useMemo(() => selection.reasons, [selection.reasons]);

  async function handleContinue() {
    if (!canContinue) {
      return;
    }

    if (!isLastStep) {
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
        <View style={styles.topRow}>
          <Pressable accessibilityRole="button" onPress={handleBack} style={styles.backButton}>
            <ChevronLeft size={28} color={theme.colors.grey[1]} />
          </Pressable>
          <View style={styles.progressWrap}>
            <OnboardingProgressBar segments={3} activeSegments={1} />
          </View>
        </View>

        <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.headerBlock}>
            <AppText variant="h3" weight="bold" style={styles.title}>
              Your starting wellbeing baseline
            </AppText>
            <AppText color="#676767" style={styles.subtitle}>
              Select the emoji that reflect the most, how you are feeling right now
            </AppText>
          </View>

          <LinearGradient colors={["#FFF7EF", "#F5F0FF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
            <AppText variant="h4" weight="bold" style={styles.question}>
              {activeStep.question}
            </AppText>

            <View style={styles.optionGrid}>
              {activeStep.options.map((option) => {
                const isActive = selection.value === option.value;

                return (
                  <Pressable
                    key={`${activeStep.key}-${option.label}`}
                    accessibilityRole="button"
                    onPress={() =>
                      setSelections((current) => ({
                        ...current,
                        [activeStep.key]: {
                          ...current[activeStep.key],
                          value: option.value
                        }
                      }))
                    }
                    style={({ pressed }) => [styles.optionItem, pressed && styles.optionPressed]}
                  >
                    <View style={[styles.emojiCircle, isActive && styles.emojiCircleActive]}>
                      <AppText style={styles.emoji}>{option.emoji}</AppText>
                    </View>
                    <AppText color="#676767" style={styles.optionLabel}>
                      {option.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </LinearGradient>

          <View style={styles.reasonBlock}>
            <AppText variant="h4" weight="bold" style={styles.reasonTitle}>
              What reason make you feel this way?
            </AppText>
            <View style={styles.reasonWrap}>
              {SHARED_REASONS.map((reason) => {
                const active = selectedReasons.includes(reason);

                return (
                  <Pressable
                    key={`${activeStep.key}-${reason}`}
                    accessibilityRole="button"
                    onPress={() =>
                      setSelections((current) => {
                        const currentReasons = current[activeStep.key].reasons;
                        const nextReasons = currentReasons.includes(reason)
                          ? currentReasons.filter((item) => item !== reason)
                          : [...currentReasons, reason];

                        return {
                          ...current,
                          [activeStep.key]: {
                            ...current[activeStep.key],
                            reasons: nextReasons
                          }
                        };
                      })
                    }
                    style={({ pressed }) => [styles.reasonChip, active && styles.reasonChipActive, pressed && styles.optionPressed]}
                  >
                    <AppText color={active ? theme.colors.primary[1] : "#676767"} style={styles.reasonChipText}>
                      {reason}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton label="Continue" onPress={() => void handleContinue()} disabled={!canContinue} style={styles.footerButton} />
        </View>
      </View>
    </SafeAreaView>
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
  content: {
    paddingBottom: 24
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
    lineHeight: 24,
    color: "#676767"
  },
  card: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    marginBottom: 36
  },
  question: {
    color: theme.colors.grey[1],
    marginBottom: 28
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 28,
    columnGap: 22
  },
  optionItem: {
    width: "22%",
    minWidth: 92,
    alignItems: "center",
    gap: 12
  },
  emojiCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center"
  },
  emojiCircleActive: {
    borderColor: "#F4B07D",
    shadowColor: "#F4B07D",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  emoji: {
    fontSize: 38,
    lineHeight: 42
  },
  optionLabel: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  },
  reasonBlock: {
    gap: 20
  },
  reasonTitle: {
    color: theme.colors.grey[1]
  },
  reasonWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  },
  reasonChip: {
    minHeight: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#6E6E6E",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  reasonChipActive: {
    borderColor: "#F4B07D",
    backgroundColor: "#FFF6EF"
  },
  reasonChipText: {
    fontSize: 14,
    lineHeight: 20
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 24
  },
  footerButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#F8C396"
  },
  optionPressed: {
    opacity: 0.88
  }
});
