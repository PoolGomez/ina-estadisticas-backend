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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cortsOptions = {
    origin: "http://localhost:5173",
    // methods:["GET","POST","PUT","DELETE"],
    // allowedHeaders:["Content-Type","Authorization"],
    // credentials: true,
};
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((0, cors_1.default)({ origin: 'http://localhost:5173', // Especifica el dominio permitido
                credentials: true // Permite el uso de cookies
            }));
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, cookie_parser_1.default)());
            this.app.use(this.routes);
            this.app.use(middleware_1.errorHandler);
            this.app.listen(this.port, () => {
                console.log("listening on port " + this.port);
            });
        });
    }
}
exports.Server = Server;
