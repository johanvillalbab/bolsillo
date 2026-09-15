# Registro de Decisiones de Arquitectura y Producto (decisiones.md)

> **Criterio:** Este documento resume las decisiones arquitectónicas clave (ADRs). Cada decisión contiene la fecha, el contexto que la motivó, la alternativa descartada y la justificación.

---

## Índice de Decisiones

| ID | Fecha | Título | Estado | Resumen |
| :--- | :--- | :--- | :--- | :--- |
| [ADR-001](./decisions/2026-09-15-arquitectura-inicial.md#adr-001-moneda-base-clp-sin-decimales) | 2026-09-15 | Moneda base en CLP sin decimales | Aprobado | El peso chileno no usa centavos; todo cálculo monetario es entero. |
| [ADR-002](./decisions/2026-09-15-arquitectura-inicial.md#adr-002-tailwind-css-v4-con-theme-en-css-nativo) | 2026-09-15 | Tailwind CSS v4 con `@theme` nativo | Aprobado | Sin `tailwind.config.js`; configuración centralizada en `src/index.css`. |
| [ADR-003](./decisions/2026-09-15-arquitectura-inicial.md#adr-003-motion-v12-via-motionreact) | 2026-09-15 | Motion v12 mediante `motion/react` | Aprobado | Soporte nativo para React 19 y nuevo paquete oficial de Motion. |
| [ADR-004](./decisions/2026-09-15-arquitectura-inicial.md#adr-004-modal-con-teclado-numpad-propio) | 2026-09-15 | Numpad táctil integrado en modal | Aprobado | Evita el teclado nativo del celular que salta y rompe el layout visual. |
| [ADR-005](./decisions/2026-09-15-arquitectura-inicial.md#adr-005-estado-local-en-memoria-durante-fase-inicial) | 2026-09-15 | Estado local inicial en memoria | Aprobado | Para prototipado ágil; se migrará a almacenamiento persistente. |

---

Para consultar el detalle completo de cada decisión, dirígete a la carpeta [`decisions/`](./decisions/).
