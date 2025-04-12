// src/pages/Roster.jsx
import React, { useState, useEffect } from 'react';
import { removeFromRoster } from '../utils/roster';

export default function Roster() {
  const [roster, setRoster] = useState(JSON.parse(localStorage.getItem('roster')) || []);

  const handleDelete = (pokemon) => {
    removeFromRoster(pokemon);
    setRoster(JSON.parse(localStorage.getItem('roster')));
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Your Roster</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {roster.map((pokemon, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <img src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16" />
            <span>{pokemon.name}</span>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleDelete(pokemon)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
