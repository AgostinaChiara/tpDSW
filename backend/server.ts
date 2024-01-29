import express  from "express"
import routesBooks from './src/routes/book'
import routesUsers from './src/routes/user'
import routesCategories from './src/routes/category'
import routesOrders from './src/routes/order'
import { Book } from "./src/models/book";
import { User } from "./src/models/user";
import cors from "cors";
import { Category } from "./src/models/category";
import { Order } from "./src/models/order"
import { OrderItem } from "./src/models/order"

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
    this.app.use('/api/orders', routesOrders);
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
      await Order.sync()
      await OrderItem.sync()
      console.log('Connection has been established successfully');
    } catch(error) {
      console.error('Unable to connecto to the database: ', error)
    }
  }
}