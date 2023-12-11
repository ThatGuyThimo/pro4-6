import express from 'express';
import https from 'https';
import fs from 'fs'
import 'dotenv/config';
import {router as carRoutes} from './routes/carsRoute.js';
import {router as userRouter} from './routes/usersRoute.js'

const app = express()
const httpPort = process.env.HTTPPORT
const httpsPort = process.env.HTTPSPORT

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

app.listen(httpPort, () => {
  console.log(`Http listening on port ${httpPort}`)
})

https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Https listening on port ${httpsPort}`)
});