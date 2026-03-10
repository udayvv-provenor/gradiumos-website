
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, X, ArrowRight, ChevronRight, Layout, BarChart3, 
  Terminal as TerminalIcon, ShieldCheck, User, Building2, School,
  Github, Twitter, Linkedin, ExternalLink, Command,
  Activity, Target, Cpu, Layers, Zap, Globe, Lock, CheckCircle2,
  Fingerprint, Database, Sparkles, Search, TrendingUp, Send, Loader2,
  TrendingDown, Briefcase, ZapOff, AlertCircle, Info, Palette, Camera, Play,
  UserCheck, BrainCircuit, Workflow, RefreshCw, Users, Settings, Handshake,
  LineChart, Shield, ChevronLeft, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { COMPETENCE_LEVELS, SIMULATIONS, READINESS_SIGNALS } from './constants';

// --- Theme & Inline Styles Constants ---

const THEME = {
  emerald: '#10b981',
  neonEmerald: '#00ff9f',
  emeraldDark: '#059669',
  blue: '#3b82f6',
  blueDark: '#2563eb',
  purple: '#8b5cf6',
  gold: '#fbbf24',
  emeraldGlow: 'rgba(16, 185, 129, 0.4)',
  black: '#020202', 
  cardBg: '#121215', 
  zinc950: '#0a0a0c',
  zinc900: '#16161a', 
  zinc800: '#26262c',
  zinc700: '#3f3f46',
  zinc600: '#52525b',
  gray400: '#a1a1aa',
  gray500: '#71717a',
  gray600: '#52525b',
  glass: 'rgba(20, 20, 24, 0.88)', 
  glassBorder: 'rgba(255, 255, 255, 0.16)', 
  componentOutline: 'rgba(255, 255, 255, 0.12)',
  activeOutline: '#10b981',
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  glass: {
    background: THEME.glass,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1.5px solid ${THEME.glassBorder}`, 
    boxShadow: '0 20px 50px -15px rgba(0,0,0,0.6)',
  },
  heading1: {
    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
    fontWeight: 900,
    letterSpacing: '-0.03em',
    lineHeight: 0.9,
    margin: 0,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.85rem',
    borderRadius: '9999px',
    backgroundColor: 'rgba(16, 185, 129, 0.12)', 
    border: `1.5px solid rgba(16, 185, 129, 0.35)`,
    color: THEME.neonEmerald, 
    fontSize: '10px',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.22em',
  }
};

const LivelyButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  style = {},
  className
}: { 
  children?: React.ReactNode, 
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void> | any, 
  variant?: 'primary' | 'outline' | 'ghost',
  style?: React.CSSProperties,
  className?: string
}) => {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    fontWeight: 900,
    padding: '0.8rem 1.6rem',
    borderRadius: '0.65rem',
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    ...style
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: THEME.emerald,
    color: THEME.black,
    boxShadow: `0 6px 20px ${THEME.emerald}44`,
    border: `1.5px solid ${THEME.emerald}`,
  };

  const outlineStyle: React.CSSProperties = {
    ...baseStyle,
    ...styles.glass,
    border: `1.5px solid ${THEME.emerald}88`, 
    color: THEME.emerald,
    boxShadow: `0 0 12px rgba(16, 185, 129, 0.1)`,
  };

  const ghostStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    color: THEME.gray400,
    padding: '0.6rem 1.25rem',
    borderRadius: '9999px',
    fontSize: '10px',
    border: '1.5px solid transparent',
  };

  const currentStyle = isPrimary ? primaryStyle : isOutline ? outlineStyle : ghostStyle;

  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileHover={{ 
        scale: 1.04, 
        boxShadow: isPrimary 
          ? `0 0 35px ${THEME.emerald}77` 
          : isOutline 
            ? `0 0 25px ${THEME.emerald}44` 
            : `0 0 10px rgba(255,255,255,0.1)`,
        borderColor: isOutline ? THEME.emerald : isPrimary ? THEME.emerald : 'rgba(255,255,255,0.4)',
        filter: 'brightness(1.1)',
        letterSpacing: '0.1em'
      }}
      whileTap={{ scale: 0.97 }}
      style={currentStyle}
    >
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${isPrimary ? 'rgba(255,255,255,0.4)' : 'rgba(16,185,129,0.3)'}, transparent)`,
          skewX: '-25deg',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 'inherit', lineHeight: 1 }}>
        {children}
      </span>
    </motion.button>
  );
};

const GradiumLogo = ({ height = 32 }: { height?: number }) => {
  const width = (height * 760) / 220;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 760 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <text
        x="0"
        y="170"
        fontFamily="Inter"
        fontSize="100"
        fontWeight="750"
        fill="#ffffff"
      >
        <tspan letterSpacing="-3">Gradium</tspan>
        <tspan
          fontWeight="900"
          fill="#10B981"
          letterSpacing="-2"
          dx="3"
        >OS</tspan>
      </text>

      <text
        x="545" 
        y="64"
        fontFamily="Inter"
        fontSize="65"
        fontWeight="900"
        fill="#10B981"
        dominantBaseline="text-before-edge"
      >
        ∞
      </text>
    </svg>
  );
};

// --- Hero Readiness Visual Component ---

