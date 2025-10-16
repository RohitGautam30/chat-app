import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import imagePath from "@/src/constants/images";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate backend signup delay
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/verify_otp"); // ✅ redirect to OTP page
    }, 1200);
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Image source={imagePath.logo} style={styles.logo} />

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          {/* Input: Name */}
          <View style={styles.inputWrap}>
            <Ionicons name="person-outline" size={18} color="#8a8a8a" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#8a8a8a"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Input: Email */}
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

          <View style={styles.inputWrap}>
            <Ionicons name="mail-outline" size={18} color="#8a8a8a" />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#8a8a8a"
              autoCapitalize="none"
              
              onChangeText={setEmail}
            />
          </View>

          {/* Input: Password */}
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
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Ionicons
                name={secure ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#8a8a8a"
              />
            </TouchableOpacity>
          </View>

          {/* Input: Confirm Password */}
          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={18} color="#8a8a8a" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#8a8a8a"
              secureTextEntry={secure}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Error Message */}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Signup Button */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={handleSignup}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.link}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
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
  error: {
    color: "#ff6b6b",
    marginTop: 6,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 16,
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
