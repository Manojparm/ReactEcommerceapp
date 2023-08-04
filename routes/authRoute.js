import express from 'express'
import { registerController,loginController, testController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

//router object
const router=express.Router()


//routing
//register || Method post
router.post('/register',registerController)

//Login  || Method post
router.post('/login',loginController)

//test || Method get
router.get('/test',requireSignIn,isAdmin,testController)


export default router
