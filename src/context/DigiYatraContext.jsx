import React, { createContext, useContext, useState, useCallback } from 'react';

const DigiYatraContext = createContext(null);

// ============================================================
//  MOCK DATA — CORE IDENTITY & TRUST
// ============================================================

const MOCK_IDENTITY = {
  name: 'Aniket Das',
  aadhaarLast4: '7842',
  passportNumber: 'T8294512',
  passportExpiry: '2031-04-22',
  digiLockerId: 'DL-2024-XXXX',
  verificationStatus: 'verified',
  faceEmbeddingStatus: 'active',
  fingerprintStatus: 'enrolled',
  consentGranted: true,
  consentDate: '2026-08-15',
  offlineToken: { valid: true, expiresAt: '2026-09-03T20:00:00', issuer: 'DigiYatra Authority' },
  biometricFallback: 'qr_passkey',
  emergencyContact: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  email: 'aniket.das@email.com',
  locationPermission: true,
  digiLockerLinked: true,
  credentials: [
    { id: 'aadhaar', type: 'Aadhaar e-KYC', issuer: 'UIDAI', status: 'verified', lastVerified: '2026-08-15', iconName: 'IdCard', standard: 'National' },
    { id: 'passport', type: 'Passport', issuer: 'MEA India', status: 'verified', lastVerified: '2026-07-20', iconName: 'BookOpen', standard: 'ICAO DTC' },
    { id: 'visa_us', type: 'US B1/B2 Visa', issuer: 'US Embassy', status: 'active', lastVerified: '2026-06-10', iconName: 'Stamp', standard: 'IATA One ID' },
    { id: 'digilocker', type: 'DigiLocker NAD', issuer: 'DigiLocker', status: 'linked', lastVerified: '2026-08-20', iconName: 'FolderKey', standard: 'W3C VC' },
    { id: 'boarding', type: 'Boarding Pass', issuer: 'Air India', status: 'active', lastVerified: '2026-09-03', iconName: 'Ticket', standard: 'IATA' },
    { id: 'insurance', type: 'Travel Insurance', issuer: 'ICICI Lombard', status: 'active', lastVerified: '2026-08-25', iconName: 'ShieldCheck', standard: 'National' },
  ],
};

const MOCK_FAMILY = [
  { id: 1, name: 'Aniket Das', relation: 'Self', verified: true, aadhaarLast4: '7842', checkIn: true, baggage: true, boarding: false, accessibility: null, seatNumber: '14A', faceVerified: true, fingerprintVerified: true },
  { id: 2, name: 'Priya Das', relation: 'Spouse', verified: true, aadhaarLast4: '3156', checkIn: true, baggage: true, boarding: false, accessibility: null, seatNumber: '14B', faceVerified: true, fingerprintVerified: false },
  { id: 3, name: 'Arjun Das', relation: 'Child', verified: true, aadhaarLast4: '9201', checkIn: true, baggage: true, boarding: false, accessibility: null, seatNumber: '14C', faceVerified: true, fingerprintVerified: false },
  { id: 4, name: 'Meera Das', relation: 'Child', verified: false, aadhaarLast4: null, checkIn: false, baggage: false, boarding: false, accessibility: null, seatNumber: '15A', faceVerified: false, fingerprintVerified: false },
  { id: 5, name: 'Ramesh Das', relation: 'Grandparent', verified: true, aadhaarLast4: '4411', checkIn: true, baggage: true, boarding: false, accessibility: 'wheelchair', seatNumber: '15B', faceVerified: true, fingerprintVerified: true },
];

// ============================================================
//  MOCK DATA — CONSENT & TRUST
// ============================================================

