export function Trend(
    history: { time: number; price: number; status: string }[]
) {
    const price = history.slice(-7).map((h) => h.price);
    const status = history.slice(-7).map((h) => h.status);
    const time = history.slice(-7).map((h) => h.time);

    let chart = '';
    for (let i = 0; i < price.length; i++) {
        let symbol = '';
        if (status[i] === 'up') {
            symbol = '🔺';
        } else if (status[i] === 'down') {
            symbol = '🔻';
        }
        chart += `<t:${time[i]}:R> : ${price[i].toLocaleString()} ${symbol}\n`;
    }
    return chart;
}
