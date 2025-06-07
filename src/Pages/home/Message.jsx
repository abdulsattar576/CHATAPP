 import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Message = ({ messageDetails }) => {
  const messageRef = useRef(null);
  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!userProfile || !messageDetails) return null;

  return (
    <div
      ref={messageRef}
      className={`chat ${
        userProfile._id === messageDetails.senderId
          ? "chat-end"
          : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-12 rounded-full">
          <img
            src={
              userProfile._id === messageDetails.senderId
                ? userProfile.avatar
                : selectedUser?.avatar
            }
            alt="avatar"
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">
          {moment(messageDetails?.createdAt).format("h:mm A")}
        </time>
      </div>
      <div className="chat-bubble">{messageDetails?.message}</div>
    </div>
  );
};

export default Message;
