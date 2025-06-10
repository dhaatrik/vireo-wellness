import React from 'react';

export interface IconProps {
  className?: string;
}

export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


export const ChevronUpIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.855-.142-1.205.108l-.737.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.019.94-1.11l.894-.149c.424-.07.764-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.149-.894z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const WifiIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038C8.583 14.85 8.898 14.7 9.228 14.586A10.485 10.485 0 0112 14.25c.75 0 1.482.096 2.182.28a10.468 10.468 0 012.912 1.026M12 19.5c1.51 0 2.932-.328 4.205-.922m-8.41 0A12.985 12.985 0 0112 19.5m-5.25-2.25C5.024 16.338 3.75 14.711 3.75 13.017c0-2.34.912-4.492 2.4-6.075M20.25 10.75c1.488 1.583 2.4 3.735 2.4 6.075 0 1.694-.75 3.321-2.25 4.462M4.538 10.038A14.462 14.462 0 0112 8.25c2.056 0 4.012.432 5.738 1.238" />
  </svg>
);

export const BatteryIcon: React.FC<IconProps & { level?: number }> = ({ className = "w-5 h-5", level = 100 }) => {
  const chargeLevel = Math.min(100, Math.max(0, level));
  const segments = Math.round(chargeLevel / 25); 
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 9v6h13.5V9H3.75z" />
      {segments >= 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5v3h1.5v-3H6z" />}
      {segments >= 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5v3h1.5v-3H8.25z" />}
      {segments >= 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5v3h1.5v-3H10.5z" />}
      {segments >= 4 && <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 10.5v3h1.5v-3H12.75z" />}
    </svg>
  );
};

const DARK_LEAF_GREEN = "#3A6E32"; 
const LIGHT_LEAF_GREEN = "#7EBC38";

export const VireoVLeafLogoIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    {/* Dark green part - left stroke of V */}
    <path
      d="M16 45 Q5 25 2 5 L7 5 Q10 25 16 32 Z"
      fill={DARK_LEAF_GREEN}
    />
    {/* Light green part - right stroke of V */}
    <path
      d="M16 45 Q27 25 30 5 L25 5 Q22 25 16 32 Z"
      fill={LIGHT_LEAF_GREEN}
    />
  </svg>
);


export const DropletIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-3.45c1.206 0 2.166-.926 2.166-2.077 0-1.478-1.728-3.473-1.973-3.802a.75.75 0 00-1.386 0c-.245.329-1.973 2.324-1.973 3.802C7.834 11.623 8.794 12.55 10 12.55z" clipRule="evenodd" />
  </svg>
);

export const PillIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M6.25 5.242a3.242 3.242 0 116.484 0 3.242 3.242 0 01-6.484 0zM2.5 11.025A3.25 3.25 0 005.75 14.25h8.5A3.25 3.25 0 0017.5 11.025V9.352A3.251 3.251 0 0014.25 6.1H5.75A3.251 3.251 0 002.5 9.352v1.673z" />
  </svg>
);

export const FireIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M9.293 2.293a1 1 0 011.414 0l5 5A1 1 0 0115 9h-2.012C12.923 11.87 12.092 14.65 10 17.027 7.908 14.65 7.077 11.87 7.012 9H5a1 1 0 01-.707-1.707l5-5z" />
    <path d="M6.013 9C6.077 11.87 6.908 14.65 9 17.027V19a1 1 0 102 0v-1.973c2.092-2.377 2.923-5.157 2.988-8.027H15A3 3 0 009.293.293L5 4.586V9h1.013z" />
  </svg>
);

