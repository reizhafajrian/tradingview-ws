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
var index_1 = require("./src/index");
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var data, start, connection, candles, end, time, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = ["TLKM", "UNVR", "ADRO", "ICBP", "ANTM", "INDF", "PGAS", "PTBA", "KLBF", "WIKA", "ADHI", "JPFA", "ITMG", "MYOR", "AALI", "MNCN", "UNTR", "PTPP", "CTRA", "SMGR", "BRIS", "CPIN", "PWON", "BSDE", "INTP", "SIDO", "HRUM", "LPPF", "SMRA", "INCO", "SCMA", "LSIP", "EXCL", "KAEF", "TINS", "ERAA", "FREN", "ACES", "INKP", "ELSA", "MDKA", "TKIM", "AKRA", "BRPT", "KIJA", "ISAT", "BTPS", "BMTR", "EMTK", "ULTJ", "BRMS", "ASRI", "INAF", "DMAS", "SMDR", "MIKA", "MAPI", "GJTL", "ENRG", "WTON", "PTRO", "MPMX", "RALS", "TPIA", "WEGE", "APLN", "MLPL", "IRRA", "SMBR", "BANK", "CLEO", "MTDL", "AGII", "HOKI", "AUTO", "POWR", "LPKR", "FILM", "MPPA", "PNBS", "DMMX", "WOOD", "BKSL", "RAJA", "BEST", "ISSP", "SIMP", "GOOD", "MAIN", "WIRG", "IPTV", "SOCI", "HEXA", "NIKL", "BIRD", "SILO", "SAME", "BSSR", "BOSS", "EKAD", "MBAP", "IPCC", "LINK", "MBSS", "SMMT", "WMUU", "MTEL", "KPIG", "DKFT", "GZCO", "TOTL", "AISA", "FPNI", "FIRE", "KBLI", "TMAS", "TSPC", "ACST", "CAMP", "PALM", "PSAB", "KINO", "MSIN", "SMSM", "LPCK", "DEWA", "PTSN", "SSIA", "JAST", "DSNG", "YELO", "ROTI", "DILD", "PSSI", "TAPG", "KREN", "JRPT", "PURA", "SGRO", "TGRA", "PRDA", "JAYA", "ARNA", "LUCK", "MERK", "PEHA", "MARK", "DGNS", "MLPT", "KIOS", "SLIS", "MCAS", "KKGI", "TOYS", "HEAL", "ABMM", "INDR", "NICL", "BUDI", "CEKA", "PPRE", "BYAN", "ADES", "IPCM", "BISI", "KBAG", "MMLP", "REAL", "CCSI", "TOTO", "META", "TRUK", "SGER", "CAKK", "ASGR", "CSRA", "COAL", "MYOH", "KOBX", "TCPI", "BEBS", "ADMG", "PZZA", "DGIK", "MAPA", "FAST", "MLIA", "IKAN", "GEMS", "ESIP", "WINS", "TRIN", "PBID", "MRAT", "DVLA", "AYLS", "SPMA", "JKON", "BMHS", "TNCA", "SOHO", "BCIP", "LAND", "RANC", "PKPK", "FOOD", "GDST", "UCID", "NELY", "RBMS", "NRCA", "SMCB", "WEHA", "TECH", "LTLS", "MITI", "TPMA", "HDIT", "PTDU", "NFCX", "IPPE", "BAPA", "INDX", "ASHA", "RIGS", "PANI", "MDKI", "MPOW", "MSKY", "KOTA", "HAIS", "CSIS", "BMSR", "ZYRX", "SHIP", "DSFI", "KEEN", "AVIA", "CLPI", "SPTO", "GPRA", "HOPE", "ANJT", "KEJU", "WIFI", "PRIM", "PSKT", "PAMG", "RODA", "ITMA", "HRME", "KAYU", "DMND", "ALDO", "TRUE", "STTP", "SAMF", "CMNP", "IGAR", "DIVA", "UNIQ", "TRJA", "KBLM", "ARCI", "OPMS", "ADCP", "RMKE", "IPOL", "APEX", "ZBRA", "EDGE", "EPMT", "BELL", "BTON", "DADA", "EAST", "BAUT", "TFAS", "CMRY", "TOPS", "COCO", "ANDI", "BESS", "PJAA", "LPIN", "IKAI", "INCI", "ASLC", "MTPS", "MAPB", "HERO", "ARII", "ICON", "DRMA", "CASS", "UNIC", "GDYR", "WINR", "SMDM", "SICO", "MCOL", "DIGI", "KICI", "DSSA", "MORA", "SRAJ", "TEBE", "MTLA", "KARW", "CBMF", "HATM", "SCCO", "BOGA", "SEMA", "SBMA", "GWSA", "BUKK", "KDSI", "TAMU", "LABA", "TCID", "STAA", "OILS", "AMFG", "GGRP", "KRYA", "INDS", "CITA", "GTSI", "PCAR", "MASA", "IMPC", "EPAC", "KJEN", "DWGL", "ENZO", "NPGF", "TRIS", "OBMD", "AKSI", "TBMS", "IFII", "MFMI", "AXIO", "TGKA", "SMKL", "AKPI", "IDPR", "MINA", "BLUE", "IIKP", "NASI", "DUTI", "GOLD", "VOKS", "GLVA", "JTPE", "ATAP", "TAMA", "MICE", "PBSA", "UFOE", "KIAS", "CSAP", "PMJS", "LION", "BAPI", "WAPO", "BBSS", "NTBK", "MEDS", "CANI", "ESTI", "DPNS", "LRNA", "VICI", "SAPX", "GHON", "WMPP", "SKBM", "MBTO", "PLIN", "ASPI", "NZIA", "IFSH", "MIDI", "CINT", "APII", "URBN", "LMPI", "BKDP", "HITS", "DEWI", "AIMS", "KOPI", "BIPP", "FITT", "TMPO", "BATA", "CITY", "BRAM", "SURE", "SIPD", "INTD", "BOLT", "ALKA", "TARA", "SKLT", "KUAS", "PORT", "GPSO", "CRAB", "YPAS", "FISH", "SDPC", "MTMH", "LMSH", "SOSS", "APLI", "TOOL", "PTPW", "RISE", "KONI", "SHID", "PGLI", "MTFN", "IKBI", "ZONE", "AMIN", "BIKE", "CPRI", "JIHD", "TRST", "JECC", "GAMA", "MTSM", "TFCO", "SCNP", "BLTA", "SINI", "BBRM", "BIKA", "MKPI", "SCPI", "KOIN", "ENAK", "IBST", "ALMI", "RDTX", "SNLK", "MIRA", "BRNA", "CTBN", "SOTS", "MKNT", "CHEM", "TURI", "BAYU", "ECII", "FMII", "OMRE", "PGUN", "DEPO", "KMDS", "DAYA", "KKES", "PURI", "BLTZ", "HOMI", "BOBA", "SWID", "GMTD", "LCKM", "SSTM", "PUDP", "PTSP", "AMAN", "GEMA", "JSPT", "RSGK", "CSMI", "EMDE", "AGAR", "PNSE", "JGLE", "BINO", "MGNA", "TAYS", "RAFI", "ELPI", "BUAH", "GULA", "JMAS"];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    start = new Date().getTime();
                    return [4 /*yield*/, (0, index_1.connect)()];
                case 2:
                    connection = _a.sent();
                    return [4 /*yield*/, (0, index_1.getCandlesV2)({
                            connection: connection,
                            symbols: data.map(function (res) { return "IDX:".concat(res); }),
                            amount: 2,
                            timeframe: "1D"
                        })];
                case 3:
                    candles = _a.sent();
                    console.log(candles);
                    end = new Date().getTime();
                    time = end - start;
                    console.log('Execution time: ' + time);
                    connection.close();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}());
