import { useState, ReactNode, ChangeEvent, ElementType } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Edit2, Check, ChevronDown } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { isValidEmail } from '../../utils/validators';
import { formatPhoneNumber } from '../../utils/validation';

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

interface ProfileFieldProps {
  icon: ElementType;
  label: string;
  children: ReactNode;
  border?: boolean;
  alignStart?: boolean;
}

function ProfileField({ icon: Icon, label, children, border = true, alignStart = false }: ProfileFieldProps) {
  return (
    <div className={`p-4 ${border ? 'border-b border-slate-800/50' : ''} flex ${alignStart ? 'items-start' : 'items-center'} gap-3`}>
      <div className={`p-2 bg-slate-800 rounded-xl ${alignStart ? 'mt-1' : ''}`}>
        <Icon className="w-5 h-5 text-slate-400" />
      </div>
      <div className="flex-grow">
        <label className="text-xs text-slate-500 font-medium block mb-0.5">{label}</label>
        {children}
      </div>
    </div>
  );
}

export default function ProfileSection() {
  const { userProfile, updateUserProfile } = useAppContext();

  // Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone
  });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.code === userProfile.countryCode) || COUNTRIES[0]);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    if (!isValidEmail(email)) {
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

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setProfileData({ ...profileData, phone: formatted });
  };

  return (
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
        <ProfileField icon={User} label="Full Name">
          {isEditingProfile ? (
            <input
              type="text"
              value={profileData.name}
              maxLength={50}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          ) : (
            <span className="text-sm font-medium text-white block">{profileData.name}</span>
          )}
        </ProfileField>

        <ProfileField icon={Mail} label="Email Address" alignStart>
          {isEditingProfile ? (
            <>
              <input
                type="email"
                value={profileData.email}
                maxLength={100}
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
        </ProfileField>

        <ProfileField icon={Phone} label="Phone Number" border={false} alignStart>
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
                maxLength={10}
                onChange={handlePhoneChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="0000000000"
              />
            </div>
          ) : (
            <span className="text-sm font-medium text-white block">{selectedCountry.isd} {profileData.phone}</span>
          )}
        </ProfileField>
      </div>
    </motion.section>
  );
}
