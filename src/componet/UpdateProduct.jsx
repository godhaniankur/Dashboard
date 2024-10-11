import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
    
       const navigate = useNavigate()
       const {id} = useParams();
   
       useEffect(()=>{
        const singleProduct = async () =>{
            const toastId = toast.loading("finding...")
            try {
                const responce = await fetch(`https://fakestoreapi.com/products/${id}`)
                const data = await responce.json()
                setformData({Name:data.title,price:data.price,Rating:data.rating.rate,Quantity:data.rating.count,category:data.category,description:data.description})
                toast.success("done")
            } catch (error) {
                console.log("INTERNAL SERVER ERROR",error)
                toast.error("Not Found")
            }
            toast.dismiss(toastId)
        }
        singleProduct();
       },[id])
  
    const [formData,setformData] = useState({
        Name: "",
        price:"",
        Rating:"",
        Quantity:"",
        category:"",
        description:"",
        image:""
    })

    const {Name,price,Rating,Quantity,category,description,image} = formData;

    const handleonChange = (e) =>{
        setformData((prevData)=>(
            {
                ...prevData,
                [e.target.name] : e.target.value
            }
        ))
    }

    const handleonSubmit = async(e) =>{
        e.preventDefault();
        const toastId = toast.loading("waiting...")
        console.log("Data",formData)
        try {
            const responce = await fetch(`https://fakestoreapi.com/products/${id}`,{
                method:"PUT",
                body:JSON.stringify({
                    title:`${Name}`,
                    price:price,
                    description:`${description}`,
                    image: `${image}`,
                    category:`${category}`
                })
            })

            const Product = await responce.json();
            toast.success("Update Product sucessfully.")
            navigate("/dashbord/home")
            console.log(Product)

        } catch (error) {
            console.log("INTERNAL SERVER ERROR...",error)
            toast.error("INTERNAL SERVER ERROR..")
        }
        toast.dismiss(toastId)
    }


  return (
    <div className='flex flex-col'>
        <div className='flex flex-col justify-center items-center mt-[20px]'>
        <h1 className=' text-4xl font-bold'>UPDATE PRODUCT</h1>
        </div>
    <div className='  bg-white flex justify-center h-fit items-start mx-auto w-fit  gap-x-20'>
    <div className='lg:max-w-[650px] max-w-[310px] flex  overflow-hidden rounded-lg shadow-lg mt-[30px]'>
        <form onSubmit={handleonSubmit}  className=' flex flex-col justify-center items-start w-full gap-y-5 p-10'>
             <label className='flex flex-col w-full'>
                 <p className=' text-md font-bold text-gray-800 '>Name<sup className='text-red-500'>*</sup></p>
                 <input type="text" className=' border-b-2 outline-none border-blue-800 p-0.5 ' onChange={handleonChange} value={Name} name='Name' required/>
             </label>
            <div className='flex lg:flex-row flex-col  w-full lg:gap-x-10 gap-y-3'>
             <label className='flex flex-col w-full'>
                 <p className=' text-md font-bold text-gray-800 '>price<sup className='text-red-500'>*</sup></p>
                 <input type="number" className=' border-b-2 outline-none border-blue-800 p-0.5 ' onChange={handleonChange} value={price} name='price' required/>
             </label>
             <label className='flex flex-col w-full'>
                    <p className=' text-md font-bold text-gray-800 '>Rating</p>
                    <input type="text" className=' border-b-2 outline-none border-blue-800 p-0.5 ' onChange={handleonChange} value={Rating} name='Rating'/>
                </label>
            
            </div>
            <label className='flex flex-col w-full'>
                 <p className=' text-md font-bold text-gray-800 '>Quantity</p>
                 <input type="text" className=' border-b-2 outline-none border-blue-800 p-0.5 ' onChange={handleonChange} value={Quantity} name='Quantity' required/>
             </label>
             <label className='flex flex-col w-full'>
                  <p className=' text-md font-bold text-gray-800 '>image</p>
                  <input type="file"  className=' border-b-2 outline-none border-blue-800 p-0.5 ' onChange={handleonChange} value={image} name='image' />
             </label>
             <div className='flex w-full gap-x-10'>
                
                <label className='flex flex-col w-full'>
                    <p className=' text-md font-bold text-gray-800'>category</p>
                    <input type="text" className=' border-b-2 outline-none border-blue-800 p-0.5 ' onChange={handleonChange} value={category} name='category'/>
        
                </label>
             </div>
             <div className='flex w-full gap-x-10'>
            
             <label className='flex flex-col w-full'>
                 <p className=' text-md font-bold text-gray-800 '>description <sup className='text-red-500'>*</sup></p>
                 <textarea  className=' border-b-2 outline-none border-blue-800 p-0.5 ' onChange={handleonChange} value={description} name='description' required/>
             </label>
             </div>
        <button className=' mx-auto p-2 bg-blue-800 w-full rounded-md text-white font-semibold' type='submit'>Save</button>
        </form>
    </div>
</div>
</div>
  )
}

export default UpdateProduct