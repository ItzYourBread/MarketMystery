import { Stock } from '../database/stock';
import ms from 'ms';
import chalk from 'chalk';

export async function StockUpdate(ticker: String) {
    setInterval(async () => {
        const stock = await Stock.findOne({ ticker: ticker });
        let newPrice: number;

        if (Math.random() < 0.5) {
            // Increase price by a random amount between 1% and 10%
            const increaseAmount = Math.random() * 0.1 + 0.01;
            newPrice = stock.price * (1 + increaseAmount);
        } else {
            // Decrease price by a random amount between 1% and 10%
            const decreaseAmount = Math.random() * 0.1 + 0.01;
            newPrice = stock.price * (1 - decreaseAmount);
        }

        stock.history.push({
            time: new Date(),
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
    }, ms('25m'));
    console.log(
        chalk.magentaBright(
            `[Stock Updater] ${ticker} Activated!`
        )
    );
}
