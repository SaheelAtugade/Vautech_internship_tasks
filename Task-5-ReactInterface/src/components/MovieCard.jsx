import React from "react";
import Button from "./Button";
import { useMovieContext } from "../contexts/MovieContext";

const MovieCard = ({ movie }) => {
  const { id, title, desc, genre, watched } = movie;
  const { movies, setMovies } = useMovieContext();

  const toggleWatched = (watchId) => {
    const updatedMovies = movies.map((movie) => {
      if (watchId === movie.id) {
        return { ...movie, watched: !movie.watched };
      }
      return movie;
    });

    setMovies(updatedMovies);
  };

  const removeMovie = (deleteID) =>{
    const updatedMovies = movies.filter((movie)=>{
      return movie.id !== deleteID
    })
    setMovies(updatedMovies)
  }

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{desc}</p>
      <div className="genre-list">
        {genre.map((genre, idx) => {
          return (
            <div key={idx} className="genre">
              {genre}
            </div>
          );
        })}
      </div>

      <div className="btn-group">
        <button
          onClick={()=>{toggleWatched(id)}}
          style={
            watched ? { backgroundColor: "#393e41" } : { backgroundColor: "#e94f37" }
          }
        >
          {watched ? "watched" : "not watched"}
        </button>
        <Button onClick={()=>{removeMovie(id)}} btnText="remove" />
      </div>
    </div>
  );
};

export default MovieCard;
