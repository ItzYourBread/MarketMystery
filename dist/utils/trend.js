"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trend = void 0;
function Trend(history) {
    var price = history.slice(-7).map(function (h) { return h.price; });
    var status = history.slice(-7).map(function (h) { return h.status; });
    var time = history.slice(-7).map(function (h) { return h.time; });
    var chart = '';
    for (var i = 0; i < price.length; i++) {
        var symbol = '';
        if (status[i] === 'up') {
            symbol = '🔺';
        }
        else if (status[i] === 'down') {
            symbol = '🔻';
        }
        var dateString = time[i];
        var date = new Date(dateString);
        var timestamp = date.getTime();
        chart += "<t:".concat(timestamp, ":R> : ").concat(price[i].toLocaleString(), " ").concat(symbol, "\n");
    }
    return chart;
}
exports.Trend = Trend;
