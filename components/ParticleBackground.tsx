
import React from 'react';

const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 50 });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * -20;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const colorClass = Math.random() > 0.5 ? 'bg-[#31E0E0]' : 'bg-[#FF4DA3]';

        return (
          <style key={`anim-${i}`}>{`
            @keyframes moveParticle-${i} {
              0% { transform: translate(0, 0); }
              100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); }
            }
          `}</style>
        );
      })}
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * -25;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const colorClass = Math.random() > 0.5 ? 'bg-[#31e0e0]' : 'bg-[#ff4da3]';

        return (
          <div
            key={i}
            className={`absolute rounded-full ${colorClass} opacity-20 motion-safe:animate-pulse`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top,
              left,
              animation: `moveParticle-${i} ${duration}s linear ${delay}s infinite alternate`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleBackground;
