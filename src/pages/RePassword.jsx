import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Reset() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, navigate]);

    const handleReset = async (e) => {
        e.preventDefault();

        setError('');
        setMessage('');

        const { newPassword, confirmPassword } = formData;

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_AUTH}/auth/reset/${id}`,{newPassword});

            console.log(response.data);

            setMessage('Password reset successfully. Redirecting to login...');
            setFormData({
                newPassword: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                'Failed to reset password. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

        <div className="mb-6 text-left">
        <h2 className="text-2xl font-bold text-gray-900">
        Reset Password
        </h2>
        </div>

        {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
            </div>
        )}

        {message && (
            <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
            {message}
            </div>
        )}

        <form onSubmit={handleReset} className="space-y-5">

        <div>
        <label
        htmlFor="newPassword"
        className="mb-2 block text-sm font-medium text-gray-700"
        >
        Password
        </label>

        <div className="relative">
        <input
        id="newPassword"
        name="newPassword"
        type={showPassword ? 'text' : 'password'}
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="Enter your password"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800"
        >
        {showPassword ? 'Hide' : 'Show'}
        </button>
        </div>
        </div>

        <div>
        <label
        htmlFor="confirmPassword"
        className="mb-2 block text-sm font-medium text-gray-700"
        >
        Confirm Password
        </label>

        <div className="relative">
        <input
        id="confirmPassword"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <button
        type="button"
        onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800"
        >
        {showConfirmPassword ? 'Hide' : 'Show'}
        </button>
        </div>
        </div>


        <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
        {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        </form>
        </div>
        </div>
    );
}
