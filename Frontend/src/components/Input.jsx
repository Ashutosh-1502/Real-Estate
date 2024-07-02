import React from 'react'
import '../App.css';
function Input({label, type = "text" , placeholder , ...props} , ref) {
    return (
        <div>
            <h2>{label}</h2>
            <input type={type} placeholder={placeholder} className='w-full h-[37px] px-2 py-3 mt-1' ref={ref} {...props}/>
        </div>
    )
}

export default React.forwardRef(Input);
