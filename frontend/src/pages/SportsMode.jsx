import React, { useState } from 'react';
import { 
  Dumbbell, 
  Droplets, 
  Trophy, 
  Zap, 
  Calendar, 
  ChevronRight, 
  Plus, 
  Flame, 
  Timer,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';

const SportsMode = () => {
    const [waterIntake, setWaterIntake] = useState(4);
    const [workouts, setWorkouts] = useState([
        { id: 1, name: 'Strength Training', sets: '5x5', target: 'Chest/Triceps', xp: 50 },
        { id: 2, name: 'High Intensity Cardio', duration: '30m', target: 'Full Body', xp: 40 },
        { id: 3, name: 'Combat Practice', duration: '45m', target: 'Agility', xp: 60 }
    ]);

    const addWater = () => {
        if (waterIntake < 12) setWaterIntake(waterIntake + 1);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] text-white font-['Outfit']">
            {/* Energetic Stadium Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,210,255,0.1),transparent_40%)]"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-600/5 blur-[120px] rounded-full"></div>
            
            <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
                            <img src="/companion_general.png" alt="Sports Coach" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black italic tracking-tighter uppercase neon-text-blue">Training Grounds</h1>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <Flame size={14} className="text-orange-400" />
                                Sports Assistant Mode Active
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="glass-panel px-6 py-2 rounded-2xl border border-cyan-500/20 flex items-center gap-2">
                            <Zap size={16} className="text-cyan-400" />
                            <span className="text-xs font-black uppercase tracking-widest">Power: 85%</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Progress Column */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Water Intake Tracker */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-panel p-8 rounded-[40px] border border-cyan-500/10 text-center"
                        >
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-cyan-400">Hydration Levels</h3>
                            <div className="flex justify-center gap-2 mb-8">
                                {[...Array(12)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`w-3 h-10 rounded-full transition-all duration-500 ${i < waterIntake ? 'bg-cyan-500 shadow-[0_0_10px_rgba(0,210,255,0.5)]' : 'bg-white/5'}`}
                                    ></div>
                                ))}
                            </div>
                            <div className="text-3xl font-black italic mb-6">{waterIntake}/12 <span className="text-sm text-gray-500">GLasses</span></div>
                            <button 
                                onClick={addWater}
                                className="w-full py-4 rounded-2xl bg-cyan-600 text-black font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all"
                            >
                                <Droplets size={18} /> Consume Water
                            </button>
                        </motion.div>

                        {/* Training Goals */}
                        <div className="glass-panel p-8 rounded-[40px] border border-cyan-500/10">
                            <h3 className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-3 mb-8 text-cyan-400">
                                <Trophy size={24} /> Seasonal Goals
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { name: '100kg Bench Press', progress: 85 },
                                    { name: '5km Sub 20m', progress: 60 }
                                ].map((goal, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                                            <span className="text-white">{goal.name}</span>
                                            <span className="text-cyan-500">{goal.progress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-cyan-500" style={{ width: `${goal.progress}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Workout Column */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex justify-between items-end mb-2">
                            <h2 className="text-3xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                                <Dumbbell size={32} className="text-cyan-500" />
                                Training Module
                            </h2>
                            <button className="text-xs font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors flex items-center gap-1">
                                <Calendar size={14} /> Full Schedule
                            </button>
                        </div>

                        <div className="space-y-6">
                            {workouts.map(workout => (
                                <motion.div 
                                    key={workout.id}
                                    whileHover={{ scale: 1.01 }}
                                    className="glass-panel p-6 rounded-3xl border border-white/5 flex items-center justify-between group cursor-pointer"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-600 group-hover:text-black transition-all">
                                            <Play size={24} fill="currentColor" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black uppercase tracking-tight italic text-white group-hover:text-cyan-400 transition-colors">{workout.name}</h4>
                                            <div className="flex items-center gap-4 mt-1 opacity-60">
                                                <span className="text-[10px] font-black uppercase tracking-widest">{workout.sets || workout.duration}</span>
                                                <span className="text-[10px] font-bold uppercase italic">{workout.target}</span>
                                                <span className="text-[10px] font-black text-cyan-500">+{workout.xp} XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight size={24} className="text-gray-700 group-hover:text-cyan-400 transition-all translate-x-0 group-hover:translate-x-2" />
                                </motion.div>
                            ))}
                            <button className="w-full py-8 rounded-[40px] border border-dashed border-cyan-500/20 flex flex-col items-center justify-center gap-3 opacity-30 hover:opacity-100 transition-opacity">
                                <Plus size={32} className="text-cyan-500" />
                                <span className="text-xs font-black uppercase tracking-[0.4em]">Draft New Routine</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SportsMode;
