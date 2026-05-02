// src/components/CheckInView.tsx
import React from 'react';
import useCheckIn from '../store/useCheckIn';

const CheckInView: React.FC = () => {
  const { mood, sleep, setMood, setSleep, completeCheckIn } = useCheckIn();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-8">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">How are you feeling?</h1>
        
        <div className="mb-6">
          <label className="block mb-2">Mood: {mood.toFixed(1)} / 5</label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={mood}
            onChange={(e) => setMood(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2">Sleep Quality: {sleep.toFixed(1)} / 10</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={sleep}
            onChange={(e) => setSleep(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          onClick={() => completeCheckIn(mood, sleep)}
          className="w-full bg-blue-600 rounded-lg px-6 py-3 hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CheckInView;
