
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Settings, Activity, Scale, Bell, Shield, LogOut, ChevronRight, User, Mail, Phone, Edit2, Check, ChevronDown, Download, Droplet, Pill, Trash2, Plus } from 'lucide-react';
import { Reminder } from '../types';
import { useAppContext } from '../contexts/AppContext';

const COUNTRIES = [
  { code: 'US', isd: '+1', name: 'United States' },
  { code: 'IN', isd: '+91', name: 'India' },
  { code: 'GB', isd: '+44', name: 'United Kingdom' },
  { code: 'AU', isd: '+61', name: 'Australia' },
  { code: 'CA', isd: '+1', name: 'Canada' },
  { code: 'DE', isd: '+49', name: 'Germany' },
  { code: 'FR', isd: '+33', name: 'France' },
  { code: 'JP', isd: '+81', name: 'Japan' },
];

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, updateUserProfile, reminders, toggleReminder, addReminder, deleteReminder } = useAppContext();
  // Placeholder state for unit preferences - in a real app, this would come from context or persistent storage.
  const [glucoseUnit, setGlucoseUnit] = useState<'mg/dL' | 'mmol/L'>('mg/dL');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [notifications, setNotifications] = useState(true);

  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id' | 'isActive'>>({
    type: 'medication',
    time: '12:00',
    message: ''
  });

  // Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone
  });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.code === userProfile.countryCode) || COUNTRIES[0]);
  const [emailError, setEmailError] = useState('');

  const handleSignOut = () => {
    // In a real app, clear auth tokens/state here
    navigate('/');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSaveProfile = () => {
    if (!validateEmail(profileData.email)) {
      return;
    }
    setIsEditingProfile(false);
    updateUserProfile({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      countryCode: selectedCountry.code
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setProfileData({ ...profileData, phone: value });
    }
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate a CSV or PDF and trigger a download
    alert("Generating your health report for the last 30 days...");
  };

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
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header title="Settings" showBackButton backPath="/dashboard" />
        <main className="flex-1 overflow-y-auto p-5 space-y-8 pb-24 md:pb-5">

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Profile</h2>
              <button
                onClick={isEditingProfile ? handleSaveProfile : () => setIsEditingProfile(true)}
                disabled={isEditingProfile && (profileData.phone.length !== 10 || !!emailError)}
                className="text-xs font-bold text-emerald-500 flex items-center gap-1 hover:text-emerald-400 disabled:text-slate-500 transition-colors"
              >
                {isEditingProfile ? (
                  <>
                    <Check className="w-3 h-3" /> Save
                  </>
                ) : (
                  <>
                    <Edit2 className="w-3 h-3" /> Edit
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
              <div className="p-4 border-b border-slate-800/50 flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-xl">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-grow">
                  <label className="text-xs text-slate-500 font-medium block mb-0.5">Full Name</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  ) : (
                    <span className="text-sm font-medium text-white block">{profileData.name}</span>
                  )}
                </div>
              </div>

              <div className="p-4 border-b border-slate-800/50 flex items-start gap-3">
                <div className="p-2 bg-slate-800 rounded-xl mt-1">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-grow">
                  <label className="text-xs text-slate-500 font-medium block mb-0.5">Email Address</label>
                  {isEditingProfile ? (
                    <>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => {
                          const newEmail = e.target.value;
                          setProfileData({ ...profileData, email: newEmail });
                          if (emailError) validateEmail(newEmail);
                        }}
                        onBlur={(e) => validateEmail(e.target.value)}
                        className={`w-full bg-slate-950 border ${emailError ? 'border-rose-500' : 'border-slate-700'} rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500`}
                      />
                      {emailError && <p className="text-xs text-rose-500 mt-1">{emailError}</p>}
                    </>
                  ) : (
                    <span className="text-sm font-medium text-white block">{profileData.email}</span>
                  )}
                </div>
              </div>

              <div className="p-4 flex items-start gap-3">
                <div className="p-2 bg-slate-800 rounded-xl mt-1">
                  <Phone className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-grow">
                  <label className="text-xs text-slate-500 font-medium block mb-0.5">Phone Number</label>
                  {isEditingProfile ? (
                    <div className="flex gap-2">
                      <div className="relative w-24 shrink-0">
                        <select
                          value={selectedCountry.code}
                          onChange={(e) => {
                            const country = COUNTRIES.find(c => c.code === e.target.value);
                            if (country) setSelectedCountry(country);
                          }}
                          className="w-full appearance-none bg-slate-950 border border-slate-700 rounded-lg py-1.5 pl-2 pr-6 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
                        >
                          {COUNTRIES.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.code} ({country.isd})
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                          <ChevronDown className="h-3 w-3 text-slate-500" />
                        </div>
                      </div>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={handlePhoneChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        placeholder="0000000000"
                      />
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-white block">{selectedCountry.isd} {profileData.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Units & Measurements</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
              <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-xl">
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                  <label htmlFor="glucoseUnit" className="text-sm font-medium text-white">
                    Blood Glucose
                  </label>
                </div>
                <select
                  id="glucoseUnit"
                  name="glucoseUnit"
                  value={glucoseUnit}
                  onChange={(e) => setGlucoseUnit(e.target.value as 'mg/dL' | 'mmol/L')}
                  className="bg-slate-800 border-none text-slate-300 text-sm font-medium rounded-xl focus:ring-2 focus:ring-emerald-500/50 py-2 pl-3 pr-8 appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="mg/dL">mg/dL</option>
                  <option value="mmol/L">mmol/L</option>
                </select>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-500/10 rounded-xl">
                    <Scale className="w-5 h-5 text-sky-400" />
                  </div>
                  <label htmlFor="weightUnit" className="text-sm font-medium text-white">
                    Body Weight
                  </label>
                </div>
                <select
                  id="weightUnit"
                  name="weightUnit"
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as 'lbs' | 'kg')}
                  className="bg-slate-800 border-none text-slate-300 text-sm font-medium rounded-xl focus:ring-2 focus:ring-emerald-500/50 py-2 pl-3 pr-8 appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
          </motion.section>

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

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Export Data</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
              <button
                onClick={handleGenerateReport}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl">
                    <Download className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-white">
                      Generate Report
                    </span>
                    <span className="text-xs text-slate-500">
                      Export last 30 days of data (CSV)
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={handleSignOut}
              className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 p-4 rounded-3xl flex items-center justify-center gap-2 text-rose-500 font-bold transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>

            <p className="text-center text-xs font-medium text-slate-600 mt-6">
              App Version 2.0.0 (Build 42)
            </p>
          </motion.section>

        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default SettingsScreen;