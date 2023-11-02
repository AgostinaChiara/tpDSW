import { createApp } from './app.js'

import { BookModel } from './models/book.js'

import { CategoryModel } from './models/category.js'

import { UserModel } from './models/user.js'

createApp({ bookModel: BookModel, categoryModel: CategoryModel, userModel: UserModel })