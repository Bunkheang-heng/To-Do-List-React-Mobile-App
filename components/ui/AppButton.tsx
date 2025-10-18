import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: ViewStyle;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  fullWidth = true,
  className,
  style,
}: AppButtonProps) {
  const baseButton = "px-4 py-3 rounded-xl items-center justify-center ";
  const widthClass = fullWidth ? "w-full " : "";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 active:bg-blue-700 ",
    secondary: "bg-gray-800 active:bg-gray-900 ",
    outline: "bg-transparent border border-gray-300 ",
  };

  const textVariants: Record<ButtonVariant, string> = {
    primary: "text-white ",
    secondary: "text-white ",
    outline: "text-gray-900 ",
  };

  const disabledClasses = disabled ? "opacity-50 " : "";

  const handlePress = () => {
    if (disabled) return;
    Haptics.selectionAsync();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={
        baseButton + widthClass + variants[variant] + disabledClasses + (className || "")
      }
      style={style}
      accessibilityRole="button"
    >
      <Text className={"text-base font-semibold " + textVariants[variant]}>{title}</Text>
    </Pressable>
  );
}


