import fs from 'node:fs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import * as matter from 'gray-matter'

import * as utils from '@/app/utils.js'

import Link from 'next/link'

// Different font for the title
import { Source_Serif_4 } from 'next/font/google'
const SourceSerif = Source_Serif_4({ subsets: ['latin'] })

import 'highlight.js/styles/dark.min.css'
import javascript from 'highlight.js/lib/languages/javascript'

// Read only the mdx files from the articles folder
// And allow only the [existing] mdx files to be used as routes
export const dynamicParams = false
export function generateStaticParams () {
  const slugs = fs.readdirSync(process.cwd() + '/app/entries')
    .filter(file => file.endsWith('.mdx'))
    .map(file => fs.readFileSync(process.cwd() + `/app/entries/${file}`, 'utf8'))
    .map(file => matter(file).data.slug)

  return slugs.map((slug) => ({ slug }))
}

function readArticle (slug) {
  // This is a safe call as long as we only allow existing files
  return matter(fs.readFileSync(process.cwd() + `/app/entries/${slug}.mdx`, 'utf8'))
}

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight, { languages: { javascript } } ],
  }
}

function GoBackButton () {
  return (
    <div className='flex flex-row justify-start gap-3'>
      <Link className='hover:underline no-underline' href='/'>Go back</Link>
    </div>
  )
}

export async function generateMetadata ({ params }) {
  const { data: { title, publishDate }, content } = readArticle(params.slug)
  return {
    metadataBase: new URL('https://blog.juanarbol.co/'),
    title: title,
    openGraph: {
      title: title,
      type: 'article',
      url: `https://blog.juanarbol.co/${params.slug}`,
      article: {
        publishedTime: publishDate
      },
      images: ['/computer.png']
    }
  }
}

export default function Article ({ params }) {
  // NOTE: this blog now supports "categories" but I'm not using them yet
  const { data: { author, title, publishDate }, content } = readArticle(params.slug)
  return (
    <div className='prose dark:prose-invert'>
      <h1 className='mb-1'>{ title || '¯\\_(ツ)_/¯'}</h1>
      <div className='flex flex-col italic'>
        <span className='text-sm flex-1'>{author || '¯\\_(ツ)_/¯'}</span>
        <span className='text-sm flex-1'>{utils.formatPublishDate(publishDate) || '¯\\_(ツ)_/¯'}</span>
      </div>
      <article className={`${SourceSerif.className} mt-12`}>
        {/* Make it a bit more readable */}
        <MDXRemote
          options={options}
          source={content}
        />
      </article>
      <GoBackButton />
    </div>
  )
}
