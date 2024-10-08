import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div style={{ backgroundColor: '#fcb82f' }} className="flex flex-col justify-center">
    <img src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379438/404_hqfekz.jpg" className="mx-auto my-auto" style={{width:"800px", height:"580px"}} />
    <Link href={'/home'} className='bg-dark-blue text-white font-semibold no-underline mx-auto rounded-xl p-2 my-12'>Back to Home</Link>
    </div>
  )
}

export default NotFound;
