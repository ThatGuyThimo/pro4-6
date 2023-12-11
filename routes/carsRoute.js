import express from 'express';
import { addCar, getAllCars, getAllBrands, getOneCar } from '../functions/cars.js';
const router = express.Router()

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

router.post('/addCar', (req, res) => {
  addCar(req, res)
})

export { router }