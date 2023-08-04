import mongoose from "mongoose";


const connectDB=async ()=>{
    try{
       const conn=await mongoose.connect(process.env.MONGO_URI);
       console.log(`connected to MongoDb database
        ${conn.connection.host}`)

    }
    catch(err){
      console.log(`Erro in MongoDB ${err}`);
    }
};

export default connectDB;