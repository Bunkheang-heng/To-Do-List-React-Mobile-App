import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import AppButton from "../components/ui/AppButton";
import Screen from "../components/ui/Screen";

export default function Index() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1">
        {/* Decorative background circles */}
        <View className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-100 opacity-60" />
        <View className="absolute top-40 -left-10 w-40 h-40 rounded-full bg-indigo-100 opacity-60" />

        <View className="flex-1 justify-center items-center gap-6">
          <Image
            source={require("../assets/images/react-logo.png")}
            style={{ width: 140, height: 140 }}
            resizeMode="contain"
          />
          <Text className="text-4xl font-extrabold text-center text-gray-900">
            Organize your day
          </Text>
          <Text className="text-base text-center text-gray-600 px-8">
            Simple and beautiful to-do lists to keep you focused and get more done.
          </Text>
        </View>

        <View className="gap-3 mb-8">
          <AppButton title="Get started" onPress={() => router.push("/login")} />
          <AppButton
            title="Create an account"
            variant="outline"
            onPress={() => router.push("/register")}
          />
        </View>
      </View>
    </Screen>
  );
}
