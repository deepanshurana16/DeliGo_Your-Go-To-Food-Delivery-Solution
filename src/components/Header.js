import { HEADER_LOGO } from "../utils/constant";
import { useState,useEffect } from "react";
import {Link} from "react-router-dom";

const Header = () => {
  
  const [btnText,setbtnText] = useState("Login");

  const handleClick = ()=>{
    setbtnText(btnText==="Login" ? "Logout" : "Login");
  }
  console.log("Header Rendered");

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={HEADER_LOGO} alt="restrauntlogo" className="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <button className="login" onClick={handleClick} >{btnText}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
