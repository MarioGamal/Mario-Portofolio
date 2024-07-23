import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

// Components
import { Nav } from './Nav'
import MobileNav from './MobileNav'


export const Header = () => {
  return (
    <header className='py-8 xl:py-12 text-white'>
        <div className="container mxauto flex justify-between items-center">
            {/*Logo*/}
            <Link href={"/"}>
                <h1 className='text-4xl font-semibold'>MaRio<span className='text-accent'>.</span></h1>
            </Link>


            {/*desktop nav & hire me button */}
            <div className="hidden xl:flex items-center gap-8">
                <Nav/>
                <Link href={"/contact"}>
                    <Button>Hire me</Button>
                </Link>
            </div>

            {/* Mobile Nav */}
            <div className="xl:hidden">
                <MobileNav />
            </div>
            
        </div>
    </header>
  )
}