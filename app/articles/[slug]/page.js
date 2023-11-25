import fs from 'node:fs'
import { MDXRemote } from 'next-mdx-remote/rsc'

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

export default function Article ({ params }) {
  return <MDXRemote source={readArticle(params.slug)} />
}
