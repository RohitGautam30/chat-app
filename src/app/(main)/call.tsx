import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import imagePath from "@/src/constants/images";


const CallScreen = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={styles.coinBox}>
          <Ionicons name="logo-bitcoin" size={18} color="#FFD700" />
          <Text style={styles.coinText}>1200</Text>
        </View>

        <Ionicons name="ellipsis-vertical" size={20} color="#ccc" />
      </View>

      {/* Profile & Call Info */}
      <View style={styles.centerArea}>
        <Image
          source={imagePath.Girl}
          style={styles.avatar}
        />
        <Text style={styles.name}>Miya</Text>
        <Text style={styles.status}>On Call</Text>
        <Text style={styles.timer}>{formatTime()}</Text>
      </View>

      {/* Bottom Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mic-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="volume-high-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconButton, styles.endCall]}>
          <Ionicons name="call" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 30,
  },
  coinBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  coinText: {
    color: "#FFD700",
    fontWeight: "600",
    marginLeft: 4,
  },
  centerArea: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  status: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },
  timer: {
    color: "#fff",
    fontSize: 18,
    marginTop: 8,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    marginBottom: 40,
  },
  iconButton: {
    backgroundColor: "#1C1C1C",
    borderRadius: 40,
    padding: 18,
  },
  endCall: {
    backgroundColor: "#E53935",
  },
});
