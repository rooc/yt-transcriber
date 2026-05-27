# Yotuscript

A YouTube video transcript viewer with bilingual support.

## Quick Start

```bash
# 1. Download Spanish transcript from YouTube
# Tell AI: "download VIDEO_ID" (requires yt-dlp + Firefox)

# 2. Tell AI to translate
# "translate new"
# AI asks: "How many grammar sentences? (3, 4, 5, or custom)"

# 3. Watch!
node server.js
```

Open http://localhost:9090

---

## Features

- **Watch YouTube videos** with synchronized transcripts
- **Dual-language view** (original + English translation)
- **Interactive vocabulary** - Hover words to see translations in tooltips, click to save them
- **Vocabular panel** - Collect and review saved words across all videos with translations and context
- **Grammar sentences** - 3-5 clickable grammar examples per video with explanations
- **Video summaries** - 2-4 sentence summaries in Spanish with original vocabulary
- **Statistics tracking** - Auto-tracks learned videos and total watch time
- **Drag and drop** transcripts between Available and Learned panels
- **Keyboard shortcuts** for quick playback control
- **Auto-synchronized** transcript scrolling

## Setup

```bash
node server.js
```

Open http://localhost:9090

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Pause/Play |
| `←` | Rewind 5s |
| `→` | Forward 5s |
| `D` | Toggle dual translation |
| `F` | Toggle fullscreen mode |
| `L` | Toggle learned status (resets progress) |
| `R` | Toggle segment repeat mode |
| `G` | Open first grammar sentence popup |
| `V` | Open first vocabular word popup |
| `?` | Show keyboard shortcuts reference |
| `Enter` | Replay current segment (in repeat mode) |
| `Esc` | Close popup / Exit fullscreen |

## Statistics

The app automatically tracks your learning progress:

- **📚 Videos Learned**: Counts when you mark a video as learned (press `L`)
- **⏱️ Watch Time**: Tracks actual viewing time in hours (starts when you play, stops when you pause)

Stats are displayed below the control buttons and persist across sessions.

## Grammar Sentences

Each video includes 3-5 grammar sentences that demonstrate B1+ Spanish structures:

- **Clickable tags** in the "Grammar sentences" panel
- **Full sentence** with English translation in popup
- **Brief explanation** of the grammar structure used
- Examples: subjunctive mood, compound tenses, relative clauses

## Vocabular Panel

Save words while watching to build your personal vocabulary collection:

- **Click any highlighted word** in the transcript to add it to the Vocabular panel
- **Removable tags** — each word has an X button to remove it
- **Click a tag** to open a popup with translation, part of speech, and context
- **Arrow keys** navigate between words when popup is open
- Words persist across sessions and are shared across all videos
- The panel auto-expands when you add your first word

## Video Summaries

Each video includes a **2-4 sentence summary** in Spanish:

- 📋 **Summary icon** next to video title
- **Click to open** popup with full summary
- Uses **original vocabulary** from the transcript
- Captures main ideas and key points
- Perfect for quick review before watching

## Adding Transcripts

### Method 1: yt-dlp (Recommended)

Tell the AI: `"download VIDEO_ID"` or `"dl VIDEO_ID"`

The AI will download Spanish auto-subtitles from YouTube and create a properly formatted transcript file.

**Requirements:**
- `yt-dlp` installed and in your PATH
- Firefox browser with cookies (for `--cookies-from-browser`)

### Method 2: Browser Extensions

Any extension that extracts YouTube transcripts will work. Copy the transcript and paste it into a new file in the `transcripts/` folder.

### Method 3: Manual

Create transcript files directly in `/transcripts/` folder:

```markdown
---
title: "Video Title"
source: "https://www.youtube.com/watch?v=VIDEO_ID"
---

**0:00** First line of transcript
**0:05** Second line
```

For sentence-by-sentence translation, create `VIDEO_ID_translation.md` with English text.

## AI Translation

The workflow uses AI directly via `OPENCODE.md`:

### Simple Steps:

1. **Download or add transcript** to `transcripts/` folder
2. **Tell AI**: "translate new"
3. **AI automatically creates**:
   - `VIDEO_ID_translation.md` — Full English translation
   - `vocab/VIDEO_ID_vocab.json` — Vocabulary with contextual translations

### What AI Does:

