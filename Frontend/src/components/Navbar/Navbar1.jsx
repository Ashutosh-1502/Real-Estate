'use client'

import React, {useState, useRef, useEffect} from 'react';
import {Outlet, NavLink, Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {GiHamburgerMenu} from "react-icons/gi";
import {RxCross1} from "react-icons/rx";
import {RiArrowDropDownLine} from "react-icons/ri";
import './Navbar.css';
import api from "../../services/API_Handling.js";
import {signOutSuccess} from "../../Redux/userSlice.js";

const menuItems = [
    {
        name: 'Buy',
        to: '/',
    },
    {
        name: 'Rent',
        to: '/about-us',
    },
    {
        name: 'Sell',
        to: '/contact-us',
    },
    {
        name: 'Home Loans',
        to: '/home-loans',
    },
    {
        name: 'Find an Agent',
        to: '/find-agent',
    }
]

const profileMenu = [
    {
        name: 'Saved Homes',
        links: '/'
    },
    {
        name: 'Saved Searches',
        to: '/'
    },
    {
        name: 'Your Home',
        to: '/'
    },
    {
        name: 'Account Setting',
        to: '/',
    }
]

export default function Navbar1() {
    const userData = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = React.useState(false);
    const [hoverLink, setHoverLink] = useState(false);
    const [hoverProfile, setHoverProfile] = useState(false);
    const manageProfileRef = useRef();
    const [openRentalMenu, setOpenRentalMenu] = React.useState(false);
    const location = useLocation();
    const Navigate = useNavigate();
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    }
    const handleResponsiveMenuOpen = () => {
        setOpenRentalMenu(!openRentalMenu);
    }
    const handleSignOut = async () => {
        const response = await api.get('/api/auth/signOut');
        if (!response.data.error) {
            dispatch(signOutSuccess());
            Navigate('/');
        }
    }
    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (manageProfileRef.current && !manageProfileRef.current.contains(event.target)) {
                setHoverProfile(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    return <>
        {/*Navbar*/}
        <nav className='flex p-4 bg-transparent shadow-lg md:justify-evenly items-center justify-between'
             onMouseLeave={() => setHoverLink(false)}>
            <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
                <span className='text-slate-500'>Real</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
            <div className='md:flex lg:gap-12 md:gap-7 font-semibold lg:ms-10 hidden'>
                {menuItems.map((item, i) =>
                    (<NavLink to={item.to} key={i}
                              className='lg:text-[18px] md:text-md text-sm'>{item.name}</NavLink>))}
            </div>
            <div className='flex font-semibold gap-7 items-center'>
                <div className='md:block hidden relative transition
                 duration-1000 ease-out hover:cursor-pointer lg:text-[17px] md:text-md text-sm'
                     onMouseEnter={() => setHoverLink(true)}
                >Manage Rentals
                    {hoverLink &&
                        <div
                            onMouseEnter={() => setHoverLink(true)}
                            className='h-[200px] bg-slate-50 absolute top-[47px] right-[1px] w-[220%] z-10 border-2
                             shadow-md rounded-lg'>
                            <h2 className='p-3 font-bold'>Rental Management System</h2>
                            <div className='p-3 flex flex-col text-blue-500'>
                                <Link to='/' className='hover:underline'>My Listings</Link>
                                <Link to='/' className='hover:underline'>Message</Link>
                            </div>
                            <hr className='bg-slate-300 h-[1.5px] w-[80%] mx-auto'/>
                        </div>
                    }
                </div>
                <Link to="/help" className='md:block hidden lg:text-[17px] md:text-md text-sm'>Help</Link>
                {userData ?
                    <div ref={manageProfileRef}>
                        <img src={`${userData?.avatar}`} alt='Profile Page'
                             className='rounded-full md:w-[40px] w-[20px] hover:cursor-pointer'
                             id='profile-img' onClick={() => setHoverProfile(!hoverProfile)}/>
                        {
                            hoverProfile &&
                            <div
                                className='bg-slate-50 absolute top-[72px] md:w-[15%] md:left-[82%] w-[90%] left-4
                             border-2 shadow-md font-bold flex flex-col gap-2 rounded-lg'>
                                {
                                    profileMenu.map((item, i) => (<Link to={item.to}
                                                                        key={i}
                                                                        className='hover:bg-blue-100 hover:underline
                                                                         text-sm px-3 py-2'
                                                                        onClick={() => setHoverProfile(!hoverProfile)}>
                                        {item.name}</Link>))
                                }
                                <hr className='bg-slate-300 h-[1.5px] w-[99%] mx-auto'/>
                                <div onClick={handleSignOut} className='hover:bg-blue-100 hover:underline p-3
                                 hover:cursor-pointer'>Sign
                                    out
                                </div>
                            </div>
                        }
                    </div> :
                    <Link to='/auth/sign-in' className={`${location.pathname.includes('/auth') && 'hidden'}`}>Sign
                        in</Link>
                }
                {!openMenu &&
                    <GiHamburgerMenu className='md:hidden block'
                                     onClick={handleOpenMenu}/>}
            </div>
        </nav>

        {/*Mobile Responsive Navbar*/}

        {
            (openMenu && window.innerWidth < 768) &&
            <div className='fixed bg-white inset-0'>
                <div className='p-4 flex items-center justify-between'>
                    <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
                        <span className='text-slate-500'>Real</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                    <RxCross1 className='md:hidden block' onClick={handleOpenMenu}/>
                </div>
                <div className='flex flex-col'>
                    {menuItems.map((item, i) => <Link to={item.to} key={i}
                                                      className='border-y-[1.5px] py-3 px-4 hover:bg-blue-100
                                                       hover:underline text-sm' onClick={handleOpenMenu}>
                        {item.name}</Link>)}
                </div>
                <div className='p-4 flex flex-col'>
                    <div className='flex justify-between text-sm'>
                        <span>Manage Rental</span>
                        <RiArrowDropDownLine className='text-3xl' onClick={handleResponsiveMenuOpen}/>
                    </div>
                    {openRentalMenu &&
                        <div className='p-2 border-t-2 flex flex-col gap-3 text-sm'>
                            <h2>Rental Management</h2>
                            <Link to='/' className='text-blue-600 hover:underline'>Listing</Link>
                            <Link to='/' className='text-blue-600 hover:underline'>Message</Link>
                        </div>
                    }
                </div>
            </div>
        }
        <Outlet/>
    </>
}
