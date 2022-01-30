"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors = require("cors");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use("/static", express_1.default.static(__dirname + '/frontend/static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
//parar poder receber arquivos json
app.use(express_1.default.json());
//habilitando cors
app.use(cors());
//centralizando todas as rotas
app.use("/api", routes_1.default);
