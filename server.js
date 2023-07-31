const { default: mongoose } = require('mongoose')
const app = require('./app')

app.listen(process.env.PORT, () => {
  console.log("Server running. Use our API on port: 3000")

  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDB successfully connected')
  }).catch((err)=>{
    console.log(err)
  
    process.exit(1)
  })
})
