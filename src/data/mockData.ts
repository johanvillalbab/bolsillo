import { CategoryInfo, Expense, ExpenseCategory, PaymentMethod } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'comida',
    name: 'Comida',
    icon: 'restaurant',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
  },
  {
    id: 'antojo',
    name: 'Antojo',
    icon: 'coffee',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
  {
    id: 'casa',
    name: 'Casa',
    icon: 'shopping_cart',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    id: 'transporte',
    name: 'Transporte',
    icon: 'directions_subway',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
  },
  {
    id: 'servicios',
    name: 'Servicios',
    icon: 'receipt',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
  },
  {
    id: 'otro',
    name: 'Otro',
    icon: 'more_horiz',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  },
];

export const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: 'efectivo', label: 'Efectivo', icon: 'payments' },
  { id: 'transferencia', label: 'Transferencia', icon: 'sync_alt' },
  { id: 'tarjeta', label: 'Tarjeta', icon: 'credit_card' },
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    concept: 'Almuerzo menú',
    amount: 6500,
    category: 'comida',
    paymentMethod: 'transferencia',
    timestamp: '13:42',
    createdAt: Date.now() - 1000 * 60 * 90,
  },
  {
    id: 'exp-2',
    concept: 'Café de paso',
    amount: 2400,
    category: 'antojo',
    paymentMethod: 'efectivo',
    timestamp: '10:15',
    createdAt: Date.now() - 1000 * 60 * 240,
  },
  {
    id: 'exp-3',
    concept: 'Supermercado exprés',
    amount: 9500,
    category: 'casa',
    paymentMethod: 'tarjeta',
    timestamp: '08:30',
    createdAt: Date.now() - 1000 * 60 * 380,
  },
];

export const INITIAL_WEEKLY_BUDGET = 210000; // CLP
// Total spent before today = 49100
// Today's total = 18400 (6500 + 2400 + 9500)
// Total spent this week = 67500
// Available = 210000 - 67500 = 142500 (68% of budget remaining)

export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}
