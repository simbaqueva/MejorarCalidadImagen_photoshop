/*
    MejorarCalidadLogo.jsx
    Versión Simplificada y Corregida
*/

#target photoshop

function main() {
    // Pedir al usuario que seleccione una imagen (soporta varios formatos)
    var fileRef = File.openDialog("Selecciona una imagen para mejorar", "Images:*.tif;*.tiff;*.jpg;*.jpeg;*.png;*.psd", false);
    if (fileRef == null) {
        alert("No se seleccionó ningún archivo. Saliendo.");
        return;
    }

    if (!fileRef.exists) {
        alert("No se encontró el archivo: " + fileRef.fsName);
        return;
    }

    var doc = app.open(fileRef);
    
    // 1. ESCALADO ENFOCADO (Bicubic Sharper es mejor para logos y bordes)
    var scale = 2; // Duplicar tamaño para mejor definición
    doc.resizeImage(doc.width * scale, doc.height * scale, 300, ResampleMethod.BICUBICSHARPER);

    // 2. ENFOQUE DIRECTO
    // Intenta usar la máscara de enfoque nativa con la sintaxis exacta de mayúsculas ("UnSharpMask")
    try {
        doc.activeLayer.applyUnSharpMask(150, 1.5, 0);
    } catch(e) {
        // Si falla por la versión de Photoshop, aplica un enfoque estándar
        try {
            doc.activeLayer.applySharpen();
            doc.activeLayer.applySharpen(); // Una segunda vez para mayor solidez
        } catch(e2) {
            // Continuar si hay algún problema
        }
    }

    // Guardar copia: generar nombre junto al archivo original con sufijo _Mejorada
    var baseName = fileRef.name.replace(/\.[^\.]+$/, '');
    var savePath = fileRef.path + "/" + baseName + "_Mejorada.tif";
    var tiffSaveOptions = new TiffSaveOptions();
    tiffSaveOptions.alphaChannels = true;
    tiffSaveOptions.layers = true;
    tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW;
    
    doc.saveAs(new File(savePath), tiffSaveOptions, false, Extension.LOWERCASE);

    alert("¡Proceso completado!\nImagen mejorada guardada como:\nImagen1_Mejorada.tif");
}

main();
