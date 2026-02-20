"""
LEXA Hero Video V2 - Smart Home Automation Showcase
Focus on actual smart home features with dramatic cinematic quality
"""

import os
import sys
import time
from datetime import datetime
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath('/app/backend'))
load_dotenv('/app/backend/.env')

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

# Master Style DNA - Dramatic Smart Home Showcase
MASTER_STYLE = """Cinematic luxury smart home technology showcase, dramatic lighting, ultra-premium materials, slow elegant camera movements, shallow depth of field, warm golden hour atmosphere, photorealistic 8K quality, high-end residential interior design, architectural film style, professional product cinematography."""

# Smart Home Automation Scenes
SMART_HOME_SHOTS = [
    {
        "name": "v2_01_lights_on",
        "prompt": "Dramatic shot of luxury living room, elegant ceiling lights slowly turning on one by one, warm ambient glow filling the space, modern chandelier illuminating, recessed lights activating in sequence, high ceilings, marble floors reflecting light, slow cinematic reveal, evening atmosphere"
    },
    {
        "name": "v2_02_shades_open",
        "prompt": "Motorized window blinds slowly opening in luxury bedroom, morning sunlight gradually streaming in, sheer curtains gently moving, floor to ceiling windows revealing city skyline view, elegant bedroom interior, automated shade system, smooth mechanical movement, golden morning light"
    },
    {
        "name": "v2_03_tv_reveal",
        "prompt": "Large luxury television slowly rising from elegant cabinet in modern living room, screen powering on with soft glow, premium entertainment system reveal, walnut wood cabinetry, ambient backlighting activating, cinematic living space, dramatic product reveal shot"
    },
    {
        "name": "v2_04_speaker_system",
        "prompt": "High-end floor standing speakers in luxury music room, soft indicator lights glowing, premium audio equipment, acoustic panels on walls, vinyl record player nearby, warm ambient lighting, audiophile setup, elegant furniture, slow pan across premium sound system"
    },
    {
        "name": "v2_05_cinema_experience",
        "prompt": "Private home theater room transforming, ceiling lights dimming slowly, large projection screen lowering, comfortable leather recliners, starlight ceiling activating, acoustic wall panels, ambient LED strips glowing, cinematic atmosphere building, luxury entertainment space"
    },
    {
        "name": "v2_06_touch_panel",
        "prompt": "Elegant hand touching sleek wall-mounted smart home control panel, modern touchscreen interface glowing, room lights responding to touch, contemporary interior background, premium glass panel design, finger selecting lighting scene, subtle interface animations, luxury residential technology"
    },
    {
        "name": "v2_07_outdoor_living",
        "prompt": "Luxury outdoor terrace at sunset, landscape lighting activating along pathways, pool lights glowing blue, outdoor speakers visible, palm trees silhouetted, elegant outdoor furniture, infinity pool edge, warm evening sky, automated outdoor living space, slow revealing pan shot"
    },
    {
        "name": "v2_08_whole_home",
        "prompt": "Wide shot of modern luxury home at dusk, windows glowing warmly from inside, exterior architectural lighting turning on in sequence, smart home fully illuminated, contemporary villa design, evening transformation, dramatic establishing shot, premium residential exterior"
    }
]

OUTPUT_DIR = "/app/frontend/public/videos/hero-v2"
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
            duration=8,  # 8 seconds per clip for better pacing
            max_wait_time=600
        )
        
        elapsed = time.time() - start_time
        
        if video_bytes:
            video_gen.save_video(video_bytes, output_path)
            log(f"SUCCESS: {name} ({elapsed:.1f}s)")
            return True
        else:
            log(f"FAILED: {name} - No video returned")
            return False
            
    except Exception as e:
        log(f"ERROR: {name} - {str(e)}")
        return False

def main():
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    if not api_key:
        log("ERROR: EMERGENT_LLM_KEY not found")
        return
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    log("=" * 60)
    log("LEXA HERO VIDEO V2 - SMART HOME AUTOMATION")
    log(f"Generating {len(SMART_HOME_SHOTS)} clips")
    log("=" * 60)
    
    results = []
    for i, shot in enumerate(SMART_HOME_SHOTS, 1):
        log(f"\n{'='*40}")
        log(f"CLIP {i}/{len(SMART_HOME_SHOTS)}")
        log(f"{'='*40}")
        
        success = generate_video(shot, api_key)
        results.append((shot["name"], success))
        
        if i < len(SMART_HOME_SHOTS):
            time.sleep(3)
    
    # Summary
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
