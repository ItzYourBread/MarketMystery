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
    const clientSecret = 'GJ7NGk8AoTBZZda_dfZUH9N0Ep6ZtUjs';
    const url = `https://discord.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`;

    try {
        const response = await fetch(url, { method: 'POST' });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const json = await response.json();
        if (!json.access_token) {
            throw new Error('Error: Missing access_token');
        }
        req.session['access_token'] = json.access_token;
        req.session.save();
        res.redirect("https://vue.subsidised.repl.co/");
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

app.listen(process.env.PORT, () => {
    console.log(
        chalk.greenBright(`Server is running on port ${process.env.PORT}`)
    );
});
