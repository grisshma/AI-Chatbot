import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Trophy, 
  Shield, 
  Zap, 
  Brain, 
  MessageSquare,
  Calendar,
  Activity,
  Plus,
  ArrowRight,
  BookOpen,
  Dumbbell,
  Clock,
  Layout,
  Settings,
  ChevronRight,
  Star
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import api from '../utils/api';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get('/dashboard');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            if (error.response?.status === 401) navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-[#0f0c29] flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(157,80,187,0.5)]"></div>
        </div>
    );

    const user = data?.user || {};
    const habits = data?.habits || [];
    const tasks = data?.tasks || [];
    
    const xpPercent = Math.floor(((user.xp || 0) / (user.max_xp || 100)) * 100);

    const getRank = (level) => {
        if (level < 5) return 'Beginner';
        if (level < 15) return 'Apprentice';
        if (level < 30) return 'Warrior';
        if (level < 50) return 'Elite';
        return 'Legend';
    };

    const sidebarItems = [
        { name: 'Dashboard', icon: <Layout size={20} />, path: '/' },
        { name: 'AI Terminal', icon: <MessageSquare size={20} />, path: '/chat' },
        { name: 'Study Mode', icon: <BookOpen size={20} />, path: '/study' },
        { name: 'Sports Mode', icon: <Dumbbell size={20} />, path: '/sports' },
        { name: 'Schedule', icon: <Clock size={20} />, path: '/lifestyle' },
        { name: 'Habits', icon: <Flame size={20} />, path: '/lifestyle' }
    ];

    return (
        <div className="min-h-screen bg-[#0f0c29] text-white font-['Outfit'] flex">
            {/* Immersive Background */}
            <div className="soulspire-bg"></div>
            <div className="floating-particles"></div>

            {/* Sidebar */}
            <aside className="w-72 glass-panel border-r border-white/5 p-8 hidden lg:flex flex-col gap-10 relative z-20">
                <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all">
                        <img src="/logo.png" className="w-8 h-8 object-contain" alt="Logo" />
                    </div>
                    <span className="text-2xl font-black italic tracking-tighter uppercase neon-text-purple">SoulSpire</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {sidebarItems.map(item => (
                        <Link 
                            key={item.name} 
                            to={item.path}
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold uppercase tracking-widest text-[10px] ${
                                window.location.pathname === item.path 
                                ? 'bg-purple-600 text-black shadow-lg shadow-purple-900/40' 
                                : 'text-gray-500 hover:text-purple-400 hover:bg-white/5'
                            }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto glass-panel p-6 rounded-3xl border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full border-2 border-purple-500 p-0.5">
                            <img src="/companion_general.png" className="w-full h-full rounded-full object-cover" alt="Companion" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Agent Spire</span>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-bold">"Master, you have 3 study objectives left today. Focus is key to evolution."</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 relative z-10 overflow-y-auto h-screen">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-8"
                    >
                        <div className="relative">
                            <div className="w-32 h-32 rounded-[40px] overflow-hidden border-2 border-purple-500/30 p-1 bg-white/5 shadow-2xl">
                                <img src="/companion_general.png" alt="Avatar" className="w-full h-full object-cover rounded-[35px]" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-pink-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg italic">LVL {user.level || 1}</div>
                        </div>
                        <div>
                            <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Welcome Back, <span className="neon-text-purple">{user.username || 'Master'}</span></h1>
                            <div className="flex items-center gap-4">
                                <span className="px-4 py-1.5 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]">{getRank(user.level)}</span>
                                <span className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest italic">
                                    <Star size={12} className="text-yellow-500" />
                                    Global Rank: Elite Initiate
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button onClick={() => navigate('/chat')} className="flex-1 md:flex-none glass-panel px-8 py-4 rounded-2xl border border-purple-500/30 hover:border-purple-500 flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(157,80,187,0.3)]">
                            <MessageSquare size={18} className="text-purple-400" />
                            <span className="text-xs font-black uppercase tracking-widest italic">Core Terminal</span>
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Progress Column */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* XP Bar */}
                        <div className="glass-panel p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent"></div>
                            <div className="flex justify-between items-end mb-6 relative z-10">
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-purple-400 mb-2">Evolution Metric</h3>
                                    <div className="text-3xl font-black italic">{user.xp || 0} <span className="text-sm text-gray-500">/</span> {user.max_xp || 100} <span className="text-sm text-purple-500 ml-4">XP</span></div>
                                </div>
                                <span className="text-4xl font-black italic neon-text-purple">{xpPercent}%</span>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full p-1 border border-white/5 mb-2 relative z-10">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpPercent}%` }}
                                    className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(157,80,187,0.5)]"
                                ></motion.div>
                            </div>
                        </div>

                        {/* Recent Objectives */}
                        <div>
                            <div className="flex justify-between items-center mb-6 px-4">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-4">
                                    <Zap size={24} className="text-purple-500" />
                                    Active Objectives
                                </h3>
                                <Link to="/lifestyle" className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-white transition-all">View All Protocols</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {tasks.slice(0, 4).map(task => (
                                    <div key={task.id} className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                                                {task.category === 'study' ? <BookOpen size={18} /> : task.category === 'sports' ? <Dumbbell size={18} /> : <Layout size={18} />}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-tight italic group-hover:text-purple-400 transition-all">{task.title}</h4>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{task.category}</span>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-gray-700 group-hover:text-purple-400 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Side Column: Streaks & Habits */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="glass-panel p-8 rounded-[40px] border border-white/5">
                            <h3 className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-3 mb-8">
                                <Flame size={24} className="text-pink-500" />
                                Growth Streaks
                            </h3>
                            <div className="space-y-6">
                                {habits.slice(0, 3).map(habit => (
                                    <div key={habit.id}>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3 italic">
                                            <span>{habit.name}</span>
                                            <span className="text-pink-500">{habit.streak} DAY STREAK</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            {[...Array(7)].map((_, i) => (
                                                <div key={i} className={`flex-1 h-2 rounded-full ${i < (habit.streak % 7 || 7) ? 'bg-pink-500 shadow-[0_0_8px_rgba(255,0,204,0.3)]' : 'bg-white/5'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel p-8 rounded-[40px] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent"></div>
                            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-6 relative z-10">Mastery Path</h3>
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="p-4 rounded-3xl bg-white/5 border border-white/5 text-center">
                                    <div className="text-xl font-black italic color-cyan-400">Warrior</div>
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Physics</div>
                                </div>
                                <div className="p-4 rounded-3xl bg-white/5 border border-white/5 text-center">
                                    <div className="text-xl font-black italic text-pink-500">Legend</div>
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Agility</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
