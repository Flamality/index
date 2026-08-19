import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="core-screen-404">
      <div className="core-screen-404-top">
        <p className="core-screen-404-header">ERROR</p>
        <p className="core-screen-404-subheader">
          Error loading page. Returned 404
        </p>
        <p className="core-screen-404-subheader">
          Error loading page. Returned 404
        </p>
        <p className="core-screen-404-subheader">
          Error loading page. Returned 404
        </p>
        <Link className="core-screen-404-back" to="/">
          Go home
        </Link>
      </div>
      <div className="core-screen-404-bottom">
        <p className="core-screen-404-subheader">
          UNEXPECTED ERROR... Error code: 404.
        </p>
        <p className="core-screen-404-subheader">
          {new Date().toLocaleString()} &gt;&gt; This isn't suppost to happen.
        </p>
      </div>
    </div>
  );
}
