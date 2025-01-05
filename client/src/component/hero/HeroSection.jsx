import React from 'react'

const HeroSection = () => {
    return (
        <div className='w-full h-[80vh] backgroundImage mt-[-70px]'>
            <div className='w-full h-[100%] flex justify-end items-center flex-col overlay '>            
                <h1 className='text-[7vmax] font-bold text-white text-center textShadow mb-0'>Welcome to <span className='text-red-900'>GLBM</span></h1>
                <p className='text-gray-100 xl:text-[1.4rem] md:text-[1.3rem] sm:text-[1.5rem] mb-20 text-[1.5rem] w-[80%] text-center capitalize italic'>we are the largest Garments menufaturer in delhi and working in india. </p>
            </div>
        </div>
    )
}

export default HeroSection
