import React from 'react';
import { Compass, Navigation, Sun, Cloud, MapPin, Sparkles } from 'lucide-react';
import './BackgroundDecorations.css';

const BackgroundDecorations = () => {
  return (
    <div className="bg-decor-container" aria-hidden="true">
      {/* Soft Palm Leaf Shadow - Top Right */}
      <div className="decor-item palm-shadow-right sway-slow">
        <img src="/palm_shadow.png" alt="" />
      </div>

      {/* Soft Palm Leaf Shadow - Middle Left */}
      <div className="decor-item palm-shadow-left sway-medium">
        <img src="/palm_shadow.png" alt="" />
      </div>

      {/* Floating Travel Motifs with Soft Glass/Blur */}
      <div className="decor-item floating-motif motif-compass float-sway-1">
        <Compass size={120} strokeWidth={1} />
      </div>

      <div className="decor-item floating-motif motif-sun float-sway-2">
        <Sun size={140} strokeWidth={1} />
      </div>

      <div className="decor-item floating-motif motif-cloud float-sway-3">
        <Cloud size={160} strokeWidth={1} />
      </div>

      <div className="decor-item floating-motif motif-nav float-sway-4">
        <Navigation size={90} strokeWidth={1} />
      </div>

      <div className="decor-item floating-motif motif-pin float-sway-2">
        <MapPin size={80} strokeWidth={1} />
      </div>

      {/* Ambient Gradient Glow Orbs */}
      <div className="ambient-orb orb-1 pulse-slow" />
      <div className="ambient-orb orb-2 pulse-medium" />
    </div>
  );
};

export default BackgroundDecorations;
