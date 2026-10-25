# Verification record

Verified on 25 October 2026 with Node 24 and the embedded Chromium browser.

## Automated

`node tests/engine.test.cjs` passes: 141,100 generated questions independently recomputed across 28 topics, five levels, repeated deterministic random inputs, and all table modes for tables 2–12. Checks cover finite answers, nonnegative pre-integer results, exact division, fraction denominator bounds and reduction, simple-level ranges, and invalid generator options. Backup tests cover JSON round trips, score bounds, duplicate IDs, unknown references, invalid dates, unsupported schema versions, and inherited-object-key inputs.

JavaScript syntax checks pass for app.js, engine.js, model.js, and sw.js.

## Browser workflows

- Home and all main navigation destinations opened successfully; programme displayed 30 session buttons.
- Created a synthetic three-student class. Scores 4/5 and 0/5 produced a 40% class average and two tested students. The blank third student was excluded.
- Reload retained the class and assessment. Choosing session 21 and setting it as current updated Home correctly.
- Generated 20 Level D fraction-division questions, revealed their reduced answers, and inspected the worksheet.
- Generated Level A missing-factor questions for table 12 and Level B fraction addition/subtraction.
- Mental-math search filtered the library correctly.
- Exported JSON through the browser and imported that file through the file chooser; the app confirmed successful import with the class and test intact.
- Inspected desktop (1440×1000), tablet, and phone (390×844) layouts. Phone Home had no horizontal document overflow; navigation intentionally scrolls horizontally.
- Inspected the shared print stylesheet through the in-app print preview. Question sheets had zero visible answers. Switching to answer-key mode revealed all 20 answers and hid the student-name line. Two-column layout rendered correctly.
- Browser console inspection reported no JavaScript warnings or errors during the exercised workflows.
- Stopped the local server, reloaded the cached app, verified saved session 21, and generated ten new questions successfully offline.

## Verification limits

The embedded browser's native print invocation blocked automation and did not expose its paginated preview. The actual print stylesheet was visually checked through the in-app preview, but physical printing, native PDF output, and final paper pagination were not verified. The embedded browser prohibits file:// URLs, so double-click opening was not browser-automated. The application uses only local classic scripts and styles, with no fetch/module dependency, to support that path in ordinary browsers.

Synthetic QA records exist only in the localhost browser profile and exported test backup, not in the distributed project. Real cross-browser/device testing and classroom piloting remain recommended before wide school rollout.
