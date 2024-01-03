import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

import fs from 'node:fs'
import * as matter from 'gray-matter'

export function formatPublishDate (date) {
  return dayjs(date).format('LL')
}

// Read all the entries files and parse them using gray-matter
export function getArticles () {
  const articles = fs.readdirSync(process.cwd() + '/app/entries')
    .filter(file => file.endsWith('.mdx'))
    .map(file => fs.readFileSync(process.cwd() + `/app/entries/${file}`, 'utf8'))
    .map(file => matter(file))

  return articles
}
