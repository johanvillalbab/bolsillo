# Sistema de Diseño y UX · Bolsillo (design.md)

> **Propósito:** Definir los lineamientos visuales, componentes atómicos, paleta y pautas de interacción móvil para Bolsillo.

---

## 1. Principios Visuales y de UX
- **Velocidad de Registro (<15 segundos):** El usuario debe poder anotar un gasto en la calle, con una sola mano, sin detener su marcha.
- **Empatía Financiera (Cero Culpa, Cero Jerga):** No usamos términos como "balance deficitario", "amortización" o alertas rojas alarmistas si se gasta un poco más. Usamos "Vas bien", "Ajustar ritmo" o "Cuidemos la plata de hoy".
- **Mobile-First Estricto:** Diseñado para pantallas de smartphone (360px a 430px de ancho). Centrado en desktop con contenedor `max-w-md mx-auto`.

---

## 2. Tipografía
Configurada en `src/index.css` e importada desde Google Fonts:
- **Títulos y Cifras Monetarias:** `Outfit` (`font-outfit`, `font-bold` o `font-extrabold`). Otorga claridad geométrica y números legibles a distancia.
- **Textos de Lectura y Etiquetas:** `Inter` (`font-sans`, regular y medium).

---

## 3. Paleta de Colores (Tokens de Tema)
Definidos bajo `@theme` en Tailwind CSS v4 (`src/index.css`):

| Token | Hex / Clase | Rol de UI |
| :--- | :--- | :--- |
| `--color-primary` | `#006e2c` | Verde institucional, acentos de marca. |
| `--color-primary-container` | `#00ea67` | Verde vibrante para CTA principal y pulso de ritmo "Al día". |
| `--color-primary-fixed` | `#68ff8a` | Verde suave para badges de "Vas bien". |
| `--color-surface` | `#f8f9fb` | Fondo general de la app (gris frío muy claro). |
| `--color-surface-container` | `#eceef0` | Fondos de inputs inactivos o tracks de barras de progreso. |
| `--color-on-surface` | `#191c1e` | Color principal de texto y cifras. |
| `--color-text-muted` | `#6c727f` | Subtítulos, timestamps y etiquetas secundarias. |
| `--color-border-subtle` | `#e5e7eb` | Separadores y bordes de tarjetas suaves. |

### Estados del Presupuesto Semanal:
- **Ritmo Saludable (>= 40% restante):** Verde `#00ea67` / `#68ff8a`. Badge: "Vas bien".
- **Alerta Moderada (15% - 39% restante):** Ámbar `#f59e0b` / `bg-amber-100 text-amber-900`. Badge: "Ajustar ritmo".
- **Presupuesto Crítico (< 15% restante):** Rojo cálido `#ef4444` / `bg-rose-100 text-rose-900`. Badge: "Cuidado".

---

## 4. Componentes Clave de la Interfaz

1. **`WeeklyAvailableCard` (`src/components/WeeklyAvailableCard.tsx`):**
   - El corazón de la pantalla de inicio.
   - Presenta el disponible en CLP con tipografía de 38-40px, barra de progreso con animación fluida y etiqueta de días restantes.
2. **`QuickAddTrigger` (`src/components/QuickAddTrigger.tsx`):**
   - Botón CTA principal de gran superficie táctil con fondo `#00ea67` e icono llamativo.
3. **`InlineQuickAdd` (`src/components/InlineQuickAdd.tsx`):**
   - Selector directo de método (Transferencia, Efectivo, Tarjeta) con mini input para guardar en 1 clic.
4. **`ExpensesList` (`src/components/ExpensesList.tsx`):**
   - Listado cronológico de gastos de hoy con iconos por categoría, timestamps y swipe/botón de borrado.
5. **`ExpenseRegistrationModal` (`src/components/ExpenseRegistrationModal.tsx`):**
   - Modal bottom-sheet con teclado numérico numpad (0-9, backspace, limpiar), botones de incremento rápido (+1.000, +5.000, +10.000), categorías ilustradas y cálculo en tiempo real del nuevo disponible antes de confirmar.
6. **`BottomNav` (`src/components/BottomNav.tsx`):**
   - Barra de pestañas fija en la parte inferior (Inicio, Historial, Presupuesto, Perfil) con icono central flotante.
