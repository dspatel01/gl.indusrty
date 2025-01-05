import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";

const AdminNav = () => {
    const [loginUser, setLoginUser] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get('http://localhost:8080/api/admin/loginUser');
            setLoginUser(response.data);
        };
        getUser();
    }, []);


    // Define the admin routes where you want to show the admin navbar
    const adminRoutes = ['/setting', '/signup', '/dashboard', "/categories", '/subcategories', '/productsManagement', '/customerEnquery', '/createProduct', '/productDetails/:id', '/editProduct/:id'];

    // Check if the current route is an admin route
    const isAdminRoute = adminRoutes.includes(location.pathname);

    // If it's not an admin route, don't render the admin navbar
    if (!isAdminRoute) return null;

    console.log(loginUser)

    return (
        <div className='flex items-center justify-between px-10 bg-[#1f2937] py-2 mb-[0.5px]'>
            <div >
                <div className='text-[2rem] font-bold text-red-700  px-2'><NavLink to='/'>G.L Industries</NavLink> </div>
            </div>
            <div className='flex items-center'>
                <div className='w-12 h-12 border rounded-full mr-2 flex items-center justify-center text-[1.5rem] text-white'> <FaRegUser /> </div>
                <strong className='text-white capitalize'>
                    {
                        loginUser.map((item) => {
                            return (
                                <div>
                                    {item.username}
                                </div>
                            )
                        })
                    }
                </strong>
            </div>
        </div>
    )
}

export default AdminNav
