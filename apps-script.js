// ============================================================
//  Google Apps Script – RSVP Backend
//  הוראות הגדרה מפורטות בקובץ README.md
// ============================================================
//  שים כאן את ה-ID של ה-Google Sheet שלך:
const SHEET_ID = "1-fVanIQmku6p-gjIfmEBoownAmbalI5LHjTJtObjR7M";
const SHEET_NAME = "RSVPs";

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["שם", "הגעה", "מספר אורחים", "הערות", "זמן"]);
    sheet.setFrozenRows(1);
    // עיצוב כותרת
    const header = sheet.getRange(1, 1, 1, 5);
    header.setBackground("#1a2744").setFontColor("#ffffff").setFontWeight("bold");
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 100);
    sheet.setColumnWidth(3, 120);
    sheet.setColumnWidth(4, 200);
    sheet.setColumnWidth(5, 160);
  }
  return sheet;
}

// POST – קבלת אישור חדש
function doPost(e) {
  const cors = ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);

  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    sheet.appendRow([
      data.name || "",
      data.attending === "yes" ? "מגיע" : "לא מגיע",
      data.attending === "yes" ? (data.guests || 1) : 0,
      data.notes || "",
      data.timestamp || new Date().toLocaleString("he-IL"),
    ]);
  } catch (err) {
    // שגיאה לא עוצרת את הפלט (CORS)
  }

  return cors;
}

// GET – שליפת כל הרשומות לדשבורד
function doGet(e) {
  const output = { rows: [] };

  try {
    const sheet = getOrCreateSheet();
    const rows = sheet.getDataRange().getValues();
    // דלג על שורת הכותרת
    for (let i = 1; i < rows.length; i++) {
      output.rows.push({
        name:      rows[i][0],
        attending: rows[i][1] === "מגיע" ? "yes" : "no",
        guests:    rows[i][2],
        notes:     rows[i][3],
        timestamp: rows[i][4],
      });
    }
  } catch (err) {
    output.error = err.message;
  }

  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}
