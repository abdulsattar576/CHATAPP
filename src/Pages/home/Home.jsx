import React, { useEffect } from 'react'
import Usersidebar from './Usersidebar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socket.slice'
import { setNewMessages } from '../../store/slice/message/message.slice'
 
const Home = () => {
  const {isAuthenticated,userProfile}=useSelector(state=>state.userReducer)
  const{socket}=useSelector(state=>state.socketReducer)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(!isAuthenticated)return
    dispatch(initializeSocket(userProfile?._id))
  },[isAuthenticated])
  useEffect(()=>{
    if(!socket) return;
    socket.on('onlineUser',(onlineUser)=>{
dispatch(setOnlineUsers(onlineUser))
    })
    socket.on("newMessage",(newMessage)=>{
      dispatch(setNewMessages(newMessage))
    })
    return () => {
  socket.off('onlineUser');
  socket.off('newMessage');
}

  },[socket])
  return (
    <div className='flex'>
      <Usersidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
