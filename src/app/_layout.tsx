import { Stack, Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync().catch(() => {});

const RootLayout = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Always start logged out
        setIsLogin(false);
      } catch (error) {
        console.log("Error:", error);
        setIsLogin(false);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    init();
  }, []);

  if (isLogin === null) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {isLogin ? <Redirect href="/(main)" /> : <Redirect href="/(auth)" />}
    </>
  );
};

export default RootLayout;
