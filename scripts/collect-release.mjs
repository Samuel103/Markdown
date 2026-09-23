import { access, cp, mkdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const releaseDirectory = resolve(root, 'release')
const webSource = resolve(root, 'dist')
const desktopSource = resolve(
  root,
  'src-tauri/target/release/bundle/macos/Markdown Editor.app',
)

await Promise.all([access(webSource), access(desktopSource)])
await rm(releaseDirectory, { recursive: true, force: true })
await mkdir(releaseDirectory)
await Promise.all([
  cp(webSource, resolve(releaseDirectory, 'web'), { recursive: true }),
  cp(desktopSource, resolve(releaseDirectory, 'desktop/Markdown Editor.app'), {
    recursive: true,
  }),
])

console.log(`Release artifacts available in ${releaseDirectory}`)
