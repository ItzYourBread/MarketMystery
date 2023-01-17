import { Stock } from '../database/stock';
import { RandomNumber } from 'stubby.ts';
import ms from 'ms';
import chalk from 'chalk';

export async function StockUpdate(ticker: String) {
    setInterval(async () => {
        const stock = await Stock.findOne({ ticker: ticker });

        if (!stock) {
            console.log(`No stock found with ticker ${ticker}`);
            return;
        }

        let newPrice: number;

        const volatility = RandomNumber(1, 5);
        const change =
            stock.price * (volatility / 100) * (Math.random() > 0.5 ? 1 : -1);

        newPrice = stock.price + change;
        stock.history.push({
            time: Number(new Date()),
            price: newPrice,
            status: newPrice > stock.price ? 'up' : 'down',
        });
        stock.price = newPrice;
        await stock.save();

        console.log(
            chalk.white(
                `[New Price] $${stock.price.toLocaleString()} value for ${
                    stock.ticker
                } (${stock.company})!`
            )
        );
    }, ms('15m'));
    console.log(chalk.magentaBright(`[Stock Updater] ${ticker} Activated!`));
}
