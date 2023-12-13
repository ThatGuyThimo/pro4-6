import express from 'express';
import https from 'https';
import fs from 'fs'
import bodyParser from 'body-parser';
import 'dotenv/config';
import {router as carRoutes} from './routes/carsRoute.js';
import {router as userRouter} from './routes/usersRoute.js'

const app = express()
const httpPort = process.env.HTTPPORT
const httpsPort = process.env.HTTPSPORT

const options = {
  key: fs.readFileSync("./data/certs/thimodehaankey.pem"),
  cert: fs.readFileSync("./data/certs/thimodehaan.pem"),
  passphrase: process.env.PHASSPHRASE
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Conten-Type, Accept');
  if( req.headers?.accept === "application/json") {
    // if(req.method === "OPTIONS") {
    //   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
    //   res.header('Allow', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
    //   res.status(200).send('GET, PUT, POST, DELETE, HEAD, OPTIONS')
    // }
    next()
  } else {
    res.status(400).send("Bad Headers!")
  }
})

app.get('/', (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./data/webservice.json")))
})

app.use('/cars', carRoutes)
app.use('/users', userRouter)

app.listen(httpPort, () => {
  console.log(`Http listening on port ${httpPort}`)
})

https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Https listening on port ${httpsPort}`)
});