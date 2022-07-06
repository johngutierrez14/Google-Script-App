/**
 * Variables globales
 */
const  HOJA_ACTIVA = SpreadsheetApp.getActiveSpreadsheet();


// Limpiar celdas
function Limpiar() {
  
  let formulario = HOJA_ACTIVA.getSheetByName("Formulario");

  let celdasALimpiar = ["C3", "B6", "F6", "B9", "F9", "B12", "G12", "B15", "D15", "F15", "H15", "C17", "K2", "K3", "K4"]; // Celdas a limpiar
  for (var i = 0; i < celdasALimpiar.length; i++) {
    formulario.getRange(celdasALimpiar[i]).clearContent();
  }
  formulario.getRange("B9").setValue("AAAA-mm-dd");
  formulario.getRange("F9").setValue("AAAA-mm-dd");
}

function LimpiarPresidencia() {
  
  let formulario = HOJA_ACTIVA.getSheetByName("FormularioPresidente");

  let celdasALimpiar = ["B4", "F4", "D15"]; // Celdas a limpiar
  for (var i = 0; i < celdasALimpiar.length; i++) {
    formulario.getRange(celdasALimpiar[i]).clearContent();
  }
  
}

// Guardar celdas
function Guardar() {
  var formulario = HOJA_ACTIVA.getSheetByName("Formulario");
  var datos = HOJA_ACTIVA.getSheetByName("Datos");

  // Celdas de donde se obtendrán los datos a guardar
  var valores = [[
    id = formulario.getRange("B6").getValue().slice(0, 3) + formulario.getRange("F6").getValue(),
    formulario.getRange("B6").getValue(),
    formulario.getRange("F6").getValue(),
    formulario.getRange("B9").getValue(),
    formulario.getRange("F9").getValue(),
    formulario.getRange("B12").getValue(),
    formulario.getRange("G12").getValue(),
    formulario.getRange("B15").getValue(),
    formulario.getRange("D15").getValue(),
    formulario.getRange("F15").getValue(),
    formulario.getRange("H15").getValue(),
    formulario.getRange("C17").getValue(),
    fechaRegistro = Utilities.formatDate(new Date(), "GMT-5", "dd/MM/yyyy' 'HH:mm"),
    fechaActualizacion = Utilities.formatDate(new Date(), "GMT-5", "dd/MM/yyyy' 'HH:mm")
  ]];

  // Inyección de datos a hoja donde se almacenan datos
  datos.getRange(datos.getLastRow() + 1, 1, 1, 14).setValues(valores);

  HOJA_ACTIVA.getSheetByName("Plantilla").getRange("D2").setValue(id);
  HOJA_ACTIVA.getSheetByName("Plantilla").getRange("D3").setValue(formulario.getRange("C17").getValue());

  CambiarNombreArchivo();
  MailMerge()
  Limpiar();
}

// Buscar
var NUM_COLUMNA_BUSQUEDA = 0;
function Buscar() {

  var formulario = HOJA_ACTIVA.getSheetByName("Formulario");

  var valor = formulario.getRange("C3").getValue();
  var valores = HOJA_ACTIVA.getSheetByName("Datos").getDataRange().getValues();
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[NUM_COLUMNA_BUSQUEDA] == valor) {

      formulario.getRange("K2").setValue(fila[0]);
      formulario.getRange("B6").setValue(fila[1]);
      formulario.getRange("F6").setValue(fila[2]);
      formulario.getRange("B9").setValue(fila[3]);
      formulario.getRange("F9").setValue(fila[4]);
      formulario.getRange("B12").setValue(fila[5]);
      formulario.getRange("G12").setValue(fila[6]);
      formulario.getRange("B15").setValue(fila[7]);
      formulario.getRange("D15").setValue(fila[8]);
      formulario.getRange("F15").setValue(fila[9]);
      formulario.getRange("H15").setValue(fila[10]);
      formulario.getRange("C17").setValue(fila[11]);
      formulario.getRange("K3").setValue(fila[12]);
      formulario.getRange("K4").setValue(fila[13]);
    }
  }
}

