from dotenv import load_dotenv
import os
import base64
from requests import post
from requests import get
import json
from api import track_name_list

load_dotenv()

#Load env data
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
user_id = os.getenv("USER_ID")


#Get Token for access through client id and client secret
def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")
    
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization" : "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
    "grant_type": "client_credentials"
    }
    result = post(url,headers=headers,data=data)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token

#Get AuthHeader from token
def get_auth(token):
    return {"Authorization" : "Bearer " + token}

#Get the track link from track name
def get_tracks(token,track_name):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth(token)
    query = f"?q={track_name}&type=track&limit=1"
    query_url = url + query
    result = get(query_url,headers=headers) 
    json_result = json.loads(result.content)
    try:
        print(json_result["tracks"])#["items"][0]["external_urls"]["spotify"]
    except:
        print("Sorry, Can't find this Song")

    
token = get_token()

get_tracks(token,"winning speech")

