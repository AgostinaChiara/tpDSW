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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getFeaturedBooks = exports.getByCategory = exports.getById = exports.getBooks = void 0;
const book_1 = require("../models/book");
const sequelize_1 = require("sequelize");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtenemos los parámetros de consulta de la solicitud
    const { name, limit, orderBy } = req.query;
    // Crea un objeto de opciones para personalizar la búsqueda
    const options = {};
    // Agrega una cláusula WHERE para buscar por nombre si se proporciona
    if (name) {
        options.where = {
            title: {
                [sequelize_1.Op.like]: `%${name}%`, // Búsqueda parcial por nombre
            },
        };
    }
    // Agrega una cláusula de ordenamiento si se proporciona
    if (orderBy) {
        if (orderBy === 'lowerPrice') {
            options.order = [['price', 'ASC']];
        }
        else if (orderBy === 'higherPrice') {
            options.order = [['price', 'DESC']];
        }
        else if (orderBy === 'relevance') {
            options.order = [['isbn', 'ASC']];
        }
    }
    // Agrega una cláusula de límite si se proporciona
    if (limit) {
        options.limit = parseInt(limit);
    }
    try {
        const listBooks = yield book_1.Book.findAll(options);
        res.json(listBooks);
    }
    catch (error) {
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
            category: cat
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
    const { body } = req;
    try {
        yield book_1.Book.create(body);
        res.json({
            msg: `Book created successfully!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Woo, there was an error`
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
            yield book.update(body);
            res.json({
                msg: 'El libro fue actualizado con exito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un libro con el isbn ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield book_1.Book.findByPk(id);
    if (!book) {
        res.status(404).json({
            msg: `No existe un libro con el isbn ${id}`
        });
    }
    else {
        yield book.destroy();
        res.json({
            msg: 'El libro fue eliminado con exito!'
        });
    }
});
exports.deleteBook = deleteBook;
