# Gotchas y Soluciones Conocidas (gotchas/tecnicos.md)

> **Criterio:** Este archivo documenta trampas técnicas, errores comunes y soluciones inmediatas para evitar pérdida de tiempo en depuración.

---

### 1. Motion v12 vs `framer-motion` en React 19
- **Síntoma:** Error de módulos o advertencias de peer dependency rota al intentar `import { motion } from 'framer-motion'`.
- **Causa:** En React 19, Motion se distribuye como `motion` y sus componentes de React residen en `motion/react`.
- **Solución:** Importar siempre de `motion/react`:
  ```tsx
  import { motion, AnimatePresence } from 'motion/react';
  ```

---

### 2. Tailwind CSS v4 no utiliza `tailwind.config.js`
- **Síntoma:** Crear un `tailwind.config.js` no surte efecto o genera conflictos con el bundler Vite.
- **Causa:** El proyecto usa Tailwind v4 con `@tailwindcss/vite`. La configuración de temas se realiza en CSS nativo.
- **Solución:** Cualquier nuevo color, fuente o token debe definirse dentro de la directiva `@theme` en [`src/index.css`](../src/index.css):
  ```css
  @theme {
    --color-mi-color: #123456;
  }
  ```

---

### 3. Moneda Chilena (CLP) no tiene decimales
- **Síntoma:** Valores como `$12.500,50` o errores de redondeo en sumas/restas de presupuesto.
- **Causa:** El peso chileno es una unidad indivisible en transacciones reales.
- **Solución:** Usar siempre enteros (`parseInt(val, 10)` o `Math.round()`) y formatear con la función compartida `formatCLP(val)` de `src/data/mockData.ts`.

---

### 4. Volatilidad de Datos en Memoria
- **Síntoma:** Un gasto nuevo desaparece de la lista y el disponible vuelve a `$142.500` tras recargar el navegador (F5).
- **Causa:** El estado vive en el `useState` de `App.tsx` y se inicializa con `INITIAL_EXPENSES`.
- **Solución:** No asumir que los datos están guardados en disco/base de datos hasta implementar la capa de almacenamiento en el siguiente ciclo de desarrollo.

---

### 5. Padding inferior en Mobile Frame (`BottomNav`)
- **Síntoma:** El último elemento de la lista de gastos queda tapado detrás de la barra de navegación inferior.
- **Causa:** `BottomNav` está posicionado con `fixed bottom-0`.
- **Solución:** El contenedor `<main>` debe mantener siempre la clase utilitaria `pb-28` o `pb-safe`.
