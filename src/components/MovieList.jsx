// import React from 'react'
// import { useState, useEffect } from 'react'
// import MovieCard from './MovieCard'

// const MovieList = ({searchTerm}) => {
//   const [movies, setMovies] = useState([])
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const API_KEY = '2f51736e';

//   // useEffect(() => {
//   //     fetch(`https://www.omdbapi.com/?s=batman&apikey=${API_KEY}`).
//   //     then(res=>res.json())
//   //     .then(data=>{
//   //         setMovies(data.Search || [])
//   //         setLoading(false);
//   //     })
//   // }, [])
//   //  if (loading) return <p className="text-center">Loading movies...</p>;

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true)
//       setError(null)
//       try {
//         const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`);
//         const data = await response.json();
//         if (data.Response === 'True') {
//           setMovies(data.Search || []); // Corrected to data.Search
//         } else {
//           setError(data.Error || 'No movies found');
//           setMovies([]);
//         }
//       } catch (err) {
//         setError('Failed to fetch movies. Please try again later.');
//         setMovies([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (searchTerm.trim()) {
//       fetchMovies();
//     } else {
//       setLoading(false);
//       setMovies([]);
//     }
//   }, [searchTerm]);

//   if (loading) {
//     return <p className="text-center text-lg">Loading movies...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   if (movies.length === 0) {
//     return <p className="text-center">No movies found.</p>;
//   }
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {movies.map(movie => (
//         <MovieCard
//           key={movie.imdbID}
//           title={movie.Title}
//           poster={movie.Poster}
//           year={movie.Year}
//         />
//       ))}
//     </div>
//   )
// }
// export default MovieList
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '2f51736e'; // Use environment variable

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm.trim()) {
        setMovies([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`
        );
        const data = await response.json();
        if (data.Response === 'True') {
          // Fetch detailed movie data for ratings and plot
          const detailedMovies = await Promise.all(
            data.Search.map(async (movie) => {
              const detailResponse = await fetch(
                `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
              );
              const detailData = await detailResponse.json();
              return { ...movie, ...detailData };
            })
          );
          setMovies(detailedMovies);
        } else {
          setError(data.Error || 'No movies found for this search term.');
          setMovies([]);
        }
      } catch (err) {
        setError('Failed to fetch movies. Please check your network or try again later.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="text-center text-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        {error} Try a different search term.
      </p>
    );
  }

  if (movies.length === 0 && searchTerm.trim() === '') {
    return <p className="text-center text-gray-600">Please enter a search term to find movies.</p>;
  }

  if (movies.length === 0) {
    return <p className="text-center text-gray-600">No movies found for "{searchTerm}".</p>;
  }

  return (
  <div className="w-full flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl px-4">
    {movies.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        title={movie.Title}
        poster={movie.Poster}
        year={movie.Year}
        rating={movie.imdbRating}
        plot={movie.Plot}
      />
    ))}
  </div>
</div>
  );
};

export default MovieList;