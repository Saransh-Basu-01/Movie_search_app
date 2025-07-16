import React from "react";

const MovieCard = (props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-105 w-64 mt-10">
      <img
        src={props.poster !== "N/A" ? props.poster : "https://via.placeholder.com/256x384?text=No+Image"}
        alt={props.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-2">
        <h2 className="text-xl font-bold mb-2 truncate">{props.title}</h2>

        <p className="text-sm text-gray-600 mb-1">
          {props.year}
        </p>

        <p className="text-sm text-yellow-600 font-semibold mb-2">
          {props.rating}
        </p>

        <p className="text-sm text-gray-700">
         {props.plot}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;


