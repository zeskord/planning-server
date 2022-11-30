"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const api = __importStar(require("./api"));
const app = (0, express_1.default)();
const port = config_1.default.get("port");
const useSsl = config_1.default.get("useSsl");
// Публикуем клиент.
app.use(express_1.default.static(path_1.default.resolve("/home", "planning-client", "build")));
// Добавляем маршруты api
api.addApiRoutes(app);
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
    // Отдаем клиент.
    app.get("*", (req, res) => {
        const rootpath = path_1.default.resolve("/home", "planning-client", "build");
        const options = { root: rootpath };
        // const clientPath: string = path.resolve(rootpath, "index.html")
        res.sendFile("index.html", options);
    });
    https_1.default.createServer(sslOptions, app).listen(port);
}
else {
    http_1.default.createServer(app).listen(port);
}
app.get("/", (req, res) => {
    res.send("OK");
});
