import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
//import { registerAutomatic } from './src/usuarios/usuarios.controller.js'

initServer()
connect()
//registerAutomatic()