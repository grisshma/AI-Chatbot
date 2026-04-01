import React, { useState, useEffect } from 'react';
import { 
  Book, 
  Clock, 
  Layers, 
  Zap, 
  Moon, 
  Coffee, 
  Play, 
  Pause, 
  RotateCcw,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudyMode = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('Work'); // 'Work', 'Break'
    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Advanced Mathematics', progress: 65, color: 'from-purple-600 to-blue-500' },
        { id: 2, name: 'Quantum Physics', progress: 40, color: 'from-blue-600 to-cyan-500' },
        { id: 3, name: 'Neural Networks', progress: 85, color: 'from-pink-600 to-purple-500' }
    ]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === 'Work') {
                alert('Session Complete! Take a break Master.');
                setMode('Break');
                setTimeLeft(5 * 60);
            } else {
                setMode('Work');
                setTimeLeft(25 * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a14] text-white font-['Outfit']">
            {/* Moonlight Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(157,80,187,0.1),transparent_40%)]"></div>
            <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full"></div>
            
            <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_20px_rgba(157,80,187,0.2)]">
                            <img src="/companion_study.png" alt="Moonlight Mentor" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black italic tracking-tighter uppercase neon-text-purple">Moonlight Sanctum</h1>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <Moon size={14} className="text-purple-400" />
                                Study Assistant Mode Active
                            </p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Pomodoro Focus Area */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-panel p-10 rounded-[40px] border border-purple-500/10 text-center relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent"></div>
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-purple-400">{mode} Protocol</h3>
                            
                            <div className="relative mb-10">
                                <div className="text-8xl font-black tracking-tighter italic neon-text-purple">{formatTime(timeLeft)}</div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden border border-white/5">
                                    <motion.div 
                                        className="h-full bg-purple-500 shadow-[0_0_15px_rgba(157,80,187,0.5)]"
                                        initial={{ width: "100%" }}
                                        animate={{ width: `${(timeLeft / (mode === 'Work' ? 25 * 60 : 5 * 60)) * 100}%` }}
                                        transition={{ duration: 1 }}
                                    ></motion.div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <button 
                                    onClick={() => setIsActive(!isActive)}
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isActive ? 'bg-white/10 text-white' : 'bg-purple-600 text-black shadow-[0_0_20px_rgba(157,80,187,0.4)]'}`}
                                >
                                    {isActive ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
                                </button>
                                <button 
                                    onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }}
                                    className="w-16 h-16 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                                >
                                    <RotateCcw size={24} />
                                </button>
                            </div>
                        </motion.div>

                        <div className="glass-panel p-6 rounded-3xl border border-purple-900/10">
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                <Zap size={14} className="text-yellow-400" />
                                Study Streak: 5 Days
                            </h4>
                            <div className="flex gap-2">
                                {[1,1,1,1,1,0,0].map((d, i) => (
                                    <div key={i} className={`flex-1 h-2 rounded-full ${d ? 'bg-purple-500 shadow-[0_0_10px_rgba(157,80,187,0.4)]' : 'bg-white/5'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Subject & Activity Area */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {subjects.map(subject => (
                                <motion.div 
                                    key={subject.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-panel p-6 rounded-3xl border border-white/5 group h-full flex flex-col justify-between"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-lg`}>
                                            <Book size={20} className="text-white" />
                                        </div>
                                        <ChevronRight size={18} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black uppercase tracking-tight italic mb-3">{subject.name}</h4>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 text-gray-500">
                                            <span>Mastery Level</span>
                                            <span className="text-purple-400">{subject.progress}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full bg-gradient-to-r ${subject.color} shadow-lg`}
                                                style={{ width: `${subject.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <button className="glass-panel p-6 rounded-3xl border border-dashed border-purple-500/20 flex flex-col items-center justify-center gap-3 opacity-50 hover:opacity-100 transition-opacity min-h-[160px]">
                                <Plus size={32} className="text-purple-500" />
                                <span className="text-xs font-black uppercase tracking-[0.3em]">Initialize Subject</span>
                            </button>
                        </div>

                        <div className="glass-panel p-8 rounded-[40px] border border-purple-500/10">
                            <h3 className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-3 mb-8">
                                <Clock size={24} className="text-purple-600" />
                                Study Timetable
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { time: '09:00 AM', task: 'Logic & Critical Thinking', status: 'completed' },
                                    { time: '11:00 AM', task: 'Neural Network Architecture', status: 'pending' },
                                    { time: '02:00 PM', task: 'Deep Learning Optimization', status: 'pending' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 w-20">{item.time}</div>
                                        <div className="flex-1 text-sm font-bold uppercase tracking-tight italic">{item.task}</div>
                                        <div className={`w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-purple-500 shadow-[0_0_10px_rgba(157,80,187,0.5)]' : 'bg-white/10'}`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudyMode;
