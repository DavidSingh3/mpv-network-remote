import MPV from 'node-mpv'

const MPVWrapper = {
  mpv: initMPV()
}

export default MPVWrapper

export async function startMPV (mpvInstance = MPVWrapper.mpv): Promise<void> {
  return await mpvInstance.start(['--ytdl', '--script-opts=ytdl_hook-ytdl_path=yt-dlp'])
}

function initMPV (): MPV {
  const mpv = new MPV({ debug: false, verbose: false })
  mpv.on('quit', () => {
    console.info('restarting the MPV instance...')
    MPVWrapper.mpv = initMPV()
  })
  startMPV(mpv).then(() => console.info('Started MPV')).catch(console.error)
  return mpv
}

interface MPVError {
  errcode: number
  method: string
  verbose: string
}

export async function mpvErrorHandler (callback: () => Promise<void>): Promise<void> {
  const mpvErrorCodes = [
    'Unable to load file or stream',
    'Invalid argument',
    'Binary not found',
    'ipcCommand invalid',
    'Unable to bind IPC socket',
    'Timeout',
    'MPV is already running',
    'Could not send IPC message',
    'MPV is not running',
    'Unsupported protocol'
  ]
  try {
    await callback()
  } catch (error: unknown) {
    const mpvError = error as MPVError
    const message = (mpvError.errcode in mpvErrorCodes)
      ? `MPV ${mpvError.method} - ${mpvError.verbose}`
      : 'unknown error'
    throw new Error(message)
  }
}
