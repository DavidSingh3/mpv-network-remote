import fs from 'fs'
import os from 'os'

interface DirectoryEntities {files: string[], directories: string[]}

export default async function (path: string): Promise<DirectoryEntities> {
  return await new Promise((resolve, reject) => {
    fs.readdir(
      os.homedir().concat(path),
      { withFileTypes: true },
      (error, dirent) => {
        if (error !== null) {
          reject(error.message)
        } else {
          const { files, directories } = dirent.reduce(
            function (accumulator: DirectoryEntities, dirent) {
              if (dirent.isFile()) {
                accumulator.files.push(dirent.name)
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
