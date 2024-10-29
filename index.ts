import express, { Application, Router } from 'express'
import { ProductController } from './src/controller/product.controller'
import { logger } from './src/middleware/logger.middleware'

const PORT: string = process.env.PORT ?? '3000'

const app: Application = express()
const router: Router = Router()

/** Body Parser */
app.use(express.json())
app.use((req, res, next) => logger(req, res, next))

/** Controladores */
const productController = new ProductController(router, app)


/** Health Check to check server status */
app.use('/', (req, res) => {
    res.status(200).json({ message: 'Health Check Ok' })
})

app.listen(PORT, () => {
    console.log(`Server started in PORT: ${PORT}`)
})
