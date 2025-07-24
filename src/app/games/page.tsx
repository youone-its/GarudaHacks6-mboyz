'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/games/button';
import GameTabs from '@/components/games/GameTabs';
import ProfileCard from '@/components/games/ProfileCard';
import StreakModal from '@/components/games/StreakModal';

export default function Home() {
  const [showStreakModal, setShowStreakModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800">
      {/* Sticky Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-center">
            <div className="bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="flex items-center gap-8">
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Story</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Education</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Connect</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">About Us</a>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
                  Login
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Let's Push Your Rank and<br />
            be the Top Global...!!
          </h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <ProfileCard
            username="dharuv"
            level={5}
            xp={1062}
            country="Indonesia"
            streak={10}
            localRank={1}
            globalRank={22}
          />
        </motion.div>

        {/* Game Tabs and Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GameTabs />
        </motion.div>

        {/* Demo Streak Modal Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Button
            onClick={() => setShowStreakModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Show Streak Modal
          </Button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-slate-800 font-bold text-sm">IEEE</span>
              </div>
              <div>
                <div className="font-bold">Institut Teknologi Sepuluh Nopember</div>
                <div className="text-sm text-slate-300">IEEE Student Branch</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-slate-800 text-xs font-bold">⚡</span>
              </div>
              <span className="font-semibold">IEEE ITS STUDENT BRANCH</span>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            <a href="#" className="text-yellow-400 hover:text-yellow-300">Home</a>
            <a href="#" className="text-yellow-400 hover:text-yellow-300">About</a>
            <a href="#" className="text-yellow-400 hover:text-yellow-300">Events</a>
            <a href="#" className="text-yellow-400 hover:text-yellow-300">News</a>
            <a href="#" className="text-yellow-400 hover:text-yellow-300">Our Team</a>
          </div>

          {/* Social Media */}
          <div className="flex justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-slate-800 hover:bg-yellow-300"
            >
              ♪
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-slate-800 hover:bg-yellow-300"
            >
              <Youtube className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-slate-800 hover:bg-yellow-300"
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </footer>

      {/* Streak Modal */}
      <StreakModal
        isOpen={showStreakModal}
        onClose={() => setShowStreakModal(false)}
        streakDays={3}
      />
    </div>
  );
}