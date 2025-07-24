const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use('/api', router) // All routes will be under /api
server.listen(3000, () => {
  console.log('JSON Server is running')
})