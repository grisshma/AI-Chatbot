import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { MessageSquare, Lock, Mail, User, AlertCircle, Loader2 } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/signup', formData);
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            console.error("Signup error detail:", err);
            const detailedError = err.response?.data?.error;
            const fallbackError = err.message === 'Network Error' 
                ? 'Network Error: Cannot connect to the server. Is the backend running on port 5001?' 
                : 'Failed to create account. Please try again.';
            setError(detailedError || fallbackError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative p-4 transition-colors duration-300 bg-[#0f0c29]">
            <div className="soulspire-bg"></div>
            <div className="floating-particles"></div>
            
            <div className="w-full max-w-md glass-panel rounded-[40px] shadow-2xl p-10 border border-white/5 relative z-10">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-900/40 mb-6 transform rotate-6 transition-transform hover:rotate-0">
                        <img src="/logo.png" alt="SoulSpire Logo" className="w-12 h-12 object-contain" />
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic neon-text-purple">SoulSpire</h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Create System Profile</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-900/10 border border-red-500/20 rounded-2xl flex items-center space-x-3 text-red-500">
                        <AlertCircle size={20} className="shrink-0" />
                        <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Initiate Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all placeholder:text-gray-700 text-sm font-bold"
                                placeholder="commander_jin"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Terminal Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all placeholder:text-gray-700 text-sm font-bold"
                                placeholder="name@domain.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Access Protocol</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all placeholder:text-gray-700 text-sm font-bold"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-900/40 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
                    >
                        {loading ? <Loader2 size={24} className="animate-spin" /> : <span>Initialize Profiling</span>}
                    </button>
                </form>

                <p className="mt-10 text-center text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    Already Authorized?{' '}
                    <Link to="/login" className="text-purple-500 hover:text-purple-400 font-black underline underline-offset-4 decoration-2">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
