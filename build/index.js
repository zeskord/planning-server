"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Читаем настройки SSL.
const sslOptions = {
    key: fs_1.default.readFileSync('/etc/letsencrypt/live/zeskord.site/privkey.pem'),
    cert: fs_1.default.readFileSync('/etc/letsencrypt/live/zeskord.site/cert.pem'),
    ca: fs_1.default.readFileSync('/etc/letsencrypt/live/zeskord.site/chain.pem')
};
app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url);
});
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'planning-client', 'build', 'index.html'));
});
app.get("/", (req, res) => {
    res.send("OK");
});
app.listen(port, () => {
    console.log(`Сервер запущен, порт ${port}`);
});
