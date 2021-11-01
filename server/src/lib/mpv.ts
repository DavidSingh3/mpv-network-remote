import MPV from 'node-mpv'

export default new MPV({ debug: false })

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
