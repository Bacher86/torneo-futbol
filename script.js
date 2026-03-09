function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var jugadores = [];
  for (var i = 1; i < data.length; i++) {
    jugadores.push({ nombre: data[i][0], puntos: data[i][1], pj: data[i][2], goles: data[i][3] });
  }
  return ContentService.createTextOutput(JSON.stringify(jugadores)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var listaAsistencia = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var values = sheet.getDataRange().getValues();
  
  listaAsistencia.forEach(asistente => {
    for (var i = 1; i < values.length; i++) {
      if (values[i][0] === asistente.nombre) {
        sheet.getRange(i + 1, 2).setValue(values[i][1] + parseInt(asistente.puntos)); // Suma puntos
        sheet.getRange(i + 1, 3).setValue(values[i][2] + 1); // Suma 1 partido jugado
        sheet.getRange(i + 1, 4).setValue(values[i][3] + parseInt(asistente.goles)); // Suma goles
      }
    }
  });
  return ContentService.createTextOutput("Datos guardados").setMimeType(ContentService.MimeType.TEXT);
}
