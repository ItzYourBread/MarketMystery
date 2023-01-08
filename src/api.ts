import express from 'express';
import { Stock } from './database/stock';
import 'dotenv/config';

const app = express();

app.get('/stock/:ticker', async (req, res) => {
    const ticker = req.params.ticker;
    const stock = await Stock.findOne({ ticker: ticker });
    if (!stock) {
        res.status(404).send('Error: Stock not found');
        return;
    }
    res.send(stock.history);
});

app.listen(process.env.PORT, () => {
    console.log('API listening on port ' + process.env.PORT);
});
