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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const url = 'https://www.palabrasaleatorias.com/palavras-aleatorias.php';
function params(wordsQtd) {
    return `?fs=${wordsQtd}&fs2=0&Submit=Nova+palavra`;
}
function getWords(wordsQtd = 5) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, axios_1.default)({
                method: 'get',
                url: `${url}${params(wordsQtd)}`,
            });
            const dom = new JSDOM(response.data);
            const words = [];
            const divList = dom.window.document.querySelectorAll("table > tbody > tr > td > div");
            divList.forEach(div => {
                if (div.textContent)
                    words.push(div.textContent.replace('\n', ''));
            });
            return words;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = getWords;
