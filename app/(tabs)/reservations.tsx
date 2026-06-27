import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CalendarDays, Clock, CheckCircle2, XCircle } from 'lucide-react-native';

const C = {
  purple: '#6C47FF',
  purpleDark: '#4B2FCC',
  surface: '#F5F3FF',
  white: '#FFFFFF',
  text: '#1A1040',
  textSub: '#6B6690',
  textLight: '#9B96B8',
};

const reservations = [
  { name: 'Anuradha Perera', property: 'Green View Annex', date: '01 Jun 2025', status: 'Pending' },
  { name: 'Kasun Fernando', property: 'Sunrise Hostel', date: '05 Jun 2025', status: 'Confirmed' },
  { name: 'Nimasha Silva', property: 'Lake View Rooms', date: '10 Jun 2025', status: 'Pending' },
  { name: 'Dilshan Jayawardena', property: 'Green View Annex', date: '15 Jun 2025', status: 'Confirmed' },
  { name: 'Sachini Wijeratne', property: 'Sunrise Hostel', date: '20 Jun 2025', status: 'Cancelled' },
];

const statusConfig: Record<string, { color: string; bg: string; Icon: any }> = {
  Pending: { color: '#F59E0B', bg: '#FEF3C7', Icon: Clock },
  Confirmed: { color: '#22C55E', bg: '#D1FAE5', Icon: CheckCircle2 },
  Cancelled: { color: '#EF4444', bg: '#FEE2E2', Icon: XCircle },
};

export default function Reservations() {
  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={[C.purple, C.purpleDark]} style={styles.header}>
        <Text style={styles.title}>Reservations</Text>
      </LinearGradient>
      <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 16, gap: 10 }}>
        {reservations.map((r, i) => {
          const sc = statusConfig[r.status];
          const StatusIcon = sc.Icon;
          return (
            <TouchableOpacity key={i} style={styles.card} activeOpacity={0.85}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{r.name.split(' ').map(n => n[0]).join('')}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{r.name}</Text>
                <Text style={styles.property}>{r.property}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                  <CalendarDays size={11} color={C.textLight} />
                  <Text style={styles.date}>{r.date}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                <StatusIcon size={12} color={sc.color} />
                <Text style={[styles.statusText, { color: sc.color }]}>{r.status}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.purple },
  header: { paddingHorizontal: 20, paddingVertical: 20 },
  title: { color: C.white, fontSize: 20, fontWeight: '800' },
  scroll: { flex: 1, backgroundColor: C.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  card: {
    backgroundColor: C.white, borderRadius: 16, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    shadowColor: '#6C47FF', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06, shadowRadius: 10, elevation: 2,
    marginBottom: 2,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#6C47FF', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: C.white, fontSize: 13, fontWeight: '700' },
  name: { color: C.text, fontSize: 14, fontWeight: '700' },
  property: { color: C.textSub, fontSize: 12, marginTop: 2 },
  date: { color: C.textLight, fontSize: 11 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5,
  },
  statusText: { fontSize: 11, fontWeight: '700' },
});
