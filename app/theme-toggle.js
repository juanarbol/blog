'use client'

import { useTheme } from 'next-themes'

export function ThemeToggle () {
  const { theme, setTheme } = useTheme()
  function toggleTheme () {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return <button className='hover:underline' onClick={() => toggleTheme()}>Theme</button>
}
