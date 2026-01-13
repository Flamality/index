import React, { useContext, useEffect, useState } from "react";
import {
  getCurrentSong,
  pauseSpotify,
  nextSpotify,
  prevSpotify,
} from "../../../services/spotify";

import "./SpotifyController.css";
import { Auth } from "../../../contexts/auth";
import { FaChevronLeft } from "react-icons/fa6";

export default function SpotifyController() {
  const { connections } = useContext(Auth);
  const token = connections[0]?.token;
  const [song, setSong] = useState(undefined);
  const [progressMs, setProgressMs] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (!token) return;

    let interval;

    const fetchSong = async () => {
      const data = await getCurrentSong(token);

      if (data?.item) {
        setSong(data.item);
        setProgressMs(data.progress_ms);
        setIsPlaying(data.is_playing);
      } else {
        setSong(null);
      }
    };

    fetchSong();
    interval = setInterval(fetchSong, 2000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (!isPlaying) return;

    const progInterval = setInterval(() => {
      setProgressMs((prev) => {
        if (!song) return 0;
        const next = prev + 1000;
        return next > song.duration_ms ? song.duration_ms : next;
      });
    }, 1000);

    return () => clearInterval(progInterval);
  }, [isPlaying, song]);

  if (!token) return <></>;
  if (song === undefined) return <></>;
  if (song === null) return <></>;

  const progressPercent = (progressMs / song?.duration_ms) * 100;

  return (
    <div className={`spotify-controller ${minimized}`}>
      <img
        className='spotify-album-art'
        src={
          song?.album.images[0].url ||
          "https://thecamerastore.com/cdn/shop/articles/GINAYEOLANDSCAPE-1_900x.jpg?v=1687296669"
        }
        alt='Album art'
        onClick={() => {
          setMinimized(false);
        }}
      />
      <div className='spotify-song-info'>
        <div className='spotify-song-meta'>
          <p className='spotify-song-name'>
            {song?.name || "Your Favorite Song"}
          </p>
          <p className='spotify-song-artist'>
            {song?.artists.map((a) => a.name).join(", ") || "The artist"}
          </p>
        </div>

        <div className='spotify-progress-bar'>
          <div
            className='spotify-progress-fill'
            style={{ width: `${progressPercent || 68}%` }}
          />

          <div
            class='spotify-progress-fill-waves'
            // style={{
            //   height: `${progressPercent || 68}%`,
            // }}
            style={{
              clipPath: `polygon(
                ${progressPercent || 68}% 0, 
                ${progressPercent || 68}% 100%, 
                0 100%, 
                0 0
              )`,
            }}
          >
            <svg
              data-name='Layer 1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1200 120'
              preserveAspectRatio='none'
            >
              <g class='wave wave1'>
                <path
                  d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
                  opacity='.25'
                  class='shape-fill'
                ></path>
                <path
                  d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
                  opacity='.25'
                  class='shape-fill'
                ></path>
              </g>

              <g class='wave wave2'>
                <path
                  d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
                  opacity='.5'
                  class='shape-fill'
                ></path>
                <path
                  d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
                  opacity='.5'
                  class='shape-fill'
                ></path>
              </g>

              <g class='wave wave3'>
                <path
                  d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
                  opacity='.75'
                  class='shape-fill'
                ></path>
                <path
                  d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
                  opacity='.75'
                  class='shape-fill'
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <p className='spotify-time-info'>
          {msToTime(progressMs)}
          <span>{msToTime(song?.duration_ms)}</span>
        </p>
      </div>

      <div
        className={`spotify-minimize ${minimized ? "minimized" : ""}`}
        onClick={() => {
          setMinimized(true);
        }}
      >
        <FaChevronLeft />
      </div>
      {/* <div className="spotify-controls">
        <button onClick={() => prevSpotify(token)}>⏮️</button>
        <button
          onClick={() => pauseSpotify(token).then(() => setIsPlaying(false))}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={() => nextSpotify(token)}>⏭️</button>
      </div> */}
    </div>
  );
}

function msToTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes || "0"}:${seconds < 10 ? "0" : ""}${seconds || "00"}`;
}
