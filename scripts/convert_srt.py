#!/usr/bin/env python3
"""
Convert YouTube SRT subtitles to project markdown format.

Usage:
    python3 scripts/convert_srt.py /path/to/video.es.srt [output.md]

Features:
- Preserves millisecond timestamps
- Strips bracketed descriptions like [música], [risas]
- Merges short lines into natural segments
"""

import re
import sys
import os

def parse_srt(content):
    """Parse SRT content into timed lines."""
    pattern = r'(\d+)\s*\n(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*\d{2}:\d{2}:\d{2},\d{3}\s*\n((?:[^\n]+\n?)+)'
    entries = re.findall(pattern, content)
    
    lines = []
    for entry in entries:
        hours = int(entry[1])
        mins = int(entry[2])
        secs = int(entry[3])
        ms = int(entry[4])
        
        start_time = hours * 3600 + mins * 60 + secs + ms / 1000
        
        # Clean text: remove bracketed descriptions
        text = entry[5].strip().replace('\n', ' ')
        text = re.sub(r'\[[^\]]+\]', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        
        if text:
            lines.append((start_time, text))
    
    return lines

def merge_lines(lines, max_length=120):
    """Merge short lines into natural segments."""
    merged = []
    current_text = ""
    start_time = None
    
    for time, text in lines:
        if start_time is None:
            start_time = time
            current_text = text
        elif len(current_text) + len(text) + 1 < max_length:
            current_text += " " + text
        else:
            merged.append((start_time, current_text))
            start_time = time
            current_text = text
    
    if current_text:
        merged.append((start_time, current_text))
    
    return merged

def format_timestamp(seconds):
    """Format seconds as M:SS.mmm or H:MM:SS.mmm."""
    hours = int(seconds // 3600)
    mins = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    ms = int((seconds % 1) * 1000)
    
    if hours > 0:
        return f"{hours}:{mins:02d}:{secs:02d}.{ms:03d}"
    else:
        return f"{mins}:{secs:02d}.{ms:03d}"

def convert_srt_to_markdown(srt_path, output_path=None, title=None, source_url=None):
    """Convert SRT file to project markdown format."""
    with open(srt_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = parse_srt(content)
    merged = merge_lines(lines)
    
    # Extract video ID from filename if no source URL provided
    if not source_url:
        video_id = os.path.basename(srt_path).split('.')[0]
        if '_' in video_id:
            video_id = video_id.split('_')[0]
        source_url = f"https://www.youtube.com/watch?v={video_id}"
    
    # Build output
    output = f"---\ntitle: {title or 'Transcript'}\nsource: {source_url}\n---\n\n"
    
    for time, text in merged:
        output += f"**{format_timestamp(time)}** {text}\n"
    
    # Write output
    if not output_path:
        base = os.path.splitext(srt_path)[0]
        output_path = base + '.md'
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"Created {output_path} with {len(merged)} lines")
    return output_path

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 convert_srt.py <input.srt> [output.md]")
        sys.exit(1)
    
    srt_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None
    
    convert_srt_to_markdown(srt_path, output_path)
