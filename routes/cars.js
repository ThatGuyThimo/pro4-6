import express from 'express';
const router = express.Router()

router.use((req, res, next) => {
  req.headers?.host === "coolcars.nl"
  next()
})

router.get('/', (req, res) => {
  res.send('cars home page!')
})

router.get('/about', (req, res) => {
  res.json()
})

export { router }