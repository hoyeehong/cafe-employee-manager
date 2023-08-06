import express from "express"
const router = express.Router()
import employeeController from "../controllers/employeeController.js"

// GET /employees?cafe=<café>
router.get('/', employeeController.getEmployees)

// POST /employees
router.post('/', employeeController.createEmployee)

// PUT /employees/:id
router.put('/:id', employeeController.updateEmployee)

// DELETE /employees/:id
router.delete('/:id', employeeController.deleteEmployee)

export default router
