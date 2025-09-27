import Footer from '@/components/layout/Footer/Footer'
import Navbar from '@/components/layout/Navbar/Navbar'
import React from 'react'

export default function PublicLayout({children}:{children:React.ReactNode}) {
  return (
    <div>
        <nav>
            <Navbar/>
        </nav>
        <main>
            {children}
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}
