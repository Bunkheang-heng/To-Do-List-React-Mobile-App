import React, { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type TextFieldProps = TextInputProps & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, error, containerClassName, className, ...props }, ref) => {
    return (
      <View className={(containerClassName || "") + " w-full"}>
        {label ? (
          <Text className="mb-2 text-sm text-gray-700">{label}</Text>
        ) : null}
        <TextInput
          ref={ref}
          className={
            "border-2 border-gray-300 rounded-xl px-4 py-3 text-base bg-white " +
            (className || "")
          }
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {error ? (
          <Text className="mt-1 text-xs text-red-500">{error}</Text>
        ) : null}
      </View>
    );
  }
);

export default TextField;


