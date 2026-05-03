# YT-trans

A YouTube video transcript viewer with bilingual support.

## Features

- Watch YouTube videos with synchronized transcripts
- Toggle dual-language view (original + English translation)
- Keyboard shortcuts for playback control
- Hover transcript to see vocabulary translation

## Setup

```bash
node server.js
```

Open http://localhost:7070

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Pause/Play |
| `←` | Rewind 10s |
| `S` | Sync video to transcript |
| `D` | Toggle dual translation |
| `F` | Toggle fullscreen mode |
| `L` | Mark video as learned |

## Adding Transcripts

Place transcript files in `/transcripts/` folder:

```markdown
---
title: "Video Title"
source: "https://www.youtube.com/watch?v=VIDEO_ID"
---

**0:00** · First line of transcript
**0:05** · Second line
```

For sentence-by-sentence translation, create `VIDEO_ID_translation.md` with English text.

## Commands

### Translate (automated)
Run `node server.js translate` to:
- Clean transcript markdown
- Generate missing vocabulary files (`vocab/VIDEO_ID_vocab.json`)
- Add rough machine translations for vocabulary words
- Create translation placeholders if missing

**Note:** This produces rough word translations for quick lookup. For high-quality sentence translations, see `TRANSLATE.md`.

### Lint
Run `node server.js lint` to check and clean up transcripts:

- **Frontmatter validation** - Ensures title and source fields are present
- **Orphaned files** - Finds vocab/translation files without matching transcripts
- **Empty translations** - Identifies translation files that need actual content
- **Vocabulary cleanup** - Removes A1-A2 level words from vocab files

## Translation Systems

This project has two complementary translation systems:

1. **`node server.js translate`** — Automated. Generates vocabulary files with rough word translations (good for hover tooltips, not perfect).

2. **`TRANSLATE.md`** — AI guide. For creating high-quality sentence-by-sentence English translations of full transcripts. Produces `VIDEO_ID_translation.md` files with fluent, contextual translations.

Use both: run the JS command for quick vocab setup, then ask an AI to create proper sentence translations via the guide in `TRANSLATE.md`.
