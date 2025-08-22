import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserThunk, LogoutUserThunk } from '../../store/slice/user/user.thunk';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Usersidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, otheruser } = useSelector(state => state.userReducer);
  
  const [searchValue, setsearchValue] = useState("");
  const [user, setuser] = useState([]);

  // Fetch users on mount
  useEffect(() => {
    dispatch(getOtherUserThunk());
  }, [dispatch]);

  // Filter users based on search
  useEffect(() => {
    if (!searchValue) {
      setuser(otheruser);
    } else {
      const filteredUsers = otheruser.filter((user) =>
        user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setuser(filteredUsers);
    }
  }, [searchValue, otheruser]);

  const handleLogout = async () => {
    const response = await dispatch(LogoutUserThunk());
    if (response.payload.success) {
      navigate("/login");
    }
  };

  return (
    <div className='max-w-[20rem] h-screen w-full flex flex-col gap-2'>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Logo */}
      <h1 className='bg-black my-2 mx-2 px-2 py-2 text-[#7480FF] text-xl font-semibold'>GUP SHUP</h1>

      {/* Search Bar */}
      <div className='p-3'>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setsearchValue(e.target.value)}
          />
          <CiSearch size={20} />
        </label>
      </div>

      {/* User List */}
      <div className='h-full overflow-y-auto px-3'>
        
        {user?.map((userDetails) => (
          <div className='mb-4' key={userDetails._id}>
            <User userDetails={userDetails} />
          </div>
        ))}
      </div>

      {/* Profile & Logout */}
      <div className='flex items-center justify-between p-3'>
        <div className="avatar flex items-center">
          {userProfile?<div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            <img src={userProfile?.avatar} alt="User Avatar" />
          </div>:<span className="loading loading-spinner text-secondary"></span>}
          
          <h2 className='px-2 py-2 ml-2'>{userProfile?.fullName}</h2>
        </div>
        <button className="btn btn-primary btn-sm px-4" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Usersidebar;
