import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bell, Shield, Activity, ChevronRight, Droplet, Pill, Trash2, Plus } from 'lucide-react';
import { Reminder } from '../../types';
import { useAppContext } from '../../contexts/AppContext';

const RemindersSection: React.FC = () => {
  const navigate = useNavigate();
  const { reminders, toggleReminder, addReminder, deleteReminder } = useAppContext();

  const [notifications, setNotifications] = useState(true);
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id' | 'isActive'>>({
    type: 'medication',
    time: '12:00',
    message: ''
  });

  const handleAddReminderSubmit = () => {
    if (newReminder.message.trim() === '') return;
    addReminder({ ...newReminder, isActive: true });
    setIsAddingReminder(false);
    setNewReminder({ type: 'medication', time: '12:00', message: '' });
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'medication': return <Pill className="w-5 h-5 text-purple-400" />;
      case 'water': return <Droplet className="w-5 h-5 text-blue-400" />;
      case 'glucose': return <Activity className="w-5 h-5 text-rose-400" />;
      default: return <Bell className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getReminderBg = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-purple-500/10';
      case 'water': return 'bg-blue-500/10';
      case 'glucose': return 'bg-rose-500/10';
      default: return 'bg-emerald-500/10';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Reminders & Notifications</h2>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl">
              <Bell className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-sm font-medium text-white">
              Push Notifications
            </span>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${notifications ? 'bg-emerald-500' : 'bg-slate-700'}`}
          >
            <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {reminders.map((reminder) => (
          <div key={reminder.id} className="p-4 border-b border-slate-800/50 flex items-center justify-between group py-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${getReminderBg(reminder.type)}`}>
                {getReminderIcon(reminder.type)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {reminder.message}
                </span>
                <span className="text-xs text-slate-500 font-mono mt-0.5">{reminder.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="text-slate-500 hover:text-rose-400 transition-colors md:opacity-0 group-hover:opacity-100 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleReminder(reminder.id)}
                className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${reminder.isActive ? 'bg-emerald-500' : 'bg-slate-700'}`}
              >
                <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${reminder.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        ))}

        {isAddingReminder ? (
          <div className="p-4 border-b border-slate-800/50 bg-slate-800/20">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Reminder message..."
                value={newReminder.message}
                onChange={e => setNewReminder({ ...newReminder, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                autoFocus
              />
              <div className="flex gap-2">
                <select
                  value={newReminder.type}
                  onChange={e => setNewReminder({ ...newReminder, type: e.target.value as any })}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 appearance-none flex-1"
                >
                  <option value="medication">Medication</option>
                  <option value="water">Water</option>
                  <option value="glucose">Glucose</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={e => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setIsAddingReminder(false)} className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={handleAddReminderSubmit} disabled={!newReminder.message.trim()} className="px-4 py-2 text-xs font-semibold bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Add Reminder</button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingReminder(true)}
            className="w-full p-4 flex items-center justify-center border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors text-emerald-400 text-sm font-semibold gap-2"
          >
            <Plus className="w-4 h-4" /> Add Custom Reminder
          </button>
        )}

        <button
          onClick={() => navigate('/privacy-security')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-white">
              Privacy & Security
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>
      </div>
    </motion.section>
  );
};

export default RemindersSection;
