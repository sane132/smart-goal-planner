const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3000;

server.use(middlewares);
server.use('/api', router); // All routes will start with /api

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});