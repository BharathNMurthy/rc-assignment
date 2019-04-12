const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/s/', { target: 'http://localhost:5000' , ws: true,}));
};