import React from 'react'
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp  () {
  const [user,setUser] = useState({
    fname:"",
    lname:"",
    email:"",
    password:""
});
 
 const handleSubmit = (e) => {
   e.preventDefault();
   const { fname, lname, email, password } = user
   console.log( fname, lname, email, password);
  
  fetch(("http://localhost:6969/register"),{
    method:"POST",
    crossDomain:true,
    headers:{
      "content-type":"application/json",
      Accept:"application/json",
      "Acess-Control-Allow-Origin":"*"
    },
    body:JSON.stringify({
      fname,
      lname,
      email,
      password
    }),
  }).then((res)=>res.json())
  .then((data)=>{
    console.log(data, "userRegister");
    // alert("Register Successfully");
    toast.success('User Registerd Successfully !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  });
 }
 
const handleChange =(e)=>{
   
    const { name, value } = e.target
    setUser({
        ...user,//spread operator 
        [name]: value

    })
   
 }
  
    return (
      <>
      <form onSubmit={handleSubmit} >
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name='fname'
            value={user.fname}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name"
          name='lname'
          value={user.lname}
          onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name='email'
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name='password'
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <ToastContainer/>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
      </>
    );
  }

  export default SignUp

