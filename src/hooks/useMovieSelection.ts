import { useState, useEffect } from 'react';
import { Movie, FeaturedMovie } from '../types';
import axiosInstance from '../api/axiosInstance';

interface MovieData {
  Featured: FeaturedMovie;
  TrendingNow: Movie[];
}

export const useMovieSelection = () => {
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [featuredMovie, setFeaturedMovie] = useState<FeaturedMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get<MovieData>('/data.json');
        const { Featured, TrendingNow } = response.data;
        
        setFeaturedMovie(Featured);
        
        const lastViewedId = sessionStorage.getItem('lastViewedMovieId');
        
        if (lastViewedId) {
          const lastViewedMovie = TrendingNow.find(movie => movie.Id === lastViewedId);
          if (lastViewedMovie) {
            const otherMovies = TrendingNow.filter(movie => movie.Id !== lastViewedId);
            setSortedMovies([lastViewedMovie, ...otherMovies]);
          } else {
            setSortedMovies([...TrendingNow].sort((a, b) => 
              new Date(b.Date).getTime() - new Date(a.Date).getTime()
            ));
          }
        } else {
          setSortedMovies([...TrendingNow].sort((a, b) => 
            new Date(b.Date).getTime() - new Date(a.Date).getTime()
          ));
        }
      } catch (err) {
        setError('Failed to load movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const selectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    sessionStorage.setItem('lastViewedMovieId', movie.Id);
    const otherMovies = sortedMovies.filter(m => m.Id !== movie.Id);
    setSortedMovies([movie, ...otherMovies]);
  };

  return { sortedMovies, selectedMovie, selectMovie, featuredMovie, loading, error };
};
