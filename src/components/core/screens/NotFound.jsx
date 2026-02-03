import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="core-screen-404">
      <div className="core-screen-404-top">
        <p className="core-screen-404-header">404</p>
      </div>
      <div className="core-screen-404-bottom">
        <p className="core-screen-404-subheader">&gt;:&#40;</p>
        <Link className="core-screen-404-back" to="/">
          Go home
        </Link>
      </div>
    </div>
  );
}
