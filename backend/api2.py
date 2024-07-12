from flask import Flask, request, jsonify
from instagrapi import Client
from shazamio import Shazam
import os
from moviepy.editor import *
import asyncio

app = Flask(__name__)
cl = Client()

def extract_audio_from_video_url(video_url, output_dir):
    video = VideoFileClip(video_url)
    audio_file = os.path.join(output_dir, "audio.mp3")
    video.audio.write_audiofile(audio_file)
    return audio_file

directory = "./audioo"
os.makedirs(directory, exist_ok=True)

@app.route('/extract-audio', methods=['POST'])
async def extract_audio():
    data = request.get_json()
    video_url = data.get('url')

    if not video_url:
        return jsonify({'error': 'URL is required'}), 400

    media_code = cl.media_pk_from_url(video_url)
    js = cl.media_info(media_code).dict()
    js_resour = js['resources']
    videourl_dict = [i['video_url'] for i in js_resour]

    shazam = Shazam()
    track_name_list = []

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

    return jsonify({'trackName': track_name_list if track_name_list else 'Not Found'})

if __name__ == '__main__':
    app.run(debug=True)
