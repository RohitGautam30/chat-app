// Profile.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import imagePath from "@/src/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        <Image
          source={imagePath.Girl}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.name}>Miya</Text>
          <Text style={styles.subtitle}>I love unfiltered deep talk!</Text>

          {/* Button Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.chatButton}>
              <Text style={styles.chatText}>💬</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Text style={styles.callText}>📞</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Coin Info */}
      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>361 Fill × 535.28 • Video</Text>
      </View>

      {/* Footer Links */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.link}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.delete}>Delete chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    margin: 12,
    overflow: "hidden",
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 400,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  chatButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    width: 60,
    alignItems: "center",
  },
  callButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 25,
    width: 60,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  chatText: {
    color: "#000",
    fontSize: 18,
  },
  callText: {
    color: "#fff",
    fontSize: 18,
  },
  coinContainer: {
    backgroundColor: "#1c1c1e",
    marginHorizontal: 12,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  coinText: {
    color: "#fff",
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  link: {
    color: "#aaa",
    fontSize: 14,
    marginVertical: 6,
  },
  delete: {
    color: "red",
    fontSize: 14,
    marginVertical: 8,
  },
});
