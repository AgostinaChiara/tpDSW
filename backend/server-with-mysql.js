import { createApp } from './app.js'

import { BookModel } from './models/book.js'

import { CategoryModel } from './models/category.js'

createApp({ bookModel: BookModel, categoryModel: CategoryModel })