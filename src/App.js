
import './App.css';
import {useState} from "react";
import Axios from 'axios';


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [wage, setWage] = useState(0);
  const [id, setID] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  //make the request when click the button
  //function
  const addEmployee =()=>{
    Axios.post("https://databasedemo.herokuapp.com/create", {//objects. send from front-end to back-end
    id :id,
    name:name, 
    age:age, //key: value
    country:country,
    position:position,
    wage:wage,
  }).then(()=>{
    console.log("success added");
  });

  }

  const getEmployee =()=>{
    Axios.get("https://databasedemo.herokuapp.com/employees").then((response)=>{
      setEmployeeList(response.data)
    })
  };
  const updateEmployeeWage =(id)=>{
    Axios.put("https://databasedemo.herokuapp.com/update", {wage: newWage, id: id}).then((response)=>{
      alert("update the wages successfully!");
      setEmployeeList(employeeList.map((val)=>{
        return val.id == id ? {id: val.id, name: val.name, country:val.country, age: val.age, position: val.position, wage: newWage} : val
      }))
    })
  }
  const deleteEmployee = (id)=>{
    Axios.delete(`https://databasedemo.herokuapp.com/delete/${id}`).then((response)=>{
      alert("Delete the employee info successfully!");
      //filter methods
      setEmployeeList(employeeList.filter((val)=>{
        return val.id != id;
      }));
     
    });

  }
  
  return (
    <div className="App">
      <div className ="information">
            <label>ID: </label>
            <input type = "number" onChange={(event)=>{setID(event.target.value)}}/>
            <label>Name: </label>
            <input type = "text" onChange={(event)=>{setName(event.target.value)}}/>
            <label>Age: </label>
            <input type = "number" onChange={(event)=>{setAge(event.target.value)}}/>
            <label>Position: </label>
            <input type = "text" onChange={(event)=>{setPosition(event.target.value)}}/>
            <label>Country: </label>
            <input type = "text" onChange={(event)=>{setCountry(event.target.value)}}/>
            <label>Wages (year): </label>
            <input type = "number" onChange={(event)=>{setWage(event.target.value)}} />
            <button onClick= {addEmployee}>Add Employees</button>
      </div>
      <div className = "employee">
        <button onClick = {getEmployee}>Show Employees</button>
        {employeeList.map((val,key) => {
          return (
            <div id = "theList">
              <table>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Position</th>
                  <th>Country</th>
                  <th>Wages(year)</th>
                  
                </tr>
                <tr>
                  <th>{val.id}</th>
                  <th>{val.name}</th>
                  <th>{val.age}</th>
                  <th>{val.position}</th>
                  <th>{val.country}</th>
                  <th>{val.wage}</th>
                 
                  
                </tr>
              </table>
              <div>
                <input id = "updatewage" type = "text" placeholder="update the wages ..." onChange={(event)=>{
                  setNewWage(event.target.value);
                }}
                />
              </div>
                <button onClick = {()=>{updateEmployeeWage(val.id)}}>Update</button>

                <button onClick = {()=>{deleteEmployee(val.id)}}>Delete</button>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default App;
