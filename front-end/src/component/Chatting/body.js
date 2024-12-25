import React, { useState, useEffect } from "react";
import socket from "./socket";
import image from "./background.jpg";

function Body() {
  const [messages, setMessages] = useState([]);
  const userName = "shaimaa"; // Replace with the current user's name (e.g., Shaimaa or Yara)
  const userSocketId = socket.id;

  useEffect(() => {
    socket.emit("join", userName);

    socket.on("message", (messageData, socketFrom, socketTo, sock) => {
      console.log("Message received:", messageData);
      const newMessage = { ...messageData, socketFrom, socketTo, sock };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div
      className="h-screen overflow-y-auto p-4 pb-36"
      style={{ backgroundImage: `url(${image})` }}
    >
      {messages.map((item, index) => {
          // If the message is sent by the current user, align to the right
          
        if (item.socketFrom === item.sock) {
           
            if (item.socketFrom)
            {
                return (
                    <div key={index} className="flex justify-end mb-4">
              <div className="bg-blue-400 text-white rounded-lg p-3 max-w-md">
                <p>{item.message}</p>
                <p className="text-xs">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
                )
                  
            }
            if (item.socketTo)
            {
                return (
                    <div key={index} className="flex justify-start mb-4">
              <div className="bg-blue-400 text-white rounded-lg p-3 max-w-md">
                <p>{item.message}</p>
                <p className="text-xs">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
                )
                  
            }   
        }els
        
      })}
    </div>
  );
}

export default Body;
