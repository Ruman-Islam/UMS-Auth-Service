import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

          app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// testing
app.get('/', (req: Request, res: any) => {
  res.send('Working!')
})

export default app
