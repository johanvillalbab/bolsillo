import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'inicio',
  onTabChange,
}) => {
  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: 'account_balance_wallet' },
    { id: 'movimientos', label: 'Movimientos', icon: 'receipt_long' },
    { id: 'presupuesto', label: 'Presupuesto', icon: 'pie_chart' },
    { id: 'mi-cuenta', label: 'Mi Cuenta', icon: 'account_circle' },
  ];

  return (
    <nav
      id="bottom-navigation"
      className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#f8f9fb]/95 backdrop-blur-xl border-t border-[#e5e7eb]/80 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              type="button"
              onClick={() => onTabChange?.(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] h-12 gap-0.5 transition-colors cursor-pointer ${
                isActive
                  ? 'text-[#191c1e] font-bold'
                  : 'text-[#6c727f] hover:text-[#191c1e]'
              }`}
            >
              <div
                className={`w-9 h-6 flex items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-[#eceef0]' : ''
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] ${isActive ? 'fill-1' : ''}`}>
                  {tab.icon}
                </span>
              </div>
              <span className="font-outfit text-[11px] tracking-normal">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
