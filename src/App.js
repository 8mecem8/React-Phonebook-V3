import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pService from './services/persons';

const App = () => {
 
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')

    const [newFilter, setNewFilter] = useState([])
    const [errorMessage, setErorMessage] = useState('')


//console.log(persons)

useEffect(() => {


pService.getAll()
      .then(res =>  setPersons(persons.concat(res.data)))
      .catch(err => console.log(err))
},[])


const addName = event =>
{
event.preventDefault()

const person1 = persons.find(person => person.name === document.getElementById('inputName').value)
 //console.log('person1 =', person1)

  const pObject = {
      name: document.getElementById('inputName').value,
      number: document.getElementById('inputNumber').value,
      date: new Date().toISOString(),
      id: person1 === undefined ? persons.length + 1 : person1.id,
}


if (persons.find(({name}) => name === document.getElementById('inputName').value)) 

{

    if (window.confirm(`${document.getElementById('inputName').value} is already added to phonebook, replace the old number new one ?`))
     {
            
       axios
        .put(`/persons`, pObject )
        .then(res => setPersons(persons.map(it => it.id === person1.id ? res.data : it)))




       /*axios
        .put(`/persons/${person1.id}`, pObject )
        .then(res => setPersons(persons.map(it => it.id === person1.id ? res.data : it)))*/



          document.getElementById('inputName').value= ''
          document.getElementById('inputNumber').value= ''
     }
                              


                            


}
                            
else 

{


                            

pService
 .create(pObject)
 .then(res => {setPersons(persons.concat(res.data))})
 .catch(err => {return setErorMessage(err.response.data), setTimeout(() => {setErorMessage('')}, 5000)})   
                            
                 
 setNewName('')
document.getElementById('inputName').value= ''
 document.getElementById('inputNumber').value= ''

}

}
/*const handleNamechange = event => {

  setNewName(event.target.value)
  
};*/



const search = () => {

//let a = persons.filter((per) => new RegExp(document.getElementById('inputSearch').value, 'i').test(per.name))


setNewFilter(persons.filter((per) => new RegExp(document.getElementById('inputSearch').value, 'i').test(per.name)))

if(document.getElementById('inputSearch').value === '')
{setNewFilter([])}

}



const PersonDelete = (id) => {
                      
  
const aPerson= persons.find(at => at.id === id)

axios
.delete(`/persons/${id}`)
.then(res => setPersons(persons.filter(it => it.id !== id)))
.catch(err => setErorMessage(`Person '${aPerson.name}' was already removed from the server`), setTimeout(() => {setErorMessage('')}, 5000) )
}



const Alert = () => {

 if(errorMessage === ('')) {

  return <div></div>
 
 }
 
 else {

return (
    <div className='error'>
      
      {errorMessage}
    
      
    </div>
  )
}
}







return (
                          
 <div>

      <div>
          <h2>Phonebook</h2>
          <Alert/>
          <form onSubmit={addName}>
                              
          Name: <input id='inputName' placeholder='Example John' /*onChange = {handleNamechange}*/ />
                              
          <br /> Number: <input id='inputNumber' type='tel' placeholder='111-111-1111' />
                            
          <br/><button type="submit" >add</button>
                              
     </form>
                          
            </div>  

                <div>
      <h2>Search The Phonebook</h2>

    Filter: <input id='inputSearch' type='search' onChange={search} placeholder='Please Enter a Name' />

    {newFilter.map((fil, i) => <div key={i}>{fil.name} {fil.number} </div>)}

  </div>

 <br/>


 <div>
       <h2>Numbers</h2>
 {persons.map((per, i) => <div key={i} id={per.id}>{per.name} {per.number}  <button  onClick={() => { if (window.confirm("Do you really want to delete?")) {PersonDelete(per.id)}}}>Delete</button>  </div>)}
                          
</div>

  <br/> <div>debug: {newName}</div>
                          
 </div>
);
}

export default App;
