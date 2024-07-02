import React from 'react'
import { NavLink } from 'react-router-dom';
import SignForm from './SignForm';

function Signup() {
  return (
    <div className='grid lg:grid-cols-2 h-lvh'>
      <div className=' bg-slate-900 lg:flex justify-center pt-[35%] hidden text-white'>
        <div className='w-[70%]'>
          <h1 className='lg:text-4xl mb-2 font-bold'>
            RealEstate
          </h1>
          <p>With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home. ... With 35+ filters and custom keyword search, Trulia can help you easily find a home or apartment for rent that you'll love. ...</p>
        </div>
      </div>
      <div className='flex flex-col lg:pt-[5%]'>
        <div className='flex flex-col lg:justify-center items-center mt-8'>
          <div className='text-slate-900 lg:w-[60%] w-[90%] lg:mt-0 mt-7 lg:text-left'>
            <h1 className='lg:text-3xl text-xl mb-2 tracking-wider font-bold'>Create your Account Now </h1>
            <p className='text-slate-900'>Already Have an Account - <span className='text-blue-500 underline decoration-1 font-semibold'><NavLink to='/auth/sign-in'>Sign in</NavLink></span></p>
            <SignForm/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
