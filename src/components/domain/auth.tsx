import { ReactNode, useEffect, useRef } from "react";
import { Animated, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgUri } from "react-native-svg";

import { AppText } from "@/components/ui/text";
import { authStyleGuide } from "@/theme/auth";
import { theme } from "@/theme";

const logoSource = require("../../assets/images/wellstaq-logo.svg");
const WELLSTAQ_LOGO_SOURCE = Image.resolveAssetSource 
  ? Image.resolveAssetSource(logoSource) 
  : { uri: logoSource };
const AUTH_CARD_HEIGHT = "54.74%";

export function LaunchSplashScreenView() {
  const scale = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    const animation = Animated.timing(scale, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true
    });

    animation.start();

    return () => animation.stop();
  }, [scale]);

  return (
    <View style={styles.splash}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <WellstaqLogo />
      </Animated.View>
    </View>
  );
}

export function AuthGradientBackground() {
  const ambientShift = useRef(new Animated.ValueXY({ x: -50, y: -50 })).current;
  const warmthShift = useRef(new Animated.ValueXY({ x: 50, y: 50 })).current;
  const glowPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ambientAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(ambientShift, {
          toValue: { x: 270, y: 225 },
          duration: 3500,
          useNativeDriver: true
        }),
        Animated.timing(ambientShift, {
          toValue: { x: -225, y: 270 },
          duration: 4000,
          useNativeDriver: true
        }),
        Animated.timing(ambientShift, {
          toValue: { x: -50, y: -50 },
          duration: 3500,
          useNativeDriver: true
        })
      ])
    );

    const warmthAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(warmthShift, {
          toValue: { x: -270, y: -225 },
          duration: 3800,
          useNativeDriver: true
        }),
        Animated.timing(warmthShift, {
          toValue: { x: 225, y: -270 },
          duration: 3500,
          useNativeDriver: true
        }),
        Animated.timing(warmthShift, {
          toValue: { x: 50, y: 50 },
          duration: 3800,
          useNativeDriver: true
        })
      ])
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true
        }),
        Animated.timing(glowPulse, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true
        })
      ])
    );

    ambientAnimation.start();
    warmthAnimation.start();
    pulseAnimation.start();

    return () => {
      ambientAnimation.stop();
      warmthAnimation.stop();
      pulseAnimation.stop();
    };
  }, [ambientShift, glowPulse, warmthShift]);

  const ambientOpacity = glowPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1]
  });
  const warmthOpacity = glowPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.9]
  });

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}>
      <LinearGradient
        colors={["#E6F5F0", "#FDF1CC", "#FCEEE3", "#F8F6F2"]}
        locations={[0, 0.32, 0.74, 1]}
        start={{ x: 0.01, y: 0.05 }}
        end={{ x: 1, y: 0.98 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: ambientOpacity, transform: ambientShift.getTranslateTransform() }]}>
        <LinearGradient
          colors={["rgba(192, 235, 213, 0.9)", "rgba(255, 228, 127, 0.8)", "rgba(255,255,255,0)"]}
          locations={[0, 0.52, 1]}
          start={{ x: 0.02, y: 0.18 }}
          end={{ x: 0.92, y: 0.84 }}
          style={styles.gradientLayer}
        />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: warmthOpacity, transform: warmthShift.getTranslateTransform() }]}>
        <LinearGradient
          colors={["rgba(255, 196, 151, 0.85)", "rgba(255, 180, 150, 0.8)", "rgba(255,255,255,0)"]}
          locations={[0, 0.58, 1]}
          start={{ x: 0.7, y: 0.02 }}
          end={{ x: 0.28, y: 1 }}
          style={styles.gradientLayer}
        />
      </Animated.View>
      <LinearGradient
        colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)", "rgba(255,255,255,0.1)"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

export function AuthScreenFrame({ children }: { children: ReactNode }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <View style={styles.hero}>{children}</View>
    </KeyboardAvoidingView>
  );
}

export function BrandHero({ width = 138, height = 38 }: { width?: number; height?: number }) {
  return (
    <View style={styles.brandHero}>
      <View style={{ width, height }}>
        <WellstaqLogo width={width} height={height} />
      </View>
    </View>
  );
}

export function WellstaqLogo({ width = 138, height = 38 }: { width?: number; height?: number }) {
  return <SvgUri uri={WELLSTAQ_LOGO_SOURCE.uri} width={width} height={height} />;
}

