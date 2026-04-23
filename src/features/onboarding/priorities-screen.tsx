import { router } from "expo-router";
import { ChevronLeft, GripVertical } from "lucide-react-native";
import { type Dispatch, type MutableRefObject, type SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Animated, PanResponder, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/ui/button";
import { OnboardingProgressBar } from "@/components/ui/onboarding-progress";
import { AppText } from "@/components/ui/text";
import { onboardingRepository } from "@/services/mock/repositories";
import { WellbeingPriority } from "@/models";
import { theme } from "@/theme";

const PRIORITY_ITEMS: { id: WellbeingPriority; label: string }[] = [
  { id: "reduce-stress", label: "Reduce-stress" },
  { id: "build-energy", label: "build-energy" },
  { id: "improve-balance", label: "improve-balance" },
  { id: "save-better", label: "save-better" },
  { id: "stay-active", label: "stay-active" },
  { id: "feel-connected", label: "feel-connected" }
];

const ITEM_HEIGHT = 88;
const ITEM_GAP = 24;
const ITEM_STEP = ITEM_HEIGHT + ITEM_GAP;

export function PrioritiesScreen() {
  const [order, setOrder] = useState(PRIORITY_ITEMS.map((item) => item.id));
  const [draggingId, setDraggingId] = useState<WellbeingPriority | null>(null);

  const positionsRef = useRef<Record<WellbeingPriority, Animated.Value>>({
    "reduce-stress": new Animated.Value(0 * ITEM_STEP),
    "build-energy": new Animated.Value(1 * ITEM_STEP),
    "improve-balance": new Animated.Value(2 * ITEM_STEP),
    "save-better": new Animated.Value(3 * ITEM_STEP),
    "stay-active": new Animated.Value(4 * ITEM_STEP),
    "feel-connected": new Animated.Value(5 * ITEM_STEP)
  });

  useEffect(() => {
    order.forEach((id, index) => {
      if (id === draggingId) {
        return;
      }

      Animated.spring(positionsRef.current[id], {
        toValue: index * ITEM_STEP,
        damping: 18,
        stiffness: 170,
        mass: 0.9,
        useNativeDriver: false
      }).start();
    });
  }, [draggingId, order]);

  async function handleContinue() {
    await onboardingRepository.savePriorities(order);
    router.push("/(onboarding)/privacy");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.topRow}>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={28} color={theme.colors.grey[1]} />
          </Pressable>
          <View style={styles.progressWrap}>
            <OnboardingProgressBar segments={3} activeSegments={2} />
          </View>
        </View>

        <View style={styles.headerBlock}>
          <AppText variant="h3" weight="bold" style={styles.title}>
            Choose your priorities
          </AppText>
          <AppText color="#676767" style={styles.subtitle}>
            We will use these to keep your homepage practical and unique to only you
          </AppText>
        </View>

        <View style={styles.listSection}>
          <AppText color="#676767" style={styles.listLabel}>
            Arrange in order of importance
          </AppText>
          <SortablePriorityList order={order} setOrder={setOrder} draggingId={draggingId} setDraggingId={setDraggingId} positionsRef={positionsRef} />
        </View>

        <View style={styles.footer}>
          <PrimaryButton label="Continue" onPress={() => void handleContinue()} style={styles.footerButton} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function SortablePriorityList({
  order,
  setOrder,
  draggingId,
  setDraggingId,
  positionsRef
}: {
  order: WellbeingPriority[];
  setOrder: Dispatch<SetStateAction<WellbeingPriority[]>>;
  draggingId: WellbeingPriority | null;
  setDraggingId: (value: WellbeingPriority | null) => void;
  positionsRef: MutableRefObject<Record<WellbeingPriority, Animated.Value>>;
}) {
  return (
    <View style={styles.listContainer}>
      {order.map((id) => {
        const item = PRIORITY_ITEMS.find((entry) => entry.id === id);

        if (!item) {
          return null;
        }

        return (
          <SortablePriorityRow
            key={item.id}
            item={item}
            order={order}
            setOrder={setOrder}
            draggingId={draggingId}
            setDraggingId={setDraggingId}
            positionsRef={positionsRef}
          />
        );
      })}
    </View>
  );
}

function SortablePriorityRow({
  item,
  order,
  setOrder,
  draggingId,
  setDraggingId,
  positionsRef
}: {
  item: { id: WellbeingPriority; label: string };
  order: WellbeingPriority[];
  setOrder: Dispatch<SetStateAction<WellbeingPriority[]>>;
  draggingId: WellbeingPriority | null;
  setDraggingId: (value: WellbeingPriority | null) => void;
  positionsRef: MutableRefObject<Record<WellbeingPriority, Animated.Value>>;
}) {
  const isDragging = draggingId === item.id;
  const dragStartY = useRef(0);
  const position = positionsRef.current[item.id];

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 2,
        onPanResponderGrant: () => {
          setDraggingId(item.id);
          position.stopAnimation((current) => {
            dragStartY.current = current;
          });
        },
        onPanResponderMove: (_, gestureState) => {
          const maxY = (order.length - 1) * ITEM_STEP;
          const nextY = Math.max(0, Math.min(maxY, dragStartY.current + gestureState.dy));
          position.setValue(nextY);

          const targetIndex = Math.max(0, Math.min(order.length - 1, Math.round(nextY / ITEM_STEP)));
          const currentIndex = order.indexOf(item.id);

          if (targetIndex !== currentIndex) {
            setOrder((current) => moveItem(current, currentIndex, targetIndex));
          }
        },
        onPanResponderRelease: () => {
          const finalIndex = order.indexOf(item.id);

          Animated.spring(position, {
            toValue: finalIndex * ITEM_STEP,
            damping: 18,
            stiffness: 190,
            mass: 0.9,
            useNativeDriver: false
          }).start(() => {
            setDraggingId(null);
          });
        },
        onPanResponderTerminate: () => {
          const finalIndex = order.indexOf(item.id);

          Animated.spring(position, {
            toValue: finalIndex * ITEM_STEP,
            damping: 18,
            stiffness: 190,
            mass: 0.9,
            useNativeDriver: false
          }).start(() => {
            setDraggingId(null);
          });
        }
      }),
    [item.id, order, position, setDraggingId, setOrder]
  );

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.priorityRow,
        {
          top: position,
          zIndex: isDragging ? 10 : 1
        },
        isDragging && styles.priorityRowDragging
      ]}
    >
      <GripVertical size={28} color="#8F8F8F" />
      <AppText color="#676767" style={styles.priorityLabel}>
        {item.label}
      </AppText>
    </Animated.View>
  );
}

function moveItem(list: WellbeingPriority[], fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
    return list;
  }

  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
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
    marginBottom: 84
  },
  title: {
    color: theme.colors.grey[1]
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#676767"
  },
  listSection: {
    gap: 32,
    flex: 1
  },
  listLabel: {
    fontSize: 16,
    lineHeight: 24,
    color: "#676767"
  },
  listContainer: {
    position: "relative",
    height: ITEM_STEP * PRIORITY_ITEMS.length - ITEM_GAP
  },
  priorityRow: {
    position: "absolute",
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.grey[4],
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 22
  },
  priorityRowDragging: {
    borderColor: "#F4B07D",
    shadowColor: "#F4B07D",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3
  },
  priorityLabel: {
    fontSize: 16,
    lineHeight: 24
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 24
  },
  footerButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#F8C396"
  }
});
