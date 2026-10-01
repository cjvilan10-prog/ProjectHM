import React, { useState } from 'react';
import { Play, Sparkles, Video, ExternalLink, RefreshCw } from 'lucide-react';

interface VideoPlayerProps {
  title?: string;
  description?: string;
  defaultVideoUrl?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title = 'Bikini Valley Resort Virtual Tour & Atmosphere',
  description = 'Immerse yourself in the tropical tranquility of Samara, Aringay, La Union. Experience our refreshing pools, ocean breeze, and cozy guest suites.',
  defaultVideoUrl = 'https://www.youtube-nocookie.com/embed/gU9yVq0qF_E?autoplay=1&mute=1&loop=1&playlist=gU9yVq0qF_E',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [customEmbedUrl, setCustomEmbedUrl] = useState(defaultVideoUrl);
  const [showConfig, setShowConfig] = useState(false);
  const [inputUrl, setInputUrl] = useState('');

  const handleApplyCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    let embed = inputUrl.trim();
    // Convert regular YouTube watch link to embed format
    if (embed.includes('watch?v=')) {
      const videoId = embed.split('watch?v=')[1]?.split('&')[0];
      if (videoId) embed = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    } else if (embed.includes('youtu.be/')) {
      const videoId = embed.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) embed = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    }

    setCustomEmbedUrl(embed);
    setIsPlaying(true);
    setShowConfig(false);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      {/* Video Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-teal-200">
          <Video className="w-3.5 h-3.5 text-teal-600" />
          Promotional Resort Tour
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
          {title}
        </h3>
        <p className="text-stone-600 text-sm md:text-base max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Main Video Frame */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-stone-950 border border-stone-200 aspect-video group">
        {!isPlaying ? (
          /* High-res Video Poster with Play Overlay */
          <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80"
              alt="Bikini Valley Resort Video Tour Preview"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-black/20" />

            {/* Play Button Pulsing */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                type="button"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-xl shadow-amber-500/30 transform transition-transform group-hover:scale-110 active:scale-95 pl-1"
                aria-label="Play resort tour video"
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 fill-stone-950 text-stone-950" />
              </button>
              <span className="mt-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white font-medium text-xs md:text-sm tracking-wide border border-white/20">
                Click to Watch Resort Preview
              </span>
            </div>

            {/* Bottom info badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs pointer-events-none">
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Samara, Aringay &bull; Tropical Coastline
              </span>
              <span className="hidden sm:inline-block bg-black/40 backdrop-blur-sm px-3 py-1 rounded-md text-stone-300">
                HD 1080p Video Experience
              </span>
            </div>
          </div>
        ) : (
          /* Live Responsive YouTube Embed */
          <div className="relative w-full h-full">
            <iframe
              src={customEmbedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-xs text-white backdrop-blur-sm transition-colors border border-white/20"
            >
              Close Video Player
            </button>
          </div>
        )}
      </div>

      {/* College Project Custom Video Embed Slot */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-200 font-semibold text-[10px] uppercase tracking-wider text-amber-950">
            Student Showcase
          </span>
          <span>
            Hospitality Management Project Video Embed Slot (Custom YouTube link supported)
          </span>
        </div>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2 flex items-center gap-1 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {showConfig ? 'Hide Config' : 'Change Video URL'}
        </button>
      </div>

      {/* Video URL Input Dropdown */}
      {showConfig && (
        <form onSubmit={handleApplyCustomVideo} className="mt-2 p-3 bg-white border border-stone-200 rounded-xl shadow-sm flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste YouTube video or embed link (e.g. https://www.youtube.com/watch?v=...)"
            className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs rounded-lg transition-colors"
            >
              Apply Link
            </button>
            <button
              type="button"
              onClick={() => {
                setCustomEmbedUrl(defaultVideoUrl);
                setInputUrl('');
                setShowConfig(false);
              }}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs rounded-lg"
            >
              Reset Default
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
