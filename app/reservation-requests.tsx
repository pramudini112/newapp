import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, CheckCircle2, XCircle, CalendarDays, MapPin, BedDouble } from 'lucide-react-native';

// ─── Palette ─────────────────────────────────────────────────
const C = {
  purple:      '#6C47FF',
  purpleDark:  '#4B2FCC',
  purpleLight: '#EDE8FF',
  surface:     '#F5F3FF',
  white:       '#FFFFFF',
  text:        '#1A1040',
  textSub:     '#6B6690',
  textLight:   '#B0AACC',
  border:      '#E8E4F5',
  success:     '#22C55E',
  successBg:   '#DCFCE7',
  error:       '#EF4444',
  errorBg:     '#FEE2E2',
  warning:     '#F59E0B',
  warningBg:   '#FEF3C7',
};

// ─── Data ────────────────────────────────────────────────────
type Status = 'Pending' | 'Approved' | 'Rejected';

interface Request {
  id: number;
  avatar: string;
  name: string;
  property: string;
  location: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: Status;
}

const INITIAL_REQUESTS: Request[] = [
  {
    id: 1, avatar: 'AP', name: 'Anuradha Perera',
    property: 'Green View Annex', location: 'Colombo 07',
    room: 'Room 101', checkIn: '01 Jun 2025', checkOut: '30 Jun 2025',
    status: 'Pending',
  },
  {
    id: 2, avatar: 'KF', name: 'Kasun Fernando',
    property: 'Sunrise Hostel', location: 'Nugegoda',
    room: 'Dorm A – Bed 2', checkIn: '05 Jun 2025', checkOut: '05 Jul 2025',
    status: 'Pending',
  },
  {
    id: 3, avatar: 'NS', name: 'Nimasha Silva',
    property: 'Lake View Rooms', location: 'Kandy',
    room: 'Room 2 – Double', checkIn: '10 Jun 2025', checkOut: '10 Jul 2025',
    status: 'Pending',
  },
  {
    id: 4, avatar: 'DJ', name: 'Dilshan Jayawardena',
    property: 'Green View Annex', location: 'Colombo 07',
    room: 'Room 103', checkIn: '15 Jun 2025', checkOut: '15 Jul 2025',
    status: 'Approved',
  },
  {
    id: 5, avatar: 'SW', name: 'Sachini Wijeratne',
    property: 'Sunrise Hostel', location: 'Nugegoda',
    room: 'Dorm B – Bed 1', checkIn: '20 Jun 2025', checkOut: '20 Jul 2025',
    status: 'Rejected',
  },
];

const FILTERS: Status[] = ['Pending', 'Approved', 'Rejected'];

