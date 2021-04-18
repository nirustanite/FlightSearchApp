const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    
    createProxyMiddleware(
    "/api",
    {
      target: 'https://api.schiphol.nl',
      secure: false,
      changeOrigin: true,
      pathRewrite: {'^/api' : '/'},
      logLevel: "debug",
      onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('app_id', process.env.REACT_APP_APP_ID)
          proxyReq.setHeader('app_key', process.env.REACT_APP_APP_KEY)
      }
    })
  );
};