// src/store/useCheckIn.ts
import { create } from 'zustand';

interface CheckInState {
  hasCheckedIn: boolean;
  mood: number;
  sleep: number;
  completeCheckIn: (mood: number, sleep: number) => void;
  setMood: (mood: number) => void;
  setSleep: (sleep: number) => void;
}

const useCheckIn = create<CheckInState>((set) => ({
  hasCheckedIn: false,
  mood: 3,
  sleep: 5,
  completeCheckIn: (mood, sleep) => set({ hasCheckedIn: true, mood, sleep }),
  setMood: (mood) => set({ mood }),
  setSleep: (sleep) => set({ sleep }),
}));

export default useCheckIn;
