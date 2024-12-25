import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [inputData, setInputData] = useState({
        name: "",
        mobileNumber: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        let { name, value } = event.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData),
            });
            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem("userLogged", JSON.stringify(data.name))
                navigate('/Chat')
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while logging in.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-400">
            <div className="bg-white rounded-lg shadow-lg p-8 w-90 size-2/6 ">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            placeholder="User Name"
                            value={inputData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            id="mobileNumber"
                            name='mobileNumber'
                            value={inputData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button
                        type="submit"
                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Login
                    </button>
                    <label>Don't Have an account! <Link to='/Register'><span className='text-blue-500 underline hover:text-blue-700'>Register</span></Link></label>
                </form>
            </div>
        </div>
    );
}

export default Login;