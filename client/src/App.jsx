import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import BattleArena from './pages/BattleArena';
import Leaderboard from './pages/Leaderboard';
import Roster from './pages/Roster';

export default function App() {
  return (
    <>

        <Router>
          <div className="bg-gray-100 min-h-screen p-6">
            <nav className="flex justify-center space-x-4 mb-6">
              <Link to="/" className="text-blue-600 font-semibold">Home</Link>
              <Link to="/battle" className="text-red-600 font-semibold">Battle Arena</Link>
              <Link to="/roster" className="text-green-600 font-semibold">Roster</Link>
              <Link to="/leaderboard" className="text-yellow-600 font-semibold">Leaderboard</Link>
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/battle" element={<BattleArena />} />
              <Route path="/roster" element={<Roster />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </Router>

    </>
  );
}