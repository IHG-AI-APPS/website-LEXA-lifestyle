"""
LEXA Hero Video - Retry Failed Clips
Modified prompts to avoid moderation blocks
"""

import os
import sys
import time
from datetime import datetime
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath('/app/backend'))
load_dotenv('/app/backend/.env')

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

# Master Style DNA
MASTER_STYLE = """Ultra-premium cinematic architectural film, European luxury design studio style, Scandinavian minimalism meets Italian high-end interior aesthetics. Slow camera movements, soft natural lighting, warm shadows, museum-like atmosphere. Photorealistic 8K quality, shallow depth of field, volumetric light rays, realistic reflections on marble and glass. Minimalist modern interiors with luxury materials: marble, walnut wood, brushed brass. Mood: calm, confident, elite. Architectural cinematography. Film grain. Leica lens look. Design award winner aesthetic."""

# Retry clips with modified prompts (avoiding trigger words)
RETRY_SHOTS = [
    {
        "name": "03_material_details",
        "prompt": "Cinematic close-up of luxury interior materials, brushed brass light fixture detail, white marble surface texture, natural walnut wood grain, soft ambient lighting gently illuminating surfaces, reflections on polished glass, shallow depth of field, slow camera movement, luxury architectural photography style"
    },
    {
        "name": "04_smart_interface",
        "prompt": "Modern minimalist smart home control panel on elegant wall, person's hand touching sleek touchscreen interface, ambient room lighting subtly adjusting, contemporary interior design background, clean lines, premium materials, cinematic lighting, architectural interior film style"
    },
    {
        "name": "05_cinema_room",
        "prompt": "Elegant private screening room interior, comfortable designer seating arrangement, indirect ambient ceiling illumination, premium acoustic wall treatments, large display screen with soft glow, luxury residential entertainment space, slow cinematic camera pan, warm atmospheric lighting"
    },
    {
        "name": "07_night_exterior",
        "prompt": "Modern architectural villa exterior at night, warm interior lighting visible through large glass windows, elegant landscape lighting, contemporary minimalist design, calm evening sky, slow pull-back camera movement revealing full facade, premium residential architecture, cinematic composition"
    }
]

OUTPUT_DIR = "/app/frontend/public/videos/hero"
LOG_FILE = "/app/frontend/public/videos/hero/retry_log.txt"

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
        video_gen = OpenAIVideoGeneration(api_key=api_key)
        
        start_time = time.time()
        video_bytes = video_gen.text_to_video(
            prompt=full_prompt,
            model="sora-2",
            size="1280x720",
            duration=12,
            max_wait_time=600  # 10 min timeout
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
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    if not api_key:
        log("ERROR: EMERGENT_LLM_KEY not found")
        return
    
    log("=" * 60)
    log("LEXA HERO VIDEO RETRY - STARTING")
    log(f"Clips to retry: {len(RETRY_SHOTS)}")
    log("=" * 60)
    
    results = []
    for i, shot in enumerate(RETRY_SHOTS, 1):
        log(f"\n--- RETRY CLIP {i}/{len(RETRY_SHOTS)} ---")
        success = generate_video(shot, api_key)
        results.append((shot["name"], success))
        
        if i < len(RETRY_SHOTS):
            time.sleep(5)
    
    log("\n" + "=" * 60)
    log("RETRY COMPLETE - SUMMARY")
    log("=" * 60)
    
    for name, success in results:
        status = "OK" if success else "FAILED"
        log(f"  {name}: {status}")
    
    success_count = sum(1 for _, s in results if s)
    log(f"\nRetry Total: {success_count}/{len(results)} clips generated")

if __name__ == "__main__":
    main()
