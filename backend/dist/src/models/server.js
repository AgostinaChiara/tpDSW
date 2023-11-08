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
const book_1 = __importDefault(require("../routes/book"));
const user_1 = __importDefault(require("../routes/user"));
const category_1 = __importDefault(require("../routes/category"));
const book_2 = require("./book");
const user_2 = require("./user");
const cors_1 = __importDefault(require("cors"));
const category_2 = require("./category");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/books', book_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/categories', category_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield book_2.Book.sync();
                yield user_2.User.sync();
                yield category_2.Category.sync();
                console.log('Connection has been established successfully');
            }
            catch (error) {
                console.error('Unable to connecto to the database: ', error);
            }
        });
    }
}
exports.Server = Server;
