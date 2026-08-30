import React, { useState } from 'react'
import { useMovieContext } from '../contexts/MovieContext'

const Form = () => {
    const {movies, setMovies, setShowForm} = useMovieContext()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [genre, setGenre] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
        const genreArray = genre.split(/\s*,\s*/);
      
        setMovies([...movies,{id: Date.now(),title, desc, genre: genreArray,watched: false}])
        setShowForm(false)
        setTitle("")
        setDesc("")
        setGenre("")
        
    }
  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
            <div className="input-field">
                <label>Movie title:</label>
                <input type="text" name="title" id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} required/>
            </div>
            <div className="input-field">
                <label>Description:</label>
                <input type="text" name="description" id="description" value={desc} onChange={(e)=>{setDesc(e.target.value)}} required/>
            </div>
            <div className="input-field">
                <label>Genre: (seperated by comma)</label>
                <input type="text" name="genre" id="genre" value={genre} onChange={(e)=>{setGenre(e.target.value)}} required/>
            </div>
            <button type="submit">Add Movie</button>
        </form>
    </div>
  )
}

export default Form