import React from 'react';
import { getRoster, removeFromRoster } from '../utils/roster';
import { useNavigate } from 'react-router-dom';

export default function Roster() {
  const roster = getRoster();
  const navigate = useNavigate();

  const handleRemoveFromRoster = (pokemon) => {
    removeFromRoster(pokemon);
    navigate('/roster'); // Refresh the page after removal
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Your Pokémon Roster</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {roster.map((pokemon, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg w-48 flex flex-col items-center text-center border border-gray-200"
          >
            <img src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16 mb-2" />
            <span className="font-semibold text-lg">{pokemon.name}</span>
            <p className="text-sm text-gray-500">{pokemon.types.join(', ')}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
              onClick={() => handleRemoveFromRoster(pokemon)}
            >
              Remove from Roster
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
