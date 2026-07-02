/**
 * Pharco Brand Perception Survey — Form Builder
 * ------------------------------------------------
 * Run createPharcoBrandSurvey() once from script.google.com.
 * It will:
 *   1. Create a new Google Form with all 11 sections / 20 questions.
 *   2. Create a linked Google Sheet ("Pharco Brand Perception Survey - Responses")
 *      that captures every submission as a new row.
 *   3. Install a submit trigger that emails adelhikal0@gmail.com
 *      every time someone completes the form.
 *
 * After running, check the Logs (View > Logs) for the live Form URL
 * (edit link) and the Sheet URL.
 */

var NOTIFY_EMAIL = 'adelhikal0@gmail.com';

function createPharcoBrandSurvey() {
  var form = FormApp.create('Pharco Brand Perception Survey');
  form.setDescription(
    'This survey gathers internal perspectives on the Pharco brand — perception, positioning, ' +
    'messaging, visual identity, and voice — to inform the upcoming rebrand. It takes about ' +
    '5-7 minutes. Responses are confidential and used in aggregate.'
  );
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);

  var likertScale = ['1', '2', '3', '4', '5'];

  // ---------- Section 1 — About You ----------
  form.addListItem()
    .setTitle('Which Pharco Group entity do you primarily work for?')
    .setChoiceValues(['Pharco (Corporate/HQ)', 'Amriya', 'PharcoB', 'EEPI', 'Techno', 'Other'])
    .setRequired(true);

  form.addListItem()
    .setTitle('Which department best describes your role?')
    .setChoiceValues([
      'Marketing', 'Sales & Commercial', 'Corporate Communications', 'HR & Talent',
      'Regulatory Affairs', 'Medical & Scientific Affairs', 'Digital & E-commerce',
      'Business Development & Export', 'Finance', 'Legal', 'IT', 'Executive Leadership', 'Other'
    ])
    .setRequired(true);

  form.addListItem()
    .setTitle('What is your seniority level?')
    .setChoiceValues(['Staff', 'Manager', 'Director+', 'Executive'])
    .setRequired(true);

  // ---------- Section 2 — Overall Brand Perception ----------
  form.addPageBreakItem().setTitle('Section 2 — Overall Brand Perception');

  form.addGridItem()
    .setTitle("Rate the following about Pharco's brand today")
    .setHelpText('1 = Strongly Disagree, 5 = Strongly Agree')
    .setRows(['Confidence in it', 'Consistency', 'Stands out from competitors', 'Trustworthy'])
    .setColumns(likertScale)
    .setRequired(true);

  // ---------- Section 3 — Positioning ----------
  form.addPageBreakItem().setTitle('Section 3 — Positioning');

  form.addMultipleChoiceItem()
    .setTitle('How is Pharco currently positioned, in your view?')
    .setChoiceValues([
      'Affordable/generic option', 'High-quality manufacturer',
      'Innovator & health-equity partner', 'No clear positioning'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // ---------- Section 4 — Messaging ----------
  form.addPageBreakItem().setTitle('Section 4 — Messaging');

  form.addGridItem()
    .setTitle("Rate Pharco's current messaging")
    .setHelpText('1 = Strongly Disagree, 5 = Strongly Agree')
    .setRows(['Clear', 'Consistent across channels', 'Emotionally engaging', 'Credible'])
    .setColumns(likertScale)
    .setRequired(true);

  // ---------- Section 5 — Visual Identity ----------
  form.addPageBreakItem().setTitle('Section 5 — Visual Identity');

  form.addScaleItem()
    .setTitle('I know the correct current logo, colors, and fonts to use for my entity.')
    .setBounds(1, 5)
    .setLabels('Strongly Disagree', 'Strongly Agree')
    .setRequired(true);

  form.addGridItem()
    .setTitle('Rate consistency across the company of:')
    .setHelpText('1 = Very Inconsistent, 5 = Very Consistent')
    .setRows(['Logo usage', 'Color palette', 'Templates (PPT, docs)', 'Digital & social assets'])
    .setColumns(likertScale)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Have you ever used a template or asset you weren't sure was current/correct?")
    .setChoiceValues(['Yes', 'No', 'Not sure'])
    .setRequired(true);

  // ---------- Section 6 — Brand Guidelines ----------
  form.addPageBreakItem().setTitle('Section 6 — Brand Guidelines');

  form.addScaleItem()
    .setTitle("I know where to find our brand guidelines, and they're easy to use.")
    .setBounds(1, 5)
    .setLabels('Strongly Disagree', 'Strongly Agree')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('What brand resource are you missing most?')
    .setChoiceValues(['Logo/templates', 'Tone-of-voice guide', 'Clear approval process', 'Nothing missing'])
    .showOtherOption(true)
    .setRequired(true);

  // ---------- Section 7 — Brand Voice & Tone ----------
  form.addPageBreakItem().setTitle('Section 7 — Brand Voice & Tone');

  form.addGridItem()
    .setTitle("Rate how much Pharco's communication currently sounds:")
    .setHelpText('1 = Not at all, 5 = Very much so')
    .setRows(['Professional', 'Human & warm', 'Innovative', 'Trustworthy'])
    .setColumns(likertScale)
    .setRequired(true);

  // ---------- Section 8 — Internal Communications ----------
  form.addPageBreakItem().setTitle('Section 8 — Internal Communications');

  form.addGridItem()
    .setTitle('Rate how clear and consistent brand communication is from:')
    .setHelpText('1 = Not at all, 5 = Very much so')
    .setRows(['Marketing', 'Sales', 'HR', 'Leadership'])
    .setColumns(likertScale)
    .setRequired(true);

  // ---------- Section 9 — Pain Points ----------
  form.addPageBreakItem().setTitle('Section 9 — Pain Points');

  // Google Forms' native "Ranking" item isn't exposed in Apps Script's FormApp API yet,
  // so this is built as a grid: pick a unique rank (1st=biggest) for each obstacle.
  // After creation, you can optionally convert it to the native Ranking question type
  // in the Forms UI (Add question > Ranking) if you prefer that interaction.
  form.addGridItem()
    .setTitle('Rank your top obstacles, biggest to smallest')
    .setHelpText('Assign each obstacle a unique rank: 1 = biggest obstacle, 4 = smallest.')
    .setRows(['Unclear guidelines', 'Inconsistent branding across companies', 'Slow approvals', 'Missing templates'])
    .setColumns(['1 (biggest)', '2', '3', '4 (smallest)'])
    .setRequired(true);

  form.addScaleItem()
    .setTitle("Approvals/sign-off on brand materials happen quickly enough.")
    .setBounds(1, 5)
    .setLabels('Strongly Disagree', 'Strongly Agree')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("I've had to recreate a document from scratch because no usable template existed.")
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("In your own words: what's the single biggest obstacle to consistent branding at Pharco today?")
    .setRequired(true);

  // ---------- Section 10 — Future Brand ----------
  form.addPageBreakItem().setTitle('Section 10 — Future Brand');

  form.addTextItem()
    .setTitle('In three words, describe the brand you want Pharco to become.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('If you had to pick ONE top priority for this rebrand, what would it be?')
    .setChoiceValues([
      'Unify visual identity', 'Modernize look & feel', 'Clarify positioning',
      'Simplify messaging', 'Build usable guidelines', 'Improve internal comms'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // ---------- Section 11 — Open Feedback ----------
  form.addPageBreakItem().setTitle('Section 11 — Open Feedback');

  form.addParagraphTextItem()
    .setTitle('Anything else leadership should know?')
    .setRequired(false);

  // ---------- Link a response Spreadsheet ----------
  var ss = SpreadsheetApp.create('Pharco Brand Perception Survey - Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ---------- Email notification on every submission ----------
  // Remove any pre-existing triggers for this function to avoid duplicates on re-run.
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'onPharcoFormSubmit') {
      ScriptApp.deleteTrigger(t);
    }
  });
  ScriptApp.newTrigger('onPharcoFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();

  // Save IDs for reference / for the trigger handler.
  PropertiesService.getScriptProperties().setProperty('PHARCO_FORM_ID', form.getId());
  PropertiesService.getScriptProperties().setProperty('PHARCO_SHEET_ID', ss.getId());

  Logger.log('Form URL (fill out):  ' + form.getPublishedUrl());
  Logger.log('Form URL (edit):      ' + form.getEditUrl());
  Logger.log('Responses Sheet URL:  ' + ss.getUrl());
  Logger.log('Notification email:   ' + NOTIFY_EMAIL);
}

/**
 * Fires automatically whenever someone submits the form.
 * Emails a summary of the response to NOTIFY_EMAIL.
 */
function onPharcoFormSubmit(e) {
  var formId = PropertiesService.getScriptProperties().getProperty('PHARCO_FORM_ID');
  var sheetId = PropertiesService.getScriptProperties().getProperty('PHARCO_SHEET_ID');
  var sheetUrl = sheetId ? SpreadsheetApp.openById(sheetId).getUrl() : '';

  var lines = [];
  if (e && e.response) {
    var itemResponses = e.response.getItemResponses();
    itemResponses.forEach(function (ir) {
      lines.push(ir.getItem().getTitle() + ': ' + ir.getResponse());
    });
  }

  var body =
    'A new response was just submitted to the Pharco Brand Perception Survey.\n\n' +
    (lines.length ? lines.join('\n') + '\n\n' : '') +
    'View all responses: ' + sheetUrl;

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New response — Pharco Brand Perception Survey',
    body: body
  });
}
