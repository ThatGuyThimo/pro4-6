import express from 'express';
const router = express.Router()

// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/', (req, res) => {
  res.send('cars home page!')
})

router.get('/about', (req, res) => {
  res.send('About cars')
})

export { router }