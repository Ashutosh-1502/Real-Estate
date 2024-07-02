import '../App.css';
import {FaSearch} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom'

function Navbar() {
    return (
        <>
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between max-w-7xl items-center mx-auto p-3'>
                <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
                    <span className='text-slate-500'>Real</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
                <form className='bg-slate-50 p-2 sm:p-3 rounded-md flex items-center'>
                    <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-80' />
                    <FaSearch className='text-slate-600'/>
                </form>
                <ul className='flex gap-4 sm:text-lg'>
                    <NavLink to='/' className='hidden md:inline text-slate-700 px-2 py-1'>Home</NavLink>
                    <NavLink to='/about-us' className='hidden md:inline text-slate-700 px-2 py-1'>About</NavLink>
                    <NavLink to='/auth/sign-in' className='text-slate-700 px-2 py-1'>Sign in</NavLink>
                </ul>
            </div>
        </header>
        <Outlet/>
        </>
    )
}

export default Navbar
