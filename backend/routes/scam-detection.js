import express from 'express'
import axios from 'axios'

const router = express.Router()

// Text scam detection endpoint
router.post('/detect-text', async (req, res) => {
  try {
    const { text } = req.body

    if (!text || text.trim() === '') {
      return res.status(400).json({
        error: 'Text is required',
        isScam: false,
        confidence: 0
      })
    }

    // Call Python backend
    // const pythonBackendUrl = 'http://localhost:5000'

    // const response = await axios.post(`${pythonBackendUrl}/predict-text`, {
    //   text: text
    // })

    // const result = response.data
    const result = {
      is_scam: text.toLowerCase().includes('urgent') || text.toLowerCase().includes('click'),
      confidence: 0.85
    }

    res.json({
      success: true,
      isScam: result.is_scam,
      confidence: result.confidence,
      message: result.is_scam ? 'This appears to be a scam message' : 'This appears to be legitimate'
    })

  } catch (error) {
    console.error('Error:', error)

    res.status(500).json({
      error: 'Failed to analyze text',
      isScam: false,
      confidence: 0
    })
  }
})

export default router
