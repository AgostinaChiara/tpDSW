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
      msg: `The username ${username} or email ${email} is already in use` 
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
  
    res.status(201).json({
      msg: `User: ${username} created successfully`,
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Oopss, there was an error', error
    })    
  }
}
export const loginUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  //Validamos si el usuario existe en la base de datos
  const user: any = await User.findOne({ where: { username: username } })

  if(!user) {
    return res.status(400).json({
      msg: `The username ${username} does not exists`
    })
  }
  
  //Validamos password
  const passwordValid = await bcrypt.compare(password, user.password);
  if(!passwordValid) {
    return res.status(400).json({
      msg: `Incorrect Password`
    })
  }

  //Generamos token
  const token = jwt.sign({
    username: username,
    role: role
  }, process.env.SECRET_KEY || '123')
  res.json(token)
}