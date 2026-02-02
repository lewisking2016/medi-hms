
export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  contact: string;
  insurance: string;
  admissionDate: string;
  condition: string;
  history: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Medicine' | 'Equipment' | 'Supply';
  stock: number;
  minStock: number;
  unit: string;
  expiry?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Admin' | 'Technician';
  department: string;
  status: 'Active' | 'On Leave' | 'Emergency';
  shift: string;
  contact: string;
}

export interface Ward {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  type: 'General' | 'ICU' | 'Pediatric' | 'Maternity';
  beds: Bed[];
}

export interface Bed {
  id: string;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
  patientId?: string;
}

export enum View {
  Dashboard = 'Dashboard',
  Patients = 'Patients',
  Inventory = 'Inventory',
  Staff = 'Staff',
  Wards = 'Wards',
  Analytics = 'Analytics',
  Assistant = 'Assistant'
}
