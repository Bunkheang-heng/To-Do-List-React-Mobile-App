import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AppButton from '../../components/ui/AppButton';
import Screen from '../../components/ui/Screen';
import TextField from '../../components/ui/TextField';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both your email and password to continue.');
      return;
    } else {
      console.log(email, password);
      router.push('/(tabs)');
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6 bg-white">
          <View className="items-center mb-8">
            <Image
              className="w-56 h-56 rounded-2xl shadow-lg border-2 border-blue-100 bg-[#f3f6fb]"
              source={require("../../assets/gif/login.gif")}
              resizeMode="contain"
            />
          </View>
          
          <Text className="text-4xl font-extrabold text-center mb-1 text-blue-800 tracking-tight">
            Welcome Back
          </Text>
          <Text className="text-lg text-center text-gray-500 mb-6">
            Sign in to your account below to get started!
          </Text>

          <View className="gap-5">
            <TextField
              label="Email"
              placeholder="you@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              className="bg-slate-100 rounded-xl px-3 py-2"
            />

            <View className="relative">
              <TextField
                label="Password"
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                className="bg-slate-100 rounded-xl px-3 py-2"            
              />
              <TouchableOpacity
                className="absolute right-3 bottom-5 p-1 z-10"
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Text className="text-sky-400 font-semibold text-xs">
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>

            <AppButton
              title="Sign In"
              onPress={onSubmit}
              className="bg-blue-700 py-3.5 rounded-xl shadow-lg shadow-blue-300"              
            />

            <View className="flex-row justify-center mt-3">
              <Text className="text-gray-600">
                New here?{" "}
              </Text>
              <Link
                href="/register"
                className="text-blue-700 font-bold ml-1 text-center"
              >
                Create an account
              </Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
