import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Text as SvgText } from "react-native-svg";

import { theme } from "@/theme";

const GREETINGS = ["Welcome", "Sannu", "Ndewo", "Kaabo", "Bonjour"] as const;

export function WelcomeScreen() {
  const [index, setIndex] = useState(0);
  const [visibleText, setVisibleText] = useState(GREETINGS[0].slice(0, 1));
  const opacity = useRef(new Animated.Value(0)).current;
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clearAll = () => {
      timeouts.current.forEach((timeout) => clearTimeout(timeout));
      timeouts.current = [];
    };

    const schedule = (callback: () => void, delay: number) => {
      const timeout = setTimeout(callback, delay);
      timeouts.current.push(timeout);
    };

    const animateGreeting = (nextIndex: number) => {
      setIndex(nextIndex);
      setVisibleText("");
      opacity.setValue(0);

      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }).start(() => {
        const greeting = GREETINGS[nextIndex];

        greeting.split("").forEach((_, charIndex) => {
          schedule(() => {
            setVisibleText(greeting.slice(0, charIndex + 1));
          }, 170 * (charIndex + 1));
        });

        schedule(() => {
          if (nextIndex >= GREETINGS.length - 1) {
            schedule(() => {
              router.replace("/(onboarding)/profile");
            }, 1300);
            return;
          }

          Animated.timing(opacity, {
            toValue: 0,
            duration: 180,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }).start(() => {
            animateGreeting(nextIndex + 1);
          });
        }, greeting.length * 170 + 980);
      });
    };

    animateGreeting(0);

    return () => {
      clearAll();
    };
  }, [opacity]);

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFF4EA", "#FFB45A", "#FF9F1C", "#FFD7AE", "#FFFFFF"]}
      locations={[0, 0.24, 0.5, 0.66, 0.82, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.screen}
    >
      <View style={styles.copyBlock}>
        <Animated.View style={{ opacity }}>
          <GradientGreeting text={visibleText || GREETINGS[index].slice(0, 1)} />
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

function GradientGreeting({ text }: { text: string }) {
  return (
    <Svg width={320} height={88}>
      <Defs>
        <SvgLinearGradient id="welcomeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
          <Stop offset="55%" stopColor="rgba(255,255,255,0.9)" />
          <Stop offset="100%" stopColor="rgba(255,255,255,0.78)" />
        </SvgLinearGradient>
      </Defs>
      <SvgText
        x="160"
        y="56"
        fill="url(#welcomeGradient)"
        fontFamily="PlaywriteBrasil"
        fontSize="36"
        fontStyle="normal"
        textAnchor="middle"
      >
        {text}
      </SvgText>
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing["2xl"]
  },
  copyBlock: {
    alignItems: "center"
  }
});
