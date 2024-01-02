import fs from 'node:fs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'

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
  const files = fs.readdirSync(process.cwd() + '/app/entries')
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))

  return files.map((fileName) => ({
    slug: fileName
  }))
}

function readArticle (slug) {
  // This is a safe call as long as we only allow existing files
  return fs.readFileSync(process.cwd() + `/app/entries/${slug}.mdx`, 'utf8')
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
      <Link className='no-underline' href='/'>Go back</Link>
    </div>
  )
}

export default function Article ({ params }) {
  const { title, publishDate } = utils.getArticleMetadata(params.slug)
  return (
    <div className='prose dark:prose-invert'>
      <h1 className='mb-1'>{ title || '¯\\_(ツ)_/¯'}</h1>
      <span className='text-sm'>{utils.formatPublishDate(publishDate) || '¯\\_(ツ)_/¯'}</span>
      <article className={`${SourceSerif.className} mt-12`}>
        {/* Make it a bit more readable */}
        <MDXRemote
          options={options}
          source={readArticle(params.slug)}
        />
      </article>
      <GoBackButton />
    </div>
  )
}
