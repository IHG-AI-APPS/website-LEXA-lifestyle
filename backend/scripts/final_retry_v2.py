"""Final retry for outdoor scenes"""
import os, sys, time
from datetime import datetime
from dotenv import load_dotenv
sys.path.insert(0, '/app/backend')
load_dotenv('/app/backend/.env')
from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

SHOTS = [
    {"name": "v2_07_pool_area", "prompt": "Cinematic luxury swimming pool at evening, blue underwater lights glowing, elegant poolside loungers, palm trees, warm ambient lighting along walkways, premium outdoor living space, slow pan, photorealistic"},
    {"name": "v2_08_home_exterior", "prompt": "Beautiful modern home exterior at twilight, warm window glow, elegant architectural design, landscaping with soft lighting, evening atmosphere, slow dolly shot, premium residential"}
]

OUTPUT = "/app/frontend/public/videos/hero-v2"
def log(m): 
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {m}")
    with open(f"{OUTPUT}/final_log.txt", "a") as f: f.write(f"{m}\n")

def gen(shot, key):
    try:
        v = OpenAIVideoGeneration(api_key=key)
        log(f"Starting: {shot['name']}")
        b = v.text_to_video(prompt=shot['prompt'], model="sora-2", size="1280x720", duration=8, max_wait_time=600)
        if b:
            v.save_video(b, f"{OUTPUT}/{shot['name']}.mp4")
            log(f"SUCCESS: {shot['name']}")
            return True
        log(f"FAILED: {shot['name']}")
        return False
    except Exception as e:
        log(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    key = os.environ.get('EMERGENT_LLM_KEY')
    for s in SHOTS:
        gen(s, key)
        time.sleep(3)
