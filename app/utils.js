import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

import { articles } from '@/app/entries/database.js'

export function getArticleMetadata (slug) {
  return articles.find(article => article.slug === slug)
}

export function formatPublishDate (date) {
  return dayjs(date).format('LL')
}
