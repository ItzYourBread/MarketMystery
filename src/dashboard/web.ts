import express, { Request, Response } from 'express';
import path from 'path';
import chalk from 'chalk';
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

app.listen(process.env.PORT, () => {
    console.log(
        chalk.greenBright(`Server is running on port ${process.env.PORT}`)
    );
});
