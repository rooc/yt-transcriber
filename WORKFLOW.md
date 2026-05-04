# Complete Workflow

## Quick Start

### 1. Add Transcript
```bash
# Place in transcripts/ folder and rename to video ID
mv "Video Title.md" transcripts/VIDEO_ID.md
```

### 2. Generate Files (Fast, Free)
```bash
# Clean transcript + create vocab with translate-shell
node server.js translate --free
```

### 3. Optional: Better AI Translations
```bash
# Generate AI prompt
node server.js vocab-ai

# Copy VOCAB_AI_PROMPT.md to AI (ChatGPT, Claude, Qwen3.5 Plus)
# Save JSON response as ai-response.json

# Apply translations
node server.js vocab-ai-apply ai-response.json
```

### 4. Watch
```bash
node server.js
```
Open http://localhost:7070

---

**That's it!**

**Commands:**
- `translate --free` — Quick setup (1 min, free)
- `vocab-ai` — Better AI translations (5 min, manual step)
- `vocab-auto` — Semi-automated AI for opencode-go users

---

## Obsidian Clipper Setup

1. Install extension (Chrome/Firefox)
2. Set vault to this project folder
3. Set folder to `transcripts`
4. Clip YouTube videos → auto-saves with title + URL
5. Rename: `mv "Video Title.md" VIDEO_ID.md`

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Pause/Play |
| `←` / `→` | Rewind 10s |
| `S` | Sync video |
| `D` | Dual translation |
| `F` | Fullscreen |
| `L` | Mark learned |

---

## Translation Methods

| Method | Quality | Time | Cost |
|--------|---------|------|------|
| `translate --free` | ⭐⭐⭐ | 1 min | Free |
| `vocab-ai` + AI | ⭐⭐⭐⭐⭐ | 5 min | $0 |

---

**Not using opencode-go?** See [FOR_NON_OPENCODE_USERS.md](FOR_NON_OPENCODE_USERS.md)

**Need help?** See [DOCS_SUMMARY.md](DOCS_SUMMARY.md)
