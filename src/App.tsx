/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Search, 
  Smartphone, 
  ShoppingCart, 
  Settings, 
  TrendingUp, 
  Lightbulb, 
  Menu, 
  X, 
  ChevronDown,
  Users,
  ArrowRight,
  BarChart,
  Zap,
  Award,
  Target,
  Layers,
  Cpu,
  Briefcase,
  Heart,
  Home,
  BookOpen,
  Car,
  Scale,
  Sparkles,
  Clock,
  TrendingUp as TrendingIcon,
  Newspaper,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  Eye,
  Calendar,
  User,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- Constants ---
const WHATSAPP_NUMBER = '5541998461858';
const TYPEWRITER_PHRASES = [
  "Transformamos cliques em clientes.",
  "Sua marca no topo do Google.",
  "Sites que vendem enquanto você dorme.",
  "Gestão de redes que gera resultados reais.",
  "Do zero ao digital — nós cuidamos de tudo.",
  "Apps que conectam sua empresa ao futuro.",
  "Marketing que faz sua concorrência tremer.",
  "Presença digital que inspira confiança.",
  "Consultoria para quem quer crescer de verdade.",
  "Indexação que coloca você na frente.",
  "Redes sociais que constroem autoridade.",
  "Sistemas web que automatizam seu negócio.",
  "Design que encanta. Estratégia que converte.",
  "Sua agência digital em Curitiba.",
  "Tráfego pago com retorno garantido.",
  "Criamos sua identidade digital do jeito certo.",
  "Sua loja virtual pronta para vender mais.",
  "Conteúdo que engaja e fideliza.",
  "SEO que leva seu negócio ao próximo nível.",
  "Tecnologia + criatividade = resultados.",
  "Attiva Digital: sua marca sempre ativa.",
  "Da estratégia à execução — somos seu time.",
  "Performance digital que transforma negócios.",
  "Menos achismo. Mais resultado.",
  "Comece agora. Seu concorrente já começou."
];

// --- Components ---

const LoadingScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
  >
    <Logo className="scale-150 mb-8" />
    <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-full bg-gold-primary"
      />
    </div>
    <p className="mt-4 text-gold-primary text-xs uppercase tracking-[0.3em] animate-pulse">Carregando Experiência...</p>
  </motion.div>
);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div 
        animate={{ x: position.x - 4, y: position.y - 4, scale: isHovering ? 2 : 1 }}
        className="fixed top-0 left-0 w-2 h-2 bg-gold-primary rounded-full pointer-events-none z-[10000] hidden md:block"
      />
      <motion.div 
        animate={{ x: position.x - 20, y: position.y - 20, scale: isHovering ? 1.5 : 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
        className="fixed top-0 left-0 w-10 h-10 border border-gold-primary/30 rounded-full pointer-events-none z-[10000] hidden md:block"
      />
    </>
  );
};

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[1001]">
      <div className="h-full bg-gold-primary" style={{ width: `${progress}%` }} />
    </div>
  );
};

const ResultChart = ({ data, label }: { data: number[], label: string }) => {
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: label,
        data: data,
        fill: true,
        backgroundColor: 'rgba(201, 168, 76, 0.1)',
        borderColor: '#C9A84C',
        borderWidth: 3,
        pointBackgroundColor: '#F0C040',
        pointBorderColor: '#0a0a0a',
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#C9A84C',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#666', font: { size: 10 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666', font: { size: 10 } } },
    },
  };

  return (
    <div className="h-64 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

const BlogCard = ({ title, category, date, excerpt, image, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-gold-primary transition-all group"
  >
    <div className="aspect-video relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${image} opacity-40 group-hover:scale-110 transition-transform duration-700`} />
      <div className="absolute top-4 left-4 px-3 py-1 bg-gold-primary text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
        {category}
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-widest mb-3">
        <Calendar size={12} /> {date}
      </div>
      <h4 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-gold-primary transition-colors">{title}</h4>
      <p className="text-ink-silver text-sm opacity-60 line-clamp-2 mb-6">{excerpt}</p>
      <button className="flex items-center gap-2 text-gold-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
        Ler Artigo <ArrowRight size={14} />
      </button>
    </div>
  </motion.div>
);

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-28 right-8 w-12 h-12 bg-zinc-900 border border-gold-primary/30 text-gold-primary rounded-full flex items-center justify-center z-50 hover:bg-gold-primary hover:text-black transition-all"
        >
          <ArrowUpRight size={24} className="-rotate-45" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(!localStorage.getItem('cookies-accepted'));
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-gold-primary/20 p-6 z-[1000] flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div className="text-sm text-ink-silver opacity-80 max-w-3xl text-center md:text-left">
        Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao continuar navegando, você concorda com nossa política de privacidade.
      </div>
      <button 
        onClick={() => {
          localStorage.setItem('cookies-accepted', 'true');
          setIsVisible(false);
        }}
        className="btn-gold px-8 py-2 rounded-full text-xs uppercase tracking-widest font-bold whitespace-nowrap"
      >
        Aceitar Cookies
      </button>
    </motion.div>
  );
};

const HeroTagline = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-3 overflow-hidden">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
          className="font-sans font-light text-lg md:text-2xl tracking-[0.2em] uppercase text-white/60"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const Logo = ({ className = "", onClick }: { className?: string, onClick?: () => void }) => (
  <div className={`flex flex-col items-center justify-center cursor-pointer group ${className}`} onClick={onClick}>
    <svg viewBox="0 0 200 200" className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="50%" stopColor="#F0C040" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      <path d="M100 30 L160 150 L140 150 L100 70 L60 150 L40 150 Z" fill="url(#goldGrad)" />
      <path d="M100 70 L130 130 L70 130 Z" fill="#0a0a0a" />
      <path d="M130 50 L170 50 L170 90 M170 50 L120 100" stroke="url(#goldGrad)" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="150" cy="140" r="6" fill="url(#goldGrad)" />
      <circle cx="170" cy="120" r="6" fill="url(#goldGrad)" />
      <circle cx="130" cy="110" r="6" fill="url(#goldGrad)" />
      <line x1="150" y1="140" x2="170" y2="120" stroke="url(#goldGrad)" strokeWidth="2" />
      <line x1="150" y1="140" x2="130" y2="110" stroke="url(#goldGrad)" strokeWidth="2" />
      <line x1="170" y1="120" x2="130" y2="110" stroke="url(#goldGrad)" strokeWidth="2" />
    </svg>
    <div className="mt-1 text-center">
      <span className="block text-lg md:text-xl font-heading font-black tracking-widest text-white leading-none">ATTIVA</span>
      <span className="block text-xs md:text-sm font-heading font-bold tracking-[0.3em] text-silver-ink leading-none opacity-80">DIGITAL</span>
    </div>
  </div>
);

const Typewriter = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(60);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length + 1 === currentPhrase.length) {
          setSpeed(2000);
          setIsDeleting(true);
        } else {
          setSpeed(60);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        setSpeed(30);
        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
          setSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, speed]);

  return (
    <div className="h-12 md:h-20 flex items-center justify-center">
      <span className="text-gold-light font-heading text-xl md:text-4xl lg:text-5xl font-bold">
        {text}
        <span className="cursor">|</span>
      </span>
    </div>
  );
};

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; opacity: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx!.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = window.innerWidth < 768 ? 30 : 60;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.1 * (1 - distance/120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />;
};

