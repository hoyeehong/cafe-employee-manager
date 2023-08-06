import mongoose from "mongoose"
import 'dotenv/config'

const DB_URI = 'mongodb://mongodb:27017/companyDB'
// const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.w8ogeew.mongodb.net/companyDB`

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

export default db
