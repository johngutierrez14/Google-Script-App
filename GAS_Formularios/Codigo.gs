function EvaluacionComercial() {
  let template = HtmlService.createTemplateFromFile("FormularioComercial").evaluate().setTitle("Evaluación de contrato Comercial");
  SpreadsheetApp.getUi().showSidebar(template);
}

function appenComercial(area, contrato, final, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, observacion){
  let hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("registro");
  hoja.appendRow([new Date(), area, contrato, final, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5,observacion]);
}


function EvaluacionLogistica() {

   let template = HtmlService.createTemplateFromFile("FormularioLogistica").evaluate().setTitle("Evaluación de contrato Logistica");
  SpreadsheetApp.getUi().showSidebar(template);
}

function appenLogistica(area, contrato, final, pregunta1, pregunta2, pregunta3, observacion){
  let hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("registro");
  hoja.appendRow([new Date(), area, contrato, final, pregunta1, pregunta2, pregunta3,observacion]);
}

function EvaluacionFinanciera() {

   let template = HtmlService.createTemplateFromFile("FormularioFinanciera").evaluate().setTitle("Evaluación de contrato Financiera");
  SpreadsheetApp.getUi().showSidebar(template);
}

function appenFinanciera(area, contrato, final, pregunta1, pregunta2, pregunta3, observacion){
  let hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("registro");
  hoja.appendRow([new Date(), area, contrato, final, pregunta1, pregunta2, pregunta3,observacion]);
}

function EvaluacionControlCalidad() {

   let template = HtmlService.createTemplateFromFile("FormularioContrlCalidad").evaluate().setTitle("Evaluación de contrato Control de calidad");
  SpreadsheetApp.getUi().showSidebar(template);
}

function appenControlCalidad(area, contrato, final, pregunta1, pregunta2, pregunta3, pregunta4, observacion){
  let hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("registro");
  hoja.appendRow([new Date(), area, contrato, final, pregunta1, pregunta2, pregunta3, pregunta4,observacion]);
}

function EvaluacionPlaneacion() {

   let template = HtmlService.createTemplateFromFile("FormularioPlaneacion").evaluate().setTitle("Evaluación de contrato Planeación");
  SpreadsheetApp.getUi().showSidebar(template);
}

function appenPlaneacion(area, contrato, final, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, observacion){
  let hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("registro");
  hoja.appendRow([new Date(), area, contrato, final, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5,observacion]);
}

function EnviarCorreroPresidencia(){
  let hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Datalist");
  for (let i = 1; i <= hoja.getLastRow(); i++){
    let estado = hoja.getRange(i, 9).getValue();
    let estadoMail = hoja.getRange(i, 10).getValue();

    if(estado === 'Documentos sin firmar' && estadoMail !== 'Enviado'){
      GmailApp.sendEmail('Email', "Se ha evaluado un documento", "Se ha cambiado el estado a un documento por favor revise el siguiente enlace para aprobar el documento....Formulario: Link");
      hoja.getRange(i, 10).setValue('Enviado');
    }
    
  }
}



