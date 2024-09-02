import React, { useState } from "react";
import axios from "axios";
import MusicCardGrid from "./components/MusicCardGrid";
import Spinner from "./components/loading spinner/Loader";

export default function App() {
  const [url, setUrl] = useState("");
  const [trackData, settrackData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate(); // Access the history instance

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://insta-reel-b-v1-0.onrender.com/extract-audio",
        {
          url,
        }
      );
      const data = response.data;
      settrackData(data.trackDetails);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <>
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div  className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                InstaPL
              </span>
            </div>
            <div className="flex items-center lg:order-2">
              <a
                href="#"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                Log in
              </a>
              <a
                href="#"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Get started
              </a>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div>
        <div className="   mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative  isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm">
            <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Paste the link of the Instagram Reel to get Songs
            </p>

            <form onSubmit={handleSubmit}>
              <label
                className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                htmlFor="url">
                <input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste the link here"
                  name="q"
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">
                  <div className="flex items-center transition-all opacity-1">
                    <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                      Search
                    </span>
                  </div>
                </button>
              </label>
            </form>
            {loading && (
              <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="mt-40  sm:mt-52">
                  <Spinner />
                </div>
              </div>
            )}
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true">
              <circle
                cx="512"
                cy="512"
                r="512"
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"></circle>
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#3b82f6"></stop>
                  <stop offset="1" stopColor="#1d4ed8"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      {trackData.length > 0 && (
        <div className="min-h-screen bg-gray-900 text-white">
          <MusicCardGrid trackDetails={trackData} />
        </div>
      )}
      {/* Your other content goes here */}
      {/* <div className="relative isolate overflow-hidden bg-white  text-center sm:px-16 sm:shadow-sm">
        
        ) : (
          )}
          <Skeleton2 />
      </div> */}
    </>
  );
}
