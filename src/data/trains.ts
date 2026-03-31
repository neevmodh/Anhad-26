import { Train, Seat } from '@/types/booking';

export const sampleTrains: Train[] = [
  {
    id: '1',
    number: '12301',
    name: 'Rajdhani Express',
    from: { code: 'NDLS', name: 'New Delhi', city: 'New Delhi' },
    to: { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
    departure: '16:55',
    arrival: '09:55',
    duration: '17h 00m',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    isBestOption: true,
    confirmationProbability: 94,
    classes: [
      { code: '1A', name: 'First AC', price: 4215, available: 4, status: 'available' },
      { code: '2A', name: 'Second AC', price: 2470, available: 18, status: 'available' },
      { code: '3A', name: 'Third AC', price: 1760, available: 0, status: 'waitlist' },
    ],
  },
  {
    id: '2',
    number: '12259',
    name: 'Sealdah Duronto',
    from: { code: 'NDLS', name: 'New Delhi', city: 'New Delhi' },
    to: { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
    departure: '20:10',
    arrival: '11:40',
    duration: '15h 30m',
    daysOfWeek: ['Mon', 'Wed', 'Sat'],
    confirmationProbability: 78,
    classes: [
      { code: '1A', name: 'First AC', price: 4545, available: 2, status: 'limited' },
      { code: '2A', name: 'Second AC', price: 2680, available: 12, status: 'available' },
      { code: '3A', name: 'Third AC', price: 1890, available: 45, status: 'available' },
      { code: 'SL', name: 'Sleeper', price: 695, available: 120, status: 'available' },
    ],
  },
  {
    id: '3',
    number: '12381',
    name: 'Poorva Express',
    from: { code: 'NDLS', name: 'New Delhi', city: 'New Delhi' },
    to: { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
    departure: '08:20',
    arrival: '07:45',
    duration: '23h 25m',
    daysOfWeek: ['Tue', 'Thu', 'Sun'],
    confirmationProbability: 88,
    classes: [
      { code: '2A', name: 'Second AC', price: 2105, available: 24, status: 'available' },
      { code: '3A', name: 'Third AC', price: 1480, available: 62, status: 'available' },
      { code: 'SL', name: 'Sleeper', price: 545, available: 200, status: 'available' },
    ],
  },
  {
    id: '4',
    number: '12273',
    name: 'Howrah Rajdhani',
    from: { code: 'NDLS', name: 'New Delhi', city: 'New Delhi' },
    to: { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
    departure: '17:00',
    arrival: '09:50',
    duration: '16h 50m',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    confirmationProbability: 62,
    classes: [
      { code: '1A', name: 'First AC', price: 4215, available: 0, status: 'rac' },
      { code: '2A', name: 'Second AC', price: 2470, available: 6, status: 'available' },
      { code: '3A', name: 'Third AC', price: 1760, available: 0, status: 'waitlist' },
    ],
  },
  {
    id: '5',
    number: '13005',
    name: 'Amritsar Mail',
    from: { code: 'NDLS', name: 'New Delhi', city: 'New Delhi' },
    to: { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
    departure: '19:15',
    arrival: '23:55',
    duration: '28h 40m',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    confirmationProbability: 96,
    classes: [
      { code: '2A', name: 'Second AC', price: 1875, available: 34, status: 'available' },
      { code: '3A', name: 'Third AC', price: 1295, available: 78, status: 'available' },
      { code: 'SL', name: 'Sleeper', price: 455, available: 340, status: 'available' },
    ],
  },
];

export const generateSeats = (coach: string): Seat[] => {
  const types: Array<Seat['type']> = ['LB', 'MB', 'UB', 'SL', 'SU'];
  const seats: Seat[] = [];
  for (let i = 1; i <= 72; i++) {
    const typeIndex = (i - 1) % 5;
    const random = Math.random();
    let status: Seat['status'] = 'available';
    if (random > 0.7) status = 'booked';
    else if (random > 0.55) status = 'limited';
    seats.push({
      id: `${coach}-${i}`,
      number: `${i}`,
      type: types[typeIndex],
      status,
      coach,
    });
  }
  return seats;
};