const MOCK_CONSENT_ITEMS = [
  { id: 'biometric', label: 'Face Biometric for Gate Entry', what: 'Facial embedding', why: 'Automated airport entry via e-gates', who: 'Airport Authority of India', howLong: '24 hours after flight departure', canRevoke: true, enabled: true, grantedAt: '2026-08-15T10:30:00' },
  { id: 'travel_log', label: 'Travel Log (PNR, Flight Details)', what: 'Booking & PNR data', why: 'Audit trail and service improvement', who: 'DigiYatra Foundation', howLong: '30 days', canRevoke: true, enabled: true, grantedAt: '2026-08-15T10:30:00' },
  { id: 'hotel_share', label: 'Share Identity with Hotel Partner', what: 'Name, ID claims, booking', why: 'Digital check-in and Form C auto-fill', who: 'The Taj Mahal Palace', howLong: 'Until checkout + 30 days', canRevoke: true, enabled: false, grantedAt: null },
  { id: 'baggage', label: 'Baggage Tracking Data', what: 'Bag tag, location updates', why: 'Real-time bag location updates', who: 'Ground Handling Partner', howLong: '48 hours after arrival', canRevoke: true, enabled: true, grantedAt: '2026-09-03T06:00:00' },
  { id: 'loyalty', label: 'Loyalty Programme Linking', what: 'Frequent flyer number', why: 'Earn and redeem points across partners', who: 'Air India Flying Returns', howLong: 'Until revoked', canRevoke: true, enabled: false, grantedAt: null },
  { id: 'location', label: 'Airport Location Services', what: 'Device location within airport', why: 'Indoor navigation & queue intelligence', who: 'Airport Authority', howLong: 'Active session only', canRevoke: true, enabled: true, grantedAt: '2026-09-03T07:00:00' },
];

const MOCK_ACCESS_LOG = [
  { id: 1, who: 'Delhi Airport T3', what: 'Face verification', when: '03 Sep, 07:02 AM', purpose: 'Airport Entry' },
  { id: 2, who: 'CISF Security', what: 'Identity claim + PNR', when: '03 Sep, 07:18 AM', purpose: 'Security Check' },
  { id: 3, who: 'Air India', what: 'Boarding pass + identity', when: '03 Sep, 08:05 AM', purpose: 'Boarding' },
  { id: 4, who: 'The Taj Mahal Palace', what: 'Guest info + booking', when: '03 Sep, 12:00 PM', purpose: 'Hotel Check-in' },
];

const MOCK_TRUST_STATS = {
  uptime: '99.97%',
  totalJourneys: '12.4 Cr',
  consentRate: '94.2%',
  incidentsLast90d: 0,
  lastAudit: '15 Aug 2026',
  auditor: 'Ernst & Young',
  breachHistory: [],
  dpdpCompliant: true,
  iataOneIdReady: true,
  dataRetention: [
    { data: 'Biometric credential', purpose: 'Verification', retention: 'Purged 24h after journey' },
    { data: 'Travel log', purpose: 'Audit', retention: '30 days' },
    { data: 'Hotel information', purpose: 'Check-in', retention: 'Until checkout + legal' },
    { data: 'Booking details', purpose: 'Travel management', retention: 'User-controlled' },
    { data: 'Location data', purpose: 'Navigation', retention: 'Session only' },
  ],
};

// ============================================================
//  MOCK DATA — FLIGHT & TRAVEL
// ============================================================

const MOCK_FLIGHT = {
  flightNo: 'AI-862',
  airline: 'Air India',
  from: 'DEL',
  fromCity: 'New Delhi',
  to: 'BOM',
  toCity: 'Mumbai',
  departure: '14:30',
  arrival: '16:45',
  estimatedDeparture: '14:45',
  estimatedArrival: '17:00',
  actualDeparture: null,
  actualArrival: null,
  date: '03 Sep 2026',
  gate: 'T3-G24',
  terminal: 'T3',
  belt: 'Belt 4',
  status: 'On Time',
  statusColor: '#16a34a',
  progress: 0.35,
  boardingStatus: 'Not Started',
  seatNumber: '14A',
  cabin: 'Economy',
  delay: 0,
  co2Estimate: '142 kg',
};

const MOCK_BAGGAGE = [
  { id: 'BG-8291', tag: 'AI-862-BG001', status: 'loaded', weight: '18 kg', steps: ['checked_in', 'security', 'loaded'], currentLocation: 'Aircraft Cargo Hold', exception: null },
  { id: 'BG-8292', tag: 'AI-862-BG002', status: 'security', weight: '12 kg', steps: ['checked_in', 'security'], currentLocation: 'Security Screening', exception: null },
];

// ============================================================
//  MOCK DATA — BOARDING PASSES (Per-Member)
// ============================================================

