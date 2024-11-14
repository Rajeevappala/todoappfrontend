import React from 'react'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'
import Todo from "./Components/Todo/Todo"
import Update from './Components/UpdateTodo/Update'
//import SignUp from './Components/CreateAcc/SignUp'

import { BrowserRouter , Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
   
      <BrowserRouter>
       <Routes>
         
          <Route path = "/" element = {<SignUp/>} />
          <Route path= "/SignIn" element = {<SignIn/>} />
          <Route path = "/todo" element = {<Todo />} />
          <Route path = "/update/:id" element= {<Update />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
