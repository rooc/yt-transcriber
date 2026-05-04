# YT-trans

A YouTube video transcript viewer with bilingual support.

## Quick Start (Obsidian Clipper)

```bash
# 1. Clip YouTube video with Obsidian Clipper → saves to transcripts/

# 2. Rename file to video ID
mv transcripts/Video\ Title.md transcripts/VIDEO_ID.md

# 3. Generate files (fast, free)
node server.js translate --free

# 4. Optional: Get better AI translations
node server.js vocab-ai
# → Copy VOCAB_AI_PROMPT.md to AI (ChatGPT, Claude, Qwen3.5 Plus)
# → Save JSON response
# → Apply: node server.js vocab-ai-apply response.json

# 5. Watch!
node server.js
```

Open http://localhost:7070

**Not using opencode-go?** See [FOR_NON_OPENCODE_USERS.md](FOR_NON_OPENCODE_USERS.md)

---

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

### Method 1: Obsidian Clipper (Recommended)

1. **Install Obsidian Clipper** browser extension
   - [Chrome Web Store](https://chromewebstore.google.com/detail/obsidian-web-clipper)
   - [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/obsidian-web-clipper/)

2. **Configure Clipper** (first time only):
   - Open extension settings
   - Set **Vault location** to this project folder
   - Set **Folder** to `transcripts`

3. **Clip YouTube video**:
   - Open YouTube video
   - Click Obsidian Clipper extension icon
   - Click **Clip** (uses default template with title + URL)

4. **Rename file** to video ID:
   ```bash
   mv transcripts/Video\ Title.md transcripts/VIDEO_ID.md
   ```

### Obsidian Clipper Template

Create this template in Obsidian for automatic frontmatter:

```markdown
---
title: "{{title}}"
source: "{{url}}"
created: {{date}}
---

{{content}}
```

---

### Method 2: Manual

Place transcript files in `/transcripts/` folder:

```markdown
---
title: "Video Title"
source: "https://www.youtube.com/watch?v=VIDEO_ID"
---

**0:00** · First line of transcript
**0:05** · Second line
```

---

For sentence-by-sentence translation, create `VIDEO_ID_translation.md` with English text.

## Commands

### Translate (Fast, Free)
```bash
# Clean transcripts + generate vocab with translate-shell
node server.js translate --free
```

**What it does:**
- Cleans transcript markdown
- Creates translation placeholders (`*_translation.md`)
- Generates vocabulary with translate-shell (literal translations)

**Time:** ~1 minute  
**Cost:** Free (requires `translate-shell` installed)

---

### Vocab AI (Better Quality - Manual)
```bash
# Step 1: Generate AI prompt
node server.js vocab-ai

# Step 2: Copy VOCAB_AI_PROMPT.md to AI
# - ChatGPT: https://chat.openai.com
# - Claude: https://claude.ai
# - Qwen3.5 Plus: opencode run --model "opencode-go/qwen3.5-plus"

# Step 3: Save AI JSON response as ai-response.json

# Step 4: Apply translations
node server.js vocab-ai-apply ai-response.json
```

**What it does:**
- Generates formatted AI prompt with all words
- You manually get AI translations (better quality)
- Applies contextual translations with part-of-speech

**Time:** ~5 minutes (includes manual step)  
**Cost:** $0 (use free AI tiers or your subscription)

---

### Vocab Auto (Semi-Automated AI)
```bash
node server.js vocab-auto
```

**What it does:**
- Generates AI prompt
- Gives instructions for opencode-go users

**Time:** ~5 minutes  
**Cost:** $0 (opencode-go subscription)

### Vocab AI (Manual 2-step)
Run `node server.js vocab-ai` to generate prompt, then `node server.js vocab-ai-apply <file.json>` to apply.

### Translate (automated, free)
Run `node server.js translate` to:
- Clean transcript markdown
- Generate missing vocabulary files (`vocab/VIDEO_ID_vocab.json`)
- Add rough machine translations for vocabulary words (via translate-shell)
- Create translation placeholders if missing

**Note:** This produces rough word translations for quick lookup.

### Lint
Run `node server.js lint` to check and clean up transcripts:

- **Frontmatter validation** - Ensures title and source fields are present
- **Orphaned files** - Finds vocab/translation files without matching transcripts
- **Empty translations** - Identifies translation files that need actual content
- **Vocabulary cleanup** - Removes A1-A2 level words from vocab files

### Vocab (update only)
Run `node server.js vocab` to update vocabulary files only (skip cleaning/translation placeholders).

## Translation Methods

| Command | What it does | Quality | Time | Cost |
|---------|--------------|---------|------|------|
| **`translate --free`** | Clean + shell vocab | ⭐⭐⭐ | 1 min | Free |
| **`vocab-ai`** | Generate AI prompt | ⭐⭐⭐⭐⭐ | 5 min | $0 |
| **`vocab-auto`** | Semi-auto AI | ⭐⭐⭐⭐⭐ | 5 min | $0 |

**Recommended workflow:**
1. Run `translate --free` for quick setup
2. Run `vocab-ai` for better AI translations (optional)
