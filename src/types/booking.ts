export interface Station {
  code: string;
  name: string;
  city: string;
}

export interface TrainClass {
  code: string;
  name: string;
  price: number;
  available: number;
  status: 'available' | 'rac' | 'waitlist' | 'none' | 'limited';
}

export interface Train {
  id: string;
  number: string;
  name: string;
  from: Station;
  to: Station;
  departure: string;
  arrival: string;
  duration: string;
  daysOfWeek: string[];
  classes: TrainClass[];
  isBestOption?: boolean;
  confirmationProbability?: number;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  berth: 'LB' | 'MB' | 'UB' | 'SL' | 'SU' | 'none';
  idType?: string;
  idNumber?: string;
}

export interface Seat {
  id: string;
  number: string;
  type: 'LB' | 'MB' | 'UB' | 'SL' | 'SU';
  status: 'available' | 'booked' | 'limited';
  coach: string;
}

export interface BookingState {
  from: Station | null;
  to: Station | null;
  date: Date | null;
  selectedClass: string;
  quota: string;
  selectedTrain: Train | null;
  passengers: Passenger[];
  selectedSeats: Seat[];
  paymentMethod: string;
  step: number;
}

export type Quota = 'general' | 'ladies' | 'tatkal' | 'premium-tatkal' | 'senior-citizen';
