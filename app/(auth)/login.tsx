import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import AppButton from '../../components/ui/AppButton';
import Logo from '../../components/ui/Logo';
import Screen from '../../components/ui/Screen';
import TextField from '../../components/ui/TextField';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter email and password.');
      return;
    } 
    else{
      console.log(email, password);
      router.push('/(tabs)');
    }
  };

  return (
    <Screen>
      <View className='flex-1 gap-6 justify-center'>
        <View className='items-center mb-2'>
          <Logo />
        </View>
        <Text className='text-3xl font-bold text-center'>Welcome back</Text>
        <View className='gap-4'>
          <TextField
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextField
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <AppButton title="Sign in" onPress={onSubmit} />
          <Link href="/register" style={{ textAlign: 'center', marginTop: 8 }}>Create an account</Link>
        </View>
      </View>
    </Screen>
  );
}



