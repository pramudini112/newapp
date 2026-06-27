import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User, Phone, Mail, MapPin, Building2, Star,
  ChevronRight, LogOut, Settings, HelpCircle, Shield,
} from 'lucide-react-native';

const C = {
  purple: '#6C47FF',
  purpleDark: '#4B2FCC',
  purpleLight: '#EDE8FF',
  surface: '#F5F3FF',
  white: '#FFFFFF',
  text: '#1A1040',
  textSub: '#6B6690',
  textLight: '#9B96B8',
  border: '#E8E4F5',
};

const menuItems = [
  { icon: Settings, label: 'Account Settings', sub: 'Manage your account' },
  { icon: Shield, label: 'Privacy & Security', sub: 'Data and permissions' },
  { icon: HelpCircle, label: 'Help & Support', sub: 'FAQs and contact' },
];

export default function Profile() {
  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={[C.purple, C.purpleDark]} style={styles.header}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarText}>OP</Text>
        </View>
        <Text style={styles.name}>Owner Perera</Text>
        <Text style={styles.role}>Property Owner</Text>
        <View style={styles.ratingRow}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>4.8 · 32 Reviews</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 16 }}>
        {/* Info */}
        <View style={styles.infoCard}>
          {[
            { Icon: Phone, value: '+94 77 123 4567' },
            { Icon: Mail, value: 'owner@email.com' },
            { Icon: MapPin, value: 'Colombo, Sri Lanka' },
            { Icon: Building2, value: '3 Properties Listed' },
          ].map(({ Icon, value }, i) => (
            <View key={i} style={[styles.infoRow, i < 3 && styles.infoRowBorder]}>
              <View style={styles.infoIcon}><Icon size={16} color={C.purple} /></View>
              <Text style={styles.infoText}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={i}
                style={[styles.menuRow, i < menuItems.length - 1 && styles.menuRowBorder]}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconWrap}><Icon size={18} color={C.purple} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSub}>{item.sub}</Text>
                </View>
                <ChevronRight size={16} color={C.textLight} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85}>
          <LogOut size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.purple },
  header: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20 },
  avatarWrap: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: { color: C.white, fontSize: 24, fontWeight: '800' },
  name: { color: C.white, fontSize: 20, fontWeight: '800' },
  role: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  rating: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600' },
  scroll: { flex: 1, backgroundColor: C.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  infoCard: {
    backgroundColor: C.white, borderRadius: 16, padding: 4,
    marginBottom: 14,
    shadowColor: '#6C47FF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 12, elevation: 3,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  infoIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: C.purpleLight, alignItems: 'center', justifyContent: 'center',
  },
  infoText: { color: C.text, fontSize: 14, fontWeight: '500' },
  menuCard: {
    backgroundColor: C.white, borderRadius: 16, padding: 4,
    marginBottom: 14,
    shadowColor: '#6C47FF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 12, elevation: 3,
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  menuIconWrap: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: C.purpleLight, alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { color: C.text, fontSize: 14, fontWeight: '600' },
  menuSub: { color: C.textLight, fontSize: 12, marginTop: 1 },
  logoutBtn: {
    backgroundColor: C.white, borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    shadowColor: '#EF4444', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 2,
  },
  logoutText: { color: '#EF4444', fontSize: 15, fontWeight: '700' },
});
