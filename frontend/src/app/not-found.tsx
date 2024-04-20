import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div style={{ backgroundColor: '#fcb82f' }} className="flex flex-col justify-center">
       {/* <Image
     src="/assets/not-found.jpg"
      width={1300}
      height={500}
      alt="Picture of the author"
    /> */}
    <img src="http://localhost:3000/assets/404.jpg" className="mx-auto my-auto" style={{width:"800px", height:"580px"}} />
    <Link href={'/home'} className='bg-dark-blue text-white font-semibold no-underline mx-auto rounded-xl p-2 my-12'>Back to Home</Link>
    </div>
  )
}

export default NotFound
