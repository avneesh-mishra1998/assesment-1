import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoChevronDownOutline } from "react-icons/io5";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { LuUsers } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { logout } from "../store/reducer/userReducer";
import UserHome from './UserHome'


function Layout() {
  let isAuth = localStorage.getItem("role")
  let userName = localStorage.getItem("user")
  console.log("----",isAuth);
  const navigate=useNavigate()
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  function bodyFixed() {
    if (showMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

// notification dropdown

  const notificationHandler=()=>{
    setProfile(false)
    setNotification(!notification)
  }

// profile dropdown

  const profileHandler=()=>{
    setNotification(false)
    setProfile(!profile)
  }


// user logout  
const logoutHandler=async()=>{
  await dispatch(logout());
    localStorage?.clear();
    setTimeout(()=>{
      navigate("/login")
    },0)
}


//   For closing sidebar when sub menu click < 1024px screen size

const userPageHandler = () => {
  navigate("/manage-employee");
  if (window.innerWidth < 1024) {
    setShowMenu(false);
  }
};

const homePageHandler = () => {
  navigate("/");
  if (window.innerWidth < 1024) {
    setShowMenu(false);
  }
};


const employeeHandler = () => {
  navigate("/employee");
  if (window.innerWidth < 1024) {
    setShowMenu(false);
  }
};



const departmentHandler = () => {
  navigate("/department");
  if (window.innerWidth < 1024) {
    setShowMenu(false);
  }
};


const logoutSuccess = () => {
  toast.success('Logout Successfully', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

  useEffect(() => {
    bodyFixed();
  }, [showMenu]);
  return (
    <>
      {/* Toastify */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <header className="p-4 flex justify-between  items-center lg:justify-end">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 p-1  items-center justify-center text-[#667085] text-[24px] flex lg:hidden"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z"
              fill="currentColor"
            ></path>
            <path
              d="M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z"
              fill="currentColor"
            ></path>
            <path
              d="M5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H5Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <div className="flex gap-4 md:gap-6">
         
          <div className="relative">
            <button
              onClick={() => profileHandler()}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  className="w-100 h-100 rounded-full"
                  src="images/user.png"
                  alt=""
                />
              </div>
              <div className="text-left pr-10 relative">
                <h4 className="text-base/[20px] text-[#333] font-semibold">
                  {userName}
                </h4>
                <Link to="/" className="text-sm text-blue-500 block">
                  View Profile
                </Link>
                <span className="absolute text-blue-500  top-1 right-0">
                  <IoChevronDownOutline />
                </span>
              </div>
            </button>
            {profile && (
              <ul className="focus:outline-none py-3 rounded-md shadow-sm w-[150px] bg-white border border-[#c1c1c169] absolute top-full mt-2 right-0 z-0 sm:z-50">
                <li role="menuitem" className="flex justify-center ">
                  <button onClick={()=>logoutHandler()} className="text-sm text-left py-2 px-4 bg-red-500 text-white rounded-md">
                   Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
      {
        isAuth == "Employee" ? <UserHome/> : 
        <div className="flex">
        <div
          className={`fixed h-[calc(100dvh-72px)] shadow-md lg:shadow-none  lg:relative  left-0 w-[320px] py-8 px-6 bg-white z-50 lg:z-0 ${
            showMenu ? "translate-x-[0]" : ""
          } translate-x-[-320px] lg:translate-x-0 transition-all duration-300 ease-in-out`}
        >
          <h4 className="mb-6 text-[22px] font-semibold text-[#333]">Menu</h4>
          <ul className="space-y-3">
          <li className="mt-3">
              
                  <div
                  onClick={()=>userPageHandler()}
                    
                    className="group cursor-pointer  rounded-md p-2 pr-10 bg-[#f1f7fb] text-[#0080ff] [&.active]:text-white [&.active]:bg-[#0080ff] w-full relative font-semibold flex gap-2 items-center"
                  >
                    <span className="w-9  group-[&.active]:bg-[#fff] group-[&.active]:text-[#0080ff]  h-9 bg-[#0080ff] flex justify-center items-center rounded-sm text-white text-base">
                      <LuUsers />
                    </span>
                   Manage Employee
                  </div>
              
              </li>
              <li className="mt-3">
               
                  <div
                  onClick={()=>employeeHandler()}
                    
                    className="group cursor-pointer  rounded-md p-2 pr-10 bg-[#f1f7fb] text-[#0080ff] [&.active]:text-white [&.active]:bg-[#0080ff] w-full relative font-semibold flex gap-2 items-center"
                  >
                    <span className="w-9  group-[&.active]:bg-[#fff] group-[&.active]:text-[#0080ff]  h-9 bg-[#0080ff] flex justify-center items-center rounded-sm text-white text-base">
                      <LuUsers />
                    </span>
                    Employee
                  </div>
               
              </li> 
               <li className="mt-3">
              
                  <div
                  onClick={()=>departmentHandler()}
                    
                    className="group cursor-pointer  rounded-md p-2 pr-10 bg-[#f1f7fb] text-[#0080ff] [&.active]:text-white [&.active]:bg-[#0080ff] w-full relative font-semibold flex gap-2 items-center"
                  >
                    <span className="w-9  group-[&.active]:bg-[#fff] group-[&.active]:text-[#0080ff]  h-9 bg-[#0080ff] flex justify-center items-center rounded-sm text-white text-base">
                      <LuUsers />
                    </span>
                   Department
                  </div>
               
              </li>
          </ul>
        </div>
        <div
          className="w-full lg:w-[calc(100%-320px)] p-5 lg:p-8 "
          style={{ boxShadow: "inset 0 0 16px rgba(0, 0, 0, 0.08)" }}
        >
          <h1>Welcome To Manger Dashboard</h1>
          <main>
            <Outlet />
          </main>
        </div>
        </div>
      }
      
    </>
  );
}

export default Layout;
