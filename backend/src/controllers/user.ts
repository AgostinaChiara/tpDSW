import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { User } from "../models/user";
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;

  //Validamos si el usuario ya existe en la base de datos
  const user = await User.findOne({ 
    where: {
      [Op.or]: [
        { username: username },
        { email: email }
      ]
    } 
  })

  if(user) {
    res.status(400).json({
      msg: `Ya existe un usuario con el nombre ${username} o email ${email}` 
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  
  try {
    await User.create({
      email: email,
      username: username,
      password: hashedPassword,
      role: role
    })
  
    res.json({
      msg: `Usuario ${username} creado exitosamente`,
    })
  } catch (error) {
    res.status(400).json({
      msg: 'upss ocurrio un error', error
    })    
  }
}
export const loginUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  //Validamos si el usuario existe en la base de datos
  const user: any = await User.findOne({ where: { username: username } })

  if(!user) {
    return res.status(400).json({
      msg: `No existe un usuario con el nombre ${username} en la base de datos`
    })
  }
  
  //Validamos password
  const passwordValid = await bcrypt.compare(password, user.password);
  if(!passwordValid) {
    return res.status(400).json({
      msg: `Password incorrecta`
    })
  }

  //Generamos token
  const token = jwt.sign({
    username: username,
    role: role
  }, process.env.SECRET_KEY || '123')
  res.json(token)
}