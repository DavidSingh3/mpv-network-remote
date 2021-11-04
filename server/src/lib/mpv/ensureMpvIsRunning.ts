import MPVWrapper, { startMPV } from '../mpv'

export default async function ensureMpvIsRunning (): Promise<void> {
  return await new Promise((resolve, reject) => {
    try {
      if (!MPVWrapper.mpv.isRunning()) {
        startMPV()
          .then(resolve)
          .catch(reject)
      } else {
        resolve()
      }
    } catch (error) {
      reject(error)
    }
  })
}
