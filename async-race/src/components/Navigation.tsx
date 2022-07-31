import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="navigation">
      <button className="button nav-btn">
        <Link to="/" className="nav-span">
          TO GARAGE
        </Link>
      </button>
      <button className="button nav-btn">
        <Link to="/about">TO WINNERS</Link>
      </button>
    </nav>
  );
}
