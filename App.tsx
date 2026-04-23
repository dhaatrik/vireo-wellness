
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import DashboardScreen from './screens/DashboardScreen';
import InsightsScreen from './screens/InsightsScreen';
import DailyMealsScreen from './screens/DailyMealsScreen';
import AddMealScreen from './screens/AddMealScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import DevicesScreen from './screens/DevicesScreen';
import ConnectDeviceScreen from './screens/ConnectDeviceScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import PrivacySecurityScreen from './screens/PrivacySecurityScreen';
import DailyMedicationsScreen from './screens/DailyMedicationsScreen';
import AddMedicationScreen from './screens/AddMedicationScreen';
import { AppContextProvider } from './contexts/AppContext';

const App: React.FC = () => {
  React.useEffect(() => {
    // Always start from the flash screen on initial load
    if (window.location.pathname !== '/') {
      window.location.pathname = '/';
    }
  }, []);

  return (
    <AppContextProvider>
      <div className="min-h-screen w-full bg-slate-950 flex justify-center text-slate-100 font-sans selection:bg-emerald-500/30">
        <div className="w-full bg-slate-900 min-h-screen shadow-2xl shadow-emerald-900/20 flex flex-col md:flex-row relative overflow-hidden sm:border-x sm:border-slate-800/50">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/onboarding" element={<OnboardingScreen />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/insights" element={<InsightsScreen />} />
              <Route path="/daily-meals" element={<DailyMealsScreen />} />
              <Route path="/add-meal" element={<AddMealScreen />} />
              <Route path="/meal/:foodId" element={<MealDetailScreen />} />
              <Route path="/medications" element={<DailyMedicationsScreen />} />
              <Route path="/add-medication" element={<AddMedicationScreen />} />
              <Route path="/devices" element={<DevicesScreen />} />
              <Route path="/connect-device/:deviceId" element={<ConnectDeviceScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/privacy-security" element={<PrivacySecurityScreen />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </AppContextProvider>
  );
};

export default App;
