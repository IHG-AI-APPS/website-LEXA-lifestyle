import sys
import os
sys.path.insert(0, os.path.abspath(''))
from dotenv import load_dotenv
load_dotenv('/app/backend/.env')

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

def generateVideo(prompt, output_path, model="sora-2", size="1792x1024", duration=8):
    """Generate video with Sora 2"""
    video_gen = OpenAIVideoGeneration(api_key=os.environ['EMERGENT_LLM_KEY'])
    video_bytes = video_gen.text_to_video(
        prompt=prompt,
        model=model,
        size=size,
        duration=duration,
        max_wait_time=600
    )
    if video_bytes:
        video_gen.save_video(video_bytes, output_path)
        return output_path
    return None

prompt = """Cinematic slow dolly shot through a luxury smart home in Dubai at night. 
Camera glides from an expansive open-plan living room with warm ambient lighting, 
past a floor-to-ceiling window revealing a dramatic city skyline with golden lights. 
Sleek modern furniture in neutral tones, subtle LED strip lighting along walls and ceiling, 
a large curved TV screen displaying abstract art. The scene feels calm, expensive, and intimate. 
Dark moody atmosphere with warm golden accents. Ultra high quality, 4K cinematic, shallow depth of field, 
film grain, anamorphic lens flare. No people visible."""

output = '/app/frontend/public/videos/hero-v3/hero_luxury_home.mp4'
print(f"Starting video generation...")
result = generateVideo(prompt, output)
print(f"Result: {result}" if result else "FAILED")
