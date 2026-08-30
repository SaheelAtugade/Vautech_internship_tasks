import React from 'react'

const Button = ({btnText, onClick, watched}) => {
  return (
    <button  onClick={onClick}>
        {btnText}
    </button>
  )
}

export default Button