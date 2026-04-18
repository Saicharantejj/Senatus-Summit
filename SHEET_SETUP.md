# Google Sheet Setup — 5 Minutes

## Step 1 — Create your Google Sheet
1. Go to sheets.google.com → New blank spreadsheet
2. Rename it: **Senatus Summit Applications**
3. Rename the first tab (bottom) to: **Applications**
   (right-click the tab → Rename)

## Step 2 — Add the Apps Script
1. In the sheet, click **Extensions → Apps Script**
2. Delete all existing code in the editor
3. Open the file `apps-script.js` in the senatus-summit folder
4. Copy everything and paste it into the Apps Script editor
5. Click **Save** (floppy disk icon)

## Step 3 — Deploy as a Web App
1. Click **Deploy → New deployment**
2. Click the gear icon next to "Type" → select **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Authorise when prompted (click "Advanced" → "Go to project" if Google warns you)
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/XXXX.../exec`

## Step 4 — Connect to the website
1. In your `senatus-summit` folder, create a file called `.env.local`
2. Add this line (paste your URL):

```
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_URL_HERE/exec
```

3. **Restart** the dev server (`Ctrl+C` then `npm run dev`)

## Done!
- Every form submission will appear as a new row in your sheet
- Taken committee+country slots will be greyed out for future applicants
- You have full control — delete a row in the sheet to free up a slot
