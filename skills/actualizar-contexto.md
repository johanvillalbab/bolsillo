# Skill: Actualizar Contexto (skills/actualizar-contexto.md)

> **Propósito:** Protocolo para consolidar el trabajo realizado al finalizar una sesión y dejar la memoria del repositorio limpia, comprimida y lista para la siguiente sesión.

---

## 1. ¿Cuándo se debe ejecutar esta skill?
- **SÍ:** Al finalizar una tarea importante o al cerrar la sesión de trabajo antes de responder al usuario con el informe final.
- **NO:** En cada mensaje individual o respuesta intermedia dentro de la misma conversación (consumiría llamadas a herramientas innecesarias y saturaría el log).

---

## 2. ¿Qué archivos se deben actualizar?

1. **`state/current.md`:**
   - Mover las tareas concluidas de "Pendiente" a "Hecho".
   - Añadir nuevas tareas al backlog si surgieron durante el desarrollo.
   - Actualizar los blockers conocidos o eliminar los que fueron resueltos.

2. **`decisions/` y `decisiones.md` (Solo si hubo cambios arquitectónicos):**
   - Si se tomó una decisión sobre librerías, persistencia, esquemas o UX crítica, crear un archivo ADR en `decisions/YYYY-MM-DD-nombre-decision.md`.
   - Agregar una fila al índice en `decisiones.md`.

3. **`gotchas/` (Solo si se descubrió un problema no documentado):**
   - Si se encontró una incompatibilidad, error de build o comportamiento inesperado y su solución, anotarlo en `gotchas/tecnicos.md`.

4. **`logs/` (Bitácora de sesión):**
   - Crear un archivo `logs/YYYY-MM-DD-sesion-X.md` (o anexar si es del mismo día) resumiendo en 5-10 líneas:
     * Qué se logró.
     * Archivos modificados o creados.
     * Próximo paso prioritario recomendado para la siguiente sesión.

---

## 3. ¿Cómo dejar el contexto más corto que al empezar?
El principio rector es la **compresión**:
- **No duplicar:** No reescribas explicaciones largas en múltiples archivos; usa enlaces en Markdown (`[link](./ruta)`).
- **Evitar verbosidad:** En `state/current.md`, mantén viñetas de 1 línea por ítem.
- **Comprimir logs:** Las bitácoras en `logs/` deben ser listas concisas con enlaces a commits o archivos, nunca transcripciones de código.
- **Limpieza de temporales:** Borrar cualquier script temporal, archivo `.tmp` o prueba descartada antes de cerrar.
