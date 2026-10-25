# Math Foundation 30

A complete, static core-skills programme for Grades 6–8. Plain English, no accounts, no backend, no external assets or runtime dependencies.

## Open the app

Double-click **index.html** in this folder. Keep `js/`, `styles.css`, `print.css`, `manifest.webmanifest`, and `sw.js` together with it. No installation or build is required. Use a recent Chrome, Edge, Firefox, Safari, or Brave browser.

For an optional local server, run `python -m http.server 8766 --bind 127.0.0.1` from this folder, then visit `http://127.0.0.1:8766`. To share, copy the folder or upload its application files to static HTTPS hosting. Do not share student backup files as part of a public website.

## A teacher's first five minutes

1. Open **Classes**. Enter the class name and optionally paste one student name or ID per line.
2. Open **30-session programme**, choose a session, and set it as current for that class.
3. Read the teaching point and worked example. Choose Level A to start small.
4. Generate practice or five-question homework. Use the board or print it.
5. Occasionally create a quick test, select **Record scores**, and enter marks. Leave absent students blank; enter `0` for a tested student with no marks.
6. Use **Progress** to decide whether to repeat, continue, or increase difficulty.

Use 8–10 minutes in a normal period, 2–3 sessions weekly, a dedicated period, or selected skills. Session 30 can return to session 1; earlier assessments remain saved. A session changes only when you explicitly set it as current.

## Included

- 30 structured sessions in six phases, with recall, facts, mental strategies, teaching points, worked examples, practice, homework, and quick tests.
- 28 generator topics, five levels, and 5/10/15/20 question sets.
- Practice, quick drill, homework, quick test, mastery test, and mixed revision modes.
- Tables 2–12: ordered, random, missing factor, reverse division, and mixed 2–10 facts.
- Searchable mental-math and reliable-shortcut libraries.
- Multiple classes, paste-in rosters, rename controls, numerical assessment batches, class trends, and student summaries.
- Browser-local saving, validated JSON import, export, recovery download, and explicit reset confirmation.
- Print layout preview, question-only printing, and separate answer-key printing.

## Printing

Generate a worksheet, then use **Preview print layout** to inspect the clean layout and toggle the answer key. **Print sheet** always hides answers, even if they were revealed on screen. **Print answer key** prints the questions with their matching answers and omits student lines. Select Save as PDF in a normal browser's print dialog to create a PDF. Browser headers/footers can be turned off in that dialog.

Pagination follows the selected paper, margins, browser, and question length. Twenty short questions are laid out in two columns; longer factor-list questions may need more paper. Embedded app browsers may handle native printing differently; open index.html in your normal browser if the print dialog does not work.

## Saving and backups

Records use localStorage under `math-foundation-30-v1`. Export from Settings regularly. A backup includes all classes and scores, and may contain student information. Import validates the entire file before asking to replace records; it does not merge. Maximum backup size is 10 MB, with limits of 500 classes, 1,000 students per class, and 50,000 tests. Browsers may impose smaller storage limits; save failures show a message and leave the in-memory data available to export.

Browser data is tied to the browser profile and origin/file location. Moving the folder, changing from file opening to a server, using private mode, or clearing browser data may change or erase access to records. Export before moving. There is no cloud sync and no authentication: anyone using the same browser profile can see its records. Avoid simultaneous editing in multiple tabs.

Direct-file opening works offline immediately. On HTTPS hosting or localhost, a service worker caches application assets after the first successful online visit. Service workers do not run on file URLs or ordinary non-local HTTP hosting; the downloaded folder still works without them.

## Project structure

- `index.html`: application shell and local script loading.
- `styles.css`: responsive teacher interface.
- `print.css`: shared printing and on-screen print-preview rules.
- `js/content.js`: 30 lessons, stable session IDs, skill names, and libraries.
- `js/engine.js`: pure random generators and exact fraction utilities.
- `js/model.js`: versioned data validation, IDs, and progress calculations.
- `js/app.js`: rendering, navigation, forms, persistence, backup and print actions.
- `sw.js`, `manifest.webmanifest`: hosted offline support.
- `tests/engine.test.cjs`: deterministic generator and data validation tests.
- `DEVELOPER_NOTES.md`: architecture and Android migration outline.
- `QA.md`: verification evidence and remaining environment limits.

## Developer checks

Install Node.js only if you want to run the developer tests. The app itself does not need it.

```text
node tests/engine.test.cjs
node --check js/app.js
```

The test suite independently recalculates 141,100 questions across every skill and difficulty; it checks table modes, nonzero divisors, integer division, fraction reduction, beginner ranges, invalid options, backup round trips, invalid dates, and score bounds.

## Deliberate limits and useful next improvements

Scores are teacher-entered; this is not a student login or automatic-marking platform. Saved tests store assessment metadata and scores, not every generated worksheet. Save a PDF if you need the exact paper. Rational answers are shown as reduced fractions, with whole numbers when appropriate; equivalent unreduced fractions may be mathematically correct, so use teacher judgment when marking. The current-class session acts as the covered-skills cutoff for mixed revision; selected session work uses that lesson's scope.

The next useful improvements are a classroom pilot to tune number ranges and examples, an optional archive of generated assessment papers, and per-skill longitudinal reports. An Android version should reuse the content/rules/schema rather than port DOM code.
