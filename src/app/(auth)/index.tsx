import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imagePath from "@/src/constants/images";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { router } from "expo-router";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate_to_welcome = () => {
    router.push("/(auth)/terms_agree");
  };

  const loading_timeout = () => {
    setIsLoading(true);
    setTimeout(navigate_to_welcome, 3000);
  };

  useEffect(() => {
    const t = setTimeout(loading_timeout, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} />
      <View style={styles.body}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#3BA7FF" />
        ) : (
          <Image source={imagePath.logo} style={styles.logo_style} resizeMode="contain" />
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.fromtext}>From</Text>
        <Text style={styles.respawntext}>Respawn</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(50),
  },
  header: {},
  body: {},
  footer: {
    alignItems: "center",
  },
  fromtext: {
    fontSize: moderateScale(12),
    color: "#a39e9eff",
  },
  respawntext: {
    fontSize: moderateScale(15),
    color: "#ffffffff",
  },
  logo_style: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(10),
  },
});

export default Auth;
