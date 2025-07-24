import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StoryNavigatorProps {
  currentSection: number;
  totalSections: number;
  onSectionClick: (section: number) => void;
}

export const StoryNavigator: React.FC<StoryNavigatorProps> = ({
  currentSection,
  totalSections,
  onSectionClick,
}) => {
  const goToNext = () => {
    if (currentSection < totalSections) {
      onSectionClick(currentSection + 1);
    }
  };
  const goToPrev = () => {
    if (currentSection > 1) {
      onSectionClick(currentSection - 1);
    }
  };

  return (
    <>
      {/* Tombol mundur di atas */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center">
        <button
          onClick={goToPrev}
          disabled={currentSection === 1}
          className="bg-white/20 hover:bg-white/40 text-white rounded-full p-3 mb-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronUp className="w-8 h-8" />
        </button>
      </div>
      {/* Tombol maju di bawah */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center">
        <button
          onClick={goToNext}
          disabled={currentSection === totalSections}
          className="bg-white/20 hover:bg-white/40 text-white rounded-full p-3 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </>
  );
};