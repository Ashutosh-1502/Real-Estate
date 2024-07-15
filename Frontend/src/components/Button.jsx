import React from 'react'

function Button({ label, className = "",onClick = null }) {
  return (
    <div>
      <button onClick={onClick} className={`${className} hover:opacity-70 transition-all duration-150 hover:ease-in active:scale-95`}>{label}</button>
    </div>
  )
}

export default Button;
