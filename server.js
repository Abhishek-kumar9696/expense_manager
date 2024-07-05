const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require("./config/connectDB");

//config dot env file 
dotenv.config();
//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//routes
// app.get('/', (req,res) =>{
//     res.send("<h1>Hello From Server</h1>");
// })

//user routes
app.use('/api/v1/users',require('./routes/userRoutes'))

//transections routes
app.use("/api/v1/transections",require("./routes/transectionRoutes"));
//port
const PORT = 8080 || process.env.PORT

//listening
app.listen(PORT,() =>{
    console.log(`Server Running On Port ${PORT}`)
})
