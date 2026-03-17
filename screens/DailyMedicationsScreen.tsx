import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import DatePicker from '../components/DatePicker';
import { useAppContext } from '../contexts/AppContext';
import { MedicationEntry } from '../types';
import { Calendar, Plus, Pill } from 'lucide-react';


const DailyMedicationsScreen: React.FC = () => {
    const navigate = useNavigate();
    const { medicationEntries } = useAppContext();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // ⚡ Bolt: Cache year, month, and date for manual integer comparison inside the filter loop to improve performance over date-fns isSameDay
    // and wrap in useMemo to prevent unnecessary recalculations on every render.
    const entriesForSelectedDate = useMemo(() => {
        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth();
        const selectedDay = selectedDate.getDate();
        return medicationEntries.filter(entry => {
            const entryDate = new Date(entry.takenAt);
            return entryDate.getFullYear() === selectedYear &&
                   entryDate.getMonth() === selectedMonth &&
                   entryDate.getDate() === selectedDay;
        });
    }, [medicationEntries, selectedDate]);

    const pillsTakenToday = entriesForSelectedDate.length;

    return (
        <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
            <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
                <Header
                    title="Daily Medications"
                    showBackButton
                    backPath="/dashboard"
                    rightContent={
                        <button className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-all duration-200">
                            <Calendar className="w-5 h-5" />
                        </button>
                    }
                />
                <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

                <main className="flex-1 overflow-y-auto p-5 space-y-5 pb-24 md:pb-5">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-between items-center bg-gradient-to-r from-cyan-900/40 to-blue-900/20 border border-cyan-800/30 p-5 rounded-3xl"
                    >
                        <div>
                            <p className="text-sm font-medium text-cyan-200/70 mb-1">Total Taken</p>
                            <p className="text-3xl font-bold text-white tracking-tight">{pillsTakenToday} <span className="text-lg text-cyan-400 font-medium">doses</span></p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="p-3 bg-cyan-500/20 rounded-2xl mb-2">
                                <Pill className="w-7 h-7 text-cyan-500" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden transition-all duration-300"
                    >
                        <div className="p-5 border-b border-slate-800/50">
                            <h3 className="text-lg font-bold text-white">Log</h3>
                        </div>
                        <div className="p-5 pt-0 mt-2">
                            {entriesForSelectedDate.length === 0 ? (
                                <p className="text-slate-500 text-sm italic py-2">No medications logged for this day.</p>
                            ) : (
                                <ul className="space-y-4 py-2">
                                    <AnimatePresence>
                                        {entriesForSelectedDate.map((entry: MedicationEntry) => (
                                            <motion.li
                                                key={entry.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex justify-between items-center group"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-slate-200 font-semibold text-base group-hover:text-white transition-colors">
                                                        {entry.medication.name}
                                                    </span>
                                                    <span className="text-slate-500 text-xs mt-0.5">
                                                        {entry.medication.dosage} • {entry.medication.form}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-cyan-400 text-xs font-bold bg-cyan-500/10 px-2 py-1 rounded-lg">
                                                        {new Date(entry.takenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="pt-2"
                    >
                        <button
                            onClick={() => navigate('/add-medication')}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-4 rounded-2xl shadow-xl shadow-cyan-900/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center"
                        >
                            <Plus className="w-5 h-5 mr-2 stroke-[3px]" />
                            Log Medication
                        </button>
                    </motion.div>

                </main>
            </div>
            <BottomNav />
        </div>
    );
};

export default DailyMedicationsScreen;
