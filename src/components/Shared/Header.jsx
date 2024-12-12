
import { Link } from "react-router-dom";
import "../../App.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-bar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/admin-dashboard" className="nav-link">
          Admin Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Header;
