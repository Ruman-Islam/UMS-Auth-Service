import { Request, Response } from 'express'
import usersServices from './users.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.createUser(req.body)
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to create user',
    })
  }
}

export default {
  createUser,
}
