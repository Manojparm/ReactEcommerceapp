import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import authRoutes from './routes/authRoute.js'
dotenv.config()
//It is a rest object

const app=express()

connectDB()
//middleware
app.use(express.json())
app.use(morgan('dev'))

//routs
app.use('/api/v1/auth',authRoutes);


//Rest Api's
app.get('/',(req,res)=>{
    res.send('<h1>Welcom to my ECOM Project');
})

const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`)
})