export function AuthCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function AuthSheet({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: ReactNode }) {
  return (
    <AuthCard>
      <View style={styles.sheetHeader}>
        <AppText variant={authStyleGuide.titleVariant} weight={authStyleGuide.titleWeight} style={styles.title} color={theme.colors.grey[1]}>
          {title}
        </AppText>
        {subtitle ? (
          typeof subtitle === "string" ? (
            <AppText style={styles.subtitle} color={theme.colors.grey[2]}>
              {subtitle}
            </AppText>
          ) : (
            <View style={styles.subtitleWrap}>{subtitle}</View>
          )
        ) : null}
      </View>
      {children}
    </AuthCard>
  );
}

export function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  required,
  trailing,
  keyboardType = "default",
  maxLength,
  autoCapitalize = "none"
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  trailing?: ReactNode;
  keyboardType?: "default" | "email-address" | "number-pad";
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  return (
    <View style={styles.fieldGroup}>
      <View style={styles.labelRow}>
        <AppText weight="medium" style={styles.label} color="#373737">
          {label}
        </AppText>
        {required ? (
          <AppText weight="medium" style={styles.label} color={theme.colors.error[1]}>
            *
          </AppText>
        ) : null}
      </View>
      <View style={styles.inputShell}>
        <TextInput
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grey[3]}
          selectionColor={theme.colors.auth.textPrimary}
          style={styles.input}
          value={value}
        />
        {trailing ? <View style={styles.trailingWrap}>{trailing}</View> : null}
      </View>
      {helperText ? (
        <AppText variant="caption" style={styles.helper} color={theme.colors.grey[2]}>
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
}

export function AuthPrimaryButton({
  label,
  onPress,
  disabled,
  loading
}: {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [styles.primaryButton, (disabled || loading) && styles.primaryButtonDisabled, pressed && !(disabled || loading) && styles.pressed]}
    >
      <AppText weight="semibold" style={styles.primaryButtonText} color={theme.colors.auth.textPrimary}>
        {loading ? "Continuing..." : label}
      </AppText>
    </Pressable>
  );
}

export function SocialIconButton({
  label,
  icon,
  onPress
}: {
  label: string;
  icon: ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable accessibilityLabel={label} accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.auth.background
  },
  screen: {
    flex: 1
  },
  hero: {
    flex: 1,
    backgroundColor: theme.colors.auth.background,
    justifyContent: "space-between"
  },
  brandHero: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 72,
    paddingHorizontal: theme.spacing["2xl"]
  },
  gradientLayer: {
    ...StyleSheet.absoluteFillObject,
    width: "200%",
    height: "200%",
    top: "-50%",
    left: "-50%"
  },
  card: {
    backgroundColor: theme.colors.auth.surface,
    borderTopLeftRadius: theme.radii.xl,
    borderTopRightRadius: theme.radii.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing["2xl"],
    paddingBottom: theme.spacing["2xl"],
    gap: 10,
    height: AUTH_CARD_HEIGHT,
    ...theme.shadows.authCard
  },
  sheetHeader: {
    gap: theme.spacing.md,
    alignSelf: "stretch"
  },
  title: {
    alignSelf: "stretch"
  },
  subtitleWrap: {
    alignSelf: "stretch"
  },
  subtitle: {
    fontSize: authStyleGuide.bodyText.fontSize,
    lineHeight: authStyleGuide.bodyText.lineHeight
  },
  fieldGroup: {
    gap: 4,
    alignSelf: "stretch"
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 2
  },
  label: {
    fontSize: 16,
    lineHeight: 24
  },
  inputShell: {
    height: 44,
    maxHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#F8F8F8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10
  },
  input: {
    height: 44,
    flex: 1,
    fontFamily: "Inter",
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: "#7D7D7D",
    paddingVertical: 0,
    textAlignVertical: "center",
    includeFontPadding: false
  },
  trailingWrap: {
    minWidth: 62,
    marginLeft: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    borderLeftWidth: 1,
    borderLeftColor: "rgba(230, 230, 230, 0.9)",
    alignItems: "center",
    justifyContent: "center"
  },
  helper: {
    fontSize: authStyleGuide.bodyText.fontSize,
    lineHeight: authStyleGuide.bodyText.lineHeight
  },
  primaryButton: {
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: theme.colors.primary[1],
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing["2xl"]
  },
  primaryButtonDisabled: {
    backgroundColor: theme.colors.primary[4]
  },
  primaryButtonText: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight
  },
  socialButton: {
    width: 65,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center"
  },
  pressed: {
    opacity: 0.9
  }
});
