import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/leaderboard')
      .then(res => setLeaders(res.data));
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
      <table className="w-full text-left bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Username</th>
            <th className="p-2">Wins</th>
            <th className="p-2">Draws</th>
            <th className="p-2">Losses</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((l, i) => (
            <tr key={i} className="border-t">
              <td className="p-2 font-medium">{l.name}</td>
              <td className="p-2">{l.wins}</td>
              <td className="p-2">{l.draws}</td>
              <td className="p-2">{l.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}