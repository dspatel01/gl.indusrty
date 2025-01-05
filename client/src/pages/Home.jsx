import React, { useEffect } from 'react'
// import HeroSection from '../component/hero/HeroSection'
import CustomerAutoSlider from '../component/customers/CustomerAutoSlider'
import Products from '../component/products/Products'
import Slider from '../component/hero/Slider'

const Home = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    
    return (
        <>
            <div className='relative top-[-65x]'>
                {/* <HeroSection /> */}
                <Slider />
                <Products />
                <CustomerAutoSlider />
            </div>
        </>

    )
}

export default Home
