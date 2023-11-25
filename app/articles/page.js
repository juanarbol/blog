import fs from 'node:fs'

export default function Articles () {
  const files = fs.readdirSync(process.cwd() + '/app/entries').filter(file => file.endsWith('.mdx'))
  return <h1>The articles {files}</h1>
}
