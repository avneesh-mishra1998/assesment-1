import React, { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLoginMutation, useRegisterMutation} from "../store/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/reducer/userReducer";


function Login() {

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=> state?.userReducer)
  const [check, setCheck] = useState("login");
  const [getData, setGetData] = useState();
  const[eye,setEye]=useState(false)


  // Redirect after successfull login
  useEffect(()=>{
    if(user?.token){
      navigate("/")
    }
  },[user])

// login part  
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

 // get event targe value 
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setLoginInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

// login logics here
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginInput);
      if(res.data.status){
        dispatch(loginSuccess(res?.data?.data));
        loginSuccessfull()
        setLoginInput({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 0);
      } else {
        loginFail()
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Please provide a valid credentials");
    }
   
  };

// ********************register part**********************************

  const [registerInput, setRegisterInput] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
    location: ""
  });
// get event targe value 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

// register logic here
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register(registerInput);
      if(res?.data?.status ){
        registerSuccess()
        setTimeout(()=>{
          setRegisterInput({
            full_name: "",
            email: "",
            password: "",
            role: "",
            location: ""
        });
          setCheck("login")
        },0)
      }
      else{
        registerFail()
      }
    } catch (error) {
      console.error("Error during Signup:", error);
      alert("Something went wrong");
    }
  };

