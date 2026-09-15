import React from 'react';

export const MotivationalBanner: React.FC = () => {
  return (
    <div
      id="motivational-banner"
      className="relative overflow-hidden p-4 rounded-2xl bg-[#f2f4f6] flex items-start gap-3 border border-[#e5e7eb]/60"
    >
      <div className="w-9 h-9 rounded-full bg-[#00ea67] text-[#002108] flex items-center justify-center shrink-0 shadow-2xs">
        <span className="material-symbols-outlined text-[20px]">bolt</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-bold text-[#191c1e]">
          ¿Hiciste otro gasto suelto?
        </span>
        <p className="text-xs text-[#6c727f] leading-relaxed">
          Anótalo antes de que se te olvide, cada peso cuenta para llegar tranquilos al fin de semana{' '}
          <span className="text-[#006e2c] font-semibold">💚</span>.
        </p>
      </div>
    </div>
  );
};
