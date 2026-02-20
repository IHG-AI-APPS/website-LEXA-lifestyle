"""
LEXA Hero Video V3 - Dark Luxury Theme
Dramatic architectural lighting, Savant-style panels, high-end cinema
"""

import os
import sys
import time
from datetime import datetime
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath('/app/backend'))
load_dotenv('/app/backend/.env')

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

# Master Style - Dark Luxury with Dramatic Architectural Lighting
MASTER_STYLE = """Ultra-luxury dark interior cinematography, dramatic architectural lighting, moody atmosphere with warm accent lights, high-end residential design, deep shadows with elegant light highlights, premium materials visible in soft glow, cinematic slow motion, museum-like sophistication, 8K photorealistic quality."""

# Refined Dark Luxury Clips
LUXURY_SHOTS = [
    {
        "name": "v3_01_dramatic_entrance",
        "prompt": "Dramatic luxury villa foyer at night, statement chandelier slowly illuminating, marble floors reflecting warm light, double-height ceiling with architectural uplighting, dark walls with accent lighting, designer console table with art piece, slow cinematic reveal, breathtaking first impression"
    },
    {
        "name": "v3_02_living_ambiance",
        "prompt": "Dark luxury living room with layered lighting activating, recessed ceiling lights creating warm pools of light, backlit onyx wall panel glowing amber, plush velvet furniture in shadows, fireplace with dancing flames, floor-to-ceiling windows showing city lights, moody sophisticated atmosphere"
    },
    {
        "name": "v3_03_savant_panel",
        "prompt": "Elegant Savant-style smart home control panel on dark wall, sleek glass touchscreen with amber interface glow, minimalist bezel design, hand approaching panel, lighting scenes changing in background, premium brushed metal frame, close-up detail shot, high-end home automation"
    },
    {
        "name": "v3_04_speaker_lounge",
        "prompt": "Audiophile listening room with dramatic lighting, high-end floor standing speakers in spotlight, acoustic panels on dark walls, premium turntable with warm glow, leather lounge chair, indirect amber ceiling lighting, vinyl collection visible, intimate luxury music space"
    },
    {
        "name": "v3_05_cinema_palace",
        "prompt": "Ultra-luxury private cinema room, plush theater seating in deep burgundy leather, starfield ceiling with twinkling lights, massive screen powering on with cinematic glow, acoustic fabric walls with LED strip accents, ambient floor lighting, popcorn machine in corner, Hollywood premiere atmosphere"
    },
    {
        "name": "v3_06_outdoor_gazebo",
        "prompt": "Luxury outdoor gazebo at twilight, elegant pergola with string lights, large outdoor television screen glowing, premium outdoor furniture with plush cushions, landscape lighting along stone pathways, infinity pool reflecting lights in background, palm trees silhouetted, resort-style living"
    },
    {
        "name": "v3_07_master_suite",
        "prompt": "Luxury master bedroom with motorized curtains opening to night cityscape, indirect cove lighting warming the space, designer bed with premium linens, bedside ambient lamps glowing, walk-in closet with museum lighting visible, intimate romantic atmosphere, penthouse luxury"
    }
]

OUTPUT_DIR = "/app/frontend/public/videos/hero-v3"
LOG_FILE = f"{OUTPUT_DIR}/generation_log.txt"

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] {message}"
    print(log_line)
    with open(LOG_FILE, "a") as f:
        f.write(log_line + "\n")

def generate_video(shot, api_key):
    name = shot["name"]
    full_prompt = f"{MASTER_STYLE}\n\n{shot['prompt']}"
    output_path = f"{OUTPUT_DIR}/{name}.mp4"
    
    log(f"Generating: {name}")
    log(f"Scene: {shot['prompt'][:80]}...")
    
    try:
        video_gen = OpenAIVideoGeneration(api_key=api_key)
        
        start_time = time.time()
        video_bytes = video_gen.text_to_video(
            prompt=full_prompt,
            model="sora-2",
            size="1280x720",
            duration=10,  # 10 seconds for more dramatic pacing
            max_wait_time=600
        )
        
        elapsed = time.time() - start_time
        
        if video_bytes:
            video_gen.save_video(video_bytes, output_path)
            log(f"SUCCESS: {name} ({elapsed:.1f}s)")
            return True
        else:
            log(f"FAILED: {name}")
            return False
            
    except Exception as e:
        log(f"ERROR: {name} - {str(e)}")
        return False

def main():
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    if not api_key:
        log("ERROR: EMERGENT_LLM_KEY not found")
        return
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    log("=" * 60)
    log("LEXA HERO V3 - DARK LUXURY THEME")
    log("Dramatic Architectural Lighting")
    log(f"Generating {len(LUXURY_SHOTS)} clips")
    log("=" * 60)
    
    results = []
    for i, shot in enumerate(LUXURY_SHOTS, 1):
        log(f"\n{'='*40}")
        log(f"CLIP {i}/{len(LUXURY_SHOTS)}")
        log(f"{'='*40}")
        
        success = generate_video(shot, api_key)
        results.append((shot["name"], success))
        
        if i < len(LUXURY_SHOTS):
            time.sleep(3)
    
    log("\n" + "=" * 60)
    log("GENERATION COMPLETE")
    log("=" * 60)
    
    for name, success in results:
        status = "✓" if success else "✗"
        log(f"  {status} {name}")
    
    success_count = sum(1 for _, s in results if s)
    log(f"\nTotal: {success_count}/{len(results)} clips generated")
    log(f"Output: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
