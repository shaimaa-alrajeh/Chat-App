import React, { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    img: null,
  });
  let [MessageContactError, setMessageContactError] = useState("")
  const fileInputRef = useRef(null);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevData) => ({...prevData, [name]: value}));
  };

  const handleImage = (event) => {
    let file = event.target.files[0]
    if (file) {
        setNewUser({...newUser, img: file})
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', newUser.id);
    formData.append('name', newUser.name);
    formData.append('phone', newUser.phone);
    formData.append('messages', JSON.stringify(newUser.messages));
    if (newUser.img) {
        formData.append('img', newUser.img); 
    }

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          console.log("user added successfully");
          navigate('/login');
      } else {
          setMessageContactError(result);
      }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Error during registration. Please try again.');
        setNewUser({
          id: "",
          name: "",
          img: null,
          phone: "",
          messages: []
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen w-full flex items-center justify-center'>
      <form onSubmit={handleSubmit} className="max-w-6xl w-full p-10 bg-white rounded-lg shadow-lg text-gray-800 space-y-6">
        <fieldset>
          <legend className="text-4xl font-bold text-blue-700 mb-4">Sign up</legend>

          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Enter your Full Name"
                className="mt-1 p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0088cc] text-gray-700"
                value={newUser.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Phone</label>
              <input
                name="phone"
                type="number"
                id="phone"
                placeholder="Enter your phone number"
                className="mt-1 p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0088cc] text-gray-700"
                value={newUser.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Profile Image</label>
              <input
                name="img"
                type="file"
                id="img"
                accept="image/*"
                className="mt-1 p-3 rounded bg-gray-100 border border-gray-300 file:bg-blue-400 file:hover:bg-blue-700 file:text-white file:rounded file:px-3 file:py-1 file:transition file:duration-200"
                onChange={handleImage}
                ref={fileInputRef}
              />
            </div>
          </div>
          <p>{MessageContactError}</p>
          <div className="pt-4">
              <button
                type="submit"
                className="w-full mt-5 p-3 rounded bg-blue-400 text-white font-semibold hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0088cc]"
              >
                Register
              </button> 
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;