import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import middleware from '@shared/middlewares/errorHandler'
import '@shared/typeorm'
import { errors } from 'celebrate'
import uploadConfig from '@config/upload'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)
app.use(errors())
app.use(middleware.errorHandler)

app.listen(3000, () => {
  console.log('server started on http://localhost:3000')
})
