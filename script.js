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
  var pedido = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  if (pedido.accion === "nuevo") {
    // Agrega una fila nueva al final con 0 puntos
    sheet.appendRow([pedido.nombre, 0, 0, 0]);
  } 
  else if (pedido.accion === "partido") {
    var values = sheet.getDataRange().getValues();
    pedido.datos.forEach(asistente => {
      for (var i = 1; i < values.length; i++) {
        if (values[i][0] === asistente.nombre) {
          sheet.getRange(i + 1, 2).setValue(values[i][1] + parseInt(asistente.puntos));
          sheet.getRange(i + 1, 3).setValue(values[i][2] + 1);
          sheet.getRange(i + 1, 4).setValue(values[i][3] + parseInt(asistente.goles));
        }
      }
    });
  }
  return ContentService.createTextOutput("Ok");
}
