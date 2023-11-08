import express  from "express"
import routesBooks from '../routes/book'
import routesUsers from '../routes/user'
import routesCategories from '../routes/category'
import { Book } from "./book";
import { User } from "./user";
import cors from "cors";
import { Category } from "./category";

export class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Aplicacion corriendo en el puerto ' + this.port)
    })
  }

  routes() {
    this.app.use('/api/books', routesBooks);
    this.app.use('/api/users', routesUsers);
    this.app.use('/api/categories', routesCategories)
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors())
  }

  async dbConnect() {
    try {
      await Book.sync()
      await User.sync()
      await Category.sync()
      console.log('Connection has been established successfully');
    } catch(error) {
      console.error('Unable to connecto to the database: ', error)
    }
  }
}