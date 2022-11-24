"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const config_1 = __importDefault(require("config"));
const app = (0, express_1.default)();
const port = config_1.default.get("port");
const useSsl = config_1.default.get("useSsl");
// Публикуем клиент.
app.use(express_1.default.static(path_1.default.resolve(__dirname, "planning-client", "build")));
if (useSsl === true) {
    // Читаем настройки SSL.
    const sslOptions = {
        key: fs_1.default.readFileSync(config_1.default.get("sslOptions.key")),
        cert: fs_1.default.readFileSync(config_1.default.get("sslOptions.cert")),
        ca: fs_1.default.readFileSync(config_1.default.get("sslOptions.ca")),
    };
    // Перенаправляю на защищенный протокол, это нужно, чтобы работал телеграм бот.
    app.use((req, res, next) => {
        req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
    });
    https_1.default.createServer(sslOptions, app).listen(port);
}
else {
    http_1.default.createServer(app).listen(port);
}
// Отдаем клиент.
app.get("*", (req, res) => {
    const rootpath = path_1.default.resolve(__dirname, "planning-client", "build");
    const options = { root: rootpath };
    // const clientPath: string = path.resolve(rootpath, "index.html")
    res.sendFile("index.html", options);
});
app.get("/", (req, res) => {
    res.send("OK");
});
