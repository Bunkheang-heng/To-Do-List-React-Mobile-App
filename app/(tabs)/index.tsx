import MenuCard from '@/components/MenuCard';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import Animated, {
  FadeInUp,
} from 'react-native-reanimated';



export default function HomeScreen() {
  const router = useRouter();

  type MenuItem = {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    colors: readonly [import('react-native').ColorValue, import('react-native').ColorValue, ...import('react-native').ColorValue[]];
    onPressed: () => void;
  };

  const MenuItems: MenuItem[] = [
    { 
      title: 'Note', 
      icon: 'document-text',
      colors: ['#6366F1', '#06B6D4'] as const,
      onPressed: () => { router.push('/note'); }
    },
    { 
      title: 'AI Assistant', 
      icon: 'chatbubbles-outline',
      colors: ['#F59E0B', '#EF4444'] as const,
      onPressed: () => { console.log('Ai Assistant pressed'); }
    },
    { 
      title: 'Profile', 
      icon: 'person-circle',
      colors: ['#10B981', '#3B82F6'] as const,
      onPressed: () => { console.log('Profile pressed'); }
    },
    { 
      title: 'Setting', 
      icon: 'settings',
      colors: ['#8B5CF6', '#EC4899'] as const,
      onPressed: () => { console.log('Setting pressed'); }
    },    
    { 
      title: 'About Us', 
      icon: 'information-circle',
      colors: ['#8B5CF6', '#EC4899'] as const,
      onPressed: () => { console.log('About pressed'); }
    },
  ];
  return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        className="bg-white relative"
        showsVerticalScrollIndicator={false}
      >
        <View className='px-5'>
          <View className='mt-6 mb-1'>
            <Text className='text-2xl font-semibold text-slate-800 text-center'>WELCOME BACK</Text>
            <Text className='text-slate-500 text-center mt-1'>Choose an action to get started</Text>
          </View>

          <Text className='text-base font-medium text-slate-700 mt-6 text-center'>Quick Actions</Text>
          <View className='flex flex-row flex-wrap justify-center mt-4'>
            {MenuItems.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInUp.delay(index * 80)}
              >
                <MenuCard
                  title={item.title}
                  icon={item.icon}
                  colors={item.colors}
                  onPressed={item.onPressed}
                />
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
  );
}