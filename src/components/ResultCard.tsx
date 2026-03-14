import { motion } from 'motion/react';
import { Globe, MapPin, Server, Clock, ShieldCheck, Lock } from 'lucide-react';

interface ResultCardProps {
  data: {
    ip: string;
    country: string;
    region: string;
    city: string;
    isp: string;
    timezone: string;
    latitude?: number;
    longitude?: number;
  };
  isUnlocked: boolean;
  onUnlockClick: () => void;
}

export default function ResultCard({ data, isUnlocked, onUnlockClick }: ResultCardProps) {
  const handleMapClick = () => {
    if (data.latitude && data.longitude) {
      window.open(`https://www.google.com/maps?q=${data.latitude},${data.longitude}`, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ffcc] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#ff0055] opacity-5 rounded-full blur-3xl"></div>
        
        <div className="flex items-center justify-between mb-8 border-b border-[#00ffcc]/20 pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="text-[#00ffcc]" size={28} />
            <span className="tracking-widest">TARGET ACQUIRED</span>
          </h2>
          <div className="px-3 py-1 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 text-[#00ffcc] text-xs font-mono font-bold animate-pulse">
            LIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoItem icon={<Globe />} label="IP Address" value={data.ip} />
          <InfoItem icon={<MapPin />} label="Country" value={data.country} />
          <InfoItem icon={<MapPin />} label="Region" value={data.region} />
          <InfoItem icon={<MapPin />} label="City" value={data.city} />
          <InfoItem icon={<Server />} label="ISP" value={data.isp} />
          <InfoItem icon={<Clock />} label="Timezone" value={data.timezone} />
          
          {isUnlocked && data.latitude && data.longitude && (
            <>
              <InfoItem icon={<MapPin className="text-[#ff0055]" />} label="Latitude" value={data.latitude.toString()} isPremium />
              <InfoItem icon={<MapPin className="text-[#ff0055]" />} label="Longitude" value={data.longitude.toString()} isPremium />
            </>
          )}
        </div>

        <div className="flex justify-center mt-8 pt-6 border-t border-[#00ffcc]/20">
          {isUnlocked ? (
            <button
              onClick={handleMapClick}
              className="group relative px-8 py-4 bg-[#ff0055]/10 border border-[#ff0055]/50 text-[#ff0055] font-bold tracking-widest rounded-lg overflow-hidden transition-all hover:bg-[#ff0055]/20 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] flex items-center gap-3"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <MapPin size={20} />
              VIEW LOCATION ON MAP
            </button>
          ) : (
            <button
              onClick={onUnlockClick}
              className="group relative px-8 py-4 bg-[#00ffcc]/10 border border-[#00ffcc]/50 text-[#00ffcc] font-bold tracking-widest rounded-lg overflow-hidden transition-all hover:bg-[#00ffcc]/20 hover:shadow-[0_0_20px_rgba(0,255,204,0.4)] flex items-center gap-3"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <Lock size={20} />
              IP TO LOCATION
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function InfoItem({ icon, label, value, isPremium = false }: { icon: React.ReactNode; label: string; value: string; isPremium?: boolean }) {
  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl bg-black/40 border ${isPremium ? 'border-[#ff0055]/30' : 'border-white/5'} hover:bg-black/60 transition-colors`}>
      <div className={`p-2 rounded-lg ${isPremium ? 'bg-[#ff0055]/10 text-[#ff0055]' : 'bg-[#00ffcc]/10 text-[#00ffcc]'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        <p className={`font-mono font-medium ${isPremium ? 'text-[#ff0055]' : 'text-white'}`}>{value || 'N/A'}</p>
      </div>
    </div>
  );
}
