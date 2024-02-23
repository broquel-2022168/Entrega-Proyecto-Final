'use strict'

import express from "express"
import { addP, get, updateP } from './productos.controller.js'


const api = express.Router()

api.post('/save',addP)
api.get('/get',get)
api.put('/update/:id',updateP)

export default api