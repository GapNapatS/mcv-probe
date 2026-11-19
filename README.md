# MCV Probe

Test page for the Pause-and-Do pause player. Opened from a MyCourseville link, it records everything a browser shares with a web page (URL and query, referrer, iframe/opener, device, language, timezone, public IP and network owner) plus behaviour (visibility, focus, scroll, clicks, heartbeats for 2 min, pagehide) and optional typed student ID, name and one practice answer. The goal is to learn what MyCourseville passes to an outside page, before building the real player.

- `index.html` — the page (GitHub Pages). Shows the visitor everything it recorded.
- `config.js` — the Apps Script `/exec` URL.
- `apps-script/Code.gs` — receiver: paste into script.new, deploy as Web app (Execute as Me, Anyone). Creates the "MCV Probe Log" sheet on first event.
- `ISSUES.md` — issue log.

Vault note: `My Academic Brain/Teaching/Resources/Ideas/Pause-and-Do — Forced Active Pauses in Recorded Lectures.md`.
