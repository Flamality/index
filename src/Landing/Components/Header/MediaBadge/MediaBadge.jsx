import React from "react";
import "./MediaBadge.css";
export default function MediaBadge({ Badge, link }) {
  return (
    <a href={link} target='__blank' className='landing-media-badge'>
      <Badge className='h-8 w-8 text-white transition-colors group-hover:text-white' />
    </a>
  );
}
