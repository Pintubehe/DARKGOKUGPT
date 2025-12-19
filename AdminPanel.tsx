import React, { useState, useEffect } from 'react';
import { X, Copy, Trash2, Key, Database } from 'lucide-react';
import { LicenseKey } from '../types';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [keys, setKeys] = useState<LicenseKey[]>([]);

  useEffect(() => {
    const storedKeys = localStorage.getItem('king_gpt_admin_keys');
    if (storedKeys) setKeys(JSON.parse(storedKeys));
  }, []);

  const generateKey = (durationHours: number, label: string) => {
    const newKeyString = `KING-${Math.random().toString(36).substr(2, 5).toUpperCase()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const expiresAt = durationHours === -1 ? 'LIFETIME' : Date.now() + (durationHours * 60 * 60 * 1000);
    const newKey: LicenseKey = {
        key: newKeyString,
        durationLabel: label,
        expiresAt: expiresAt,
        isUsed: false,
        generatedAt: Date.now()
    };
    const updatedKeys = [newKey, ...keys];
    setKeys(updatedKeys);
    localStorage.setItem('king_gpt_admin_keys', JSON.stringify(updatedKeys));
  };

  const deleteKey = (keyStr: string) => {
      const updatedKeys = keys.filter(k => k.key !== keyStr);
      setKeys(updatedKeys);
      localStorage.setItem('king_gpt_admin_keys', JSON.stringify(updatedKeys));
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black font-mono text-gray-300 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-900 flex justify-between items-center bg-[#050505]">
            <h2 className="text-wrom-red font-bold text-lg tracking-widest flex items-center gap-2"><Key size={20}/> KEY GENERATOR</h2>
            <button onClick={onClose}><X className="text-gray-500 hover:text-white"/></button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
            {/* Generator Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <button onClick={() => generateKey(1, '1 HOUR')} className="p-4 border border-gray-800 bg-[#0a0a0a] hover:border-wrom-red hover:text-white transition-all text-sm font-bold">
                    + 1 HOUR
                </button>
                <button onClick={() => generateKey(24, '24 HOURS')} className="p-4 border border-gray-800 bg-[#0a0a0a] hover:border-wrom-red hover:text-white transition-all text-sm font-bold">
                    + 1 DAY
                </button>
                <button onClick={() => generateKey(24 * 30, '30 DAYS')} className="p-4 border border-gray-800 bg-[#0a0a0a] hover:border-wrom-red hover:text-white transition-all text-sm font-bold">
                    + 1 MONTH
                </button>
                <button onClick={() => generateKey(-1, 'LIFETIME')} className="p-4 border border-yellow-900 bg-[#0a0a0a] text-yellow-500 hover:bg-yellow-900/20 transition-all text-sm font-bold">
                    + GOD MODE
                </button>
            </div>

            {/* Keys List */}
            <div className="border border-gray-800 rounded-sm">
                <div className="p-3 bg-gray-900 border-b border-gray-800 text-xs font-bold text-gray-400">ACTIVE LICENSES ({keys.length})</div>
                <div className="divide-y divide-gray-800 max-h-[400px] overflow-y-auto">
                    {keys.map(k => (
                        <div key={k.key} className="p-4 flex items-center justify-between hover:bg-[#111]">
                            <div>
                                <div className="text-wrom-red font-bold tracking-widest mb-1">{k.key}</div>
                                <div className="text-[10px] text-gray-500">{k.durationLabel} • EXP: {k.expiresAt === 'LIFETIME' ? 'NEVER' : new Date(k.expiresAt).toLocaleString()}</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => navigator.clipboard.writeText(k.key)} className="text-gray-500 hover:text-white"><Copy size={16}/></button>
                                <button onClick={() => deleteKey(k.key)} className="text-gray-500 hover:text-red-500"><Trash2 size={16}/></button>
                            </div>
                        </div>
                    ))}
                    {keys.length === 0 && <div className="p-4 text-center text-xs text-gray-600">No active keys. Generate one above.</div>}
                </div>
            </div>
        </div>
    </div>
  );
};
