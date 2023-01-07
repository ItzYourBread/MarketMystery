import { Client } from 'eris';
import { Stock } from '../database/stock';
import ms from 'ms';
import chalk from 'chalk';

export async function StockUpdate(client: Client) {
    setInterval(async () => {
        const allStocks = await Stock.find({});

        allStocks.forEach(async (stock) => {
            const randomPercentage = Math.random();
            let newPrice: number;

            if (randomPercentage < 0.4) {
                // Increase price by a random amount between 1% and 10%
                const increaseAmount = Math.random() * 0.1 + 0.01;
                newPrice = stock.price * (1 + increaseAmount);
            } else if (randomPercentage > 0.6) {
                // Decrease price by a random amount between 1% and 10%
                const decreaseAmount = Math.random() * 0.1 + 0.01;
                newPrice = stock.price * (1 - decreaseAmount);
            } else {
                // Price remains the same
                newPrice = stock.price;
            }

            stock.history.push(stock.price); // Push the current price to the history array
            stock.price = newPrice;
            await stock.save();
        });
    }, ms('25m'));
    console.log(chalk.magentaBright('[Stock Updater] Activated!'));
}