const MOCK_BOARDING_PASSES = [
  { memberId: 1, name: 'Aniket Das', seat: '14A', pnr: 'X7AB29', gate: 'T3-G24', boarding: '14:00', qrData: 'DY2-AI862-14A-ANIKET-X7AB29', faceVerified: true },
  { memberId: 2, name: 'Priya Das', seat: '14B', pnr: 'X7AB29', gate: 'T3-G24', boarding: '14:00', qrData: 'DY2-AI862-14B-PRIYA-X7AB29', faceVerified: true },
  { memberId: 3, name: 'Arjun Das', seat: '14C', pnr: 'X7AB29', gate: 'T3-G24', boarding: '14:00', qrData: 'DY2-AI862-14C-ARJUN-X7AB29', faceVerified: true },
  { memberId: 4, name: 'Meera Das', seat: '15A', pnr: 'X7AB29', gate: 'T3-G24', boarding: '14:00', qrData: 'DY2-AI862-15A-MEERA-X7AB29', faceVerified: false },
  { memberId: 5, name: 'Ramesh Das', seat: '15B', pnr: 'X7AB29', gate: 'T3-G24', boarding: '14:00', qrData: 'DY2-AI862-15B-RAMESH-X7AB29', faceVerified: true },
];

// ============================================================
//  MOCK DATA — PRICE INTELLIGENCE
// ============================================================

const MOCK_PRICE_INTEL = {
  route: 'CCU \u2192 DEL',
  currentPrice: 5200,
  avg7d: 5450,
  avg30d: 5850,
  historicalLow: 4400,
  historicalHigh: 8900,
  volatility: 'medium',
  recommendation: 'buy',
  recommendationText: 'Current price is below the 30-day average. Good time to book.',
  priceHistory: [
    { date: 'Aug 04', price: 6200 }, { date: 'Aug 08', price: 5800 }, { date: 'Aug 12', price: 5400 },
    { date: 'Aug 16', price: 5900 }, { date: 'Aug 20', price: 6400 }, { date: 'Aug 24', price: 5100 },
    { date: 'Aug 28', price: 5600 }, { date: 'Sep 01', price: 5300 }, { date: 'Sep 03', price: 5200 },
  ],
  alerts: [
    { id: 'a1', route: 'CCU \u2192 DEL', threshold: 4500, active: true },
    { id: 'a2', route: 'DEL \u2192 BOM', threshold: 3800, active: false },
  ],
};

// ============================================================
//  MOCK DATA — TRIP MANAGEMENT (NO EMOJIS)
// ============================================================

const MOCK_TRIPS = [
  {
    id: 'trip-1',
    name: 'Delhi Business Trip',
    dateRange: '03 Sep \u2013 05 Sep 2026',
    status: 'active',
    items: [
      { type: 'flight', iconName: 'Plane', title: 'AI-862 DEL \u2192 BOM', time: '14:30', status: 'confirmed' },
      { type: 'hotel', iconName: 'Building2', title: 'The Taj Mahal Palace', time: '17:30', status: 'pre-checked-in' },
      { type: 'transport', iconName: 'Car', title: 'Airport Transfer', time: '11:30', status: 'booked' },
      { type: 'baggage', iconName: 'Luggage', title: '2 Bags Checked', time: '13:00', status: 'tracked' },
      { type: 'flight', iconName: 'PlaneLanding', title: 'AI-863 BOM \u2192 DEL', time: '18:00', status: 'confirmed' },
    ],
    documents: [
      { type: 'boarding_pass', title: 'Boarding Pass - AI-862', iconName: 'Ticket' },
      { type: 'hotel_booking', title: 'Taj Palace Confirmation', iconName: 'Building2' },
      { type: 'insurance', title: 'ICICI Lombard Policy', iconName: 'ShieldCheck' },
      { type: 'receipt', title: 'Flight Payment \u20B98,400', iconName: 'Receipt' },
    ],
    budget: { estimated: 42000, spent: 28500, remaining: 13500 },
  },
];

// ============================================================
//  MOCK DATA — SMART NOTIFICATIONS (NO EMOJIS)
// ============================================================

