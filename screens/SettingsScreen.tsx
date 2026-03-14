import React from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

import ProfileSection from '../components/settings/ProfileSection';
import UnitsSection from '../components/settings/UnitsSection';
import RemindersSection from '../components/settings/RemindersSection';
import ExportSection from '../components/settings/ExportSection';
import SignOutSection from '../components/settings/SignOutSection';

const SettingsScreen: React.FC = () => {

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header title="Settings" showBackButton backPath="/dashboard" />
        <main className="flex-1 overflow-y-auto p-5 space-y-8 pb-24 md:pb-5">

          <ProfileSection />
          <UnitsSection />
          <RemindersSection />
          <ExportSection />
          <SignOutSection />

        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default SettingsScreen;
