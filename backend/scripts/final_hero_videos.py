"""
LEXA Hero Video - Final Retry with Simpler Prompts
"""

import os
import sys
import time
from datetime import datetime
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath('/app/backend'))
load_dotenv('/app/backend/.env')

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

MASTER_STYLE = """Cinematic architectural film, luxury design, slow camera movements, soft natural lighting, warm atmosphere, photorealistic, shallow depth of field, film grain, premium aesthetic."""

FINAL_SHOTS = [
    {
        "name": "03_details",
        "prompt": "Close-up shot of elegant interior design details, brass lamp, marble countertop, wooden furniture, soft warm lighting, luxury home interior, slow camera movement, cinematic quality"
    },
    {
        "name": "04_living_tech",
        "prompt": "Modern living room with ambient lighting, soft glow from windows, elegant furniture arrangement, clean minimalist design, slow pan across the space, warm evening atmosphere, premium residential interior"
    },
    {
        "name": "07_villa_night",
        "prompt": "Beautiful modern house at night, glowing windows, elegant architecture, slow camera revealing the building, warm ambient lighting, peaceful evening, premium residential exterior"
    }
]

OUTPUT_DIR = "/app/frontend/public/videos/hero"
LOG_FILE = "/app/frontend/public/videos/hero/final_log.txt"

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
    
    log(f"Starting: {name}")
    
    try:
        video_gen = OpenAIVideoGeneration(api_key=api_key)
        
        start_time = time.time()
        video_bytes = video_gen.text_to_video(
            prompt=full_prompt,
            model="sora-2",
            size="1280x720",
            duration=12,
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
    
    log("=" * 50)
    log("FINAL RETRY - 3 CLIPS")
    log("=" * 50)
    
    results = []
    for i, shot in enumerate(FINAL_SHOTS, 1):
        log(f"\n--- CLIP {i}/3 ---")
        success = generate_video(shot, api_key)
        results.append((shot["name"], success))
        if i < len(FINAL_SHOTS):
            time.sleep(3)
    
    log("\n" + "=" * 50)
    log("FINAL SUMMARY")
    for name, success in results:
        log(f"  {name}: {'OK' if success else 'FAILED'}")
    log(f"Success: {sum(1 for _, s in results if s)}/3")

if __name__ == "__main__":
    main()