const ReadinessVisual = () => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime = performance.now();
    const cycleDuration = 10000;
    const resetDelay = 2000;

    const animate = (currentTime: number) => {
      let elapsed = currentTime - startTime;
      
      if (elapsed > cycleDuration + resetDelay) {
        startTime = performance.now();
        elapsed = 0;
      }

      const rawProgress = Math.min(110, (elapsed / cycleDuration) * 110);
      setProgress(rawProgress);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);

  const factors = useMemo(() => ({
    technical: Math.min(100, (progress / 110) * 115),
    experience: Math.min(100, (progress / 110) * 110),
    behaviour: Math.min(100, (progress / 110) * 105)
  }), [progress]);

  const timeline = useMemo(() => {
    const getWidth = (start: number, end: number) => {
      if (progress < start) return 0;
      if (progress > end) return 100;
      return ((progress - start) / (end - start)) * 100;
    };
    return {
      self: getWidth(0, 15),
      institute: getWidth(15, 50),
      gradium: getWidth(50, 95),
      fit: getWidth(95, 110)
    };
  }, [progress]);

  const isTargetReached = progress >= 95;

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '594px', 
      height: 'auto',   
      margin: '0 auto', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      <motion.div
        animate={{ 
          boxShadow: isTargetReached 
            ? [`0 25px 70px rgba(0,0,0,0.7), 0 0 20px ${THEME.emerald}22`, `0 25px 70px rgba(0,0,0,0.7), 0 0 50px ${THEME.emerald}44`, `0 25px 70px rgba(0,0,0,0.7), 0 0 20px ${THEME.emerald}22`]
            : '0 25px 70px rgba(0,0,0,0.7)'
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          ...styles.glass,
          width: '100%',
          maxWidth: '528px', 
          padding: '2rem',
          borderRadius: '2rem',
          zIndex: 10,
          background: THEME.zinc900, 
          border: `2px solid ${isTargetReached ? THEME.emerald : THEME.zinc700}`, 
          transition: progress === 0 ? 'none' : 'border 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ ...styles.flexBetween, marginBottom: '1.5rem' }} className="visual-card-header">
          <div className="visual-card-identity">
            <div style={{ ...styles.badge, marginBottom: '0.4rem', fontSize: '8px', padding: '0.3rem 0.6rem' }}>
              <UserCheck size={9} /> LIVE SYSTEM TRACKER
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '0.01em', margin: 0 }}>AI Systems Architect</h3>
          </div>
          <div style={{ textAlign: 'right' }} className="visual-card-score">
            <div style={{ fontSize: '8px', fontWeight: 800, color: THEME.gray500, letterSpacing: '0.1em' }}>READINESS SCORE</div>
            <div 
              style={{ fontSize: '32px', fontWeight: 900, color: isTargetReached ? THEME.neonEmerald : '#fff', fontFamily: 'JetBrains Mono', transition: progress === 0 ? 'none' : 'color 0.5s', lineHeight: 1 }}
              className="readiness-score-value"
            >
              {Math.min(100, progress).toFixed(1)}%
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Technical', icon: <BrainCircuit size={11} />, val: factors.technical, color: THEME.blue },
            { label: 'Experience', icon: <Briefcase size={11} />, val: factors.experience, color: THEME.purple },
            { label: 'Behaviour', icon: <Workflow size={11} />, val: factors.behaviour, color: THEME.gold }
          ].map((f, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.4rem' }}>
                <span style={{ color: f.color }}>{f.icon}</span>
                <span style={{ fontSize: '8px', fontWeight: 900, color: THEME.gray400, textTransform: 'uppercase' }}>{f.label}</span>
              </div>
              <div style={{ height: '6px', background: THEME.zinc800, border: `1px solid ${THEME.zinc700}`, borderRadius: '3px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    background: f.color, 
                    width: `${Math.min(100, f.val)}%`,
                    transition: 'none',
                    boxShadow: `0 0 10px ${f.color}44`
                  }}
                />
              </div>
              <div style={{ marginTop: '0.25rem', fontSize: '9px', fontWeight: 800, fontFamily: 'JetBrains Mono', color: '#fff' }}>{Math.floor(f.val)}%</div>
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <div style={{ ...styles.flexBetween, marginBottom: '0.6rem' }}>
            <div style={{ fontSize: '8px', fontWeight: 900, color: THEME.gray500, letterSpacing: '0.1em' }}>OPTIMIZATION TIMELINE</div>
            <AnimatePresence>
              {isTargetReached && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  style={{ 
                    color: THEME.gold, 
                    fontWeight: 900, 
                    fontSize: '8px', 
                    letterSpacing: '0.1em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                   <CheckCircle2 size={9} /> RIGHT FIT
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div style={{ height: '36px', display: 'flex', gap: '2px', position: 'relative', background: THEME.zinc800, padding: '3px', borderRadius: '8px', border: `1px solid ${THEME.zinc800}` }}>
            <div style={{ flex: '0 0 15%', background: THEME.zinc700, borderRadius: '5px 0 0 5px', position: 'relative', ...styles.flexCenter, overflow: 'hidden' }}>
              <span style={{ fontSize: '10px', color: '#fff', fontWeight: 800, position: 'relative', zIndex: 2 }}>SELF</span>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.2)', width: `${timeline.self}%`, transition: 'none' }} />
            </div>
            <div style={{ flex: '0 0 35%', background: `${THEME.blue}18`, position: 'relative', ...styles.flexCenter, overflow: 'hidden' }}>
              <span style={{ fontSize: '10px', color: '#fff', fontWeight: 800, position: 'relative', zIndex: 2 }}>INSTITUTE</span>
              <div style={{ position: 'absolute', inset: 0, background: THEME.blue, opacity: 0.7, width: `${timeline.institute}%`, transition: 'none' }} />
            </div>
            <div style={{ flex: '0 0 45%', background: `${THEME.emerald}10`, border: `1px solid ${THEME.emerald}55`, position: 'relative', ...styles.flexCenter, overflow: 'hidden' }}>
              <span style={{ fontSize: '10px', color: THEME.emerald, fontWeight: 900, position: 'relative', zIndex: 2 }}>GRADIUM OS</span>
              <div style={{ position: 'absolute', inset: 0, background: THEME.emerald, opacity: 0.75, boxShadow: `inset 0 0 20px ${THEME.emerald}33`, width: `${timeline.gradium}%`, transition: 'none' }} />
            </div>
            <div style={{ flex: '0 0 5%', background: THEME.zinc900, border: `1px dashed ${THEME.gold}`, borderRadius: '0 5px 5px 0', position: 'relative', ...styles.flexCenter, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: THEME.gold, width: `${timeline.fit}%`, transition: 'none' }} />
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '1.25rem', borderTop: `1.5px solid ${THEME.zinc800}`, ...styles.flexBetween }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Cpu size={12} color={THEME.emerald} />
             <span style={{ fontSize: '9px', fontWeight: 900, fontFamily: 'JetBrains Mono', color: THEME.gray400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>MONITORING</span>
             <div style={{ display: 'flex', gap: '4px' }}>
                {[0, 1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    style={{ width: '4px', height: '4px', borderRadius: '50%', background: THEME.emerald }}
                  />
                ))}
             </div>
           </div>

           <AnimatePresence>
             {isTargetReached && (
               <motion.div 
                 initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                 style={{ 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '0.4rem', 
                   color: THEME.black,
                   background: THEME.emerald,
                   padding: '0.4rem 0.8rem',
                   borderRadius: '0.6rem',
                   boxShadow: `0 0 15px ${THEME.emerald}66`,
                   fontWeight: 900
                 }}
               >
                 <CheckCircle2 size={10} />
                 <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.08em' }}>RIGHT FIT</span>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// --- AI Diagnostic Component ---

const DiagnosticTerminal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'system' | 'ai', content: string, image?: string }[]>([
    { role: 'system', content: 'Initializing GradiumOS Diagnostic v3.4...' },
    { role: 'system', content: 'Ready for Readiness Gap Analysis. New Feature: [Brand Lab] enabled. Type "generate logo" to explore AI-envisioned brand variants.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleLogoLab = async () => {
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'system', content: 'Initiating High-Quality Logo Synthesis...' }]);
    
    try {
      if (!(await (window as any).aistudio.hasSelectedApiKey())) {
        setMessages(prev => [...prev, { role: 'system', content: 'Manual Authorization Required. Opening Selection Dialog...' }]);
        await (window as any).aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: 'A premium, ultra-high-definition 3D logo for "GradiumOS". The logo is a swirling spiral shape starting with deep purple at the bottom, transitioning through vibrant cyan-blue in the middle, and ending with a sharp, glowing golden arrow point at the top. The style is sleek, cinematic, glassmorphism, with soft reflections and a dark charcoal background. 4K resolution, professional branding.' }]
        },
        config: {
          imageConfig: { aspectRatio: "1:1", imageSize: "1K" }
        }
      });

      let imageUrl = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        }
      }

      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Brand Variant Generated. Synthesizing visual identity against market benchmarks...',
        image: imageUrl 
      }]);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
         setMessages(prev => [...prev, { role: 'system', content: 'Key Error. Resetting... Please re-select a valid billing-enabled project key.' }]);
         await (window as any).aistudio.openSelectKey();
      } else {
        setMessages(prev => [...prev, { role: 'system', content: 'Error: Brand Synthesis Failed.' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.toLowerCase();
    setInput('');
    
    if (userMsg.includes('generate logo') || userMsg.includes('logo lab')) {
      await handleLogoLab();
      return;
    }

    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze the following professional evidence and provide a Gradium Readiness Report. 
        Categorize into Levels 1-5 (L1 Foundational, L2 Applied, L3 Operational, L4 Collaborative, L5 Strategic).
        Structure as a professional diagnostic report with specific gap areas.
        
        Evidence: ${userMsg}`,
        config: {
          systemInstruction: "You are the GradiumOS Core Diagnostic Engine. Be analytical, precise, and use technical, corporate language. Format output with clear headers and bullet points. Never use underscores in company names, always use GradiumOS.",
        }
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text || "Analysis complete. System stable." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'system', content: "Error: Diagnostic Fail. Retry initiated." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.92)' }}
        >
          <motion.div 
            initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}
            style={{ width: '100%', maxWidth: '780px', height: '580px', background: THEME.zinc950, borderRadius: '1.75rem', border: `2px solid ${THEME.emerald}66`, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 0 100px rgba(0,0,0,0.8)' }}
            className="diagnostic-modal"
          >
            <div style={{ ...styles.flexBetween, padding: '1rem 1.5rem', borderBottom: `2px solid ${THEME.zinc800}`, background: THEME.zinc900 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <GradiumLogo height={50} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <LivelyButton onClick={handleLogoLab} variant="outline" style={{ padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontSize: '10px' }}>
                  <Palette size={13} /> BRAND LAB
                </LivelyButton>
                <button style={{ background: THEME.zinc800, color: '#fff', cursor: 'pointer', border: 'none', padding: '0.6rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}><X size={18} /></button>
              </div>
            </div>

            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1.75rem', fontFamily: 'JetBrains Mono', fontSize: '12px', lineHeight: 1.5, background: THEME.zinc950 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ marginBottom: '1.25rem', color: m.role === 'user' ? THEME.emerald : m.role === 'system' ? THEME.gray500 : '#f1f1f1' }}>
                  <div style={{ fontWeight: 800, marginBottom: '0.4rem', opacity: 0.9, letterSpacing: '0.05em', color: m.role === 'ai' ? THEME.emerald : 'inherit' }}>{m.role === 'ai' ? '[GRADIUM CORE]' : m.role === 'user' ? '[USER EVIDENCE]' : '[SYSTEM LOG]'}</div>
                  <div style={{ whiteSpace: 'pre-wrap', background: m.role === 'user' ? 'rgba(16,185,129,0.06)' : m.role === 'ai' ? 'rgba(255,255,255,0.01)' : 'transparent', padding: m.role !== 'system' ? '1rem' : '0', borderRadius: '0.75rem', border: m.role === 'user' ? `1px solid ${THEME.emerald}33` : m.role === 'ai' ? `1px solid ${THEME.zinc800}` : 'none' }}>{m.content}</div>
                  {m.image && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1.25rem', borderRadius: '1rem', overflow: 'hidden', border: `2px solid ${THEME.zinc800}`, maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                      <img src={m.image} alt="AI Generated Identity" style={{ width: '100%', display: 'block' }} />
                      <div style={{ padding: '0.85rem', background: THEME.zinc900, fontSize: '9px', color: THEME.gray400, display: 'flex', alignItems: 'center', gap: '0.6rem', borderTop: `1px solid ${THEME.zinc800}` }}>
                        <Info size={13} color={THEME.emerald} /> Visual Identity Synthesis • gemini-3-pro-image-preview
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: THEME.emerald, fontWeight: 700, fontSize: '11px' }}>
                  <Loader2 className="animate-spin" size={16} /> Processing Request Data...
                </div>
              )}
            </div>

            <div style={{ padding: '1.25rem 1.75rem', borderTop: `2px solid ${THEME.zinc800}`, background: THEME.zinc900 }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder="Paste Evidence or type 'generate logo'..."
                  style={{ flex: 1, background: THEME.zinc950, border: `1.5px solid ${THEME.zinc700}`, borderRadius: '0.75rem', padding: '0.85rem 1.25rem', color: '#fff', fontFamily: 'JetBrains Mono', fontSize: '12px', outline: 'none', transition: 'all 0.3s', caretColor: THEME.emerald }}
                  onFocus={(e) => { e.target.style.borderColor = THEME.emerald; e.target.style.boxShadow = `0 0 10px ${THEME.emerald}22`; }}
                  onBlur={(e) => { e.target.style.borderColor = THEME.zinc700; e.target.style.boxShadow = 'none'; }}
                />
                <LivelyButton onClick={handleAnalyze} style={{ padding: '0.65rem 1.25rem' }}>
                  <Send size={18} />
                </LivelyButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['architecture', 'standard', 'diagnosis', 'simulations'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = section;
        }
      }
      setActiveSection(current || 'hero');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    padding: isScrolled ? '0.65rem 0' : '1.25rem 0',
    background: isScrolled ? 'rgba(2, 2, 2, 0.94)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(25px)' : 'none',
    borderBottom: isScrolled ? `1px solid ${THEME.zinc800}` : 'none',
    boxShadow: isScrolled ? '0 10px 40px rgba(0,0,0,0.6)' : 'none',
  };

  const NavLink = ({ href, children, mobile = false }: { href: string, children?: React.ReactNode, mobile?: boolean }) => {
    const sectionId = href.replace('#', '');
    const isActive = activeSection === sectionId;
    const handleNavClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    };
    return (
      <a 
        href={href} 
        onClick={handleNavClick}
        style={{ 
          color: isActive ? THEME.emerald : THEME.gray400, 
          transition: 'all 0.3s', 
          position: 'relative',
          padding: mobile ? '1.25rem 0' : '0.4rem 0',
          fontSize: mobile ? '24px' : '10px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          display: 'block',
          cursor: 'pointer'
        }}
      >
        {children}
        {isActive && !mobile && (
          <motion.div layoutId="nav-active" style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: '2.5px', background: THEME.emerald, boxShadow: `0 0 12px ${THEME.emerald}` }} />
        )}
      </a>
    );
  };

  return (
    <>
      <nav style={navStyles}>
        <div style={{ ...styles.container, ...styles.flexBetween }}>
          <a href="#root" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} className="nav-logo-link">
            <GradiumLogo height={95} />
          </a>
          <div style={{ display: 'none', gap: '3rem' }} className="desktop-nav">
            <NavLink href="#architecture">Architecture</NavLink>
            <NavLink href="#standard">Standard</NavLink>
            <NavLink href="#diagnosis">Diagnosis</NavLink>
            <NavLink href="#simulations">Simulations</NavLink>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <LivelyButton 
              onClick={() => window.open('https://provenor-website.vercel.app', '_blank')} 
              variant="primary" 
              style={{ padding: isScrolled ? '0.55rem 1.4rem' : '0.8rem 2.2rem', background: '#fff', color: THEME.black }}
              className="nav-login-btn"
            >
              Log-in
            </LivelyButton>
            <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'transparent', color: '#fff', display: 'none', border: 'none', padding: '0.4rem' }} className="mobile-menu-toggle"><Menu size={28} /></button>
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) { 
            .desktop-nav { display: flex !important; } 
            .mobile-menu-toggle { display: none !important; } 
          }
          @media (max-width: 1023px) { 
            .desktop-nav { display: none !important; } 
            .mobile-menu-toggle { display: block !important; } 
          }
        `}</style>
      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(2,2,2,0.99)', backdropFilter: 'blur(35px)', padding: '2rem', display: 'flex', flexDirection: 'column' }} className="mobile-menu-overlay-wrap">
            <div style={{ ...styles.flexBetween, marginBottom: '4rem' }}>
               <GradiumLogo height={95} />
               <button onClick={() => setMobileMenuOpen(false)} style={{ background: THEME.zinc800, color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '50%' }}><X size={28} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               <NavLink href="#architecture" mobile>Architecture</NavLink>
               <NavLink href="#standard" mobile>Standard</NavLink>
               <NavLink href="#diagnosis" mobile>Diagnosis</NavLink>
               <NavLink href="#simulations" mobile>Simulations</NavLink>
            </div>
            <div style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <LivelyButton onClick={() => window.open('https://provenor-website.vercel.app', '_blank')} variant="primary" style={{ width: '100%', background: '#fff', color: THEME.black, fontSize: '18px', padding: '1.25rem' }}>Log-in</LivelyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ onLaunch }: { onLaunch: () => void }) => (
  <section id="hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '9rem 0 6rem 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }}><div style={{ width: '100%', height: '100%', background: `radial-gradient(circle at 50% 15%, ${THEME.emerald}33 0%, transparent 60%)` }} /></div>
    <div style={styles.container}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
        <div style={{ textAlign: 'left' }} className="hero-text-content">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ ...styles.badge, marginBottom: '2.5rem' }} className="hero-badge"><Sparkles size={14} color={THEME.emerald} /> <span style={{ opacity: 1 }}>TALENT ARCHITECTURE</span></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={styles.heading1} className="hero-title">
            Work Readiness <br />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ color: THEME.emerald, textShadow: `0 0 35px ${THEME.emerald}55`, fontSize: '0.5em', display: 'block', marginTop: '0.75rem', opacity: 1, letterSpacing: '0.1em' }}>Operating System</motion.span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: '1.15rem', color: THEME.gray400, margin: '2.5rem 0', maxWidth: '500px', lineHeight: 1.5, letterSpacing: '0.01em' }}>GradiumOS defines, builds, and verifies workplace readiness. Replace resume speculation with high-fidelity immutable evidence.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }} className="hero-btns">
            <LivelyButton onClick={onLaunch} style={{ padding: '1.2rem 2.5rem', fontSize: '14px' }}>
              <span>PROVE READINESS</span>
              <ArrowRight size={20} />
            </LivelyButton>
            <LivelyButton variant="outline" onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '1.2rem 2.5rem', fontSize: '14px' }}>EXPLORE OS</LivelyButton>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className="hero-visual-wrapper"><ReadinessVisual /></motion.div>
      </div>
    </div>
    <style>{`
      @media (max-width: 1024px) {
        .hero-grid { grid-template-columns: 1fr !important; text-align: left !important; gap: 2.5rem !important; }
        .hero-text-content { text-align: left !important; margin: 0 !important; display: flex !important; flex-direction: column !important; align-items: flex-start !important; }
        .hero-btns { justify-content: flex-start !important; flex-wrap: wrap !important; }
        .hero-visual-wrapper { width: 100% !important; max-width: 520px !important; }
      }
      @media (max-width: 640px) {
        .hero-grid { gap: 2rem !important; }
        .hero-btns { gap: 0.75rem !important; }
        .hero-badge { font-size: 8px !important; padding: 0.3rem 0.7rem !important; }
      }
      @media (max-width: 480px) {
        .hero-visual-wrapper { display: none !important; }
        .hero-btns button, .hero-btns a { width: 100% !important; justify-content: center !important; }
      }
    `}</style>
  </section>
);

