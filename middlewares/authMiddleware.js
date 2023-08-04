import JWT from 'jsonwebtoken'

//Protected Routes token

export const requireSignIn=async(req,res,next)=>{
try{
    const decode=JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECERET  
    );
    req.user=decode;
    next();
}catch(err){
    console.log(err);
}

}

export const isAdmin=async(req,res,next)=>{
    try{
    const user=await userModel.findById(req.user._id);
    if(user.role !==1){
        return res.status(401).send({
            success:false,
            message:"unAuthorized Access",
        });
    }  else {
        next();
    }
    }catch(err){
        console.log(err);
        res.status(401).send({
            success:false,
            err,
            message:"error in admin middleware"
        })
    }
}