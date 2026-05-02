// src/components/CheckInView.tsx
import React from 'react';
import useCheckIn from '../store/useCheckIn';

const CheckInView: React.FC = () => {
  const { mood, sleep, setMood, setSleep, completeCheckIn } = useCheckIn();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-on-background p-8">
      <div className="w-full max-w-md bg-surface p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">How are you feeling?</h1>
        
        <div className="mb-6">
          <label className="block mb-2 text-on-surface/80">Mood: {mood.toFixed(1)} / 5</label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={mood}
            onChange={(e) => setMood(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-on-surface/80">Sleep Quality: {sleep.toFixed(1)} / 10</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={sleep}
            onChange={(e) => setSleep(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <button
          onClick={() => completeCheckIn(mood, sleep)}
          className="w-full bg-primary text-background font-bold rounded-lg px-6 py-3 hover:bg-primary/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CheckInView;
