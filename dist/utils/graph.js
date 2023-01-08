"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockGraph = void 0;
var tslib_1 = require("tslib");
function StockGraph(data) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var maxValue, numTicks, tickSize, graph, i, tickValue, tickLabel, line, j;
        return tslib_1.__generator(this, function (_a) {
            data = data.slice(-26);
            maxValue = Math.max.apply(Math, data);
            numTicks = 5;
            tickSize = maxValue / numTicks;
            graph = '';
            for (i = numTicks; i >= 0; i--) {
                tickValue = tickSize * i;
                tickLabel = tickValue.toFixed(2).padStart(7);
                line = '';
                for (j = 0; j < data.length; j++) {
                    if (data[j] >= tickValue) {
                        line += '█';
                    }
                    else {
                        line += ' ';
                    }
                }
                graph += "".concat(tickLabel, "|").concat(line, "\n");
            }
            graph += '   +--1--+--2--+--3--+--4--+--5';
            return [2, graph];
        });
    });
}
exports.StockGraph = StockGraph;
