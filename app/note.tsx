import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Note() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [visibleMonth, setVisibleMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [notes, setNotes] = useState<
    { id: string; title: string; content: string; date: Date }[]
  >([]);

  const formattedDate = useMemo(() => {
    try {
      return selectedDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return selectedDate.toDateString();
    }
  }, [selectedDate]);

  const monthLabel = useMemo(() => {
    try {
      return visibleMonth.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      });
    } catch {
      return `${visibleMonth.getMonth() + 1}/${visibleMonth.getFullYear()}`;
    }
  }, [visibleMonth]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const getMonthGrid = (month: Date) => {
    const year = month.getFullYear();
    const m = month.getMonth();
    const firstDay = new Date(year, m, 1);
    const startWeekDay = firstDay.getDay(); // 0=Sun
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, m, 0).getDate();

    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
      if (i < startWeekDay) {
        const day = daysInPrevMonth - startWeekDay + 1 + i;
        cells.push(new Date(year, m - 1, day));
      } else if (i < startWeekDay + daysInMonth) {
        const day = i - startWeekDay + 1;
        cells.push(new Date(year, m, day));
      } else {
        const day = i - (startWeekDay + daysInMonth) + 1;
        cells.push(new Date(year, m + 1, day));
      }
    }
    return cells;
  };

  const monthDays = useMemo(() => getMonthGrid(visibleMonth), [visibleMonth]);

  const adjustDate = (part: "day" | "month" | "year", delta: number) => {
    const d = new Date(selectedDate);
    if (part === "day") d.setDate(d.getDate() + delta);
    else if (part === "month") d.setMonth(d.getMonth() + delta);
    else d.setFullYear(d.getFullYear() + delta);
    setSelectedDate(d);
  };

  const setToday = () => setSelectedDate(new Date());

  const handleSave = () => {
    if (title.trim() || note.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now().toString(),
          title: title || "Untitled",
          content: note,
          date: selectedDate,
        },
      ]);
      setTitle("");
      setNote("");
      setToday();
    }
  };

  // Load notes from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("notes.v1");
        if (raw) {
          const parsed: { id: string; title: string; content: string; date: string }[] = JSON.parse(raw);
          setNotes(parsed.map(n => ({ ...n, date: new Date(n.date) })));
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  // Persist notes whenever they change
  useEffect(() => {
    (async () => {
      try {
        const toSave = notes.map(n => ({ ...n, date: n.date.toISOString() }));
        await AsyncStorage.setItem("notes.v1", JSON.stringify(toSave));
      } catch (e) {
        // ignore
      }
    })();
  }, [notes]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 p-5 pt-10">
        <Text className="text-2xl font-bold text-blue-700 mb-4 text-center">Pick Your Day</Text>

        {/* Date selector - calendar month view */}
        <View className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-3">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 items-center justify-center mr-2"
                activeOpacity={0.8}
              >
                <Ionicons name="chevron-back" size={18} color="#334155" />
              </TouchableOpacity>
              <Text className="text-slate-800 font-semibold">{monthLabel}</Text>
              <TouchableOpacity
                onPress={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 items-center justify-center ml-2"
                activeOpacity={0.8}
              >
                <Ionicons name="chevron-forward" size={18} color="#334155" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={setToday} activeOpacity={0.7} className="px-3 py-1 bg-blue-600 rounded-full">
              <Text className="text-white text-xs font-semibold">Today</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-slate-600 mb-3">Selected: {formattedDate}</Text>

          {/* Weekday headers */}
          <View className="flex-row justify-between mb-1 px-1">
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <Text key={`${d}-${i}`} className="text-[12px] text-slate-500" style={{ width: '14.2857%', textAlign: 'center' }}>{d}</Text>
            ))}
          </View>

          {/* Days grid */}
          <View className="flex-row flex-wrap">
            {monthDays.map((d, idx) => {
              const inCurrent = d.getMonth() === visibleMonth.getMonth();
              const selected = isSameDay(d, selectedDate);
              const today = isSameDay(d, new Date());
              const circleClasses = selected
                ? 'bg-blue-600'
                : today
                ? 'bg-slate-900'
                : inCurrent
                ? 'bg-white'
                : 'bg-slate-100';
              const textClasses = selected
                ? 'text-white'
                : inCurrent
                ? 'text-slate-700'
                : 'text-slate-400';
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setSelectedDate(d);
                    setVisibleMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                    const iso = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0,10);
                    router.push(`/note/${iso}`);
                  }}
                  activeOpacity={0.8}
                  style={{ width: '14.2857%', paddingVertical: 6 }}
                  className="items-center justify-center"
                >
                  <View className={`w-9 h-9 rounded-full border ${circleClasses} ${selected ? 'border-blue-600' : 'border-slate-200'} items-center justify-center`}>
                    <Text className={`text-[13px] ${textClasses}`}>{d.getDate()}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
