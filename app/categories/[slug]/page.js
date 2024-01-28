import Link from 'next/link'
import * as utils from '@/app/utils.js'
import fs from 'fs'
import * as matter from 'gray-matter'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

// Just create the necessary pages
export const dynamicParams = false
export function generateStaticParams () {
  const categories = new Set()
  const slugs = fs.readdirSync(process.cwd() + '/app/entries')
    .filter(file => file.endsWith('.mdx'))
    .map(file => fs.readFileSync(process.cwd() + `/app/entries/${file}`, 'utf8'))
    .map(file => matter(file).data.categories.split(', '))
    .flat()

  slugs.forEach(slug => categories.add(slug))
  return [...categories].map(category => ({ slug: category }))
}

function getEntriesWithCategory (categorySlug) {
  categorySlug = decodeURIComponent(categorySlug)
  const entriesSlug = utils.getArticles()
    .filter(article => article.data.categories.includes(categorySlug))

  return entriesSlug
}

// List all the entries with the category slug
// TODO: This is the same as Page.js, make it a shared component instead
export default function Page({ params }) {
  return (
    <div className='flex-auto'>
      {getEntriesWithCategory(params.slug).map(({ data: { title, publishDate, slug } }, index) => (
        <div key={index} className='flex-auto flex inline-block pb-8'>
          <Link key={index} href={`/${slug}`} className='flex flex-col'>
          <span className='text-xl hover:underline inline-block'>{title}</span>
          <span className='text-sm inline-block'>{utils.formatPublishDate(publishDate) || '¯\\_(ツ)_/¯'}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}