const MOCK_NOTIFICATIONS = [
  { id: 'n1', time: '06:15', iconName: 'Home', text: 'Leave home', status: 'completed', category: 'transport' },
  { id: 'n2', time: '07:02', iconName: 'ScanFace', text: 'Airport entry completed', status: 'completed', category: 'airport' },
  { id: 'n3', time: '07:18', iconName: 'ShieldCheck', text: 'Security completed', status: 'completed', category: 'airport' },
  { id: 'n4', time: '07:40', iconName: 'Navigation', text: 'Gate T3-G24 \u2014 8 min walk', status: 'active', category: 'airport' },
  { id: 'n5', time: '08:05', iconName: 'Ticket', text: 'Boarding begins', status: 'upcoming', category: 'flight' },
  { id: 'n6', time: '08:32', iconName: 'PlaneTakeoff', text: 'Flight departed', status: 'upcoming', category: 'flight' },
  { id: 'n7', time: '10:48', iconName: 'PlaneLanding', text: 'Flight landed', status: 'upcoming', category: 'flight' },
  { id: 'n8', time: '11:04', iconName: 'Luggage', text: 'Bag arriving \u2014 Belt 4', status: 'upcoming', category: 'baggage' },
  { id: 'n9', time: '11:17', iconName: 'CircleCheck', text: 'Bag collected', status: 'upcoming', category: 'baggage' },
  { id: 'n10', time: '11:30', iconName: 'Car', text: 'Airport taxi ready', status: 'upcoming', category: 'transport' },
  { id: 'n11', time: '12:00', iconName: 'Building2', text: 'Hotel check-in', status: 'upcoming', category: 'hotel' },
];

// ============================================================
//  MOCK DATA — AIRPORT MAP (NO EMOJIS)
// ============================================================

const MOCK_AIRPORT_MAP = {
  airport: 'Indira Gandhi International Airport',
  terminal: 'T3',
  currentLocation: 'Post-Security Lounge Area',
  gateDistance: '8 min walk',
  amenities: [
    { type: 'gate', name: 'Gate G24', distance: '8 min', iconName: 'DoorOpen' },
    { type: 'lounge', name: 'Air India Lounge', distance: '2 min', iconName: 'Armchair' },
    { type: 'restaurant', name: 'Punjab Grill', distance: '3 min', iconName: 'UtensilsCrossed' },
    { type: 'shop', name: 'DFS Duty Free', distance: '4 min', iconName: 'ShoppingBag' },
    { type: 'washroom', name: 'Nearest Washroom', distance: '1 min', iconName: 'Bath' },
    { type: 'medical', name: 'Airport Clinic', distance: '6 min', iconName: 'Stethoscope' },
    { type: 'charging', name: 'Charging Hub', distance: '1 min', iconName: 'Zap' },
    { type: 'parking', name: 'Multi-Level Parking', distance: 'Ground Floor', iconName: 'ParkingSquare' },
  ],
  queueEstimates: {
    checkIn: '12 min',
    security: '18 min',
    immigration: '25 min',
    boarding: 'Not started',
    baggage: '~8 min after landing',
  },
};

// ============================================================
//  MOCK DATA — HOTEL
// ============================================================

const MOCK_HOTEL_BOOKING = {
  hotelName: 'The Taj Mahal Palace',
  city: 'Mumbai',
  checkIn: '03 Sep 2026',
  checkOut: '05 Sep 2026',
  roomType: 'Luxury Suite',
  guestCount: 2,
  formCStatus: 'auto_filled',
  grcStatus: 'completed',
  biometricRoomAccess: true,
  roomNumber: '1204',
  floor: '12th Floor',
  amenities: ['WiFi', 'Breakfast', 'Pool', 'Gym', 'Spa'],
  price: 18500,
  distanceFromAirport: '28 km',
  accessibilityFeatures: ['Wheelchair accessible', 'Elevator', 'Grab bars'],
  doorLockMethod: 'face_nfc',
  dndActive: false,
  roomServiceAvailable: true,
  minibarCharge: 1200,
  laundryCharge: 450,
  billBreakdown: [
    { item: 'Room Charges (2 nights)', amount: 37000 },
    { item: 'GST (18%)', amount: 6660 },
    { item: 'Breakfast (included)', amount: 0 },
    { item: 'Room Service', amount: 1800 },
    { item: 'Minibar', amount: 1200 },
    { item: 'Laundry', amount: 450 },
  ],
  totalBill: 47110,
  paymentStatus: 'partial',
  paidAmount: 37000,
};

