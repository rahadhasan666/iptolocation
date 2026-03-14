import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Terminal } from 'lucide-react';
import ParticlesBackground from './components/ParticlesBackground';
import SearchBox from './components/SearchBox';
import ResultCard from './components/ResultCard';
import PremiumModal from './components/PremiumModal';

interface IpData {
  ip: string;
  country: string;
  region: string;
  city: string;
  isp: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Initial loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (ip: string) => {
    setIsSearching(true);
    setError('');
    setIpData(null);

    try {
      // Using ipinfo.io with the provided API key
      const response = await fetch(`https://ipinfo.io/${ip}/json?token=f281045f79262f`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch IP data. Please ensure the IP address is valid.');
      }
      
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'Failed to fetch IP data');
      }

      let lat, lng;
      if (data.loc) {
        const parts = data.loc.split(',');
        lat = parseFloat(parts[0]);
        lng = parseFloat(parts[1]);
      }

      setIpData({
        ip: data.ip,
        country: data.country || 'Unknown',
        region: data.region || 'Unknown',
        city: data.city || 'Unknown',
        isp: data.org || 'Unknown',
        timezone: data.timezone || 'Unknown',
        latitude: lat,
        longitude: lng,
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleUnlock = (token: string) => {
    if (token === 'darkworld0907') {
      setIsUnlocked(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center"
        >
          <ShieldAlert size={64} className="text-[#00ffcc] mb-6 animate-pulse neon-glow rounded-full p-2" />
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-[0.2em] mb-4 neon-text">
            DARK WORLD
          </h1>
          <div className="flex items-center gap-3 text-[#00ffcc] font-mono text-lg">
            <Terminal size={20} />
            <span className="typing-animation">Initializing System...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Backgrounds */}
      <div className="animated-gradient"></div>
      <div className="cyber-grid"></div>
      <ParticlesBackground />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 shadow-[0_0_15px_rgba(0,255,204,0.2)]">
            <ShieldAlert size={24} className="text-[#00ffcc] mr-2" />
            <span className="text-[#00ffcc] font-mono text-sm font-bold tracking-widest uppercase px-2">
              Secure Connection Established
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 neon-text">
            DARK WORLD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#008066]">
              IP INTELLIGENCE
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto">
            Advanced IP Intelligence & Network Analysis Tool
          </p>
        </motion.div>

        <SearchBox onSearch={handleSearch} isLoading={isSearching} />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-[#ff0055]/10 border border-[#ff0055]/30 text-[#ff0055] rounded-lg font-mono text-center max-w-2xl w-full"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {ipData && (
            <ResultCard
              key="result-card"
              data={ipData}
              isUnlocked={isUnlocked}
              onUnlockClick={() => setIsModalOpen(true)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 mt-auto border-t border-[#00ffcc]/20 bg-black/40 backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc] to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
            &copy; {new Date().getFullYear()} DARK WORLD Intelligence System
          </p>
        </div>
      </footer>

      {/* Modals */}
      <PremiumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUnlock={handleUnlock}
      />
    </div>
  );
}

