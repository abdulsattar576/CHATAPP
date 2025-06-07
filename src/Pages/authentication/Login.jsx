import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserThunk } from "../../store/slice/user/user.thunk";
const Login = () => {
   const navigate=useNavigate()
  const dispatch = useDispatch();
   const {isAuthenticated}=useSelector(state=>state.userReducer)
   useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
   },[isAuthenticated,navigate])
 
  const [login, setlogin] = useState({
    username: "",
    password: "",
  });
  const handleLoginInput = (e) => {
    setlogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = async () => {
    const response = await dispatch(LoginUserThunk(login));
     
     if(response.payload.success){
      navigate('/')
     }
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-[40rem] flex flex-col gap-5 bg-base-200 p-6 rounded-lg w-full">
        <Toaster position="top-center" reverseOrder={false} />
        <h2 className="text-2xl font-sans">Please Login..!!</h2>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            onChange={handleLoginInput}
            name="username"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <RiLockPasswordFill />
          <input
            type="password"
            className="grow"
            placeholder="password"
            onChange={handleLoginInput}
            name="password"
          />
        </label>
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <p>
          Dont't have an account? &nbsp;
          <Link to="/signup" className="text-blue-400 underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
