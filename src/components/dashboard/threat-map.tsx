"use client";

import React from 'react';
import { WorldMap } from './world-map';

// Mock data for threat locations (top, left percentages)
const threats = [
  { id: 1, top: '42%', left: '18%', severity: 'critical' }, // South America
  { id: 2, top: '35%', left: '52%', severity: 'high' }, // Europe
  { id: 3, top: '38%', left: '80%', severity: 'medium' }, // East Asia
  { id: 4, top: '25%', left: '22%', severity: 'high' }, // North America
  { id: 5, top: '55%', left: '75%', severity: 'critical' }, // Australia
  { id: 6, top: '45%', left: '65%', severity: 'medium' }, // Middle East
  { id: 7, top: '20%', left: '85%', severity: 'low' }, // Russia/Siberia
  { id: 8, top: '51%', left: '52%', severity: 'high' }, // Africa
];

const severityClasses = {
    critical: 'bg-red-500/80 border-red-400',
    high: 'bg-yellow-500/80 border-yellow-400',
    medium: 'bg-blue-500/80 border-blue-400',
    low: 'bg-green-500/80 border-green-400',
};

export function ThreatMap() {
  return (
    <div className="relative w-full h-auto aspect-[16/9] bg-background dark:bg-card rounded-lg p-4 overflow-hidden">
      <WorldMap className="absolute inset-0 w-full h-full object-cover text-muted" />
      <div className="relative w-full h-full">
        {threats.map(threat => (
          <div
            key={threat.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: threat.top, left: threat.left }}
          >
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-full border-2 ${severityClasses[threat.severity as keyof typeof severityClasses]}`}
              />
              <div
                className={`absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full animate-ping opacity-50 ${severityClasses[threat.severity as keyof typeof severityClasses]}`}
                style={{ animationDelay: `${threat.id * 0.2}s` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
