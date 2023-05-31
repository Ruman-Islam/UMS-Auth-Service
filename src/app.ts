import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './modules/users/users.route'
const app: Application = express()

app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', usersRouter)

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working!')
})

export default app
