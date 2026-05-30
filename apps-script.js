// ─────────────────────────────────────────────────────────────
//  Senatus Summit — Google Apps Script (Email Only & Public Matrix)
//
//  SETUP (one time):
//  1. Open Extensions → Apps Script in your Google Sheet
//  2. Paste this entire file, click Save
//  3. Select function "setup" → click Run (to initialize committee sheets if needed)
//  4. Deploy → New deployment → Web App
//     Execute as: Me | Who has access: Anyone
//  5. Copy the Web App URL → paste into .env.local as APPS_SCRIPT_URL
// ─────────────────────────────────────────────────────────────

const PUBLIC_SHEET_ID  = '16HP1FMzmPfQcIU52s8fkBxhD8GQj2j9EYE-7D9j8vZw' // The public spreadsheet visible to everyone
const STATUS_ALLOTED   = 'Alloted'
const DRIVE_FOLDER     = 'Senatus Summit 2026 — Payment Screenshots'
const ADMIN_EMAIL      = 'saicharantejprofessional@gmail.com'

function getPublicSS() {
  return SpreadsheetApp.openById(PUBLIC_SHEET_ID)
}

function getCommitteeSheet(name)  { return getPublicSS().getSheetByName(name) }

// ─── DIAGNOSTIC TEST FUNCTION ─────────────────────────────────
function testAll() {
  // 1. Test Public Spreadsheet access
  const publicName = getPublicSS().getName();
  Logger.log("✅ Public Spreadsheet Access OK. Name: " + publicName);
  
  // 2. Test Drive access
  const folder = getOrCreateFolder(DRIVE_FOLDER);
  Logger.log("✅ Drive Access OK. Folder ID: " + folder.getId());
  
  // 3. Test Email access
  MailApp.sendEmail(ADMIN_EMAIL, 'Senatus Service Test', 'All services authorized successfully!');
  Logger.log("✅ Email Access OK. Sent test email to: " + ADMIN_EMAIL);
}

// ─── ONE-TIME SETUP ──────────────────────────────────────────
// Creates all public committee sheets with headers + formatting.
function setup() {
  const ss = getPublicSS()
  ss.setName('Senatus Summit 2026 — Public Matrix')

  // ── Committee sheets (in public spreadsheet) ──
  const committees = {
    UNGA:  { headers: ['Portfolio','Allotment Status'], data: UNGA_PORTFOLIOS.map(p => [p, '']) },
    UNCSW: { headers: ['Portfolio','Allotment Status'], data: UNCSW_PORTFOLIOS.map(p => [p, '']) },
    UNHRC: { headers: ['Portfolio','Allotment Status'], data: UNHRC_PORTFOLIOS.map(p => [p, '']) },
    AIPPM: { headers: ['Name','Party','Allotment Status'], data: AIPPM_DATA },
    FIA:   { headers: ['Position','Name','Allotment Status'], data: FIA_DATA },
    IP:    { headers: ['Portfolio','Allotment Status'], data: IP_PORTFOLIOS.map(p => [p, '']) },
  }

  const colors = {
    UNGA:  { bg: '#1a2a3a', fg: '#a8c5d5' },
    UNCSW: { bg: '#2a1a3a', fg: '#c5a8d5' },
    UNHRC: { bg: '#3a1a1a', fg: '#d5a8a8' },
    AIPPM: { bg: '#1a2a1a', fg: '#a8d5a8' },
    FIA:   { bg: '#3a2a1a', fg: '#d5c5a8' },
    IP:    { bg: '#1a3a3a', fg: '#a8d5d5' },
  }

  Object.entries(committees).forEach(([name, config]) => {
    let sheet = ss.getSheetByName(name)
    if (!sheet) sheet = ss.insertSheet(name)
    sheet.clearContents()
    sheet.appendRow(config.headers)
    styleHeaderRow(sheet, config.headers.length, colors[name].bg, colors[name].fg)
    config.data.forEach(row => sheet.appendRow(row))

    // Conditional formatting: green for Alloted, red for Vacant
    const statusCol  = config.headers.length  // last column
    const lastRow    = config.data.length + 1
    const statusRange = sheet.getRange(2, statusCol, lastRow, 1)

    const allotedRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Alloted')
      .setBackground('#1e4d2b').setFontColor('#6fcf97')
      .setRanges([statusRange]).build()

    const vacantRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Vacant')
      .setBackground('#4d1e1e').setFontColor('#eb5757')
      .setRanges([statusRange]).build()

    sheet.setConditionalFormatRules([allotedRule, vacantRule])
    sheet.autoResizeColumns(1, config.headers.length)
  })

  // Delete default "Sheet1" if it still exists
  const defaultSheet = ss.getSheetByName('Sheet1')
  if (defaultSheet) ss.deleteSheet(defaultSheet)

  // Attempt to delete any leftover Applications or Payments tabs from public sheet if present to secure them
  try {
    const leftoverApp = ss.getSheetByName('Applications')
    if (leftoverApp) ss.deleteSheet(leftoverApp)
  } catch (e) {
    console.warn("Could not delete public Applications tab: " + e.toString())
  }
  try {
    const leftoverPay = ss.getSheetByName('Payments')
    if (leftoverPay) ss.deleteSheet(leftoverPay)
  } catch (e) {
    console.warn("Could not delete public Payments tab: " + e.toString())
  }

  const msg = '✅ Senatus Summit public matrix sheets initialized successfully!'
  try {
    SpreadsheetApp.getUi().alert(msg)
  } catch (e) {
    Logger.log(msg)
  }
}

