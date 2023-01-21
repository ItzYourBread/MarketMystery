import express, { Request, Response } from 'express';
import chalk from 'chalk';
import { Stock } from './database/stock';
import 'dotenv/config';

const app = express();

app.get('/api/stock/:ticker', async (req: Request, res: Response) => {
    const ticker = req.params.ticker;
    const stock = await Stock.findOne({ ticker: ticker });
    if (!stock) {
        res.status(404).send('Error: Stock not found');
        return;
    }
    res.send(stock.history);
});

app.get('/api/login', (req: Request, res: Response) => {
  const redirectUri = 'https://vue.subsidised.repl.co/';
  const clientId = '943855772415193118';
  const scope = 'identify';
  const responseType = 'code';
  const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}`;
  res.redirect(url);
});

app.listen(process.env.PORT, () => {
    console.log(
        chalk.greenBright(`Server is running on port ${process.env.PORT}`)
    );
});