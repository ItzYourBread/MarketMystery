import express, { Request, Response } from 'express';
import path from 'path';
import chalk from 'chalk';
import { Stock } from "../database/stock"
import 'dotenv/config';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../site'));
app.use(express.static(path.join(__dirname, '../../site')));

app.get('/', async (req: Request, res: Response) => {
    res.render('index');
});

app.get('/tos', async (req: Request, res: Response) => {
    res.render('tos');
});


app.get('/api/stock/:ticker', async (req: Request, res: Response) => {
    const ticker = req.params.ticker;
    const stock = await Stock.findOne({ ticker: ticker });
    if (!stock) {
        res.status(404).send('Error: Stock not found');
        return;
    }
    res.send(stock.history);
});

app.listen(process.env.PORT, () => {
    console.log(
        chalk.greenBright(`Server is running on port ${process.env.PORT}`)
    );
});
