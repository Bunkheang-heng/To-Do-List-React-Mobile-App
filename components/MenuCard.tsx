import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import type { ColorValue } from "react-native";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type MenuCardProps = {
  title: string;
  onPressed: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]]; // gradient colors (min 2)
};

const MenuCard = (props: MenuCardProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    Haptics.selectionAsync().catch(() => {});
    scale.value = withTiming(0.96, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 120 });
  };

  const gradientColors: readonly [ColorValue, ColorValue, ...ColorValue[]] =
    props.colors ?? (["#7C3AED", "#06B6D4"] as const); // violet → cyan

  return (
    <Animated.View style={animatedStyle} className="m-4">
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={props.onPressed}
        className="rounded-2xl overflow-hidden w-[150px] h-[120px]"
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          <View className="flex-1 items-center justify-center">
            {props.icon ? (
              <Ionicons name={props.icon} size={28} color="#ffffff" />
            ) : null}
            <Text className="text-white font-medium mt-2">{props.title}</Text>
          </View>
          {/* subtle sheen */}
          <View className="absolute left-0 right-0 top-0 h-1/3 opacity-20" style={{
            backgroundColor: "#ffffff",
          }} />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

export default MenuCard;