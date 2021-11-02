import Express, { Request } from 'express'
import getDirectoryEntities from './lib/getDirectoryEntities'
import MPVWrapper, { mpvErrorHandler, startMPV } from './lib/mpv'
import os from 'os'
import { SeekMode } from 'node-mpv'

const router = Express.Router()

type RequestWithQuery<query> = Request<{}, {}, null, query>

router.get('/getDirectoryEntities', function (req: RequestWithQuery<{ path: string }>, res) {
  getDirectoryEntities(req.query.path)
    .then((directoryEntities) => {
      res.status(200).send(directoryEntities)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

router.use(function (req, res, next) {
  if (!MPVWrapper.mpv.isRunning()) {
    startMPV().then(next).catch((error) => {
      res.status(500).send(error.message)
    })
  } else {
    next()
  }
})

router.post('/selectVideo', function (req: RequestWithQuery<{ path: string }>, res) {
  mpvErrorHandler(async () => {
    const path = os.homedir().concat(req.query.path)
    await MPVWrapper.mpv.load(path)
    await MPVWrapper.mpv.fullscreen()
    await MPVWrapper.mpv.play()
  })
    .then(() => {
      res.status(200).send()
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

router.post('/addSubtitles', function (req: RequestWithQuery<{ path: string }>, res) {
  mpvErrorHandler(async () => {
    await MPVWrapper.mpv.addSubtitles(os.homedir().concat(req.query.path))
  })
    .then(() => {
      res.status(200).send()
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

router.post('/togglePause', function (req, res) {
  mpvErrorHandler(async () => {
    await MPVWrapper.mpv.togglePause()
  })
    .then(() => {
      res.status(200).send()
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

router.post('/toggleFullscreen', function (req, res) {
  mpvErrorHandler(async () => {
    await MPVWrapper.mpv.toggleFullscreen()
  })
    .then(() => {
      res.status(200).send()
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

router.post('/toggleMute', function (req, res) {
  mpvErrorHandler(async () => {
    await MPVWrapper.mpv.mute()
  })
    .then(() => {
      res.status(200).send()
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

router.post('/adjustVolume', function (req: RequestWithQuery<{ adjustment: number }>, res) {
  mpvErrorHandler(async () => {
    await MPVWrapper.mpv.adjustVolume(req.query.adjustment)
    await MPVWrapper.mpv.mute(false)
  })
    .then(() => {
      res.status(200).send()
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

router.post('/seek', function (req: RequestWithQuery<{ timePosition: number, mode?: SeekMode | undefined }>, res) {
  mpvErrorHandler(async () => {
    await MPVWrapper.mpv.seek(req.query.timePosition, req.query.mode)
  })
    .then(() => {
      res.status(200).send()
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

router.post('/stop', function (req, res) {
  mpvErrorHandler(async () => {
    await MPVWrapper.mpv.stop()
  })
    .then(() => {
      res.status(200).send()
    })
    .catch((error) => {
      res.status(500).send(error.message)
    })
})

export default router