// ============================================================
//  MOCK DATA — WEATHER
// ============================================================

const MOCK_WEATHER = {
  departure: { city: 'New Delhi', temp: 34, condition: 'Partly Cloudy', humidity: 62, iconName: 'CloudSun', advice: 'Carry light cotton clothing' },
  destination: { city: 'Mumbai', temp: 29, condition: 'Heavy Rain', humidity: 88, iconName: 'CloudRain', advice: 'Pack umbrella and rain jacket' },
};

// ============================================================
//  MOCK DATA — TRAVEL ANALYTICS
// ============================================================

const MOCK_ANALYTICS = {
  year: 2026,
  totalTrips: 12,
  totalFlights: 18,
  totalHotels: 8,
  totalSpent: 142000,
  frequentRoute: 'CCU \u2192 DEL',
  avgTicket: 5480,
  carbonFootprint: '2.4 tonnes',
  carbonOffset: '0.8 tonnes',
  monthlySpend: [
    { month: 'Jan', amount: 8500 }, { month: 'Feb', amount: 12000 }, { month: 'Mar', amount: 15500 },
    { month: 'Apr', amount: 9200 }, { month: 'May', amount: 18000 }, { month: 'Jun', amount: 11000 },
    { month: 'Jul', amount: 14200 }, { month: 'Aug', amount: 22000 }, { month: 'Sep', amount: 5200 },
  ],
  topAirlines: [
    { name: 'Air India', count: 8 }, { name: 'IndiGo', count: 5 }, { name: 'Vistara', count: 3 }, { name: 'SpiceJet', count: 2 },
  ],
};

// ============================================================
//  MOCK DATA — TRAVEL PROFILE
// ============================================================

const MOCK_PROFILE = {
  preferredAirline: 'Air India',
  preferredSeat: 'Window',
  mealPreference: 'Vegetarian',
  loyaltyPrograms: [
    { airline: 'Air India', program: 'Flying Returns', number: 'FR-892341', tier: 'Gold' },
    { airline: 'IndiGo', program: '6E Rewards', number: '6E-112233', tier: 'Silver' },
  ],
  frequentRoutes: ['CCU \u2192 DEL', 'DEL \u2192 BOM', 'BLR \u2192 DEL'],
  accessibilityNeeds: [],
  language: 'English',
};

// ============================================================
//  MOCK DATA — INTERNATIONAL TRAVEL
// ============================================================

const MOCK_INTL_CHECKLIST = [
  { id: 'passport', label: 'Passport valid for 6+ months', status: 'ok', detail: 'Expires 2031-04-22' },
  { id: 'visa', label: 'US B1/B2 Visa', status: 'ok', detail: 'Valid until 2031-06-15' },
  { id: 'insurance', label: 'Travel Insurance', status: 'active', detail: 'ICICI Lombard \u20B950L cover' },
  { id: 'forex', label: 'Foreign Currency', status: 'pending', detail: 'Order USD at BookMyForex' },
  { id: 'vaccination', label: 'COVID Vaccination Certificate', status: 'ok', detail: '3 doses completed' },
];

// ============================================================
//  MOCK DATA — USER SETTINGS
// ============================================================

const MOCK_USER_SETTINGS = {
  theme: 'light',
  notificationsEnabled: true,
  flightAlerts: true,
  priceAlerts: true,
  baggageAlerts: true,
  gateChangeAlerts: true,
  offlineMode: false,
  twoFactorAuth: true,
  biometricLogin: true,
  highContrast: false,
  fontSize: 'default',
  autoCheckin: true,
  shareAnalytics: false,
};

// ============================================================
//  DEFAULTS FOR SAFE CONTEXT READS
// ============================================================