// Actualizar
function Actualizar() {
  var formulario = HOJA_ACTIVA.getSheetByName("Formulario");
  var datos = HOJA_ACTIVA.getSheetByName("Datos");

  var valor = formulario.getRange("C3").getValue();
  var valores = HOJA_ACTIVA.getSheetByName("Datos").getDataRange().getValues();
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[NUM_COLUMNA_BUSQUEDA] == valor) {
      var INT_R = i + 1

      var valores1 = [[
        id = formulario.getRange("B6").getValue().slice(0, 3) + formulario.getRange("F6").getValue(),
        formulario.getRange("B6").getValue(),
        formulario.getRange("F6").getValue(),
        formulario.getRange("B9").getValue(),
        formulario.getRange("F9").getValue(),
        formulario.getRange("B12").getValue(),
        formulario.getRange("G12").getValue(),
        formulario.getRange("B15").getValue(),
        formulario.getRange("D15").getValue(),
        formulario.getRange("F15").getValue(),
        formulario.getRange("H15").getValue(),
        formulario.getRange("C17").getValue(),
        formulario.getRange("K3").getValue(),
        fechaActualizacion = Utilities.formatDate(new Date(), "GMT-5", "dd/MM/yyyy' 'HH:mm")
      ]];

      datos.getRange(INT_R, 1, 1, 14).setValues(valores1);
      SpreadsheetApp.getUi().alert('Datos actualizados');

      Limpiar(); // Ejecución de función para limpieza de celdas
    }
  }
}

// Eliminar
function Eliminar() {
  var formulario = HOJA_ACTIVA.getSheetByName("Formulario");
  var datos = HOJA_ACTIVA.getSheetByName("Datos");

  var interface = SpreadsheetApp.getUi();
  var respuesta = interface.alert('¿Está seguro de borrar?', interface.ButtonSet.YES_NO);

  // Proceso si el usuario responde
  if (respuesta == interface.Button.YES) {

    var valor = formulario.getRange("C3").getValue();
    var valores = HOJA_ACTIVA.getSheetByName("Datos").getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
    for (var i = 0; i < valores.length; i++) {
      var fila = valores[i];
      if (fila[NUM_COLUMNA_BUSQUEDA] == valor) {
        var INT_R = i + 1

        datos.deleteRow(INT_R);
        Limpiar(); // Ejecución de función para limpieza de celdas
      }
    }
  }
}

//Subir archivo en pendientes por firmar

function subirArchivoSinFirmar() {
  var template = HtmlService.createTemplateFromFile("sinFirmar").evaluate();
  SpreadsheetApp.getUi().showModalDialog(template, "Subir archivo");
}

function uploadFilesToGoogleDriveUnsigned(data, name, type) {
  var datafile = Utilities.base64Decode(data)
  var blob2 = Utilities.newBlob(datafile, type, name);
  var folder = DriveApp.getFolderById("1xFA-cQu2eCxoi2gjYJpCZYZsPUwlPMba");
  var newFile = folder.createFile(blob2);

  var rowData = [
    newFile.getName(),
    newFile.getId(),
    newFile.getUrl(),
    newFile.getSize(),
    newFile.getDateCreated()
  ];
  SpreadsheetApp.getActive().getSheetByName("historicoArchivosCargados").appendRow(rowData);
  SpreadsheetApp.getActive().getSheetByName("Formulario").getRange("C17").setValue(newFile.getUrl());

  return newFile.getUrl();
  
}

/*************************************************************************************/

/**
 * Cambiar nombre
 **/

function CambiarNombreArchivo() {
  let linkACambiar = HOJA_ACTIVA.getSheetByName("Formulario").getRange("C17").getValue();
  let idNombreDocumento = HOJA_ACTIVA.getSheetByName("Formulario").getRange("B6").getValue().slice(0, 3) + HOJA_ACTIVA.getSheetByName("Formulario").getRange("F6").getValue()
  let idDocumento = linkACambiar.match(/([a-z0-9_-]{25,})[$/&?]/i);

  let file = DriveApp.getFileById(idDocumento[1]);
  file.setName(idNombreDocumento);

}

/**
 * Enviar correos masivos
 */

function MailMerge() {
  let libro = HOJA_ACTIVA.getSheetByName("correos");
  let contactos = libro.getRange(2, 1, 7, 2).getValues();
  //Logger.log(contactos);
  let asunto = "Nuevo contrato registrado " + HOJA_ACTIVA.getSheetByName("Plantilla").getRange('D2').getValue();

  contactos.forEach((contacto)=>{
    let mensaje = crearMensaje(contacto)
    GmailApp.sendEmail(contacto[0],asunto, mensaje);
  });
}

function crearMensaje(datos) {
  let plantilla = HOJA_ACTIVA.getSheetByName("Plantilla").getRange('A1').getValue();
  let mensaje = plantilla.replace("{{nombre}}",datos[1]);

  return mensaje;
}