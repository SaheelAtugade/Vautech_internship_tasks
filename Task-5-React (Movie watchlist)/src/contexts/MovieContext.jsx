import React, { createContext, useContext, useState } from "react";

export const MovieDataContext = createContext();

const MovieContext = ({ children }) => {
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || [],
  );
  const [showForm, setShowForm] = useState(false);

  return (
    <MovieDataContext.Provider
      value={{ movies, setMovies, showForm, setShowForm }}
    >
      {children}
    </MovieDataContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieDataContext);
export default MovieContext;
