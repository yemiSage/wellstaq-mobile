import { router } from "expo-router";
import { type Dispatch, type MutableRefObject, type SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingHeader, OnboardingPrimaryCta, OnboardingTopBar, onboardingUi } from "@/components/domain/onboarding";
import { AppText } from "@/components/ui/text";
import { onboardingRepository } from "@/services/mock/repositories";
import { WellbeingPriority } from "@/models";
import { useSessionStore } from "@/state/session-store";
import { theme } from "@/theme";

const PRIORITY_ITEMS: { id: WellbeingPriority; label: string }[] = [
  { id: "reduce-stress", label: "Reduce-stress" },
  { id: "build-energy", label: "build-energy" },
  { id: "improve-balance", label: "improve-balance" },
  { id: "save-better", label: "save-better" },
  { id: "stay-active", label: "stay-active" },
  { id: "feel-connected", label: "feel-connected" }
];

const ITEM_HEIGHT = 44;
const ITEM_GAP = 12;
const ITEM_STEP = ITEM_HEIGHT + ITEM_GAP;

export function PrioritiesScreen() {
  const [order, setOrder] = useState(PRIORITY_ITEMS.map((item) => item.id));
  const [draggingId, setDraggingId] = useState<WellbeingPriority | null>(null);
  const orderRef = useRef(order);
  const completeOnboarding = useSessionStore((state) => state.completeOnboarding);

  const positionsRef = useRef<Record<WellbeingPriority, Animated.Value>>({
    "reduce-stress": new Animated.Value(0 * ITEM_STEP),
    "build-energy": new Animated.Value(1 * ITEM_STEP),
    "improve-balance": new Animated.Value(2 * ITEM_STEP),
    "save-better": new Animated.Value(3 * ITEM_STEP),
    "stay-active": new Animated.Value(4 * ITEM_STEP),
    "feel-connected": new Animated.Value(5 * ITEM_STEP)
  });

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

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
    completeOnboarding();
    router.replace("/(tabs)/home");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <OnboardingTopBar progress={0.755} onBack={() => router.back()} />

        <OnboardingHeader
          title="Choose your priorities"
          subtitle="We will use these to keep your homepage practical and unique to only you"
        />

        <View style={styles.listSection}>
          <AppText style={styles.listLabel}>Arrange in order of importance</AppText>
          <SortablePriorityList
            order={order}
            setOrder={setOrder}
            draggingId={draggingId}
            setDraggingId={setDraggingId}
            positionsRef={positionsRef}
            orderRef={orderRef}
          />
        </View>

        <View style={styles.footer}>
          <OnboardingPrimaryCta label="Continue" onPress={() => void handleContinue()} />
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
  positionsRef,
  orderRef
}: {
  order: WellbeingPriority[];
  setOrder: Dispatch<SetStateAction<WellbeingPriority[]>>;
  draggingId: WellbeingPriority | null;
  setDraggingId: (value: WellbeingPriority | null) => void;
  positionsRef: MutableRefObject<Record<WellbeingPriority, Animated.Value>>;
  orderRef: MutableRefObject<WellbeingPriority[]>;
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
            setOrder={setOrder}
            draggingId={draggingId}
            setDraggingId={setDraggingId}
            positionsRef={positionsRef}
            orderRef={orderRef}
          />
        );
      })}
    </View>
  );
}

function SortablePriorityRow({
  item,
  setOrder,
  draggingId,
  setDraggingId,
  positionsRef,
  orderRef
}: {
  item: { id: WellbeingPriority; label: string };
  setOrder: Dispatch<SetStateAction<WellbeingPriority[]>>;
  draggingId: WellbeingPriority | null;
  setDraggingId: (value: WellbeingPriority | null) => void;
  positionsRef: MutableRefObject<Record<WellbeingPriority, Animated.Value>>;
  orderRef: MutableRefObject<WellbeingPriority[]>;
}) {
  const isDragging = draggingId === item.id;
  const dragStartY = useRef(0);
  const position = positionsRef.current[item.id];

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 2,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
          setDraggingId(item.id);
          position.stopAnimation((current) => {
            dragStartY.current = current;
          });
        },
        onPanResponderMove: (_, gestureState) => {
          const currentOrder = orderRef.current;
          const maxY = (currentOrder.length - 1) * ITEM_STEP;
          const nextY = Math.max(0, Math.min(maxY, dragStartY.current + gestureState.dy));
          position.setValue(nextY);

          const targetIndex = Math.max(0, Math.min(currentOrder.length - 1, Math.round(nextY / ITEM_STEP)));
          const currentIndex = currentOrder.indexOf(item.id);

          if (targetIndex !== currentIndex) {
            setOrder((current) => {
              const next = moveItem(current, currentIndex, targetIndex);
              orderRef.current = next;
              return next;
            });
          }
        },
        onPanResponderRelease: () => {
          const finalIndex = orderRef.current.indexOf(item.id);
          Animated.spring(position, {
            toValue: finalIndex * ITEM_STEP,
            damping: 20,
            stiffness: 220,
            mass: 0.9,
            useNativeDriver: false
          }).start(() => setDraggingId(null));
        },
        onPanResponderTerminate: () => {
          const finalIndex = orderRef.current.indexOf(item.id);
          Animated.spring(position, {
            toValue: finalIndex * ITEM_STEP,
            damping: 20,
            stiffness: 220,
            mass: 0.9,
            useNativeDriver: false
          }).start(() => setDraggingId(null));
        }
      }),
    [item.id, orderRef, position, setDraggingId, setOrder]
  );

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.priorityRow,
        { top: position, zIndex: isDragging ? 10 : 1 },
        isDragging && styles.priorityRowDragging
      ]}
    >
      <PriorityHandle />
      <AppText style={styles.priorityLabel}>{item.label}</AppText>
    </Animated.View>
  );
}

function PriorityHandle() {
  return (
    <View style={styles.handleGrid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={styles.handleDot} />
      ))}
    </View>
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
    backgroundColor: "#FAFAFA"
  },
  screen: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  listSection: {
    paddingHorizontal: onboardingUi.horizontalPadding,
    gap: 12,
    flex: 1
  },
  listLabel: {
    fontFamily: "Inter",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#5F5F5F"
  },
  listContainer: {
    position: "relative",
    height: ITEM_STEP * PRIORITY_ITEMS.length - ITEM_GAP
  },
  priorityRow: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#FDFDFD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8
  },
  priorityRowDragging: {
    borderColor: "#EA6A05",
    shadowColor: "#EA6A05",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  handleGrid: {
    width: 11,
    height: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    columnGap: 2,
    rowGap: 3
  },
  handleDot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#8C8C8C"
  },
  priorityLabel: {
    fontFamily: "InterMedium",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#636363"
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: onboardingUi.horizontalPadding,
    backgroundColor: "#FAFAFA"
  }
});
