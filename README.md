# Pharco Brand Perception Survey — Form Builder

Google Apps Script that programmatically builds the full Pharco Brand Perception Survey as a Google Form: 11 sections, 20 questions (dropdowns, linear scales, grids, multiple choice, open text), a linked Google Sheet for responses, and an email-notification trigger.

This lives in GitHub for version control only. Google Forms cannot be created by pushing code to GitHub — the script has to be run once inside a Google account to produce the live form.

## Get the live form link (run this once)

1. Go to [script.google.com](https://script.google.com) → **New project**.
2. Delete the boilerplate code, paste in the contents of `Pharco_Brand_Survey_FormBuilder.gs`.
3. Click **Run** on the `createPharcoBrandSurvey` function.
4. Approve the OAuth permissions prompt (needs access to Forms, Sheets, and Mail on your own account).
5. Open **View → Logs** (or Executions) to get:
   - Form URL (fill out) — share this one
   - Form URL (edit)
   - Responses Sheet URL

From then on, every submission automatically adds a row to the Sheet and emails `adelhikal0@gmail.com`.

## Known limitations

- **Ranking question (Q14)** is implemented as a grid (pick a unique rank 1–4 per obstacle) because Apps Script doesn't yet expose Google's native "Ranking" item type. Swap it manually in the Forms UI if you want that exact interaction.
- **Branding** (orange `#FFA400` header, logo, Ubuntu font) isn't settable via the Forms API — apply it manually after creation via the paint-palette "Customize theme" button.
