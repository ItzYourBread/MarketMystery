import express, { Request, Response } from 'express';
import { Stock } from './database/stock';
import 'dotenv/config';

const secretKey = 'kOBJ17rPD4ijusnr9ow6DQ9BdR1z0YVl';

const app = express();

const checkKey = (req: Request, res: Response, next: Function) => {
    const key = req.query.key;
    if (key !== secretKey) {
        return res
            .status(401)
            .send('Invalid key You can find the key from documents!');
    }

    next();
};

app.use(checkKey);

app.get('/stock/:ticker', async (req: Request, res: Response) => {
    const ticker = req.params.ticker;
    const stock = await Stock.findOne({ ticker: ticker });
    if (!stock) {
        res.status(404).send('Error: Stock not found');
        return;
    }
    res.send(stock.history);
});

app.listen(process.env.PORT, () => {
    console.log('Server listening on port 3000');
});
