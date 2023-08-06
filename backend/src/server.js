import express from "express"
import bodyParser from "body-parser"
import db  from "./db.js"
import cors  from "cors"
import cafeRoutes from "./routes/cafeRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"

const app = express()
const PORT = process.env.PORT || 2000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.use('/cafes', cafeRoutes)
app.use('/employees', employeeRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})