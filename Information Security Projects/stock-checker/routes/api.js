'use strict';
const fetch = require("node-fetch");

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {
      const { stock, like } = req.query;

      // Resolve single stock query
      if (!Array.isArray(stock)) {
        const { symbol, latestPrice } = await getStock(stock);
        if (!symbol) {
          res.json({ stockData: { likes: like ? 1 : 0 } });
          return;
        }

        const data = await saveStock(symbol, like, req.ip);

        res.json({
          stockData: {
            stock: symbol,
            price: latestPrice,
            likes: data.likes.length,
          },
        });
      }
    });
};

async function createNewStock(stock, like, ip) {
  const newStock = new StockModel({ symbol: stock, likes: like ? [ip] : [] });
  return await newStock.save();
}

async function findStock(stock) {
  return await StockModel.findOne({ symbol: stock }).exec();
}

async function saveStock(stock, like, ip) {
  const found = await findStock(stock);
  if (!found) {
    return await createNewStock(stock, like, ip);
  } else {
    if (like && found.likes.indexOf(ip) === -1) {
      found.likes.push(ip);
    }
    return await found.save();
  }
}

async function getStock(stock) {
  const response = await fetch(
    'https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote'
  );
  const { symbol, latestPrice } = await response.json();
  return { symbol, latestPrice };
}