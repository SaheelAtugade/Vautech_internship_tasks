import React, { useEffect } from 'react'
import Header from './components/Header'
import MovieList from './components/MovieList'
import Form from './components/Form'
import { useMovieContext } from './contexts/MovieContext'

const App = () => {
  const {showForm, movies, setMovies} = useMovieContext()
  useEffect(() => {
    localStorage.setItem("movies",JSON.stringify(movies))
  }, [movies])
  
    return (
    <main>
      <Header/>
      <MovieList/>
      {showForm && <Form/>}
    </main>
  )
}

export default App