#!/usr/bin/env python3
"""
Script to update all gold color references to new accent color scheme
"""
import os
import re

# Color mapping: old -> new
COLOR_MAP = {
    '#D4AF37': '#E8DCC8',  # Primary gold -> Soft champagne
    '#E8C974': '#F5EFE5',  # Light gold -> Very light accent
    '#B8941F': '#D4C4A8',  # Dark gold -> Darker accent
    '#d4a530': '#DCC8B0',  # Hover gold -> Accent hover
    'lexa-gold': 'accent',  # Tailwind class
    'lexa-gold-light': 'accent-light',
    'lexa-gold-dark': 'accent-dark',
    'bg-lexa-gold': 'bg-accent',
    'text-lexa-gold': 'text-accent',
    'border-lexa-gold': 'border-accent',
    'hover:bg-lexa-gold': 'hover:bg-accent',
    'hover:text-lexa-gold': 'hover:text-accent',
    'hover:border-lexa-gold': 'hover:border-accent',
    'ring-lexa-gold': 'ring-black',
    'focus:ring-lexa-gold': 'focus:ring-black',
}

# File extensions to process
EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css']

def should_process_file(filepath):
    """Check if file should be processed"""
    # Skip node_modules, .next, etc.
    skip_dirs = {'node_modules', '.next', 'dist', 'build', '.git'}
    
    for skip_dir in skip_dirs:
        if skip_dir in filepath:
            return False
    
    return any(filepath.endswith(ext) for ext in EXTENSIONS)

def update_colors_in_file(filepath):
    """Update color references in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes_made = 0
        
        # Replace each color mapping
        for old_color, new_color in COLOR_MAP.items():
            if old_color in content:
                count = content.count(old_color)
                content = content.replace(old_color, new_color)
                changes_made += count
        
        # Only write if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return changes_made
        
        return 0
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return 0

def main():
    """Main function to update all files"""
    frontend_dir = '/app/frontend'
    total_files = 0
    total_changes = 0
    updated_files = []
    
    print("🎨 Updating color scheme across the site...")
    print(f"Mapping:")
    for old, new in list(COLOR_MAP.items())[:5]:
        print(f"  {old} -> {new}")
    print(f"  ... and {len(COLOR_MAP) - 5} more")
    print()
    
    for root, dirs, files in os.walk(frontend_dir):
        for filename in files:
            filepath = os.path.join(root, filename)
            
            if should_process_file(filepath):
                changes = update_colors_in_file(filepath)
                if changes > 0:
                    total_files += 1
                    total_changes += changes
                    rel_path = os.path.relpath(filepath, frontend_dir)
                    updated_files.append((rel_path, changes))
                    print(f"✓ {rel_path}: {changes} changes")
    
    print()
    print(f"✅ Complete!")
    print(f"   Files updated: {total_files}")
    print(f"   Total changes: {total_changes}")
    
    if updated_files:
        print()
        print("📝 Top 10 files by changes:")
        for path, changes in sorted(updated_files, key=lambda x: x[1], reverse=True)[:10]:
            print(f"   {changes:3d} changes: {path}")

if __name__ == '__main__':
    main()
