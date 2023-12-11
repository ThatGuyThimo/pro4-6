import express from 'express';
import https from 'https';
import fs from 'fs'
import 'dotenv/config';
import {router as carRoutes} from './routes/carsRoute.js';
import {router as userRouter} from './routes/usersRoute.js'

const app = express()
const port = process.env.PORT

const options = {
  key: fs.readFileSync("./data/certs/thimodehaankey.pem"),
  cert: fs.readFileSync("./data/certs/www_thimodehaan_com.crt"),
  passphrase: process.env.PHASSPHRASE
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/cars', carRoutes)
app.use('/users', userRouter)

app.listen(80, () => {
  console.log(`Express listening on port ${80}`)
})

https.createServer(options, app).listen(8080);