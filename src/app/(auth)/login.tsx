import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import imagePath from "@/src/constants/images";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    // Simulate a delay (API call)
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/verify_otp"); // ✅ Navigate to verify_otp.tsx
    }, 1000);
  };

  const handleSignup = () => {
    router.push("/(auth)/signup"); // ✅ Optional signup navigation
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Logo */}
        <Image source={imagePath.logo} style={styles.logo} />

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        {/* Email Input */}
        <View style={styles.inputWrap}>
          <Ionicons name="mail-outline" size={18} color="#8a8a8a" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8a8a8a"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed-outline" size={18} color="#8a8a8a" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8a8a8a"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecure((s) => !s)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#8a8a8a"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotWrap} onPress={() => {}}>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 20,
    marginBottom: 24,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 22,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2b2b2b",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  forgotWrap: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    marginTop: 22,
  },
  footerText: {
    color: "#888",
  },
  link: {
    color: "#3BA7FF",
    fontWeight: "600",
  },
});
