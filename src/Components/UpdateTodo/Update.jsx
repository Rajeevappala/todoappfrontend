import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import "./Update.css"

const UpdateTodo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(state.todo);  // Prefill the form with the existing todo data

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://todoappbackend-ss1a.onrender.com/api/v2/updateTask/${todo._id}`, todo);
      navigate('/todo');  // Redirect to the main todo list page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='updateContainer'>
    <Navbar/>
            <div className='updateForm'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="titleText" className="form-label">Title</label>
                        <input type="text" className="form-control" id="titleText" placeholder='Enter Title' name="title" onChange = {handleChange} value = {todo.title} required/>
                    </div>
                    <div className="mb-3">
                        <label for="BodyContent" className="form-label">Body</label>
                        <textarea type="text" className="form-control" id="BodyContent" placeholder='Enter Body' name = "body" onChange = {handleChange} value = {todo.body} required/>
                    </div>
                    <div className="mb-3  select-form">
                        <label className="form-check-label" for="selectOption">Status</label>
                        <select id="selectOption" name = "status" onChange = {handleChange} value = {todo.status}>
                            <option>pending</option>
                            <option>completed</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Todo</button>
                </form>
            </div>
        </div>
  );
};

export default UpdateTodo;
