import express from 'express'
import cors from 'cors'
import api from './api'
import http from 'http'
import createInformationSocket from './lib/createInformationSocket'

const app = express()
const server = http.createServer(app)

createInformationSocket(server)

app.use(cors())
app.use(api)
app.use('/', express.static('../client/build'))
app.use((req: any, res: any) => {
  res.sendStatus(404)
})

server.listen(5000, () => {
  console.info('Server is listening on port 5000')
})
