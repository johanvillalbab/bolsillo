<div align="center">

# 👛 Bolsillo

**Control ágil de finanzas personales del día a día en pesos chilenos (CLP).**

*Registra gastos en menos de 15 segundos y cuida tu disponible semanal sin fricciones ni jerga bancaria.*

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-v12-f08?logo=framer&logoColor=white)](https://motion.dev/)

</div>

---

## 🎯 ¿Qué es Bolsillo?

La mayoría de las apps de finanzas fallan por exceso de fricción: piden categorizar hasta el último detalle, abren teclados del celular que tapan botones o muestran balances llenos de tecnicismos bancarios ("amortización", "flujo de caja neto").

**Bolsillo** está diseñada bajo una premisa simple:
> **Poder anotar un gasto en la calle, con una sola mano, en menos de 15 segundos, sabiendo exactamente cuánta plata te queda para terminar la semana.**

---

## ✨ Características Principales

- **⚡ Registro Ultra Rápido (<15 segundos):** Modal bottom-sheet con teclado numérico propio (evita el salto molesto del teclado nativo) y botones de incremento rápido (+1.000, +5.000, +10.000).
- **📊 Hero Card de Disponible Semanal:** Visualiza de un vistazo tu saldo restante en CLP, el porcentaje disponible y los días que quedan, acompañado de un semáforo empático (*"Vas bien"*, *"Ajustar ritmo"*, *"Cuidado"*).
- **💳 Métodos de Pago Chilenos:** Selector directo para Transferencia, Efectivo y Tarjeta.
- **🏷️ Categorías Cotidianas:** Comida, Antojo, Casa, Transporte, Servicios y Otro.
- **📱 Experiencia Mobile-First:** Diseñada para pantallas de 360px a 430px con safe-areas para navegación inferior (`BottomNav`) y centrada elegantemente en pantallas de escritorio.
- **🇨🇱 Sin Decimales:** Formato monetario nativo para Chile (`$XX.XXX CLP`), eliminando decimales y centavos innecesarios.
- **✨ Micro-interacciones Fluidas:** Animaciones reactivas con Motion v12 y feedback inmediato mediante Toasts.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript | Interfaz reactiva y tipado estricto. |
| **Herramienta de Build** | Vite 6 | Arranque instantáneo y empaquetado optimizado. |
| **Estilos** | Tailwind CSS v4 (`@theme`) | Estilos utilitarios modernos sin archivos de configuración externos. |
| **Animaciones** | Motion v12 (`motion/react`) | Transiciones suaves de modales, cards y listas. |
| **Iconografía y Fuentes** | Outfit + Inter · Material Symbols | Tipografía geométrica legible y símbolos claros. |
| **IA & Backend (Próximo)** | `@google/genai` | Soporte para escaneo inteligente de boletas y categorización asistida. |

---

## 🚀 Inicio Rápido (Desarrollo Local)

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- Gestor de paquetes `npm` (incluido con Node.js).

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd bolsillo
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (Opcional):**
   Si deseas utilizar las capacidades de IA con Gemini, crea un archivo `.env.local` basado en el ejemplo:
   ```bash
   cp .env.example .env.local
   ```
   Añade tu clave de API:
   ```env
   GEMINI_API_KEY="tu_clave_de_gemini"
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:3000`.

---

## 📜 Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo en el puerto `3000`. |
| `npm run build` | Compila el proyecto para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza la build de producción de forma local. |
| `npm run lint` | Ejecuta la verificación estática de tipos TypeScript (`tsc --noEmit`). |
| `npm run clean` | Limpia los artefactos de compilación previos. |

---

## 📂 Estructura del Proyecto

```text
bolsillo/
├── src/
│   ├── components/                 # Componentes visuales modulares
│   │   ├── BottomNav.tsx           # Barra de navegación móvil fija
│   │   ├── ExpenseRegistrationModal.tsx # Modal con teclado numérico virtual
│   │   ├── ExpensesList.tsx        # Lista cronológica de gastos
│   │   ├── Header.tsx              # Encabezado con toggle de mock/empty state
│   │   ├── InlineQuickAdd.tsx      # Registro rápido en 1 toque
│   │   ├── MotivationalBanner.tsx  # Mensajes de educación y empatía
│   │   ├── QuickAddTrigger.tsx     # Botón protagónico para registrar
│   │   └── WeeklyAvailableCard.tsx # Tarjeta principal con disponible semanal
│   ├── data/
│   │   └── mockData.ts             # Datos iniciales y formateador formatCLP()
│   ├── types.ts                    # Interfaces de datos (Expense, Category, etc.)
│   ├── App.tsx                     # Orquestador del estado y pantalla de inicio
│   ├── index.css                   # Tokens @theme de Tailwind CSS v4
│   └── main.tsx                    # Punto de entrada de React
├── decisions/                      # Registros de arquitectura (ADRs)
├── gotchas/                        # Problemas técnicos conocidos y soluciones
├── state/                          # Estado actual de desarrollo y backlog
├── AGENTS.md                       # Control central y protocolo para agentes IA
├── design.md                       # Sistema de diseño, paleta y pautas UX
├── reglas.md                       # Reglas técnicas y de producto inviolables
└── README.md                       # Documentación principal del proyecto
```

---

## 🤖 Memoria Persistente y Desarrollo con Agentes IA

Este repositorio implementa un sistema de memoria persistente basado en archivos para mantener la coherencia y ahorrar consumo de tokens entre sesiones de desarrollo:

- [`AGENTS.md`](./AGENTS.md): Orquestador central, orden de lectura obligatorio y Definition of Done.
- [`reglas.md`](./reglas.md): Reglas técnicas estrictas y detectables (prohibición de `framer-motion`, obligatoriedad de CLP sin decimales, contenedor `max-w-md`).
- [`design.md`](./design.md): Sistema de diseño, tokens de color y tipografía.
- [`state/current.md`](./state/current.md): Registro vivo de tareas completadas, pendientes y blockers.
- [`gotchas/tecnicos.md`](./gotchas/tecnicos.md): Soluciones probadas para trampas de configuración comunes.

---

## 🗺️ Estado del Proyecto & Próximos Pasos

El estado actual del backlog y los siguientes hitos se encuentran documentados en [`state/current.md`](./state/current.md).

- [x] Flujo de registro ágil en < 15 segundos y teclado virtual.
- [x] Visualización de ritmo presupuestario semanal.
- [ ] **Próximo hito:** Persistencia de datos en `localStorage` o base de datos local.
- [ ] Integración de extracción de boletas mediante IA con Gemini.
