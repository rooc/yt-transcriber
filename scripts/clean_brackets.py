#!/usr/bin/env python3
"""
Clean bracketed descriptions from existing transcript files.

Usage:
    python3 scripts/clean_brackets.py
    python3 scripts/clean_brackets.py transcripts/specific_file.md
"""

import sys
import os
import re
import glob

DATA_ROOT = os.environ.get('YOTUSCRIPT_DATA', os.path.join(os.path.expanduser('~'), 'Sync', 'Data', 'yotuscript'))
TRANSCRIPTS_DIR = os.path.join(DATA_ROOT, 'transcripts')

def clean_file(filepath):
    """Remove bracketed descriptions from a transcript file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove bracketed descriptions like [música], [risas], etc.
    cleaned = re.sub(r'\s*\[[^\]]+\]', '', content)
    
    if cleaned != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(cleaned)
        print(f"Cleaned: {filepath}")
        return True
    else:
        print(f"No brackets found: {filepath}")
        return False

def clean_all_transcripts(transcripts_dir=TRANSCRIPTS_DIR):
    """Clean all markdown transcript files."""
    pattern = os.path.join(transcripts_dir, '*.md')
    files = glob.glob(pattern)
    
    cleaned_count = 0
    for filepath in files:
        if clean_file(filepath):
            cleaned_count += 1
    
    print(f"\nTotal files cleaned: {cleaned_count}")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        # Clean specific file
        clean_file(sys.argv[1])
    else:
        # Clean all transcripts
        clean_all_transcripts()
