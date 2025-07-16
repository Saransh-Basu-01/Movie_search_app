// import React, { useState } from 'react'

// const SearchBar = ({searchTerm,setSearchTerm}) => {

//     const handleSearch=(e)=>{
//         e.preventDefault()
//     }

//   return (
//    <>
//     <form className="flex flex-col w-full gap-3 mt-10 sm:flex-row sm:w-auto"
//     onSubmit={handleSearch}>
//     <input
//       type="text"
//       placeholder="Write your task"
//        name="task"
//       required
//       className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  m-3 w-[300px] sm:w-[600px] sm:min-w-[250px]"
//       onChange={(e)=>setSearchTerm(e.target.value)}
//     />
//     <button
//     type="submit"
//       className="px-4 py-2 font-semibold text-white transition-colors duration-200 bg-blue-500 rounded-lg ml-3 w-[300px] sm:w-auto hover:bg-blue-600"
//     >
//       Search
//     </button>
//   </form>
//    </>
//   )
// }

// export default SearchBar
import React from 'react';
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    // No need to call setSearchTerm('') since the input is controlled
  };
  return (
    <div className='flex justify-center'>
    <form
      className="flex flex-col w-full gap-3 mt-10 sm:flex-row sm:w-auto"
      onSubmit={handleSearch}
      >
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-[400px]"
        required
        />
      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white transition-colors duration-200 bg-blue-500 rounded-lg w-full sm:w-auto hover:bg-blue-600"
        >
        Search
      </button>
    </form>
        </div>
  );
};

export default SearchBar;