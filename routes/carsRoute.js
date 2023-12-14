import express from 'express';
import { addCar, getAllCars, getAllBrands, getOneCar, deleteCar } from '../functions/cars.js';
const router = express.Router()

router.get('/', (req, res) => {
  // res.json({})
  getAllCars(req, res)
})

router.get('/getAllCars', (req, res) => {
  getAllCars(req, res)
})

router.get('/getOneCar', (req, res) => {
  getOneCar(req, res)
})
router.get('/:_id', (req, res) => {
  getOneCar(req, res)
})

router.get('/getAllBrands', (req, res) => {
  getAllBrands(req, res)
})

router.post('/addCar', (req, res) => {
  addCar(req, res)
})
router.post('/', (req, res) => {
  addCar(req, res)
})

router.delete('/deleteCar/:_id', (req, res) => {
  deleteCar(req, res)
})
router.delete('/:_id', (req, res) => {
  deleteCar(req, res)
})

router.options('/',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Allow', 'GET, POST, OPTIONS');
  res.status(200)
  res.send('GET, POST, OPTIONS')
})
router.options('/details',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Allow', 'GET, OPTIONS');
  res.status(200)
  res.send('GET, OPTIONS')
})
router.options('/getAllCars',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Allow', 'GET, OPTIONS');
  res.status(200)
  res.send('GET, OPTIONS')
})
router.options('/getOneCar',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Allow', 'GET, OPTIONS');
  res.status(200)
  res.send('GET, OPTIONS')
})
router.options('/deleteCar',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.header('Allow', 'DELETE, OPTIONS');
  res.status(200)
  res.send('GET, POST, OPTIONS')
})
router.options('/getAllBrands',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.header('Allow', 'GET, HEAD, OPTIONS');
  res.status(200)
  res.send('GET, POST, OPTIONS')
})
router.options('/addCar',  (req, res) => {
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Allow', 'POST, OPTIONS');
  res.status(200)
  res.send('GET, POST, OPTIONS')
})

export { router }