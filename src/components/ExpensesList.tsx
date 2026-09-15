import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Expense } from '../types';
import { CATEGORIES, formatCLP } from '../data/mockData';

interface ExpensesListProps {
  expenses: Expense[];
  onOpenAddModal: () => void;
  onDeleteExpense?: (id: string) => void;
}

export const ExpensesList: React.FC<ExpensesListProps> = ({
  expenses,
  onOpenAddModal,
  onDeleteExpense,
}) => {
  const totalToday = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const getCategoryIcon = (catId: string) => {
    const found = CATEGORIES.find((c) => c.id === catId);
    return found?.icon || 'receipt';
  };

  const getCategoryName = (catId: string) => {
    const found = CATEGORIES.find((c) => c.id === catId);
    return found?.name || 'Varios';
  };

  const getMethodLabel = (method: string) => {
    if (method === 'transferencia') return 'Transferencia';
    if (method === 'efectivo') return 'Efectivo';
    if (method === 'tarjeta') return 'Tarjeta';
    return method;
  };

  return (
    <div id="expenses-section" className="flex flex-col gap-2.5">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="font-outfit text-lg font-bold text-[#191c1e]">Gastos de hoy</h2>
          <span
            id="expense-count-badge"
            className="px-2 py-0.5 rounded-full bg-[#eceef0] text-xs font-bold text-[#6c727f]"
          >
            {expenses.length}
          </span>
        </div>
        <span
          id="total-today-amount"
          className="text-xs font-semibold text-[#3b4b3b]"
        >
          {formatCLP(totalToday)} total
        </span>
      </div>

      {/* List / Empty State */}
      {expenses.length === 0 ? (
        <div
          id="empty-state-card"
          className="bg-white rounded-2xl p-6 text-center shadow-xs border border-[#e5e7eb]/60 flex flex-col items-center justify-center gap-3"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#006e2c] flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">spa</span>
          </div>
          <div className="flex flex-col gap-1 max-w-xs">
            <h3 className="font-outfit text-base font-bold text-[#191c1e]">
              Aún no hay gastos registrados hoy
            </h3>
            <p className="text-xs text-[#6c727f] leading-relaxed">
              Tu disponible está 100% intacto hoy. Si compraste algo chico, anótalo en segundos.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAddModal}
            className="mt-1 px-4 py-2 rounded-full bg-[#191c1e] text-[#00ea67] text-xs font-bold active:scale-95 transition-all cursor-pointer"
          >
            + Registrar mi primer gasto
          </button>
        </div>
      ) : (
        <div id="expense-list-container" className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {expenses.map((expense) => (
              <motion.div
                key={expense.id}
                id={`expense-item-${expense.id}`}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group flex items-center justify-between p-3 rounded-2xl bg-white shadow-xs border border-[#e5e7eb]/40 hover:border-[#e5e7eb] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#f2f4f6] flex items-center justify-center shrink-0 text-[#191c1e]">
                    <span className="material-symbols-outlined text-[22px]">
                      {getCategoryIcon(expense.category)}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-[#191c1e] truncate">
                      {expense.concept || getCategoryName(expense.category)}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#6c727f]">
                      <span className="px-1.5 py-0.5 rounded-md bg-[#eceef0] text-[10px] font-semibold text-[#191c1e]">
                        {getCategoryName(expense.category)}
                      </span>
                      <span>•</span>
                      <span className="truncate">{getMethodLabel(expense.paymentMethod)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end shrink-0 pl-2">
                    <span className="font-outfit text-[15px] font-bold text-[#191c1e]">
                      -{formatCLP(expense.amount)}
                    </span>
                    <span className="text-[11px] text-[#6c727f]">{expense.timestamp}</span>
                  </div>

                  {onDeleteExpense && (
                    <button
                      type="button"
                      onClick={() => onDeleteExpense(expense.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-opacity ml-1"
                      title="Eliminar gasto"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
