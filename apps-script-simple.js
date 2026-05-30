// ── Paste this into Apps Script (Extensions → Apps Script) ──
// Sheet IDs are hardcoded for configuration

const PUBLIC_SHEET_ID  = '16HP1FMzmPfQcIU52s8fkBxhD8GQj2j9EYE-7D9j8vZw' // The public spreadsheet visible to everyone
const PRIVATE_SHEET_ID = 'YOUR_PRIVATE_SPREADSHEET_ID_HERE' // The private spreadsheet for Applications

function getPublicSS() {
  return SpreadsheetApp.openById(PUBLIC_SHEET_ID)
}

function getPrivateSS() {
  if (!PRIVATE_SHEET_ID || PRIVATE_SHEET_ID === 'YOUR_PRIVATE_SPREADSHEET_ID_HERE' || PRIVATE_SHEET_ID === PUBLIC_SHEET_ID) {
    console.warn("WARNING: PRIVATE_SHEET_ID is not configured. Sensitive data is being stored in the public spreadsheet!");
    return getPublicSS();
  }
  return SpreadsheetApp.openById(PRIVATE_SHEET_ID)
}

function doGet() {
  const ss    = getPrivateSS()
  let   sheet = ss.getSheetByName('Applications')
  if (!sheet) {
    sheet = ss.insertSheet('Applications')
    sheet.appendRow(['Timestamp','Full Name','Email','Phone','Institution','Committee','Portfolio','MUN Experience','Experience Details','Any Reference'])
  }
  const rows   = sheet.getDataRange().getValues()
  const taken  = rows.slice(1)
    .filter(r => r[5] && r[6])
    .map(r => ({ committee: String(r[5]).trim(), country: String(r[6]).trim() }))
  return ContentService
    .createTextOutput(JSON.stringify({ taken }))
    .setMimeType(ContentService.MimeType.JSON)
}

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents)
    const ss    = getPrivateSS()
    let   sheet = ss.getSheetByName('Applications')
    if (!sheet) {
      sheet = ss.insertSheet('Applications')
      sheet.appendRow(['Timestamp','Full Name','Email','Phone','Institution','Committee','Portfolio','MUN Experience','Experience Details','Any Reference'])
    }
    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data['Full Name'], data['Email'], data['Phone'], data['Institution'],
      data['Committee'], data['Portfolio'],
      data['MUN Experience'], data['Experience Details'] || '—',
      data['Any Reference'] || '—',
    ])
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
