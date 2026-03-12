import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import { useAppContext } from '../contexts/AppContext';
import { Search, Info, Plus } from 'lucide-react';
import { Medication } from '../types';

const AddMedicationScreen: React.FC = () => {
    const navigate = useNavigate();
    const { allMedications, logMedication } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMedications = allMedications.filter(med =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLogMedication = (medication: Medication) => {
        logMedication(medication);
        navigate(-1); // Go back to the medications list
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 flex-1 w-full overflow-hidden">
            <Header title="Log Medication" showBackButton backPath="/medications" />

            <div className="px-5 pt-4 pb-2 z-10 bg-slate-950/80 backdrop-blur-md sticky top-0">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search medications..."
                        value={searchQuery}
                        maxLength={50}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white text-sm rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                </div>
            </div>

            <main className="flex-1 overflow-y-auto p-5 pb-safe">
                <div className="space-y-3">
                    {filteredMedications.length > 0 ? (
                        filteredMedications.map((med, index) => (
                            <motion.div
                                key={med.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleLogMedication(med)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Log ${med.name}, ${med.dosage} ${med.form}`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleLogMedication(med);
                                    }
                                }}
                                className="bg-slate-900 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800 p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:border-transparent"
                            >
                                <div className="flex flex-col flex-1 mr-4">
                                    <span className="text-white font-semibold flex items-center">
                                        {med.name}
                                    </span>
                                    <p className="text-slate-400 text-xs mt-1 leading-snug line-clamp-2">
                                        {med.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[10px] font-bold tracking-wider uppercase text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-md">
                                            {med.dosage}
                                        </span>
                                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 bg-slate-800 px-2 py-0.5 rounded-md">
                                            {med.form}
                                        </span>
                                    </div>
                                </div>

                                <div className="shrink-0 w-10 h-10 rounded-full bg-slate-800 group-hover:bg-cyan-500 flex items-center justify-center transition-colors">
                                    <Plus className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <Info className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                            <p className="text-slate-400 font-medium">No medications found.</p>
                            <p className="text-slate-500 text-sm mt-1">Try another search term.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AddMedicationScreen;
