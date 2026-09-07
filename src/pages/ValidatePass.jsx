import {useState} from 'react';
import axios from 'axios';
export default function ValidatePass()
{
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState(false);
    const handleReset= async (e) => {
        e.preventDefault();

        if (!email) {
            alert('Error: Please enter your Email');

            return;
        }
        await axios.post(`${import.meta.env.VITE_BACKEND_AUTH}/auth/forgotpass`,{email})
        .then((response) => {

            console.log(response.data);
            setMessage(true);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            console.log("Request completed");
        });

    }

    return (
        <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center mt-6 mb-6  px-4">
    <div className="w-full max-w-md rounded-2xl  border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
    <div className="mb-6 text-left">
    <h2 className="text-2xl font-bold text-gray-900">
    Forgot Password
    </h2>
    <p className="mt-1 text-sm text-gray-500">
    Enter your registered email to reset your account password
    </p>
    </div>
    <form className="space-y-5">
    <div>
    <label
    htmlFor="email"
    className="mb-2 block text-sm font-medium text-gray-700"
    >
    Email
    </label>
    <input
    id="username"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    type="text"
    placeholder="name@example.com"
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    />
    </div>
    <button
    type="submit"
    onClick={handleReset}
    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
    Send
    </button>
    </form>
    {message ? (<div>
    <p className="mt-6 text-center text-sm text-green-500">
    Reset link is mailed to formData.email
    </p>
    </div>) :(<></>)}
    </div>
    </div>
    </>)
}
