import getEndpointURL from './getEndpointURL'

function action (endpoint: string, query = {}) {
  const url = getEndpointURL(endpoint, new URLSearchParams(query)).toString()
  return new Promise<void>((resolve, reject) => {
    fetch(url, { method: 'post' })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text())
        }
        resolve()
      })
      .catch(reject)
  })
}

export function selectVideo (path: string) {
  return action('selectVideo', { path })
}

export function selectURL (url: string) {
  return action('selectVideo', { url })
}

export function addSubtitles (path: string) {
  return action('addSubtitles', { path })
}

export function togglePause () {
  return action('togglePause')
}

export function stop () {
  // eslint-disable-next-line no-restricted-globals
  if (confirm('Stop playing this video?')) {
    action('stop').then().catch()
  }
}

export function toggleFullscreen () {
  return action('toggleFullscreen')
}

export function toggleMute () {
  return action('toggleMute')
}

export function adjustVolumeUp () {
  return action('adjustVolume', { adjustment: 10 })
}

export function adjustVolumeDown () {
  return action('adjustVolume', { adjustment: -10 })
}

export function setTimePosition (timePosition: number) {
  return action('seek', { timePosition, mode: 'absolute' })
}
