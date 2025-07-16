// 
import React, { useState } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('batman'); // Default search term
  
  return (
    <div className="container mx-auto p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MovieList searchTerm={searchTerm} />
    </div>
  );
};

export default Main;