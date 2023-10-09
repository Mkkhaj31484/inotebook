
import './App.css';
import { useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

import {
BrowserRouter as Router,
 Routes,
 Route,
} from "react-router-dom";
import Users from './components/Users';
function App() {

  const [alert,setAlert] = useState({message:"",type:''});
  const showAlert = (message,type)=>{
    setAlert({
      message:message,
      type:type
    })
      setTimeout(()=>{
        setAlert({message:"",typr:""});
      },1000);
   
  }

  return (
    <>
<NoteState>
 <Router>
  <div>
   <Navbar/>
   {alert.message.length>5 && <Alert alert={alert}/>}
   <Routes>
    <Route  path="/" element={<Home/>}/>
    <Route  path="/about" element={ <About/>}/>
    <Route  path="/login" element={<Login showAlert={showAlert}/>}/>
    <Route  path="/signup" element={ <Signup showAlert={showAlert}/>}/>
   </Routes>
   </div>
   <Footer/>
   </Router>
   </NoteState>
  
   </>
  );
}

export default App;