function styleHeaderRow(sheet, numCols, bgColor, fontColor) {
  const header = sheet.getRange(1, 1, 1, numCols)
  header.setFontWeight('bold')
        .setBackground(bgColor)
        .setFontColor(fontColor)
        .setFontSize(11)
}

// ─── GET ─────────────────────────────────────────────────────
// Reads allotments to show taken slots on website.
function doGet() {
  const taken = []
  const seen  = new Set()

  const add = (committee, portfolio) => {
    const key = `${committee}::${portfolio}`
    if (!seen.has(key)) { seen.add(key); taken.push({ committee, country: portfolio }) }
  }

  // Source — UNGA / UNCSW / UNHRC / IP: col A = portfolio, col B = status
  ;['UNGA', 'UNCSW', 'UNHRC', 'IP'].forEach(name => {
    const sheet = getCommitteeSheet(name)
    if (!sheet) return
    sheet.getDataRange().getValues().slice(1).forEach(row => {
      const portfolio = String(row[0] || '').trim()
      const status    = String(row[1] || '').trim()
      if (portfolio && status.toLowerCase().includes('allot')) add(name, portfolio)
    })
  })

  // Source — FIA: col A = position, col B = name, col C = status
  const fiaSheet = getCommitteeSheet('FIA')
  if (fiaSheet) {
    fiaSheet.getDataRange().getValues().slice(1).forEach(row => {
      const position = String(row[0] || '').trim()
      const name     = String(row[1] || '').trim()
      const status   = String(row[2] || '').trim()
      if (position && name && status.toLowerCase().includes('allot'))
        add('FIA', `${position} — ${name}`)
    })
  }

  // Source — AIPPM: col A = name, col B = party, col C = status
  const aippmSheet = getCommitteeSheet('AIPPM')
  if (aippmSheet) {
    const partyAbbr = {
      'Bharatiya Janta Party': 'BJP', 'Indian National Congress': 'INC',
      'Aam Aadmi Party': 'AAP', 'Rashtriya Janata Dal': 'RJD',
      'Samajwadi Party': 'SP', 'Janata Dal (United)': 'JDU',
      'Nationalist Congress Party': 'NCP', 'Bahujan Samaj Party': 'BSP',
      'Shiv Sena': 'Shiv Sena', 'Trinamool Congress': 'TMC',
      'All India Majlis-e-Ittehadul Muslimeen': 'AIMIM',
      'Rashtriya Lok Janshakti Party': 'RLJP',
      'Communist Party of India (Marxist)': 'CPI-M',
      'Biju Janata Dal': 'BJD', 'Swaraj India': 'Swaraj India',
      'Revolutionary Socialist Party': 'RSP',
      'Punjab Lok Congress': 'Punjab Lok Congress',
      'Lok Janshakti Party ( Ram Vilas)': 'LJP-Ram Vilas',
      'Maharashtra Navnirman Sena': 'MNS',
      "National People's Party": 'NPP',
      'Telangan Rashtra Samithi': 'TRS',
      'Dravida Munnetra Kazhagam': 'DMK',
      'Apna Dal': 'Apna Dal', 'Shiromani Akali Dal': 'SAD',
      'YSR Congress Party': 'YSRCP', 'Independent': 'Independent',
      'Rashtriya loktantrik party': 'RLP', 'Independent ': 'Independent',
    }
    aippmSheet.getDataRange().getValues().slice(1).forEach(row => {
      const name   = String(row[0] || '').trim()
      const party  = String(row[1] || '').trim()
      const status = String(row[2] || '').trim()
      if (name && party && status.toLowerCase().includes('allot')) {
        const abbr = partyAbbr[party] || party
        add('AIPPM', `${name} (${abbr})`)
      }
    })
  }

  return ContentService
    .createTextOutput(JSON.stringify({ taken }))
    .setMimeType(ContentService.MimeType.JSON)
}

