const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./mock-server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/api/shops/:id/goods', (req, res) => {
  const page = +req.query.page;
  let currentPage = 4 * (page - 1) + 1;
  const response = router.db.get('goods');
  const result = response.map(({ id, name, imageUrl, price }) => {
    const res = {
      id: +id + currentPage,
      name: name + currentPage,
      imageUrl,
      price,
    };
    currentPage += 1;
    return res;
  });

  res.json(result);
});

server.post('/api/orders', (req, res) => {
  res.json(req.body);
});

server.use(router);
server.listen(6001, () => {
  console.log('JSON Server is running on port 6001');
});
