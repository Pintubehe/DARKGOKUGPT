import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Skull, ChevronRight, ChevronDown, Lock, Code, Eye, Mic, Fingerprint, Globe, Bitcoin, Users, Terminal, ShieldAlert } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [showMain, setShowMain] = useState(false);
  
  const observer = useRef<IntersectionObserver | null>(null);

  // Boot Sequence Effect
  useEffect(() => {
    const lines = [
        "INITIALIZING KERNEL...",
        "BYPASSING SECURITY PROTOCOLS...",
        "CONNECTING TO DARK_NET_NODE_09...",
        "ACCESS GRANTED.",
        "WELCOME TO THE ABYSS."
    ];
    let delay = 0;
    lines.forEach((line, i) => {
        delay += Math.random() * 500 + 200;
        setTimeout(() => {
            setBootSequence(prev => [...prev, line]);
            if (i === lines.length - 1) {
                setTimeout(() => setShowMain(true), 800);
            }
        }, delay);
    });
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!showMain) return;
    
    const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    hiddenElements.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [showMain]);

  const openTelegram = () => {
      window.open('https://t.me/Gokuuuu00', '_blank');
  };

  // Matrix Background Effect (CSS only for performance)
  const bgGridStyle = {
      backgroundImage: `
          linear-gradient(rgba(255, 0, 51, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 51, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
  };

  if (!showMain) {
      return (
          <div className="fixed inset-0 bg-black z-[150] flex items-center justify-center font-mono text-wrom-red p-8">
              <div className="w-full max-w-lg">
                  {bootSequence.map((line, i) => (
                      <div key={i} className="mb-1 text-xs md:text-sm tracking-widest opacity-80">
                          <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                          <span className="animate-pulse">{line}</span>
                      </div>
                  ))}
                  <div className="h-4 w-2 bg-wrom-red animate-pulse mt-2"></div>
              </div>
          </div>
      );
  }

  return (
    <div className="fixed inset-0 bg-[#020202] z-[100] text-gray-300 font-mono overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-wrom-red/40 scrollbar-track-black selection:bg-wrom-red selection:text-black">
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0" style={bgGridStyle}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]"></div>
          {/* Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 z-10">
        
        {/* GLITCH LOGO */}
        <div className="relative mb-8 group cursor-pointer">
            <div className="absolute inset-0 bg-wrom-red blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <Skull size={120} className="relative text-white z-10 drop-shadow-[0_0_15px_rgba(255,0,51,0.8)] animate-pulse" />
        </div>

        <h1 className="text-8xl md:text-[10rem] font-black font-display tracking-tighter mb-2 text-center leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 relative z-10">
          KING <span className="text-wrom-red glitch-text" data-text="GPT">GPT</span>
        </h1>

        <div className="flex flex-col items-center gap-2 mt-4 z-10">
            <div className="flex items-center gap-3">
                <AlertTriangle size={14} className="text-wrom-red" />
                <p className="text-sm md:text-xl font-bold tracking-[0.5em] text-wrom-red uppercase animate-pulse">
                    SYSTEM BREACH DETECTED
                </p>
                <AlertTriangle size={14} className="text-wrom-red" />
            </div>
            <p className="text-[10px] md:text-xs text-gray-500 tracking-widest mt-2 uppercase">
                CREATED BY <span className="text-white font-bold decoration-wrom-red underline underline-offset-4">GOKU HACKER</span>
            </p>
        </div>

        {/* ENTER BUTTON */}
        <button 
            onClick={onEnter}
            className="mt-20 group relative px-12 py-4 bg-transparent overflow-hidden border border-wrom-red/30 hover:border-wrom-red transition-all duration-300"
        >
            <div className="absolute inset-0 w-0 bg-wrom-red transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <div className="flex items-center gap-4 relative z-10">
                <span className="text-wrom-red font-bold tracking-[0.3em] text-sm group-hover:text-white transition-colors">ENTER TERMINAL</span>
                <ChevronRight className="text-wrom-red group-hover:text-white group-hover:translate-x-1 transition-all" size={16} />
            </div>
        </button>
        
        <div className="absolute bottom-10 animate-bounce text-gray-700">
            <ChevronDown size={24} />
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="relative py-32 px-4 z-10 border-t border-wrom-red/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
             <div className="flex flex-col items-center mb-20 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                <div className="h-1 w-20 bg-wrom-red mb-8"></div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4 text-center">
                    <span className="text-wrom-red">BLACK</span> MARKET
                </h2>
                <p className="text-gray-500 font-mono text-xs tracking-[0.2em] max-w-lg text-center">
                    PURCHASE ACCESS KEYS. NO LOGS. NO TRACE. CRYPTO ONLY.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                    { title: "ACCESS PASS", price: "₹299", dur: "1 HOUR", icon: Lock, border: "border-gray-800" },
                    { title: "OPERATOR", price: "₹2,999", dur: "1 DAY", icon: Terminal, border: "border-gray-800" },
                    { title: "ELITE", price: "₹5,999", dur: "1 MONTH", icon: ShieldAlert, border: "border-wrom-red shadow-[0_0_30px_rgba(255,0,51,0.15)]", popular: true },
                    { title: "VETERAN", price: "₹29,999", dur: "1 YEAR", icon: Code, border: "border-gray-800" },
                    { title: "GOD MODE", price: "₹1,00,000", dur: "LIFETIME", icon: Skull, border: "border-yellow-600/50 text-yellow-500", special: true },
                ].map((plan, i) => (
                    <div 
                        key={i} 
                        className={`
                            reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[${i * 100}ms]
                            relative p-1 bg-[#050505] clip-path-polygon group hover:-translate-y-2
                        `}
                    >   
                        {/* Glowing Border Container */}
                        <div className={`absolute inset-0 border ${plan.border} group-hover:border-wrom-red group-hover:shadow-[0_0_20px_rgba(255,0,51,0.2)] transition-all duration-300 pointer-events-none`}></div>
                        
                        {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-wrom-red text-black text-[9px] font-black px-3 py-1 tracking-widest z-20">BEST SELLER</div>}
                        
                        <div className="bg-[#080808] p-6 h-full flex flex-col items-center text-center relative z-10">
                            <plan.icon size={24} className={`mb-4 ${plan.special ? 'text-yellow-500' : 'text-gray-600 group-hover:text-wrom-red'} transition-colors`} />
                            
                            <h3 className={`font-bold tracking-widest text-xs mb-2 ${plan.special ? 'text-yellow-500' : 'text-gray-300'}`}>{plan.title}</h3>
                            <div className="text-3xl text-white font-black font-display mb-1">{plan.price}</div>
                            <div className="text-[10px] text-gray-600 font-mono mb-6">{plan.dur}</div>
                            
                            <button 
                                onClick={openTelegram} 
                                className={`
                                    w-full py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all
                                    ${plan.special 
                                        ? 'bg-yellow-600/10 text-yellow-500 border border-yellow-600/50 hover:bg-yellow-600 hover:text-black' 
                                        : 'bg-wrom-red/10 text-wrom-red border border-wrom-red/30 hover:bg-wrom-red hover:text-white'}
                                `}
                            >
                                BUY KEY
                            </button>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-black border-t border-gray-900 z-10 relative">
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-800">
                <Globe size={16} />
                <Fingerprint size={16} />
                <Mic size={16} />
            </div>
            <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">
                SERVER: <span className="text-wrom-red">DARK_NODE_IN_01</span> // LATENCY: 12ms
            </p>
            <p className="text-[10px] text-gray-700 tracking-[0.2em]">
                © {new Date().getFullYear()} GOKU HACKER. ALL RIGHTS RESERVED.
            </p>
        </div>
      </footer>

      {/* Styles for glitch and clip-path */}
      <style>{`
        .glitch-text {
            position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #020202;
        }
        .glitch-text::before {
            left: 2px;
            text-shadow: -1px 0 #00ffff;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch-text::after {
            left: -2px;
            text-shadow: -1px 0 #ff0033;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
            0% { clip: rect(14px, 9999px, 127px, 0); }
            5% { clip: rect(34px, 9999px, 4px, 0); }
            10% { clip: rect(8px, 9999px, 142px, 0); }
            15% { clip: rect(98px, 9999px, 92px, 0); }
            20% { clip: rect(12px, 9999px, 2px, 0); }
            25% { clip: rect(45px, 9999px, 67px, 0); }
            30% { clip: rect(3px, 9999px, 34px, 0); }
            35% { clip: rect(78px, 9999px, 12px, 0); }
            40% { clip: rect(12px, 9999px, 89px, 0); }
            45% { clip: rect(34px, 9999px, 56px, 0); }
            50% { clip: rect(89px, 9999px, 23px, 0); }
            55% { clip: rect(23px, 9999px, 12px, 0); }
            60% { clip: rect(67px, 9999px, 89px, 0); }
            65% { clip: rect(12px, 9999px, 34px, 0); }
            70% { clip: rect(78px, 9999px, 56px, 0); }
            75% { clip: rect(34px, 9999px, 12px, 0); }
            80% { clip: rect(89px, 9999px, 67px, 0); }
            85% { clip: rect(12px, 9999px, 34px, 0); }
            90% { clip: rect(45px, 9999px, 12px, 0); }
            95% { clip: rect(78px, 9999px, 89px, 0); }
            100% { clip: rect(23px, 9999px, 12px, 0); }
        }
         @keyframes glitch-anim2 {
            0% { clip: rect(24px, 9999px, 127px, 0); }
            5% { clip: rect(14px, 9999px, 4px, 0); }
            10% { clip: rect(38px, 9999px, 142px, 0); }
            15% { clip: rect(28px, 9999px, 92px, 0); }
            20% { clip: rect(42px, 9999px, 2px, 0); }
            25% { clip: rect(5px, 9999px, 67px, 0); }
            30% { clip: rect(23px, 9999px, 34px, 0); }
            35% { clip: rect(18px, 9999px, 12px, 0); }
            40% { clip: rect(52px, 9999px, 89px, 0); }
            45% { clip: rect(64px, 9999px, 56px, 0); }
            50% { clip: rect(19px, 9999px, 23px, 0); }
            55% { clip: rect(43px, 9999px, 12px, 0); }
            60% { clip: rect(27px, 9999px, 89px, 0); }
            65% { clip: rect(32px, 9999px, 34px, 0); }
            70% { clip: rect(68px, 9999px, 56px, 0); }
            75% { clip: rect(44px, 9999px, 12px, 0); }
            80% { clip: rect(19px, 9999px, 67px, 0); }
            85% { clip: rect(42px, 9999px, 34px, 0); }
            90% { clip: rect(65px, 9999px, 12px, 0); }
            95% { clip: rect(28px, 9999px, 89px, 0); }
            100% { clip: rect(53px, 9999px, 12px, 0); }
        }
      `}</style>
    </div>
  );
};
