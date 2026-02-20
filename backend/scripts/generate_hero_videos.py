"""
LEXA Hero Video Generation Script
Using Sora 2 to create ultra-premium cinematic clips
"""

import os
import sys
import time
from datetime import datetime
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath('/app/backend'))
load_dotenv('/app/backend/.env')

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

# Master Style DNA - Prepended to all prompts
MASTER_STYLE = """Ultra-premium cinematic architectural film, European luxury design studio style, Scandinavian minimalism meets Italian high-end interior aesthetics. Slow camera movements, soft natural lighting, warm shadows, museum-like atmosphere. Photorealistic 8K quality, shallow depth of field, volumetric light rays, realistic reflections on marble and glass. Minimalist modern interiors with luxury materials: marble, walnut wood, brushed brass. Mood: calm, confident, elite, emotionally rich. No people talking. High-net-worth lifestyle. Architectural cinematography. Film grain. Leica lens look. Design award winner aesthetic."""

# 7 Shot Prompts
SHOTS = [
    {
        "name": "01_arrival",
        "prompt": "Modern luxury villa entrance at dusk, architectural lighting softly illuminating stone walls and glass facade, slow cinematic dolly forward toward entrance door, warm ambient lights, minimalist landscaping, high-end European architecture, ultra realistic, 8K, cinematic depth of field, calm luxury mood"
    },
    {
        "name": "02_interior_reveal", 
        "prompt": "Wide interior reveal of luxury smart home living room, layered lighting activating gently, marble floors, walnut wood walls, designer furniture, sheer curtains opening automatically, slow push-in camera movement, Scandinavian minimalist luxury interior, cinematic lighting, photorealistic"
    },
    {
        "name": "03_detail_obsession",
        "prompt": "Extreme close-up shots of brushed brass lighting fixture, marble texture, wood grain, smart lighting turning on softly, reflections on glass, shallow depth of field, slow motion, luxury product cinematography, European design studio aesthetic"
    },
    {
        "name": "04_technology_art",
        "prompt": "Luxury smart home wall control panel close-up, finger gently activating lighting scene, ambient lights changing mood, premium automation interface, modern interior background, cinematic lighting, minimal design, ultra realistic"
    },
    {
        "name": "05_home_cinema",
        "prompt": "High-end private home cinema room, plush leather recliner seats, indirect ceiling lighting, acoustic wall panels, large cinematic screen glowing softly, luxury atmosphere, slow camera pan, architectural lighting design, ultra realistic"
    },
    {
        "name": "06_silhouette",
        "prompt": "Silhouetted architect and client walking through luxury interior showroom, discussing design, soft backlighting, minimal gestures, slow motion, elegant body language, high-end lifestyle, cinematic shadows"
    },
    {
        "name": "07_finale_hero",
        "prompt": "Exterior night shot of modern luxury villa, architectural lighting glowing warmly, reflections in glass, calm dark sky, slow pull back camera movement, ultra premium cinematic look, minimal composition"
    }
]

OUTPUT_DIR = "/app/frontend/public/videos/hero"
LOG_FILE = "/app/frontend/public/videos/hero/generation_log.txt"

def log(message):
    """Log to file and print"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] {message}"
    print(log_line)
    with open(LOG_FILE, "a") as f:
        f.write(log_line + "\n")

def generate_video(shot, api_key):
    """Generate a single video clip"""
    name = shot["name"]
    full_prompt = f"{MASTER_STYLE}\n\n{shot['prompt']}"
    output_path = f"{OUTPUT_DIR}/{name}.mp4"
    
    log(f"Starting generation: {name}")
    log(f"Prompt: {shot['prompt'][:100]}...")
    
    try:
        # Create fresh instance for each generation
        video_gen = OpenAIVideoGeneration(api_key=api_key)
        
        start_time = time.time()
        video_bytes = video_gen.text_to_video(
            prompt=full_prompt,
            model="sora-2",
            size="1280x720",   # HD Widescreen cinematic
            duration=12,       # 12 seconds per clip
            max_wait_time=900  # 15 min timeout for quality
        )
        
        elapsed = time.time() - start_time
        
        if video_bytes:
            video_gen.save_video(video_bytes, output_path)
            log(f"SUCCESS: {name} saved ({elapsed:.1f}s)")
            return True
        else:
            log(f"FAILED: {name} - No video bytes returned")
            return False
            
    except Exception as e:
        log(f"ERROR: {name} - {str(e)}")
        return False

def main():
    """Generate all hero video clips"""
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    if not api_key:
        log("ERROR: EMERGENT_LLM_KEY not found in environment")
        return
    
    log("=" * 60)
    log("LEXA HERO VIDEO GENERATION - STARTING")
    log(f"Total clips to generate: {len(SHOTS)}")
    log("=" * 60)
    
    results = []
    for i, shot in enumerate(SHOTS, 1):
        log(f"\n--- CLIP {i}/{len(SHOTS)} ---")
        success = generate_video(shot, api_key)
        results.append((shot["name"], success))
        
        # Small delay between clips
        if i < len(SHOTS):
            time.sleep(5)
    
    # Summary
    log("\n" + "=" * 60)
    log("GENERATION COMPLETE - SUMMARY")
    log("=" * 60)
    
    for name, success in results:
        status = "OK" if success else "FAILED"
        log(f"  {name}: {status}")
    
    success_count = sum(1 for _, s in results if s)
    log(f"\nTotal: {success_count}/{len(results)} clips generated")
    log(f"Output directory: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
