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
import { ArrowLeft, Minus, Plus } from 'lucide-react-native';

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
  occupied:    '#F97316',
  occupiedBg:  '#FEF3C7',
};

// ─── Data ────────────────────────────────────────────────────
type RoomStatus = 'Available' | 'Occupied';

interface Room {
  id: number;
  name: string;
  totalBeds: number;
  status: RoomStatus;
  available: number;
}

const INITIAL_ROOMS: Room[] = [
  { id: 1, name: 'Room 101', totalBeds: 2, status: 'Available', available: 2 },
  { id: 2, name: 'Room 102', totalBeds: 2, status: 'Occupied',  available: 0 },
  { id: 3, name: 'Room 103', totalBeds: 2, status: 'Available', available: 2 },
  { id: 4, name: 'Room 104', totalBeds: 4, status: 'Available', available: 4 },
];

export default function ManageAvailability() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [saved, setSaved] = useState(false);

  const increment = (id: number) => {
    setRooms(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        const next = Math.min(r.available + 1, r.totalBeds);
        return { ...r, available: next, status: next > 0 ? 'Available' : 'Occupied' };
      })
    );
    setSaved(false);
  };

  const decrement = (id: number) => {
    setRooms(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        const next = Math.max(r.available - 1, 0);
        return { ...r, available: next, status: next > 0 ? 'Available' : 'Occupied' };
      })
    );
    setSaved(false);
  };

  const handleUpdate = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.back();
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safe}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft size={20} color={C.text} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Availability</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* ── Property sub-label ── */}
      <View style={styles.propertyLabel}>
        <Text style={styles.propertyLabelText}>Green View Annex</Text>
      </View>

      {/* ── Room List ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {rooms.map((room, idx) => (
          <RoomRow
            key={room.id}
            room={room}
            isLast={idx === rooms.length - 1}
            onIncrement={() => increment(room.id)}
            onDecrement={() => decrement(room.id)}
          />
        ))}
      </ScrollView>

      {/* ── Footer Button ── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.updateBtn, saved && styles.updateBtnSaved]}
          onPress={handleUpdate}
          activeOpacity={0.88}
        >
          <Text style={styles.updateBtnText}>
            {saved ? '✓  Saved!' : 'Update Availability'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Room Row ────────────────────────────────────────────────
function RoomRow({
  room,
  isLast,
  onIncrement,
  onDecrement,
}: {
  room: Room;
  isLast: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const isAvailable = room.status === 'Available';

  return (
    <View style={[styles.roomRow, !isLast && styles.roomRowBorder]}>
      {/* Left: name + beds */}
      <View style={styles.roomLeft}>
        <Text style={styles.roomName}>{room.name}</Text>
        <Text style={styles.roomBeds}>{room.totalBeds} Beds</Text>
      </View>

      {/* Status badge */}
      <View style={[styles.statusBadge, isAvailable ? styles.statusAvailable : styles.statusOccupied]}>
        <Text style={[styles.statusText, { color: isAvailable ? C.success : C.occupied }]}>
          {room.status}
        </Text>
      </View>

      {/* Stepper */}
      <View style={styles.stepper}>
        <TouchableOpacity
          style={[styles.stepperBtn, room.available === 0 && styles.stepperBtnDisabled]}
          onPress={onDecrement}
          activeOpacity={0.7}
          disabled={room.available === 0}
        >
          <Minus size={14} color={room.available === 0 ? C.textLight : C.purple} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={styles.stepperValue}>{room.available}</Text>

        <TouchableOpacity
          style={[styles.stepperBtn, room.available === room.totalBeds && styles.stepperBtnDisabled]}
          onPress={onIncrement}
          activeOpacity={0.7}
          disabled={room.available === room.totalBeds}
        >
          <Plus size={14} color={room.available === room.totalBeds ? C.textLight : C.purple} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.white,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 14,
    backgroundColor: C.white,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: C.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: C.text,
    letterSpacing: 0.1,
  },

  // Property label
  propertyLabel: {
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  propertyLabelText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.purple,
  },

  // Scroll
  scroll: {
    flex: 1,
    backgroundColor: C.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },

  // Room row
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  roomRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  roomLeft: {
    flex: 1,
  },
  roomName: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
    marginBottom: 3,
  },
  roomBeds: {
    fontSize: 12,
    color: C.textLight,
    fontWeight: '500',
  },

  // Status badge
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 82,
    alignItems: 'center',
  },
  statusAvailable: {
    backgroundColor: C.successBg,
  },
  statusOccupied: {
    backgroundColor: C.occupiedBg,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Stepper
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepperBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border,
  },
  stepperBtnDisabled: {
    opacity: 0.45,
  },
  stepperValue: {
    fontSize: 16,
    fontWeight: '800',
    color: C.text,
    minWidth: 20,
    textAlign: 'center',
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  updateBtn: {
    backgroundColor: C.purple,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 14,
    elevation: 6,
  },
  updateBtnSaved: {
    backgroundColor: C.success,
    shadowColor: C.success,
  },
  updateBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
