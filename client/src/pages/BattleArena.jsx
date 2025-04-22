import React, { useEffect, useState } from 'react';
import { getRoster } from '../utils/roster';
import axios from 'axios';
import { getBattleResult } from '../utils/typeLogic';

export default function BattleArena() {
  const [roster, setRoster] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [countdown, setCountdown] = useState(3);
  const [isBattleInProgress, setIsBattleInProgress] = useState(false);

  useEffect(() => {
    setRoster(getRoster());
    fetchEnemy();
  }, []);

  const fetchEnemy = async () => {
    const rand = Math.floor(Math.random() * 151) + 1;
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${rand}`);
    setEnemy({
      name: res.data.name,
      types: res.data.types.map(t => t.type.name),
      sprite: res.data.sprites.front_default
    });
  };

  const handleBattle = async () => {
    if (!selected || !enemy || !username) return;
    
    // Start the countdown
    setIsBattleInProgress(true);
    let count = 3;
    setCountdown(count);
    
    const countdownInterval = setInterval(() => {
      count -= 1;
      if (count === 0) {
        clearInterval(countdownInterval);
        setCountdown('Go!');
        // Trigger battle result after countdown
        startBattle();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const startBattle = async () => {
    // Battle logic and result after countdown
    const outcome = getBattleResult(selected.types, enemy.types);
    setResult(outcome);
    
    await axios.post('http://localhost:8080/api/battle-result', {
      username,
      userPokemon: selected.name,
      enemyPokemon: enemy.name,
      result: outcome,
      timestamp: new Date()
    });

    setIsBattleInProgress(false);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl text-black font-bold mb-4">Choose your Pokémon:</h2>

      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {roster.map((p, i) => (
          <button
            key={i}
            className={`bg-white p-4 rounded-lg shadow-lg w-48 flex flex-col items-center text-center border border-gray-200 ${selected?.name === p.name ? 'bg-blue-500 text-black' : ''}`}
            onClick={() => setSelected(p)}
          >
            <img src={p.sprite} alt={p.name} className="w-16 h-16 mb-2" />
            <span className="font-semibold text-lg">{p.name}</span>
            <p className="text-sm text-black">{p.types.join(', ')}</p>
          </button>
        ))}
      </div>

      {/* Divider Line with VS */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-24 border-t border-gray-300"></div>
        <span className="mx-4 font-bold text-lg">VS</span>
        <div className="w-24 border-t border-gray-300"></div>
      </div>

      {/* Enemy Pokemon */}
      {enemy && (
        <div className="bg-blue-300 p-4 rounded-lg shadow-lg w-48 mx-auto mb-4">
          <h3 className="font-semibold">{enemy.name}</h3>
          <p className="text-sm text-black">Types: {enemy.types.join(', ')}</p>
          <img src={enemy.sprite} alt={enemy.name} className="w-16 h-16 mx-auto mb-2" />
        </div>
      )}

      {/* Countdown & "Go!" display */}
      <div className="text-3xl font-bold text-black mb-4">
        {isBattleInProgress ? countdown : ''}
      </div>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
        onClick={handleBattle}
        disabled={isBattleInProgress}
      >
        Battle!
      </button>

      {result && (
        <div className="mt-4 text-lg font-bold text-black">
          Result: {result}
        </div>
      )}
    </div>
  );
}