const DEFAULTS = {
  digiYatraSubView: 'utility', setDigiYatraSubView: () => {},
  hotelSubView: 'checkin', setHotelSubView: () => {},
  drawerOpen: null, setDrawerOpen: () => {}, toggleDrawer: () => {},
  profilePanelOpen: false, setProfilePanelOpen: () => {}, toggleProfilePanel: () => {},
  identity: {}, family: [], documents: [], flight: {}, baggage: [],
  hotelBooking: {}, trustStats: {}, consentItems: [],
  toggleConsent: () => {}, revokeAllConsent: () => {},
  accessLog: [], trips: [], notifications: [], priceIntel: {},
  airportMap: {}, analytics: {}, profile: {}, intlChecklist: [],
  activeTrip: null, setActiveTrip: () => {},
  addPriceAlert: () => {}, removePriceAlert: () => {},
  addNotification: () => {},
  boardingPasses: [], activeBoardingPass: 0, setActiveBoardingPass: () => {},
  weather: {}, userSettings: {},
  updateSettings: () => {}, updateIdentity: () => {},
};

export const useDigiYatra = () => {
  const ctx = useContext(DigiYatraContext);
  return ctx || DEFAULTS;
};

// ============================================================
//  PROVIDER
// ============================================================

export const DigiYatraProvider = ({ children }) => {
  const [profilePanelOpen, setProfilePanelOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(null); // 'digiyatra' | 'hotels' | null
  const [digiYatraSubView, setDigiYatraSubView] = useState(null);
  const [hotelSubView, setHotelSubView] = useState(null);
  const [consentItems, setConsentItems] = useState(MOCK_CONSENT_ITEMS);
  const [priceAlerts, setPriceAlerts] = useState(MOCK_PRICE_INTEL.alerts);
  const [trips, setTrips] = useState(MOCK_TRIPS);
  const [activeTrip, setActiveTrip] = useState('trip-1');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeBoardingPass, setActiveBoardingPass] = useState(0);
  const [userSettings, setUserSettings] = useState(MOCK_USER_SETTINGS);
  const [identityData, setIdentityData] = useState(MOCK_IDENTITY);

  const toggleConsent = useCallback((id) => {
    setConsentItems(prev => prev.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled, grantedAt: !item.enabled ? new Date().toISOString() : null } : item
    ));
  }, []);

  const revokeAllConsent = useCallback(() => {
    setConsentItems(prev => prev.map(item => ({ ...item, enabled: false, grantedAt: null })));
  }, []);

  const addPriceAlert = useCallback((route, threshold) => {
    setPriceAlerts(prev => [...prev, { id: `a${Date.now()}`, route, threshold, active: true }]);
  }, []);

  const removePriceAlert = useCallback((id) => {
    setPriceAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  const addNotification = useCallback((notification) => {
    setNotifications(prev => [...prev, { ...notification, id: `n${Date.now()}` }]);
  }, []);

  const updateSettings = useCallback((key, value) => {
    setUserSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateIdentity = useCallback((key, value) => {
    setIdentityData(prev => ({ ...prev, [key]: value }));
  }, []);

  const value = {
    digiYatraSubView, setDigiYatraSubView,
    hotelSubView, setHotelSubView,
    drawerOpen, setDrawerOpen,
    toggleDrawer: (tab) => setDrawerOpen(prev => prev === tab ? null : tab),
    profilePanelOpen, setProfilePanelOpen,
    toggleProfilePanel: () => setProfilePanelOpen(prev => !prev),
    identity: identityData,
    family: MOCK_FAMILY,
    documents: identityData.credentials,
    flight: MOCK_FLIGHT,
    baggage: MOCK_BAGGAGE,
    boardingPasses: MOCK_BOARDING_PASSES,
    activeBoardingPass, setActiveBoardingPass,
    hotelBooking: MOCK_HOTEL_BOOKING,
    trustStats: MOCK_TRUST_STATS,
    accessLog: MOCK_ACCESS_LOG,
    consentItems, toggleConsent, revokeAllConsent,
    priceIntel: { ...MOCK_PRICE_INTEL, alerts: priceAlerts },
    addPriceAlert, removePriceAlert,
    trips, activeTrip, setActiveTrip,
    notifications, addNotification,
    airportMap: MOCK_AIRPORT_MAP,
    analytics: MOCK_ANALYTICS,
    profile: MOCK_PROFILE,
    intlChecklist: MOCK_INTL_CHECKLIST,
    weather: MOCK_WEATHER,
    userSettings, updateSettings,
    updateIdentity,
  };

  return (
    <DigiYatraContext.Provider value={value}>
      {children}
    </DigiYatraContext.Provider>
  );
};

export default DigiYatraContext;
