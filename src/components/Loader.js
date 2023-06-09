import React from 'react'

const Loader = () => {
  return (
   <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
      <div className='h-20 w-20 border-8 border-gray-300 border-t-gray-500 rounded-full animate-spin'>

      </div> 
   </div>
  )
}

export default Loader