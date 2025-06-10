
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAppContext } from '../contexts/AppContext';
import { Device } from '../types';
import { BluetoothIcon } from '../components/Icons';
import { getDeviceIcon } from '../constants';


const ConnectDeviceScreen: React.FC = () => {
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
      <div className="flex flex-col h-full">
        <Header title="Connecting Device" showBackButton backPath="/devices" />
        <div className="flex-grow flex items-center justify-center p-4 text-slate-400 bg-slate-800 transition-colors duration-300">Device not found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-800 transition-colors duration-300">
      <Header title="Connecting Device" showBackButton backPath="/devices" />
      <main className="flex-grow flex flex-col items-center justify-between p-6 text-center">
        <div className="w-full">
          <div className="bg-sky-500/10 p-3 rounded-lg inline-flex items-center text-sky-300 text-sm mb-8"> {/* Was blue */}
            <BluetoothIcon className="w-5 h-5 mr-2 text-sky-400" /> {/* Was blue */}
            Turn on Bluetooth for Connect
          </div>

          <div className="mb-8 flex flex-col items-center">
            {device.imageUrl ? (
                 <img src={device.imageUrl} alt={device.name} className="h-20 object-contain mb-4 rounded" />
            ) : (
                <div className="p-4 bg-slate-600 rounded-full mb-4"> {/* Was zinc-700 */}
                    {getDeviceIcon(device.name)}
                </div>
            )}
           
            <h2 className="text-2xl font-semibold text-slate-100 mb-2">{device.name}</h2>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              {device.description || `Follow the instructions on your ${device.name} to complete the connection.`}
            </p>
          </div>

          {isConnecting && (
            <div className="w-full bg-slate-600 rounded-full h-2.5 mb-6"> {/* Was zinc-700 */}
              <div
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-200 ease-linear" /* Was purple-600 */
                style={{ width: `${connectionProgress}%` }}
              ></div>
            </div>
          )}
        </div>

        <div className="w-full">
            <button
                onClick={handleAddDevice}
                disabled={isConnecting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-4 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50" /* Was purple */
            >
                {isConnecting ? `Connecting... ${connectionProgress}%` : 'Add this Device'}
            </button>
        </div>
      </main>
    </div>
  );
};

export default ConnectDeviceScreen;