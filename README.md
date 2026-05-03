# YT-trans

A YouTube video transcript viewer with bilingual support.

## Features

- Watch YouTube videos with synchronized transcripts
- Toggle dual-language view (original + English translation)
- Keyboard shortcuts for playback control
- Hover transcript to see translation

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

For translation, create `VIDEO_ID_translation.md` with English text.

## Commands

### Translate
Run `node server.js translate` to auto-generate missing translations and vocabulary files.

### Lint
Run `node server.js lint` to check and clean up transcripts:

- **Video availability** - Checks if videos still exist on YouTube
- **Frontmatter validation** - Ensures title and source fields are present
- **Orphaned files** - Finds vocab/translation files without matching transcripts
- **Empty translations** - Identifies translation files that need actual content
- **Vocabulary cleanup** - Removes A1-A2 level words from vocab files
