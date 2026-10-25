# Architecture and Android migration

## Boundaries

The app uses four classic-script namespaces in dependency order. This avoids module-loading restrictions under file:// and avoids any package manager, CDN, API, or runtime build step.

- **MFContent**: immutable curriculum definitions. Sessions S01–S30 refer to stable skill IDs. A skill may appear in several sessions; session ID and skill ID have separate meanings.
- **MFEngine**: `generate(options, rng)` returns question records with prompt, exact answer, skill, level, generation metadata, and a human-readable local question ID. Its injected RNG makes tests reproducible. Question IDs identify positions within a generated set, not globally unique historical records.
- **MFModel**: validates and normalizes portable JSON, produces entity IDs, and derives class summaries. It has no DOM dependency. Validation drops unknown fields, checks references and uniqueness, validates real calendar dates, and rejects invalid marks.
- **app.js**: small hash-based router and DOM templates. It owns localStorage and user actions. Imported text is escaped before HTML insertion. There are no remotely fetched assets or scripts.

Fractions use integer numerators and denominators and Euclid's GCD for reduction. Generator operands are intentionally small, so all intermediate integer arithmetic is far inside JavaScript's safe integer range. No expression evaluation or floating-point fraction comparison is used in production. BODMAS templates encode operation order explicitly.

## Portable data schema (version 1)

```text
Backup(version, activeClass, classes[], assessments[])
Class(id, name, session: 1..30, students[])
Student(id, name)
Assessment(id, classId, date: YYYY-MM-DD, skill, level, session, total, scores[])
Score(studentId, score)
```

Each assessment is a batch so a class average and students-tested count cannot accidentally combine unrelated tests. Blank fields create no score record; zero remains a real score. Half marks are supported. Dates use the teacher device's calendar day. Tests are ordered by date with insertion order breaking ties. Recommendations are simple guides: below 50% revisit, below 70% repeat, below 85% continue, otherwise try the next level. They are not student labels and are not used for placement decisions.

A student with assessment references cannot be removed individually. Teachers can rename them while retaining IDs. Class/test deletion and reset require an explicit UI confirmation. Import is replacement, validates before mutation, and rolls back in-memory state if persistence fails. Corrupt existing storage is preserved until explicit recovery/import/reset.

## Kotlin / Room mapping

1. Move curriculum definitions to bundled JSON with the same session and skill IDs.
2. Implement a `QuestionGenerator` interface with `generate(options, Random)` and sealed question metadata types. Use Long or an exact Rational class. Port the independent test fixtures as JVM tests.
3. Create Room entities: ClassEntity, StudentEntity(classId), AssessmentEntity(classId), ScoreEntity(assessmentId, studentId). Use a composite primary key for scores and appropriate foreign keys.
4. Import/export the versioned envelope through Kotlin serialization. Perform validation and replacement in a Room transaction. Preserve IDs to avoid duplicate students when future migrations support merging.
5. Derive progress in a repository/service layer and present it with Compose. UI state, lesson navigation, and Android print adapters stay outside the generator.
6. If assessment paper history is added, introduce a versioned GeneratedSet entity with a unique set ID and persist questions, options, and seed. The current question position ID alone is not a historical key.

## Maintenance

Add a skill in content.js, implement its generator branch, and add an independent oracle in the test suite. Change the service worker cache version when deploying changes to the asset set. Keep schema upgrades explicit; do not silently reinterpret old scores. Never log student records or upload them for analytics by default.
