import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-start justify-start font-mono text-4xl lg:flex">
        <p>Soon... <Link href="https://twitter.com/soyjuanarbol">in the meantime follow me on Twitter</Link></p>
      </div>

      <div className="relative flex place-items-center">
        <Image
          className="relative"
          src="/computer.png"
          alt="Computer Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  )
}
