import React from 'react';

interface HeaderProps {
  isEmptyState: boolean;
  onToggleEmptyState: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isEmptyState,
  onToggleEmptyState,
  onResetData,
}) => {
  return (
    <header
      id="app-header"
      className="fixed top-0 inset-x-0 z-40 bg-[#f8f9fb]/90 backdrop-blur-xl border-b border-[#e5e7eb]/60 pt-safe"
    >
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
        {/* Logo Bolsillo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0b0b0c] flex items-center justify-center shadow-xs">
            <span className="text-[#00ea67] font-extrabold text-lg leading-none">b</span>
          </div>
          <div className="flex flex-col">
            <span className="font-outfit text-xl text-[#191c1e] font-extrabold tracking-tight">
              Bolsillo
            </span>
          </div>
        </div>

        {/* Right controls: State switch & User */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-state"
            type="button"
            onClick={onToggleEmptyState}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
              isEmptyState
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
            title="Alternar entre estado vacío y con datos mock"
          >
            {isEmptyState ? 'Modo Vacío' : 'Con Datos'}
          </button>

          <button
            id="btn-notifications"
            type="button"
            aria-label="Notificaciones"
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#191c1e] hover:bg-[#eceef0] active:scale-95 transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#00ea67]" />
          </button>

          <div
            id="user-avatar"
            className="w-8 h-8 rounded-full bg-[#006e2c] flex items-center justify-center text-white shadow-xs font-semibold text-xs"
            title="Camilo"
          >
            C
          </div>
        </div>
      </div>
    </header>
  );
};
