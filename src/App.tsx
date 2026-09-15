import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { WeeklyAvailableCard } from './components/WeeklyAvailableCard';
import { QuickAddTrigger } from './components/QuickAddTrigger';
import { InlineQuickAdd } from './components/InlineQuickAdd';
import { ExpensesList } from './components/ExpensesList';
import { MotivationalBanner } from './components/MotivationalBanner';
import { BottomNav } from './components/BottomNav';
import { ExpenseRegistrationModal } from './components/ExpenseRegistrationModal';
import {
  INITIAL_EXPENSES,
  INITIAL_WEEKLY_BUDGET,
  CATEGORIES,
  formatCLP,
} from './data/mockData';
import { Expense, ExpenseCategory, PaymentMethod } from './types';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [isEmptyState, setIsEmptyState] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('transferencia');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('inicio');

  // Baseline weekly calculation
  // With initial mock (3 items = $18.400) + previous spent ($49.100), total spent = $67.500
  // Available = $210.000 - $67.500 = $142.500 (68%)
  const spentPreviousDays = isEmptyState ? 0 : 49100;
  const todaySpent = useMemo(() => {
    return expenses.reduce((acc, item) => acc + item.amount, 0);
  }, [expenses]);

  const totalSpent = spentPreviousDays + todaySpent;
  const available = Math.max(0, INITIAL_WEEKLY_BUDGET - totalSpent);
  const percentageRemaining = Math.round((available / INITIAL_WEEKLY_BUDGET) * 100);
  const daysRemaining = 4;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle between Empty State and Mock Data
  const handleToggleEmptyState = () => {
    if (!isEmptyState) {
      setExpenses([]);
      setIsEmptyState(true);
      showToast('Modo vacío activado: 0 gastos hoy');
    } else {
      setExpenses(INITIAL_EXPENSES);
      setIsEmptyState(false);
      showToast('Datos mock restaurados ($142.500 disponible)');
    }
  };

  const handleResetData = () => {
    setExpenses(INITIAL_EXPENSES);
    setIsEmptyState(false);
    showToast('Datos reiniciados');
  };

  // Quick inline add
  const handleQuickInlineSave = (amount: number, method: PaymentMethod) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      concept: 'Gasto al vuelo',
      amount,
      category: 'otro',
      paymentMethod: method,
      timestamp: timeStr,
      createdAt: Date.now(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    showToast(`Guardado ${formatCLP(amount)} · Disponible actualizado a ${formatCLP(available - amount)}`);
  };

  // Modal full save
  const handleModalSaveExpense = (newExpData: {
    amount: number;
    category: ExpenseCategory;
    paymentMethod: PaymentMethod;
    concept: string;
  }) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      concept: newExpData.concept,
      amount: newExpData.amount,
      category: newExpData.category,
      paymentMethod: newExpData.paymentMethod,
      timestamp: timeStr,
      createdAt: Date.now(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    showToast(
      `¡Listo! Registraste ${formatCLP(newExpData.amount)} en ${newExpData.concept}`
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    showToast('Gasto eliminado');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] flex flex-col font-sans antialiased selection:bg-[#00ea67]/30">
      {/* 1. Header Fijo */}
      <Header
        isEmptyState={isEmptyState}
        onToggleEmptyState={handleToggleEmptyState}
        onResetData={handleResetData}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 inset-x-4 z-50 max-w-sm mx-auto bg-[#191c1e] text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold border border-emerald-500/30"
          >
            <span className="w-2 h-2 rounded-full bg-[#00ea67]" />
            <span className="flex-1 truncate">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Screen Container (Mobile App Frame) */}
      <main className="flex-1 w-full max-w-md mx-auto pt-20 pb-28 px-4 flex flex-col gap-4">
        {/* 1. Saludo breve y empático */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-outfit text-xl font-bold text-[#191c1e]">
                Hola, Camilo
              </h1>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00ea67]/20 text-[#006e2c]">
                <svg
                  className="w-3.5 h-3.5 stroke-[#006e2c]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                </svg>
              </span>
            </div>
            <p className="text-xs text-[#6c727f]">Cuidemos la plata de hoy</p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f4f6] border border-[#e5e7eb]">
            <span className="w-2 h-2 rounded-full bg-[#00ea67] animate-pulse" />
            <span className="font-outfit text-[11px] font-bold text-[#3b4b3b] uppercase tracking-wider">
              Al día
            </span>
          </div>
        </div>

        {/* 2. Disponible de la semana (Hero Card) */}
        <WeeklyAvailableCard
          available={available}
          totalBudget={INITIAL_WEEKLY_BUDGET}
          percentageRemaining={percentageRemaining}
          daysRemaining={daysRemaining}
        />

        {/* 3. Botón de Acción Principal (El más protagónico) */}
        <QuickAddTrigger onOpenModal={() => setIsModalOpen(true)} />

        {/* 4. Selector Rápido de Método + Micro Formulario de Entrada Rápida */}
        <InlineQuickAdd
          selectedMethod={selectedMethod}
          onSelectMethod={setSelectedMethod}
          onQuickSave={handleQuickInlineSave}
        />

        {/* 5. Gastos de hoy (Con soporte para lista y estado vacío) */}
        <ExpensesList
          expenses={expenses}
          onOpenAddModal={() => setIsModalOpen(true)}
          onDeleteExpense={handleDeleteExpense}
        />

        {/* 6. Banner Motivacional / Cero Jerga */}
        <MotivationalBanner />
      </main>

      {/* Modal de Registro de Gasto (< 15 segundos) */}
      <ExpenseRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveExpense={handleModalSaveExpense}
        currentAvailable={available}
        initialMethod={selectedMethod}
      />

      {/* Bottom Navigation Fija */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