// ─── SEND EMAIL NOTIFICATION ─────────────────────────────────
function sendNotificationEmail(data) {
  try {
    const subject = `New Registration: ${data.fullName} - ${data.committeePreference || 'No Committee'}`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fafafa;">
        <h2 style="color: #2c5f5d; border-bottom: 2px solid #2c5f5d; padding-bottom: 10px; margin-top: 0; font-family: Garamond, Georgia, serif; letter-spacing: 1px;">
          New Senatus Summit 2026 Registration
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #e6f0f0;">
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd; width: 40%; font-size: 13px; color: #2c5f5d;">Field</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd; font-size: 13px; color: #2c5f5d;">Details</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Full Name</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Institution</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.institution}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Committee Preference</td>
            <td style="padding: 10px; border: 1px solid #ddd; color: #2c5f5d; font-weight: bold; font-size: 12px;">${data.committeePreference}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">1st Choice Portfolio</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.portfolio1 || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">2nd Choice Portfolio</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.portfolio2 || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">3rd Choice Portfolio</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.portfolio3 || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Prior MUN Experience?</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.hasMunExperience === 'yes' ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">MUN Experience Details</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.munExperienceDetails || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Reference</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.reference || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Registration Type</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: ${data.registrationType === 'Prudence 16B Student' ? '#b45309' : '#1e4d2b'};">
              ${data.registrationType || 'Standard'}
            </td>
          </tr>
          <tr style="background-color: #faf0f0;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Payment Account Name</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">${data.paymentAccountName || '—'}</td>
          </tr>
          <tr style="background-color: #faf0f0;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px; color: #333;">Payment Screenshot Link</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 12px;">
              ${data.screenshotLink && data.screenshotLink !== '—' 
                ? `<a href="${data.screenshotLink}" target="_blank" style="color: #2c5f5d; font-weight: bold; text-decoration: underline;">View Screenshot in Drive</a>` 
                : 'No Screenshot Attached'}
            </td>
          </tr>
        </table>
        
        <p style="font-size: 11px; color: #777; text-align: center; margin-top: 25px; border-top: 1px dashed #ccc; padding-top: 10px;">
          This is an automated notification from the Senatus Summit 2026 website backend.
        </p>
      </div>
    `;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log('Failed to send notification email: ' + err.toString());
  }
}

// ─── POST ────────────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    // ── Route: payment screenshot upload ──
    if (data.action === 'payment') {
      return handlePayment(data)
    }

    // Send email notification to the administrator (automatic mailing system)
    sendNotificationEmail(data)

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// ─── Handle payment screenshot ───────────────────────────────
function handlePayment(data) {
  try {
    const name      = String(data.name      || '').trim()
    const email     = String(data.email     || '').trim()
    const fileName  = String(data.fileName  || 'screenshot.jpg').trim()
    const fileBase64 = String(data.fileBase64 || '')

    if (!name || !email || !fileBase64) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Missing required fields.' }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    // Save image to Google Drive
    const folder  = getOrCreateFolder(DRIVE_FOLDER)
    const blob    = Utilities.newBlob(Utilities.base64Decode(fileBase64), 'image/jpeg', fileName)
    const file    = folder.createFile(blob)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    const driveLink = file.getUrl()

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, driveLink: driveLink }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// ─── Get or create a Drive folder ────────────────────────────
function getOrCreateFolder(folderName) {
  const iter = DriveApp.getFoldersByName(folderName)
  if (iter.hasNext()) return iter.next()
  return DriveApp.createFolder(folderName)
}

// ─── Portfolio data ───────────────────────────────────────────
const UN_COUNTRIES = [
  'Afghanistan','Argentina','Australia','Austria','Luxembourg','Belgium','Bhutan','Bulgaria',
  'Canada','China','Costa Rica','Cuba','Denmark','Czech Republic','Ethiopia','France','Germany',
  'Greenland','Iceland','Italy','Israel','Japan','Malaysia','Mexico','Morocco','Norway',
  'Philippines','Romania','Russian Federation','Switzerland','Tunisia','UAE','United Kingdom',
  'United States','Sweden','New Zealand','Spain','Ukraine','Finland','Syria','Netherlands',
  'San Marino','Lithuania','Namibia','Malta','Slovakia','Guatemala','Mauritania','Cyprus',
  'Gambia','India','Iran (Islamic Republic Of)','Latvia','Lebanon','Algeria','Armenia','Belarus',
  'Brazil','Belize','Benin','Bosnia and Herzegovina','Botswana','Colombia',
  'Bolivia (Plurinational State of)','Croatia',"Democratic People's Republic of Korea",
  "Cote d'Ivoire",'Gabon','Turkey','South Korea','Qatar','Nigeria','Pakistan','Somalia',
  'South Africa','Andorra','Angola','Antigua and Barbuda','Burundi','Cabo Verde','Grenada',
  'Liberia','Libya','Barbados','Montenegro','Nicaragua','Mozambique','Guinea','Nauru',
  'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa',
  'Sao Tome and Principe','Yemen','Zambia','Uruguay','Uzbekistan','Vanuatu','Lesotho',
  'Vietnam','Equatorial Guinea','Cameroon','Democratic Republic of the Congo','Egypt',
]
const UNGA_PORTFOLIOS  = UN_COUNTRIES
const UNCSW_PORTFOLIOS = UN_COUNTRIES
const UNHRC_PORTFOLIOS = UN_COUNTRIES

const AIPPM_DATA = [
  ['Narendra Modi','Bharatiya Janta Party',''],['Nirmala Sitharaman','Bharatiya Janta Party',''],
  ['Smriti Irani','Bharatiya Janta Party',''],['Maneka Gandhi','Bharatiya Janta Party',''],
  ['Amit Shah','Bharatiya Janta Party',''],['Jyotiraditya Scindia','Bharatiya Janta Party',''],
  ['Nitin Gadkari','Bharatiya Janta Party',''],['Ravi Shankar Prasad','Bharatiya Janta Party',''],
  ['Dr Harsh Vardhan','Bharatiya Janta Party',''],['Vasundhara Raje','Bharatiya Janta Party',''],
  ['Ramesh Bidhuri','Bharatiya Janta Party',''],['Mahendra Nath Pandey','Bharatiya Janta Party',''],
  ['Krishan Pal','Bharatiya Janta Party',''],['Virendra Kumar','Bharatiya Janta Party',''],
  ['Dharmendra Pradhan','Bharatiya Janta Party',''],['Dr. Ramesh Pokhriyal','Bharatiya Janta Party',''],
  ['Yogi Aditya Nath','Bharatiya Janta Party',''],['Meenakshi Lekhi','Bharatiya Janta Party',''],
  ['Kiren Rijiju','Bharatiya Janta Party',''],['Syed Shahnawaz Hussain','Bharatiya Janta Party',''],
  ['Piyush Goyal','Bharatiya Janta Party',''],['Mukhtar Abbas Naqvi','Bharatiya Janta Party',''],
  ['Ashwini Vaishnav','Bharatiya Janta Party',''],['Shivraj Singh Chauhan','Bharatiya Janta Party',''],
  ['Sudhanshu Trivedi','Bharatiya Janta Party',''],['Anandiben M Patel','Bharatiya Janta Party',''],
  ['Anju Bala','Bharatiya Janta Party',''],['Subramanyam Jaishankar','Bharatiya Janta Party',''],
  ['Manoharlal Khattar','Bharatiya Janta Party',''],['Anurag Singh Thakur','Bharatiya Janta Party',''],
  ['Manoj Tiwari','Bharatiya Janta Party',''],['Kirron Kher','Bharatiya Janta Party',''],
  ['Mansukh Mandaviya','Bharatiya Janta Party',''],['Rajnath Singh','Bharatiya Janta Party',''],
  ['Aditi Singh','Bharatiya Janta Party',''],['Shazia Ilmi','Bharatiya Janta Party',''],
  ['Tejasvi Surya','Bharatiya Janta Party',''],
  ['Sachin Pilot','Indian National Congress',''],['Salman Khurshid','Indian National Congress',''],
  ['Mallikarjun Kharge','Indian National Congress',''],['Sonia Gandhi','Indian National Congress',''],
  ['Rahul Gandhi','Indian National Congress',''],['Ambika Soni','Indian National Congress',''],
  ['Gaurav Gogoi','Indian National Congress',''],['Dr Shashi Tharoor','Indian National Congress',''],
  ['Meira Kumar','Indian National Congress',''],['P. Chidambaram','Indian National Congress',''],
  ['Neeraj Dangi','Indian National Congress',''],['Manish Tewari','Indian National Congress',''],
  ['Kamal Nath','Indian National Congress',''],['KTS Tulsi','Indian National Congress',''],
  ['Shaktisinh Gohil','Indian National Congress',''],['Jairam Ramesh','Indian National Congress',''],
  ['Adhir Ranjan Chowdhury','Indian National Congress',''],
  ['Arvind Kejriwal','Aam Aadmi Party',''],['Satyendar Jain','Aam Aadmi Party',''],
  ['Gopal Rai','Aam Aadmi Party',''],['Raghav Chadha','Aam Aadmi Party',''],
  ['Sanjay Singh','Aam Aadmi Party',''],['Atishi','Aam Aadmi Party',''],
  ['Bhagwant Mann','Aam Aadmi Party',''],
  ['Tejashvi Yadav','Rashtriya Janata Dal',''],['Misa Bharti','Rashtriya Janata Dal',''],
  ['Rabri Devi','Rashtriya Janata Dal',''],['Manoj Jha','Rashtriya Janata Dal',''],
  ['Akhilesh Yadav','Samajwadi Party',''],['Azam Khan','Samajwadi Party',''],
  ['Umar Ali Khan','Samajwadi Party',''],['Ram Gopal Yadav','Samajwadi Party',''],
  ['Nitish Kumar','Janata Dal (United)',''],['Sharad Pawar','Nationalist Congress Party',''],
  ['Ajit Pawar','Nationalist Congress Party',''],['Praful Patel','Nationalist Congress Party',''],
  ['Kumari Mayawati','Bahujan Samaj Party',''],['Satish Mishra','Bahujan Samaj Party',''],
  ['Sangeeta Azad','Bahujan Samaj Party',''],['Girish Chandra','Bahujan Samaj Party',''],
  ['Sanjay Raut','Shiv Sena',''],['Uddhav Thackeray','Shiv Sena',''],['Vinayak Raut','Shiv Sena',''],
  ['Mamta Banerjee','Trinamool Congress',''],["Derek O'Brien",'Trinamool Congress',''],
  ['Asaddudin Owaisi','All India Majlis-e-Ittehadul Muslimeen',''],
  ['Imtiaz Jaleel','All India Majlis-e-Ittehadul Muslimeen',''],
  ['Pashupati Kumar Paras','Rashtriya Lok Janshakti Party',''],
  ['Sitaram Yechury','Communist Party of India (Marxist)',''],
  ['Brinda Karat','Communist Party of India (Marxist)',''],
  ['Pinaki Mishra','Biju Janata Dal',''],['Bhartruhari Mahtab','Biju Janata Dal',''],
  ['Yogendra Yadav','Swaraj India',''],['N K Premachandran','Revolutionary Socialist Party',''],
  ['Captain Amarinder Singh','Punjab Lok Congress',''],
  ['Chirag Paswan','Lok Janshakti Party ( Ram Vilas)',''],
  ['Raj Thackeray','Maharashtra Navnirman Sena',''],
  ['Agatha Sangma',"National People's Party",''],
  ['K R Reddy','Telangan Rashtra Samithi',''],
  ['Dayanidhi Maran','Dravida Munnetra Kazhagam',''],
  ['Kanimozhi Karunanidhi','Dravida Munnetra Kazhagam',''],
  ['Anupriya Patel','Apna Dal',''],['Harsimrat Kaur Badal','Shiromani Akali Dal',''],
  ['JaganMohan Reddy','YSR Congress Party',''],
  ['Naba Kumar Sarania','Independent',''],['Ranjan Gogoi','Independent',''],
  ['Sumalatha Ambareesh','Independent',''],['Ravindra Singh Bhati','Independent',''],
  ['Hanuman Beniwal','Rashtriya loktantrik party',''],['Rajesh Ranjan','Independent ',''],
]

const FIA_DATA = [
  ['FIA President','Mohammed Ben Sulayem',''],['Race Director','Rui Marques',''],
  ['Deputy Race Director','Paul Burns',''],['CEO of Liberty Media','Derek Chang',''],
  ['Tyre Supplier','Pirelli',''],['Fuel Supplier','Shell',''],
  ['Fuel Supplier','Petronas',''],['Fuel Supplier','ExxonMobil',''],
  ['TP Mercedes','Toto Wolff',''],['TD Mercedes','James Allison',''],
  ['Driver Mercedes','George Russell',''],['Driver Mercedes','Kimi Antonelli',''],
  ['TP Ferrari','Frédéric Vasseur',''],['TD Ferrari','Loic Serra',''],
  ['Driver Ferrari','Charles Leclerc',''],['Driver Ferrari','Lewis Hamilton',''],
  ['TP McLaren','Andrea Stella',''],['TD McLaren','Peter Prodromou',''],
  ['Driver McLaren','Lando Norris',''],['Driver McLaren','Oscar Piastri',''],
  ['TP Audi','Mattia Binotto',''],['TD Audi','James Key',''],
  ['Driver Audi','Nico Hulkenberg',''],['Driver Audi','Gabriel Bortoleto',''],
  ['TP Haas','Ayao Komatsu',''],['TD Haas','Andrea De Zordo',''],
  ['Driver Haas','Esteban Ocon',''],['Driver Haas','Oliver Bearman',''],
  ['TP Alpine','Flavio Briatore',''],['TD Alpine','David Sanchez',''],
  ['Driver Alpine','Pierre Gasly',''],['Driver Alpine','Franco Colapinto',''],
  ['TP Red Bull Racing','Laurent Mekie',''],['TD Red Bull Racing','Pierre Wache',''],
  ['Driver Red Bull Racing','Max Verstappen',''],['Driver Red Bull Racing','Isack Hadjar',''],
  ['TP Racing Bulls','Alan Permane',''],['TD Racing Bulls','Tim Goss',''],
  ['Driver Racing Bulls','Liam Lawson',''],['Driver Racing Bulls','Arvid Lindblad',''],
  ['TP Williams','James Vowles',''],['TD Williams','Pat Fry',''],
  ['Driver Williams','Alex Albon',''],['Driver Williams','Carlos Sainz',''],
  ['TP Aston Martin','Adrian Newey',''],['TD Aston Martin','Dan Fallows',''],
  ['Driver Aston Martin','Fernando Alonso',''],['Driver Aston Martin','Lance Stroll',''],
  ['TP Cadillac','Graeme Lowdon',''],['TD Cadillac','Nick Chester',''],
  ['Driver Cadillac','Sergio Perez',''],['Driver Cadillac','Valtteri Bottas',''],
]

const IP_PORTFOLIOS = [
  ...Array.from({length:20},(_,i)=>`Journalist ${i+1}`),
  ...Array.from({length:20},(_,i)=>`Photographer ${i+1}`),
  ...Array.from({length:20},(_,i)=>`Caricaturist ${i+1}`),
]
