/**
 * Variables globales
 */
const  HOJA_ACTIVA = SpreadsheetApp.getActiveSpreadsheet();

function LimpiarPresidencia() {
  
  let formulario = HOJA_ACTIVA.getSheetByName("FormularioPresidente");

  let celdasALimpiar = ["B4", "F4", "C15"]; // Celdas a limpiar
  for (var i = 0; i < celdasALimpiar.length; i++) {
    formulario.getRange(celdasALimpiar[i]).clearContent();
  }
  
}

function GuardarPresidencia() {
  var formulario = HOJA_ACTIVA.getSheetByName("FormularioPresidente");
  var datos = HOJA_ACTIVA.getSheetByName("historicoContratosFirmados");

  // Celdas de donde se obtendrán los datos a guardar
  var valores = [[
    id = "Presidencia" + formulario.getRange("B4").getValue().slice(0, 3) + formulario.getRange("F4").getValue(),
    formulario.getRange("B4").getValue(),
    formulario.getRange("F4").getValue(),
    formulario.getRange("C15").getValue(),
    fechaRegistro = Utilities.formatDate(new Date(), "GMT-5", "dd/MM/yyyy' 'HH:mm"),
    contador = 0
  ]];

  // Inyección de datos a hoja donde se almacenan datos
  datos.getRange(datos.getLastRow() + 1, 1, 1, 6).setValues(valores);

  CambiarNombreDocumentoFirmado();
  LimpiarPresidencia();
}

function subirArchivoFirmados() {
  var template = HtmlService.createTemplateFromFile("formUploadFile").evaluate();
  SpreadsheetApp.getUi().showModalDialog(template, "Subir archivo");
}

//Subir archivo Firmados
function uploadFilesToGoogleDriveSigned(data, name, type) {
  var datafile = Utilities.base64Decode(data)
  var blob2 = Utilities.newBlob(datafile, type, name);
  var folder = DriveApp.getFolderById("1pans0XcFw4XaKVwyqeG_-PQsXdGqVU0W");
  var newFile = folder.createFile(blob2);

  var rowData = [
    newFile.getName(),
    newFile.getId(),
    newFile.getUrl(),
    newFile.getSize(),
    newFile.getDateCreated()
  ];
  HOJA_ACTIVA.getSheetByName("historicoArchivosCargados").appendRow(rowData);
  HOJA_ACTIVA.getSheetByName("FormularioPresidente").getRange("C15").setValue(newFile.getUrl());

  return newFile.getUrl();
}

function CambiarNombreDocumentoFirmado() {
  let linkACambiar = HOJA_ACTIVA.getSheetByName("FormularioPresidente").getRange("C15").getValue();
  let idDocumento = linkACambiar.match(/([a-z0-9_-]{25,})[$/&?]/i);
  let idNombreDocumento = HOJA_ACTIVA.getSheetByName("FormularioPresidente").getRange("F4").getValue();

  let file = DriveApp.getFileById(idDocumento[1]);
  file.setName(idNombreDocumento + "_Firmado");

  GmailApp.sendEmail("carlos.villarreal@gralco.com.co","Se ha firmado un documento", "Se ha firmado el siguiente documento por parte del Sr Guillermo Daw "+ idNombreDocumento);
}

function EnviarCorreroPresidencia(){
  let hoja = SpreadsheetApp.openById('15PtJ3IymuT17Yh2UTuvheFOL_cnBDMIZ7NyiHMzf94M').getSheetByName("Datalist");
  for (let i = 1; i <= hoja.getLastRow(); i++){
    let estado = hoja.getRange(i, 9).getValue();
    let estadoMail = hoja.getRange(i, 10).getValue();

    if(estado === 'Documentos sin firmar' && estadoMail !== 'Enviado'){
      GmailApp.sendEmail('guillermo.daw@gralco.com.co', "Se ha aprobado un documento", "Se ha cambiado el estado a un documento por favor revise el siguiente enlace para aprobar el documento....Formulario: https://docs.google.com/spreadsheets/d/1NlTpkgBN76R3o8-znNkXbxCPumj3u__e4ttkAQtQEDY");
      hoja.getRange(i, 10).setValue('Enviado');
    }
    
  }
}