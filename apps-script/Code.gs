/**
 * MCV Probe — log receiver (Google Apps Script web app).
 *
 * Setup (one time, ~5 min):
 *   1. Go to https://script.new while signed in to your personal Google account.
 *   2. Replace everything in Code.gs with this file. Save.
 *   3. Deploy > New deployment > type "Web app".
 *      Execute as: Me.  Who has access: Anyone.  Deploy, then authorise.
 *   4. Copy the Web app URL (ends in /exec) and give it to Claude.
 *
 * On the first event it creates a Google Sheet called "MCV Probe Log" in your
 * Drive and remembers it. One row per event; the full JSON is in the last column.
 */

const SHEET_NAME = 'MCV Probe Log';
const HEADERS = [
  'received_at', 'event', 'session_id', 'visitor_id', 'visit_number',
  'typed_id', 'typed_name', 'href', 'query', 'referrer', 'in_iframe',
  'ancestor_origins', 'has_opener', 'user_agent', 'platform', 'mobile',
  'language', 'timezone', 'screen', 'viewport', 'public_ip', 'ip_org',
  'ip_city', 'seconds_on_page', 'detail', 'raw_json'
];

function getSheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID');
  let ss;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create(SHEET_NAME);
    props.setProperty('SHEET_ID', ss.getId());
    const sh = ss.getSheets()[0];
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return ss.getSheets()[0];
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const body = (e && e.postData && e.postData.contents) || '{}';
    let d;
    try { d = JSON.parse(body); } catch (err) { d = { event: 'unparseable', raw: body }; }
    const ctx = d.context || {};
    const net = d.network || {};
    const row = [
      new Date(),
      d.event || '',
      d.session_id || '',
      d.visitor_id || '',
      d.visit_number || '',
      d.typed_id || '',
      d.typed_name || '',
      ctx.href || '',
      ctx.query ? JSON.stringify(ctx.query) : '',
      ctx.referrer || '',
      ctx.in_iframe === undefined ? '' : String(ctx.in_iframe),
      ctx.ancestor_origins ? JSON.stringify(ctx.ancestor_origins) : '',
      ctx.has_opener === undefined ? '' : String(ctx.has_opener),
      ctx.user_agent || '',
      ctx.platform || '',
      ctx.mobile === undefined ? '' : String(ctx.mobile),
      ctx.language || '',
      ctx.timezone || '',
      ctx.screen || '',
      ctx.viewport || '',
      net.ip || '',
      net.org || '',
      net.city || '',
      d.seconds_on_page === undefined ? '' : d.seconds_on_page,
      d.detail ? JSON.stringify(d.detail) : '',
      body.slice(0, 45000)
    ];
    getSheet_().appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return HtmlService.createHtmlOutput('ok');
}

/** Opening the /exec URL in a browser shows a link to the log sheet (owner only can open it). */
function doGet() {
  const sh = getSheet_();
  const url = sh.getParent().getUrl();
  return HtmlService.createHtmlOutput(
    '<p>MCV Probe receiver is running. Rows so far: ' + (sh.getLastRow() - 1) +
    '.</p><p><a href="' + url + '" target="_blank">Open the log sheet</a></p>'
  );
}
