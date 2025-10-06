import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='core-screen-404'>
      <p className='core-screen-404-header'>404</p>
      <p className='core-screen-404-subheader'>
        Couldn't find the page you we're looking for.
      </p>
      <Link className='core-screen-404-back' to='/'>
        Go home
      </Link>
    </div>
  );
}
