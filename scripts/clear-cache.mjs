import { rmSync, existsSync } from 'fs'
import { join } from 'path'

const nextDir = join(process.cwd(), '.next')

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true })
  console.log('[v0] Deleted .next cache directory')
} else {
  console.log('[v0] No .next directory found, nothing to delete')
}
