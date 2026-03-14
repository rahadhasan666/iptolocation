import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, X, Key, ExternalLink } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (token: string) => void;
}

export default function PremiumModal({ isOpen, onClose, onUnlock }: PremiumModalProps) {
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = () => {
    if (token === 'darkworld0907') {
      onUnlock(token);
      onClose();
    } else {
      setError('Invalid token. Access denied.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0a141e] border border-[#ff0055]/50 rounded-2xl shadow-[0_0_40px_rgba(255,0,85,0.2)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#ff0055]/20 bg-[#ff0055]/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ff0055]/20 rounded-lg text-[#ff0055]">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wider">RESTRICTED AREA</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-[#ff0055] mb-2 neon-text-accent">
                  Premium Subscription Required
                </h4>
                <p className="text-gray-400 text-sm">
                  Advanced geolocation features are locked. Please verify your subscription to proceed.
                </p>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Contact for Access</p>
                  <a
                    href="https://facebook.com/ar.ariya098"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00ffcc] hover:text-white transition-colors font-mono flex items-center gap-2"
                  >
                    facebook.com/ar.ariya098
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {!showTokenInput ? (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setShowTokenInput(true)}
                    className="w-full py-4 bg-[#ff0055]/10 border border-[#ff0055]/50 text-[#ff0055] font-bold tracking-widest rounded-lg hover:bg-[#ff0055]/20 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all flex items-center justify-center gap-3"
                  >
                    <Key size={20} />
                    I HAVE SUBSCRIPTION
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-4 bg-transparent border border-white/10 text-gray-400 font-bold tracking-widest rounded-lg hover:bg-white/5 hover:text-white transition-all"
                  >
                    CLOSE
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#ff0055]">
                      <Key size={20} />
                    </div>
                    <input
                      type="password"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Enter Access Token"
                      className="w-full bg-black/60 border border-[#ff0055]/30 text-white px-4 py-4 pl-12 rounded-lg focus:outline-none focus:border-[#ff0055] font-mono text-center tracking-widest placeholder-gray-600"
                      autoFocus
                    />
                  </div>
                  
                  {error && (
                    <p className="text-[#ff0055] text-sm text-center font-mono animate-pulse">
                      {error}
                    </p>
                  )}

                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => setShowTokenInput(false)}
                      className="flex-1 py-4 bg-transparent border border-white/10 text-gray-400 font-bold tracking-widest rounded-lg hover:bg-white/5 hover:text-white transition-all"
                    >
                      BACK
                    </button>
                    <button
                      onClick={handleUnlock}
                      className="flex-1 py-4 bg-[#ff0055]/20 border border-[#ff0055]/50 text-[#ff0055] font-bold tracking-widest rounded-lg hover:bg-[#ff0055]/30 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all"
                    >
                      VERIFY
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
