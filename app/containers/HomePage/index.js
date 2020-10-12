/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
              Welcome to Mambaul uloom Family app
          </h1>
          <h2 className="subtitle">
              Come! become and member and reap benefits in both worlds
          </h2>
          <Link to="/register" className="button">Register</Link>
        </div>
      </div>
  </section>
  );
}
