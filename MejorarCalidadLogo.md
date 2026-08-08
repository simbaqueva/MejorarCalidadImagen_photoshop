## Resumen breve

- **Tipo:** Script ExtendScript para Adobe Photoshop (`#target photoshop`).
- **Archivo:** `MejorarCalidadLogo.jsx`
- **Función principal:** `main()` — pide una imagen, la mejora (escalado + enfoque) y guarda una copia TIFF mejorada.

## Pasos que realiza (conciso)

- **Selector:** Muestra diálogo para elegir imagen (soporta TIFF, JPG, PNG, PSD).
- **Apertura:** Abre el archivo seleccionado en Photoshop.
- **Escalado:** Duplica tamaño (factor `2`) y ajusta a `300 dpi` usando `ResampleMethod.BICUBICSHARPER`.
- **Enfoque:** Intenta aplicar `UnSharpMask(150, 1.5, 0)`; si falla, intenta `applySharpen()` dos veces como respaldo.
- **Guardado:** Crea un fichero junto al original con sufijo `_Mejorada.tif`, guarda como TIFF con canales alfa, capas y compresión LZW.
- **Notificación:** Muestra alerta indicando que el proceso terminó.

¿Quieres que añada opciones (p. ej. factor de escala configurable, sobreescribir el original o elegir formato de salida)?
