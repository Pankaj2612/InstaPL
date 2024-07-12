import React from "react";
import { useLocation } from "react-router-dom";


export default function Track() {
  const location = useLocation();
  const { trackDetails } = location.state || { trackDetails: [] };

  return (
    <div className="bg-gradient-to-br from-slate-500 to-gray-900">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Playlist"
            className="w-32 h-32 mr-4 mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white"> Playlist</h1>
            <p className="text-gray-400">{trackDetails.length}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-xl shadow-zinc-700">
          <div className="grid grid-cols-5 sm:grid-cols-6 text-gray-400 mb-2 font-semibold">
            <div className="text-center">#</div>
            <div className="col-span-2">Title</div>
            <div className="hidden sm:block">Album</div>
            <div className="text-right">Duration</div>
          </div>
          {trackDetails.length > 0 ? (
            trackDetails.map((track, index) => (
              <a href={track.track_link}>
                <div
                  key={index}
                  className="grid grid-cols-5 sm:grid-cols-6 items-center text-white py-2 hover:bg-gray-700 rounded-md">
                  <div className="text-center">{index + 1}</div>
                  <div className="col-span-2 flex items-center space-x-4">
                    <img
                      src={
                        track.track_img.url || "https://via.placeholder.com/150"
                      }
                      alt={`${track.track_name} thumbnail`}
                      className="w-12 h-12"
                    />
                    <div>
                      <p className="text-white">{track.track_name}</p>
                      <p className="text-gray-400">{track.artist_name}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block">{track.album_name}</div>
                  <div className="text-right">{track.duration}</div>
                </div>
              </a>
            ))
          ) : (
            <p className="text-white text-center py-4">No tracks found</p>
          )}
        </div>
      </div>
    </div>
  );
}
