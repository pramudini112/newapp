import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Building2, Plus, MapPin, BedDouble } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const C = {
  purple: '#6C47FF',
  purpleDark: '#4B2FCC',
  purpleLight: '#EDE8FF',
  surface: '#F5F3FF',
  white: '#FFFFFF',
  text: '#1A1040',
  textSub: '#6B6690',
  textLight: '#9B96B8',
};

const boardings = [
  { name: 'Green View Annex', location: 'Colombo 07', beds: 10, available: 3 },
  { name: 'Sunrise Hostel', location: 'Nugegoda', beds: 8, available: 1 },
  { name: 'Lake View Rooms', location: 'Kandy', beds: 10, available: 5 },
];

export default function Boardings() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={[C.purple, C.purpleDark]} style={styles.header}>
        <Text style={styles.title}>My Boardings</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/add-boarding')} activeOpacity={0.8}>
          <Plus size={20} color={C.white} />
        </TouchableOpacity>
      </LinearGradient>
      <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 16, gap: 12 }}>
        {boardings.map((b, i) => (
          <TouchableOpacity key={i} style={styles.card} activeOpacity={0.85}>
            <View style={styles.iconWrap}>
              <Building2 size={24} color={C.purple} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{b.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <MapPin size={12} color={C.textLight} />
                <Text style={styles.cardSub}>{b.location}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <BedDouble size={12} color={C.textLight} />
                <Text style={styles.cardSub}>{b.beds} beds · {b.available} available</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.purple },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: { color: C.white, fontSize: 20, fontWeight: '800' },
  addBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: { flex: 1, backgroundColor: C.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  card: {
    backgroundColor: C.white, borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    shadowColor: '#6C47FF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 12, elevation: 3,
  },
  iconWrap: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: '#EDE8FF', alignItems: 'center', justifyContent: 'center',
  },
  cardTitle: { color: C.text, fontSize: 15, fontWeight: '700' },
  cardSub: { color: C.textLight, fontSize: 12 },
});
