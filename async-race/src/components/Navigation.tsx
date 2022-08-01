import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="navigation">
      <button className="button middle-btn-yellow">
        <Link to="/" className="nav-span">
          TO GARAGE
        </Link>
      </button>
      <button className="button middle-btn-yellow">
        <Link to="/about">TO WINNERS</Link>
      </button>
    </nav>
  );
}
