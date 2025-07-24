import React from 'react';

interface StorySectionProps {
  imageIndex: number;
  title: string;
  caption: string;
}

export const StorySection: React.FC<StorySectionProps> = ({
  imageIndex,
  title,
  caption,
}) => {
  // Render all videos, only show the active one
  const videos = Array.from({ length: 8 }).map((_, idx) => {
    const index = idx + 1;
    return (
      <video
        key={index}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
          imageIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        src={`/videos/vid${index}.mp4`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    );
  });

  return (
    <div className="flex overflow-hidden relative justify-center items-center min-h-screen">
      {/* Background Videos (all preloaded, only one visible) */}
      {videos}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 z-10" />
      {/* Indikator scene di kanan tengah */}
      <div className="flex fixed right-6 top-1/2 z-50 flex-col space-y-3 transform -translate-y-1/2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === imageIndex - 1
                ? 'bg-white scale-125'
                : 'bg-white/40'
            }`}
          />
        ))}
      </div>
      {/* Content */}
      <div className="relative z-20 px-6 mx-auto max-w-4xl text-center">
        {/* Dummy Character/Animation Image */}
        <div className="mb-8 story-image">
          <div
            className="flex justify-center items-center mx-auto w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-2xl md:w-80 md:h-80"
          >
            <div className="text-center text-white">
              <div className="flex justify-center items-center mx-auto mb-4 w-20 h-20 rounded-full bg-white/20">
                <span className="text-3xl font-bold">{imageIndex}</span>
              </div>
              <p className="text-sm font-medium">Scene {imageIndex}</p>
              <p className="text-xs opacity-75">Character Animation</p>
            </div>
          </div>
        </div>
        
        <div className="story-content">
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white story-title md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-200 story-caption md:text-xl">
            {caption}
          </p>
        </div>
        
        {/* Section Indicator */}
      </div>
      
      {/* Audio Playing Indicator */}
    </div>
  );
};