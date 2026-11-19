# Issue log — MCV Probe

| Date | What happened | What the code did | Outcome |
|---|---|---|---|
| 2026-11-19 | Built v1 | — | Awaiting receiver deploy and first test clicks (Gap, Yanita) |
| 2026-11-19 | Receiver deployed by Gap; curl POST test | doPost appended a row | Rows 0 → 1 (test row "CLAUDE TEST ROW", session test-claude-1119) |
| 2026-11-19 | Live page opened in headless Chrome (?src=claude-live-test) | Browser fetch (no-cors) reached doPost | Rows 1 → 2; end to end works |
| 2026-11-19 | Gap recreated the receiver in his personal Google account (Claude's Drive connector could not see the first one) | New /exec wired, config.js?v=3 | First receiver holds the 45 test rows from Gap and Yanita; new one starts empty |
| 2026-11-19 | Read the first sheet (Gap + Yanida sessions) | — | MCV passes no identity; referrer bare domain or empty; scroll % >100 and duplicate focus/click events noted for the real build |
