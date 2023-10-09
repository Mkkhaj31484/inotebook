import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
 
  const host = "http://localhost:5000";
  const navigate = useNavigate();
    const [credentials,setCredentials] =useState({name :"",email:"",passwoed:"",confirmpassword:""});
    const onChange =(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    function checkPasswordMatch() {
      var password = document.getElementById("exampleInputPassword1").value;
      var confirmPassword = document.getElementById("exampleInputPassword2").value;
      var passwordMatch = document.getElementById("password-match");
    
      if (password === confirmPassword) {
        passwordMatch.innerHTML = "&#10004; Passwords match"; // Display green tick
        passwordMatch.style.color = "green";
      } else {
        passwordMatch.innerHTML = "Passwords do not match";
        passwordMatch.style.color = "red";
      }
    }

  const {name,email,password} = credentials;
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`${host}/api/auth/createUser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email, password })
      });
      const json = await response.json();
      console.log(json);
  
      if (json.success) {
        localStorage.setItem('token', json.token);
        navigate("/login");
       props.showAlert("Signup Successfully","success");
      }else{
       props.showAlert(" Invalid Crenentials","danger");
      }
    };

    function togglePasswordVisibility() {
      var passwordInput = document.getElementById("exampleInputPassword1");
      var togglePassword = document.querySelector(".toggle-password");
    
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.add("hide");
      } else {
        passwordInput.type = "password";
        togglePassword.classList.remove("hide");
      }
    }
  

  return (
    <>
    <div className='container text-center my-2'style ={{color:'green',}} >
    <h1><strong>Sign In/Singup</strong></h1>
    </div>
    <div className='container'>
    <form style={{width:600,marginLeft:260}} onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" name='name' placeholder='Enter your name'  onChange={onChange} id="name"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" name='email'  onChange={onChange} placeholder='Enter your email'aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3 ">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <div  className='password-container'>
      <input type="password" className="form-control" name='password' placeholder='Enter Your Password' onChange={onChange} minLength={8} alt='Use strong password' id="exampleInputPassword1" required/>
      <span className="toggle-password" onClick={togglePasswordVisibility}></span>
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">conform Password</label>
      <input type="password" className="form-control" name='conformpassword' placeholder='Confirm your password' onInput={checkPasswordMatch} onChange={onChange} id="exampleInputPassword2" required/>
      <span id="password-match"></span>
    </div>
    <div className='text-center my-2'>
    <button type="submit" id ="btn1" className="btn btn-primary">Submit</button>
    </div>
  </form>
  </div>
  </>
  )
}

export default Signup;
