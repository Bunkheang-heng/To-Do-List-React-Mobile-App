import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

type DayTask = {
  id: string;
  title: string;
  time: string; // HH:mm
  done: boolean;
};

export default function DayDetail() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const router = useRouter();
  const [tasks, setTasks] = useState<DayTask[]>([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00');

  const headerDate = useMemo(() => {
    try {
      return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return date;
    }
  }, [date]);

  const storageKey = `daytasks.v1:${date}`;

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKey);
        if (raw) setTasks(JSON.parse(raw));
      } catch {
        // ignore
      }
    })();
  }, [storageKey]);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(tasks));
      } catch {
        // ignore
      }
    })();
  }, [tasks, storageKey]);

  const addTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), title: trimmed, time, done: false },
    ]);
    setTitle('');
  };

  const toggleDone = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View className="flex-row items-center p-4 pt-12 border-b border-slate-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-2" activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-slate-800">{headerDate}</Text>
      </View>

      <View className="p-4">
        <View className="flex-row items-center mb-3">
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="What do you need to do?"
            className="flex-1 bg-slate-100 px-4 py-3 rounded-lg mr-2"
            maxLength={100}
          />
          <TextInput
            value={time}
            onChangeText={setTime}
            placeholder="HH:mm"
            keyboardType="numbers-and-punctuation"
            className="w-24 bg-slate-100 px-3 py-3 rounded-lg mr-2 text-center"
            maxLength={5}
          />
          <TouchableOpacity onPress={addTask} className="bg-blue-600 px-3 py-3 rounded-lg" activeOpacity={0.8}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {tasks.length === 0 ? (
          <Text className="text-slate-400 text-center mt-10">No tasks yet for this day.</Text>
        ) : (
          <FlatList
            data={[...tasks].sort((a, b) => a.time.localeCompare(b.time))}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row items-center bg-white border border-slate-200 rounded-lg p-3 mb-2">
                <TouchableOpacity onPress={() => toggleDone(item.id)} className="w-6 h-6 rounded border border-slate-300 items-center justify-center mr-3" activeOpacity={0.7}>
                  {item.done ? <Ionicons name="checkmark" size={16} color="#0ea5e9" /> : null}
                </TouchableOpacity>
                <Text className={`flex-1 ${item.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{item.title}</Text>
                <Text className="text-slate-500 mr-3">{item.time}</Text>
                <TouchableOpacity onPress={() => removeTask(item.id)} activeOpacity={0.7}>
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            )}
            style={{ marginBottom: 20 }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}


