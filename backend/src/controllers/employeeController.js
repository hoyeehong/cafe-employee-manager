import Employee from "../models/employeeModel.js"
import Cafe from "../models/cafeModel.js"

// GET /employees?cafe=<café>
const getEmployees = async (req, res) => {
  try {
    const { cafe_name } = req.query;
    const filter = cafe_name ? { cafe_name } : {};
    const employees = await Employee.find(filter).sort({ start_date: -1 })
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
};

// POST /employees
const createEmployee = async (req, res) => {
  try {
    const { id, name, email_address, phone_number, gender, start_date } = req.body
    let cafes = await Cafe.find().sort('employees')
    
    let cafe = cafes[0]._id
    let cafe_name = cafes[0].name

    const newEmployee = new Employee({
      id,
      name,
      email_address,
      phone_number,
      gender,
      start_date,
      cafe_name,
      cafe,
    })
    await Cafe.updateOne(
      {_id: cafe},
      {$push:{"employees":id}}
      )
    
    await newEmployee.save()
    res.status(201).json(newEmployee)
  } catch (error) {
    res.status(400).json(error)
  }
}

// PUT /employees/:id
const updateEmployee = async (req, res) => {
  try {
    const { name, email_address, phone_number, gender, cafe_name } = req.body
    const employeeId = req.params.id
    
    const employee = await Employee.findOneAndUpdate(
      { id: employeeId },
      { name, email_address, phone_number, gender },
      { new: true }
    )

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    res.json(employee)
  } catch (error) {
    res.status(400).json(error)
  }
};

// DELETE /employees/:id
const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id
    const employee = await Employee.findByIdAndDelete(employeeId)

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    res.json({ message: 'Employee deleted successfully' })
  } catch (error) {
    res.status(400).json(error)
  }
}

export default {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}
