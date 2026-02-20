"""
LEXA Hero V2 - Retry failed clips with simpler prompts
"""

import os
import sys
import time
from datetime import datetime
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath('/app/backend'))
load_dotenv('/app/backend/.env')

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

MASTER_STYLE = """Cinematic luxury interior, slow camera movement, warm lighting, premium design, photorealistic, architectural film."""

# Simplified retry prompts
RETRY_SHOTS = [
    {
        "name": "v2_03_display_screen",
        "prompt": "Modern living room with large wall-mounted display screen glowing softly, ambient lighting around the screen, elegant furniture, premium interior design, evening atmosphere, cinematic shot"
    },
    {
        "name": "v2_06_control_interface",
        "prompt": "Modern smart home control panel mounted on wall, sleek glass touchscreen with blue interface glow, contemporary interior background, minimal design, soft ambient lighting, close-up detail shot"
    },
    {
        "name": "v2_07_terrace_evening",
        "prompt": "Luxury outdoor terrace at golden hour, elegant garden lighting along stone pathway, pool with soft blue glow, outdoor lounge furniture, palm trees, beautiful sunset sky, slow pan shot"
    },
    {
        "name": "v2_08_villa_dusk",
        "prompt": "Modern luxury villa at dusk, warm glowing windows, architectural exterior lighting, contemporary design, evening sky with soft colors, slow revealing camera movement, establishing shot"
    }
]

OUTPUT_DIR = "/app/frontend/public/videos/hero-v2"
LOG_FILE = f"{OUTPUT_DIR}/retry_log.txt"

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
    
    try:
        video_gen = OpenAIVideoGeneration(api_key=api_key)
        
        start_time = time.time()
        video_bytes = video_gen.text_to_video(
            prompt=full_prompt,
            model="sora-2",
            size="1280x720",
            duration=8,
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
        log("ERROR: Key not found")
        return
    
    log("=" * 50)
    log("V2 RETRY - 4 CLIPS")
    log("=" * 50)
    
    results = []
    for i, shot in enumerate(RETRY_SHOTS, 1):
        log(f"\n--- CLIP {i}/4 ---")
        success = generate_video(shot, api_key)
        results.append((shot["name"], success))
        if i < len(RETRY_SHOTS):
            time.sleep(3)
    
    log("\n" + "=" * 50)
    for name, success in results:
        log(f"  {'✓' if success else '✗'} {name}")
    log(f"Success: {sum(1 for _, s in results if s)}/4")

if __name__ == "__main__":
    main()
