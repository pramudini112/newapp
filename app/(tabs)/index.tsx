import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Bell,
  Search,
  Menu,
  ChevronRight,
  BedDouble,
  CalendarCheck,
  Wallet,
  CreditCard,
  Star,
  Home,
  User,
  Clock,
  Plus,
  CalendarClock,
  ClipboardList,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

// ─── Palette ────────────────────────────────────────────────
const C = {
  purple: '#6C47FF',
  purpleDark: '#4B2FCC',
  purpleLight: '#EDE8FF',
  purpleMid: '#8B6FFF',
  surface: '#F5F3FF',
  white: '#FFFFFF',
  text: '#1A1040',
  textSub: '#6B6690',
  textLight: '#9B96B8',
  success: '#22C55E',
  warning: '#F59E0B',
  card1: '#6C47FF',
  card2: '#8B6FFF',
  border: '#E8E4F5',
};

// ─── Mock Data ───────────────────────────────────────────────
const stats = [
  { label: 'Total Boardings', value: '5', icon: Home, bg: C.white, accent: C.purple },
  { label: 'Total Beds', value: '28', icon: BedDouble, bg: C.white, accent: C.purpleMid },
  { label: 'Active Reservations', value: '12', icon: CalendarCheck, bg: C.white, accent: '#10B981' },
  { label: 'Monthly Revenue', value: 'Rs.245,000', icon: Wallet, bg: C.white, accent: '#F59E0B', wide: true },
  { label: 'Pending Payments', value: '4', icon: CreditCard, bg: C.white, accent: '#EF4444', badge: true },
  { label: 'Reviews', value: '32', icon: Star, bg: C.white, accent: '#F59E0B' },
];

