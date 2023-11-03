import { Router } from 'express'
import { UserController } from '../controllers/user.js'

export const createUserRouter = ({ userModel }) => {
  const usersRouter = Router()

  const userController = new UserController({ userModel })

  usersRouter.post('/register', userController.register);
  usersRouter.post('/login', userController.login);
  usersRouter.delete('/:id', userController.deleteUser);
  usersRouter.patch('/:id', userController.updateUser);

  return usersRouter
}