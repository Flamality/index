import React, { useState } from "react";
import "./Header.css";
import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineReddit,
  AiOutlineSpotify,
  AiOutlineTikTok,
  AiOutlineYoutube,
} from "react-icons/ai";
import { RiBlueskyLine, RiSteamLine } from "react-icons/ri";
import MediaBadge from "./MediaBadge/MediaBadge";
import { IoChevronDown } from "react-icons/io5";

export default function Header() {
  const [linksOpen, setLinksOpen] = useState(false);

  const toggleLinks = () => {
    setLinksOpen(!linksOpen);
  };
  return (
    <header className='landing-header'>
      <h1>FLAMALITY</h1>
      <p>WEB DEVELOPER</p>

      <div className='media-row'>
        <MediaBadge
          Badge={AiOutlineYoutube}
          link='https://youtube.com/@UrFlamality'
        />
        <MediaBadge
          Badge={AiOutlineTikTok}
          link='https://tiktok.com/@Flamality'
        />
        <MediaBadge
          Badge={AiOutlineInstagram}
          link='https://instagram.com/UrFlamality'
        />
        <MediaBadge
          Badge={AiOutlineGithub}
          link='https://github.com/Flamality'
        />
      </div>

      <div className='link-wrapper'>
        <div className={`links ${linksOpen ? "open" : ""}`}>
          <MediaBadge
            Badge={RiBlueskyLine}
            link='https://flamality.bsky.social'
          />
          <MediaBadge
            Badge={AiOutlineSpotify}
            link='https://open.spotify.com/user/31gm6tbymdb75iqcrmwml65g3ute'
          />
          <MediaBadge
            Badge={RiSteamLine}
            link='https://steamcommunity.com/id/Flamality/'
          />
          <MediaBadge
            Badge={AiOutlineReddit}
            link='https://reddit.com/user/UrFlamality'
          />
        </div>
        <IoChevronDown
          className='chevron'
          onClick={toggleLinks}
          style={{ transform: linksOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
    </header>
  );
}
