export type PaymentMethod = 'transferencia' | 'efectivo' | 'tarjeta';

export type ExpenseCategory =
  | 'comida'
  | 'antojo'
  | 'casa'
  | 'transporte'
  | 'servicios'
  | 'otro';

export interface CategoryInfo {
  id: ExpenseCategory;
  name: string;
  icon: string; // Material symbol or Lucide icon name
  bgColor: string;
  textColor: string;
}

export interface Expense {
  id: string;
  concept: string;
  amount: number; // in CLP (Chilean Pesos)
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
  timestamp: string; // HH:mm or formatted date
  createdAt: number; // unix timestamp for sorting
}

export interface WeeklyBudgetSummary {
  totalBudget: number; // e.g. 210000 CLP
  available: number; // e.g. 142500 CLP
  spentSoFar: number; // e.g. 67500 CLP
  percentageRemaining: number; // e.g. 68
  daysRemaining: number; // e.g. 4
}