const SectionHeader = ({ badge, title }: { badge: string, title: string }) => (
  <div style={{ marginBottom: '2.5rem' }} className="section-header">
    <div style={{ ...styles.badge, marginBottom: '1.25rem' }}><Zap size={14} color={THEME.emerald} /> <span style={{ opacity: 1 }}>{badge}</span></div>
    <h2 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}>{title}</h2>
  </div>
);

const Architecture = () => {
  const steps = [
    { icon: <Target />, title: 'Align', desc: 'Define precise role competence requirements through granular mapping.' },
    { icon: <Cpu />, title: 'Build', desc: 'Journeys inside high-fidelity professional simulations and labs.' },
    { icon: <ShieldCheck />, title: 'Verify', desc: 'Capture multi-dimensional performance data with absolute integrity.' },
    { icon: <Globe />, title: 'Signal', desc: 'Distribute verified readiness signals across the global ecosystem.' }
  ];

  const LoopTextVertical = () => {
    const text = "RE-ALIGNMENT LOOP";
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', alignItems: 'center' }}>
        {text.split('').map((char, i) => (
          <span key={i} style={{ display: 'block', fontSize: '9px', fontWeight: 900, transform: char === ' ' ? 'translateY(4px)' : 'none' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section id="architecture" style={{ padding: '4rem 0', background: THEME.black, scrollMarginTop: '80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ ...styles.container, maxWidth: '1380px' }}>
        <SectionHeader badge="Architecture" title="The Readiness Loop" />
        <div style={{ position: 'relative', paddingBottom: '0.5rem' }} className="architecture-container">
          
          {/* Mobile Loop Path Overlay - Phone View Only */}
          <div className="mobile-loop-overlay">
            <div className="mobile-loop-track">
               {/* Vertical text stacked letters */}
               <div className="mobile-loop-text-container">
                  <LoopTextVertical />
               </div>
               {/* Centered Upward Arrow */}
               <div className="mobile-loop-arrow-center">
                  <ChevronUp size={22} strokeWidth={4} />
               </div>
               {/* Connection lines to cards with smooth blend */}
               <div className="mobile-loop-connector-top" />
               <div className="mobile-loop-connector-bottom" />
            </div>
          </div>

          <div className="architecture-steps-wrapper" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1.25rem', position: 'relative', zIndex: 10, alignItems: 'stretch' }}>
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }} 
                  style={{ 
                    ...styles.glass, 
                    flex: '1 1 0px', 
                    padding: '2rem', 
                    borderRadius: '2rem', 
                    position: 'relative', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    minHeight: '270px', 
                    textAlign: 'left',
                    zIndex: 20,
                    background: THEME.zinc900, 
                    border: `2px solid ${THEME.zinc800}`, 
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                  }}
                  className="arch-step-card"
                >
                  <div style={{ color: THEME.emerald, marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-start' }} className="arch-card-icon">{React.cloneElement(step.icon as React.ReactElement<any>, { size: 44, strokeWidth: 1.5 })}</div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '0.01em', color: '#fff' }}>{step.title}</h4>
                  <p style={{ color: THEME.gray400, fontSize: '0.9rem', lineHeight: 1.45, maxWidth: '280px' }}>{step.desc}</p>
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="architecture-connector" style={{ alignSelf: 'center', opacity: 1, display: 'flex', minWidth: '35px', padding: '0 0.2rem', flex: '0 0 auto' }}>
                    <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="connector-inner">
                      <div style={{ display: 'flex', alignItems: 'center' }} className="connector-flex">
                        <div style={{ width: '35px', height: '3px', background: THEME.emerald, opacity: 0.9, boxShadow: `0 0 12px ${THEME.emerald}44` }} className="connector-line" />
                        <ChevronRight size={32} strokeWidth={4} color={THEME.emerald} style={{ marginLeft: '-16px', filter: `drop-shadow(0 0 10px ${THEME.emerald}66)` }} className="connector-arrow" />
                      </div>
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Re-alignment loop — SVG drawn so arrow tip is pixel-perfect on the path */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="loop-wrapper"
            style={{ position: 'relative', width: '100%', marginTop: '0px', pointerEvents: 'none', overflow: 'visible' }}
          >
            <svg
              className="loop-svg"
              width="100%"
              height="120"
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
              overflow="visible"
              style={{ display: 'block', overflow: 'visible' }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                {/* Arrowhead marker — tip sits exactly at refX */}
                <marker
                  id="arrowLeft"
                  markerWidth="10"
                  markerHeight="10"
                  refX="1"
                  refY="5"
                  orient="auto"
                >
                  <path d="M9,1 L1,5 L9,9" fill="none" stroke={THEME.emerald} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>

              {/* Left vertical leg — fades from transparent at top to solid at bottom */}
              <line
                x1="125" y1="0"
                x2="125" y2="30"
                stroke={`url(#fadeDown)`}
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="fadeDown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={THEME.emerald} stopOpacity="0" />
                  <stop offset="100%" stopColor={THEME.emerald} stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="fadeDownR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={THEME.emerald} stopOpacity="0" />
                  <stop offset="100%" stopColor={THEME.emerald} stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <line x1="125" y1="0" x2="125" y2="30" stroke={THEME.emerald} strokeWidth="3" strokeOpacity="0" />
              <line x1="125" y1="0" x2="125" y2="30"
                stroke={THEME.emerald} strokeWidth="3" strokeOpacity="0.6"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}
              />

              {/* Right vertical leg */}
              <line x1="875" y1="0" x2="875" y2="30" stroke={THEME.emerald} strokeWidth="3" strokeOpacity="0.6" />

              {/* Horizontal bottom arc — single path: down from left, across bottom, up to right */}
              {/* Path: start at (125,30) → curve down to (125,90) → straight to (875,90) → curve up to (875,30) */}
              <path
                d="M125,0 L125,70 Q125,100 155,100 L845,100 Q875,100 875,70 L875,0"
                fill="none"
                stroke={THEME.emerald}
                strokeWidth="3"
                strokeOpacity="0.6"
                strokeLinecap="round"
                filter="url(#glow)"
              />

              {/* Arrow tip — marker on a tiny horizontal line segment at the midpoint bottom of path */}
              {/* The path midpoint bottom is at x=500, y=100. Arrow points LEFT (toward Align) */}
              <line
                x1="510" y1="100"
                x2="490" y2="100"
                stroke={THEME.emerald}
                strokeWidth="3"
                strokeOpacity="0.95"
                markerEnd="url(#arrowLeft)"
                filter="url(#glow)"
              />

              {/* RE-ALIGNMENT LOOP label */}
              <g transform="translate(500, 78)" textAnchor="middle">
                <text
                  fontFamily="Inter, sans-serif"
                  fontSize="10"
                  fontWeight="900"
                  fill={THEME.emerald}
                  letterSpacing="5"
                  textAnchor="middle"
                  style={{ textTransform: 'uppercase' }}
                  filter="url(#glow)"
                >
                  RE-ALIGNMENT LOOP
                </text>
              </g>
            </svg>
          </motion.div>
        </div>
      </div>
      <style>{`
        .mobile-loop-overlay { display: none; }
        @media (max-width: 1024px) {
          .architecture-steps-wrapper { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
          .arch-step-card { width: 88% !important; max-width: none !important; min-height: 180px !important; text-align: left !important; margin-right: auto !important; margin-left: 0 !important; padding: 1.5rem !important; }
          .arch-card-icon { justify-content: flex-start !important; }
          .architecture-connector { transform: rotate(90deg) !important; padding: 0 !important; margin: 0.25rem 0 !important; align-self: flex-start !important; margin-left: 2rem !important; }
          .loop-wrapper { display: none !important; }
          .architecture-container { padding-bottom: 2rem !important; padding-right: 45px !important; position: relative !important; }

          .mobile-loop-overlay { 
            display: block !important;
            position: absolute !important;
            right: -10px !important;
            top: 60px !important; 
            bottom: 60px !important;
            width: 45px !important;
            z-index: 5 !important;
            pointer-events: none !important;
          }
          .mobile-loop-track {
            height: 100% !important;
            width: 100% !important;
            border: 2.5px solid ${THEME.emerald}55 !important;
            border-left: none !important;
            border-radius: 0 45px 45px 0 !important;
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .mobile-loop-text-container {
            color: ${THEME.emerald} !important;
            text-shadow: 0 0 10px ${THEME.emerald} !important;
            background: ${THEME.black} !important;
            padding: 10px 0 !important;
            z-index: 2 !important;
          }
          .mobile-loop-arrow-center {
            position: absolute !important;
            top: 50% !important;
            right: 0 !important;
            transform: translate(50%, -50%) !important;
            color: ${THEME.emerald} !important;
            filter: drop-shadow(0 0 10px ${THEME.emerald}) !important;
            z-index: 10 !important;
          }
        }
        @media (max-width: 480px) {
          .arch-step-card { width: 100% !important; padding: 1.25rem !important; min-height: 160px !important; border-radius: 1.25rem !important; }
          .arch-card-icon svg { width: 32px !important; height: 32px !important; }
          .architecture-container { padding-right: 36px !important; }
          .mobile-loop-track { border-radius: 0 30px 30px 0 !important; }
          .connector-line { width: 24px !important; }
        }
      `}</style>
    </section>
  );
};

const StandardMap = () => (
  <section id="standard" style={{ padding: '5rem 0 6rem 0', scrollMarginTop: '80px', background: THEME.zinc950 }}>
    <div style={styles.container}>
      <SectionHeader badge="The Standard" title="5-Level Proficiency Map" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }} className="standard-map-grid">
        {COMPETENCE_LEVELS.map((level) => (
          <motion.div 
            key={level.id} 
            initial={{ opacity: 0, scale: 0.96 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            style={{ 
              background: THEME.zinc900, 
              padding: '2.25rem 1.75rem', 
              borderRadius: '2rem', 
              border: `2px solid ${THEME.zinc800}`, 
              position: 'relative', 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column', 
              boxShadow: '0 15px 40px rgba(0,0,0,0.5)', 
              transition: 'all 0.4s',
              textAlign: 'left'
            }} 
            whileHover={{ borderColor: THEME.emerald, translateY: -8, boxShadow: `0 25px 50px rgba(0,0,0,0.6), 0 0 15px ${THEME.emerald}18` }}
          >
            <div style={{ minHeight: '30px', marginBottom: '1.25rem' }}><div style={{ color: THEME.emerald, fontWeight: 900, fontSize: '11px', letterSpacing: '0.12em', textShadow: `0 0 10px ${THEME.emerald}44` }}>LEVEL 0{level.level}</div></div>
            <div style={{ minHeight: '60px', marginBottom: '1rem' }}><h5 style={{ fontSize: '1.35rem', fontWeight: 900, lineHeight: 1.2, margin: 0, letterSpacing: '0.01em', color: '#fff' }}>{level.title}</h5></div>
            <div style={{ flex: 1 }}><p style={{ fontSize: '0.9rem', color: THEME.gray400, lineHeight: 1.5, margin: 0 }}>{level.description}</p></div>
            <div style={{ position: 'absolute', bottom: '-1.25rem', right: '-0.75rem', fontSize: '100px', fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>L{level.level}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const DiagnosticsLoop = () => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 5000;
    const pause = 1500;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      if (elapsed < duration) { setProgress((elapsed / duration) * 100); animationRef.current = requestAnimationFrame(step); }
      else if (elapsed < duration + pause) { setProgress(100); animationRef.current = requestAnimationFrame(step); }
      else { startTime = null; setProgress(0); animationRef.current = requestAnimationFrame(step); }
    };
    animationRef.current = requestAnimationFrame(step);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);
  const config = [
    { subject: 'Systems Architecture', Market: 95, initial: 72 },
    { subject: 'Team Leadership', Market: 80, initial: 85 },
    { subject: 'Strategic Resilience', Market: 90, initial: 60, isGap: true },
    { subject: 'Ethical Governance', Market: 100, initial: 95 },
    { subject: 'Data Science', Market: 85, initial: 40, isGap: true },
    { subject: 'Crisis Communication', Market: 75, initial: 90 }
  ];
  const currentData = useMemo(() => config.map(c => ({ subject: c.subject, Market: c.Market, Candidate: c.isGap ? c.initial + (c.Market - c.initial + 10) * (progress / 100) : c.initial + (5 * (progress / 100)) })), [progress]);
  const isCompleted = progress > 90;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem', alignItems: 'center' }} className="diagnostics-loop-grid">
      <div className="diag-text-side">
        <SectionHeader badge="Diagnosis" title="Detecting the Gap" />
        <p style={{ color: THEME.gray400, marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.5, letterSpacing: '0.01em', textAlign: 'left' }}>The Gradium Diagnostic Engine maps individual capabilities against live market baselines. We identify exactly where performance friction exists.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }} className="diag-stats-grid">
          {[ 
            { label: 'Skills', score: Math.floor(84 + (progress / 100 * 12)), color: THEME.emerald }, 
            { label: 'Behaviour', score: Math.floor(91 + (progress / 100 * 3)), color: '#f59e0b' },
            { label: 'Experience', score: Math.floor(62 + (progress / 100 * 13)), color: THEME.blue }
          ].map((m, i) => (
            <div key={i} style={{ ...styles.glass, padding: '1.5rem 1rem', borderRadius: '1.5rem', textAlign: 'left', border: `2px solid ${THEME.zinc800}`, background: THEME.zinc900 }} className="diag-stat-card">
              <div style={{ fontSize: '9px', fontWeight: 900, color: THEME.gray500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{m.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: m.color, textShadow: `0 0 15px ${m.color}33` }}>{m.score}%</div>
            </div>
          ))}
        </div>
        <motion.div animate={{ borderColor: isCompleted ? THEME.emerald : THEME.zinc700, background: isCompleted ? 'rgba(16, 185, 129, 0.08)' : THEME.zinc900 }} transition={{ duration: 0.5 }} style={{ ...styles.glass, padding: '1.75rem', borderRadius: '1.75rem', border: `2px solid ${THEME.zinc700}`, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>{isCompleted ? <CheckCircle2 size={20} color={THEME.emerald} /> : <AlertCircle size={20} color={THEME.emerald} />}<span style={{ fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff' }}>{isCompleted ? 'Intervention Successful' : 'Intervention Opportunity'}</span></div>
          <p style={{ fontSize: '0.95rem', color: THEME.gray400, lineHeight: 1.5 }}>{isCompleted ? 'Gaps bridged. Readiness signal verified for Principal Product Architect role.' : 'Critical performance gap identified in Strategic Resilience and Data Science.'}</p>
        </motion.div>
      </div>
      <div style={{ position: 'relative' }} className="diag-visual-side">
        <div style={{ ...styles.glass, borderRadius: '2.5rem', padding: '2.5rem 2rem 5rem', position: 'relative', overflow: 'hidden', border: `3px solid ${THEME.zinc800}`, background: THEME.zinc900, boxShadow: '0 30px 100px rgba(0,0,0,0.8)' }} className="diag-radar-container">
          <div style={{ position: 'absolute', top: '1.75rem', left: '2rem', zIndex: 10 }} className="diag-radar-label-l"><div style={{ fontSize: '9px', fontWeight: 900, color: THEME.gray500, letterSpacing: '0.12em' }}>TARGET ROLE TRACK</div><div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', letterSpacing: '0.01em', marginTop: '3px' }}>Principal Product Architect</div></div>
          <div style={{ position: 'absolute', top: '1.75rem', right: '2rem', textAlign: 'right', zIndex: 10 }} className="diag-radar-label-r"><div style={{ fontSize: '9px', fontWeight: 900, color: THEME.gray500, letterSpacing: '0.12em' }}>MATCH PRECISION</div><motion.div animate={{ color: isCompleted ? THEME.neonEmerald : '#fff', textShadow: isCompleted ? `0 0 30px ${THEME.emerald}` : 'none' }} transition={{ duration: 0.5 }} style={{ fontSize: '24px', fontWeight: 900, marginTop: '3px' }}>{(82.4 + (progress / 100 * 16.2)).toFixed(1)}%</motion.div></div>
          <div style={{ height: '340px', marginTop: '2.5rem' }} className="diag-radar-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={currentData} outerRadius="70%">
                <PolarGrid stroke={THEME.zinc700} strokeWidth={1} /><PolarAngleAxis dataKey="subject" tick={{ fill: THEME.gray400, fontSize: 8, fontWeight: 800 }} /><PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Market" dataKey="Market" stroke={THEME.blue} fill={THEME.blue} fillOpacity={0.2} strokeDasharray="6 6" isAnimationActive={false} />
                <Radar name="Candidate" dataKey="Candidate" stroke={THEME.emerald} fill={THEME.emerald} fillOpacity={0.45} strokeWidth={4} isAnimationActive={false} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <AnimatePresence>
            {!isCompleted ? (
              <motion.div key="intervene" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: '55%', right: '22%', background: THEME.emerald, color: THEME.black, padding: '0.4rem 0.8rem', borderRadius: '0.6rem', fontSize: '9px', fontWeight: 900, boxShadow: `0 0 20px ${THEME.emerald}88`, zIndex: 20 }} className="diag-radar-badge">INTERVENE</motion.div>
            ) : (
              <motion.div key="complete" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'absolute', top: '55%', right: '22%', background: '#fff', color: THEME.black, padding: '0.4rem 0.8rem', borderRadius: '0.6rem', fontSize: '9px', fontWeight: 900, boxShadow: `0 0 30px #fff`, zIndex: 20 }} className="diag-radar-badge">GAP CLOSED</motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>{isCompleted && (<motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(16, 185, 129, 0.98)', color: THEME.black, padding: '1rem 2rem', borderRadius: '1.25rem', fontWeight: 900, letterSpacing: '0.12em', fontSize: '13px', zIndex: 30, textAlign: 'center', backdropFilter: 'blur(12px)', border: '2px solid #fff', boxShadow: '0 0 50px rgba(16,185,129,0.5)' }} className="diag-completion-overlay">DIAGNOSTIC COMPLETED<br/><span style={{ fontSize: '9px', fontWeight: 800, marginTop: '5px', display: 'block', opacity: 0.9 }}>VERIFIED SIGNAL GENERATED</span></motion.div>)}</AnimatePresence>
        </div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .diag-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .diag-stat-card h3 { font-size: 1.3rem !important; }
        }
        @media (max-width: 1024px) {
          .diagnostics-loop-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .diag-text-side { text-align: left !important; }
          .diag-stats-grid { gap: 0.75rem !important; }
          .diag-stat-card { padding: 1rem 0.5rem !important; text-align: left !important; }
          .diag-radar-container { padding: 1.5rem 1.5rem 6rem !important; border-radius: 1.5rem !important; position: relative !important; }
          .diag-radar-label-l, .diag-radar-label-r { position: relative !important; top: 0 !important; left: 0 !important; right: 0 !important; text-align: left !important; margin-bottom: 1rem !important; }
          .diag-radar-chart-wrapper { height: 280px !important; margin-top: 1rem !important; }
          .diag-completion-overlay { 
            position: absolute !important;
            top: auto !important;
            bottom: 0.5rem !important; 
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 94% !important; 
            padding: 1rem 0.75rem !important; 
            font-size: 10px !important; 
            zIndex: 40 !important;
          }
        }
      `}</style>
    </div>
  );
};

const Diagnostics = () => (<section id="diagnosis" style={{ padding: '4rem 0', background: THEME.black, scrollMarginTop: '80px' }}><div style={styles.container}><DiagnosticsLoop /></div></section>);

// --- Simulations Story Illustration Component ---

const SimulationIllustration = ({ category }: { category: string }) => {
  const getTheme = () => {
    switch (category) {
      case 'Management':
        return {
          main: <Users size={44} />, 
          others: [<Target size={20} />, <LineChart size={18} />, <Users size={18} />, <Activity size={16} />, <Globe size={18} />],
          color: THEME.emerald
        };
      case 'Engineering':
        return {
          main: <Settings size={44} />,
          others: [<Cpu size={20} />, <TerminalIcon size={18} />, <Database size={16} />, <Shield size={18} />, <Zap size={18} />],
          color: THEME.purple
        };
      case 'Sales':
        return {
          main: <TrendingUp size={44} />,
          others: [<Handshake size={20} />, <Zap size={18} />, <Briefcase size={16} />, <Activity size={18} />, <Target size={18} />],
          color: THEME.gold
        };
      default:
        return {
          main: <Activity size={44} />,
          others: [<Cpu size={20} />, <Target size={18} />],
          color: THEME.emerald
        };
    }
  };

  const theme = getTheme();

  return (
    <div style={{ height: '140px', background: THEME.zinc950, position: 'relative', overflow: 'hidden', borderBottom: `2px solid ${THEME.zinc800}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', width: '220px', height: '220px', border: `1px dashed ${theme.color}33`, borderRadius: '50%' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', width: '120px', height: '120px', border: `2px solid ${theme.color}20`, borderRadius: '50%' }}
      />

      <motion.div
        animate={{ 
          scale: [1, 1.1, 1], 
          filter: [`drop-shadow(0 0 10px ${theme.color}44)`, `drop-shadow(0 0 25px ${theme.color}88)`, `drop-shadow(0 0 10px ${theme.color}44)`] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 10, color: theme.color, position: 'relative' }}
      >
        <div style={{ background: THEME.zinc900, padding: '0.85rem', borderRadius: '50%', border: `2px solid ${theme.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 25px ${theme.color}22` }}>
           {theme.main}
        </div>
      </motion.div>

      {theme.others.map((icon, i) => {
        const angle = (i * (360 / theme.others.length)) * (Math.PI / 180);
        const radius = 60; 
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ 
              x: [x, x + (Math.sin(i) * 5), x],
              y: [y, y + (Math.cos(i) * 5), y]
            }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              position: 'absolute', 
              color: i % 2 === 0 ? theme.color : THEME.gray400,
              zIndex: 5
            }}
          >
             <div style={{ background: THEME.zinc900, padding: '0.4rem', borderRadius: '50%', border: `1.5px solid ${i % 2 === 0 ? theme.color : THEME.zinc700}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.6)' }}>
               {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
             </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const Simulations = () => (
  <section id="simulations" style={{ padding: '4rem 0', scrollMarginTop: '80px', background: THEME.black }}>
    <div style={styles.container}>
      <SectionHeader badge="Simulations" title="Applied Learning Labs" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }} className="simulations-grid">
        {SIMULATIONS.map((sim) => (
          <div key={sim.id} style={{ background: THEME.zinc900, borderRadius: '1.75rem', overflow: 'hidden', border: `3px solid ${THEME.zinc800}`, boxShadow: '0 25px 60px rgba(0,0,0,0.6)', transition: 'all 0.4s', textAlign: 'left' }}>
            <SimulationIllustration category={sim.category} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: THEME.emerald, marginBottom: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{sim.category} • {sim.difficulty}</div>
              <h4 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '0.01em', color: '#fff' }}>{sim.title}</h4>
              <div style={{ ...styles.flexBetween, paddingTop: '1rem', borderTop: `1.5px solid ${THEME.zinc800}`, justifyContent: 'flex-start', gap: '1rem' }} className="sim-footer">
                <span style={{ fontSize: '12px', color: THEME.gray500, display: 'flex', alignItems: 'center', gap: '0.4rem', letterSpacing: '0.05em', fontWeight: 700 }}>{sim.duration}</span>
                <LivelyButton variant="ghost" style={{ padding: '0.5rem 1rem', color: THEME.emerald, border: `1.5px solid ${THEME.emerald}33`, background: THEME.zinc950 }}><Play size={12} fill={THEME.emerald} /> EXPLORE LAB</LivelyButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ padding: '5rem 0 3rem 0', borderTop: `3px solid ${THEME.zinc800}`, background: THEME.black }}>
    <div style={styles.container}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '4rem', marginBottom: '4rem' }} className="footer-top-grid">
        <div style={{ gridColumn: 'span 2' }} className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }} className="footer-logo">
            <GradiumLogo height={90} />
          </div>
          <p style={{ color: THEME.gray400, maxWidth: '400px', lineHeight: 1.6, fontSize: '1.1rem', letterSpacing: '0.01em', textAlign: 'left' }} className="footer-desc">An AI-powered employability operating system built for institutional deployment. Diagnostics, interventions, simulations, and evidence — in one integrated layer.</p>
        </div>
        <div className="footer-col" style={{ textAlign: 'left' }}><h6 style={{ fontSize: '11px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '1.75rem', letterSpacing: '0.2em' }}>Platform</h6><ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: THEME.gray500, fontSize: '14px', fontWeight: 600 }}><li><a href="#architecture" style={{color:"inherit",textDecoration:"none"}}>How it works</a></li><li><a href="#simulations" style={{color:"inherit",textDecoration:"none"}}>Simulation Engine</a></li><li><a href="#diagnosis" style={{color:"inherit",textDecoration:"none"}}>Diagnostics</a></li><li><a href="#standard" style={{color:"inherit",textDecoration:"none"}}>Readiness Standard</a></li><li><a href="https://provenor-website.vercel.app" style={{color:"inherit",textDecoration:"none"}}>Provenor Systems ↗</a></li></ul></div>
        <div className="footer-col" style={{ textAlign: 'left' }}><h6 style={{ fontSize: '11px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '1.75rem', letterSpacing: '0.2em' }}>Connect</h6><div style={{ display: 'flex', gap: '1.25rem' }}><a href="https://x.com/provenorsystems" target="_blank" rel="noopener noreferrer" style={{color:"inherit"}}><Twitter size={24} color={THEME.gray400} style={{ cursor: 'pointer' }} /></a><a href="https://github.com/provenorsystems" target="_blank" rel="noopener noreferrer" style={{color:"inherit"}}><Github size={24} color={THEME.gray400} style={{ cursor: 'pointer' }} /></a><a href="https://linkedin.com/company/provenorsystems" target="_blank" rel="noopener noreferrer" style={{color:"inherit"}}><Linkedin size={24} color={THEME.gray400} style={{ cursor: 'pointer' }} /></a></div></div>
      </div>
      <div style={{ ...styles.flexBetween, paddingTop: '2.5rem', borderTop: `1.5px solid ${THEME.zinc900}`, fontSize: '11px', color: THEME.zinc700, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.2em', textAlign: 'left' }} className="footer-bottom">
        <div>
          <div style={{ fontSize: '11px', fontWeight: 400, color: THEME.gray500, marginBottom: '5px' }}><a href="https://provenor-website.vercel.app" style={{color:"inherit",textDecoration:"none"}}>BY <b style={{ fontWeight: 800, color: '#fff' }}>PROVENOR</b> SYSTEMS ↗</a></div>
          <div style={{ opacity: 0.8 }}>&copy; 2026 GRADIUM OS. ALL RIGHTS RESERVED.</div>
        </div>
        <div />
        <span style={{ color: THEME.gray600, fontWeight: 700 }} className="v-stable">v3.4.5-STABLE</span>
      </div>
    </div>
    <style>{`
      @media (max-width: 768px) {
        .footer-top-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .footer-brand { grid-column: span 1 !important; text-align: left !important; display: flex !important; flex-direction: column !important; align-items: flex-start !important; }
        .footer-logo { margin-bottom: 1rem !important; }
        .footer-desc { font-size: 0.95rem !important; text-align: left !important; }
        .footer-col { text-align: left !important; }
        .footer-col div { justify-content: flex-start !important; }
        .footer-bottom { flex-direction: column !important; text-align: left !important; gap: 1rem !important; align-items: flex-start !important; }
      }
      @media (max-width: 480px) {
        .footer-top-grid { gap: 1.5rem !important; }
        .cta-btns { flex-direction: column !important; width: 100% !important; }
        .cta-btns button { width: 100% !important; justify-content: center !important; padding: 1rem 1.5rem !important; }
        .cta-title { font-size: clamp(1.8rem, 7vw, 3rem) !important; }
        .cta-card { padding: 3rem 1.5rem !important; border-radius: 2rem !important; }
        section { padding: 3rem 0 !important; }
      }
    `}</style>
  </footer>
);

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: THEME.black, color: '#fff' }}>
      <Navbar />
      <Hero onLaunch={() => setTerminalOpen(true)} />
      <Architecture />
      <StandardMap />
      <Diagnostics />
      <Simulations />
      <section id="cta" style={{ padding: '6rem 0', scrollMarginTop: '80px', background: THEME.black }}>
        <div style={styles.container}>
          <div style={{ ...styles.glass, borderRadius: '4rem', padding: '6rem 3.5rem', textAlign: 'left', position: 'relative', overflow: 'hidden', border: `3.5px solid ${THEME.zinc800}`, background: THEME.zinc900, boxShadow: '0 40px 120px rgba(0,0,0,0.8)' }} className="cta-card">
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: `radial-gradient(circle, ${THEME.emerald} 0%, transparent 75%)` }} />
            <h2 style={{ fontSize: 'clamp(2.2rem, 6.5vw, 4.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '3rem', letterSpacing: '-0.03em', color: '#fff', textAlign: 'left' }} className="cta-title">
              Ready for work readiness <br /> that is actually proven?
            </h2>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }} className="cta-btns">
              <LivelyButton onClick={() => window.location.href = "mailto:hello@provenorsystems.com?subject=Partnership%20Enquiry%20—%20GradiumOS"} style={{ padding: '1.25rem 2.5rem', fontSize: '14px' }}>Partner With Us</LivelyButton>
              <LivelyButton variant="outline" onClick={() => window.location.href = "mailto:hello@provenorsystems.com?subject=Enquiry%20—%20GradiumOS"} style={{ padding: '1.25rem 2.5rem', fontSize: '14px' }}>TALK TO US</LivelyButton>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <DiagnosticTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <style>{`
        ::selection { background: ${THEME.emerald}; color: ${THEME.black}; }
        ::-webkit-scrollbar-thumb { border: 2px solid ${THEME.black}; }
        .hero-grid { perspective: 1200px; }
        body { background-color: ${THEME.black}; }

        /* --- MOBILE/PHONE ONLY OVERRIDES --- */
        @media (max-width: 768px) {
          .nav-logo-link svg { height: 40px !important; width: auto !important; }
          .nav-login-btn { display: none !important; }
          
          /* Hero Section Refinements - Increased gap significantly for "another 5%" */
          #hero { padding-top: 10rem !important; }
          .hero-badge { margin-top: 1.5rem !important; }
          .hero-title { font-size: 2.5rem !important; text-align: left !important; }
          .hero-visual-wrapper { margin-top: 2rem !important; }
          
          section { padding: 3.5rem 0 !important; }
          .section-header { text-align: left !important; align-items: flex-start !important; }
          .section-header h2 { font-size: 2.2rem !important; text-align: left !important; }
          
          /* Readiness Visual Overrides */
          .visual-card-header { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
          .visual-card-identity { text-align: left !important; }
          .visual-card-score { text-align: left !important; width: 100% !important; border-top: 1px solid ${THEME.zinc800} !important; padding-top: 1rem !important; }
          .readiness-score-value { font-size: 24px !important; } 

          .standard-map-grid { grid-template-columns: 1fr !important; }
          .simulations-grid { grid-template-columns: 1fr !important; }
          .sim-footer { justify-content: flex-start !important; flex-wrap: wrap !important; }
          
          .cta-card { border-radius: 2rem !important; padding: 4rem 1.5rem !important; text-align: left !important; }
          .cta-title { font-size: 2rem !important; text-align: left !important; }
          .cta-btns { gap: 1.25rem !important; justify-content: flex-start !important; }
          .cta-btns button { width: 100% !important; padding: 1.5rem !important; font-size: 16px !important; }

          /* Re-alignment Loop Layer Re-Architecture for Mobile */
          .architecture-container { padding-right: 42px !important; position: relative !important; }
          .arch-step-card { width: 92% !important; margin-right: auto !important; margin-left: 0 !important; min-height: 190px !important; }
          .architecture-connector { transform: rotate(90deg) !important; margin-left: 1.5rem !important; align-self: flex-start !important; }
          
          .mobile-loop-overlay { 
            display: block !important;
            position: absolute !important;
            right: -6px !important;
            top: 45px !important; 
            bottom: 45px !important; 
            width: 45px !important;
            z-index: 5 !important;
            pointer-events: none !important;
          }
          .mobile-loop-track {
            height: 100% !important;
            width: 100% !important;
            border: 2.5px solid ${THEME.emerald}55 !important;
            border-left: none !important;
            border-radius: 0 45px 45px 0 !important;
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .mobile-loop-text-container {
            color: ${THEME.emerald} !important;
            text-shadow: 0 0 10px ${THEME.emerald} !important;
            background: ${THEME.black} !important;
            padding: 12px 0 !important;
            z-index: 5 !important;
          }
          /* Perfectly centered exactly on the vertical path line */
          .mobile-loop-arrow-center {
            position: absolute !important;
            top: 50% !important;
            right: -2.5px !important; 
            transform: translate(50%, -50%) !important;
            color: ${THEME.emerald} !important;
            filter: drop-shadow(0 0 10px ${THEME.emerald}) !important;
            z-index: 10 !important;
          }
          .mobile-loop-connector-top {
            position: absolute !important;
            top: -2.5px !important;
            right: 43px !important;
            width: 55px !important;
            height: 2.5px !important;
            background: linear-gradient(to right, transparent, ${THEME.emerald}55) !important;
          }
          .mobile-loop-connector-bottom {
            position: absolute !important;
            bottom: -2.5px !important;
            right: 43px !important;
            width: 55px !important;
            height: 2.5px !important;
            background: linear-gradient(to right, transparent, ${THEME.emerald}55) !important;
          }

          /* Diagnostic Visual Positioning */
          .diag-radar-container { padding: 1.5rem 1.5rem 6.5rem !important; border-radius: 1.75rem !important; position: relative !important; }
          .diag-completion-overlay { 
            position: absolute !important;
            top: auto !important;
            bottom: 0.5rem !important; 
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 94% !important; 
            padding: 1.25rem 1rem !important; 
            font-size: 10.5px !important; 
            zIndex: 40 !important;
            background: rgba(16, 185, 129, 0.95) !important;
            box-shadow: 0 0 40px rgba(0,0,0,0.8) !important;
          }

          /* Mobile Menu Final Polish - Brought up to avoid edge clipping */
          .mobile-menu-overlay-wrap {
            padding-bottom: 2rem !important;
            justify-content: flex-start !important;
          }
          /* This targets the container wrapping the navigation links to ensure they have enough space */
          .mobile-menu-overlay-wrap > div:nth-child(2) {
             margin-bottom: 2rem !important;
          }
          /* This targets the login button container specifically */
          .mobile-menu-overlay-wrap > div:last-child {
             margin-top: 4rem !important;
             margin-bottom: auto !important;
          }

          .diagnostic-modal { 
            position: fixed !important;
            inset: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            max-height: none !important;
            border-radius: 0 !important;
            border: none !important;
          }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 2.3rem !important; text-align: left !important; }
          .hero-grid p { font-size: 1rem !important; text-align: left !important; }
        }
      `}</style>
    </div>
  );
}
