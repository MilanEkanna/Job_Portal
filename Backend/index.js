import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './UTILS/db.js'
import userRoutes from './routes/user.routes.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
import path from 'path'
dotenv.config({})

const PORT = process.env.PORT || 3000
const app = express()
const _dirname = path.resolve();


// middleware
app.use(express.urlencoded ({ extended: true }))
app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: 'https://job-portal-by-milan.onrender.com',
    credentials: true
}
app.use(cors(corsOptions))

//API's configuration
app.use('/api/v1/user', userRoutes) // Here we are doing mounting to the API's
app.use('/api/v1/company', companyRoute) // Here we are doing mounting to the API's
app.use('/api/v1/job', jobRoute) // Here we are doing mounting to the API's
app.use('/api/v1/application', applicationRoute) // Here we are doing mounting to the API's

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "/frontend", "dist", "index.html"))
})

app.listen( PORT, ()=>{// listen to port and this is a callback functionn
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})