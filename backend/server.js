import express from  'express'
import dotenv from "dotenv"
import colors from 'colors'
import { notFound,errorHandler  } from './middleware/errorMiddleware.js'
// import products from './data/products.js' 
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import products from './data/products.js'
import userRoutes from './routes/userRoutes.js'
// import orderRoutes from '.routes/orderRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


dotenv.config()

connectDB()

const app = express() 

app.use(express.json())





app.get('/',(req,res) =>{
 res.send('API is running....')
})

// app.get('/api/products',(req,res) =>{
//  res.json(products)
// })


// app.get('/api/products/:id',(req,res) =>{
//  const product = products.find((p) => p._id === req.params.id)
//  res.json(product)
// })


app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)

app.use(notFound)
//  for app.use, every req will go through these middleware before executing
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode  port ${PORT}`.yellow.bold))