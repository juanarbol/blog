'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Juan () {
  const pathname = usePathname()
  if (pathname === '/') {
    return (<span className='font-bold text-xl'>Juan José</span>)
  }

  return (<Link href='/' className='font-bold text-xl'>Juan José</Link>)
}

export function Navbar () {
  return (
    <header className='flex flex-row justify-between mb-5 md:mb-10'>
      <Juan />
      <nav className='text-md grow justify-end flex items-center gap-3'>
        <a className='hover:underline' href='https://twitter.com/soyjuanarbol' target='_blank'>Twitter</a>
        <a className='hover:underline' href='https://github.com/juanarbol' target='_blank'>GitHub</a>
        <a className='hover:underline' href='https://juanarbol.co' target='_blank'>About</a>
        <a className='hover:underline' href='https://juanarbol.co/CV.pdf' target='_blank'>CV</a>
      </nav>
    </header>
  )
}
