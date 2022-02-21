'use strict';
const fetch = require("node-fetch");

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      
    });
    
};

async function getStock(stock) {
  const response = await fetch(
    'https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote'
  );
  const { symbol, latestPrice } = await response.json();
  return { symbol, latestPrice };
}