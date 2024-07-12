from instagrapi import Client
from shazamio import Shazam
import os
from moviepy.editor import *
import asyncio


cl = Client()

def extract_audio_from_video_url(video_url, output_dir):

    video = VideoFileClip(video_url)
    audio_file = os.path.join(output_dir, "aduio.mp3")
    video.audio.write_audiofile(audio_file)

    return audio_file

directory = "H:/Web development/React + Vite Projects/Insta_Reel_Backend/backend/audio"
media_code = cl.media_pk_from_url('https://www.instagram.com/p/CxX3K-It3d_/?igsh=MWRoZWplbXF0ejY1NQ==')
js = cl.media_info(media_code).dict()
js_resour = js['resources']
videourl_dict = []
for i in js_resour:
    videourl_dict.append(i['video_url'])



track_name_list = []

async def main():
  shazam = Shazam()
  for video_url in videourl_dict:
        audio_file = extract_audio_from_video_url(video_url, directory)
        out = await shazam.recognize(audio_file)
        try:
            track_name_list.append(out['track']['share']['subject'])
        except:
            print("This song not found")
            continue
        finally:   
            os.remove(audio_file)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())

