import { Link } from "react-router-dom";
import logoImage from "../../assets/images/lws-logo-dark.svg";
import { userLoggedOut } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
export default function Navigation() {
  const navigate = useNavigate();
  const logOut = () => {
    userLoggedOut();
    localStorage.removeItem("auth");
    navigate("/");
  };
  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <img className="h-10" src={logoImage} alt="Learn with Sumit" />
          </Link>
          <ul>
            <li className="text-white">
              <button onClick={logOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
