// src/components/CrisisView.tsx
import React from 'react';

const crisisResources = [
  {
    name: "SHOUT Text Line",
    description: "Text SHOUT to 85258 for free, 24/7 confidential support.",
    url: "sms:85258",
  },
  {
    name: "Samaritans",
    description: "Call 116 123 to talk to someone at any time, day or night.",
    url: "tel:116123",
  },
  {
    name: "NHS 111",
    description: "Call 111 for urgent medical advice if you are in the UK.",
    url: "tel:111",
  },
];

const CrisisView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-on-background p-4">
      <div className="w-full max-w-lg bg-surface p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-secondary">Immediate Support</h1>
        <p className="text-center mb-8">
          If you are in crisis or need immediate help, please reach out to one of the services below.
        </p>
        <div className="space-y-4">
          {crisisResources.map((resource) => (
            <div key={resource.name} className="bg-background p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-primary">{resource.name}</h2>
              <p className="mt-1 text-on-surface/80">{resource.description}</p>
              <a
                href={resource.url}
                className="inline-block mt-3 bg-secondary text-background font-bold py-2 px-4 rounded hover:bg-secondary/90 transition-colors"
              >
                Open {resource.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrisisView;
