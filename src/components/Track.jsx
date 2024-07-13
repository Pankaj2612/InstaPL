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
          <div className="hidden sm:grid grid-cols-5 sm:grid-cols-6 text-gray-400 mb-2 font-semibold ">
            <div className="text-center">#</div>
            <div className="col-span-2 ">Title</div>
            <div className="hidden sm:block">Album</div>
            <div className="text-right">Duration</div>
          </div>
          {trackDetails.length > 0 ? (
            trackDetails.map((track, index) => (
              <a href={track.track_link}>
                <div
                  key={index}
                  className="grid grid-cols-5 sm:grid-cols-6  items-center text-white py-2 hover:bg-gray-700 rounded-md">
                  <div className="text-center hidden sm:block">{index + 1}</div>
                  <div className="col-span-4 sm:col-span-2 flex items-center space-x-4">
                    <img
                      src={
                        track.track_img.url || "https://via.placeholder.com/150"
                      }
                      alt={`${track.track_name} thumbnail`}
                      className="w-12 h-12"
                    />
                    <div>
                      <p className="text-white text-left">{track.track_name}</p>
                      <p className="text-gray-400">{track.artist_name}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block">{track.album_name}</div>
                  <div className="text-right sm:text-right">
                    <span className="hidden sm:inline">{track.duration}</span>
                    <span className="sm:hidden">
                      <svg
                        className="w-[26px] h-[26px] text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="3"
                          d="M12 6h.01M12 12h.01M12 18h.01"
                        />
                      </svg>
                    </span>
                  </div>
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
