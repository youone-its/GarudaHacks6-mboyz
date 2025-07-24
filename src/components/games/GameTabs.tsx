'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MusicGame from './MusicGame';
import WordGame from './WordGame';
import MemoryFlip from './MemoryFlip';
import Leaderboard from './Leaderboard';

const games = [
  { id: 'rank', label: 'Rank', component: Leaderboard },
  { id: 'memory', label: 'Memory Flip', component: MemoryFlip },
  { id: 'words', label: 'Follow Words', component: WordGame },
  { id: 'music', label: 'Guess Music', component: MusicGame },
];

export default function GameTabs() {
  const [activeGame, setActiveGame] = useState('rank');

  const ActiveComponent = games.find(game => game.id === activeGame)?.component || Leaderboard;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Game Navigation Tabs */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
        <div className="flex gap-2 overflow-x-auto">
          {games.map((game) => (
            <motion.button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                activeGame === game.id
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {game.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Game Display Area */}
      <motion.div
        key={activeGame}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <ActiveComponent />
      </motion.div>
    </div>
  );
}