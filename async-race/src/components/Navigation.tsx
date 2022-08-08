import React from 'react';
import { Link } from 'react-router-dom';

// const localPath = '/hopechka-JSFE2022Q1/async-race-build';
const localPath = '/';

export function Navigation() {
  return (
    <nav className="navigation">
      <button className="button middle-btn-yellow">
        <Link to={localPath} className="nav-span">
          TO GARAGE
        </Link>
      </button>
      <button className="button middle-btn-yellow">
        <Link to={`${localPath}/score`}>TO WINNERS</Link>
      </button>
    </nav>
  );
}
