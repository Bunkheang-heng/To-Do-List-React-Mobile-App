import { ScrollView,View, Text } from 'react-native';
import MenuCard from '@/components/MenuCard';
import { useRouter } from 'expo-router';

const router = useRouter();

const MenuItems = [
  { title: 'Note',onPressed: () => {
     router.push('/note');
  } },
  { title: 'Ai Assistant',onPressed: () => {
    console.log('pressed');
  } },
  { title: 'Profile',onPressed: () => {
    console.log('Profile pressed');
  } },
];

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 2 }} className="bg-white">
      <Text className='text-center text-xl mt-6'>Menu</Text>
      <View className='flex flex-row flex-wrap justify-center mt-5'>
        {
          MenuItems.map((item, index) => (
            <MenuCard key={index} title={item.title} onPressed={item.onPressed}   />
          ))
        }
        </View>
    </ScrollView>
 )};
