import React from 'react'
import { NavLink } from 'react-router-dom';

function Sign({ childComponent, type }) {
  return (
    <div className='grid sign-up lg:grid-cols-2 h-lvh'>
      <div className={`bg-slate-900 lg:flex justify-center pt-[35%] hidden text-white ${type === 'login' ? 'lg:order-2' : 'lg-order-1'}`}>
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
            <h1 className='lg:text-3xl text-xl mb-2 tracking-wider font-bold'>
              {`${type === 'sign-up' ? 'Create your Account Now' : 'Login to your Account'}`}
            </h1>
            <p className='text-slate-900'>
              {`${type === 'sign-up' ? `Already Have an Account` : "Don't Have an Account"}`}
              - <NavLink
                to={type === 'sign-up' ? '/auth/sign-in' : '/auth/sign-up'}
                className="text-blue-500 underline decoration-1 font-semibold"
              >
                {type === 'sign-up' ? 'login' : 'Sign up'}
              </NavLink>
            </p>
            {childComponent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sign;
