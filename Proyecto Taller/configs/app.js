import express  from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { config } from 'dotenv'
import userRoutes from '../src/usuarios/usuarios.routes.js'
import categoryRoutes from '../src/categorias/categories.routes.js'
import productRoutes from '../src/productos/productos.routes.js'


const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(userRoutes)
app.use('/category',categoryRoutes)
app.use('/product',productRoutes)

export const initServer = () =>{
    app.listen(port)
    console.log(`Server HTTP running in port: ${port}`)
}