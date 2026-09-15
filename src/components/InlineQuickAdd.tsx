import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { PAYMENT_METHODS } from '../data/mockData';

interface InlineQuickAddProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  onQuickSave: (amount: number, method: PaymentMethod) => void;
}

export const InlineQuickAdd: React.FC<InlineQuickAddProps> = ({
  selectedMethod,
  onSelectMethod,
  onQuickSave,
}) => {
  const [amountStr, setAmountStr] = useState('');
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  const handleAddPreset = (value: number) => {
    const current = parseInt(amountStr, 10) || 0;
    setAmountStr(String(current + value));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parsed = parseInt(amountStr, 10);
    if (!parsed || parsed <= 0) return;

    onQuickSave(parsed, selectedMethod);
    setIsSavedRecently(true);
    setAmountStr('');

    setTimeout(() => {
      setIsSavedRecently(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Selector de Método de Pago */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-[#191c1e]">Pagué con:</span>
          <span className="text-xs text-[#6c727f]">Preselección rápida</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5" id="payment-methods-selector">
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                id={`btn-payment-${method.id}`}
                type="button"
                onClick={() => onSelectMethod(method.id)}
                className={`flex items-center justify-center gap-1 h-11 px-2 rounded-full text-[11.5px] font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-[#191c1e] text-[#00ea67] shadow-md'
                    : 'bg-white text-[#6c727f] border border-[#e5e7eb]/80 hover:bg-[#eceef0]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] shrink-0">
                  {method.icon}
                </span>
                <span>{method.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input de Monto Inmediato */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e7eb]/60 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label htmlFor="quick-amount-input" className="text-xs font-semibold text-[#191c1e]">
            ¿Cuánto fue?
          </label>
          <span className="text-[11px] font-bold text-[#006e2c] bg-emerald-50 px-2 py-0.5 rounded-full">
            Registro al vuelo
          </span>
        </div>

        <form onSubmit={handleSave} className="relative flex items-center">
          <span className="absolute left-4 font-outfit text-xl font-bold text-[#6c727f]">$</span>
          <input
            id="quick-amount-input"
            type="number"
            inputMode="numeric"
            placeholder="0"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            className="w-full h-12 pl-9 pr-24 rounded-full bg-[#f2f4f6] font-outfit text-xl font-bold text-[#191c1e] placeholder:text-[#6c727f] focus:outline-none focus:ring-2 focus:ring-[#00ea67]"
          />
          <button
            id="btn-save-quick-inline"
            type="submit"
            disabled={!amountStr || parseInt(amountStr, 10) <= 0}
            className={`absolute right-1.5 px-4 py-2 rounded-full font-outfit text-xs font-bold transition-all cursor-pointer ${
              isSavedRecently
                ? 'bg-[#00ea67] text-[#002108]'
                : !amountStr || parseInt(amountStr, 10) <= 0
                ? 'bg-[#eceef0] text-[#6c727f] cursor-not-allowed opacity-70'
                : 'bg-[#191c1e] text-[#00ea67] hover:opacity-90 active:scale-95'
            }`}
          >
            {isSavedRecently ? '¡Listo! ✓' : 'Guardar'}
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {[1500, 3200, 5000, 10000].map((val) => (
            <button
              key={val}
              id={`btn-preset-${val}`}
              type="button"
              onClick={() => handleAddPreset(val)}
              className="px-3 py-1 rounded-full bg-[#eceef0] text-xs font-semibold text-[#191c1e] hover:bg-[#68ff8a] active:scale-95 transition-colors shrink-0 cursor-pointer"
            >
              +${val.toLocaleString('es-CL')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