// Toastify
const registerSuccess = () => {
  toast.success('Register Successfully', {
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
const registerFail = () => {
toast.error('Fields are required', {
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
}

const loginSuccessfull = () => {
  toast.success('Login Successfully', {
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
const loginFail = () => {
  toast.error('Email or password mismatch', {
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
  }

  return (
    <div className="flex">
      <div className="w-1/2 h-screen bg-blue-500  justify-center items-center hidden md:flex">
        <img
          className="w-[200px] lg:w-[300px]"
          src="/images/login1.jpg"
          alt=""
        />
      </div>
      <div className="w-full md:w-1/2 h-screen flex justify-center  items-center">
        <div className="w-full px-6 md:px-0">
          <h3 className="text-3xl font-semibold text-center">
            Welcome to <br /> My Portal
          </h3>
          <p className="text-[13px] font-medium mt-4 text-gray-400 text-center">
            START Manage YOUR Employees
          </p>
          {check === "login" ? (
            <form className="mt-5" onSubmit={loginHandler}>

              <label className="border-2 mb-6 border-transparent focus-within:border-blue-500 bg-green-100 rounded-md w-full md:max-w-[300px] lg:max-w-[450px] px-2 gap-x-2 flex items-center h-10 mx-auto">
              <select className="w-full text-gray-500 bg-transparent placeholder:text-gray-400 placeholder:text-[12px] focus:outline-none focus:border-none">
              <option value="Actions">Choose Role</option>
              <option value="Actions">Employee</option>
              <option value="Actions">Manager</option>
            </select>
              </label>
              <label className=" border-2 mb-6 border-transparent focus-within:border-blue-500 bg-green-100 rounded-md w-full md:max-w-[300px] lg:max-w-[450px] px-2 gap-x-2 flex items-center h-10 mx-auto">
                <span className="bg-white rounded-sm inline-block px-1 py-1 text-xl text-blue-500 font-bold">
                  <CiMail />
                </span>
                <input
                value={loginInput.email}
                name="email"
                onChange={handleInputChange1}
                  type="email"
                  placeholder="Enter user ID Or E-mail"
                  className="w-full bg-transparent placeholder:text-gray-400 placeholder:text-[12px] focus:outline-none focus:border-none"
                />
              </label>
              <label className="border-2 mb-6 border-transparent focus-within:border-blue-500 bg-green-100 rounded-md w-full md:max-w-[300px] lg:max-w-[450px] px-2 gap-x-2 flex items-center h-10 mx-auto">
                <span className="bg-white rounded-sm inline-block px-1 py-1 text-xl text-blue-500 font-bold">
                  <CiLock />
                </span>
                <input
                onChange={handleInputChange1}
                value={loginInput.password}
                   name="password"
                   type={eye ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full bg-transparent placeholder:text-gray-400 placeholder:text-[12px] focus:outline-none focus:border-none"
                />
                <span className="text-gray-500 cursor-pointer" onClick={()=>setEye(!eye)}>
                  {<FaEye />}
                </span>
              </label>
              <label className="flex w-full  md:max-w-[300px] lg:max-w-[450px] items-center gap-x-2 mb-4 mx-auto">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-[#000] text-[15px] font-medium">
                  Save Password
                </span>
              </label>
              <div className="flex justify-center">
                <button
                  className="w-full  md:max-w-[300px] lg:max-w-[450px]  bg-blue-500 rounded-md text-white font-medium py-2"
                >
                  Login
                </button>
              </div>
              <div className="w-full  md:max-w-[300px] lg:max-w-[450px] mx-auto flex justify-end mt-3">
                <p>
                  If you are not register{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setCheck("register")}
                  >
                    Register
                  </span>
                </p>
              </div>
            </form>
          ) : (
            <form action="" className="mt-5" onSubmit={registerHandler}>
               <label className="border-2 mb-6 border-transparent focus-within:border-blue-500 bg-green-100 rounded-md w-full md:max-w-[300px] lg:max-w-[450px] px-2 gap-x-2 flex items-center h-10 mx-auto">
              <select name="role" onChange={handleInputChange} className="w-full text-gray-500 bg-transparent placeholder:text-gray-400 placeholder:text-[12px] focus:outline-none focus:border-none">
                <option value="Actions">Choose Role</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
              </label>
              <label className="border-2 mb-6 border-transparent focus-within:border-blue-500 bg-green-100 rounded-md w-full md:max-w-[300px] lg:max-w-[450px] px-2 gap-x-2 flex items-center h-10 mx-auto">
                <span className="bg-white rounded-sm inline-block px-1 py-1 text-xl text-blue-500 font-bold">
                  <CiUser />
                </span>
                <input
                  value={registerInput.full_name}
                  onChange={handleInputChange}
                  type="text"
                  name="full_name"
                  placeholder="User name"
                  className="w-full bg-transparent placeholder:text-gray-400 placeholder:text-[12px] focus:outline-none focus:ring-0"
                />
              </label>
              <label className=" border-2 mb-6 border-transparent focus-within:border-blue-500 bg-green-100 rounded-md w-full md:max-w-[300px] lg:max-w-[450px] px-2 gap-x-2 flex items-center h-10 mx-auto">
                <span className="bg-white rounded-sm inline-block px-1 py-1 text-xl text-blue-500 font-bold">
                <IoLocationOutline />
                </span>
                <input
                  value={registerInput.location}
                  onChange={handleInputChange}
                  name="location"
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent placeholder:text-gray-400 placeholder:text-[12px] focus:outline-none focus:border-none"
                />
              </label>
              <label className=" border-2 mb-6 border-transparent focus-within:border-blue-500 bg-green-100 rounded-md w-full md:max-w-[300px] lg:max-w-[450px] px-2 gap-x-2 flex items-center h-10 mx-auto">
                <span className="bg-white rounded-sm inline-block px-1 py-1 text-xl text-blue-500 font-bold">
                  <CiMail />
                </span>
                <input
                  value={registerInput.email}
                  onChange={handleInputChange}
                  name="email"
                  type="email"
                  placeholder="Enter user ID Or E-mail"
                  className="w-full bg-transparent placeholder:text-gray-400 placeholder:text-[12px] focus:outline-none focus:border-none"
                />
              </label>
              <label className="border-2 mb-6 border-transparent focus-within:border-blue-500 bg-green-100 rounded-md w-full md:max-w-[300px] lg:max-w-[450px] px-2 gap-x-2 flex items-center h-10 mx-auto">
                <span className="bg-white rounded-sm inline-block px-1 py-1 text-xl text-blue-500 font-bold">
                  <CiLock />
                </span>
                <input
                 value={registerInput.password}
                  onChange={handleInputChange}
                  name="password"
                  type={eye ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full bg-transparent placeholder:text-gray-400 placeholder:text-[12px] focus:outline-none focus:border-none"
                />
                <span className="text-gray-500 cursor-pointer" onClick={()=>setEye(!eye)}>
                  {<FaEye />}
                </span>
              </label>
              <label className="flex w-full  md:max-w-[300px] lg:max-w-[450px] items-center gap-x-2 mb-4 mx-auto">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-[#000] text-[15px] font-medium">
                  Save Password
                </span>
              </label>
              <div className="flex justify-center">
                <button className="w-full  md:max-w-[300px] lg:max-w-[450px]  bg-blue-500 rounded-md text-white font-medium py-2">
                  Register
                </button>
              </div>
              <div className="w-full  md:max-w-[300px] lg:max-w-[450px] mx-auto flex justify-end mt-3">
                <p>
                  Are you all ready register ?{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setCheck("login")}
                  >
                    Login
                  </span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

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
    </div>
  );
}

export default Login;