- ✅ Translates naturally (not word-for-word)
- ✅ Preserves speaker's tone and style
- ✅ Explains cultural references
- ✅ Extracts **multi-word phrases** (2-4 words) as primary vocabulary
- ✅ Creates **3-5 grammar sentences** with B1+ structures (you choose: 3, 4, 5, or custom)
- ✅ Writes **2-4 sentence summary** in Spanish using original vocabulary
- ✅ Provides contextual translations
- ✅ Excludes basic words, proper nouns, and English loanwords

### OPENCODE.md

The `OPENCODE.md` file contains all instructions for the AI. It specifies:
- File format and structure
- Translation guidelines
- Vocabulary extraction rules
- Word exclusions (A1-A2, proper nouns, etc.)

Just tell the AI to read it and translate!

## AI Commands

All operations are AI-driven through `OPENCODE.md`:

### Download
**Command:** `"download VIDEO_ID"` or `"dl VIDEO_ID"`

Downloads Spanish auto-generated subtitles from YouTube using yt-dlp and creates a properly formatted transcript file in `transcripts/VIDEO_ID.md`.

Requires: yt-dlp installed and in PATH, Firefox browser with cookies.

### Translate
**Command:** `"translate new"`

Translates all untranslated transcripts automatically.

### Check / Lint
**Command:** `"check files"` or `"lint"`

Validates and cleans up:
- Frontmatter completeness
- Orphaned files
- Empty translations  
- Vocabulary cleanup

### Manage Learned Videos

Drag and drop transcript tags between panels:
- **Available transcripts** → **Learned transcripts**: Mark as learned (resets progress)
- **Learned transcripts** → **Available transcripts**: Unmark as learned (resets progress)

Or use the `L` keyboard shortcut to toggle the current video.

### Merge Transcript Lines
**Command:** `"merge VIDEO_ID"` or `"merge lines VIDEO_ID"`

Merges short transcript lines into longer segments (80-120 characters per line) for better readability.

### Delete Transcript
**Command:** `"delete VIDEO_ID"` or `"remove VIDEO_ID"` (AI only)

Removes a transcript and all associated files (translation, vocab, progress, learned status). This operation is only available through AI commands, not via the web interface.

## Workflow

```bash
# 1. Download transcript from YouTube
# "download VIDEO_ID"  (requires yt-dlp)

# 2. Tell AI to translate and create files
# "translate new"
# AI asks: "How many grammar sentences? (3, 4, 5, or custom)"

# 3. Watch and learn!
node server.js
# - Hover or click highlighted words for vocabulary
# - Click words to save them to your Vocabular panel
# - Click grammar tags for explanations
# - Click summary icon for video overview
# - Press L to mark as learned
# - Track your stats automatically
```

---

## Project Structure

```
├── transcripts/          # Spanish transcript files (.md)
│   ├── VIDEO_ID.md
│   └── VIDEO_ID_translation.md
├── vocab/               # Vocabulary files (.json)
│   └── VIDEO_ID_vocab.json
├── grammar/             # Grammar sentences (.json)
│   └── VIDEO_ID_grammar.json
├── summary/             # Video summaries (.json)
│   └── VIDEO_ID_summary.json
├── data/                # App data and exclusion lists
│   ├── a1-a2.json      # Basic words to exclude
│   ├── proper-nouns.json # Names/countries to exclude
│   ├── manual-exclude.json # Manual exclusions
│   ├── learned.json    # Learned videos list
│   ├── progress.json   # Video progress positions
│   ├── stats.json      # Learning statistics
│   └── vocabular.json  # Saved vocabulary words
├── src/                 # Backend source code
│   ├── routes.js       # HTTP routes
│   ├── store.js        # Data access layer
│   └── config.js       # Configuration
├── public/              # Web UI files
│   ├── index.html
│   ├── style.css
│   └── js/
│       └── modules/      # Frontend modules
│           ├── api.js        # API calls
│           ├── grammar.js    # Grammar panel & modals
│           ├── keyboard.js   # Keyboard shortcuts
│           ├── learned.js    # Learned panel & drag-drop
│           ├── player.js     # YouTube player control
│           ├── state.js      # App state management
│           ├── stats.js      # Statistics tracking
│           ├── transcript.js # Transcript rendering
│           ├── utils.js      # Utility functions
│           ├── vocab.js      # Vocabulary tooltips
│           └── vocabular.js  # Vocabular panel
├── OPENCODE.md         # AI instructions (ALL operations)
└── server.js           # Entry point (web server only)
```

## License

MIT
