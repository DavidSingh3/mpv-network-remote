import path from 'path'
import os from 'os'

const PUBLIC_BASE_DIR = process.env.PUBLIC_BASE_DIR?.replace(new RegExp(`\\${path.sep}$`), '') ?? os.homedir()
console.info(`PUBLIC_BASE_DIR=${PUBLIC_BASE_DIR}`)

export function appendToPublicBaseDir (subDirectoryPath: string): string {
  return path.join(PUBLIC_BASE_DIR, subDirectoryPath)
}

export default PUBLIC_BASE_DIR
