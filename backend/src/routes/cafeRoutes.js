import express from "express"
const router = express.Router()
import cafeController from "../controllers/cafeController.js"

// GET /cafes?location=<location>
router.get('/', cafeController.getCafes)

router.get('/health', cafeController.getCafesHealth)

// POST /cafes
router.post('/', cafeController.createCafe)

// PUT /cafes/:id
router.put('/:id', cafeController.updateCafe)

// DELETE /cafes/:id
router.delete('/:id', cafeController.deleteCafe)

export default router