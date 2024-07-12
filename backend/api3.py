import subprocess
from flask import Flask, request, jsonify
from instagrapi import Client
from shazamio import Shazam
import os
import base64
from requests import post, get
import json
from dotenv import load_dotenv
from moviepy.editor import *
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
cl = Client()
cors = CORS(app, resources={r"/extract-audio": {"origins": "http://localhost:5173"}})


client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
user_id = os.getenv("USER_ID")


# Get Token for access through client id and client secret
def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token


# Get AuthHeader from token
def get_auth(token):
    return {"Authorization": "Bearer " + token}


# Get the track link from track name
def get_tracks(token, track_name):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth(token)
    query = f"?q={track_name}&type=track&limit=1"
    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)
    song_details = {
        "track_name": json_result["tracks"]["items"][0]["name"],
        "artist_name": json_result["tracks"]["items"][0]["artists"][0]["name"],
        "album_name": json_result["tracks"]["items"][0]["album"]["name"],
        "track_img": json_result["tracks"]["items"][0]["album"]["images"][2],
        "duration": convertMillis(json_result["tracks"]["items"][0]["duration_ms"]),
        "track_link": json_result["tracks"]["items"][0]["external_urls"]["spotify"],
    }
    try:
        return song_details
    except:
        return "Sorry, Can't find this Song"


def convertMillis(milli):
    seconds = (milli / 1000) % 60
    minutes = (milli / (1000 * 60)) % 60

    return f"{int(minutes)}:{int(seconds)}"


# Extract audio from video URL
def extract_audio_from_video_url(video_url, output_dir):
     video = VideoFileClip(video_url)
     audio_file = os.path.join(output_dir, "audio.mp3")
     video.audio.write_audiofile(audio_file)
     return audio_file


directory = "/audio"
os.makedirs(directory, exist_ok=True)


@app.route("/extract-audio", methods=["POST"])
async def extract_audio():
    data = request.get_json()
    video_url = data.get("url")

    if not video_url:
        return jsonify({"error": "URL is required"}), 400

    media_code = cl.media_pk_from_url(video_url)
    js = cl.media_info(media_code).dict()
    js_resour = js["resources"]
    videourl_dict = [i["video_url"] for i in js_resour]

    shazam = Shazam()
    track_record = []

    for video_url in videourl_dict:
        audio_file = extract_audio_from_video_url(video_url, directory)
        out = await shazam.recognize(audio_file)
        try:
            track_record.append(out["track"]["share"]["subject"])
        except:
            print("This song not found")
            continue
        finally:
            os.remove(audio_file)

    token = get_token()
    track_details = [get_tracks(token, track) for track in track_record]

    return jsonify({"trackDetails": track_details})


if __name__ == "__main__":
    app.run(debug=True)
