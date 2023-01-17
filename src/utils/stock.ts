import { Stock } from '../database/stock';
import { RandomNumber } from "stubby.ts"
import ms from 'ms';
import chalk from 'chalk';

export async function StockUpdate(ticker: String) {
    setInterval(async () => {
        const stock = await Stock.findOne({ ticker: ticker });
        let newPrice: number;

        if (Math.random() < 0.5) {
            // Increase price by a random amount between 1% and 10%
            const increaseAmount = RandomNumber(50, 15000);
            newPrice = stock.price + increaseAmount;
        } else {
            // Decrease price by a random amount between 1% and 10%
            const decreaseAmount = RandomNumber(250, 30000);
            newPrice = stock.price + decreaseAmount;
        }

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
    }, ms('30m'));
    console.log(chalk.magentaBright(`[Stock Updater] ${ticker} Activated!`));
}
