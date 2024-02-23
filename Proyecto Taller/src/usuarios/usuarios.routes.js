'use strict'

import  express  from "express"
import { deleteU, login, register, updateUser } from "./usuarios.controller.js"

const api = express.Router()

api.post('/register',register)
api.post('/login',login)
api.put('/update/:id',updateUser)
api.delete('/delete/:id',deleteU)

export default api