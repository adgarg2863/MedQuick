const express = require('express')
const connectDB = require('./config/db')
const app = express()

//connect database
connectDB()

//init middleware
app.use(express.json({extended: false}))
app.get('/', (req,res) => res.send('API Running'))

//routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))