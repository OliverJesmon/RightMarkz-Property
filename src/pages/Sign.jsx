import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Sign()
{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'buyer'
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { confirmPassword, ...userData } = formData;
        const result = await register(userData);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.error || 'Registration failed');
        }

    };
    return(
        <>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center mt-6 mb-6  px-4">
        <div className="w-full max-w-md rounded-2xl  border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-6 flex justify-center">
        <div className="flex w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
        <span className="text-white font-display font-bold text-xl">RM</span>
        </div>
        </div>
        {/* Heading */}
        <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
        Sign Up
        </h2>
        <p className="mt-1 text-sm text-gray-500">
        Sign in to your account
        </p>
        </div>

        {error && <div className="mt-1 text-sm text-red-300">{error}</div>}
        <form className="space-y-5">
        <div>
        <label
        htmlFor="username"
        className="mb-2 block text-sm font-medium text-gray-700"
        >
        Name
        </label>

        <input
        id="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your username"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        </div>
        <div>
        <label
        htmlFor="email"
        className="mb-2 block text-sm font-medium text-gray-700"
        >
        Email
        </label>

        <input
        id="email"
        type="text"

        value={formData.email}
        onChange={handleChange}
        placeholder="yourname@example.com"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        </div>
        <div>
        <label
        htmlFor="Phone"
        className="mb-2 block text-sm font-medium text-gray-700"
        >
        Phone
        </label>

        <input
        id="phone"
        type="text"
        value={formData.email}
        onChange={handleChange}
        placeholder="+91 __________"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        </div>
        <div>
        <label
        htmlFor="password"
        className="mb-2 block text-sm font-medium text-gray-700"
        >
        Password
        </label>

        <input
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        </div>
        <div>
        <label
        htmlFor="password"
        className="mb-2 block text-sm font-medium text-gray-700"
        >
        Confirm Password
        </label>

        <input
        id="password"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        </div>
        <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
        Submit
        </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
        to="/login"
        className="font-medium text-blue-600 hover:text-blue-700"
        >
        Login
        </Link>
        </p>
        </div>
        </div>
        </>
    );
}
