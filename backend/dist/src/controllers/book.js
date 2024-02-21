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
exports.deleteBook = exports.updateBook = exports.createBook = exports.getFeaturedBooks = exports.getByCategory = exports.getById = exports.getBooks = void 0;
const book_1 = require("../models/book");
const sequelize_1 = require("sequelize");
const category_1 = require("../models/category");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, limit } = req.query;
    try {
        const options = {
            include: [{ model: category_1.Category, as: 'category', attributes: ['name'] }],
        };
        if (name) {
            options.where = {
                title: {
                    [sequelize_1.Op.like]: `%${name}%`,
                },
            };
        }
        if (limit) {
            options.limit = parseInt(limit, 10);
        }
        const listBooks = yield book_1.Book.findAll(options);
        res.json(listBooks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta de libros' });
    }
});
exports.getBooks = getBooks;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield book_1.Book.findByPk(id);
    if (book) {
        return res.json(book);
    }
    else {
        res.status(404).json({ message: 'Book not found' });
    }
});
exports.getById = getById;
const getByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat } = req.params;
    const book = yield book_1.Book.findAll({
        where: {
            categoryId: cat
        }
    });
    if (book)
        return res.json(book);
    res.status(404).json({ message: 'Book not found' });
});
exports.getByCategory = getByCategory;
const getFeaturedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listBooks = yield book_1.Book.findAll({ limit: 4 });
    res.json(listBooks);
});
exports.getFeaturedBooks = getFeaturedBooks;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body } = req;
    try {
        if (!req.file) {
            return res.status(400).json({
                msg: 'Falta cargar el archivo.',
            });
        }
        const existingBook = yield book_1.Book.findByPk(body.isbn);
        if (existingBook) {
            return res.status(400).json({
                msg: "El ISBN ya esta en uso."
            });
        }
        const result = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const imageUrl = result.url;
        yield book_1.Book.create(Object.assign(Object.assign({}, body), { image: imageUrl }));
        res.status(201).json({
            msg: `Libro creado exitosamente!`,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            msg: `Oops, hubo un error`,
        });
    }
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const book = yield book_1.Book.findByPk(id);
        if (book) {
            if (body.file === null || body.file === undefined) {
                delete body.file;
            }
            yield book.update(Object.assign({}, body));
            res.status(200).json({
                msg: 'El libro se actualizo correctamente!',
            });
        }
        else {
            res.status(404).json({
                msg: `El libro con ISBN ${id} no se encontro.`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: `El libro con ISBN ${id} no se encontro.`,
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield book_1.Book.findByPk(id);
    if (!book) {
        res.status(404).json({
            msg: `El libro con ISBN ${id} no se encontro.`
        });
    }
    else {
        yield cloudinary_1.default.uploader.destroy(book.image.split('/').pop().split('.')[0]);
        yield book.destroy();
        res.status(200).json({
            msg: 'Libro eliminado correctamente!!'
        });
    }
});
exports.deleteBook = deleteBook;
