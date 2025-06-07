import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { getOtherUserThunk, getUserProfileThunk } from "./store/slice/user/user.thunk";
 const App = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    (async()=>{
       await dispatch(getUserProfileThunk())
      
    })()
    
  },[])
  return (<div>
     
  </div>
  )
};

export default App;
