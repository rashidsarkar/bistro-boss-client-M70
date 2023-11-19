import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { BsCartFill } from "react-icons/bs";
import useCart from "../../../hooks/useCart";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { carts, isLoading } = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  // if (isLoading) {
  //   return <p>loading.....</p>;
  // }
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      <li>
        <Link to="/secret">Secret</Link>
      </li>
      <li>
        <Link to={"/dashbord/cart"}>
          <button className="btn">
            <BsCartFill className="mr-2"></BsCartFill>
            <div className="badge badge-secondary">+{carts?.length}</div>
          </button>
        </Link>
      </li>
      {user ? (
        <>
          <span>{user?.displayName}</span>
          <button onClick={handleLogOut} className="btn btn-ghost">
            LogOut
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="fixed z-10 max-w-screen-xl text-white bg-black navbar bg-opacity-30">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="text-xl normal-case btn btn-ghost">Bistro Boss</a>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
