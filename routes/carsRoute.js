import express from 'express';
import { addCar, getAllCars, getAllBrands, getOneCar } from '../functions/cars.js';
const router = express.Router()

router.options('/getAllCars',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.header('Allow', 'GET, HEAD, OPTIONS');
})

router.get('/', (req, res) => {
  res.send('cars home page!')
})

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