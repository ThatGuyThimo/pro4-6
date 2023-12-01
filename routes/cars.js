import express from 'express';
import { postCars, getAllCars, getAllBrands, getOneCar } from '../functions/cars.js';
const router = express.Router()

router.use((req, res, next) => {
  if(req.headers?.host === "coolcars.nl" && req.headers?.accept === "application/json") {
    next()
  } else {
    res.statusCode = 400
    res.send("Bad Headers!")
  }
})

router.get('/', (req, res) => {
  res.send('cars home page!')
})

// router.get('/about', (req, res) => {
//   res.json(json)
// })

router.get('/getAllCars', (req, res) => {
  getAllCars(req, res)
})

router.get('/getOneCar', (req, res) => {
  getOneCar(req, res)
})

router.get('/getAllBrands', (req, res) => {
  getAllBrands(req, res)
})

export { router }