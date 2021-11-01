import getEndpointURL from './getEndpointURL'

interface dirent {files: Array<string>, directories: Array<string>}

export async function getDirectoryEntities (path: string): Promise<dirent> {
  const url = getEndpointURL('getDirectoryEntities', new URLSearchParams({ path })).toString()
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