export default function ReservationRequests() {
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>(INITIAL_REQUESTS);
  const [activeFilter, setActiveFilter] = useState<Status>('Pending');

  const approve = (id: number) =>
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));

  const reject = (id: number) =>
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));

  const filtered = requests.filter(r => r.status === activeFilter);
  const pendingCount = requests.filter(r => r.status === 'Pending').length;

  return (
    <SafeAreaView style={styles.safe}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft size={20} color={C.text} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Reservation Requests</Text>
          {pendingCount > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{pendingCount}</Text>
            </View>
          )}
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* ── Filter tabs ── */}
      <View style={styles.filterRow}>
        {FILTERS.map(f => {
          const count = requests.filter(r => r.status === f).length;
          const isActive = activeFilter === f;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.filterTab, isActive && styles.filterTabActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterTabText, isActive && styles.filterTabTextActive]}>{f}</Text>
              {count > 0 && (
                <View style={[styles.filterCount, isActive && styles.filterCountActive]}>
                  <Text style={[styles.filterCountText, isActive && styles.filterCountTextActive]}>{count}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── List ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <CheckCircle2 size={40} color={C.textLight} />
            <Text style={styles.emptyText}>No {activeFilter.toLowerCase()} requests</Text>
          </View>
        ) : (
          filtered.map(req => (
            <RequestCard
              key={req.id}
              request={req}
              onApprove={() => approve(req.id)}
              onReject={() => reject(req.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Request Card ────────────────────────────────────────────
function RequestCard({
  request,
  onApprove,
  onReject,
}: {
  request: Request;
  onApprove: () => void;
  onReject: () => void;
}) {
  const isPending  = request.status === 'Pending';
  const isApproved = request.status === 'Approved';

  const statusColor = isPending ? C.warning : isApproved ? C.success : C.error;
  const statusBg    = isPending ? C.warningBg : isApproved ? C.successBg : C.errorBg;
  const StatusIcon  = isPending ? Clock : isApproved ? CheckCircle2 : XCircle;

  return (
    <View style={styles.card}>
      {/* Top row — avatar + name + status */}
      <View style={styles.cardTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{request.avatar}</Text>
        </View>
        <View style={styles.cardTitleBlock}>
          <Text style={styles.cardName}>{request.name}</Text>
          <View style={styles.cardPropertyRow}>
            <MapPin size={11} color={C.textLight} />
            <Text style={styles.cardProperty}>{request.property} · {request.location}</Text>
          </View>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
          <StatusIcon size={11} color={statusColor} />
          <Text style={[styles.statusPillText, { color: statusColor }]}>{request.status}</Text>
        </View>
      </View>

      {/* Detail row */}
      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <BedDouble size={13} color={C.purple} />
          <Text style={styles.detailText}>{request.room}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <CalendarDays size={13} color={C.purple} />
          <Text style={styles.detailText}>{request.checkIn}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <CalendarDays size={13} color={C.textLight} />
          <Text style={styles.detailText}>{request.checkOut}</Text>
        </View>
      </View>

      {/* Action buttons — only for Pending */}
      {isPending && (
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.rejectBtn} onPress={onReject} activeOpacity={0.8}>
            <XCircle size={15} color={C.error} strokeWidth={2.5} />
            <Text style={styles.rejectBtnText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.approveBtn} onPress={onApprove} activeOpacity={0.8}>
            <CheckCircle2 size={15} color={C.white} strokeWidth={2.5} />
            <Text style={styles.approveBtnText}>Approve</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 14,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: C.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: C.text,
  },
  headerBadge: {
    backgroundColor: C.purple,
    borderRadius: 8,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  headerBadgeText: {
    color: C.white,
    fontSize: 12,
    fontWeight: '800',
  },

  // Filter tabs
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  filterTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: C.surface,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  filterTabActive: {
    backgroundColor: C.purpleLight,
    borderColor: C.purple,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: C.textSub,
  },
  filterTabTextActive: {
    color: C.purple,
  },
  filterCount: {
    minWidth: 18,
    height: 18,
    borderRadius: 6,
    backgroundColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  filterCountActive: {
    backgroundColor: C.purple,
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: '800',
    color: C.textSub,
  },
  filterCountTextActive: {
    color: C.white,
  },

  // Scroll
  scroll: { flex: 1, backgroundColor: C.surface },
  scrollContent: { padding: 16, gap: 12, paddingBottom: 32 },

  // Empty
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 14,
  },
  emptyText: {
    color: C.textLight,
    fontSize: 15,
    fontWeight: '600',
  },

  // Card
  card: {
    backgroundColor: C.white,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#6C47FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    gap: 14,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: C.purple,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: C.white, fontSize: 13, fontWeight: '800' },
  cardTitleBlock: { flex: 1 },
  cardName: { color: C.text, fontSize: 14, fontWeight: '700', marginBottom: 3 },
  cardPropertyRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardProperty: { color: C.textLight, fontSize: 11, fontWeight: '500' },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  statusPillText: { fontSize: 11, fontWeight: '700' },

  // Detail row
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: { color: C.textSub, fontSize: 11, fontWeight: '600', flexShrink: 1 },
  detailDivider: {
    width: 1,
    height: 20,
    backgroundColor: C.border,
    marginHorizontal: 6,
  },

  // Action buttons
  cardActions: {
    flexDirection: 'row',
    gap: 10,
  },
  rejectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.error,
    backgroundColor: C.errorBg,
  },
  rejectBtnText: {
    color: C.error,
    fontSize: 13,
    fontWeight: '800',
  },
  approveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: C.purple,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  approveBtnText: {
    color: C.white,
    fontSize: 13,
    fontWeight: '800',
  },
});
