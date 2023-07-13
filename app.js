const express=require('express')
const  connectDB=require('./config/db')
const authRoutes = require('./routes/authRoutes');


const app =express();


connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/auth', authRoutes);
const port=process.env.PORT||3000

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})
