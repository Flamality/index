import React, { useContext, useEffect, useState } from 'react';
import {
  getCurrentSong,
  pauseSpotify,
  nextSpotify,
  prevSpotify,
} from '../../../services/spotify';

import './SpotifyController.css';
import { Auth } from '../../../contexts/auth';
import { FaChevronLeft } from 'react-icons/fa6';

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
        className="spotify-album-art"
        src={song?.album.images[0].url || "https://thecamerastore.com/cdn/shop/articles/GINAYEOLANDSCAPE-1_900x.jpg?v=1687296669"}
        alt="Album art"
        onClick={()=>{setMinimized(false)}}
      />
      <div className="spotify-song-info">
        <p className='spotify-song-name'>{song?.name || "Your Favorite Song"}</p>
        <p className='spotify-song-artist'>{song?.artists.map((a) => a.name).join(', ') || "The artist"}</p>

        <div className="spotify-progress-bar">
          <div
            className="spotify-progress-fill"
            style={{ width: `${progressPercent || 68}%` }}
          />
        </div>
        <p>
          {msToTime(progressMs)} / {msToTime(song?.duration_ms)}
        </p>
      </div>
<div className={`spotify-minimize ${minimized ? 'minimized' : ''}`} onClick={()=>{setMinimized(true)}}><FaChevronLeft /></div>
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
  return `${minutes || "0"}:${seconds < 10 ? '0' : ''}${seconds || "00"}`;
}
