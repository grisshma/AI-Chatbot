import React from 'react';

const StatCard = ({ label, value, icon, color }) => {
    return (
        <div className="glass-panel p-6 rounded-[30px] border border-white/5 hover:border-purple-500/30 transition-all duration-500 group relative overflow-hidden">
            <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color} text-black shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {icon}
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{label}</span>
            </div>
            <div className="flex items-end gap-3 relative z-10">
                <span className="text-3xl font-black text-white italic tracking-tighter">{value}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full mb-2 overflow-hidden border border-white/5">
                    <div 
                        className={`h-full bg-gradient-to-r ${color} rounded-full shadow-[0_0_12px_rgba(157,80,187,0.4)] transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
                    ></div>
                </div>
            </div>
            {/* Ambient Background Glow */}
            <div className={`absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700`}></div>
        </div>
    );
};

export default StatCard;
