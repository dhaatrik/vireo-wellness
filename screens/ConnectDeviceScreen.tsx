
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import { useAppContext } from '../contexts/AppContext';
import { Device } from '../types';
import { Bluetooth, Activity, Watch, Smartphone, HeartPulse, Loader2 } from 'lucide-react';

const getDeviceIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('watch') || lowerName.includes('band')) return <Watch className="w-12 h-12" />;
  if (lowerName.includes('phone') || lowerName.includes('mobile')) return <Smartphone className="w-12 h-12" />;
  if (lowerName.includes('heart') || lowerName.includes('monitor')) return <HeartPulse className="w-12 h-12" />;
  return <Activity className="w-12 h-12" />;
};

const ConnectDeviceScreen = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();
  const { getDeviceById, connectDevice } = useAppContext();
  const [device, setDevice] = useState<Device | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);

  useEffect(() => {
    if (deviceId) {
      const foundDevice = getDeviceById(deviceId);
      if (foundDevice) {
        setDevice(foundDevice);
      } else {
        navigate('/devices'); 
      }
    }
  }, [deviceId, getDeviceById, navigate]);

  const handleAddDevice = () => {
    if (device) {
      setIsConnecting(true);
      setConnectionProgress(0);
      const interval = setInterval(() => {
        setConnectionProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            connectDevice(device.id);
            setIsConnecting(false);
            navigate('/devices');
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  if (!device) {
    return (
      <div className="flex flex-col h-full bg-slate-950">
        <Header title="Connecting Device" showBackButton backPath="/devices" />
        <div className="flex-grow flex items-center justify-center p-4 text-slate-400">Device not found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header title="Connecting Device" showBackButton backPath="/devices" />
      <main className="flex-1 flex flex-col items-center justify-between p-6 text-center pb-12 overflow-y-auto">
        <div className="w-full flex flex-col items-center mt-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sky-500/10 border border-sky-500/20 px-4 py-3 rounded-2xl inline-flex items-center text-sky-400 text-sm font-medium mb-12 shadow-lg shadow-sky-500/5"
          >
            <Bluetooth className="w-5 h-5 mr-2" />
            Turn on Bluetooth to connect
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
            className="mb-8 flex flex-col items-center relative"
          >
            {isConnecting && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute inset-0 -m-8 border-2 border-dashed border-emerald-500/30 rounded-full"
              />
            )}
            
            <div className="relative">
              {device.imageUrl ? (
                   <img src={device.imageUrl} alt={device.name} className="h-32 w-32 object-contain mb-6 rounded-2xl shadow-2xl shadow-black/50" />
              ) : (
                  <div className={`p-8 rounded-full mb-6 shadow-2xl shadow-black/50 transition-colors duration-500 ${isConnecting ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}>
                      {getDeviceIcon(device.name)}
                  </div>
              )}
              {isConnecting && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-2 rounded-full shadow-lg"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                </motion.div>
              )}
            </div>
           
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">{device.name}</h2>
            <p className="text-base text-slate-400 max-w-xs mx-auto leading-relaxed">
              {device.description || `Follow the instructions on your ${device.name} to complete the connection.`}
            </p>
          </motion.div>

          {isConnecting && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xs mx-auto mt-4"
            >
              <div className="flex justify-between text-xs font-medium text-slate-400 mb-2 px-1">
                <span>Connecting...</span>
                <span className="text-emerald-400">{connectionProgress}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-800 overflow-hidden">
                <motion.div
                  className="bg-emerald-500 h-full rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${connectionProgress}%` }}
                  transition={{ ease: "linear" }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite] -skew-x-12 translate-x-[-100%]" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-auto pt-8"
        >
            <button
                onClick={handleAddDevice}
                disabled={isConnecting}
                title={isConnecting ? "Please wait while the device is pairing" : undefined}
                className={`w-full font-bold py-4 px-4 rounded-2xl shadow-xl transition-all duration-300 active:scale-[0.98] ${
                  isConnecting 
                    ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed' 
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                }`}
            >
                {isConnecting ? 'Pairing Device...' : 'Connect Device'}
            </button>
            <button className="mt-6 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors">
                Need help connecting?
            </button>
        </motion.div>
      </main>
      </div>
    </div>
  );
};

export default ConnectDeviceScreen;