const client = require('prom-client');
const express = require('express');
const metricsApp = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'code']
});

metricsApp.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

metricsApp.listen(3005, () => {
  console.log('Metrics server running on port 3005');
});

module.exports = (req, res, next) => {
  res.on('finish', () => {
    requestCounter.inc({
      method: req.method,
      route: req.path,
      code: res.statusCode
    });
  });
  next();
};