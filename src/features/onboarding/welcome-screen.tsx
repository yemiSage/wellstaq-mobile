import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

import { WellstaqLogo } from "@/components/domain/auth";
import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

const GREETINGS = [
  "Sannu",
  "Ndewo",
  "Kaabo",
  "\u0645\u0631\u062d\u0628\u0627",
  "Bonjour",
  "Hola",
  "Welcome"
] as const;

export function WelcomeScreen() {
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const animateGreeting = (nextIndex: number) => {
      setIndex(nextIndex);
      opacity.setValue(0);
      translateY.setValue(14);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 360,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 360,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        })
      ]).start(() => {
        timeout = setTimeout(() => {
          if (nextIndex >= GREETINGS.length - 1) {
            timeout = setTimeout(() => {
              router.replace("/(onboarding)/profile");
            }, 650);
            return;
          }

          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 260,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true
            }),
            Animated.timing(translateY, {
              toValue: -10,
              duration: 260,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true
            })
          ]).start(() => {
            animateGreeting(nextIndex + 1);
          });
        }, 420);
      });
    };

    animateGreeting(0);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [opacity, translateY]);

  return (
    <View style={styles.screen}>
      <View style={styles.logoWrap}>
        <WellstaqLogo />
      </View>
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <AppText variant="h2" weight="bold" style={styles.greeting}>
          {GREETINGS[index]}
        </AppText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FCFCFA",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing["3xl"],
    paddingHorizontal: theme.spacing["2xl"]
  },
  logoWrap: {
    opacity: 0.86
  },
  greeting: {
    textAlign: "center",
    color: theme.colors.grey[1]
  }
});
