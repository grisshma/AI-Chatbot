import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Flame, 
  Target, 
  ChevronRight,
  LayoutGrid,
  ListTodo
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScheduleHabitTracker = () => {
    const [activeTab, setActiveTab] = useState('schedule');
    const [habits, setHabits] = useState([
        { id: 1, name: 'Cold Shower', streak: 12, completed: true },
        { id: 2, name: 'Read 20 Pages', streak: 5, completed: false },
        { id: 3, name: 'Meditation', streak: 8, completed: true }
    ]);
    const [schedule, setSchedule] = useState([
        { id: 1, time: '06:00 AM', activity: 'Wake up', status: 'done' },
        { id: 2, time: '08:00 AM', activity: 'Morning Workout', status: 'done' },
        { id: 3, time: '10:00 AM', activity: 'Deep Work Session', status: 'current' },
        { id: 4, time: '01:00 PM', activity: 'Lunch Break', status: 'upcoming' }
    ]);

    return (
        <div className="min-h-screen relative bg-[#0a0f1d] text-white font-['Outfit'] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(157,80,187,0.05)_0%,transparent_70%)]"></div>
            
            <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase neon-text-purple mb-2">Life Architect</h1>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Constructing the perfect routine</p>
                    </div>
                    
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                        <button 
                            onClick={() => setActiveTab('schedule')}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'schedule' ? 'bg-purple-600 text-black shadow-lg shadow-purple-900/40' : 'text-gray-500 hover:text-white'}`}
                        >
                            <Clock size={14} className="inline mr-2" />
                            Schedule
                        </button>
                        <button 
                            onClick={() => setActiveTab('habits')}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'habits' ? 'bg-pink-600 text-black shadow-lg shadow-pink-900/40' : 'text-gray-500 hover:text-white'}`}
                        >
                            <Flame size={14} className="inline mr-2" />
                            Habits
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Stats & Quick Add */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-panel p-8 rounded-[40px] border border-purple-500/10"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight italic">Daily Velocity</h3>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Optimal Progression</span>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">
                                        <span>Completion Rate</span>
                                        <span>75%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 shadow-[0_0_10px_rgba(157,80,187,0.5)] w-3/4"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                                        <div className="text-2xl font-black italic mb-1">12</div>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Habits</div>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                                        <div className="text-2xl font-black italic mb-1">9</div>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Daily Slots</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <button className="w-full py-6 rounded-[35px] border border-dashed border-purple-500/20 flex items-center justify-center gap-3 group hover:border-purple-500/50 transition-all opacity-60 hover:opacity-100">
                            <Plus size={24} className="text-purple-500 group-hover:rotate-90 transition-transform" />
                            <span className="text-sm font-black uppercase tracking-[0.2em]">Add Module</span>
                        </button>
                    </div>

                    {/* Right Column: Dynamic Content */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {activeTab === 'schedule' ? (
                                <motion.div 
                                    key="schedule"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    {schedule.map(item => (
                                        <div key={item.id} className={`glass-panel p-6 rounded-3xl border transition-all flex items-center gap-6 ${item.status === 'done' ? 'opacity-40 border-white/5' : item.status === 'current' ? 'border-purple-500/50 shadow-[0_0_20px_rgba(157,80,187,0.2)] bg-purple-600/5' : 'border-white/5 hover:border-white/20'}`}>
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 w-24">{item.time}</div>
                                            <div className="flex-1">
                                                <h4 className={`text-xl font-black uppercase tracking-tight italic ${item.status === 'done' ? 'line-through' : ''}`}>{item.activity}</h4>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mt-1">
                                                    {item.status === 'current' && <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>}
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"><ChevronRight size={18} /></button>
                                                <button className="p-2.5 rounded-xl bg-red-900/10 hover:bg-red-600/20 text-red-900 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="habits"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {habits.map(habit => (
                                        <div key={habit.id} className="glass-panel p-6 rounded-[35px] border border-white/5 hover:border-pink-500/30 group transition-all h-full flex flex-col justify-between">
                                            <div className="flex justify-between items-start mb-8">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${habit.completed ? 'bg-pink-600 text-black shadow-lg shadow-pink-900/40' : 'bg-pink-900/10 text-pink-500 border border-pink-500/30'}`}>
                                                    {habit.completed ? <CheckCircle size={28} /> : <Flame size={28} />}
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-pink-500 mb-1">{habit.streak} DAY STREAK</span>
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (habit.streak % 5 || 5) ? 'bg-pink-500' : 'bg-white/10'}`}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-2xl font-black uppercase tracking-tighter italic mb-4 group-hover:text-pink-500 transition-all">{habit.name}</h4>
                                                <button className={`w-full py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${habit.completed ? 'bg-white/5 text-gray-500 cursor-default' : 'bg-pink-600 text-black shadow-[0_0_15px_rgba(255,0,204,0.3)] hover:scale-105 active:scale-95'}`}>
                                                    {habit.completed ? 'Complete' : 'Execute Evolution'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="glass-panel p-6 rounded-[35px] border border-dashed border-pink-500/20 flex flex-col items-center justify-center gap-3 opacity-40 hover:opacity-100 transition-opacity min-h-[220px]">
                                        <Plus size={32} className="text-pink-500" />
                                        <span className="text-sm font-black uppercase tracking-[0.3em]">Initialize Habit</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleHabitTracker;
