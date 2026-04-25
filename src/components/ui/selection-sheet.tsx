import { ReactNode, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Keyboard,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";

import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

export interface SelectionSheetOption {
  value: string;
  label: string;
  leading?: ReactNode;
}

export function SelectionSheet({
  visible,
  title,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  options,
  selectedValue,
  onSelect,
  onClose
}: {
  visible: boolean;
  title: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  options: SelectionSheetOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}) {
  const translateY = useRef(new Animated.Value(520)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      translateY.setValue(520);
      backdropOpacity.setValue(0);
      return;
    }

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.spring(translateY, {
        toValue: 0,
        damping: 18,
        stiffness: 190,
        mass: 0.95,
        useNativeDriver: true
      })
    ]).start();
  }, [backdropOpacity, translateY, visible]);

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 520,
        duration: 180,
        useNativeDriver: true
      })
    ]).start(({ finished }) => {
      if (finished) {
        onClose();
      }
    });
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 8,
        onPanResponderMove: (_, gesture) => {
          if (gesture.dy > 0) {
            translateY.setValue(gesture.dy);
          }
        },
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dy > 90 || gesture.vy > 1) {
            closeSheet();
            return;
          }

          Animated.spring(translateY, {
            toValue: 0,
            damping: 18,
            stiffness: 190,
            mass: 0.95,
            useNativeDriver: true
          }).start();
        }
      }),
    [translateY]
  );

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent visible onRequestClose={closeSheet}>
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable onPress={closeSheet} style={StyleSheet.absoluteFill} />
        </Animated.View>
        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <SafeAreaView edges={["bottom"]}>
            <Pressable style={styles.sheetInner} onPress={Keyboard.dismiss}>
              <View style={styles.handleWrap} {...panResponder.panHandlers}>
                <View style={styles.handle} />
              </View>
              <View style={styles.content}>
                <AppText variant="h4" weight="bold" style={styles.title}>
                  {title}
                </AppText>
                <View style={styles.searchField}>
                  <TextInput
                    value={searchValue}
                    onChangeText={onSearchChange}
                    placeholder={searchPlaceholder}
                    placeholderTextColor="#8F8F8F"
                    style={styles.searchInput}
                  />
                  <Search size={24} color="#676767" />
                </View>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
                  {options.map((option) => {
                    const active = option.value === selectedValue;
                    return (
                      <Pressable
                        key={option.value}
                        onPress={() => {
                          onSelect(option.value);
                          closeSheet();
                        }}
                        style={({ pressed }) => [styles.optionRow, active && styles.optionActive, pressed && styles.optionPressed]}
                      >
                        {option.leading ? <View style={styles.leading}>{option.leading}</View> : null}
                        <AppText style={styles.optionLabel} color="#676767">
                          {option.label}
                        </AppText>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
              <View style={styles.homeIndicatorWrap} {...panResponder.panHandlers}>
                <View style={styles.homeIndicator} />
              </View>
            </Pressable>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end"
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(17, 17, 17, 0.18)"
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "84%"
  },
  sheetInner: {
    flexShrink: 1
  },
  handleWrap: {
    alignItems: "center",
    paddingVertical: 8
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB"
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12
  },
  title: {
    marginBottom: 20,
    fontFamily: "BricolageGrotesqueBold",
    fontSize: 20,
    lineHeight: 30,
    color: "#202020"
  },
  searchField: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20
  },
  searchInput: {
    flex: 1,
    height: 20,
    fontFamily: "InterMedium",
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.grey[1]
  },
  list: {
    paddingBottom: 24,
    gap: 6
  },
  homeIndicatorWrap: {
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 8
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#000000"
  },
  optionRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  optionActive: {
    backgroundColor: "#FFF7F1",
    borderRadius: theme.radii.md
  },
  optionPressed: {
    opacity: 0.88
  },
  leading: {
    width: 28,
    alignItems: "center"
  },
  optionLabel: {
    fontFamily: "InterMedium",
    fontSize: 16,
    lineHeight: 24
  }
});
