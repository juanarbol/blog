import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

import * as utils from '@/app/utils.js'

import { getArticles } from '@/app/utils.js'

import Link from 'next/link'

function ArticlesList () {
  return (
    <div className='flex-auto'>
      {getArticles().map(({ data: { title, publishDate, slug }}, index) => (
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

export default function Articles () {
  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl font-semibold pb-12'>Articles</h1>
      <ArticlesList />
    </div>
  )
}
