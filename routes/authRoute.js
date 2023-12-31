import express from 'express'
import { registerController,loginController, testController, forgotPasswordController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

//router object
const router=express.Router()


//routing
//register || Method post
router.post('/register',registerController)

//Login  || Method post
router.post('/login',loginController)


//forget password || Method post

router.post('/forgot-password',forgotPasswordController)


//test || Method get
router.get('/test',requireSignIn,isAdmin,testController)

//protectd route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
export default router
