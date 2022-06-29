const express = require('express')
const connectDB = require('./config/db')
const { errorConverter, errorHandler } = require('./middleware/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status')
const app = express()

//connect database
connectDB()

//init middleware
app.use(express.json({extended: false}))
app.get('/', (req,res) => res.send('API Running'))

//routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/search', require('./routes/api/search'))

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });
  
  // convert error to ApiError, if needed
  app.use(errorConverter);
  
  // handle error
  app.use(errorHandler);
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))