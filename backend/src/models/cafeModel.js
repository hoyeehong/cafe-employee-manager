import mongoose from "mongoose"

const cafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  employees: [ { type: mongoose.Schema.Types.String, ref: 'Employee', required: true } ]
})

const Cafe = mongoose.model('Cafe', cafeSchema)

export default Cafe
