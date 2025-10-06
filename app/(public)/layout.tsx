import Footer from '@/components/layout/Footer/Footer'
import Navbar from '@/components/layout/Navbar/Navbar'
import React from 'react'

export default function PublicLayout({children}:{children:React.ReactNode}) {
  return (
    <div className=''>
        <nav>
            <Navbar/>
        </nav>
        <main className='mt-20'>
            {children}
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}
