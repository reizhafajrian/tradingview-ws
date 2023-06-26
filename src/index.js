"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.connectAndSubscribe = exports.getCandles = exports.getCandlesV2 = exports.connect = exports.EVENT_NAMES = void 0;
var axios_1 = require("axios");
// import WebSocket, { EventEmitter } from 'ws'
var ws = require("ws");
// import randomstring from "randomstring"
var randomstring = require("randomstring");
var types_1 = require("./types");
// const WebSocket=ws.WebSocket
exports.EVENT_NAMES = {
    TIMESCALE_UPDATE: 'timescale_update',
    SERIES_COMPLETED: 'series_completed',
    SYMBOL_ERROR: 'symbol_error',
    RESOLVE_SYMBOL: 'resolve_symbol',
    CREATE_SERIES: 'create_series',
    REQUEST_MORE_DATA: 'request_more_data'
};
function parseMessage(message) {
    if (message.length === 0)
        return [];
    var events = message.toString().split(/~m~\d+~m~/).slice(1);
    var s = events.map(function (event) {
        if (event.substring(0, 3) === "~h~") {
            return { type: 'ping', data: "~m~".concat(event.length, "~m~").concat(event) };
        }
        var parsed = JSON.parse(event);
        if (parsed['session_id']) {
            return { type: 'session', data: parsed };
        }
        return { type: 'event', data: parsed };
    });
    return s;
}
function connect(options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        function subscribe(handler) {
            subscribers.add(handler);
            return function () {
                subscribers["delete"](handler);
            };
        }
        function send(name, params) {
            var data = JSON.stringify({ m: name, p: params });
            var message = "~m~" + data.length + "~m~" + data;
            connection.send(message);
        }
        function close() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            connection.on('close', resolve);
                            connection.on('error', reject);
                            connection.close();
                        })];
                });
            });
        }
        var token, resp, connection, subscribers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = 'unauthorized_user_token';
                    if (!options.sessionId) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, axios_1["default"])({
                            method: 'get',
                            url: 'https://www.tradingview.com/disclaimer/',
                            headers: { "Cookie": "sessionid=".concat(options.sessionId) }
                        })];
                case 1:
                    resp = _a.sent();
                    token = resp.data.match(/"auth_token":"(.+?)"/)[1];
                    _a.label = 2;
                case 2:
                    connection = new ws.WebSocket("wss://prodata.tradingview.com/socket.io/websocket", {
                        origin: "https://prodata.tradingview.com"
                    }).setMaxListeners(400);
                    subscribers = new Set();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            connection.on('error', function (error) { return reject(error); });
                            connection.on('message', function (message) {
                                var payloads = parseMessage(message.toString());
                                var _loop_1 = function (payload) {
                                    switch (payload.type) {
                                        case 'ping':
                                            connection.send(payload.data);
                                            break;
                                        case 'session':
                                            send('set_auth_token', [token]);
                                            resolve({ subscribe: subscribe, send: send, close: close });
                                            break;
                                        case 'event':
                                            var event_1 = {
                                                name: payload.data.m,
                                                params: payload.data.p
                                            };
                                            subscribers.forEach(function (handler) { return handler(event_1); });
                                            break;
                                        default:
                                            throw new Error("unknown payload: ".concat(payload));
                                    }
                                };
                                for (var _i = 0, payloads_1 = payloads; _i < payloads_1.length; _i++) {
                                    var payload = payloads_1[_i];
                                    _loop_1(payload);
                                }
                            });
                        })];
            }
        });
    });
}
exports.connect = connect;
function getCandlesV2(_a) {
    var connection = _a.connection, symbols = _a.symbols, _b = _a.amount, amount = _b === void 0 ? 1000 : _b, _c = _a.timeframe, timeframe = _c === void 0 ? '1D' : _c;
    return __awaiter(this, void 0, void 0, function () {
        var d;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (symbols.length === 0)
                        return [2 /*return*/, []]; // at most make 10 requests every second, but evenly spaced.
                    d = symbols.map(function (symbol) { return new Promise(function (resolve, reject) {
                        var chartSession = "cs_" + randomstring.generate(12);
                        var batchSize = amount && amount < types_1.MAX_BATCH_SIZE ? amount : types_1.MAX_BATCH_SIZE;
                        connection.send('chart_create_session', [chartSession, '']);
                        connection.send('resolve_symbol', [
                            chartSession,
                            "sds_sym_0",
                            '=' + JSON.stringify({ symbol: symbol, adjustment: 'splits' })
                        ]);
                        connection.send('create_series', [
                            chartSession, 'sds_1', 's0', 'sds_sym_0', timeframe.toString(), batchSize, ''
                        ]);
                        connection.subscribe(function (_a) {
                            var _b, _c;
                            var name = _a.name, params = _a.params;
                            if (name === "timescale_update") {
                                resolve((_c = (_b = params[1]) === null || _b === void 0 ? void 0 : _b.sds_1) === null || _c === void 0 ? void 0 : _c.s);
                            }
                            if (name === "symbol_error") {
                                resolve([]);
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(d)];
                case 1: return [2 /*return*/, _d.sent()];
            }
        });
    });
}
exports.getCandlesV2 = getCandlesV2;
function getCandles(_a) {
    var connection = _a.connection, _b = _a.timeframe, timeframe = _b === void 0 ? 60 : _b, _c = _a.symbolswithDetail, symbolswithDetail = _c === void 0 ? [{ ticker: "IDX:TLKM", barcount: 2 }] : _c;
    return __awaiter(this, void 0, void 0, function () {
        var chartSession;
        return __generator(this, function (_d) {
            if (symbolswithDetail.length === 0)
                return [2 /*return*/, []];
            chartSession = "cs_" + randomstring.generate(12);
            // const batchSize = amount && amount < MAX_BATCH_SIZE ? amount : MAX_BATCH_SIZE
            return [2 /*return*/, new Promise(function (resolve) {
                    var allCandles = [];
                    var currentSymCandles = [];
                    var currentSymIndex = 0;
                    var symbol = symbolswithDetail[currentSymIndex].ticker;
                    var amount = symbolswithDetail[currentSymIndex].barcount;
                    var batchSize = amount && amount < types_1.MAX_BATCH_SIZE ? amount : types_1.MAX_BATCH_SIZE;
                    connection.send('chart_create_session', [chartSession, '']);
                    connection.send('resolve_symbol', [
                        chartSession,
                        "sds_sym_0",
                        '=' + JSON.stringify({ symbol: symbol, adjustment: 'splits' })
                    ]);
                    connection.send('create_series', [
                        chartSession, 'sds_1', 's0', 'sds_sym_0', timeframe.toString(), batchSize, ''
                    ]);
                    var unsubscribe = connection.subscribe(function (event) {
                        // received new candles
                        if (event.name === 'timescale_update') {
                            var newCandles = event.params[1]['sds_1']['s'];
                            if (newCandles.length > batchSize) {
                                newCandles = newCandles.slice(0, -currentSymCandles.length);
                            }
                            currentSymCandles = newCandles.concat(currentSymCandles);
                            return;
                        }
                        // loaded all requested candles
                        if (['series_completed', 'symbol_error'].includes(event.name)) {
                            var loadedCount = currentSymCandles.length;
                            // if (loadedCount > 0 && loadedCount % batchSize === 0 && (!amount || loadedCount < amount)) {
                            //   connection.send('request_more_data', [chartSession, 'sds_1', batchSize])
                            //   return
                            // }
                            if (loadedCount > 0 && (!amount || loadedCount < amount)) {
                                connection.send('request_more_data', [chartSession, 'sds_1', batchSize]);
                                return;
                            }
                            // loaded all candles for current symbol
                            if (amount)
                                currentSymCandles = currentSymCandles.slice(0, amount);
                            var candles = currentSymCandles.map(function (c) { return ({
                                timestamp: c.v[0],
                                open: c.v[1],
                                high: c.v[2],
                                low: c.v[3],
                                close: c.v[4],
                                volume: c.v[5]
                            }); });
                            allCandles.push(candles);
                            // next symbol
                            if (symbolswithDetail.length - 1 > currentSymIndex) {
                                currentSymCandles = [];
                                currentSymIndex += 1;
                                symbol = symbolswithDetail[currentSymIndex].ticker;
                                amount = symbolswithDetail[currentSymIndex].barcount;
                                batchSize = amount && amount < types_1.MAX_BATCH_SIZE ? amount : types_1.MAX_BATCH_SIZE;
                                connection.send('resolve_symbol', [
                                    chartSession,
                                    "sds_sym_".concat(currentSymIndex),
                                    '=' + JSON.stringify({ symbol: symbol, adjustment: 'splits' })
                                ]);
                                connection.send('modify_series', [
                                    chartSession,
                                    'sds_1',
                                    "s".concat(currentSymIndex),
                                    "sds_sym_".concat(currentSymIndex),
                                    timeframe.toString(),
                                    ''
                                ]);
                                return;
                            }
                            // all symbols loaded
                            unsubscribe();
                            resolve(allCandles);
                        }
                    });
                })];
        });
    });
}
exports.getCandles = getCandles;
function connectAndSubscribe(_a) {
    var connection = _a.connection, symbols = _a.symbols, _b = _a.timeframe, timeframe = _b === void 0 ? 1 : _b;
    return __awaiter(this, void 0, void 0, function () {
        var chartSession, currentSymIndex, symbol;
        return __generator(this, function (_c) {
            if (symbols.length === 0)
                return [2 /*return*/, []];
            chartSession = "cs_" + randomstring.generate(12);
            currentSymIndex = 0;
            symbol = symbols[currentSymIndex];
            connection.send('chart_create_session', [chartSession, '']);
            connection.send(exports.EVENT_NAMES.RESOLVE_SYMBOL, [
                chartSession,
                "sds_sym_0",
                '=' + JSON.stringify({ symbol: symbol, adjustment: 'splits' })
            ]);
            connection.send(exports.EVENT_NAMES.CREATE_SERIES, [
                chartSession, 'sds_1', 's0', 'sds_sym_0', timeframe.toString(), 1, ''
            ]);
            connection.subscribe(function (event) {
                var _a;
                if (event.name = "event") {
                    if (((_a = event.params.p[1].sds_1) === null || _a === void 0 ? void 0 : _a.s) !== undefined) {
                        var candles = {
                            timestamp: event.params.p[1].sds_1.s[0].v[0],
                            open: event.params.p[1].sds_1.s[0].v[1],
                            high: event.params.p[1].sds_1.s[0].v[2],
                            low: event.params.p[1].sds_1.s[0].v[3],
                            close: event.params.p[1].sds_1.s[0].v[4],
                            volume: event.params.p[1].sds_1.s[0].v[5],
                            symbol: symbol
                        };
                        // callback(candles)
                    }
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.connectAndSubscribe = connectAndSubscribe;
