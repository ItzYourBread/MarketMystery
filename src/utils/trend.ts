export function Trend(
    history: { time: string; price: number; status: string }[]
) {
    // Reverse the order of the history array
    const reversedHistory = history.reverse();
    // Extract the last 7 elements of the reversed history array
    const price = reversedHistory.slice(0, 7).map((h) => h.price);
    const status = reversedHistory.slice(0, 7).map((h) => h.status);
    const time = reversedHistory.slice(0, 7).map((h) => h.time);

    let chart = '';
    // Iterate through the price, status, and time arrays
    for (let i = 0; i < price.length; i++) {
        let symbol = '';
        if (status[i] === 'up') {
            symbol = '🔺';
        } else if (status[i] === 'down') {
            symbol = '🔻';
        }

        const dateString = time[i];
        const date = new Date(dateString);
        // Convert date to timestamp
        const timestamp = Math.floor((date.getTime() - 3000) / 1000);

        // Append data to the chart string
        chart += `<t:${timestamp}:R> : $${price[
            i
        ].toLocaleString()} ${symbol}\n`;
    }
    return chart;
}
