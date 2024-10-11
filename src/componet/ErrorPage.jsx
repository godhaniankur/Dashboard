import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-center h-screen bg-gray-800 text-center gap-x-10 gap-y-2'>
      <div className='lg:ml-10 mt-8 sm:mb-6'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEUWxRHXyZ6b2mooimhKRe1u-YsOPmIvUUoQ&usqp=CAU'
          alt='Loading'
          loading='loading'
          className='w-64 sm:w-48 '
        />
      </div>
      <div className='flex flex-col text-4xl gap-y-10 text-white'>
        <p>
          404 - Page Not <span className='text-blue-500'>Found</span>
        </p>
        <button className='bg-blue-800 border border-blue-700 rounded-md text-white text-xl p-4 hover:bg-blue-700'>
          <Link to='/'>Back To Home</Link>
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
