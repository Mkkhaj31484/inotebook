import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const host = "http://localhost:5000";
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { email, password } = credentials;

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authentication);
      props.showAlert("Login Successful" ,'success');
      navigate("/");
    }else{
      props.showAlert(" Invalid Crenentials","danger");
     }
  };

  return (
    <>
     <div className='container text-center my-2'style ={{color:'green'}} >
    <h1>
      <strong>Login</strong>
      </h1>
    </div>
    <div className='container'>
      <form style={{ width: 500, marginLeft: 300, marginTop: 100 }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} placeholder='Enter your email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' placeholder='Enter your password' value={credentials.password} minLength={8} onChange={onChange} id="exampleInputPassword1" />
        </div>
        <div className='text-center'>
        <button type="submit"  id="btn"className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;

