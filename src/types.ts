export type ScreenType =
  | 'landing'
  | 'agenda'
  | 'intake'
  | 'expediente'
  | 'admin'
  | 'pos'
  | 'corte_z'
  | 'notificacion';

export type UserRole = 'recepcionista' | 'terapeuta' | 'dueno' | 'paciente';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  birthDate: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
  visitsCount: number;
  membership: string;
  avatar: string;
  balance: number;
  criticalAllergies: string[];
  medicalConditions: string[];
  sensoryPreferences: {
    pressure: 'suave' | 'media' | 'firme';
    temperature: string;
    aromatherapy: string;
    soundscape: string;
    targetAreas: string;
    restrictedAreas: string;
  };
  hasSignedConsent: boolean;
  signedConsentDate?: string;
  evolutionNotes: EvolutionNote[];
}

export interface EvolutionNote {
  id: string;
  date: string;
  cabin: string;
  treatmentName: string;
  protocol: string;
  clinicalObservation: string;
  therapistName: string;
  therapistAvatar: string;
  therapistRole: string;
  isValidated: boolean;
}

export interface Appointment {
  id: string;
  timeSlot: string; // e.g. "10:30 - 12:00"
  timeCategory: 'matutina' | 'mediodia' | 'vespertina';
  cabinId: string;
  client: Client;
  serviceName: string;
  durationMinutes: number;
  status: 'en_cabina' | 'confirmada' | 'en_espera' | 'completada' | 'sanitizacion';
  therapist: {
    name: string;
    avatar: string;
    role: string;
  };
  careWarning?: string;
  careWarningType?: 'warning' | 'info' | 'verified';
  isFirstVisit?: boolean;
  notes?: string;
}

export interface Cabin {
  id: string;
  name: string;
  displayName: string;
  type: 'individual' | 'parejas';
  temperature: string;
  assignedTherapist: string;
  specialty: string;
  status: 'ocupada' | 'libre' | 'sanitizacion';
  equipment: string[];
  acoustic: string;
  currentClient?: string;
  minutesRemaining?: number;
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'en_cabina' | 'disponible' | 'descanso';
  assignedCabin: string;
  schedule: string;
  restPause: string;
  specialties: string[];
  appointmentsThisMonth: number;
  rating: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Rituales Signature' | 'Masajes Terapéuticos' | 'Cuidado Facial' | 'Hidroterapia';
  description: string;
  durationMinutes: number;
  bufferMinutes: number;
  price: number;
  isActive: boolean;
  visibleOnWeb: boolean;
}

export interface BoutiqueProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  badge: string;
  recommendedBy?: string;
}

export interface CartItem {
  id: string;
  type: 'service' | 'product';
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  tag: string;
}

export interface ShiftClosureData {
  branch: string;
  cashierName: string;
  responsibleReceptionist: string;
  shiftHours: string;
  shiftFolio: string;
  initialFloat: number; // Fondo fijo: $1,000
  startingFloat: number;
  totalSales: number; // $18,450
  servicesSales: number; // $14,200 (8 sesiones)
  serviceSales: number;
  boutiqueSales: number; // $4,250 (6 articulos)
  retailSales: number;
  tipsTotal: number;
  systemExpected: {
    card: number;
    spei: number;
    cash: number;
  };
  cashChannel: {
    initialFloat: number;
    cashCollected: number;
    pettyCashExpense: number; // $200 para flores frescas
    pettyCashReason: string;
    systemTotal: number;
    physicalCount: number;
  };
  cardChannel: {
    terminal1Total: number; // Visa/MC ($6,800 - 6 vouchers)
    terminal2Total: number; // Amex ($4,500 - 3 vouchers)
    totalBatch: number;
    vouchersCount: number;
    vouchersSum: number;
  };
  speiChannel: {
    totalExpected: number;
    transfers: Array<{
      folio: string;
      client: string;
      amount: number;
      validated: boolean;
    }>;
  };
  tipsDistributed: Array<{
    therapist: string;
    amount: number;
    avatar: string;
    serviceSummary: string;
  }>;
  shiftNotes: string;
  isClosed: boolean;
  closedAt?: string;
}
