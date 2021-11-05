import getEndpointURL from './getEndpointURL'

interface dirent {
  files: Array<string>,
  directories: Array<string>
}

export async function getDirectoryEntities (path: string, mimeTypeRegex?: RegExp): Promise<dirent> {
  const urlSearchParams = mimeTypeRegex
    ? new URLSearchParams({ path, mimeTypeRegex: mimeTypeRegex.toString().slice(1, -1) })
    : new URLSearchParams({ path })
  const url = getEndpointURL('getDirectoryEntities', urlSearchParams).toString()
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text())
        }
        resolve(await response.json())
      })
      .catch(reject)
  })
}
