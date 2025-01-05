import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Setting = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    

    return (
        <>
            <div className='w-full h-[90vh]'>
                <div className='mt-5'>

                    <Link to='/dashboard' className='ml-10 px-4 text-[1.2rem]  py-1 rounded-none bg-[#1f2937] text-white'>Back</Link>
                </div>
                <div className='w-full h-[70vh] flex items-center justify-center text-[8rem] font-bold text-gray-400 '>
                    Setting
                </div>
            </div>
        </>
    )
}

export default Setting
