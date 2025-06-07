import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/message.thunk';
const SendMessage = () => {
    const [message, setmessage] = useState('')
   
       const { selectedUser } = useSelector(state => state.userReducer)
    const dispatch=useDispatch()
    const handleSendMessage=()=>{
dispatch(sendMessageThunk({receiverId:selectedUser?._id,message}))
setmessage("")
    }
  return (
     <div className='w-full flex gap-2 p-4 '>
  <input
  type="text"
  placeholder="Type here ..."
  className="input input-bordered input-primary w-full"
  onChange={(e)=>setmessage(e.target.value)}
  value={message}
   />
   
<button onClick={handleSendMessage} className="btn btn-square btn-outline btn-primary">
   <IoSend color='#7480FF'/>
</button>
</div>
  )
}

export default SendMessage