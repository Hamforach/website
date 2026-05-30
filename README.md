# Arcana Commons Forum

Arcana Commons is a static prototype for an occult studies forum focused on public-domain texts, bilingual reading, source verification, and scholarly discussion.

The current build is plain HTML, CSS, and JavaScript. It can be opened directly in a browser or served with any static file server.

## Main Sections

### Header Navigation

The top header introduces the Arcana Commons identity and provides quick navigation to the forum boards, bilingual reader, thread index, and public-domain library. It also includes a theme toggle and a button for creating a new thread.

### Forum Notice

The notice strip explains the forum's editorial principle: discussions should focus on public-domain texts, bibliography, translation review, and reading notes. It reminds contributors to cite text sources before posting.

### Board Sidebar

The board sidebar organizes the forum into several primary areas:

- Public-domain texts: bibliography, editions, source links, and scanned material.
- Bilingual reading: translation review, terminology, and parallel text discussion.
- Research notes: reading notes, symbolic systems, and methodology.
- Site operations: rules, submissions, feature requests, and community maintenance.

### Thread Index

The thread index is the main discussion surface. It supports board filtering, search, sorting by latest activity, replies, or views, and opening a thread detail view. Seed threads model likely early conversations for the forum.

### Thread Detail View

Thread details open in a modal interface. Each thread shows its board, tag, author, body, existing replies, and a reply form. Replies are stored locally in the browser for prototype use.

### Public-Domain Library

The library list is a compact entry point into the text archive. Each item links into a secondary archive page for the selected work.

### Bilingual Reader

The reader panel presents short English and Chinese parallel passages. It currently includes examples for Hermetic and comparative mythology texts. A passage can be quoted into a new forum thread for discussion.

### Text Archive Pages

The secondary interface follows a document-index style inspired by early web bibliography sites. Each archive page includes:

- Title and subtitle.
- Date, category, status, and related forum board.
- Editorial overview.
- Primary text resources.
- Commentary resources.
- Bilingual sample passage.
- Actions to open the related board or quote the sample into a new thread.

### Composer

The composer modal allows users to create a new local thread. It includes title, board, and body fields. In this prototype, created threads are saved to `localStorage`.

## Files

- `index.html`: page structure, modals, navigation, and archive containers.
- `styles.css`: layout, typography, responsive behavior, light/dark themes, and archive styling.
- `script.js`: board rendering, search, sorting, thread interactions, reader switching, archive page rendering, and local persistence.

## Persistence

This prototype does not use a backend. User-created threads, replies, and theme preference are stored in browser `localStorage`.

## Next Steps

- Add real routing for board pages and text archive pages.
- Replace seed data with a backend database.
- Add user accounts and moderation roles.
- Add source metadata fields for copyright status, edition, page, and URL.
- Add paragraph-level bilingual alignment and glossary linking.
