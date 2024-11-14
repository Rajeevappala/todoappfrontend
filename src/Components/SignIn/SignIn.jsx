import React from 'react'
import Navbar from '../Navbar/Navbar'
import { useState } from 'react'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import "./SignIn.css"

const SignIn = () => {
    const history = useNavigate()
    const [Inputs , setInputs] = useState({
        email : "",
        password : ""
    })

    const changeInput = (event) => {
        const {name , value} = event.target;
        setInputs({...Inputs , [name] : value})
    }

    const submitForm = async(event) => {
        event.preventDefault();
        try {

            const token = localStorage.getItem('token'); 
            await axios.post("https://todoappbackend-ss1a.onrender.com/api/v1/login", Inputs , {
                headers: {
                    "authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json', 
            }
            })
            .then((response) => {
                const userId = response.data.others._id
                localStorage.setItem("userId", userId)
                history("/todo")
            }
            )
            
        } catch (error) {
            const message = "Invalid Email or Password"
            alert(message)
            console.log(message)
            
        }
       
    }

    
  return (
    <div>
          <Navbar />
        <div className='signIn-Container '>
          
                <form className='formContainer' onSubmit = {submitForm}>
                    <div className="mb-3 ">
                        <div>
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                        </div>
                        <div>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email id' name = "email" onChange = {changeInput} value = {Inputs.email} required/>
                        </div>
                    </div>
                    <div className="mb-3 ">
                        <div>
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                        </div>
                        <div>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' name = "password" onChange = {changeInput} value = {Inputs.password} required/>
                        </div>
                        
                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        </div>
      
    
  )
}

export default SignIn
