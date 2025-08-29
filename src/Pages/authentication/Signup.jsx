import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignupUserThunk } from "../../store/slice/user/user.thunk";
import toast, { Toaster } from "react-hot-toast";
const SignUp = () => {
  const dispatch = useDispatch();
   const navigate=useNavigate()
   
   const {isAuthenticated}=useSelector(state=>state.userReducer)
   useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
   },[isAuthenticated,navigate])
  const [SignUpData, SetSignUpData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender:"male"
    
  });
  const handleSignUpData = (e) => {
    SetSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSingup = async() => {
    if(SignUpData.password !== SignUpData.confirmPassword){
      toast.error("Passwords do not match.");
      return
    }
    const response=await dispatch(SignupUserThunk(SignUpData));
    console.log(response.payload)
     if(response.payload.success){
navigate("/")
     }
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-[40rem] flex flex-col gap-5 bg-base-200 p-6 rounded-lg w-full">
         <Toaster position="top-center" reverseOrder={false} />
        <h2 className="text-2xl font-sans">Please Signup..!!</h2>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Full Name"
            name="fullName"
            onChange={handleSignUpData}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            onChange={handleSignUpData}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <RiLockPasswordFill />
          <input
            type="password"
            className="grow"
            placeholder="password"
            name="password"
            onChange={handleSignUpData}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <RiLockPasswordFill />
          <input
            type="password"
            className="grow"
            placeholder=" Confirm password"
            name="confirmPassword"
            onChange={handleSignUpData}
          />
        </label>
        {/* radio */}
      <div className="flex items-center gap-4">
  <label htmlFor="male" className="flex items-center gap-2 cursor-pointer">
    <input
      id="male"
      type="radio"
      name="gender"
      className="radio radio-primary"
      
      value="male"
      onChange={handleSignUpData}
    />
    <span>Male</span>
  </label>

  <label htmlFor="female" className="flex items-center gap-2 cursor-pointer">
    <input
      id="female"
      type="radio"
      name="gender"
      className="radio radio-primary"
      value="female"
      onChange={handleSignUpData}
    />
    <span>Female</span>
  </label>
</div>


        <button className="btn btn-primary" onClick={handleSingup}>
          Signup
        </button>
        <p>
          Already have an account? &nbsp;
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
