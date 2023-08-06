import Cafe from "../models/cafeModel.js"

// GET /cafes?location=<location>
const getCafes = async (req, res) => {
  try {
    const { location } = req.query
    const filter = location ? { location } : {}
    
    const cafes = await Cafe.find(filter).sort({ employees: -1 })

    res.json(cafes)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getCafesHealth = async (req, res) => {
  try {

    const cafeHealthMsg = "Reached Cafe Health!"

    res.json(cafeHealthMsg)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// POST /cafes
const createCafe = async (req, res) => {
  try {
    const { name, description, logo, location, id } = req.body

    const newCafe = new Cafe({ name, description, logo, location, id })
    await newCafe.save()

    res.status(201).json(newCafe);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' })
  }
}

// PUT /cafes/:id
const updateCafe = async (req, res) => {
  try {
    const { name, description, location } = req.body
    const cafeId  = req.params.id
    
    const cafe = await Cafe.findOneAndUpdate(
      { id: cafeId }, 
      { name, description, location }, 
      { new: true })
    
    if (!cafe) {
      return res.status(404).json({ error: 'Cafe not found' })
    }

    res.json(cafe)
  } catch (error) {
    res.status(400).json({ error: 'Bad request' })
  }
}

// DELETE /cafes/:id
const deleteCafe = async (req, res) => {
  try {
    const cafeId = req.params.id
    const cafe = await Cafe.deleteOne({ id: cafeId })

    if (!cafe) {
      return res.status(404).json({ error: 'Cafe not found' })
    }

    res.json({ message: 'Cafe deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: 'Bad request' })
  }
}

export default {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
  getCafesHealth,
}
