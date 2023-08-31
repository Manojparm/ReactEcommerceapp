import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from './../helper/authHelper.js';
import JWT from 'jsonwebtoken';
export const registerController=async(req,res)=>{
  try{
      const {name,email,password,phone,address,answer}=req.body;

      //validation
      if(!name){
        return res.send({message:'Name is Requird'})
      }

      if(!email){
        return res.send({message:'email is Requird'})
      }

      if(!password){
        return res.send({message:'password is Requird'})
      }

      if(!phone){
        return res.send({message:'Phone is Requird'})
      }

      if(!address){
        return res.send({message:'address is Requird'})
      }
      if(!answer){
        return res.send({message:"answer is required"})
      }

      //check user
      const existingUser=await userModel.findOne({email})
      //existing user
      if(existingUser){
        return res.status(200).send({
            success:fasle,
            message:"Already Register please login"
        })
      }

      //register user
      const hashedPassword=await hashPassword(password)

      //save
      const user= await new userModel({name,
        email,
        phone,
        address,
        answer,
        password:hashedPassword
    }).save();
      
      res.status(201).send({
        success:true,
        message:"User Register Successfully",
        user,
      })
  
    } catch(error){
    console.log(error);
     res.status(500).send({
        success:false,
        message:"error in registration",
        error,
     })
  }
};

//Method:Post LOgin
export const loginController=async(req,res)=>{
   try{
    const {email,password}=req.body

    //validation
    if(!email || !password){
      return res.status(404).send({
        success:false,
        message:"Invalid email or password"
      })
    }
    //chek user
    const user=  await userModel.findOne({email})
    if(!user){
      return res.stauts(404).send({
        success:false,
        message:"Email is not registered"
      })
    }
   
    const match=await comparePassword(password,user.password)
    if(!match){
      return res.status(200).send({
        success:false,
        message:"Invalid Password"
      })
    }
    const token= await JWT.sign({_id:user._id},process.env.JWT_SECERET,{
      expiresIn:"7d",
    });
    res.status(200).send({
      success:true,
      mesage:"login successfully",
      user: {
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
      },
      token,
    });
   } catch(error){
      console.log(error);
      res.status(500).send({
        success:false,
        message:"Error in Login",
        error
      })
   }
};
//forget password controller method post
export const forgotPasswordController=async(req,res)=>{
  try{
      const {email,answer,newPassword}=req.body;
      //validating
      if(!email){
        res.status(400).send({message:"email is required"})
      }
      if(!answer){
        res.status(400).send({message:"answer is required"})
      }
      if(!newPassword){
        res.status(400).send({message:"new password is required"})
      }
      //check
      const user=await userModel.findOne({email,answer})
      //validation
      if(!user){
        return res.status(404).send({
          success:false,
          mesage:"Wrong email or answer"
        })
      }

    const hashed=await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    
    res.status(200).send({
      success:true,
      message:"password reset successfully"
    })
  }
  catch(error){
       console.log(error)
       res.staus(500).send({
             success:false,
             message:"something went wrong",
             error
       })
  }
}
export const testController=(req,res)=>{
  res.send("Protected Routes")
};






