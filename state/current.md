# Estado Actual del Proyecto (state/current.md)

> **Última actualización:** 2026-09-15

---

## 1. Hecho (Completado)
- [x] **Arquitectura base:** React 19 + TypeScript + Vite 6 + Tailwind CSS v4 configurados y estables.
- [x] **Hero Card Presupuestario:** `WeeklyAvailableCard` con cálculo dinámico del disponible, porcentaje restante, días restantes y badges de ritmo ("Vas bien", "Ajustar ritmo", "Cuidado").
- [x] **Registro Rápido en Línea:** `InlineQuickAdd` para guardar gastos al vuelo en 1 toque eligiendo método de pago.
- [x] **Modal Completo con Teclado Numpad:** `ExpenseRegistrationModal` con presets (+1k, +5k, +10k), categorías preconfiguradas, selector de método y cálculo predictivo del disponible.
- [x] **Lista de Gastos y Modo Vacío:** `ExpensesList` con soporte para borrar items y alternar entre mock data y empty state en el Header.
- [x] **Navegación Móvil:** `BottomNav` fijo con pestañas y safe-area insets.
- [x] **Memoria Persistente de Proyecto:** Sistema estructurado de contexto (`AGENTS.md`, `reglas.md`, `design.md`, `decisiones.md`, `state/`, `decisions/`, `gotchas/`, `logs/`, `skills/`).

---

## 2. Pendiente (Backlog Inmediato)
- [ ] **Persistencia Local / Offline:** Almacenar gastos y presupuesto en `localStorage` o IndexedDB para que los datos no se borren al refrescar la página.
- [ ] **Presupuesto Semanal Configurable:** Permitir al usuario modificar la meta semanal (actualmente fija en `$210.000 CLP`).
- [ ] **Integración Gemini AI (`@google/genai`):** Habilitar asistente para extraer montos y conceptos de tickets o texto copiado de transferencias.
- [ ] **Pestañas Restantes:** Implementar vistas para "Historial" (filtros por fecha/categoría) y "Presupuesto" (detalle por categorías).
- [ ] **Edición de Gastos:** Permitir editar un gasto ya registrado (actualmente solo se puede eliminar).

---

## 3. Blockers y Advertencias Activas
- **Volatilidad de Datos:** Los gastos agregados se mantienen únicamente en la memoria de React (`useState` en `App.tsx`); un F5 recarga la lista inicial de `mockData.ts`. No es un blocker de build, pero es la limitación funcional número 1.
