import { HEADER_LOGO } from "../utils/constant";
import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { Selector, useSelector } from "react-redux";


const Header = () => {
  const [btnText, setbtnText] = useState("Login");

  const handleClick = () => {
    setbtnText(btnText === "Login" ? "Logout" : "Login");
  };

  let onlineStatusHeader = useOnlineStatus();

  const {loggedInUser} = useContext(UserContext);
  console.log(loggedInUser);

  //subscribing to the store
  const cartItems = useSelector((store)=>store.cart.items);

  return (
    <div className="flex justify-between items-center sm:bg-blue-50">
      <div className="logo-container">
        <img src={HEADER_LOGO} alt="restrauntlogo" className="w-40" />
      </div>
      <div className="nav-items">
        <ul className="flex p-0 m-0 sm:p-8 m-4">
        <li>
        {onlineStatusHeader===true?(
        <span className="px-4">✅</span>):(
          <span className="px-4">❌</span>
        )}
        </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>

          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/cart">🛒<sup>{cartItems.length}</sup></Link>
          </li>
          <button className="login" onClick={handleClick}>
            {btnText}
          </button>
          <li className="px-4 font-bold">
            <Link to="/cart">{loggedInUser}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
