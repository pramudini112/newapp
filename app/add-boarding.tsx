import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react-native';

// ─── Palette (matches app design system) ────────────────────
const C = {
  purple: '#6C47FF',
  purpleDark: '#4B2FCC',
  purpleLight: '#EDE8FF',
  purpleBorder: '#C4B5FD',
  surface: '#F5F3FF',
  white: '#FFFFFF',
  text: '#1A1040',
  textSub: '#6B6690',
  textLight: '#B0AACC',
  border: '#E8E4F5',
  inputBg: '#FAF9FF',
};

const BOARDING_TYPES = ['Hostel', 'Annex', 'Room'];

// ─── Step metadata ───────────────────────────────────────────
const STEPS = [
  { label: 'Basic Information' },
  { label: 'Facilities & Pricing' },
  { label: 'Photos & Review' },
];

export default function AddBoarding() {
  const router = useRouter();

  // Step state
  const [step, setStep] = useState(1);

  // Form fields
  const [boardingName, setBoardingName] = useState('');
  const [description, setDescription] = useState('');
  const [boardingType, setBoardingType] = useState('Annex');
  const [location, setLocation] = useState('');

  // Step 2
  const [totalBeds, setTotalBeds] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [facilities, setFacilities] = useState<string[]>(['WiFi', 'Water']);

  const FACILITY_OPTIONS = ['WiFi', 'Water', 'Parking', 'CCTV', 'Laundry', 'Kitchen', 'Security', 'Garden'];

  const toggleFacility = (f: string) =>
    setFacilities(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1);
    else {
      // Submit → go back to boardings
      router.back();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
    else router.back();
  };

  const isNextEnabled = () => {
    if (step === 1) return boardingName.trim().length > 0 && location.trim().length > 0;
    if (step === 2) return totalBeds.trim().length > 0 && monthlyRent.trim().length > 0;
    return true;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn} activeOpacity={0.7}>
            <ArrowLeft size={20} color={C.text} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Boarding</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* ── Step Indicator ── */}
        <View style={styles.stepRow}>
          {STEPS.map((s, i) => {
            const num = i + 1;
            const isActive = num === step;
            const isDone = num < step;
            return (
              <View key={i} style={styles.stepItem}>
                <View style={[
                  styles.stepDot,
                  isActive && styles.stepDotActive,
                  isDone && styles.stepDotDone,
                ]}>
                  {isDone ? (
                    <Text style={styles.stepDotDoneText}>✓</Text>
                  ) : (
                    <Text style={[styles.stepDotText, isActive && { color: C.white }]}>{num}</Text>
                  )}
                </View>
                {i < STEPS.length - 1 && (
                  <View style={[styles.stepLine, isDone && styles.stepLineDone]} />
                )}
              </View>
            );
          })}
        </View>

        {/* ── Step Label ── */}
        <View style={styles.stepLabelRow}>
          <Text style={styles.stepCounter}>{step}/{STEPS.length}</Text>
          <Text style={styles.stepLabel}>{STEPS[step - 1].label}</Text>
        </View>
        <View style={styles.stepUnderline} />

        {/* ── Form Content ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {step === 1 && (
            <Step1
              boardingName={boardingName}
              setBoardingName={setBoardingName}
              description={description}
              setDescription={setDescription}
              boardingType={boardingType}
              setBoardingType={setBoardingType}
              location={location}
              setLocation={setLocation}
            />
          )}

          {step === 2 && (
            <Step2
              totalBeds={totalBeds}
              setTotalBeds={setTotalBeds}
              monthlyRent={monthlyRent}
              setMonthlyRent={setMonthlyRent}
              facilities={facilities}
              toggleFacility={toggleFacility}
              facilityOptions={FACILITY_OPTIONS}
            />
          )}

          {step === 3 && <Step3 boardingName={boardingName} boardingType={boardingType} location={location} />}
        </ScrollView>

        {/* ── Next / Submit Button ── */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.nextBtn, !isNextEnabled() && styles.nextBtnDisabled]}
            onPress={handleNext}
            activeOpacity={0.85}
            disabled={!isNextEnabled()}
          >
            <Text style={styles.nextBtnText}>{step === 3 ? 'Submit' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 1 — Basic Information
// ─────────────────────────────────────────────────────────────
function Step1({ boardingName, setBoardingName, description, setDescription, boardingType, setBoardingType, location, setLocation }: any) {
  return (
    <View style={styles.formBlock}>
      <FormLabel label="Boarding Name" />
      <TextInput
        style={styles.input}
        placeholder="Enter boarding name"
        placeholderTextColor={C.textLight}
        value={boardingName}
        onChangeText={setBoardingName}
      />

      <FormLabel label="Description" />
      <TextInput
        style={[styles.input, styles.inputMulti]}
        placeholder="Describe your property"
        placeholderTextColor={C.textLight}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <FormLabel label="Boarding Type" />
      <View style={styles.typeRow}>
        {['Hostel', 'Annex', 'Room'].map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, boardingType === t && styles.typeBtnActive]}
            onPress={() => setBoardingType(t)}
            activeOpacity={0.75}
          >
            <Text style={[styles.typeBtnText, boardingType === t && styles.typeBtnTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FormLabel label="Location" />
      <View style={styles.locationWrap}>
        <TextInput
          style={[styles.input, styles.locationInput]}
          placeholder="Enter location"
          placeholderTextColor={C.textLight}
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.mapBtn} activeOpacity={0.8}>
          <Navigation size={14} color={C.purple} strokeWidth={2.5} />
          <Text style={styles.mapBtnText}>Select on Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 2 — Facilities & Pricing
// ─────────────────────────────────────────────────────────────
function Step2({ totalBeds, setTotalBeds, monthlyRent, setMonthlyRent, facilities, toggleFacility, facilityOptions }: any) {
  return (
    <View style={styles.formBlock}>
      <FormLabel label="Total Beds" />
      <TextInput
        style={styles.input}
        placeholder="e.g. 10"
        placeholderTextColor={C.textLight}
        value={totalBeds}
        onChangeText={setTotalBeds}
        keyboardType="numeric"
      />

      <FormLabel label="Monthly Rent (Rs.)" />
      <TextInput
        style={styles.input}
        placeholder="e.g. 15,000"
        placeholderTextColor={C.textLight}
        value={monthlyRent}
        onChangeText={setMonthlyRent}
        keyboardType="numeric"
      />

      <FormLabel label="Facilities" />
      <View style={styles.facilityGrid}>
        {facilityOptions.map((f: string) => {
          const active = facilities.includes(f);
          return (
            <TouchableOpacity
              key={f}
              style={[styles.facilityChip, active && styles.facilityChipActive]}
              onPress={() => toggleFacility(f)}
              activeOpacity={0.75}
            >
              <Text style={[styles.facilityText, active && styles.facilityTextActive]}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 3 — Photos & Review
// ─────────────────────────────────────────────────────────────
function Step3({ boardingName, boardingType, location }: any) {
  return (
    <View style={styles.formBlock}>
      <FormLabel label="Photos" />
      <TouchableOpacity style={styles.photoUpload} activeOpacity={0.8}>
        <View style={styles.photoIcon}>
          <MapPin size={28} color={C.purple} />
        </View>
        <Text style={styles.photoUploadText}>Tap to add photos</Text>
        <Text style={styles.photoUploadSub}>Upload up to 6 images of your property</Text>
      </TouchableOpacity>

      <View style={styles.reviewCard}>
        <Text style={styles.reviewCardTitle}>Review Your Listing</Text>
        <ReviewRow label="Name" value={boardingName || '—'} />
        <ReviewRow label="Type" value={boardingType} />
        <ReviewRow label="Location" value={location || '—'} />
      </View>
    </View>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue}>{value}</Text>
    </View>
  );
}

// ─── Shared ──────────────────────────────────────────────────
function FormLabel({ label }: { label: string }) {
  return <Text style={styles.fieldLabel}>{label}</Text>;
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
    paddingBottom: 12,
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

  // Step indicator
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 4,
    marginBottom: 4,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: C.surface,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: C.purple,
    borderColor: C.purple,
  },
  stepDotDone: {
    backgroundColor: C.purple,
    borderColor: C.purple,
  },
  stepDotText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.textLight,
  },
  stepDotDoneText: {
    fontSize: 11,
    fontWeight: '800',
    color: C.white,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: C.border,
    marginHorizontal: 4,
  },
  stepLineDone: {
    backgroundColor: C.purple,
  },

  // Step label
  stepLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 14,
    marginBottom: 6,
  },
  stepCounter: {
    fontSize: 13,
    fontWeight: '700',
    color: C.purple,
  },
  stepLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
  },
  stepUnderline: {
    height: 2,
    backgroundColor: C.purple,
    marginHorizontal: 20,
    borderRadius: 2,
    width: 140,
    marginBottom: 4,
  },

  // Scroll
  scroll: { flex: 1, backgroundColor: C.white },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  formBlock: { gap: 4 },

  // Field
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: C.text,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: C.inputBg,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: C.text,
    fontWeight: '400',
  },
  inputMulti: {
    height: 100,
    paddingTop: 13,
  },

  // Boarding type selector
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: C.inputBg,
    alignItems: 'center',
  },
  typeBtnActive: {
    backgroundColor: C.purple,
    borderColor: C.purple,
  },
  typeBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textSub,
  },
  typeBtnTextActive: {
    color: C.white,
  },

  // Location row
  locationWrap: {
    gap: 10,
  },
  locationInput: {
    // inherits input styles
  },
  mapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: C.purpleLight,
  },
  mapBtnText: {
    color: C.purple,
    fontSize: 12,
    fontWeight: '700',
  },

  // Facilities (step 2)
  facilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  facilityChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: C.inputBg,
  },
  facilityChipActive: {
    backgroundColor: C.purple,
    borderColor: C.purple,
  },
  facilityText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textSub,
  },
  facilityTextActive: {
    color: C.white,
  },

  // Photo upload (step 3)
  photoUpload: {
    borderWidth: 2,
    borderColor: C.purpleBorder,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 36,
    alignItems: 'center',
    backgroundColor: C.purpleLight,
    gap: 8,
  },
  photoIcon: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: C.white,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  photoUploadText: {
    color: C.purple,
    fontSize: 15,
    fontWeight: '700',
  },
  photoUploadSub: {
    color: C.textSub,
    fontSize: 12,
  },

  // Review card (step 3)
  reviewCard: {
    marginTop: 20,
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: C.border,
    gap: 12,
  },
  reviewCardTitle: {
    color: C.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  reviewLabel: { color: C.textSub, fontSize: 13, fontWeight: '500' },
  reviewValue: { color: C.text, fontSize: 13, fontWeight: '700', flexShrink: 1, textAlign: 'right' },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  nextBtn: {
    backgroundColor: C.purple,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  nextBtnDisabled: {
    backgroundColor: C.purpleBorder,
    shadowOpacity: 0,
    elevation: 0,
  },
  nextBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
