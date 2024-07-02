import React from 'react'

function Button({label , className = "" , logo = "" , isLoading = false }) {
  return (
    <div>
      <button disabled = {isLoading} className={className}>{logo}{label}</button>
    </div>
  )
}

export default Button;
