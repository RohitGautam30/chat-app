import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const inputs = useRef<Array<TextInput | null>>([]);

  // If a token already exists, skip OTP (optional)
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) router.replace("/(main)");
      } catch {}
    })();
  }, []);

  // Countdown for resend
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const code = useMemo(() => otp.join(""), [otp]);
  const canVerify = code.length === CODE_LENGTH && !otp.includes("");

  // Focus first input on mount
  useEffect(() => {
    setTimeout(() => inputs.current[0]?.focus(), 150);
  }, []);

  const onChangeDigit = (text: string, index: number) => {
    const val = text.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[index] = val;
    setOtp(next);
    setError("");
    if (val && index < CODE_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const onKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const next = [...otp];
      next[index - 1] = "";
      setOtp(next);
      inputs.current[index - 1]?.focus();
    }
  };

  const onPaste = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH).split("");
    if (digits.length === 0) return;
    const next = [...otp];
    for (let i = 0; i < CODE_LENGTH; i++) next[i] = digits[i] ?? "";
    setOtp(next);
    const lastIndex = Math.min(digits.length, CODE_LENGTH) - 1;
    inputs.current[Math.max(0, lastIndex)]?.focus();
  };

  const handleVerify = async () => {
    if (!canVerify) return;
    try {
      setLoading(true);
      setError("");
      // TODO: call your backend verify endpoint here with `code`
      await new Promise((r) => setTimeout(r, 900));

      // ✅ Save token with AsyncStorage
      await AsyncStorage.setItem("access_token", "demo_access_token_value");

      // Navigate to main stack and remove auth from history
      router.replace("/(main)");
    } catch (err) {
      setError("Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    // TODO: call your backend resend endpoint
    setTimer(RESEND_SECONDS);
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code we sent to your email / phone.</Text>

        <View style={styles.otpRow}>
          {Array.from({ length: CODE_LENGTH }).map((_, i) => (
            <TextInput
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              value={otp[i]}
              onChangeText={(t) => onChangeDigit(t, i)}
              onKeyPress={(e) => onKeyPress(e, i)}
              placeholder="-"
              placeholderTextColor="#6b6b6b"
              keyboardType="number-pad"
              returnKeyType="next"
              maxLength={1}
              style={[styles.box, otp[i] ? styles.boxFilled : null]}
              selectionColor="#3BA7FF"
              onSubmitEditing={handleVerify}
              // @ts-ignore — Android paste support: capture long strings
              onTextInput={(e) => {
                if (String(e?.nativeEvent?.text || "").length > 1) {
                  onPaste(String(e.nativeEvent.text));
                }
              }}
            />
          ))}
        </View>

        {!!error && (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={16} color="#ff6b6b" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, !canVerify && styles.buttonDisabled]}
          activeOpacity={0.9}
          onPress={handleVerify}
          disabled={!canVerify || loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify & Continue</Text>}
        </TouchableOpacity>

        <View style={styles.resendRow}>
          {timer > 0 ? (
            <Text style={styles.resendText}>
              Resend code in <Text style={styles.resendTime}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend code</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0D0D0D" },
  container: {
    flex: 1,
    paddingHorizontal: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "#fff", fontSize: 26, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#aaa", fontSize: 14, textAlign: "center", marginBottom: 28 },
  otpRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  box: {
    width: 48, height: 56, borderRadius: 12, borderWidth: 1, borderColor: "#2b2b2b",
    backgroundColor: "#1A1A1A", color: "#fff", textAlign: "center", fontSize: 20,
  },
  boxFilled: { borderColor: "#3BA7FF" },
  errorRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  errorText: { color: "#ff6b6b", fontSize: 13 },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 6,
  },
  buttonDisabled: { backgroundColor: "#1E90FF55" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  resendRow: { marginTop: 16 },
  resendText: { color: "#888" },
  resendTime: { color: "#3BA7FF", fontWeight: "600" },
  resendLink: { color: "#3BA7FF", fontWeight: "600" },
});
