
import { Patient, InventoryItem, Staff, Ward } from './types';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: '1',
    mrn: 'MRN-1001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    contact: '555-0101',
    insurance: 'HealthGuard Plus',
    admissionDate: '2024-03-10',
    condition: 'Post-Surgery Recovery',
    history: ['Hypertension', 'Appendectomy (2020)']
  },
  {
    id: '2',
    mrn: 'MRN-1002',
    name: 'Sarah Smith',
    age: 32,
    gender: 'Female',
    bloodGroup: 'A-',
    contact: '555-0102',
    insurance: 'Medicare Plus',
    admissionDate: '2024-03-12',
    condition: 'Acute Bronchitis',
    history: ['Seasonal Allergies']
  },
  {
    id: '3',
    mrn: 'MRN-1003',
    name: 'Robert Brown',
    age: 68,
    gender: 'Male',
    bloodGroup: 'B+',
    contact: '555-0103',
    insurance: 'DirectHealth',
    admissionDate: '2024-03-08',
    condition: 'Cardiac Observation',
    history: ['Diabetes Type 2', 'Previous Myocardial Infarction']
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'Paracetamol 500mg', category: 'Medicine', stock: 1200, minStock: 200, unit: 'Tablets' },
  { id: 'i2', name: 'Amoxicillin', category: 'Medicine', stock: 45, minStock: 50, unit: 'Bottles' },
  { id: 'i3', name: 'Surgical Gloves', category: 'Supply', stock: 500, minStock: 100, unit: 'Pairs' },
  { id: 'i4', name: 'Ventilator V2', category: 'Equipment', stock: 8, minStock: 2, unit: 'Units' },
  { id: 'i5', name: 'MRI Scanner', category: 'Equipment', stock: 2, minStock: 1, unit: 'Units' }
];

export const INITIAL_STAFF: Staff[] = [
  { id: 's1', name: 'Dr. Emily Vance', role: 'Doctor', department: 'Cardiology', status: 'Active', shift: '08:00 - 16:00', contact: '555-9001' },
  { id: 's2', name: 'Nurse Michael Chen', role: 'Nurse', department: 'Emergency', status: 'Active', shift: '16:00 - 00:00', contact: '555-9002' },
  { id: 's3', name: 'Dr. Alan Grant', role: 'Doctor', department: 'Pediatrics', status: 'On Leave', shift: '08:00 - 16:00', contact: '555-9003' },
  { id: 's4', name: 'Admin Sarah Connor', role: 'Admin', department: 'Operations', status: 'Active', shift: '09:00 - 17:00', contact: '555-9004' }
];

export const INITIAL_WARDS: Ward[] = [
  {
    id: 'w1',
    name: 'General Ward A',
    capacity: 20,
    occupied: 12,
    type: 'General',
    beds: Array.from({ length: 20 }, (_, i) => ({
      id: `WA-${i + 1}`,
      status: i < 12 ? 'Occupied' : 'Available',
      patientId: i < 12 ? `p${i}` : undefined
    }))
  },
  {
    id: 'w2',
    name: 'ICU Block 1',
    capacity: 8,
    occupied: 5,
    type: 'ICU',
    beds: Array.from({ length: 8 }, (_, i) => ({
      id: `ICU-${i + 1}`,
      status: i < 5 ? 'Occupied' : 'Available'
    }))
  }
];
