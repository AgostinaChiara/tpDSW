import { validateUser, validatePartialUser } from '../schemas/user.js'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      await this.userModel.register({ username, email, password, role });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  }

  login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    const user = await this.userModel.login({ username, password });
    if (user) {
      // Inicio de sesión exitoso
      res.json(user);
    } else {
      res.status(401).json({ error: 'Username or password is incorrect' });
    }
  }

  deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await this.userModel.deleteUser({ id });
    if (user) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }

  updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updatedUser = await this.userModel.updateUser({ id, updates });
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  }
}