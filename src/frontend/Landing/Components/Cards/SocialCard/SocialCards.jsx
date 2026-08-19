import React from "react";

import styles from "./SocialCard.module.css";
import {
  FaBluesky,
  FaGithub,
  FaInstagram,
  FaReddit,
  FaSpotify,
  FaSteam,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

export default function SocialCards() {
  return (
    <div className={styles.wrapper}>
      <SocialCard
        handle="@UrFlamality"
        icon={<FaInstagram />}
        link="https://instagram.com/UrFlamality"
      />
      <SocialCard
        handle="@flamality.com"
        icon={<FaBluesky />}
        link="https://bsky.app/profile/flamality.com"
      />
      <SocialCard
        handle="Remi :3"
        icon={<FaSpotify />}
        link="https://open.spotify.com/user/31gm6tbymdb75iqcrmwml65g3ute"
      />
      <SocialCard
        handle="Flamality"
        icon={<FaSteam />}
        link="https://steamcommunity.com/id/Flamality/"
      />
      <SocialCard
        handle="Flamality"
        icon={<FaReddit />}
        link="https://reddit.com/user/UrFlamality"
      />

      <SocialCard
        handle="@Flamality"
        icon={<FaTiktok />}
        link="https://tiktok.com/@Flamality"
      />
      <SocialCard
        handle="@UrFlamality"
        icon={<FaYoutube />}
        link="https://youtube.com/@UrFlamality"
      />
      <SocialCard
        handle="Flamality"
        icon={<FaGithub />}
        link="https://github.com/Flamality"
      />
    </div>
  );
}

function SocialCard({ handle, icon, link }) {
  return (
    <div className={styles.card} onClick={() => window.open(link, "_blank")}>
      <div className={styles.icon}>{icon}</div>
      <p className={styles.title}>{handle}</p>
    </div>
  );
}
