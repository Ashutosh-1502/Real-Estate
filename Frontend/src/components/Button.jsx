import React from 'react'

function Button({label , className = "" , logo = ""}) {
  return (
    <div>
      <button className={className}>{logo}{label}</button>
    </div>
  )
}

export default Button;
