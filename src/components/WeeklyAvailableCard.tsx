import React from 'react';
import { motion } from 'motion/react';
import { formatCLP } from '../data/mockData';

interface WeeklyAvailableCardProps {
  available: number;
  totalBudget: number;
  percentageRemaining: number;
  daysRemaining: number;
}

export const WeeklyAvailableCard: React.FC<WeeklyAvailableCardProps> = ({
  available,
  percentageRemaining,
  daysRemaining,
}) => {
  const isHealthy = percentageRemaining >= 40;
  const isWarning = percentageRemaining < 40 && percentageRemaining > 15;

  return (
    <div
      id="weekly-available-card"
      className="relative overflow-hidden bg-white rounded-2xl p-4 shadow-sm border border-[#e5e7eb]/60"
    >
      {/* Top row: Label & Status badge */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-xs font-medium text-[#6c727f]">
          Disponible para esta semana
        </span>
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-2xs ${
            isHealthy
              ? 'bg-[#68ff8a] text-[#002108]'
              : isWarning
              ? 'bg-amber-100 text-amber-900'
              : 'bg-rose-100 text-rose-900'
          }`}
        >
          <span>{isHealthy ? 'Vas bien' : isWarning ? 'Ajustar ritmo' : 'Cuidado'}</span>
          {isHealthy && (
            <svg
              className="w-3.5 h-3.5 text-[#002108]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </span>
      </div>

      {/* Main Available Amount */}
      <div className="flex items-baseline gap-1.5 my-1">
        <motion.span
          key={available}
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="font-outfit text-4xl sm:text-[38px] font-extrabold text-[#191c1e] tracking-tight"
        >
          {formatCLP(available)}
        </motion.span>
        <span className="font-outfit text-xs font-bold text-[#6c727f]">CLP</span>
      </div>

      {/* Progress Bar & Indicators */}
      <div className="flex flex-col gap-1.5 mt-3">
        <div className="w-full h-2.5 bg-[#eceef0] rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              isHealthy ? 'bg-[#00ea67]' : isWarning ? 'bg-amber-400' : 'bg-rose-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(Math.max(percentageRemaining, 0), 100)}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-[#6c727f] mt-0.5">
          <span>Te quedan {daysRemaining} días de ritmo diario</span>
          <span className="font-outfit font-semibold text-[#191c1e]">
            {Math.max(0, percentageRemaining)}% restante
          </span>
        </div>
      </div>
    </div>
  );
};
