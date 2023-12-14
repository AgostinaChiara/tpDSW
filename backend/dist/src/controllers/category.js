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
exports.updateCategory = exports.createCategory = exports.getById = exports.getCategories = void 0;
const category_1 = require("../models/category");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listCats = yield category_1.Category.findAll();
        res.status(200).json(listCats);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getCategories = getCategories;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cat = yield category_1.Category.findByPk(id);
    if (cat)
        return res.status(200).json(cat);
    res.status(404).json({ error: 'Category not found' });
});
exports.getById = getById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield category_1.Category.create(body);
        res.status(201).json({
            msg: `Category created successfully!`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: `Woo, there was an error`
        });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const category = yield category_1.Category.findByPk(id);
        if (category) {
            yield category.update(body);
            res.status(200).json({
                msg: 'The category was updated successfully'
            });
        }
        else {
            res.status(404).json({
                msg: `No category found with ID ${id}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Oops, an error occurred. Please contact support.`
        });
    }
});
exports.updateCategory = updateCategory;
