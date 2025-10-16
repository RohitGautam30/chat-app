import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const CoinBalance = () => {
  const navigation = useNavigation();

  const coinPacks = [
    { id: 1, coins: 80, bonus: 10, price: "₹29" },
    { id: 2, coins: 240, bonus: 15, price: "₹69" },
    { id: 3, coins: 360, bonus: 20, price: "₹119" },
    { id: 4, coins: 480, bonus: 25, price: "₹190" },
    { id: 5, coins: 720, bonus: 30, price: "₹249" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Coin Balance Section */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>COIN BALANCE</Text>
          <View style={styles.balanceRow}>
            <Ionicons name="logo-bitcoin" size={24} color="#fcf74dff" />
            <Text style={styles.balanceValue}>0</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </View>
          <View style={styles.greenBox} />

          {/* Chat Now Button */}
          <TouchableOpacity
            style={styles.chatNowButton}
            onPress={() => router.push("/chat_screen")}
          >
            <Ionicons name="chatbubble-ellipses" size={20} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.chatNowText}>Chat Now</Text>
          </TouchableOpacity>
        </View>

        {/* Coin Packs */}
        <Text style={styles.sectionTitle}>Coin Packs</Text>
        {coinPacks.map((pack) => (
          <View key={pack.id} style={styles.packContainer}>
            <View style={styles.packLeft}>
              <Text style={styles.packCoins}>
                <Ionicons name="logo-bitcoin" size={18} color="#fcf74dff" /> {pack.coins}{" "}
                <Text style={styles.coinText}>COINS</Text>
              </Text>
              <Text style={styles.packBonus}>{pack.bonus}% BONUS</Text>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.priceText}>{pack.price}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* About Coins */}
        <View style={styles.aboutContainer}>
          <Text style={styles.sectionTitle}>About Coins</Text>
          <Text style={styles.aboutText}>• Your coins never expire – they are yours for life</Text>
          <Text style={styles.aboutText}>• Use your coins to talk and chat more</Text>
          <Text style={styles.aboutText}>• Buying coins is safe and trusted by millions of users</Text>
          <Text style={styles.aboutText}>• Coins cannot be transferred between accounts</Text>
          <Text style={styles.aboutText}>• You can also earn coins by watching ads</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  balanceContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  balanceTitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 5,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceValue: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  greenBox: {
    width: "90%",
    height: 40,
    backgroundColor: "#A4E75B",
    borderRadius: 5,
    marginTop: 10,
  },
  chatNowButton: {
    marginTop: 20,
    backgroundColor: "#FFD700",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  chatNowText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  packContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  packLeft: {},
  packCoins: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  coinText: {
    color: "#FFD700",
  },
  packBonus: {
    color: "#999",
    fontSize: 12,
    marginTop: 2,
  },
  buyButton: {
    backgroundColor: "#2E2E2E",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  priceText: {
    color: "#fff",
    fontWeight: "600",
  },
  aboutContainer: {
    marginTop: 25,
  },
  aboutText: {
    color: "#aaa",
    fontSize: 13,
    lineHeight: 22,
  },
});

export default CoinBalance;
