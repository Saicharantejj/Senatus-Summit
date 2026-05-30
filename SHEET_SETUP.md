# Google Sheets Setup (Public Matrix & Private Data Store) — 10 Minutes

To protect candidate privacy (emails, phone numbers, and payment details), we separate the data into two spreadsheets:
1. **Public Matrix**: Visible to everyone so they can see which portfolios are taken.
2. **Private Data Store**: Strictly private (only for the administrator) where registration and payment data is logged.

---

## Step 1 — Create your Google Sheets

### 1. The Public Matrix Spreadsheet (Existing or New)
1. Go to [sheets.google.com](https://sheets.google.com) and open your existing public spreadsheet or create a new blank spreadsheet.
2. Rename it to: **Senatus Summit 2026 — Public Matrix**
3. Share settings: Click **Share** (top-right) → under **General access**, set to **Anyone with the link can view**.
4. **Copy its Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/YOUR_PUBLIC_SPREADSHEET_ID/edit...`

### 2. The Private Data Spreadsheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a **new blank spreadsheet**.
2. Rename it to: **Senatus Summit 2026 — Private Applications & Payments**
3. Share settings: Keep it private (do NOT share it with anyone).
4. **Copy its Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/YOUR_PRIVATE_SPREADSHEET_ID/edit...`

---

## Step 2 — Configure the Apps Script

1. Open your **Public Matrix Spreadsheet**.
2. Click **Extensions → Apps Script**.
3. Delete all existing code in the editor.
4. Open the file [apps-script.js](file:///Users/saicharantej/senatus-summit/apps-script.js) in your codebase.
5. Copy the entire contents of [apps-script.js](file:///Users/saicharantej/senatus-summit/apps-script.js) and paste it into the Apps Script editor.
6. At the top of the script:
   - Paste your **Public Spreadsheet ID** into `PUBLIC_SHEET_ID`.
   - Paste your **Private Spreadsheet ID** into `PRIVATE_SHEET_ID`.
7. Click **Save** (floppy disk icon).

---

## Step 3 — Initialize the Sheets

1. In the Apps Script editor, locate the toolbar at the top.
2. Select the `setup` function from the dropdown next to "Debug" / "Run".
3. Click **Run**.
4. Authorise the script when prompted (click "Advanced" → "Go to Senatus Summit 2026 (unsafe)" if Google warns you).
5. The script will automatically:
   - Create and format the committee sheets in your **Public Matrix** spreadsheet.
   - Create and format the `Applications` and `Payments` sheets in your **Private Data** spreadsheet.
   - If Applications or Payments sheets were in the Public spreadsheet, it will attempt to delete them. (If they are still visible in the Public spreadsheet, please **delete the Applications and Payments tabs manually** so the public cannot see them).

---

## Step 4 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → select **Web app**.
3. Set:
   - **Description:** Public Matrix & Private Sync
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/XXXX.../exec`).

---

## Step 5 — Connect to the website

1. In your `senatus-summit` folder, open `.env.local`.
2. Add/replace this line (paste your deployment URL):
   ```env
   APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_URL_HERE/exec
   ```
3. **Restart** your dev server (`Ctrl+C` then `npm run dev`).

---

## Done!
- Every application and payment screenshot will be securely logged in your private spreadsheet.
- The taken committee/country slots will automatically update in your public spreadsheet.
- The public will only have view access to the committee sheets on the website and will not see any personal or payment data!
