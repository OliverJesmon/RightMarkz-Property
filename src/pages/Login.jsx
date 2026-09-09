import {Link} from 'react-router-dom'

import { useAuth } from '../context/authContext';
import { useNavigate } from "react-router";
import {useState} from 'react';

const initialFormData = {
    email:'',
    password:''
}
export default function Login()
{
    let navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState(initialFormData);
    const [submitted, setSubmitted] = useState(false);
    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

    };
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload

        if (!formData.email || !formData.password) {
            alert('Error: Please fill in all fields');
            return;
        }

            const response = await login(formData.email, formData.password);






            if (!response.success) {
                console.log(response.message || 'Invalid Credentials');
            }



            localStorage.setItem('token', response.token);





            navigate('/');


    };

    return(<>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center mt-6 mb-6  px-4">
    <div className="w-full max-w-md rounded-2xl  border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

    {/* Logo */}
    <div className="mb-6 flex justify-center">
    <div className="flex w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
   <span className="text-white font-display font-bold text-xl">RM</span>
    </div>
    </div>

    {/* Heading */}
    <div className="mb-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">
    Login
    </h2>
    <p className="mt-1 text-sm text-gray-500">
    Sign in to your account
    </p>
    </div>

    {/* Login Form */}
    <form className="space-y-5">

    {/* Username */}
    <div>
    <label
    htmlFor="email"
    className="mb-2 block text-sm font-medium text-gray-700"
    >
    Registered Email
    </label>

    <input
    id="username"
    value={formData.email}
    onChange={(e) => updateField('email', e.target.value)}
    type="text"
    placeholder="name@example.com"
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    />
    </div>

    {/* Password */}
    <div>
    <label
    htmlFor="password"
    className="mb-2 block text-sm font-medium text-gray-700"
    >
    Password
    </label>

    <input
    id="password"
    value={formData.password}
    onChange={(e) => updateField('password', e.target.value)}
    type="password"
    placeholder="Enter your password"
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    />

    <Link
    to="/forgotpassword"
    className="font-medium text-blue-600 hover:text-blue-700"
    >
    Forgot Password?
    </Link>

    </div>

    {/* Submit */}
    <button
    type="submit"
    onClick={handleLogin}
    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
    Login
    </button>
    </form>

    {/* Footer */}
    <p className="mt-6 text-center text-sm text-gray-500">
    Don't have an account?{" "}
    <Link
    to="/signup"
    className="font-medium text-blue-600 hover:text-blue-700"
    >
    Register
    </Link>
    </p>
    </div>
    </div>
    </>);
}
