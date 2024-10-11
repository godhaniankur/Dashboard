import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
// import Product from './product';
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";


const Sidebar = () => {
  const location = useLocation();
  return (
     <div className='relative md:flex w-full'>
        <div className="relative md:w-64 md:h-screen">
            <div className=' lg:fixed flex flex-col   lg:w-64 md:h-screen lg:bg-gray-800 lg:text-white group'>
            <div className="p-6 flex justify-between w-full items-center ">
                <h1 className=" text-2xl font-bold">E-Commerce</h1>
                <div className='md:hidden'><PiDotsThreeVerticalBold size={30}/></div>
            </div>
            <nav className="md:mt-10 flex hidden justify-center mx-auto w-full items-center bg-gray-800 text-white lg: group-hover:block md:block">
               <div className='flex flex-col justify-between h-[48vh]'>
               <a
                href="/"
                className={`flex items-center gap-x-3 block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${location.pathname==="/" && "bg-gray-700"}`}
                >
                    <IoHome size={25}/> Home
                </a>
                <a
                href="/dashbord/addproduct"
                className={`flex items-center gap-x-3 block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${location.pathname==="/dashbord/addproduct" && "bg-gray-700"}`}
                >
                   <AiFillProduct size={25}/> Add New Products
                </a>
                <a
                href="/dashbord/category"
                className={`flex items-center gap-x-3 block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${location.pathname==="/dashbord/category" && "bg-gray-700"}`}
                >
                <MdCategory size={25} />Categories
                </a>
                <a
                href="/dashbord/cart"
                className={`flex items-center gap-x-3 block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${location.pathname==="/dashbord/cart" && "bg-gray-700"}`}
                >
                <FaCartShopping size={25}/>Cart
                </a>
                <a
                href="/dashbord/order"
                className={`flex items-center gap-x-3 block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${location.pathname==="/dashbord/order" && "bg-gray-700"}`}
                >
                <FaBoxOpen size={25}/>Orders
                </a>
                <a
                href="/dashbord/account"
                className={`flex items-center gap-x-3 block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${location.pathname==="/dashbord/account" && "bg-gray-700"}`}
                >
                <MdAccountCircle size={25}/>Account
                </a>
               </div>
            </nav>
            </div>
    </div>
        <div className='mx-auto w-[80%]'>
                    <Outlet/>
        </div>
</div>
  );
};

export default Sidebar;


