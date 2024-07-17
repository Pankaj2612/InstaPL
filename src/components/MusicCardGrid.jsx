import React from "react";
import MusicCard from "./MusicCard";
import { redirect, useLocation } from "react-router";
import axios from "axios";

export default function MusicCardGrid({ trackDetails }) {
  //handle Create playlist request
  const handleCreatePlaylist = async (e) => {
    const track_uri_list = trackDetails.map((track) => track.track_uri);
    console.log(track_uri_list);
    try {
      const response = await axios.post(
        "https://insta-reel-b-v1-0.onrender.com/create_playlist",
        {
          name: "New Playlist",
          description: "A playlist",
          uris: track_uri_list,
        }
      );

      const data = response.data;
      if (data.error) {
        console.log(`Error: ${data.error}`);
      } else {
        console.log("Success: Playlist created!");
        // Assuming you have a function to handle redirection
        // redirect(data.playlist_url);
        window.open(data.playlist_url, "_blank");
        console.log("Redirect to:", data.playlist_url);
      }
    } catch (error) {
      console.error("An error occurred.", error);
    }
  };

  // const location = useLocation();
  // const { trackDetails } = location.state || { trackDetails: [] };
  return (
    <main class="grid place-items-center min-h-screen bg-gradient-to-t from-blue-200 to-indigo-900 p-5">
      <div>
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 mb-5">
          Made for you
        </h1>
        <button
          onClick={handleCreatePlaylist}
          className="inline-block outline-none cursor-pointer text-xs sm:text-sm font-semibold leading-none border rounded-full transition-all duration-300 ease-in-out border-transparent letter-spacing-[2px] min-w-[160px] uppercase whitespace-normal text-center py-4 px-10 text-white bg-green-500 hover:bg-green-600 mb-2">
          Create Spotify Playlist
        </button>

        <section class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {trackDetails.map((track, index) => (
            <MusicCard key={index} track={track} />
          ))}
        </section>
      </div>
    </main>
  );
}
