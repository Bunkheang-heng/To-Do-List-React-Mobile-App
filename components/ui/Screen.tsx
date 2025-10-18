import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  center?: boolean;
  className?: string;
};

export default function Screen({ children, center = false, className }: ScreenProps) {
  return (
    <SafeAreaView className={(className || "") + " flex-1 bg-white"}>
      <StatusBar style="dark" />
      <View className={(center ? "justify-center items-center " : "") + "flex-1 px-5"}>
        {children}
      </View>
    </SafeAreaView>
  );
}


