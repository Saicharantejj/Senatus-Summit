// ── Paste this into Apps Script (Extensions → Apps Script) ──
// Sheet ID is hardcoded so it works as a standalone project

const SHEET_ID = '1Bbt_QVvtoTVvc9HE9Wc4h1V-Q2XABCW2kK6JUriq7fE'

function doGet() {
  const ss    = SpreadsheetApp.openById(SHEET_ID)
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
    const ss    = SpreadsheetApp.openById(SHEET_ID)
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
