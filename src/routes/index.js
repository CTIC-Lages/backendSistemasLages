import express from 'express'
import itemRoute from './item'
import imagem from './imagem'
import auth from './auth'

import AuthController from '../controllers/auth'
const authController = new AuthController()
const router = express.Router()


//middleware das rotas
router.use('/login',auth)
//middleware responsável por checar permissão. 
//Senão tiver permissão não habita daqui para abaixo.
router.use(authController.check_token)
router.use('/site',itemRoute)
router.use('/imagem',imagem)


router.get('/', (req,res)=>{
    res.send("hello")
})

module.exports = router