import React, { useState, useEffect } from 'react';
import { addToRoster } from '../utils/roster';
import axios from 'axios';
import SignUpModal from '../components/SignUpModal';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [roster, setRoster] = useState(JSON.parse(localStorage.getItem('roster')) || []);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const pokemons = [];
        for (let i = 1; i <= 151; i++) {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
          pokemons.push(res.data);
        }
        setPokemonList(pokemons);
      } catch (err) {
        console.error('Error fetching Pokémon list:', err);
      }
    };
    fetchPokemonList();
  }, []);

  const handleAddToRoster = (pokemon) => {
    addToRoster(pokemon);
    setRoster(JSON.parse(localStorage.getItem('roster')));
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Add Pokémon to Your Roster</h2>

      {!username && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowModal(true)}
        >
          Sign Up / Log In
        </button>
      )}

      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {pokemonList.map((pokemon, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg w-48 flex flex-col items-center text-center border border-gray-200"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-16 h-16 mb-2"
            />
            <span className="font-semibold text-lg">{pokemon.name}</span>
            <p className="text-sm text-gray-500">{pokemon.types.map(t => t.type.name).join(', ')}</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
              onClick={() => handleAddToRoster(pokemon)}
            >
              Add to Roster
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Your Roster</h3>
        <ul className="flex flex-wrap justify-center gap-6 mt-4">
          {roster.map((pokemon, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg w-48 flex flex-col items-center text-center border border-gray-200"
            >
              <img src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16 mb-2" />
              <span className="font-semibold text-lg">{pokemon.name}</span>
              <p className="text-sm text-gray-500">{pokemon.types.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>

      <SignUpModal
        showModal={showModal}
        setShowModal={setShowModal}
        setUsername={setUsername}
      />
    </div>
  );
}
