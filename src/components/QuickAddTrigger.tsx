import React from 'react';

interface QuickAddTriggerProps {
  onOpenModal: () => void;
}

export const QuickAddTrigger: React.FC<QuickAddTriggerProps> = ({ onOpenModal }) => {
  return (
    <div className="w-full my-1">
      <button
        id="quick-add-trigger"
        type="button"
        onClick={onOpenModal}
        className="group relative w-full h-16 rounded-full bg-[#00ea67] text-[#002108] font-outfit text-base font-bold flex items-center justify-between px-4 shadow-[0_8px_24px_rgba(0,234,103,0.35)] active:scale-[0.98] hover:brightness-105 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#191c1e] text-[#00ea67] flex items-center justify-center shadow-inner group-hover:rotate-90 transition-transform">
            <span className="material-symbols-outlined text-[24px]">add</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-outfit text-[17px] text-[#191c1e] leading-tight font-bold">
              Registrar gasto
            </span>
            <div className="flex items-center gap-1 text-xs font-normal text-[#191c1e]/80">
              <span>Toma menos de 15 segundos</span>
              <span className="material-symbols-outlined text-[14px]">bolt</span>
            </div>
          </div>
        </div>
        <span className="material-symbols-outlined text-[24px] text-[#191c1e] pr-1">
          arrow_forward
        </span>
      </button>
    </div>
  );
};
