import './Navbar.css'
import logo from '../../assets/logo.png';

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <img src={logo} alt="Logo" />
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Navbar
