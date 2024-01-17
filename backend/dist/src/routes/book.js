"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_1 = require("../controllers/book");
const multer_1 = __importDefault(require("../utils/multer"));
const router = (0, express_1.Router)();
router.get('/', book_1.getBooks);
router.get('/:id', book_1.getById);
router.get('/categories/:cat', book_1.getByCategory);
router.post('/', multer_1.default.single("file"), book_1.createBook);
router.patch('/:id', book_1.updateBook);
router.delete('/:id', book_1.deleteBook);
exports.default = router;
