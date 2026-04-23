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
  const ambientShift = useRef(new Animated.ValueXY({ x: -10, y: -6 })).current;
  const warmthShift = useRef(new Animated.ValueXY({ x: 8, y: 10 })).current;
  const glowPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ambientAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(ambientShift, {
          toValue: { x: 6, y: 4 },
          duration: 7600,
          useNativeDriver: true
        }),
        Animated.timing(ambientShift, {
          toValue: { x: -8, y: -4 },
          duration: 7200,
          useNativeDriver: true
        }),
        Animated.timing(ambientShift, {
          toValue: { x: -10, y: -6 },
          duration: 6400,
          useNativeDriver: true
        })
      ])
    );

    const warmthAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(warmthShift, {
          toValue: { x: -6, y: -4 },
          duration: 7900,
          useNativeDriver: true
        }),
        Animated.timing(warmthShift, {
          toValue: { x: 10, y: 8 },
          duration: 7300,
          useNativeDriver: true
        }),
        Animated.timing(warmthShift, {
          toValue: { x: 8, y: 10 },
          duration: 6600,
          useNativeDriver: true
        })
      ])
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 5600,
          useNativeDriver: true
        }),
        Animated.timing(glowPulse, {
          toValue: 0,
          duration: 5600,
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
    outputRange: [0.38, 0.52]
  });
  const warmthOpacity = glowPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.34, 0.46]
  });

  return (
    <View style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}>
      <LinearGradient
        colors={["#EEF7F1", "#FFF6DC", "#FBE3D2", "#FDFBF8"]}
        locations={[0, 0.32, 0.74, 1]}
        start={{ x: 0.01, y: 0.05 }}
        end={{ x: 1, y: 0.98 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: ambientOpacity, transform: ambientShift.getTranslateTransform() }]}>
        <LinearGradient
          colors={["rgba(199, 246, 230, 0.78)", "rgba(255, 244, 210, 0.34)", "rgba(255,255,255,0)"]}
          locations={[0, 0.52, 1]}
          start={{ x: 0.02, y: 0.18 }}
          end={{ x: 0.92, y: 0.84 }}
          style={styles.gradientLayer}
        />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: warmthOpacity, transform: warmthShift.getTranslateTransform() }]}>
        <LinearGradient
          colors={["rgba(255, 241, 189, 0.52)", "rgba(249, 201, 162, 0.44)", "rgba(255,255,255,0)"]}
          locations={[0, 0.58, 1]}
          start={{ x: 0.7, y: 0.02 }}
          end={{ x: 0.28, y: 1 }}
          style={styles.gradientLayer}
        />
      </Animated.View>
      <LinearGradient
        colors={["rgba(255,255,255,0.26)", "rgba(255,255,255,0.08)", "rgba(255,255,255,0.22)"]}
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
      <WellstaqLogo width={width} height={height} />
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
    width: "112%",
    height: "112%"
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
    gap: 6,
    alignSelf: "stretch"
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 2
  },
  label: {
    fontSize: 14,
    lineHeight: 20
  },
  inputShell: {
    height: 44,
    maxHeight: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: theme.colors.grey[4],
    backgroundColor: theme.colors.grey[5],
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg
  },
  input: {
    height: 44,
    flex: 1,
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.grey[1]
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
    fontSize: 14,
    lineHeight: 20
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
