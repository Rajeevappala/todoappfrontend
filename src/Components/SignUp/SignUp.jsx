import React from 'react'
import Navbar from '../Navbar/Navbar'
import { useState } from 'react'
import axios from "axios";
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import "./SignUp.css"


const SignUp = () => {
    const history = useNavigate()
    const [Inputs , setInputs] = useState({
        email : "",
        username : "",
        password : ""
    })
    const changeInput = (event) => {
        const {name , value} = event.target;
        setInputs({...Inputs , [name] : value})
    }

    const submitForm = async(e) => {
        e.preventDefault();
       await axios.post("https://todoappbackend-ss1a.onrender.com/api/v1/register" , Inputs)
       .then((response) => {
        localStorage.setItem('token', response.data.token);
        console.log(response)
        setInputs({
        email : "",
        username : "",
        password : ""
        });
        history("/SignIn")
       })
        
    }

  return (
    <div>
        <Navbar />
        <div className='signUp-Container '>
            
                <form className='formContainer' onSubmit={submitForm}>
                    <div className="mb-3 ">
                        <div>
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                        </div>
                        <div>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email' onChange = {changeInput} name="email" value = {Inputs.email} required/>
                        </div>
                    </div>
                    <div className="mb-3 ">
                        <div>
                            <label for="exampleInputUsername" className="form-label">Username</label>
                        </div>
                        <div>
                            <input type="text" className="form-control" id="exampleInputUsername" placeholder='Enter Username' name="username" value = {Inputs.username} onChange = {changeInput} required/>
                        </div>
                        
                    </div>
                    <div className="mb-3 ">
                        <div>
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                        </div>
                        <div>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' name="password" value = {Inputs.password} onChange = {changeInput} required/>
                        </div>
                        
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <div>
                    <p>Already Have an account ? <Link to="/SignIn">Login</Link></p>
                </div>
            </div>
        </div>
      
    
  )
}

export default SignUp
