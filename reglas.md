# Reglas Inviolables del Proyecto (reglas.md)

> **Criterio estricto:** Este archivo contiene ÚNICAMENTE reglas técnicas y funcionales que pueden ser verificadas y detectadas mediante análisis estático, linter, pruebas o inspección de código. Ninguna regla abstracta ("escribe código limpio" o "haz buen diseño").

---

### 1. Dependencias e Imports
- `PROHIBIDO` importar desde `'framer-motion'`. El paquete instalado es Motion v12 y el import obligatorio es `'motion/react'`.
- `PROHIBIDO` crear archivos `tailwind.config.js` o `tailwind.config.ts`. El proyecto utiliza Tailwind CSS v4 nativo con `@theme` en `src/index.css`.
- `PROHIBIDO` agregar dependencias npm que no tengan compatibilidad confirmada con React 19.

### 2. TypeScript y Tipado
- `PROHIBIDO` el uso del tipo `any`. Cualquier tipo desconocido debe resolverse mediante `unknown`, genéricos o interfaces explícitas en `src/types.ts`.
- `PROHIBIDO` usar strings libres ("hardcoded") para categorías de gasto o métodos de pago en componentes. Deben ser estrictamente del tipo `ExpenseCategory` o `PaymentMethod` definidos en `src/types.ts`.
- `PROHIBIDO` commitear o dar por terminada una tarea con errores de compilación (`tsc --noEmit`).

### 3. Moneda y Cálculos Financieros (CLP)
- `PROHIBIDO` usar decimales o divisiones fraccionarias en montos de dinero. El peso chileno (CLP) es una moneda de enteros. Los montos deben ser siempre enteros (`Math.round()` o `parseInt(val, 10)`).
- `PROHIBIDO` formatear moneda mediante concatenaciones manuales (`"$" + valor`). Es obligatorio utilizar la función `formatCLP()` de `src/data/mockData.ts` o `Intl.NumberFormat('es-CL')`.
- `PROHIBIDO` permitir que el disponible semanal sea un valor `NaN` o `null`. Si no hay datos, el valor por defecto es `0`.

### 4. Layout y Responsive Mobile-First
- `PROHIBIDO` romper el marco principal móvil. El contenido principal debe residir dentro de un contenedor `w-full max-w-md mx-auto`.
- `PROHIBIDO` colocar botones de acción al pie de página sin dejar espacio libre para el `BottomNav` fijo (`pb-28` o clase `pb-safe`).
- `PROHIBIDO` habilitar scroll horizontal en la pantalla (`overflow-x-hidden` o diseño estrictamente ajustado a viewport móvil).

### 5. Flujo de Usuario y UX de Registro
- `PROHIBIDO` agregar pasos intermedios que obliguen a más de 2 toques para registrar un gasto rápido desde la pantalla principal.
- `PROHIBIDO` bloquear el teclado numérico del modal con validaciones complejas antes de presionar "Guardar".

### 6. Seguridad y Secretos
- `PROHIBIDO` almacenar claves de API en el código fuente (`App.tsx`, componentes, etc.). Las claves deben leerse desde variables de entorno (`import.meta.env.VITE_*` o servidor en `.env.local`).
- `PROHIBIDO` incluir el archivo `.env.local` en el control de versiones.
