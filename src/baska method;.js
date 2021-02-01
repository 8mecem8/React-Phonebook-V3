/*import React, { useState } from 'react';

const App = () => {
 
const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }])
const [ newName, setNewName ] = useState('')


const addName = event => {
event.preventDefault()

const BookObject = {
    name: newName,
    date: new Date().toISOString(),
        id: newName.length + 1,
  }

setPersons(persons.concat(BookObject))
setNewName('')

}


const handleNamechange = event => {

  setNewName(event.target.value)
  
};


  return (
    
<div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        
          Name: <input onChange = {handleNamechange} />
        
      
         <br/><button type="submit" >add</button>
        
      </form>
      <h2>Numbers</h2>
      
  <div>
    
  {persons.map((person, i) => <div key={i}>{person.name}</div>)}
    
  </div>

  
     <br/> <div>debug: {newName}</div>
    </div>




  );






















  let abd 

await Pb.find({}).then(re => {abd = re.find(at => at.name === req.body.name); /*Object.values(re)8})








//Pb.findById(req.body.name).then(re => )


//foo()//.then(() => console.log('abd in function',abd))
//.then( at => console.log(at))

//foo().then(at => { return abd = at})

console.log(abd._id)
//Pb.find({}).then(re => {let abd = re.find(at => at.name === req.body.name); global.abd = abd /*Object.values(re)8})

//console.log('abd is ===',abd)

 if(req.body.name === abd.name ) {

    Pb.findByIdAndUpdate(abd._id,{number: 'req.body.number'})
 }



*/