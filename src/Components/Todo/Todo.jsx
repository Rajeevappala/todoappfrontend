import React , {useEffect , useState} from 'react'
import Navbar from '../Navbar/Navbar';
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import "./Todo.css"


const Todo = () => {
    const navigate = useNavigate();
    const [userId , setUserId] = useState(null); 
    const [data , getdata] = useState([]);
    

    const [Inputs , setInputs] = useState({
        title : "",
        body : "",
        status : "pending"
    })

    const changeInput = event => {
        const {name , value} = event.target 
        setInputs({...Inputs , [name] : value})
    }

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    } , [])

    useEffect(() =>  {
        if (!userId) return;

        const fetchdata = async() => {
            try {
                const response = await axios.get(`https://todoappbackend-ss1a.onrender.com/api/v2/getTask/${userId}`);
                getdata(response.data)
            } catch (error) {
                console.error(error)
            }
        };
        fetchdata();     
    }, [userId])

    const deleteTodo = async(id) => {
        await axios.delete(`https://todoappbackend-ss1a.onrender.com/api/v2/deleteTask/${id}`);
        const updatedData = await axios.get(`https://todoappbackend-ss1a.onrender.com/api/v2/getTask/${userId}`);
        
        getdata(updatedData.data);
    }

    const updateTodo = async(todo) => {
        navigate(`/update/${todo._id}` , {state : {todo}})
    }
        
    const submitForm = async (event) => {
        event.preventDefault();
    
        try {
           
            const response = await axios.post("https://todoappbackend-ss1a.onrender.com/api/v2/addTask", {...Inputs, userId} );
            
            const updatedData = await axios.get(`https://todoappbackend-ss1a.onrender.com/api/v2/getTask/${userId}`);
            //console.log("detched data", updatedData.data)
            
            getdata(updatedData.data);
    
            
            setInputs({
                title: "",
                body: "",
                status: "pending"
            });
    
            console.log("Task added:", response.data); 
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };
    
    
    
    
    console.log(userId)
    
    

  return (
    <div className='bg-container'>
        <div className='nav-cont'>
        <Navbar />
        </div>
        <div className='todoContainer'>
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label for="titleText" className="form-label">Title</label>
                    <input type="text" className="form-control" id="titleText" placeholder='Enter Title' name="title" onChange = {changeInput} value = {Inputs.title} required/>
                </div>
                <div className="mb-3">
                    <label for="BodyContent" className="form-label">Body</label>
                    <textarea type="text" className="form-control" id="BodyContent" placeholder='Enter Body' name = "body" onChange = {changeInput} value = {Inputs.body} required/>
                </div>
                <div className="mb-3  select-form">
                    <label className="form-check-label" for="selectOption">Status</label>
                    <select id="selectOption" name = "status" onChange = {changeInput} value = {Inputs.status}>
                        <option>pending</option>
                        <option>completed</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Todo</button>
            </form>
           
        </div>
       <div>
        <h1>Todos</h1>
        {data.list === undefined ? <div className='emptyList'><div className='emptyList'>
                <h2>Your todo list is empty!</h2>
                <p>Add your first task to get started on productivity!</p>
            </div>
            </div> : 
        <ul className='ulContainer'>
            {
                data.list.map((eachList ) => (
                    <li className='listElement' key = {eachList._id}>
                        <h1 className='heading'>{eachList.title}</h1>
                        <p className='para'>{eachList.body}</p>
                        <p>{eachList.status}</p>
                        <div>
                            <button type="button" className='btn btn-primary buttonEle' onClick = {() => updateTodo(eachList)}>Edit <FaEdit/></button>
                            <button type="button" className='btn btn-primary buttonEle' onClick={() => deleteTodo(eachList._id)}>Delete <MdDelete/></button>
                        </div>
                    </li>
                ))
            }
        </ul>
        }
       
       </div>
    </div>
  )
}

export default Todo
