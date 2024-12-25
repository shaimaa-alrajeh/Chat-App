import React, { useState } from 'react';
import socket from './socket';

function Footer() {
    const [message, setMessage] = useState('');
   
    const sendMessage = () => {
        if (message.trim()) {
          socket.emit('message', message); // Send message to server
          setMessage(''); // Clear the input field
        }
    };
   
    

    return (
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="bg-blue-400 hover:bg-blue-700 rounded-xl text-white px-4 py-2 ml-2">
                    Send
                </button>
            </div>
        </footer>
    );
}

export default Footer;
