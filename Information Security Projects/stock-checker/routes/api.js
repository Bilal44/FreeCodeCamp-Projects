'use strict';
const fetch = require("node-fetch");
const StockModel = require("../models").Stock;

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
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
      } else { // Resolve two stock query
        const { symbol, latestPrice } = await getStock(stock[0]);
        const { symbol: symbolTwo, latestPrice: latestPrice2 } = await getStock(stock[1]);

        const stockOne = await saveStock(stock[0], like, req.ip);
        const stockTwo = await saveStock(stock[1], like, req.ip);

        let stockData = [];
        if (!symbol) {
          stockData.push({ rel_likes: stockOne.likes.length - stockTwo.likes.length });
        } else {
          stockData.push({
            stock: symbol,
            price: latestPrice,
            rel_likes: stockOne.likes.length - stockTwo.likes.length,
          });
        }

        if (!symbolTwo) {
          stockData.push({ rel_likes: stockTwo.likes.length - stockOne.likes.length });
        } else {
          stockData.push({
            stock: symbolTwo,
            price: latestPrice2,
            rel_likes: stockTwo.likes.length - stockOne.likes.length,
          });
        }

        res.json({ stockData });
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
    `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`
  );
  const { symbol, latestPrice } = await response.json();
  return { symbol, latestPrice };
}