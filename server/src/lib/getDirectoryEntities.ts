import fs from 'fs'
import path from 'path'
import mime from 'mime'
import { appendToPublicBaseDir } from './publicBaseDir'

interface DirectoryEntities {files: string[], directories: string[]}

export default async function (requestedSubDirectoryPath: string, mimeTypeRegex?: RegExp): Promise<DirectoryEntities> {
  return await new Promise((resolve, reject) => {
    const requestedFullPath = appendToPublicBaseDir(requestedSubDirectoryPath)
    fs.readdir(
      requestedFullPath,
      { withFileTypes: true },
      (error, dirent) => {
        if (error !== null) {
          reject(error.message)
        } else {
          const { files, directories } = dirent.reduce(
            function (accumulator: DirectoryEntities, dirent) {
              if (dirent.isFile()) {
                const mimeType = mime.lookup(direntPath)
                if (mimeTypeRegex?.test(mimeType) ?? true) {
                  accumulator.files.push(dirent.name)
                }
              } else if (dirent.isDirectory()) {
                accumulator.directories.push(dirent.name)
              }
              return accumulator
            },
            { files: [], directories: [] }
          )
          resolve({ files, directories })
        }
      })
  })
}
