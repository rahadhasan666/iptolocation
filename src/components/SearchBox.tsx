import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (ip: string) => void;
  isLoading: boolean;
}

export default function SearchBox({ onSearch, isLoading }: SearchBoxProps) {
  const [ip, setIp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ip.trim()) {
      onSearch(ip.trim());
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto mt-12"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ffcc] to-[#008066] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-[#0a141e] rounded-xl border border-[#00ffcc]/30 overflow-hidden">
          <div className="pl-4 text-[#00ffcc]">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP Address (e.g., 8.8.8.8)"
            className="w-full bg-transparent border-none text-white px-4 py-4 focus:outline-none focus:ring-0 font-mono text-lg placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !ip.trim()}
            className="bg-[#00ffcc]/10 hover:bg-[#00ffcc]/20 text-[#00ffcc] px-6 py-4 font-bold tracking-wider transition-colors border-l border-[#00ffcc]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'ANALYZE'}
          </button>
        </div>
      </div>
    </motion.form>
  );
}
