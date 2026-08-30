import React from 'react'
import Button from './Button'
import { useMovieContext } from '../contexts/MovieContext'

const Header = () => {  
  const {setShowForm} = useMovieContext()
  return (
    <div className='header'>
        <h2>Movies watchlist</h2>
        <Button onClick={()=>{setShowForm(true)}} btnText="Add movie"/>
    </div>
  )
}

export default Header