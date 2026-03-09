import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, User, Phone, ChevronDown } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { formatPhoneNumber } from '../utils/validation';

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

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserProfile } = useAppContext();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone,
      countryCode: selectedCountry.code,
      email: '' // Email can be added later in settings
    });
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 p-6 relative overflow-hidden flex-1 w-full">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 mt-12 mb-8 relative z-10 max-w-md mx-auto w-full"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Welcome</h1>
        <p className="text-slate-400">Please enter your details to continue.</p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleLogin}
        className="flex-1 flex flex-col relative z-10 max-w-md mx-auto w-full"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="Rohit Kumar"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-slate-300 ml-1">Phone Number</label>
            <div className="flex gap-2">
              <div className="relative w-32 shrink-0">
                <select
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const country = COUNTRIES.find(c => c.code === e.target.value);
                    if (country) setSelectedCountry(country);
                  }}
                  className="w-full appearance-none bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                >
                  {COUNTRIES.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.isd})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </div>
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  placeholder="0000000000"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto mb-8">
          <button
            type="submit"
            disabled={!name || phone.length !== 10}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold py-4 px-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default LoginScreen;
