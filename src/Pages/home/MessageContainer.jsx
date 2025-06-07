import React, { useEffect } from 'react'
import User from './User'
import Message from './Message'

import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/message.thunk';
import SendMessage from './SendMessage';
const MessageContainer = () => {
  const { selectedUser } = useSelector(state => state.userReducer)
  const { messages, conversation } = useSelector(state => state.messageReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ otherParticipantId: selectedUser?._id }))

    }


  }, [selectedUser])

  return (
    <>{selectedUser ?(
    <div className='h-screen  w-full flex flex-col'>
      {/* user */}
      <div className='p-3 border-b border-b-white/10'>
        <User userDetails={selectedUser} />
      </div>
      {/* message box */}
      <div className=' h-full overflow-y-auto p-3'>
        {messages?.map((messageDetails, index) => (
          <Message key={index} messageDetails={messageDetails} conversation={conversation} />
        ))}



      </div>
      <SendMessage />

    </div>
):(<div className='w-full flex justify-center items-center flex-col'>
  <h2 className='text-lg'>Welcome to GUPSHUP</h2>
  <span className='text-xl'>Please select a user to continue your chat !!</span>
</div>)}
      </>
  )

}

export default MessageContainer