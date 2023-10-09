
import React,{useEffect,useState,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navigate,useNavigate } from 'react-router-dom';
const Navbar = () => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
     // use location hook
    useEffect(() => {
      console.log(location);
      // scroll to the top of the browser window when changing route
      // the window object is a normal DOM object and is safe to use in React.
    }, [location]);
   const navigate = useNavigate();
    const handleLogout = ()=>{
      localStorage.removeItem("token");
      navigate("/login");
     
    }
    useEffect(() => {
      fetchUserData();
    }, []);

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getuser',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
       });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    const handleToggle = (e) => {
      e.preventDefault();
      setIsExpanded(!isExpanded);
      
    };
 
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark  bg-dark" style={{position:'sticky'}}>
    <div className="container-fluid">
      <Link className="navbar-brand" href="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
          </li>
        </ul>
       {!localStorage.getItem("token")?<form className='d-flex'>
        < Link className="btn btn-danger" to="login" role="button">Login</Link>
        <Link className="btn btn-danger" to="signup" role="button">Signup</Link>
        </form>:<form className='d-flex'><button className='btn btn-danger mx-1' onClick={handleLogout}>Logout</button>
        <button clssName=" btn btn-danger" onClick={handleToggle}>Toggle Profile</button>
       </form>}
      </div>
    </div>
  </nav>
  </>
  )
}

export default Navbar;

