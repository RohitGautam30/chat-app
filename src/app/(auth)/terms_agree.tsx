import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import imagePath from "@/src/constants/images";

const TermsAgree = () => {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const canContinue = agreed && ageConfirmed;

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={imagePath.logo} style={styles.avatar} />
        <Text style={styles.name}>Welcome to Respawn</Text>
        <Text style={styles.status}>Virtual Companion</Text>
      </View>

      {/* Terms Box */}
      <View style={styles.box}>
        <Text style={styles.title}>Before You Begin</Text>
        <Text style={styles.subtitle}>
          "To keep things safe and respectful, please read and agree to our
          terms below."
        </Text>

        {/* Age Confirmation */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setAgeConfirmed(!ageConfirmed)}
        >
          <View style={[styles.checkbox, ageConfirmed && styles.checkedBox]}>
            {ageConfirmed && <Ionicons name="checkmark" size={18} color="#fff" />}
          </View>
          <Text style={styles.optionText}>I am above 18 years of age</Text>
        </TouchableOpacity>

        {/* Terms & Privacy */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setAgreed(!agreed)}
        >
          <View style={[styles.checkbox, agreed && styles.checkedBox]}>
            {agreed && <Ionicons name="checkmark" size={18} color="#fff" />}
          </View>
          <Text style={styles.optionText}>
            I agree to the{" "}
            <Text style={styles.link}>Terms & Conditions</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.button, !canContinue && styles.disabledButton]}
          disabled={!canContinue}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsAgree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D", // dark background like the Figma design
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  status: {
    fontSize: 18,
    color: "#ffffffff",
  },
  box: {
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    padding: 25,
    width: "100%",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 25,
    lineHeight: 18,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#3BA7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: "#3BA7FF",
  },
  optionText: {
    fontSize: 14,
    color: "#eee",
    flexShrink: 1,
    lineHeight: 20,
  },
  link: {
    color: "#3BA7FF",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#3BA7FF",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#3BA7FF55",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
