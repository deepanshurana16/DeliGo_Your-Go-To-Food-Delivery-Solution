import { HEADER_LOGO } from "../utils/constant";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Header = () => {
  const [btnText, setbtnText] = useState("Login");

  const handleClick = () => {
    setbtnText(btnText === "Login" ? "Logout" : "Login");
  };

  let onlineStatusHeader = useOnlineStatus();

  return (
    <div className="flex justify-between">
      <div className="logo-container">
        <img src={HEADER_LOGO} alt="restrauntlogo" className="w-40" />
      </div>
      <div className="nav-items">
        <ul className="flex p-8 m-4">
        <li>
        {onlineStatusHeader===true?(
        <span className="blinkgreen ">✅</span>):(
          <span className="blinkred">❌</span>
        )}
        </li>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <button className="login" onClick={handleClick}>
            {btnText}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
