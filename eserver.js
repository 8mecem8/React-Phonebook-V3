const express = require("express")
const app = express()
const cors = require('cors')
const mng = require('mongoose')
require('dotenv/config')
var uniqueValidator = require('mongoose-unique-validator');

//Middlewares----------------------------------------------------------
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

//let ipersons = require("./db.json")

//let z = Object.values(ipersons)


//console.log('z is =', z)

//console.log('z[0] is =', z[0])



var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}

app.use(corsMiddleware);

//Database-------------------------------------------------------------------------------------------------------------------------------

mng.connect(process.env.DB_C,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, () => console.log('Database connection has been established'))

const Pbp = mng.Schema({

    name:{
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number:{
        type: String,
        minlength: 8,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

})

Pbp.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }})


  Pbp.plugin(uniqueValidator);



const Pb = mng.model('PhoneBookPerson', Pbp)

//Routes--------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {res.status(200).send('<h1>----This is a test Express Server----</h1><br/><h2>You can check other sub-directories</h2> <br/> <ul> <li>/persons </li> <li>/info </li> <li>/persons/ any id </li></ul>')})


app.get('/persons', (req, res, next) => {
    
    Pb.find({})
    .then(re => res.status(200).json(re))
    .catch(err => next(err))

    //if(z) {res.send(z[0])} else{res.status(404).end()}})
})

app.get('/info', (req, res) => {
      
      Pb.find({})
    .then(re => 
     {
        const all = Object.values(re).length
        const time = new Date()
res.send(`<p>Phonebook has info for ${all} people</p> <br/> <p>${time}</p>`)

     }   
    )
    
    
    
    // const all  = Math.max(...z[0].map(at => at.id)) // or we can use z[0].length
        //const time = new Date()
     //res.send(`<p>Phonebook has info for ${all} people</p> <br/> <p>${time}</p>`)
})



app.delete('/persons/:id', (req, res, next) => {

const tId = req.params.id

Pb.findByIdAndDelete(tId).then(re => res.status(204).end()).catch(err => next(err))






       // ipersons = z[0].filter(at => at.id !== tId)
       // z[0] = z[0].filter(at => at.id !== tId)
   // res.status(204).send(`Person with id:${tId} is deleted`)


})

app.get('/persons/:id', (req, res) => {
       const tId = req.params.id


       Pb.findById(tId).then(re => {
    
    if(re) {res.json(re)}
      else {
        res.status(404).end()
      }
  }).catch(error => next(error))





      /* const tperson = z[0].find(at => at.id === tId)
    if(tperson) {res.json(tperson)} else {res.status(404).send("<h1>ERROR ID NOT FOUND !!!<br/><br/> Please enter a Valid ID</h1>")}*/

})


app.post('/persons', (req, res, next) => {
     
    if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }


    const NPp = new Pb ({
        name : req.body.name,
        number : req.body.number,
        date : new Date(),
    })
    
    //console.log(res)

    NPp.save()
    .then(re => res.status(200).json(re))
    .catch(err => { return  res.status(400).json(err.message),next(err)})
    
    
    
    
    
    
    /*  let mId = z[0].length > 0 ?
            Math.max(...z[0].map(at => at.id)) : 0

    const nPerson = {
        name: req.body.name,
        number: req.body.number,
        id: mId + 1
    }

    let az =  z[0].find(at => at.name === req.body.name)


    
    if(az === undefined){ az = "bos"}
    else {let az = z[0].find(at => at.name === req.body.name)}

    console.log(req.body.name)
    
    console.log(az.name)

    if(req.body.name === "" || req.body.number === "") {res.status(422).send('Please enter right information')}
else if(req.body.name == az.name) {res.status(409).send('Person already exist')}

  else  {z[0] = z[0].concat(nPerson)
    //ipersons = z[0].concat(nPerson)

    res.json(nPerson)}*/

})





app.put('/persons', async (req, res, next) => {

 
 //let abd 

//await Pb.find({}).then(re => {abd = re.find(at => at.name === req.body.name)})
 
//console.log(abd.id) 

 Pb.findByIdAndUpdate(req.body.id,{number: req.body.number},{new:true})
  .then(re => {res.status(200).json(re),
   console.log('this is response from findbyidandupdate',re)})
   .catch(err => next(err))





})







const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)






//------------------------------------------------------------------------------------------------------------------------------------------------


const PORT = process.env.PORT || 3003

app.listen(PORT, () => {console.log(`Server is running on port:${PORT}`)})