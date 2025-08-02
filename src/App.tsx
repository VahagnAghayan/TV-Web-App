import React, { useState } from 'react';
import Error from './components/Error';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import FeaturedContent from './components/FeaturedContent';
import TrendingCarousel from './components/TrendingCarousel';
import { useMovieSelection } from './hooks/useMovieSelection';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { sortedMovies, selectedMovie, selectMovie, featuredMovie, loading, error } = useMovieSelection();

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <div className="relative min-h-screen bg-black">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`transition-transform duration-300 ${sidebarOpen ? '' : 'ml-24'}`}>
        <FeaturedContent selectedMovie={selectedMovie} featuredMovie={featuredMovie} />
        <TrendingCarousel movies={sortedMovies} onMovieClick={selectMovie} />
      </div>
    </div>
  );
}

export default App;
