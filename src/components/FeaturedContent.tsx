import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Movie, FeaturedMovie } from '../types';
import VideoPlayer from './VideoPlayer';

interface FeaturedContentProps {
  selectedMovie: Movie | null;
  featuredMovie: FeaturedMovie | null;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ selectedMovie, featuredMovie }) => {
  const [showVideo, setShowVideo] = useState(false);
  const movie = selectedMovie || featuredMovie;

  useEffect(() => {
    if (selectedMovie) {
      setShowVideo(false);
      const timer = setTimeout(() => {
        if (selectedMovie.VideoUrl) {
          setShowVideo(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedMovie]);

  const formatDuration = (seconds: string) => {
    const totalSeconds = parseInt(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (!movie) return null;

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <img 
          src={`/assets/${movie.CoverImage}`} 
          alt={movie.Title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>
      {showVideo && selectedMovie?.VideoUrl && (
        <VideoPlayer 
          videoUrl={selectedMovie.VideoUrl} 
          posterImage={`/assets/${selectedMovie.CoverImage}`}
        />
      )}
      <div className="relative z-10 flex flex-col justify-center h-full px-24">
        <p className="text-gray-300 text-sm font-medium tracking-[0.2em] mb-6">
          {movie.Category.toUpperCase()}
        </p> 
        <h1 className="text-white text-7xl font-bold mb-8 tracking-wider uppercase">
          {movie.Title}
        </h1>
        <div className="flex items-center gap-6 text-white text-lg mb-8">
          <span>{movie.ReleaseYear}</span>
          <span>{movie.MpaRating}</span>
          <span>{formatDuration(movie.Duration)}</span>
        </div>
        <p className="text-gray-200 text-xl leading-relaxed mb-10 max-w-2xl">
          Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.
        </p>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors">
            <Play className="w-6 h-6 fill-current" />
            Play
          </button>
          <button className="flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