const ServiceCard = ({ icon: Icon, title, description, delay, onClick }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    onClick={onClick}
    className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-gold-primary transition-all duration-500 group cursor-pointer hover:-translate-y-3 flex flex-col h-full"
  >
    <div className="w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-8 h-8 text-gold-primary group-hover:rotate-6 transition-transform" />
    </div>
    <h3 className="text-xl font-heading font-bold text-white mb-4">{title}</h3>
    <p className="text-ink-silver font-sans leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity mb-6 flex-grow">
      {description}
    </p>
    <div className="flex items-center gap-2 text-gold-primary font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
      Saiba Mais <ArrowRight size={16} />
    </div>
  </motion.div>
);

const ServiceModal = ({ service, onClose }: { service: any, onClose: () => void }) => {
  if (!service) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-zinc-900 border border-gold-primary/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative shadow-[0_0_50px_rgba(201,168,76,0.2)]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
              <service.icon className="w-10 h-10 text-gold-primary" />
            </div>
            <h2 className="text-3xl font-display text-white mb-4">{service.title}</h2>
            <p className="text-gold-primary font-bold uppercase tracking-widest text-xs mb-8">Resultados Esperados: {service.results}</p>
            
            <button 
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o serviço: ${service.title}`)}`, '_blank')}
              className="w-full btn-gold py-4 rounded-xl text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Solicitar Orçamento
            </button>
          </div>

          <div className="md:w-2/3 space-y-8">
            <div>
              <h4 className="text-white font-heading font-bold mb-4 uppercase tracking-widest text-sm border-l-2 border-gold-primary pl-4">Visão Geral</h4>
              <p className="text-ink-silver leading-relaxed elderly-friendly-text">{service.fullText}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-heading font-bold mb-4 uppercase tracking-widest text-sm border-l-2 border-gold-primary pl-4">O que inclui</h4>
                <ul className="space-y-2">
                  {service.items.map((item: string, i: number) => (
                    <li key={i} className="text-ink-silver text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gold-primary rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-heading font-bold mb-4 uppercase tracking-widest text-sm border-l-2 border-gold-primary pl-4">Diferenciais</h4>
                <ul className="space-y-2">
                  {service.differentiators.map((item: string, i: number) => (
                    <li key={i} className="text-ink-silver text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gold-primary rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Counter = ({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [hasStarted, end]);

  return (
    <motion.div 
      onViewportEnter={() => setHasStarted(true)}
      className="text-center p-6"
    >
      <div className="text-5xl md:text-6xl font-display text-gold-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-ink-silver opacity-60">{label}</div>
    </motion.div>
  );
};

const PortfolioModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        className="bg-zinc-950 border border-gold-primary/40 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-16 relative shadow-[0_0_100px_rgba(201,168,76,0.15)]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/30 hover:text-gold-primary transition-all hover:rotate-90"
        >
          <X size={40} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/20 text-gold-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                <project.icon size={14} /> {project.category}
              </div>
              <h2 className="text-4xl md:text-6xl font-display text-white leading-tight mb-6">{project.title}</h2>
              <p className="text-ink-silver text-lg leading-relaxed opacity-80">{project.description}</p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Resultado Principal</div>
              <div className="text-5xl font-display text-gold-primary">{project.result}</div>
              <div className="mt-4 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-gold-dark via-gold-primary to-gold-light"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Estratégia Aplicada</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-ink-silver text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Ray-X & Timeline */}
          <div className="lg:col-span-7 space-y-12">
            <div className="relative p-8 rounded-[2rem] bg-zinc-900/30 border border-zinc-800 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <project.icon size={200} />
              </div>
              
              <h4 className="text-gold-primary font-display text-2xl mb-8 flex items-center gap-3">
                <TrendingIcon size={24} /> Raio-X de Crescimento
              </h4>

              <div className="relative space-y-12 pl-8 border-l border-zinc-800">
                {project.timeline.map((item: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-zinc-950 border-2 border-gold-primary flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
                    </div>
                    <div className="text-xs font-bold text-gold-primary/60 uppercase tracking-tighter mb-1">{item.period}</div>
                    <div className="text-xl font-heading font-bold text-white mb-2">{item.event}</div>
                    <div className="text-ink-silver text-sm opacity-60 leading-relaxed">{item.impact}</div>
                    
                    {item.growth && (
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex-grow h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(item.growth / 1900) * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.2 + 0.5 }}
                            className="h-full bg-gold-primary"
                          />
                        </div>
                        <div className="text-gold-primary font-mono text-xs font-bold">+{item.growth}%</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gold-primary/5 p-8 rounded-3xl border border-gold-primary/20">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Lightbulb size={18} className="text-gold-primary" /> Insight da Agência
              </h4>
              <p className="text-ink-silver text-sm italic leading-relaxed">
                "{project.insight}"
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleHashChange = () => {
      const newHash = window.location.hash || '#home';
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentHash(newHash);
        window.scrollTo(0, 0);
        setTimeout(() => setIsTransitioning(false), 400);
      }, 400);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigate = (hash: string) => {
    if (hash === currentHash) return;
    window.location.hash = hash;
    setIsMenuOpen(false);
  };

  const services = [
    { 
      icon: Globe, 
      title: "Criação de Sites Profissionais", 
      description: "Desenvolvemos sites de alta conversão, ultra-rápidos e otimizados para o Google (SEO).",
      fullText: "Na Attiva Digital, não criamos apenas sites; construímos máquinas de vendas. Nossos projetos são desenvolvidos com foco total em UX (Experiência do Usuário) e UI (Interface do Usuário), garantindo que cada clique tenha o potencial de se tornar um novo cliente. Utilizamos as tecnologias mais modernas para assegurar que seu site carregue em menos de 2 segundos, seja 100% responsivo (funciona perfeitamente em celulares, tablets e desktops) e possua uma arquitetura de informação pensada para a jornada de compra do seu público.",
      items: ["Sites Institucionais", "Landing Pages de Alta Conversão", "Blogs de Autoridade", "Portfólios Digitais"],
      differentiators: ["Otimização de Velocidade (Core Web Vitals)", "Design Exclusivo e Luxuoso", "SEO On-Page Integrado", "Hospedagem de Alta Performance"],
      results: "Aumento médio de 45% na taxa de conversão e melhoria imediata no posicionamento orgânico."
    },
    { 
      icon: MessageCircle, 
      title: "Gestão de Redes Sociais", 
      description: "Conteúdo estratégico que engaja, constrói autoridade e transforma seguidores em embaixadores da marca.",
      fullText: "Sua presença nas redes sociais é o cartão de visitas da sua empresa no mundo moderno. Nossa gestão vai muito além de 'postagens bonitas'. Criamos uma estratégia de conteúdo baseada em dados, tendências e no comportamento do seu público-alvo. Focamos em construir uma comunidade ativa em torno da sua marca, utilizando narrativas envolventes (storytelling), design de impacto e monitoramento constante de métricas para garantir que seu investimento se transforme em engajamento real e vendas.",
      items: ["Planejamento de Conteúdo Mensal", "Design de Posts e Reels", "Gestão de Comunidade e Comentários", "Relatórios de Performance"],
      differentiators: ["Estratégia de Branding Integrada", "Copywriting de Alto Impacto", "Análise de Concorrência", "Foco em Conversão, não apenas likes"],
      results: "Crescimento orgânico qualificado e fortalecimento da identidade visual da marca."
    },
    { 
      icon: Search, 
      title: "SEO & Indexação Google", 
      description: "Domine a primeira página do Google e seja encontrado por quem já está procurando o seu serviço.",
      fullText: "O SEO (Search Engine Optimization) é o investimento mais rentável a longo prazo para qualquer negócio digital. Na Attiva Digital, aplicamos técnicas avançadas de SEO Semântico, otimização técnica e link building para garantir que sua empresa apareça no topo das buscas em Curitiba e em todo o Brasil. Trabalhamos a indexação profunda do seu site, garantindo que o Google entenda exatamente o que você oferece e priorize sua marca frente aos concorrentes.",
      items: ["Auditoria Técnica de SEO", "Pesquisa de Palavras-Chave Estratégicas", "SEO Local (Google Meu Negócio)", "Otimização de Conteúdo Semântico"],
      differentiators: ["Foco em E-E-A-T (Experiência, Especialidade, Autoridade e Confiança)", "Estratégia de SEO Local para Curitiba", "Monitoramento de Rankings em Tempo Real", "Otimização Contínua de Performance"],
      results: "Aumento exponencial no tráfego orgânico e redução drástica no custo por lead a longo prazo."
    },
    { 
      icon: ShoppingCart, 
      title: "Lojas Virtuais (E-commerce)", 
      description: "Plataformas de vendas completas, seguras e prontas para escalar seu faturamento.",
      fullText: "Transforme sua loja física em uma potência de vendas online ou comece seu império digital do zero. Desenvolvemos e-commerces robustos, com foco na facilidade de navegação e na segurança das transações. Integramos as melhores soluções de pagamento (Pix, Cartão, Boleto) e logística do mercado, garantindo que a experiência de compra do seu cliente seja fluida e prazerosa, resultando em menos carrinhos abandonados e mais vendas finalizadas.",
      items: ["Desenvolvimento em Shopify/WooCommerce/Custom", "Integração com Gateways de Pagamento", "Gestão de Estoque e Frete", "Otimização de Checkout"],
      differentiators: ["Checkout em Uma Página", "Recuperação de Carrinhos Abandonados", "Design Focado em Mobile-First", "Treinamento Completo para sua Equipe"],
      results: "Plataforma escalável pronta para suportar grandes volumes de tráfego e vendas."
    },
    { 
      icon: Settings, 
      title: "Sistemas Web Customizados", 
      description: "Automação de processos e ferramentas exclusivas para a gestão eficiente do seu negócio.",
      fullText: "Muitas vezes, as ferramentas prontas do mercado não atendem às necessidades específicas da sua empresa. É aí que entramos com o desenvolvimento de sistemas web sob medida. Seja um CRM personalizado, um portal de membros ou uma ferramenta de automação interna, criamos soluções que resolvem problemas reais, economizam tempo da sua equipe e fornecem dados precisos para a tomada de decisão.",
      items: ["Dashboards Administrativos", "Sistemas de Gestão (ERP/CRM) Customizados", "Portais de Conteúdo e EAD", "Integrações via API"],
      differentiators: ["Arquitetura Escalável", "Segurança de Dados Avançada", "Interface Intuitiva", "Suporte Técnico Especializado"],
      results: "Aumento da produtividade interna e centralização inteligente das informações do negócio."
    },
    { 
      icon: Smartphone, 
      title: "Desenvolvimento de Apps", 
      description: "Aplicativos nativos e híbridos que colocam sua marca no bolso do seu cliente.",
      fullText: "O mundo é mobile. Ter um aplicativo próprio é a forma mais direta de fidelizar seus clientes e oferecer serviços exclusivos. Desenvolvemos apps para iOS e Android com foco em performance e usabilidade. Desde a concepção da ideia até a publicação nas lojas (App Store e Google Play), cuidamos de todo o processo técnico para que você tenha uma ferramenta poderosa de conexão e vendas na palma da mão.",
      items: ["Apps Nativos (Swift/Kotlin)", "Apps Híbridos (React Native/Flutter)", "Progressive Web Apps (PWA)", "Manutenção e Atualização de Apps"],
      differentiators: ["UI/UX Mobile Especializada", "Integração com Recursos do Celular (GPS, Câmera, Push)", "Performance Fluida", "Publicação Assistida nas Lojas"],
      results: "Maior retenção de clientes e criação de um novo canal de receita direta."
    },
    { 
      icon: TrendingUp, 
      title: "Tráfego Pago (Ads)", 
      description: "Anúncios certeiros no Google, Instagram e Facebook para gerar leads qualificados hoje.",
      fullText: "Quer resultados imediatos? O tráfego pago é o caminho. Criamos e gerenciamos campanhas de alta performance no Google Ads, Meta Ads (Instagram/Facebook), LinkedIn Ads e TikTok Ads. Nossa metodologia foca no ROI (Retorno sobre Investimento). Não buscamos apenas cliques; buscamos as pessoas certas, no momento certo, com a oferta certa para garantir que cada centavo investido retorne em faturamento para sua empresa.",
      items: ["Gestão de Google Ads (Pesquisa/Display/Shopping)", "Anúncios em Redes Sociais (Meta/TikTok/LinkedIn)", "Remarketing Estratégico", "Criação de Criativos de Alta Conversão"],
      differentiators: ["Análise de Dados em Tempo Real", "Testes A/B Constantes", "Otimização de Landing Pages", "Relatórios Transparentes de ROI"],
      results: "Geração imediata de leads e vendas com controle total do orçamento investido."
    },
    { 
      icon: Lightbulb, 
      title: "Consultoria de Marketing Digital", 
      description: "Estratégia macro para empresas que buscam crescimento sustentável e posicionamento de elite.",
      fullText: "Muitas empresas investem no digital sem uma estratégia clara, o que resulta em desperdício de recursos. Nossa consultoria oferece um olhar 360º sobre o seu negócio. Analisamos sua concorrência, seu posicionamento atual e identificamos as melhores oportunidades de crescimento. Entregamos um roadmap detalhado de ações que vão desde o branding até a escala de vendas, garantindo que sua marca se torne uma autoridade no seu nicho.",
      items: ["Planejamento Estratégico Anual", "Análise de Presença Digital", "Treinamento de Equipes de Vendas/Marketing", "Definição de KPIs e Métricas"],
      differentiators: ["Visão de Negócio Além do Marketing", "Metodologia Própria de Escala", "Acompanhamento Próximo e Consultivo", "Foco em Branding de Luxo e Valor"],
      results: "Clareza estratégica total e um caminho sólido para a liderança de mercado."
    },
  ];

  const faqs = [
    {
      question: "Quanto tempo leva para criar um site profissional?",
      answer: "O tempo médio de desenvolvimento de um site institucional de alta qualidade é de 15 a 30 dias, dependendo da complexidade e da agilidade na aprovação do conteúdo. Landing pages podem ser entregues em até 7 dias úteis."
    },
    {
      question: "A Attiva Digital atende apenas empresas de Curitiba?",
      answer: "Embora nossa sede seja em Curitiba–PR, atendemos clientes em todo o Brasil e até no exterior. O marketing digital nos permite uma conexão total e eficiente de forma remota, com reuniões via vídeo e acompanhamento em tempo real."
    },
    {
      question: "Qual o investimento mínimo para tráfego pago?",
      answer: "Não existe um valor fixo, pois o investimento depende dos seus objetivos e da concorrência do seu nicho. Recomendamos um valor inicial que permita realizar testes significativos, geralmente a partir de R$ 1.000,00 mensais em verba de anúncios, além da nossa taxa de gestão."
    },
    {
      question: "Meu site vai aparecer na primeira página do Google?",
      answer: "Trabalhamos com as melhores práticas de SEO e indexação para que isso aconteça. O SEO é um processo de médio a longo prazo, mas com nossa estratégia de SEO Local e Semântico, os resultados de posicionamento começam a aparecer de forma sólida nos primeiros meses."
    },
    {
      question: "Vocês fazem apenas o design ou também o conteúdo?",
      answer: "Oferecemos soluções completas (Full Service). Nossa equipe conta com copywriters especializados em conversão que criam todo o conteúdo textual do seu site ou redes sociais, garantindo que a comunicação seja persuasiva e alinhada à sua marca."
    }
  ];

  const testimonials = [
    {
      name: "Ricardo Almeida",
      company: "Almeida Advocacia",
      text: "A Attiva Digital transformou nossa presença online. Saímos do zero para a primeira página do Google em Curitiba em menos de 3 meses. O profissionalismo do Leonardo e sua equipe é impecável.",
      rating: 5
    },
    {
      name: "Mariana Costa",
      company: "Boutique de Luxo",
      text: "Minha loja virtual nunca vendeu tanto. O novo design trouxe uma elegância que meus clientes valorizam muito. O suporte pós-venda também é um grande diferencial deles.",
      rating: 5
    },
    {
      name: "Carlos Eduardo",
      company: "Tech Solutions",
      text: "O sistema web que desenvolveram para nossa gestão interna economizou horas de trabalho manual da minha equipe. Valeu cada centavo do investimento.",
      rating: 5
    }
  ];

  const portfolio = [
    { 
      title: "E-commerce Luxury Fashion", 
      category: "Lojas Virtuais", 
      result: "+1900% ROI", 
      icon: ShoppingCart,
      description: "Reestruturação completa de UX e estratégia de tráfego pago para marca de moda de alto luxo.",
      tags: ["Shopify Plus", "Meta Ads Elite", "SEO Semântico", "Branding"],
      insight: "Focamos na exclusividade. Menos é mais quando o ticket médio é alto. A jornada de compra foi simplificada para 3 cliques.",
      timeline: [
        { period: "Mês 01", event: "Setup & Auditoria", impact: "Identificação de 45% de abandono no checkout.", growth: 0 },
        { period: "Mês 04", event: "Escala de Tráfego", impact: "Otimização de ROAS para 12.5x.", growth: 450 },
        { period: "Mês 08", event: "SEO de Autoridade", impact: "Domínio de palavras-chave 'luxo' e 'exclusivo'.", growth: 1200 },
        { period: "Mês 12", event: "Pico Histórico", impact: "Faturamento recorde com +1900% de retorno sobre investimento.", growth: 1900 }
      ]
    },
    { 
      title: "Fintech Global Pay", 
      category: "Sistemas Web", 
      result: "+1200% Transações", 
      icon: Zap,
      description: "Desenvolvimento de plataforma de pagamentos transfronteiriços com foco em velocidade e segurança.",
      tags: ["React", "Node.js", "Segurança Bancária", "API Integration"],
      insight: "A confiança é a moeda principal. Implementamos um sistema de feedback em tempo real que reduziu a ansiedade do usuário.",
      timeline: [
        { period: "Mês 01", event: "Lançamento MVP", impact: "Primeiras 1.000 transações processadas com sucesso.", growth: 100 },
        { period: "Mês 06", event: "Expansão LatAm", impact: "Integração com 12 novos bancos regionais.", growth: 650 },
        { period: "Mês 12", event: "Escala Global", impact: "Volume transacional atingiu marca de +1200% vs início.", growth: 1200 }
      ]
    },
    { 
      title: "App Saúde Conectada", 
      category: "Apps", 
      result: "+850% Engajamento", 
      icon: Heart,
      description: "Aplicativo de monitoramento de saúde com gamificação para aumentar a retenção de pacientes.",
      tags: ["React Native", "Gamificação", "UX Research", "Push Notifications"],
      insight: "Saúde não precisa ser chata. A gamificação transformou o hábito de medir pressão em um desafio recompensador.",
      timeline: [
        { period: "Mês 01", event: "Redesign de Interface", impact: "Redução de 30% no churn inicial.", growth: 50 },
        { period: "Mês 05", event: "Módulo de Gamificação", impact: "Tempo de uso diário subiu de 2min para 12min.", growth: 400 },
        { period: "Mês 10", event: "Viralização", impact: "Crescimento orgânico de 850% na base ativa.", growth: 850 }
      ]
    },
    { 
      title: "Imobiliária Alto Padrão", 
      category: "SEO & Tráfego", 
      result: "+1500% Leads", 
      icon: Home,
      description: "Estratégia de SEO Local e Google Ads para venda de coberturas e mansões em Curitiba.",
      tags: ["Google Ads", "SEO Local", "Landing Pages", "CRM Sync"],
      insight: "O lead de luxo não quer formulário gigante. Criamos um concierge digital via WhatsApp que converte 4x mais.",
      timeline: [
        { period: "Mês 01", event: "Otimização Local", impact: "Aparecimento no 'Map Pack' para 15 bairros nobres.", growth: 120 },
        { period: "Mês 06", event: "Campanha de Elite", impact: "Custo por lead qualificado reduzido em 60%.", growth: 700 },
        { period: "Mês 12", event: "Domínio de Mercado", impact: "Aumento de 1500% no volume de leads de alto padrão.", growth: 1500 }
      ]
    },
    { 
      title: "Portal EdTech", 
      category: "Sistemas Web", 
      result: "+600% Alunos", 
      icon: BookOpen,
      description: "Plataforma de cursos online com sistema de aprendizado adaptativo via IA.",
      tags: ["LMS Custom", "AI Learning", "Video Streaming", "Scalability"],
      insight: "Personalização é a chave da retenção. A IA sugere conteúdos baseados na dificuldade real do aluno.",
      timeline: [
        { period: "Mês 01", event: "Migração de Plataforma", impact: "Estabilidade para 50k usuários simultâneos.", growth: 0 },
        { period: "Mês 06", event: "Lançamento IA", impact: "Taxa de conclusão de cursos subiu 45%.", growth: 300 },
        { period: "Mês 12", event: "Expansão Nacional", impact: "Base de alunos ativos cresceu 600%.", growth: 600 }
      ]
    },
    { 
      title: "Grupo Automotivo Premium", 
      category: "Tráfego Pago", 
      result: "+750% Vendas", 
      icon: Car,
      description: "Gestão de performance para rede de concessionárias de marcas alemãs.",
      tags: ["Meta Ads", "Google Shopping", "Data Intelligence", "Lead Scoring"],
      insight: "Test-drive é o fechamento. Criamos um sistema de agendamento em 2 cliques que lotou as agendas.",
      timeline: [
        { period: "Mês 01", event: "Auditoria de Dados", impact: "Descoberta de 20% de verba jogada fora em keywords ruins.", growth: 0 },
        { period: "Mês 04", event: "Nova Estratégia", impact: "Aumento de 250% no agendamento de test-drives.", growth: 250 },
        { period: "Mês 10", event: "Performance Total", impact: "Vendas diretas via digital cresceram 750%.", growth: 750 }
      ]
    },
    { 
      title: "Advocacia de Elite", 
      category: "SEO Local", 
      result: "+320% Consultas", 
      icon: Scale,
      description: "Posicionamento de autoridade para escritório especializado em direito empresarial.",
      tags: ["Content Marketing", "SEO Técnico", "Google Maps", "Authority"],
      insight: "Advocacia é confiança. O blog técnico transformou o sócio em referência nacional no Google.",
      timeline: [
        { period: "Mês 01", event: "SEO On-Page", impact: "Correção de erros técnicos que impediam indexação.", growth: 20 },
        { period: "Mês 06", event: "Marketing de Conteúdo", impact: "10 artigos na primeira página para termos jurídicos.", growth: 180 },
        { period: "Mês 12", event: "Autoridade Consolidada", impact: "Agendamentos mensais cresceram 320%.", growth: 320 }
      ]
    },
    { 
      title: "Cosméticos Orgânicos", 
      category: "Redes Sociais", 
      result: "+1400% Alcance", 
      icon: Sparkles,
      description: "Estratégia de conteúdo e influenciadores para marca de beleza sustentável.",
      tags: ["Influencer Marketing", "Reels Strategy", "UGC", "Community"],
      insight: "O cliente quer verdade. Conteúdos gerados por usuários (UGC) performaram 5x melhor que anúncios.",
      timeline: [
        { period: "Mês 01", event: "Nova Identidade Visual", impact: "Engajamento por post subiu de 0.5% para 3%.", growth: 100 },
        { period: "Mês 06", event: "Campanha Influencers", impact: "Alcance mensal atingiu 1 milhão de pessoas.", growth: 800 },
        { period: "Mês 12", event: "Comunidade Ativa", impact: "Alcance orgânico total cresceu 1400%.", growth: 1400 }
      ]
    },
    { 
      title: "SaaS Logística 4.0", 
      category: "Sistemas Web", 
      result: "+500% Eficiência", 
      icon: Layers,
      description: "Dashboard de controle em tempo real para frotas de transporte pesado.",
      tags: ["Real-time Data", "IoT Integration", "Dashboard UX", "Cloud"],
      insight: "Dados em tempo real salvam vidas e dinheiro. A interface foca no que é crítico para o motorista.",
      timeline: [
        { period: "Mês 01", event: "Prototipagem", impact: "Validação de interface com 50 motoristas reais.", growth: 0 },
        { period: "Mês 06", event: "Rollout Nacional", impact: "Redução de 15% no consumo de combustível.", growth: 200 },
        { period: "Mês 12", event: "Otimização Total", impact: "Eficiência logística da frota cresceu 500%.", growth: 500 }
      ]
    },
    { 
      title: "IA Generativa Startup", 
      category: "Branding & Web", 
      result: "+1100% Users", 
      icon: Cpu,
      description: "Lançamento de plataforma de IA para criação de ativos de marketing.",
      tags: ["Product Design", "Growth Hacking", "Viral Loops", "SaaS"],
      insight: "O 'Aha Moment' deve ser rápido. Reduzimos o tempo de onboarding para menos de 45 segundos.",
      timeline: [
        { period: "Mês 01", event: "Beta Fechado", impact: "Lista de espera com 5.000 interessados.", growth: 100 },
        { period: "Mês 04", event: "Lançamento Público", impact: "100k usuários atingidos em 30 dias.", growth: 600 },
        { period: "Mês 08", event: "Escala Global", impact: "Base de usuários cresceu 1100% organicamente.", growth: 1100 }
      ]
    },
    { 
      title: "Rede de Clínicas Estéticas", 
      category: "Tráfego Pago", 
      result: "+900% Conversão", 
      icon: Target,
      description: "Funil de vendas completo para rede de clínicas de harmonização facial.",
      tags: ["Meta Ads", "Landing Pages", "WhatsApp Automation", "Sales Funnel"],
      insight: "O agendamento deve ser imediato. O bot de IA qualifica e agenda o paciente em 1 minuto.",
      timeline: [
        { period: "Mês 01", event: "Novo Funil", impact: "Taxa de conversão da LP subiu de 2% para 12%.", growth: 200 },
        { period: "Mês 06", event: "Automação de Vendas", impact: "Redução de 40% no tempo de resposta comercial.", growth: 500 },
        { period: "Mês 12", event: "Escala de Unidades", impact: "Volume de agendamentos cresceu 900%.", growth: 900 }
      ]
    },
    { 
      title: "Indústria Dashboard", 
      category: "Sistemas Web", 
      result: "+400% Automação", 
      icon: BarChart,
      description: "Sistema de monitoramento de linha de produção para indústria têxtil.",
      tags: ["Industrial IoT", "Big Data", "Predictive Maintenance", "UX"],
      insight: "Prever é melhor que remediar. O sistema avisa falhas 2 horas antes de acontecerem.",
      timeline: [
        { period: "Mês 01", event: "Sensores IoT", impact: "Coleta de dados de 100% das máquinas.", growth: 50 },
        { period: "Mês 06", event: "Algoritmo Preditivo", impact: "Redução de 25% nas paradas não programadas.", growth: 250 },
        { period: "Mês 12", event: "Fábrica Inteligente", impact: "Nível de automação e controle subiu 400%.", growth: 400 }
      ]
    },
    { 
      title: "Eventos Híbridos", 
      category: "Apps & Web", 
      result: "+1300% Participação", 
      icon: Users,
      description: "Plataforma para grandes congressos médicos com interação em tempo real.",
      tags: ["Live Streaming", "Networking App", "Interactive Q&A", "Analytics"],
      insight: "O evento não acaba no palco. O app manteve a comunidade ativa 365 dias por ano.",
      timeline: [
        { period: "Mês 01", event: "Lançamento App", impact: "95% de adoção pelos congressistas presenciais.", growth: 200 },
        { period: "Mês 06", event: "Módulo Streaming", impact: "Audiência global em 45 países simultâneos.", growth: 800 },
        { period: "Mês 12", event: "Ecossistema Digital", impact: "Participação total cresceu 1300% vs modelo físico.", growth: 1300 }
      ]
    },
    { 
      title: "Consultoria B2B", 
      category: "SEO & LinkedIn", 
      result: "+1700% Autoridade", 
      icon: Briefcase,
      description: "Estratégia de Social Selling e SEO para consultoria de gestão empresarial.",
      tags: ["LinkedIn Strategy", "Thought Leadership", "B2B SEO", "Lead Gen"],
      insight: "B2B é de pessoa para pessoa. Humanizamos a marca dos diretores para gerar negócios.",
      timeline: [
        { period: "Mês 01", event: "Otimização Perfis", impact: "Aumento de 300% nas visualizações de perfil.", growth: 150 },
        { period: "Mês 06", event: "Estratégia de Conteúdo", impact: "Liderança orgânica para termos de 'gestão'.", growth: 900 },
        { period: "Mês 12", event: "Máquina de Leads", impact: "Autoridade e geração de leads cresceram 1700%.", growth: 1700 }
      ]
    }
  ];

  const blogPosts = [
    {
      title: "O Futuro do SEO em 2026: IA e Busca Semântica",
      category: "SEO",
      date: "15 Mar 2026",
      excerpt: "Como as novas atualizações do Google estão priorizando a intenção do usuário e o conteúdo gerado por especialistas.",
      image: "from-blue-900 to-purple-900"
    },
    {
      title: "5 Estratégias para Escalar seu E-commerce este ano",
      category: "E-commerce",
      date: "10 Mar 2026",
      excerpt: "Do checkout em uma página ao remarketing dinâmico: o que realmente funciona para vender mais.",
      image: "from-gold-dark to-gold-light"
    },
    {
      title: "Branding de Luxo: Como posicionar sua marca no topo",
      category: "Branding",
      date: "05 Mar 2026",
      excerpt: "A psicologia por trás das marcas de alto padrão e como aplicar esses conceitos no seu negócio digital.",
      image: "from-zinc-800 to-black"
    },
    {
      title: "Tráfego Pago vs Orgânico: Onde investir seu orçamento?",
      category: "Marketing",
      date: "01 Mar 2026",
      excerpt: "Um guia completo para equilibrar investimentos de curto e longo prazo para um crescimento sustentável.",
      image: "from-red-900 to-orange-900"
    },
    {
      title: "A Importância da Velocidade de Carregamento para Conversão",
      category: "Tecnologia",
      date: "25 Fev 2026",
      excerpt: "Por que cada milissegundo conta e como os Core Web Vitals impactam diretamente no seu faturamento.",
      image: "from-green-900 to-teal-900"
    },
    {
      title: "Gestão de Redes Sociais: Além dos Likes e Seguidores",
      category: "Social Media",
      date: "20 Fev 2026",
      excerpt: "Como transformar sua audiência em uma comunidade ativa que defende e promove sua marca organicamente.",
      image: "from-pink-900 to-rose-900"
    }
  ];

  const resultsData = [
    {
      title: "Crescimento de Tráfego Orgânico",
      metric: "+450%",
      description: "Média de crescimento anual para clientes com estratégia de SEO Semântico.",
      chartData: [100, 120, 150, 200, 280, 350, 420, 480, 550, 620, 700, 850]
    },
    {
      title: "Redução de Custo por Lead (CPL)",
      metric: "-65%",
      description: "Otimização de campanhas de tráfego pago resultando em leads mais baratos e qualificados.",
      chartData: [100, 95, 85, 80, 70, 60, 55, 50, 45, 40, 38, 35]
    },
    {
      title: "Taxa de Conversão em E-commerce",
      metric: "4.8%",
      description: "Média de conversão após implementação de UX/UI focado em vendas (Média Brasil: 1.5%).",
      chartData: [1.2, 1.5, 1.8, 2.2, 2.8, 3.2, 3.5, 3.8, 4.1, 4.3, 4.5, 4.8]
    }
  ];

  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="min-h-screen selection:bg-gold-primary selection:text-black">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgress />

      <div id="curtain" className={isTransitioning ? 'curtain-animate' : ''} />

      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <PortfolioModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Logo onClick={() => navigate('#home')} />
          
          <div className="hidden md:flex gap-8 items-center">
            {['#home', '#servicos', '#sobre', '#portfolio', '#resultados', '#blog', '#contato'].map((hash) => (
              <button 
                key={hash}
                onClick={() => navigate(hash)}
                className={`font-sans font-medium uppercase tracking-widest text-xs transition-colors relative group ${currentHash === hash ? 'text-gold-primary' : 'text-white/70 hover:text-white'}`}
              >
                {hash.replace('#', '') || 'home'}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-gold-primary transition-all duration-300 ${currentHash === hash ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
            <button 
              onClick={() => navigate('#contato')}
              className="btn-gold px-6 py-2 rounded-full text-xs uppercase tracking-widest elderly-friendly-btn"
            >
              Fale Conosco
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-6 backdrop-blur-xl"
          >
            {['#home', '#servicos', '#sobre', '#portfolio', '#resultados', '#blog', '#contato'].map((hash) => (
              <button 
                key={hash}
                onClick={() => navigate(hash)}
                className="text-2xl font-display text-white uppercase tracking-widest hover:text-gold-primary transition-colors"
              >
                {hash.replace('#', '') || 'home'}
              </button>
            ))}
            <div className="flex gap-6 mt-8">
              <a href="https://www.instagram.com/attiva.digital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-primary transition-colors"><Instagram /></a>
              <a href="https://www.facebook.com/leonardo.barretto" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-primary transition-colors"><Facebook /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {currentHash === '#home' && (
          <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
            <ParticleCanvas />
            
            {/* Vignette & Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)] pointer-events-none" />

            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="mb-12 relative"
            >
              <Logo />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 bg-gold-primary/20 blur-3xl rounded-full -z-10"
              />
            </motion.div>
            
            <div className="relative z-10 max-w-5xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                className="font-display text-6xl md:text-9xl lg:text-[12rem] text-white mb-6 leading-none tracking-tighter"
              >
                ATTIVA <span className="gold-text">DIGITAL</span>
              </motion.h1>
              
              <Typewriter />
              
              <div className="mt-8 mb-12">
                <HeroTagline text="Agência de Publicidade Digital | Curitiba — PR" />
              </div>

              {/* Progress Bar in Hero */}
              <div className="max-w-xs mx-auto mb-12">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-gold-primary/60 mb-2 font-bold">
                  <span>Inovação</span>
                  <span>Performance</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-gold-dark to-gold-light"
                  />
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col md:flex-row gap-6 justify-center"
              >
                <button 
                  onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
                  className="btn-gold px-12 py-5 rounded-full text-sm uppercase tracking-widest flex items-center gap-3 justify-center elderly-friendly-btn group shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_50px_rgba(201,168,76,0.5)]"
                >
                  <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" /> Fale Agora
                </button>
                <button 
                  onClick={() => navigate('#servicos')}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-12 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all elderly-friendly-btn"
                >
                  Nossos Serviços
                </button>
              </motion.div>
            </div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute bottom-12 text-gold-primary/40 cursor-pointer hover:text-gold-primary transition-colors"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll</span>
                <ChevronDown size={32} />
              </div>
            </motion.div>
          </section>
        )}

        {currentHash === '#servicos' && (
          <section id="servicos" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-display text-5xl md:text-7xl text-white mb-4">Nossos Serviços</h2>
              <div className="w-24 h-1 bg-gold-primary mx-auto mb-6" />
              <p className="text-ink-silver max-w-2xl mx-auto opacity-70 elderly-friendly-text">
                Soluções completas e personalizadas para elevar o patamar digital do seu negócio.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((s, i) => (
                <ServiceCard key={i} {...s} delay={i * 0.1} onClick={() => setSelectedService(s)} />
              ))}
            </div>
          </section>
        )}

        {currentHash === '#sobre' && (
          <section id="sobre" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-5xl md:text-7xl text-white mb-6">Quem Somos</h2>
                <h3 className="text-gold-primary text-xl font-sans font-semibold mb-8 uppercase tracking-widest">Agência nascida para transformar negócios digitalmente</h3>
                <div className="space-y-6 text-ink-silver leading-relaxed elderly-friendly-text">
                  <p>A Attiva Digital é uma agência focada em resultados reais. Localizada em Curitiba, nascemos com a missão de conectar marcas ao seu público ideal através de estratégias inteligentes e design de alto impacto.</p>
                  <p>Não acreditamos em fórmulas prontas. Cada projeto é único e recebe atenção total da nossa equipe criativa e técnica para garantir que sua marca esteja sempre ativa e relevante no mercado.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <Target className="text-gold-primary mb-4" />
                    <h4 className="text-white font-bold mb-2">Missão</h4>
                    <p className="text-xs text-ink-silver opacity-60">Impulsionar o crescimento de empresas através de tecnologia de ponta e marketing de alta performance.</p>
                  </div>
                  <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <Eye className="text-gold-primary mb-4" />
                    <h4 className="text-white font-bold mb-2">Visão</h4>
                    <p className="text-xs text-ink-silver opacity-60">Ser a agência referência em Curitiba para marcas que buscam posicionamento de elite e escala global.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden border-2 border-gold-primary p-4">
                  <div className="w-full h-full bg-zinc-900 rounded-2xl flex flex-col items-center justify-center text-center p-8">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gold-primary to-gold-dark p-1 mb-8">
                      <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                        <User size={80} className="text-gold-primary" />
                      </div>
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-white mb-2">Leonardo Santana Barretto Bastos</h4>
                    <p className="text-gold-primary uppercase tracking-widest text-sm mb-6">Fundador & Diretor Criativo</p>
                    <div className="flex gap-4">
                      <a href="https://www.facebook.com/leonardo.barretto" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-primary transition-colors"><Facebook /></a>
                      <a href="https://www.instagram.com/leo.barretto1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-primary transition-colors"><Instagram /></a>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold-primary/10 rounded-full blur-3xl" />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
              <div className="p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800 text-center">
                <Rocket className="text-gold-primary mx-auto mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Inovação</h4>
                <p className="text-xs text-ink-silver opacity-60">Sempre um passo à frente nas tendências digitais.</p>
              </div>
              <div className="p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800 text-center">
                <ShieldCheck className="text-gold-primary mx-auto mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Transparência</h4>
                <p className="text-xs text-ink-silver opacity-60">Relatórios claros e foco total no ROI do cliente.</p>
              </div>
              <div className="p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800 text-center">
                <Zap className="text-gold-primary mx-auto mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Agilidade</h4>
                <p className="text-xs text-ink-silver opacity-60">Execução rápida sem comprometer a qualidade.</p>
              </div>
              <div className="p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800 text-center">
                <Award className="text-gold-primary mx-auto mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Excelência</h4>
                <p className="text-xs text-ink-silver opacity-60">Comprometimento com o sucesso de cada parceiro.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-zinc-900/30 rounded-3xl border border-zinc-800 p-12 mb-32">
              <Counter end={200} label="Clientes Atendidos" suffix="+" />
              <Counter end={500} label="Projetos Entregues" suffix="+" />
              <Counter end={8} label="Anos de Mercado" suffix="+" />
            </div>

            {/* Testimonials Section */}
            <div className="mb-32">
              <div className="text-center mb-16">
                <h3 className="font-display text-4xl md:text-5xl text-white mb-4">O que dizem nossos clientes</h3>
                <div className="w-16 h-1 bg-gold-primary mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 relative"
                  >
                    <div className="flex text-gold-primary mb-6">
                      {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                    <p className="text-ink-silver italic mb-8 leading-relaxed">"{t.text}"</p>
                    <div>
                      <div className="text-white font-bold">{t.name}</div>
                      <div className="text-gold-primary text-xs uppercase tracking-widest">{t.company}</div>
                    </div>
                    <div className="absolute -top-4 -left-4 text-6xl text-gold-primary opacity-10 font-serif">“</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="text-center mb-16">
                <h3 className="font-display text-4xl md:text-5xl text-white mb-4">Dúvidas Frequentes</h3>
                <div className="w-16 h-1 bg-gold-primary mx-auto" />
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
                    <summary className="p-6 cursor-pointer flex justify-between items-center list-none">
                      <span className="text-white font-bold elderly-friendly-text">{faq.question}</span>
                      <ChevronDown className="text-gold-primary group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-ink-silver opacity-70 elderly-friendly-text border-t border-zinc-800 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentHash === '#portfolio' && (
          <section id="portfolio" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-display text-5xl md:text-7xl text-white mb-4">Nosso Portfólio</h2>
              <div className="w-24 h-1 bg-gold-primary mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedProject(p)}
                  className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer border border-zinc-800 hover:border-gold-primary/50 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                    <p.icon className="opacity-5 scale-[3] text-gold-primary group-hover:scale-[4] transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-500" />
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 text-gold-primary text-xs uppercase tracking-[0.2em] font-bold mb-4">
                      <p.icon size={14} /> {p.category}
                    </div>
                    <h4 className="text-3xl font-display text-white mb-3 leading-tight">{p.title}</h4>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="px-3 py-1 rounded-full bg-gold-primary text-black text-[10px] font-black uppercase tracking-tighter">
                        {p.result}
                      </div>
                      <div className="text-zinc-500 text-[10px] uppercase tracking-widest">Case de Sucesso</div>
                    </div>
                    <button className="flex items-center gap-3 text-white font-bold text-sm group-hover:text-gold-primary transition-colors">
                      Ver Raio-X <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {currentHash === '#resultados' && (
          <section id="resultados" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-display text-5xl md:text-7xl text-white mb-4">Métricas de Sucesso</h2>
              <div className="w-24 h-1 bg-gold-primary mx-auto mb-6" />
              <p className="text-ink-silver max-w-2xl mx-auto opacity-70 elderly-friendly-text">
                Transparência total. Veja como transformamos investimentos em crescimento real para nossos parceiros em 2025.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {resultsData.map((res, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800"
                >
                  <h4 className="text-white font-bold mb-2">{res.title}</h4>
                  <div className="text-4xl font-display text-gold-primary mb-4">{res.metric}</div>
                  <p className="text-xs text-ink-silver opacity-60 mb-8">{res.description}</p>
                  <ResultChart data={res.chartData} label={res.title} />
                </motion.div>
              ))}
            </div>

            <div className="mt-20 p-12 bg-gradient-to-br from-gold-dark/20 to-transparent rounded-[3rem] border border-gold-primary/20 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h3 className="text-3xl font-display text-white mb-4">Quer resultados como estes?</h3>
                <p className="text-ink-silver opacity-70">Nossa metodologia é baseada em dados e focada em escala. Agende uma consultoria gratuita e descubra o potencial do seu negócio.</p>
              </div>
              <button 
                onClick={() => navigate('#contato')}
                className="btn-gold px-12 py-5 rounded-full text-sm uppercase tracking-widest font-bold whitespace-nowrap"
              >
                Começar Agora
              </button>
            </div>
          </section>
        )}

        {currentHash === '#blog' && (
          <section id="blog" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-display text-5xl md:text-7xl text-white mb-4">Insights & Conteúdo</h2>
              <div className="w-24 h-1 bg-gold-primary mx-auto mb-6" />
              <p className="text-ink-silver max-w-2xl mx-auto opacity-70 elderly-friendly-text">
                Fique por dentro das últimas tendências do marketing digital, tecnologia e branding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <BlogCard key={i} {...post} delay={i * 0.1} />
              ))}
            </div>

            <div className="mt-20 text-center">
              <button className="border border-gold-primary text-gold-primary px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-gold-primary hover:text-black transition-all">
                Ver Todos os Artigos
              </button>
            </div>
          </section>
        )}

        {currentHash === '#contato' && (
          <section id="contato" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-5xl md:text-7xl text-white mb-6">Vamos Conversar?</h2>
                <p className="text-ink-silver mb-12 opacity-70 elderly-friendly-text">Preencha o formulário e nossa equipe entrará em contato via WhatsApp em poucos minutos.</p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center text-gold-primary border border-zinc-800 group-hover:border-gold-primary transition-colors">
                      <MessageCircle />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-zinc-500">WhatsApp</div>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-xl text-white hover:text-gold-primary transition-colors">(41) 99846-1858</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center text-gold-primary border border-zinc-800 group-hover:border-gold-primary transition-colors">
                      <Globe />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-zinc-500">E-mail</div>
                      <a href="mailto:attivadigital10@gmail.com" className="text-xl text-white hover:text-gold-primary transition-colors">attivadigital10@gmail.com</a>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-zinc-800">
                    <div className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Horário de Atendimento</div>
                    <p className="text-ink-silver text-sm">Seg-Sex: 09h – 19h</p>
                    <p className="text-ink-silver text-sm">Sáb: 08h – 15h</p>
                    <p className="text-ink-silver text-sm">Dom: 09h – 13h</p>
                  </div>
                </div>
              </motion.div>

              <motion.form 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 p-8 md:p-12 rounded-3xl border border-zinc-800 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const text = `Olá! Vim pelo site da Attiva Digital 🚀\n\n` +
                    `*Nome:* ${formData.get('nome')}\n` +
                    `*E-mail:* ${formData.get('email')}\n` +
                    `*Telefone:* ${formData.get('telefone')}\n` +
                    `*Serviço:* ${formData.get('servico')}\n` +
                    `*Mensagem:* ${formData.get('mensagem')}`;
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500">Nome Completo</label>
                    <input name="nome" required className="w-full bg-zinc-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-gold-primary outline-none transition-all" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500">E-mail</label>
                    <input name="email" type="email" required className="w-full bg-zinc-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-gold-primary outline-none transition-all" placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500">WhatsApp</label>
                    <input name="telefone" required className="w-full bg-zinc-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-gold-primary outline-none transition-all" placeholder="(41) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500">Serviço</label>
                    <select name="servico" className="w-full bg-zinc-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-gold-primary outline-none transition-all appearance-none">
                      <option>Criação de Sites</option>
                      <option>Redes Sociais</option>
                      <option>SEO</option>
                      <option>App / Sistema</option>
                      <option>Tráfego Pago</option>
                      <option>Consultoria</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500">Mensagem</label>
                  <textarea name="mensagem" required rows={4} className="w-full bg-zinc-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-gold-primary outline-none transition-all resize-none" placeholder="Como podemos ajudar seu negócio?"></textarea>
                </div>
                <button type="submit" className="w-full btn-gold py-5 rounded-xl flex items-center justify-center gap-3 elderly-friendly-btn">
                  <MessageCircle size={24} /> ENVIAR PELO WHATSAPP
                </button>
              </motion.form>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-zinc-950 pt-20 pb-10 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Logo className="!items-start" onClick={() => navigate('#home')} />
            <p className="text-ink-silver opacity-60 text-sm leading-relaxed">
              Sua marca sempre ativa no mundo digital. Transformamos tecnologia em resultados reais para sua empresa.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/attiva.digital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-black transition-all"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/leonardo.barretto" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-black transition-all"><Facebook size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-heading font-bold mb-8 uppercase tracking-widest text-sm">Links Rápidos</h4>
            <ul className="space-y-4">
              {['#home', '#servicos', '#sobre', '#portfolio', '#contato'].map(h => (
                <li key={h}><button onClick={() => navigate(h)} className="text-ink-silver hover:text-gold-primary transition-colors text-sm uppercase tracking-widest">{h.replace('#', '') || 'home'}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold mb-8 uppercase tracking-widest text-sm">Serviços</h4>
            <ul className="space-y-4">
              <li className="text-ink-silver text-sm opacity-60">Criação de Sites</li>
              <li className="text-ink-silver text-sm opacity-60">Gestão de Redes</li>
              <li className="text-ink-silver text-sm opacity-60">SEO & Indexação</li>
              <li className="text-ink-silver text-sm opacity-60">Tráfego Pago</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold mb-8 uppercase tracking-widest text-sm">Localização</h4>
            <p className="text-ink-silver text-sm opacity-60 mb-4">Rua Elvira Annibaleto, 117 Ap 22<br />Bairro Novo Mundo, Curitiba – PR</p>
            <p className="text-ink-silver text-sm opacity-60">CEP: 81010-340</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs">© 2026 Attiva Digital. Todos os direitos reservados.</p>
          <p className="text-zinc-600 text-xs">CNPJ: 810.983.405-15</p>
          <div className="flex items-center gap-2 text-zinc-600 text-xs">
            Feito com <span className="text-gold-primary">❤</span> em Curitiba
          </div>
        </div>
      </footer>

      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        target="_blank" 
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 transition-transform animate-bounce group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 px-4 py-2 bg-zinc-900 border border-gold-primary/30 text-white text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Fale com um especialista agora!
        </span>
      </a>

      <BackToTop />
      <CookieBanner />
    </div>
  );
}
