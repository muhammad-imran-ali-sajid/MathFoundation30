# Implementation plan

1. Build a buildless, offline-first interface with local scripts and fonts.
2. Define 30 concise lessons, mental strategies, and reliable tips in content.js.
3. Implement pure, parameterized generators with exact fraction arithmetic and seeded tests.
4. Add class rosters, assessment batches, numerical progress, and validated portable backups.
5. Add worksheet/answer-only printing and responsive classroom views.
6. Verify generators, data validation, browser workflows, and print/mobile layouts.

Architecture: content.js → engine.js → model.js → app.js. No external runtime dependencies. Versioned JSON records use stable IDs and can map to Kotlin entities. Classic scripts support file:// opening without a server.
