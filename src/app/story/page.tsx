"use client";
import { useState, useEffect, useRef } from 'react';
import { StorySection } from '@/components/StorySection';
import { StoryNavigator } from '@/components/StoryNavigator';
import { storyChapters } from '@/lib/storyData';
import { useAudio } from '@/lib/useAudio';

function App() {
  const [currentSection, setCurrentSection] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  // State untuk backsound
  const backgroundVolume = 0.1;
  // const [backgroundMuted, setBackgroundMuted] = useState(false);
  const backsound = useAudio('/audio/backsound.m4a', true); // true = looping
  const narrationVolume = 10;
  const narration = useAudio(storyChapters[currentSection - 1].audioSrc, false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    narration.setVolume(narrationVolume);
    if (!showWelcome) {
      narration.stop();
      narration.play();
    } else {
      narration.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, showWelcome]);

  useEffect(() => {
    backsound.setVolume(backgroundVolume);
  }, [backgroundVolume, backsound]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (showWelcome) return;
      if (scrollTimeout.current) return;
      if (e.deltaY > 0 && currentSection < storyChapters.length) {
        setCurrentSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 1) {
        setCurrentSection((prev) => prev - 1);
      }
      scrollTimeout.current = window.setTimeout(() => {
        scrollTimeout.current = null;
      }, 500); // debounce 500ms
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    };
  }, [currentSection, showWelcome]);

  const handleSectionClick = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  const handleBeginStory = () => {
    setShowWelcome(false);
    backsound.play();
  };

  return (
    <div className="relative bg-black">
      {/* Story Sections */}
      <StorySection
        imageIndex={storyChapters[currentSection - 1].id}
        title={storyChapters[currentSection - 1].title}
        caption={storyChapters[currentSection - 1].caption}
      />

      {/* Story Navigator */}
      <StoryNavigator
        currentSection={currentSection}
        totalSections={storyChapters.length}
        onSectionClick={handleSectionClick}
      />

      {/* Welcome Overlay */}
      {showWelcome && (
        <div className="flex fixed inset-0 z-30 justify-center items-center backdrop-blur-sm welcome-overlay bg-black/60">
          <div className="p-8 mx-auto max-w-md text-center text-white">
            <h1 className="mb-4 text-3xl font-bold">Cerita Yazid</h1>
            <p className="mb-6 text-gray-300">
              Ikuti perjalanan Yazid menemukan kembali budaya Indonesia melalui NusaLoka.
            </p>
            <button
              onClick={handleBeginStory}
              className="px-6 py-3 font-medium bg-blue-600 rounded-lg transition-all duration-300 transform hover:bg-blue-700 hover:scale-105"
            >
              Mulai Cerita
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;