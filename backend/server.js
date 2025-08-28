
import express from 'express'
import cors from 'cors'
import scamDetectionRoutes from './routes/scam-detection.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Node.js!')
})

// Use the scam detection routes
app.use('/api/scam-detection', scamDetectionRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