export const ShoeIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M5.25 3.75A2.25 2.25 0 003 6v8.25A2.25 2.25 0 005.25 16.5h2.002c.118 0 .236-.012.351-.036a2.25 2.25 0 002.199-2.214V10.75a.75.75 0 00-1.5 0v3.45a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V6a.75.75 0 01.75-.75h1.5a.75.75 0 000-1.5H5.25z" />
    <path d="M16.25 8.5A2.25 2.25 0 0014 10.75v2.514a2.25 2.25 0 01-2.199 2.214c-.115.024-.233.036-.351.036H9.252a.75.75 0 000 1.5h2.25c.966 0 1.808-.518 2.25-1.321A3.735 3.735 0 0014 17.25a.75.75 0 00.75-.75V6.75a.75.75 0 00-1.5 0V8.5zM14 5.25a.75.75 0 000 1.5h1.25A2.25 2.25 0 0017.5 4.5V3a.75.75 0 00-1.5 0v.75a.75.75 0 01-.75.75H14z" />
  </svg>
);

export const CubeIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 0A.75.75 0 013.25 4.5h13.5A.75.75 0 0117.5 5.25v9.5A.75.75 0 0116.75 15.5H3.25A.75.75 0 012.5 14.75v-9.5z" clipRule="evenodd" />
    <path d="M3.25 6.6A.75.75 0 014 5.85h4.5a.75.75 0 01.75.75v2.4A.75.75 0 018.5 9H4a.75.75 0 01-.75-.75V6.6zM11.5 5.85A.75.75 0 0112.25 5.1h4.5a.75.75 0 01.75.75v4.35A.75.75 0 0116.75 11h-4.5a.75.75 0 01-.75-.75V5.85zM3.25 11.1A.75.75 0 014 10.35H9a.75.75 0 01.75.75v2.4a.75.75 0 01-.75.75H4a.75.75 0 01-.75-.75v-2.4z" />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096V1.845A2.25 2.25 0 0018.75.075H5.25A2.25 2.25 0 003 2.325v11.158c0 .54.384 1.006.917 1.096A48.32 48.32 0 0112 15c2.755 0 5.455-.232 8.083-.678.533-.09.917-.556.917-1.096V14.82A2.25 2.25 0 0018.75 12.55H5.25A2.25 2.25 0 003 14.821V4.425c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
);

const DevicePlaceholderIcon: React.FC<IconProps & { color?: string }> = ({ className, color = "text-slate-400" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className} ${color}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21M9 17.25v-4.5M9 17.25H5.25M15 17.25v1.007a3 3 0 00.879 2.122L16.5 21m-1.5-3.75v-4.5m1.5 3.75h3.75M9 .75H5.25A2.25 2.25 0 003 3v13.5A2.25 2.25 0 005.25 18.75h13.5A2.25 2.25 0 0021 16.5V3A2.25 2.25 0 0018.75.75H15M9 .75h6M9 3.75h6M9 6.75h6m-7.5 3H15m-6.75 3H15m-6.75 3H15" />
  </svg>
);

// Using cyan-400 for a consistent "Calming Aqua" for all device type icons
export const ContourNextIcon: React.FC<IconProps> = ({ className }) => <DevicePlaceholderIcon className={className} color="text-cyan-400" />;
export const DexcomIcon: React.FC<IconProps> = ({ className }) => <DevicePlaceholderIcon className={className} color="text-cyan-400" />;
export const AppleHealthIcon: React.FC<IconProps> = ({ className }) => <DevicePlaceholderIcon className={className} color="text-cyan-400" />;
export const GlucoseBuddyIcon: React.FC<IconProps> = ({ className }) => <DevicePlaceholderIcon className={className} color="text-cyan-400" />;


export const BluetoothIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.916l3.307-3.307a.75.75 0 011.06 0l3.307 3.307m-4.367 8.168l4.367-4.367m0 0L10.057 7.916m4.367 4.367V3.375m0 17.25v-4.875M10.057 16.084L6.75 12.777" />
    </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const ClipboardListIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM10.5 16.5h3.75" />
  </svg>
);

export const DeviceTabletIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75A2.25 2.25 0 0015.75 1.5h-2.25m-3 0V3m3 0V3m0 0h.008v.007H12V3zm2.25 0h.008v.007H14.25V3h1.5V1.5M12 6.75h.008v.008H12V6.75zm0 3h.008v.008H12V9.75zm0 3h.008v.008H12v-.008zm0 3h.008v.008H12v-.008z" />
  </svg>
);