
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAppContext } from '../contexts/AppContext';
import { Device } from '../types';
import { ChevronRight, Plus, Activity, Watch, Smartphone, HeartPulse } from 'lucide-react';

const getDeviceIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('watch') || lowerName.includes('band')) return <Watch className="w-6 h-6" />;
  if (lowerName.includes('phone') || lowerName.includes('mobile')) return <Smartphone className="w-6 h-6" />;
  if (lowerName.includes('heart') || lowerName.includes('monitor')) return <HeartPulse className="w-6 h-6" />;
  return <Activity className="w-6 h-6" />;
};

interface DeviceListItemProps {
  device: Device;
  index: number;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({ device, index }) => {
  const navigate = useNavigate();
  
  const handleItemClick = () => {
    if (!device.isConnected) {
      navigate(`/connect-device/${device.id}`);
    }
  };

  return (
    <motion.button 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={handleItemClick}
        className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 border ${
          device.isConnected 
            ? 'bg-slate-900 border-emerald-500/30 shadow-lg shadow-emerald-500/5' 
            : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
        }`}
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-xl mr-4 ${
          device.isConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
        }`}>
           {getDeviceIcon(device.name)}
        </div>
        <div>
          <h3 className="text-base font-bold text-white text-left mb-0.5">{device.name}</h3>
          {device.isConnected && device.chargeLevel && (
            <p className="text-xs font-medium text-slate-400">Connected • {device.chargeLevel}%</p>
          )}
           {device.isConnected && !device.chargeLevel && (
            <p className="text-xs font-medium text-emerald-400">Connected</p>
          )}
          {!device.isConnected && device.chargeLevel && (
             <div className="flex items-center mt-1">
                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-slate-500" style={{ width: `${device.chargeLevel}%` }}></div>
                </div>
                <span className="text-xs font-medium text-slate-500">{device.chargeLevel}%</span>
            </div>
          )}
        </div>
      </div>
      {!device.isConnected && <ChevronRight className="w-5 h-5 text-slate-500" />}
      {device.isConnected && (
        <div className="flex items-center">
          <span className="relative flex h-2.5 w-2.5 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Active</span>
        </div>
      )}
    </motion.button>
  );
};

const DevicesScreen: React.FC = () => {
  const { devices } = useAppContext();

  // ⚡ Bolt: Combine multiple .filter() calls into a single loop and memoize to avoid recalculations on every render.
  const { availableToConnect, connectedDevices } = useMemo(() => {
    const available: Device[] = [];
    const connected: Device[] = [];
    const len = devices.length;
    for (let i = 0; i < len; i++) {
      const d = devices[i];
      if (d.isConnected) {
        connected.push(d);
      } else {
        available.push(d);
      }
    }
    return { availableToConnect: available, connectedDevices: connected };
  }, [devices]);

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header title="Devices & Apps" showBackButton backPath="/dashboard" />
      <main className="flex-1 overflow-y-auto p-5 space-y-8 pb-24 md:pb-5">
        {connectedDevices.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Connected</h2>
            <div className="space-y-3">
              {connectedDevices.map((device, index) => (
                <DeviceListItem key={device.id} device={device} index={index} />
              ))}
            </div>
          </section>
        )}

        {availableToConnect.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Available to connect</h2>
            <div className="space-y-3">
              {availableToConnect.map((device, index) => (
                <DeviceListItem key={device.id} device={device} index={index + connectedDevices.length} />
              ))}
            </div>
          </section>
        )}
        
        {devices.length === 0 && (
            <div className="flex flex-col items-center justify-center pt-16 pb-8 text-center px-4">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-5 border border-slate-700/50 shadow-inner">
                <Watch className="w-10 h-10 text-slate-500" />
              </div>
              <p className="text-lg text-white font-semibold mb-2">No devices connected</p>
              <p className="text-slate-400 text-sm max-w-[260px] leading-relaxed">Connect a health tracker or continuous glucose monitor to automatically sync your daily vitals.</p>
            </div>
        )}

         <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => alert("Add new device functionality not implemented.")}
            className="w-full mt-6 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-4 px-4 rounded-2xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center"
        >
            <Plus className="w-5 h-5 mr-2 stroke-[3px]" />
            Add Device or App
        </motion.button>
      </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default DevicesScreen;
