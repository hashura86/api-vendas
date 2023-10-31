import 'reflect-metadata'
import 'express-async-errors'

import express from 'express'
import cors from 'cors'
import routes from './routes'
import middleware from '@shared/middlewares/middleware'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(middleware.errorHandler)

app.listen(3000, () => {
  console.log('server started on http://localhost:3000')
})
