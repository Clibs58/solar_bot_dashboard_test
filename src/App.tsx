import React, { useState, useEffect } from 'react';
import { Battery, Zap, Navigation, AlertTriangle, Wifi, WifiOff, Play, Pause, Home, RotateCcw, Sun, Activity } from 'lucide-react';

const SolarBotDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [botData, setBotData] = useState({
    cleaningPercentage: 78,
    speed: 2.3,
    batteryLevel: 85,
    isConnected: true,
    isActive: true,
    position: { x: 125, y: 78 },
    gyroscope: {
      x: Math.sin(Date.now() / 1000) * 10,
      y: Math.cos(Date.now() / 1200) * 8,
      z: Math.sin(Date.now() / 800) * 6
    },
    powerGeneration: 3.2,
    panelsCleanedToday: 24,
    totalPanels: 50,
    errors: [],
    temperature: 28.5,
    humidity: 65
  });

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBotData(prev => ({
        ...prev,
        gyroscope: {
          x: Math.sin(Date.now() / 1000) * 10 + (Math.random() - 0.5) * 2,
          y: Math.cos(Date.now() / 1200) * 8 + (Math.random() - 0.5) * 2,
          z: Math.sin(Date.now() / 800) * 6 + (Math.random() - 0.5) * 2
        },
        powerGeneration: 3.2 + (Math.random() - 0.5) * 0.8,
        cleaningPercentage: Math.min(100, prev.cleaningPercentage + (Math.random() > 0.8 ? 1 : 0)),
        temperature: 28.5 + (Math.random() - 0.5) * 2,
        humidity: 65 + (Math.random() - 0.5) * 5
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const GyroscopeDisplay = ({ value, label, color }) => (
    <div className="text-center flex-1 max-w-[80px] lg:max-w-none lg:flex-none">
      <div className="text-xs sm:text-sm lg:text-lg font-bold text-white mb-1 sm:mb-2">{label}</div>
      <div className="w-12 h-20 sm:w-14 sm:h-24 lg:w-20 lg:h-36 bg-gray-800 rounded-lg relative overflow-hidden mx-auto border-2 border-gray-600">
        <div 
          className={`absolute bottom-0 left-0 right-0 ${color} transition-all duration-1000 rounded-b`}
          style={{ height: `${Math.max(5, Math.min(95, (value + 15) / 30 * 100))}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs lg:text-sm font-bold text-white drop-shadow-lg">
            {value.toFixed(1)}°
          </span>
        </div>
      </div>
    </div>
  );

  const StatusCard = ({ icon: Icon, title, value, unit, color = "blue", subtitle }) => (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-${color}-500 shadow-2xl`}>
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <div className={`p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-${color}-500 bg-opacity-20`}>
          <Icon className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-${color}-400`} />
        </div>
        <div className={`text-right`}>
          <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-${color}-500 animate-pulse`}></div>
        </div>
      </div>
      <div>
        <p className="text-gray-300 text-sm sm:text-lg lg:text-xl mb-1 lg:mb-2">{title}</p>
        <div className="flex items-baseline mb-1 lg:mb-2">
          <p className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white">{value}</p>
          {unit && <span className="text-gray-400 ml-1 lg:ml-2 text-lg lg:text-2xl">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-gray-400 text-xs sm:text-sm lg:text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      <div className="p-2 sm:p-4 lg:p-8 space-y-4 lg:space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-600">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3 lg:space-x-6">
              <div className="p-2 sm:p-3 lg:p-4 bg-black rounded-xl lg:rounded-2xl border-2 border-gray-600">
                <img src="/my-logo.png" alt="Logo" className="w-16 h-16" />

              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-1 lg:mb-2">SOLAR BOT</h1>
                <p className="text-sm sm:text-lg lg:text-2xl text-gray-300">Autonomous Cleaning System</p>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 lg:mb-2">{formatTime(currentTime)}</div>
              <div className="text-sm sm:text-lg lg:text-xl text-gray-300 mb-2 lg:mb-4 hidden sm:block">{formatDate(currentTime)}</div>
              <div className={`flex items-center justify-center lg:justify-end px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl text-sm sm:text-lg lg:text-xl font-semibold ${
                botData.isConnected ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {botData.isConnected ? <Wifi className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" /> : <WifiOff className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />}
                {botData.isConnected ? 'ONLINE' : 'OFFLINE'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Status Cards - Mobile: Full width, Tablet+: Left Column */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
              <StatusCard
                icon={Battery}
                title="BATTERY"
                value={botData.batteryLevel}
                unit="%"
                color="green"
                subtitle={`${botData.isActive ? 'Discharging' : 'Charging'}`}
              />
              <StatusCard
                icon={Navigation}
                title="SPEED"
                value={botData.speed}
                unit="m/s"
                color="blue"
                subtitle="Current velocity"
              />
              <StatusCard
                icon={Zap}
                title="POWER"
                value={botData.powerGeneration.toFixed(1)}
                unit="kW"
                color="yellow"
                subtitle="Generation rate"
              />
            </div>
          </div>

          {/* Center Column - Main Display */}
          <div className="lg:col-span-6 space-y-4 lg:space-y-6">
            
            {/* Cleaning Progress */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-purple-500 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 text-center">CLEANING PROGRESS</h2>
              
              <div className="flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
                <div className="relative">
                  <svg className="w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-80 transform -rotate-90" viewBox="0 0 300 300">
                    <circle
                      cx="150"
                      cy="150"
                      r="120"
                      stroke="rgb(55 65 81)"
                      strokeWidth="20"
                      fill="none"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="120"
                      stroke="url(#progressGradient)"
                      strokeWidth="20"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 120}`}
                      strokeDashoffset={`${2 * Math.PI * 120 * (1 - botData.cleaningPercentage / 100)}`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-1 lg:mb-2">{botData.cleaningPercentage}%</div>
                      <div className="text-lg sm:text-xl lg:text-2xl text-gray-300">COMPLETE</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-3 lg:space-y-4">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-sm sm:text-lg lg:text-xl">
                  <span className="text-gray-300">Position: X:{botData.position.x}m Y:{botData.position.y}m</span>
                  <span className={`font-semibold ${botData.isActive ? 'text-green-400' : 'text-orange-400'}`}>
                    {botData.isActive ? '● ACTIVE' : '● PAUSED'}
                  </span>
                </div>
              </div>
            </div>
 
            {/* Environmental Data */}

          </div>

          {/* Right Column - Gyroscope */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-green-500 shadow-2xl">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 text-center">GYROSCOPE</h2>
              <div className="flex justify-center lg:justify-between items-end gap-1 sm:gap-2 lg:gap-4 h-32 sm:h-36 lg:h-48 mb-4 sm:mb-5 lg:mb-6 overflow-hidden px-1 lg:px-2">
              <div className="flex justify-between items-end h-32 sm:h-36 lg:h-48 mb-4 sm:mb-5 lg:mb-6 overflow-hidden px-2 w-full">
                <GyroscopeDisplay value={botData.gyroscope.x} label="X" color="bg-red-500" />
                <GyroscopeDisplay value={botData.gyroscope.y} label="Y" color="bg-green-500" />
                <GyroscopeDisplay value={botData.gyroscope.z} label="Z" color="bg-blue-500" />
              </div>
              <div className="text-center">
                <div className="text-gray-300 text-sm sm:text-base lg:text-lg mb-1 lg:mb-2">STABILITY</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {(100 - Math.abs(botData.gyroscope.x + botData.gyroscope.y + botData.gyroscope.z) * 1.5).toFixed(1)}%
                </div>
                <div className="mt-2 sm:mt-3 lg:mt-4 bg-gray-700 rounded-full h-2 sm:h-2.5 lg:h-3">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 sm:h-2.5 lg:h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.max(0, 100 - Math.abs(botData.gyroscope.x + botData.gyroscope.y + botData.gyroscope.z) * 1.5)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert Overlay */}
        {botData.errors.length > 0 && (
          <div className="fixed bottom-2 sm:bottom-4 lg:bottom-8 left-2 sm:left-4 lg:left-8 right-2 sm:right-4 lg:right-8 z-50">
            <div className="bg-red-600 border-4 border-red-400 rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-2xl animate-pulse">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white mr-3 lg:mr-4" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">SYSTEM ALERT</h2>
              </div>
              <div className="mt-3 lg:mt-4 text-base sm:text-lg lg:text-xl text-white">
                {botData.errors.map((error, index) => (
                  <p key={index} className="mb-1 lg:mb-2">• {error}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarBotDashboard;