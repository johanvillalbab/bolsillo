# ADR: Decisiones de Arquitectura Inicial (2026-09-15)

### ADR-001: Moneda base CLP sin decimales
- **Fecha:** 2026-09-15
- **Estado:** Aprobado
- **Contexto:** La aplicación está pensada para el mercado chileno. El peso chileno (CLP) no tiene fracciones ni centavos en la vida cotidiana.
- **Decisión:** Modelar todos los montos como `number` enteros. Formatear siempre con punto de miles y sin decimales (`$142.500`).
- **Consecuencias:** Se evitan errores de precisión de punto flotante al sumar o restar gastos.

---

### ADR-002: Tailwind CSS v4 con `@theme` en CSS nativo
- **Fecha:** 2026-09-15
- **Estado:** Aprobado
- **Contexto:** Tailwind CSS v4 simplifica la configuración eliminando la necesidad de `tailwind.config.js` y usando `@theme` dentro de `@import "tailwindcss"`.
- **Decisión:** Definir tokens de color y fuentes directamente en `src/index.css` bajo el bloque `@theme`.
- **Consecuencias:** No se debe crear ningún archivo de configuración `.js` o `.ts` de Tailwind. Los tokens son variables CSS nativas accesibles tanto por clases utilitarias como por `var()`.

---

### ADR-003: Motion v12 vía `motion/react`
- **Fecha:** 2026-09-15
- **Estado:** Aprobado
- **Contexto:** El proyecto corre sobre React 19. El paquete histórico `framer-motion` fue reemplazado por la librería unificada `motion`.
- **Decisión:** Importar siempre `motion` y `AnimatePresence` desde `'motion/react'`.
- **Consecuencias:** Compatibilidad completa con React 19 y mejor tamaño de bundle.

---

### ADR-004: Modal con teclado numpad propio
- **Fecha:** 2026-09-15
- **Estado:** Aprobado
- **Contexto:** En navegadores móviles, abrir el teclado numérico del sistema operativo desplaza el viewport, tapa botones y genera saltos bruscos en la UI.
- **Decisión:** Implementar un teclado virtual en pantalla dentro de `ExpenseRegistrationModal` con dígitos 0-9, borrado, limpiar y chips de incremento rápido (+1k, +5k, +10k).
- **Consecuencias:** Registro de gasto predecible, fluido y operable con el pulgar en menos de 10-15 segundos.

---

### ADR-005: Estado local en memoria durante fase inicial
- **Fecha:** 2026-09-15
- **Estado:** Aprobado (Temporal)
- **Contexto:** La prioridad en la fase 1 fue validar la ergonomía y la velocidad de registro en la interfaz de usuario.
- **Decisión:** Manejar `expenses` mediante `useState` en `App.tsx` con datos precargados en `src/data/mockData.ts`.
- **Consecuencias:** Facilita el botón de demo "Toggle Empty State", pero los datos se pierden al recargar el navegador. La siguiente fase prioritaria es incorporar persistencia (`localStorage` o backend).
