import {
  TiBook,
  TiCalendar,
  TiContacts,
  TiHome,
  TiShoppingCart,
  TiStar,
  TiThList,
  TiThMenu,
} from "react-icons/ti";
import { TbBrandBooking, TbList, TbUsers } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import { IoBagAddSharp } from "react-icons/io5";
import useCart from "../hooks/useCart";
import { FaUtensils } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

function DashBord() {
  const { carts } = useCart();
  //TODO - get isAdmin value from the database
  const { isAdmin } = useAdmin();
  // const isAdmin = true;
  return (
    <div className="flex">
      {/* side Bar Content */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="p-4 menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to={"/dashBord/adminHome"}>
                  <TiHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashBord/addItems"}>
                  <FaUtensils /> Add Item
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashBord/bookings"}>
                  <TiBook />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashBord/manageItem"}>
                  <TiThList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashBord/allUsers"}>
                  <TbUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/dashBord/userHome"}>
                  <TiHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashBord/reservation"}>
                  <TiCalendar /> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashBord/review"}>
                  <TiStar />
                  Add Review
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashBord/cart"}>
                  <TiShoppingCart /> My Cart ({carts?.length})
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashBord/myBooking"}>
                  <TbList /> My Booking
                </NavLink>
              </li>
            </>
          )}
          {/* //NOTE - Sahred NavLinks */}
          <div className="divider"></div>
          <li>
            <NavLink to={"/"}>
              <TiHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/order/salad"}>
              <IoBagAddSharp /> Order
            </NavLink>
          </li>
          <li>
            <NavLink to={"/menu"}>
              <TiThMenu /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to={"/order/contact"}>
              <TiContacts /> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Dashbord Content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default DashBord;
