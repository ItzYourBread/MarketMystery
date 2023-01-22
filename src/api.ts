import express, { Request, Response } from 'express';
import chalk from 'chalk';
import { Stock } from './database/stock';
import 'dotenv/config';
import session from 'express-session';
import fetch from 'node-fetch';

const app = express();

app.use(
    session({
        secret: 'wishd827sjusbdlcjsbsisbs829jsjsbduwbz',
        resave: false,
        saveUninitialized: true,
    })
);

app.get('/api/stock/:ticker', async (req: Request, res: Response) => {
    const ticker = req.params.ticker;
    const stock = await Stock.findOne({ ticker: ticker });
    if (!stock) {
        res.status(404).send('Error: Stock not found');
        return;
    }
    res.send(stock.history);
});

app.get('/login', (req: Request, res: Response) => {
    const redirectUri = 'http://103.60.13.253:20306/callback/';
    const clientId = '943855772415193118';
    const scope = 'identify+email';
    const responseType = 'code';
    const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}`;
    res.redirect(url);
});

app.get('/callback', async (req: Request, res: Response) => {
    const code = req.query.code;
    const redirectUri = 'http://103.60.13.253:20306/callback/';
    const clientId = '943855772415193118';
    const clientSecret = '7gTEzqCK7zyNQprLcJhowsIhLYaE8jaF';
    const url = `https://discord.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`;

    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) {
        res.status(response.status).send(`Error: ${response.statusText}`);
        return;
    }
    const json = await response.json();
    if (!json.access_token) {
        res.status(400).send('Error: Missing access_token');
        return;
    }
    req.session['access_token'] = json.access_token;
    req.session.save();
    res.redirect("https://vue.subsidised.repl.co/");
});


app.listen(process.env.PORT, () => {
    console.log(
        chalk.greenBright(`Server is running on port ${process.env.PORT}`)
    );
});
