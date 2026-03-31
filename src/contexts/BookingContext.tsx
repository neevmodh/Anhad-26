import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Station, Train, Passenger, Seat } from '@/types/booking';

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
  pastBookings: Array<{
    id: string;
    train: Train;
    passengers: Passenger[];
    seats: Seat[];
    date: Date;
    pnr: string;
    totalPrice: number;
  }>;
}

interface BookingContextType {
  state: BookingState;
  setFrom: (s: Station | null) => void;
  setTo: (s: Station | null) => void;
  setDate: (d: Date | null) => void;
  setSelectedClass: (c: string) => void;
  setQuota: (q: string) => void;
  setSelectedTrain: (t: Train | null) => void;
  setPassengers: (p: Passenger[]) => void;
  setSelectedSeats: (s: Seat[]) => void;
  setPaymentMethod: (m: string) => void;
  setStep: (s: number) => void;
  swapStations: () => void;
  confirmBooking: () => void;
  reset: () => void;
}

const initial: BookingState = {
  from: null,
  to: null,
  date: null,
  selectedClass: 'all',
  quota: 'general',
  selectedTrain: null,
  passengers: [{ name: '', age: 0, gender: 'M', berth: 'none' }],
  selectedSeats: [],
  paymentMethod: 'upi',
  step: 1,
  pastBookings: [],
};

const BookingContext = createContext<BookingContextType | null>(null);

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be inside BookingProvider');
  return ctx;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState>(initial);

  const update = (partial: Partial<BookingState>) => setState(prev => ({ ...prev, ...partial }));

  const confirmBooking = () => {
    if (!state.selectedTrain) return;
    
    const newBooking = {
      id: Math.random().toString(36).substring(7),
      train: state.selectedTrain,
      passengers: state.passengers,
      seats: state.selectedSeats,
      date: state.date || new Date(),
      pnr: 'PNR' + Math.random().toString(36).substring(2, 11).toUpperCase(),
      totalPrice: state.selectedTrain.classes[0].price * state.passengers.length,
    };

    setState(prev => ({
      ...prev,
      pastBookings: [newBooking, ...prev.pastBookings],
    }));
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        setFrom: (from) => update({ from }),
        setTo: (to) => update({ to }),
        setDate: (date) => update({ date }),
        setSelectedClass: (selectedClass) => update({ selectedClass }),
        setQuota: (quota) => update({ quota }),
        setSelectedTrain: (selectedTrain) => update({ selectedTrain }),
        setPassengers: (passengers) => update({ passengers }),
        setSelectedSeats: (selectedSeats) => update({ selectedSeats }),
        setPaymentMethod: (paymentMethod) => update({ paymentMethod }),
        setStep: (step) => update({ step }),
        swapStations: () => setState(prev => ({ ...prev, from: prev.to, to: prev.from })),
        confirmBooking,
        reset: () => setState(prev => ({ ...initial, pastBookings: prev.pastBookings })),
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
