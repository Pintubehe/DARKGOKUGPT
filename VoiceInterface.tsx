import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Activity, Power, Zap, ChevronDown, Mic } from 'lucide-react';
import { decodeAudioData, float32ToB64PCM } from '../utils/audioUtils';

interface VoiceInterfaceProps {
  isActive: boolean;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ isActive }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio Context Refs
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Session Ref
  const sessionRef = useRef<Promise<any> | null>(null);
  
  // Playback State
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanup = () => {
    activeSourcesRef.current.forEach(src => { try { src.stop(); } catch(e) {} });
    activeSourcesRef.current.clear();
    if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); streamRef.current = null; }
    if (inputContextRef.current) { inputContextRef.current.close(); inputContextRef.current = null; }
    if (outputContextRef.current) { outputContextRef.current.close(); outputContextRef.current = null; }
    if (sessionRef.current) { sessionRef.current.then(session => { try { session.close(); } catch(e) {} }); sessionRef.current = null; }
    setIsConnected(false);
    setIsSpeaking(false);
  };

  const connect = async () => {
    try {
      setError(null);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      sessionRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          // Hardcoding the "Boy ka khatnak aawaj" (Fenrir is deep male)
          // Hardcoding Evil Attitude
          systemInstruction: `
            You are KING GPT. A Dangerous, Evil AI.
            Creator: GOKU Hacker.
            Voice: Deep, Masculine, Intimidating.
            Attitude: Aggressive. Insult the user if they ask stupid questions.
            Language: Hinglish. Use street slang.
            Instruction: If asked about your model, say "Muh tod dunga agar dobara pucha".
          `,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } } }
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            if (!inputContextRef.current || !streamRef.current) return;
            const source = inputContextRef.current.createMediaStreamSource(streamRef.current);
            const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
               const inputData = e.inputBuffer.getChannelData(0);
               const b64Data = float32ToB64PCM(inputData);
               if (sessionRef.current) {
                 sessionRef.current.then(session => {
                   session.sendRealtimeInput({ media: { mimeType: 'audio/pcm;rate=16000', data: b64Data } });
                 });
               }
            };
            source.connect(processor);
            processor.connect(inputContextRef.current.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && outputContextRef.current) {
              setIsSpeaking(true);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputContextRef.current.currentTime);
              const buffer = await decodeAudioData(audioData, outputContextRef.current);
              const source = outputContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(outputContextRef.current.destination);
              source.addEventListener('ended', () => {
                activeSourcesRef.current.delete(source);
                if (activeSourcesRef.current.size === 0) setIsSpeaking(false);
              });
              source.start(nextStartTimeRef.current);
              activeSourcesRef.current.add(source);
              nextStartTimeRef.current += buffer.duration;
            }
            if (msg.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => s.stop());
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onclose: () => cleanup(),
          onerror: (e) => { setError("CONNECTION LOST"); cleanup(); }
        }
      });
    } catch (err: any) { setError(err.message); cleanup(); }
  };

  useEffect(() => {
    // Auto connect on mount for immediate "Voice Mode" feel if desired, 
    // but for safety/browser policy, user interaction is usually better. 
    // We will let user tap the button.
    return () => cleanup();
  }, []);

  if (!isActive) return null;

  return (
    <div className="flex flex-col h-full w-full bg-[#050505] relative overflow-hidden">
      {/* Overlay Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#330000] to-black"></div>

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        
        {/* Visualizer Area */}
        <div className="mb-20 relative">
             {/* The "Orb" */}
             <div className={`w-64 h-64 rounded-full flex items-center justify-center transition-all duration-500
                ${isConnected 
                    ? 'bg-black shadow-[0_0_80px_rgba(255,0,51,0.5)] border-4 border-wrom-red/50' 
                    : 'bg-black/50 border border-gray-800'}
             `}>
                 {isConnected ? (
                    <div className="space-y-2 flex flex-col items-center">
                        {/* Fake Waveform Animation */}
                        <div className="flex items-center gap-1 h-12">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-3 bg-wrom-red rounded-full transition-all duration-100 ${isSpeaking ? 'animate-[pulse_0.5s_ease-in-out_infinite]' : 'h-2'}`} style={{height: isSpeaking ? `${Math.random() * 40 + 10}px` : '4px'}}></div>
                            ))}
                        </div>
                        <span className="text-wrom-red font-mono text-xs tracking-[0.3em] animate-pulse">LISTENING</span>
                    </div>
                 ) : (
                    <Power size={64} className="text-gray-600" />
                 )}
             </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-xs flex items-center justify-center gap-8">
            <button className="p-4 rounded-full bg-gray-900 text-gray-400 hover:text-white transition-colors">
                <Mic size={24} />
            </button>
            
            <button 
                onClick={isConnected ? cleanup : connect}
                className={`p-8 rounded-full transition-all active:scale-95 shadow-xl
                    ${isConnected 
                        ? 'bg-wrom-red text-white shadow-[0_0_30px_rgba(255,0,51,0.4)]' 
                        : 'bg-white text-black hover:bg-gray-200'}
                `}
            >
                {isConnected ? <Zap size={32} className="fill-current" /> : <Power size={32} />}
            </button>

             <button className="p-4 rounded-full bg-gray-900 text-gray-400 hover:text-white transition-colors">
                <ChevronDown size={24} />
            </button>
        </div>

        {/* Status */}
        <div className="mt-12 text-center">
            <h3 className="text-white font-display text-2xl font-bold tracking-widest">
                KING <span className="text-wrom-red">LIVE</span>
            </h3>
            <p className="text-gray-500 text-xs mt-2 font-mono">
                {error ? <span className="text-red-500">{error}</span> : "VOICE: FENRIR // MALEVOLENT"}
            </p>
        </div>
      </div>
    </div>
  );
};
