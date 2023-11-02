import { validateUser, validatePartialUser } from '../schemas/user.js'
import bcrypt from 'bcrypt'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  getAll = async (req, res) => {
    const users = await this.userModel.getAll()
    res.json(users)
  }

  getByEmail = async (req, res) => {
    const { email } = req.params
    const user = await this.userModel.getByEmail({ email })
    if (user) return res.json(user)
    res.status(404).json({ message: 'User not found' })
  }

  getByUser = async(req, res) => {
    const { username } = req.params
    const user = await this.userModel.getByUser({username})
    if (user) return res.json(user)
    res.status(404).json({ message: 'User not found' })
  }

  create = async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    const result = validateUser(req.body)
    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await this.userModel.create({ input: result.data })

    res.status(201).json(newUser)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.userModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({ message: 'User deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialUser(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    try {
      const updatedUser = await this.userModel.update({ id, input: result.data });
    
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  }
}