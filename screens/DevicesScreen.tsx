
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAppContext } from '../contexts/AppContext';
import { Device } from '../types';
import { ChevronRightIcon, PlusIcon } from '../components/Icons';
import { getDeviceIcon } from '../constants';


interface DeviceListItemProps {
  device: Device;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({ device }) => {
  const navigate = useNavigate();
  
  const handleItemClick = () => {
    if (!device.isConnected) {
      navigate(`/connect-device/${device.id}`);
    } else {
      console.log("Device already connected:", device.name);
    }
  };

  return (
    <button 
        onClick={handleItemClick}
        className="flex items-center justify-between w-full bg-slate-700 p-4 rounded-lg shadow hover:bg-slate-600 transition-colors duration-300"
    >
      <div className="flex items-center">
        <div className="p-2 bg-slate-600 rounded-full mr-4"> {/* Was zinc-700 */}
           {getDeviceIcon(device.name)}
        </div>
        <div>
          <h3 className="text-base font-medium text-slate-100 text-left">{device.name}</h3>
          {device.isConnected && device.chargeLevel && (
            <p className="text-xs text-slate-400">Connected, {device.chargeLevel}%</p>
          )}
           {device.isConnected && !device.chargeLevel && (
            <p className="text-xs text-emerald-400">Connected</p> /* Was green-400 */
          )}
          {!device.isConnected && device.chargeLevel && (
             <div className="flex items-center mt-1">
                <div className="w-16 h-1.5 bg-slate-500 rounded-full overflow-hidden mr-2"> {/* Was zinc-600 */}
                    <div className="h-full bg-emerald-500" style={{ width: `${device.chargeLevel}%` }}></div> {/* Was green-500 */}
                </div>
                <span className="text-xs text-slate-400">{device.chargeLevel}%</span>
            </div>
          )}
        </div>
      </div>
      {!device.isConnected && <ChevronRightIcon className="w-5 h-5 text-slate-500" />}
      {device.isConnected && <span className="text-xs text-emerald-400 font-medium">Active</span>} {/* Was green-400 */}
    </button>
  );
};

const DevicesScreen: React.FC = () => {
  const { devices, connectDevice } = useAppContext();

  const availableToConnect = devices.filter(d => !d.isConnected);
  const connectedDevices = devices.filter(d => d.isConnected);

  return (
    <div className="flex flex-col h-full">
      <Header title="Devices & Apps" showBackButton backPath="/dashboard" />
      <main className="flex-grow overflow-y-auto p-4 space-y-6 bg-slate-800 transition-colors duration-300">
        {connectedDevices.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-slate-400 mb-3 px-1">Connected</h2>
            <div className="space-y-3">
              {connectedDevices.map(device => (
                <DeviceListItem key={device.id} device={device} />
              ))}
            </div>
          </section>
        )}

        {availableToConnect.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-slate-400 mb-3 px-1">Available to connect</h2>
            <div className="space-y-3">
              {availableToConnect.map(device => (
                <DeviceListItem key={device.id} device={device} />
              ))}
            </div>
          </section>
        )}
        
        {devices.length === 0 && (
            <p className="text-center text-slate-400 mt-8">No devices found.</p>
        )}

         <button 
            onClick={() => alert("Add new device functionality not implemented.")}
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
        >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Device or App
        </button>
      </main>
      <BottomNav />
    </div>
  );
};

export default DevicesScreen;