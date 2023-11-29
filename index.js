import express from 'express';
import 'dotenv/config';
import {router as carRoutes} from './routes/cars.js';

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/cars', carRoutes)

app.listen(port, () => {
  console.log(`Express listening on port ${port}`)
})