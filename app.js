const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

const { authRouter, noticesRouter, petsRouter, swaggerRouter, usersRouter, friendsRouter } = require('./routes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('MongoDB successfully connected')
}).catch((err)=>{
  console.log(err)

  process.exit(1)
})

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static('public'))

app.use('/api/api-docs', swaggerRouter)

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)
app.use('/api/notices', noticesRouter)
app.use('/api/friends', friendsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = app
