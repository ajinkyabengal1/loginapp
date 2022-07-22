import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function  Login  () {
   const [user,setUser] = useState({
    email:"",
    password:""
});

const handleChange =(e)=>{
   
  const { name, value } = e.target
  setUser({
      ...user,//spread operator 
      [name]: value

  })
}
   
 const handleSubmit = (e) => {
 
  e.preventDefault();
  const {email, password } = user
  console.log( email, password);
 
 fetch(("http://localhost:6969/login-user"),{
   method:"POST",
   crossDomain:true,
   headers:{
     "content-type":"application/json",
     Accept:"application/json",
     "Acess-Control-Allow-Origin":"*"
   },
   body:JSON.stringify({
     email,
     password
   }),
 }).then((res)=>res.json())
 .then((data)=>{
   console.log(data, "userRegister");
   if(data.status==="ok"){
    alert("login sucessful");
    toast("Login Successfully !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    window.localStorage.setItem("token",data.data);
    window.location.href="./UserDetails";
   }else{
    // alert("incorrect password  ");
    toast.warn("Incorrect Password !",{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   }
 });
}


    return (
      <>
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>

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

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <ToastContainer/>
        </div>
        <p className="forgot-password text-right">
           <a href="/sign-up">Sign Up</a>
        </p>
      
      </form>
      </>
    );
  }

  export default Login
