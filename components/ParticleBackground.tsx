import React from 'react';

const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -25,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    colorClass: Math.random() > 0.5 ? 'bg-[#31e0e0]' : 'bg-[#ff4da3]',
    translateX: Math.random() * 200 - 100,
    translateY: Math.random() * 200 - 100,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>
        {particles.map(p => `
          @keyframes moveParticle-${p.id} {
            0% { transform: translate(0, 0); }
            100% { transform: translate(${p.translateX}px, ${p.translateY}px); }
          }
        `).join('')}
      </style>
      {particles.map(p => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.colorClass} opacity-30`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
            animation: `moveParticle-${p.id} ${p.duration}s linear ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
