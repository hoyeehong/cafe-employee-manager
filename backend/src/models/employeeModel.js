import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email_address: { type: String, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true },
  start_date: { type: Date, required: true },
  cafe_name: { type: mongoose.Schema.Types.String, ref: 'Cafe', required: true },
  cafe: { type: mongoose.Schema.Types.ObjectId, ref: 'Cafe', required: true },
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
