import React from "react";
import './Home.css';
import Search from "./Search.jsx";
import {Buy_Home, Recommendation, Rent_Home, Sell_Home} from './Images/homePageImages.js';
import HomeButton from './Button.jsx';
import {IoSearch} from "react-icons/io5";
import {useIntersectionObserver} from '../../services/customHooks.js'

function Home() {
    const [ref, isIntersection] = useIntersectionObserver({threshold: 0});
    return (
        <>
            {isIntersection &&
                <div className='shadow-2xl flex items-center lg:px-[10%] w-full py-3 fixed top-0 bg-white'>
                    <h1 className='font-bold text-sm sm:text-2xl lg:flex flex-wrap hidden'>
                        <span className='text-slate-500'>Real</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                    <div
                        className='mx-auto flex bg-white px-3 py-2 lg:w-[35em] w-full justify-between rounded-md border-2
                     hover:border-2 hover:border-blue-400 gap-2'>
                        <input type='text' className='w-full outline-none'
                               placeholder='Enter an Address, city or ZIP code'/>
                        <IoSearch className='text-3xl text-blue-600 cursor-pointer'/>
                    </div>
                </div>
            }
            <div>
                {/*Hero Section*/}
                <div id='hero-bg'>
                    <h1 className='md:text-7xl text-4xl font-extrabold text-white ms-[10%]'>Agents. Tours.<br/> Loans.
                        Homes.</h1>
                    <Search placeholder={'Enter an Address, city or ZIP code'}
                            inputClassName={'w-[90%] outline-none md:text-lg'}/>
                </div>

                {/*Recommendation Section*/}
                <div className='flex md:flex-row items-center justify-center xl:gap-16 flex-col my-10'>
                    <div className='flex flex-col justify-center xl:items-start items-center'>
                        <h1 className='md:text-xl font-extrabold'>Recommendations underway</h1>
                        <p className='text-slate-600 md:text-md text-center md:px-0 px-4'>Search and save a few homes you
                            like and we'll find
                            recommendations for you.</p>
                    </div>
                    <div>
                        <img src={`${Recommendation}`} alt='Recommendations'/>
                    </div>
                </div>

                {/*Facilities*/}

                <div ref={ref}
                     className='bg-[#f8f9fa] py-10 flex lg:flex-row flex-col justify-center gap-8 items-center px-5
                         box-border'>
                    <div className='facilities'>
                        <img src={`${Buy_Home}`} alt='Buy a Home' className='buy-home'/>
                        <div className='facilities-inner'>
                            <h1>Buy a Home</h1>
                            <p>Find your place with an immersive photo experience and the most listings, including
                                things you
                                won’t find anywhere else.</p>
                            <HomeButton label={'Browse homes'}/>
                        </div>
                    </div>
                    <div className='facilities'>
                        <img src={`${Sell_Home}`} alt='Sell a Home' className='buy-home'/>
                        <div className='facilities-inner'>
                            <h1>Sell a Home</h1>
                            <p>No matter what path you take to sell your home, we can help you navigate a successful sale.</p>
                            <HomeButton label={'See your Option'}/>
                        </div>
                    </div>
                    <div className='facilities'>
                        <img src={`${Rent_Home}`} alt='Rent a Home' className='buy-home'/>
                        <div className='facilities-inner'>
                            <h1>Rent a Home</h1>
                            <p>We’re creating a seamless online experience – from shopping on the largest rental network, to
                                applying, to paying rent.</p>
                            <HomeButton label={'Find rentals'}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
