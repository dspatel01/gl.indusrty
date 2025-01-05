import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SideBar from "../adminPanel/Sidebar"
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const SubCategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('true');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editId, setEditId] = useState(null);
    const [openSideBar, setSideBar] = useState(false)
    const [subCategoryForm, setSubCAtegoryForm] = useState(false)

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, []);

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/subcategories');
            setSubCategories(response.data);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleAddOrEditCategory = async () => {
        try {
            if (editId) {
                // Update subcategory (PUT request)
                await axios.put(`http://localhost:8080/api/subcategories/${editId}`, {
                    name,
                    parentCategory,
                    description,
                    status
                });
                setSuccess('Subcategory updated successfully');
            } else {
                // Create new subcategory (POST request)
                await axios.post('http://localhost:8080/api/subcategories', {
                    name,
                    parentCategory,
                    description,
                    status
                });
                setSuccess('Subcategory created successfully');
            }
            fetchSubCategories(); // Refresh subcategories list
            resetForm();
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing the subcategory');
        }
    };



    const handleDeleteCategory = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/subcategories~/${id}`);
            if (response.status === 200) {
                // Update the local state if deletion is successful
                setCategories(categories.filter(category => category._id !== id));
                alert("Category deleted successfully!");
                fetchSubCategories(); // Refresh subcategories list
            }
        } catch (error) {
            // Display the error message from the API
            console.log("Error:", error.response.data.message || "Error deleting category");
            setError('An error occurred while deleting the subcategory');
            alert(error.response.data.message || "Error deleting category");
        }
    };
    const handleEditCategory = (subcategory) => {
        setEditId(subcategory._id);
        setName(subcategory.name);
        setParentCategory(subcategory.parentCategory);
        setDescription(subcategory.description);
        setStatus(subcategory.status ? 'true' : 'false');
        setSuccess('');
        setError('');
    };


    const resetForm = () => {
        setEditId(null);
        setName('');
        setParentCategory('');
        setDescription('');
        setStatus('true');
        setSuccess('');
        setError('');
    };

    const handleSideBar = () => {
        !openSideBar ? setSideBar(true) : setSideBar(false)
    }

const handleAddSubCategoryForm = () =>{
    !subCategoryForm ? setSubCAtegoryForm(true) : setSubCAtegoryForm(false)
}

useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}, [])


    return (

        <>

            <div className='ml-1  text-white text-[1.1rem] w-fit  cursor-pointer ' onClick={handleSideBar}>
                {!openSideBar ? <MdOutlineSpaceDashboard className='text-[2rem] text-[#1f2937]' /> : <MdCancel className='text-[2rem] text-[#1f2937]' />}
            </div>

            <div className='flex mt-0 '>
                <div>
                    <div className=''>  {openSideBar ? <div className='ml-0 transition-all'><SideBar /></div> : <div className='ml-[-400px] transition-all'><SideBar /></div>}</div>
                </div>

                <div className='w-full flex xl:flex-row md:flex-col sm:flex-col flex-col justify-between px-2 xl:min-h-[80vh] md:min-h-fit sm:min-h-fit max-h-fit my-10'>

                    <div
                        className='xl:hidden md:flex sm:flex flex bg-blue-700 text-white w-fit px-4 py-2 cursor-pointer'
                        onClick={handleAddSubCategoryForm}
                    >
                        {!subCategoryForm ? "Add SubCategory" : "Close"}
                    </div>

                    {<div className={subCategoryForm ? 'xl:block' : 'xl:block md:hidden sm:hidden hidden xl:w-[35%] md:w-[100%] sm:w-[100%] w-[100%] xl:order-2 md:order-1 sm:order-1 order-1 mr-6 '}>
                        <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit' : 'Add'} SubCategory</h2>
                        <input
                            type="text"
                            placeholder="Subcategory Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 border border-gray-300 rounded mb-4 w-full"
                        />
                        <select
                            onChange={(e) => setParentCategory(e.target.value)}
                            className="p-2 border border-gray-300 rounded mb-4 w-full"
                            value={parentCategory}
                        >
                            <option>Select Category</option>
                            {categories.map((category) => (
                                <option value={category._id} key={category._id} className="mb-2">
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            className="p-2 border border-gray-300 rounded mb-4 w-full"
                            value={status}
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                        <textarea
                            name="description"
                            placeholder="Description..."
                            rows="4"
                            className="p-2 border border-gray-300 rounded mb-4 w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                            onClick={handleAddOrEditCategory}
                            className="bg-blue-500 text-white p-2 rounded w-full"
                        >
                            {editId ? 'Update' : 'Add'} Subcategory
                        </button>
                        <button
                            onClick={resetForm}
                            className="bg-gray-500 text-white p-2 rounded mt-2 w-full"
                        >
                            Cancel
                        </button>
                        {success && <p className="text-green-500 mt-4">{success}</p>}
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>}

                    <div className='h-[75vh] overflow-y-scroll w-[60%]'>
                    <table className=" xl:w-[100%] md:w-[100%] sm:w-[100%] w-[100%] border xl:order-1 md:order-2 sm:order-2 order-2 my-5">
                        <thead>
                            <tr className='h-12 bg-[#3b82f6] text-white'>
                                <th>Sr.</th>
                                <th>Main Category</th>
                                <th>Sub Category</th>
                                <th>Description</th>
                                {/* <th>Status</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subCategories.map((subcategory, index) => (
                                <tr key={subcategory._id} className='text-center h-11 border'>
                                    <td>{index + 1}</td>
                                    <td>{subcategory.parentCategory?.name || "N/A"}</td>
                                    <td>{subcategory.name}</td>
                                    <td>{subcategory.description}</td>
                                    {/* <td>{subcategory.status === 'true' ? "Active" : "Inactive"}</td> */}
                                    <td className='flex items-center justify-center h-11'>
                                        <FaEdit className='text-xl text-blue-700 mr-1 cursor-pointer' onClick={() => handleEditCategory(subcategory)} />
                                        <MdDelete className='text-2xl text-red-700 ml-2 cursor-pointer' onClick={() => handleDeleteCategory(subcategory._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    
                </div>
            </div>



        </>

    );
};

export default SubCategoryManagement;
