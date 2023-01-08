export async function StockGraph(data: number[]) {
    // Limit data to the latest 26 elements
    data = data.slice(-26);

    // Find the maximum value in the data
    const maxValue = Math.max(...data);

    // Set the number of ticks and the size of each tick
    const numTicks = 5;
    const tickSize = maxValue / numTicks;

    // Initialize the graph string
    let graph = '';

    // Iterate over the ticks and create the graph
    for (let i = numTicks; i >= 0; i--) {
        // Calculate the tick value and label
        const tickValue = tickSize * i;
        const tickLabel = tickValue.toFixed(2).padStart(7);

        // Initialize the line string
        let line = '';

        // Iterate over the data and create the line
        for (let j = 0; j < data.length; j++) {
            if (data[j] >= tickValue) {
                line += '█';
            } else {
                line += ' ';
            }
        }

        // Add the tick label and line to the graph
        graph += `${tickLabel}|${line}\n`;
    }

    // Add the x-axis labels to the graph
    graph += '   +--1--+--2--+--3--+--4--+--5';

    return graph;
}
