import React from 'react'

function Button({ label, className = "" }) {
  return (
    <div>
      <button className={className}>{label}</button>
    </div>
  )
}

export default Button;
