
import MovieCard from './MovieCard'
import { useMovieContext } from '../contexts/MovieContext'

const MovieList = () => {
  const {movies} = useMovieContext()
  
  
  return (
    <div className='movie-list'>
        {movies.map((movie)=>{
          return <MovieCard key={movie.id} movie={movie} />
        })}
    </div>
  )
}

export default MovieList