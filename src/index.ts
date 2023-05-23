import 'dotenv/config'

import Debug from 'debug'
import http from 'http'

import { Server } from '@/base'

import app from './app'

const DEFAULT_PORT = '3000'

const debug: Debug.Debugger = Debug('wiki-api:server')

const port: string | number | false = normalizePort(process.env.PORT || DEFAULT_PORT)

app.set('port', port)

/*
 * Create HTTP server.
 */

const testServer = new Server(3000)
testServer.onReady()

const server: http.Server = http.createServer(app)

/*
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  console.log(`🚀[server]: Server is running on port ${port}`)
})

server.on('error', onError)
server.on('listening', onListening)

/*
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): string | number | false {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}

/*
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/*
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`
  debug(`Listening on ${bind}`)
}
