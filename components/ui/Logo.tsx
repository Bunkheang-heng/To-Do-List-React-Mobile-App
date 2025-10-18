import React from "react";
import { Image, ImageStyle, View } from "react-native";

type LogoProps = {
  size?: number;
  style?: ImageStyle;
};

export default function Logo({ size = 96, style }: LogoProps) {
  return (
    <View className="items-center justify-center">
      <Image
        source={require("../../assets/logo/appLogo.png")}
        style={[{ width: size, height: size, borderRadius: size / 5 }, style]}
        resizeMode="contain"
      />
    </View>
  );
}