const reservations = [
  {
    rank: '1st',
    property: 'Green View Annex',
    tenant: 'Anuradha Perera',
    checkIn: '01 Jun 2025',
    status: 'Pending',
    avatar: 'AP',
  },
  {
    rank: '2nd',
    property: 'Sunrise Hostel',
    tenant: 'Kasun Fernando',
    checkIn: '05 Jun 2025',
    status: 'Confirmed',
    avatar: 'KF',
  },
  {
    rank: '3rd',
    property: 'Lake View Rooms',
    tenant: 'Nimasha Silva',
    checkIn: '10 Jun 2025',
    status: 'Pending',
    avatar: 'NS',
  },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.purple} />

      {/* Header Gradient */}
      <LinearGradient
        colors={[C.purple, C.purpleDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.iconBtn}>
            <Menu size={22} color={C.white} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Owner Dashboard</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Bell size={20} color={C.white} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, { marginLeft: 8 }]}>
              <Search size={20} color={C.white} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hello, Owner! 👋</Text>
          <Text style={styles.greetingSub}>Here's your property overview.</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.newBoardingBtn}
            onPress={() => router.push('/add-boarding')}
            activeOpacity={0.85}
          >
            <View style={styles.actionIconWrap}>
              <Plus size={16} color={C.white} strokeWidth={2.5} />
            </View>
            <Text style={styles.actionBtnText}>New Boarding</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.availabilityBtn}
            onPress={() => router.push('/manage-availability')}
            activeOpacity={0.85}
          >
            <View style={styles.availabilityIconWrap}>
              <CalendarClock size={16} color={C.purple} strokeWidth={2.5} />
            </View>
            <Text style={styles.availabilityBtnText}>Manage Availability</Text>
          </TouchableOpacity>
        </View>

        {/* Reservation Requests Button */}
        <TouchableOpacity
          style={styles.reservationRequestBtn}
          onPress={() => router.push('/reservation-requests')}
          activeOpacity={0.85}
        >
          <View style={styles.reservationRequestLeft}>
            <View style={styles.reservationRequestIconWrap}>
              <ClipboardList size={18} color={C.purple} strokeWidth={2.5} />
            </View>
            <View>
              <Text style={styles.reservationRequestTitle}>Reservation Requests</Text>
              <Text style={styles.reservationRequestSub}>3 pending approvals</Text>
            </View>
          </View>
          <View style={styles.reservationRequestBadge}>
            <Text style={styles.reservationRequestBadgeText}>3</Text>
          </View>
        </TouchableOpacity>

        {/* Recent Reservations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reservations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {reservations.map((r, i) => (
            <ReservationCard key={i} reservation={r} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Stat Card ───────────────────────────────────────────────
function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const Icon = stat.icon;
  return (
    <View style={[styles.statCard, stat.wide && styles.statCardWide]}>
      <View style={[styles.statIconWrap, { backgroundColor: stat.accent + '18' }]}>
        <Icon size={16} color={stat.accent} strokeWidth={2.5} />
      </View>
      <Text style={styles.statLabel}>{stat.label}</Text>
      <View style={styles.statValueRow}>
        <Text style={[styles.statValue, stat.wide && styles.statValueLg]}>{stat.value}</Text>
        {stat.badge && (
          <View style={styles.badge}>
            <Clock size={10} color={C.white} />
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Reservation Card ────────────────────────────────────────
function ReservationCard({ reservation }: { reservation: (typeof reservations)[0] }) {
  const isPending = reservation.status === 'Pending';
  return (
    <TouchableOpacity style={styles.resCard} activeOpacity={0.85}>
      <View style={styles.resRankBadge}>
        <Text style={styles.resRank}>{reservation.rank}</Text>
      </View>

      <View style={styles.resBody}>
        <View style={styles.resTop}>
          <Text style={styles.resProperty}>{reservation.property}</Text>
          <ChevronRight size={16} color={C.textLight} />
        </View>

        <View style={styles.resMeta}>
          <View style={styles.resAvatar}>
            <Text style={styles.resAvatarText}>{reservation.avatar}</Text>
          </View>
          <View style={styles.resInfo}>
            <Text style={styles.resTenant}>{reservation.tenant}</Text>
            <View style={styles.resCheckRow}>
              <Clock size={11} color={C.textLight} />
              <Text style={styles.resCheckIn}>Check-in: {reservation.checkIn}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, isPending ? styles.statusPending : styles.statusConfirmed]}>
            <Text style={[styles.statusText, { color: isPending ? C.warning : C.success }]}>
              {reservation.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.purple,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 12 : 4,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    color: C.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    marginTop: 4,
  },
  greetingText: {
    color: C.white,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  greetingSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '400',
  },
  scroll: {
    flex: 1,
    backgroundColor: C.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -12,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#6C47FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    flexGrow: 0,
  },
  statCardWide: {
    width: '47%',
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statLabel: {
    color: C.textSub,
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
    lineHeight: 16,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    color: C.text,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  statValueLg: {
    fontSize: 20,
  },
  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Action buttons row
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  newBoardingBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: C.purple,
    borderRadius: 14,
    paddingVertical: 14,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 14,
    elevation: 6,
  },
  availabilityBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: C.white,
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: C.purpleLight,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  actionIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  availabilityIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: C.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: C.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.1,
  },
  availabilityBtnText: {
    color: C.purple,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.1,
  },

  // Reservation Requests Button
  reservationRequestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.white,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: C.purpleLight,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  reservationRequestLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reservationRequestIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reservationRequestTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: C.text,
    marginBottom: 2,
  },
  reservationRequestSub: {
    fontSize: 12,
    color: C.textSub,
    fontWeight: '500',
  },
  reservationRequestBadge: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: C.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reservationRequestBadgeText: {
    color: C.white,
    fontSize: 13,
    fontWeight: '800',
  },

  // Section
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: C.text,
    fontSize: 16,
    fontWeight: '700',
  },
  seeAll: {
    color: C.purple,
    fontSize: 12,
    fontWeight: '600',
  },

  // Reservation Card
  resCard: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#6C47FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  resRankBadge: {
    backgroundColor: C.purpleLight,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
    marginTop: 2,
  },
  resRank: {
    color: C.purple,
    fontSize: 11,
    fontWeight: '700',
  },
  resBody: {
    flex: 1,
  },
  resTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resProperty: {
    color: C.text,
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  resMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  resAvatarText: {
    color: C.white,
    fontSize: 11,
    fontWeight: '700',
  },
  resInfo: {
    flex: 1,
  },
  resTenant: {
    color: C.text,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  resCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resCheckIn: {
    color: C.textLight,
    fontSize: 11,
    fontWeight: '400',
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusConfirmed: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
