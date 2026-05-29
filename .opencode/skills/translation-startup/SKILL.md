---
name: translation-startup
description: "Automatically loaded when the yotuscript project opens. Reads OPENCODE.md and establishes translation context."
version: 1.0.0
---

# Yotuscript Startup

Read translation instructions and establish context at the start of every session.

## On Session Start

1. **Read `OPENCODE.md`** — Translation workflow and rules
2. **Read `data/a1-a2.json`** — Basic words exclusion list (first 50 lines)
3. **Check `transcripts/`** — List available transcript files

## After Reading

Ask user: "What would you like to do? (translate new, check files, merge lines, or something else)"

## Available Commands

- `translate new` — Translate all untranslated transcripts
- `check files` / `lint` — Validation and cleanup
- `merge VIDEO_ID` — Merge short transcript lines
- `delete VIDEO_ID` — Remove transcript and associated files
