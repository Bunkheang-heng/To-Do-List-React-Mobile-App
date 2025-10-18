import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View>
        <Text>
            Hello React Native
        </Text>
        <Link href="/login" style={{ textAlign: 'center', marginTop: 8 }}>Login</Link>
        <Link href="/register" style={{ textAlign: 'center', marginTop: 8 }}>Register</Link>
    </View>
 )};
