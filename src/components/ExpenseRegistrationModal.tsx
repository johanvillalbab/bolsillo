import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExpenseCategory, PaymentMethod } from '../types';
import { CATEGORIES, PAYMENT_METHODS, formatCLP } from '../data/mockData';

interface ExpenseRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveExpense: (expense: {
    amount: number;
    category: ExpenseCategory;
    paymentMethod: PaymentMethod;
    concept: string;
  }) => void;
  currentAvailable: number;
  initialMethod?: PaymentMethod;
}

export const ExpenseRegistrationModal: React.FC<ExpenseRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSaveExpense,
  currentAvailable,
  initialMethod = 'transferencia',
}) => {
  const [amountStr, setAmountStr] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('comida');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(initialMethod);
  const [concept, setConcept] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync initial method when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedMethod(initialMethod);
      setAmountStr('');
      setConcept('');
      setIsSuccess(false);
    }
  }, [isOpen, initialMethod]);

  const parsedAmount = parseInt(amountStr, 10) || 0;
  const newAvailable = Math.max(0, currentAvailable - parsedAmount);

  const quickConcepts: Record<ExpenseCategory, string[]> = {
    comida: ['Almuerzo menú', 'Delivery comida', 'Cena', 'Pan / Desayuno'],
    antojo: ['Café de paso', 'Helado / Snack', 'Bebida / Jugo', 'Dulce'],
    casa: ['Supermercado', 'Verdulería / Feria', 'Farmacia', 'Artículos aseo'],
    transporte: ['Metro / Micro', 'Bip! Carga', 'Uber / Didi', 'Bencina'],
    servicios: ['Luz / Agua / Gas', 'Internet / Plan', 'Streaming', 'Cuenta'],
    otro: ['Gasto suelto', 'Regalo', 'Imprevisto', 'Varios'],
  };

  const handleKeypadPress = (digit: string) => {
    if (amountStr.length >= 7) return; // Prevent excessive numbers
    setAmountStr((prev) => (prev === '0' ? digit : prev + digit));
  };

  const handleBackspace = () => {
    setAmountStr((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setAmountStr('');
  };

  const handleAddPreset = (val: number) => {
    const current = parseInt(amountStr, 10) || 0;
    setAmountStr(String(current + val));
  };

  const handleCategorySelect = (catId: ExpenseCategory) => {
    setSelectedCategory(catId);
    // If no concept typed yet or matching old category, suggest default
    if (!concept || Object.values(quickConcepts).flat().includes(concept)) {
      setConcept(quickConcepts[catId][0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedAmount <= 0) return;

    const finalConcept = concept.trim() || quickConcepts[selectedCategory][0] || 'Gasto del día';

    setIsSuccess(true);
    setTimeout(() => {
      onSaveExpense({
        amount: parsedAmount,
        category: selectedCategory,
        paymentMethod: selectedMethod,
        concept: finalConcept,
      });
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="modal-expense-overlay"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSuccess) onClose();
        }}
      >
        <motion.div
          id="modal-expense-sheet"
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#e5e7eb] max-h-[92vh] overflow-y-auto flex flex-col"
        >
          {isSuccess ? (
            /* Pantalla 3: Confirmación Inmediata / Feedback */
            <div
              id="success-feedback-view"
              className="p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[380px]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-[#00ea67] text-[#002108] flex items-center justify-center shadow-lg"
              >
                <span className="material-symbols-outlined text-[44px]">check</span>
              </motion.div>

              <div className="flex flex-col gap-1">
                <h3 className="font-outfit text-2xl font-extrabold text-[#191c1e]">
                  ¡Listo! Gasto anotado
                </h3>
                <p className="text-sm text-[#6c727f]">
                  Tu disponible semanal se actualizó al instante.
                </p>
              </div>

              <div className="w-full bg-[#f8f9fb] p-4 rounded-2xl border border-[#e5e7eb] flex items-center justify-between mt-2">
                <span className="text-xs text-[#6c727f]">Nuevo disponible:</span>
                <span className="font-outfit text-xl font-bold text-[#191c1e]">
                  {formatCLP(newAvailable)} CLP
                </span>
              </div>
            </div>
          ) : (
            /* Pantalla 2: Formulario optimizado < 15 segundos */
            <form onSubmit={handleSubmit} className="p-4 sm:p-5 flex flex-col gap-4">
              {/* Header with Title & Close */}
              <div className="flex items-center justify-between pb-1 border-b border-[#f2f4f6]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#00ea67] text-[#002108] flex items-center justify-center font-bold text-xs">
                    $
                  </div>
                  <h3 className="font-outfit text-lg font-bold text-[#191c1e]">
                    Registrar nuevo gasto
                  </h3>
                </div>
                <button
                  type="button"
                  id="btn-close-modal"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#f2f4f6] text-[#6c727f] hover:text-[#191c1e] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* 1. Display del Monto */}
              <div className="bg-[#f8f9fb] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-[#e5e7eb]/80">
                <span className="text-[11px] font-semibold text-[#6c727f] uppercase tracking-wider">
                  Monto a registrar
                </span>
                <div className="flex items-center justify-center gap-1">
                  <span className="font-outfit text-3xl sm:text-4xl font-extrabold text-[#6c727f]">
                    $
                  </span>
                  <input
                    id="modal-amount-input"
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    autoFocus
                    value={amountStr}
                    onChange={(e) => setAmountStr(e.target.value)}
                    className="w-48 text-center font-outfit text-3xl sm:text-4xl font-extrabold text-[#191c1e] bg-transparent focus:outline-none placeholder:text-gray-300"
                  />
                  <span className="font-outfit text-xs font-bold text-[#6c727f] mt-3">CLP</span>
                </div>

                {/* Presets rápidos */}
                <div className="flex items-center gap-1.5 flex-wrap justify-center mt-1">
                  {[1000, 2000, 5000, 10000, 20000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAddPreset(preset)}
                      className="px-2.5 py-1 rounded-full bg-white border border-[#e5e7eb] text-xs font-semibold text-[#191c1e] hover:bg-[#68ff8a] active:scale-95 transition-all cursor-pointer"
                    >
                      +${preset.toLocaleString('es-CL')}
                    </button>
                  ))}
                  {amountStr && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="px-2 py-1 rounded-full bg-gray-200 text-[11px] text-gray-700 hover:bg-gray-300 cursor-pointer"
                    >
                      Borrar
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Selector de Categoría */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[#191c1e]">Categoría</span>
                <div className="grid grid-cols-3 gap-2" id="modal-category-grid">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        id={`cat-btn-${cat.id}`}
                        type="button"
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#191c1e] text-[#00ea67] shadow-sm ring-2 ring-[#00ea67]'
                            : 'bg-[#f8f9fb] text-[#191c1e] border border-[#e5e7eb] hover:bg-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {cat.icon}
                        </span>
                        <span className="truncate">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Selector de Método de Pago */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[#191c1e]">Método de pago</span>
                <div className="grid grid-cols-3 gap-2" id="modal-payment-grid">
                  {PAYMENT_METHODS.map((pm) => {
                    const isSelected = selectedMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        id={`modal-pm-${pm.id}`}
                        type="button"
                        onClick={() => setSelectedMethod(pm.id)}
                        className={`flex items-center justify-center gap-1.5 h-10 px-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#00ea67] text-[#002108] font-bold shadow-xs'
                            : 'bg-[#f8f9fb] text-[#6c727f] border border-[#e5e7eb] hover:bg-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {pm.icon}
                        </span>
                        <span>{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Detalle / Concepto (Con sugerencias rápidas) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="modal-concept-input" className="text-xs font-semibold text-[#191c1e]">
                    Detalle o nota (opcional)
                  </label>
                  <span className="text-[11px] text-[#6c727f]">Toca una sugerencia</span>
                </div>
                <input
                  id="modal-concept-input"
                  type="text"
                  placeholder={`Ej: ${quickConcepts[selectedCategory][0]}`}
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f8f9fb] border border-[#e5e7eb] text-xs text-[#191c1e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ea67]"
                />
                {/* Sugerencias de chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {quickConcepts[selectedCategory].map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setConcept(sug)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                        concept === sug
                          ? 'bg-[#191c1e] text-white'
                          : 'bg-[#eceef0] text-[#6c727f] hover:bg-gray-200'
                      }`}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Previsualización del Impacto en el Disponible */}
              {parsedAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-1.5 text-[#006e2c]">
                    <span className="material-symbols-outlined text-[16px]">trending_down</span>
                    <span>Tu disponible quedará en:</span>
                  </div>
                  <span className="font-outfit font-bold text-[#00531f]">
                    {formatCLP(newAvailable)} CLP
                  </span>
                </motion.div>
              )}

              {/* 6. CTA Principal para Guardar */}
              <div className="pt-2">
                <button
                  id="btn-confirm-save-expense"
                  type="submit"
                  disabled={parsedAmount <= 0}
                  className={`w-full h-14 rounded-full font-outfit text-base font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 ${
                    parsedAmount > 0
                      ? 'bg-[#00ea67] text-[#002108] hover:brightness-105 shadow-[0_4px_18px_rgba(0,234,103,0.35)]'
                      : 'bg-[#eceef0] text-[#6c727f] cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>Guardar gasto</span>
                  {parsedAmount > 0 && <span>({formatCLP(parsedAmount)})</span>}
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
