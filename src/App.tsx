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
  ArrowUpRight,
  ChevronRight,
  ShoppingBag,
  Check
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import Markdown from 'react-markdown';
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
const SHELLY_WHATSAPP = '5547997032739';
const SHELLY_NAME = 'Shelly';
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

const BlogCard = ({ title, category, date, excerpt, image, svg, delay, onClick }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    onClick={onClick}
    className="blog-card group"
  >
    <div className="blog-article-img">
      {svg ? svg : (
        <img 
          src={image} 
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      )}
      <div className="blog-card-category">
        {category}
      </div>
    </div>
    <div className="p-6 md:p-8">
      <div className="blog-card-meta">
        <Calendar size={12} /> {date}
      </div>
      <h4 className="blog-card-title">{title}</h4>
      <p className="blog-card-excerpt">{excerpt}</p>
      <button className="blog-card-readmore">
        Ler Artigo <ArrowRight size={14} />
      </button>
    </div>
  </motion.div>
);

const BlogModal = ({ post, onClose }: { post: any, onClose: () => void }) => {
  if (!post) return null;

  // JSON-LD Schema for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author || "Leonardo Santana"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Attiva Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.attivadigital.com.br/logo.png"
      }
    },
    "datePublished": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.attivadigital.com.br/#blog/${post.id}`
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.attivadigital.com.br"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.attivadigital.com.br/#blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.attivadigital.com.br/#blog/${post.id}`
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl"
      onClick={onClose}
    >
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
        
        <motion.div 
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          className="bg-zinc-950 w-full max-w-5xl max-h-[90vh] rounded-[2rem] md:rounded-[3.5rem] border border-gold-primary/20 overflow-hidden relative flex flex-col shadow-[0_0_100px_rgba(201,168,76,0.1)]"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-black/50 hover:bg-gold-primary hover:text-black rounded-full flex items-center justify-center text-white transition-all z-50 border border-white/10"
          >
            <X size={24} />
          </button>

        <div className="overflow-y-auto custom-scrollbar">
          <div className="aspect-[21/9] w-full relative">
            {post.svg ? (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                {post.svg}
              </div>
            ) : (
              <img 
                src={post.image} 
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <nav className="flex items-center gap-2 text-gold-primary/60 text-[10px] uppercase tracking-[0.2em] mb-6">
                <span>Home</span>
                <ChevronRight size={10} />
                <span>Blog</span>
                <ChevronRight size={10} />
                <span className="text-gold-primary">{post.category}</span>
              </nav>
              <div className="px-4 py-1 bg-gold-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full inline-block mb-6">
                {post.category}
              </div>
              <h1 className="text-3xl md:text-6xl font-display text-white leading-[1.1] tracking-tighter max-w-4xl">{post.title}</h1>
            </div>
          </div>

            <div className="p-8 md:p-20">
              <div className="flex flex-wrap items-center gap-8 text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-12 pb-12 border-b border-zinc-900/50">
                <div className="flex items-center gap-3"><Calendar size={14} className="text-gold-primary" /> {post.date}</div>
                <div className="flex items-center gap-3"><User size={14} className="text-gold-primary" /> Por {post.author}</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-gold-primary" /> 5 min de leitura</div>
              </div>

              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-white leading-relaxed mb-12 font-light italic border-l-4 border-gold-primary pl-8 py-2">
                  {post.excerpt}
                </p>
                
                <div className="blog-content text-ink-silver leading-[1.8] space-y-8 text-lg md:text-xl opacity-90">
                  <Markdown components={{
                    h2: ({node, ...props}) => <h2 className="text-3xl md:text-4xl font-display text-white mt-16 mb-8" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-heading font-bold text-gold-primary mt-12 mb-6" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-4 mb-8 text-gold-primary/80" {...props} />,
                    li: ({node, ...props}) => <li className="text-ink-silver" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />
                  }}>
                    {post.content}
                  </Markdown>
                </div>

                <div className="mt-20 pt-12 border-t border-zinc-900/50">
                  <div className="flex flex-wrap gap-3">
                    {post.keywords?.map((kw: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 bg-zinc-900 rounded-full text-[10px] text-zinc-500 uppercase tracking-widest border border-zinc-800">
                        #{kw.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-20 p-10 md:p-16 bg-gradient-to-br from-gold-dark/10 to-zinc-900/50 rounded-[3rem] border border-gold-primary/20 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl md:text-3xl font-display text-white mb-3">Pronto para o próximo nível?</h4>
                    <p className="text-ink-silver opacity-60 text-sm md:text-base">Nossa equipe está pronta para implementar estas estratégias no seu negócio.</p>
                  </div>
                  <button 
                    onClick={() => {
                      onClose();
                      window.location.hash = '#contato';
                    }}
                    className="w-full md:w-auto btn-gold px-12 py-5 rounded-full text-xs uppercase tracking-widest font-black shadow-[0_0_30px_rgba(201,168,76,0.2)]"
                  >
                    Consultoria Gratuita
                  </button>
                </div>
              </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
          initial={{ opacity: 0, y: 80, scale: 0.5, filter: "blur(20px)", rotate: i % 2 === 0 ? -5 : 5 }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotate: 0 }}
          transition={{ 
            delay: 1 + i * 0.2, 
            duration: 1,
            ease: "circOut"
          }}
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
        this.size = Math.random() * 3 + 1.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.3;
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
      const count = window.innerWidth < 768 ? 50 : 80;
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

const ReviewCard = ({ review }: { review: any, key?: any }) => (
  <div className="review-card">
    <div className="review-header">
      <div className="reviewer-avatar" style={{ backgroundColor: review.color }}>
        {review.avatar}
      </div>
      <div className="reviewer-info">
        <div className="name">{review.name}</div>
        <div className="meta">
          <span>{review.time}</span>
          <span>•</span>
          <span>Local Guide</span>
        </div>
      </div>
    </div>
    <div className="review-stars">
      {"★".repeat(review.stars)}
    </div>
    <p className="review-text">{review.text}</p>
    <div className="review-service-tag">{review.service}</div>
    {review.reply && (
      <div className="owner-reply">
        <div className="font-bold text-white mb-1">Resposta do proprietário:</div>
        {review.reply}
      </div>
    )}
  </div>
);

const ReviewsSection = ({ reviews }: { reviews: any[] }) => {
  const col1 = reviews.slice(0, 18);
  const col2 = reviews.slice(18, 37);
  const col3 = reviews.slice(37, 55);

  return (
    <section id="reviews" className="reviews-section py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-tag">AVALIAÇÕES</span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl text-white mb-4">O QUE DIZEM SOBRE A ATTIVA DIGITAL</h2>
          <div className="gold-line"></div>

          <div className="rating-overview">
            <div className="rating-score">4.9</div>
            <div className="rating-stars">★★★★★</div>
            <div className="rating-count">55 avaliações no Google</div>
            <div className="rating-bars">
              <div className="bar-row"><span>5★</span><div className="bar"><div className="fill" style={{ width: '92%' }}></div></div><span>51</span></div>
              <div className="bar-row"><span>4★</span><div className="bar"><div className="fill" style={{ width: '6%' }}></div></div><span>3</span></div>
              <div className="bar-row"><span>3★</span><div className="bar"><div className="fill" style={{ width: '2%' }}></div></div><span>1</span></div>
              <div className="bar-row"><span>2★</span><div className="bar"><div className="fill" style={{ width: '0%' }}></div></div><span>0</span></div>
              <div className="bar-row"><span>1★</span><div className="bar"><div className="fill" style={{ width: '0%' }}></div></div><span>0</span></div>
            </div>
            <div className="google-badge">
              <svg viewBox="0 0 24 24" width="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span>Google Reviews</span>
            </div>
          </div>
        </div>

        <div className="reviews-track">
          <div className="reviews-column" style={{ '--speed': '35s' } as any}>
            {[...col1, ...col1].map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
          <div className="reviews-column" style={{ '--speed': '42s' } as any}>
            {[...col2, ...col2].map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
          <div className="reviews-column" style={{ '--speed': '38s' } as any}>
            {[...col3, ...col3].map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>

        <div className="reviews-footer">
          <a href="https://g.page/attivadigital/review" target="_blank" rel="noopener noreferrer" className="btn-google-review">
            <svg viewBox="0 0 24 24" width="18" className="mr-2"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Deixe sua avaliação no Google
          </a>
          <a href="https://www.google.com/maps/search/attiva+digital+curitiba" target="_blank" rel="noopener noreferrer" className="btn-see-all">
            Ver todas as avaliações →
          </a>
        </div>
      </div>
    </section>
  );
};

const InstagramFeed = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <section id="instagram" className="py-24 md:py-32 bg-zinc-900/30 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.header 
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 100, scale: 0.8, rotate: -5 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gold-primary text-black text-base font-bold mb-5">
            <Instagram className="h-5 w-5" />
            <span>@attiva.digital</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl text-white mb-5">
            Siga no <span className="text-gold-primary">Instagram</span>
          </h2>
          <div className="gold-line"></div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 120, scale: 0.9, rotate: 2 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: "circOut" }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-zinc-800 bg-black relative h-[280px] md:h-[550px]">
            <iframe
              src="https://www.instagram.com/attiva.digital/embed"
              title="Feed do Instagram"
              width="100%"
              height="280"
              frameBorder="0"
              scrolling="no"
              className="w-full h-full block bg-black"
              style={{ background: 'black' }}
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
        >
          <a href="https://www.instagram.com/attiva.digital/" 
             target="_blank" rel="noopener noreferrer"
             className="btn-gold inline-flex items-center gap-2 text-black font-bold text-lg px-8 py-4 rounded-lg">
            <Instagram className="h-6 w-6" />
            Seguir no Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, delay, onClick }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 100, scale: 0.8, rotate: -2 }}
    whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.9, delay, ease: "circOut" }}
    onClick={onClick}
    className="bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-zinc-800 hover:border-gold-primary transition-all duration-500 group cursor-pointer hover:-translate-y-3 flex flex-col h-full"
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
        className="bg-zinc-900 border border-gold-primary/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-3xl p-6 md:p-12 relative shadow-[0_0_50px_rgba(201,168,76,0.2)]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="md:w-1/3">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
              <service.icon className="w-8 h-8 md:w-10 md:h-10 text-gold-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display text-white mb-4">{service.title}</h2>
            <p className="text-gold-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-6 md:mb-8">Resultados Esperados: {service.results}</p>
            
            <button 
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o serviço: ${service.title}`)}`, '_blank')}
              className="w-full btn-gold py-4 rounded-xl text-xs md:text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Solicitar Orçamento
            </button>
          </div>

          <div className="md:w-2/3 space-y-6 md:space-y-8">
            <div>
              <h4 className="text-white font-heading font-bold mb-3 md:mb-4 uppercase tracking-widest text-[10px] md:text-sm border-l-2 border-gold-primary pl-4">Visão Geral</h4>
              <p className="text-ink-silver leading-relaxed text-sm md:text-base elderly-friendly-text">{service.fullText}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h4 className="text-white font-heading font-bold mb-3 md:mb-4 uppercase tracking-widest text-[10px] md:text-sm border-l-2 border-gold-primary pl-4">O que inclui</h4>
                <ul className="space-y-2">
                  {service.items.map((item: string, i: number) => (
                    <li key={i} className="text-ink-silver text-xs md:text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gold-primary rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-heading font-bold mb-3 md:mb-4 uppercase tracking-widest text-[10px] md:text-sm border-l-2 border-gold-primary pl-4">Diferenciais</h4>
                <ul className="space-y-2">
                  {service.differentiators.map((item: string, i: number) => (
                    <li key={i} className="text-ink-silver text-xs md:text-sm flex items-center gap-2">
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
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "image": `https://picsum.photos/seed/${project.title.toLowerCase().replace(/\s+/g, '-')}/800/600`,
    "author": {
      "@type": "Organization",
      "name": "Attiva Digital"
    },
    "keywords": project.tags.join(", "),
    "about": project.category
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <motion.div 
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        className="bg-zinc-950 border border-gold-primary/40 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-[2.5rem] p-6 md:p-16 relative shadow-[0_0_100px_rgba(201,168,76,0.15)]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-white/30 hover:text-gold-primary hover:bg-white/5 rounded-full transition-all hover:rotate-90"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-6 md:space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1 rounded-full bg-gold-primary/10 border border-gold-primary/20 text-gold-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">
                <project.icon size={14} /> {project.category}
              </div>
              <h2 className="text-3xl md:text-6xl font-display text-white leading-tight mb-4 md:mb-6">{project.title}</h2>
              <p className="text-ink-silver text-base md:text-lg leading-relaxed opacity-80">{project.description}</p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 mb-1 md:mb-2">Resultado Principal</div>
              <div className="text-3xl md:text-5xl font-display text-gold-primary">{project.result}</div>
              <div className="mt-3 md:mt-4 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-gold-dark via-gold-primary to-gold-light"
                />
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] md:text-sm">Estratégia Aplicada</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-zinc-900 border border-zinc-800 text-ink-silver text-[10px] md:text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Ray-X & Timeline */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <div className="relative p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-zinc-900/30 border border-zinc-800 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <project.icon size={200} />
              </div>
              
              <h4 className="text-gold-primary font-display text-xl md:text-2xl mb-6 md:mb-8 flex items-center gap-3">
                <TrendingIcon size={24} /> Raio-X de Crescimento
              </h4>

              <div className="relative space-y-8 md:space-y-12 pl-6 md:pl-8 border-l border-zinc-800">
                {project.timeline.map((item: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -left-[33px] md:-left-[41px] top-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-zinc-950 border-2 border-gold-primary flex items-center justify-center">
                      <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gold-primary animate-pulse" />
                    </div>
                    <div className="text-[10px] font-bold text-gold-primary/60 uppercase tracking-tighter mb-1">{item.period}</div>
                    <div className="text-lg md:text-xl font-heading font-bold text-white mb-2">{item.event}</div>
                    <div className="text-ink-silver text-xs md:text-sm opacity-60 leading-relaxed">{item.impact}</div>
                    
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
                        <div className="text-gold-primary font-mono text-[10px] md:text-xs font-bold">+{item.growth}%</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gold-primary/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gold-primary/20">
              <h4 className="text-white font-bold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                <Lightbulb size={18} className="text-gold-primary" /> Insight da Agência
              </h4>
              <p className="text-ink-silver text-xs md:text-sm italic leading-relaxed">
                "{project.insight}"
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
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

const reviews = [
    // ─── COLUNA 1 (18 reviews) ───
    {
      name: "Marcos Oliveira",
      avatar: "MO", color: "#4285F4",
      stars: 5, time: "há 2 semanas",
      service: "Criação de Site",
      text: "Excelente trabalho da equipe Attiva Digital! O site ficou incrível, profissional e muito rápido. Superaram todas as minhas expectativas. Recomendo para qualquer empresa que queira se destacar online.",
      reply: "Obrigado, Marcos! Foi um prazer trabalhar com você. 🚀"
    },
    {
      name: "Camila Ferreira",
      avatar: "CF", color: "#34A853",
      stars: 5, time: "há 1 mês",
      service: "Gestão de Redes Sociais",
      text: "Nossa página cresceu mais de 10 mil seguidores em 5 meses! O conteúdo é estratégico, criativo e engaja de verdade. A equipe é super atenciosa e sempre disponível."
    },
    {
      name: "Roberto Santos",
      avatar: "RS", color: "#EA4335",
      stars: 5, time: "há 3 semanas",
      service: "Sistema Web",
      text: "O sistema que desenvolveram para nossa empresa automatizou processos que antes levavam horas. ROI veio em menos de 2 meses. Profissionalismo impecável do início ao fim."
    },
    {
      name: "Ana Paula Lima",
      avatar: "AL", color: "#FBBC05",
      stars: 5, time: "há 2 meses",
      service: "Tráfego Pago",
      text: "Resultados surpreendentes! Custo por lead caiu 60% e o volume de contatos triplicou. Muito satisfeita com a transparência e os relatórios detalhados que recebo semanalmente."
    },
    {
      name: "Diego Mendes",
      avatar: "DM", color: "#9C27B0",
      stars: 5, time: "há 1 semana",
      service: "Criação de Site",
      text: "Site entregue no prazo, dentro do orçamento e com qualidade que impressiona. Já recebi vários elogios de clientes. Nota 10 para toda a equipe da Attiva Digital!"
    },
    {
      name: "Fernanda Costa",
      avatar: "FC", color: "#00BCD4",
      stars: 5, time: "há 1 mês",
      service: "SEO & Indexação",
      text: "Em 3 meses aparecemos na primeira página do Google para as palavras-chave mais importantes do nosso segmento. Tráfego orgânico cresceu 300%. Trabalho sério e consistente."
    },
    {
      name: "Paulo Rodrigues",
      avatar: "PR", color: "#FF5722",
      stars: 5, time: "há 3 meses",
      service: "Consultoria Digital",
      text: "A consultoria foi um divisor de águas para o nosso negócio. Identificaram oportunidades que não estávamos enxergando e criaram um plano claro e executável. Vale cada centavo!"
    },
    {
      name: "Juliana Machado",
      avatar: "JM", color: "#607D8B",
      stars: 5, time: "há 2 semanas",
      service: "Loja Virtual",
      text: "Nossa loja virtual ficou incrível! Design profissional, checkout simples e integração perfeita com os meios de pagamento. As vendas online cresceram 180% no primeiro mês."
    },
    {
      name: "Carlos Eduardo",
      avatar: "CE", color: "#4285F4",
      stars: 5, time: "há 5 meses",
      service: "Gestão de Redes Sociais",
      text: "Profissionalismo e criatividade de alto nível. Cada post é pensado estrategicamente. Minha marca ganhou autoridade no mercado local de Curitiba. Super recomendo!"
    },
    {
      name: "Larissa Alves",
      avatar: "LA", color: "#34A853",
      stars: 5, time: "há 1 semana",
      service: "App Mobile",
      text: "O aplicativo que desenvolveram para nós é intuitivo, rápido e com visual moderno. Os clientes adoraram! Avaliação 4.8 na App Store logo no lançamento. Equipe excepcional."
    },
    {
      name: "Thiago Pereira",
      avatar: "TP", color: "#EA4335",
      stars: 5, time: "há 4 meses",
      service: "Tráfego Pago",
      text: "Campanhas otimizadas e gerenciadas com total transparência. ROAS de 4.2x no primeiro mês e melhoring todo mês. São especialistas de verdade em performance digital."
    },
    {
      name: "Beatriz Nunes",
      avatar: "BN", color: "#FBBC05",
      stars: 5, time: "há 2 meses",
      service: "Criação de Site",
      text: "Atendimento personalizado e cuidadoso em cada etapa. O site ficou exatamente como eu idealizei — até melhor! Carregamento super rápido e ótima experiência no celular."
    },
    {
      name: "Gustavo Lima",
      avatar: "GL", color: "#9C27B0",
      stars: 5, time: "há 3 semanas",
      service: "SEO & Indexação",
      text: "Estávamos invisíveis no Google. Em 4 meses, 3 das nossas principais palavras-chave estão no top 5. O volume de ligações do Google aumentou 4x. Resultado concreto!"
    },
    {
      name: "Rafaela Souza",
      avatar: "RS", color: "#00BCD4",
      stars: 5, time: "há 6 meses",
      service: "Gestão de Redes Sociais",
      text: "Finalmente uma agência que realmente entende de redes sociais e não fica só repostando frases motivacionais. Conteúdo com estratégia real, engajamento e crescimento de audiência."
    },
    {
      name: "Anderson Martins",
      avatar: "AM", color: "#FF5722",
      stars: 5, time: "há 1 mês",
      service: "Sistema Web",
      text: "Sistema entregue com toda a funcionalidade que precisávamos e mais. O processo foi organizado, com sprints semanais e feedback constante. Time técnico muito competente."
    },
    {
      name: "Patrícia Gonçalves",
      avatar: "PG", color: "#607D8B",
      stars: 5, time: "há 2 semanas",
      service: "Loja Virtual",
      text: "E-commerce completo, integrado com marketplace e com painel de gestão intuitivo. Minhas vendas online já superam as presenciais. Investimento que se pagou rapidamente."
    },
    {
      name: "Leandro Castro",
      avatar: "LC", color: "#4285F4",
      stars: 5, time: "há 3 meses",
      service: "Consultoria Digital",
      text: "A consultoria trouxe clareza total para nossa estratégia digital. Saímos da reunião com um roadmap completo e já vemos resultados nos primeiros 60 dias de implementação."
    },
    {
      name: "Vanessa Torres",
      avatar: "VT", color: "#34A853",
      stars: 5, time: "há 4 semanas",
      service: "Criação de Site",
      text: "Desde o briefing até a entrega, tudo foi conduzido com muita profissionalidade. O site é lindo, responsivo e perfeito em todos os dispositivos. Já recebi vários leads por ele!"
    },
  
    // ─── COLUNA 2 (19 reviews) ───
    {
      name: "Henrique Barros",
      avatar: "HB", color: "#EA4335",
      stars: 5, time: "há 2 meses",
      service: "Tráfego Pago",
      text: "Minha campanha no Meta Ads estava queimando dinheiro antes da Attiva. Eles reestruturaram tudo e em 30 dias o custo por resultado caiu pela metade com o dobro de volume."
    },
    {
      name: "Simone Araújo",
      avatar: "SA", color: "#FBBC05",
      stars: 5, time: "há 1 semana",
      service: "SEO & Indexação",
      text: "Aparecemos no Google Maps como primeira opção na nossa região. O número de clientes que chegam dizendo que nos encontraram no Google triplicou. Trabalho excepcional!"
    },
    {
      name: "Fábio Cardoso",
      avatar: "FC", color: "#9C27B0",
      stars: 5, time: "há 5 meses",
      service: "App Mobile",
      text: "App desenvolvido com qualidade de startup de alto nível. UX impecável, sem bugs, integração com nosso sistema legado funcionando perfeitamente. Entrega antes do prazo!"
    },
    {
      name: "Mônica Ribeiro",
      avatar: "MR", color: "#00BCD4",
      stars: 5, time: "há 3 semanas",
      service: "Gestão de Redes Sociais",
      text: "O conteúdo que produzem para a nossa clínica é educativo, humanizado e altamente engajador. Crescemos organicamente sem precisar impulsionar posts. Estratégia inteligente."
    },
    {
      name: "Rodrigo Freitas",
      avatar: "RF", color: "#FF5722",
      stars: 5, time: "há 2 meses",
      service: "Sistema Web",
      text: "Portal de gestão desenvolvido do zero, com todas as funcionalidades que precisávamos. Interface bonita e fácil de usar. A equipe foi parceira em todo o processo."
    },
    {
      name: "Isabela Moura",
      avatar: "IM", color: "#607D8B",
      stars: 5, time: "há 1 mês",
      service: "Criação de Site",
      text: "Super atenciosos e criativos! O site reflete perfeitamente a identidade da nossa marca. Rápido, seguro com certificado SSL e otimizado para celular. Amei o resultado!"
    },
    {
      name: "Alessandro Vieira",
      avatar: "AV", color: "#4285F4",
      stars: 5, time: "há 6 semanas",
      service: "Loja Virtual",
      text: "Loja virtual entregue em tempo recorde, com integração completa. Design que converte e experiência de compra fluida. As métricas de abandono de carrinho caíram 40%."
    },
    {
      name: "Carina Duarte",
      avatar: "CD", color: "#34A853",
      stars: 5, time: "há 2 semanas",
      service: "Tráfego Pago",
      text: "Gerenciam nossas campanhas com muita atenção e estratégia. Relatórios claros, reuniões mensais produtivas e resultados crescendo mês a mês. Parceria de longo prazo!"
    },
    {
      name: "Marcelo Pinto",
      avatar: "MP", color: "#EA4335",
      stars: 5, time: "há 4 meses",
      service: "Consultoria Digital",
      text: "Diagnóstico preciso e plano de ação realista. Não prometem o impossível — entregam o que é combinado e às vezes superam. Referência em consultoria digital em Curitiba."
    },
    {
      name: "Tatiane Lopes",
      avatar: "TL", color: "#FBBC05",
      stars: 5, time: "há 3 semanas",
      service: "SEO & Indexação",
      text: "Investimos em SEO com a Attiva e o retorno superou todas as expectativas. Hoje 70% dos nossos leads vêm do Google organicamente. Melhor investimento de marketing que fizemos."
    },
    {
      name: "Wellington Cruz",
      avatar: "WC", color: "#9C27B0",
      stars: 5, time: "há 1 mês",
      service: "Gestão de Redes Sociais",
      text: "A equipe entende profundamente cada plataforma e adapta o conteúdo para cada uma. Resultado: engajamento real, seguidores qualificados e crescimento consistente todo mês."
    },
    {
      name: "Nádia Santos",
      avatar: "NS", color: "#00BCD4",
      stars: 5, time: "há 5 semanas",
      service: "Criação de Site",
      text: "O prazo foi respeitado, o orçamento mantido e a qualidade entregue foi além do que eu esperava. O suporte pós-entrega é excelente. Recomendo sem hesitar!"
    },
    {
      name: "Edmilson Rocha",
      avatar: "ER", color: "#FF5722",
      stars: 5, time: "há 7 meses",
      service: "App Mobile",
      text: "Desenvolveram nosso app com atenção a cada detalhe. Processo transparente com entregas semanais para acompanhar. Resultado final ficou melhor do que o protótipo!"
    },
    {
      name: "Priscila Melo",
      avatar: "PM", color: "#607D8B",
      stars: 5, time: "há 2 meses",
      service: "Tráfego Pago",
      text: "Primeira agência que realmente me explicou o que estava sendo feito nas campanhas. Sem enrolação, focados em resultado. Meu faturamento online cresceu 120% em 4 meses."
    },
    {
      name: "Davi Correia",
      avatar: "DC", color: "#4285F4",
      stars: 5, time: "há 1 mês",
      service: "Loja Virtual",
      text: "E-commerce robusto com painel de admin completo. Integração com Mercado Pago, PicPay e boleto funcionando perfeitamente. Design moderno e taxas de conversão excelentes."
    },
    {
      name: "Letícia Campos",
      avatar: "LC", color: "#34A853",
      stars: 5, time: "há 3 meses",
      service: "Gestão de Redes Sociais",
      text: "Em 4 meses nossa comunidade no Instagram virou referência no nosso nicho. Conteúdo autêntico, estratégico e que realmente conecta com o público. Resultado excepcional!"
    },
    {
      name: "Fábio Nascimento",
      avatar: "FN", color: "#EA4335",
      stars: 5, time: "há 6 semanas",
      service: "SEO & Indexação",
      text: "Aparecer na primeira posição do Google para a nossa cidade mudou completamente o volume de clientes. A Attiva Digital sabe o que está fazendo. Investimento que vale muito!"
    },
    {
      name: "Claudia Moraes",
      avatar: "CM", color: "#FBBC05",
      stars: 5, time: "há 2 semanas",
      service: "Sistema Web",
      text: "Sistema de agendamento online que nossos clientes adoraram. Integração com WhatsApp, notificações automáticas e relatórios inteligentes. Reduziu nosso trabalho operacional em 60%."
    },
    {
      name: "Bruno Azevedo",
      avatar: "BA", color: "#9C27B0",
      stars: 5, time: "há 1 mês",
      service: "Consultoria Digital",
      text: "A consultoria da Attiva mudou a visão do nosso time sobre marketing digital. Saímos com um playbook completo e já vemos os resultados nas primeiras semanas de execução."
    },
  
    // ─── COLUNA 3 (18 reviews) ───
    {
      name: "Renata Oliveira",
      avatar: "RO", color: "#00BCD4",
      stars: 5, time: "há 3 meses",
      service: "Criação de Site",
      text: "Site desenvolvido com muito cuidado e atenção à nossa identidade visual. Carrega em menos de 2 segundos e é lindo em qualquer dispositivo. Recebi elogios de todos!"
    },
    {
      name: "Sérgio Batista",
      avatar: "SB", color: "#FF5722",
      stars: 5, time: "há 1 semana",
      service: "Tráfego Pago",
      text: "Gerenciamento profissional das campanhas com foco em resultado real. Eles não ficam jogando desculpas — identificam o problema e ajustam rapidamente. Nota máxima!"
    },
    {
      name: "Cristiane Dias",
      avatar: "CD", color: "#607D8B",
      stars: 5, time: "há 2 meses",
      service: "Gestão de Redes Sociais",
      text: "Minha farmácia nunca teve tanto reconhecimento local. As redes sociais viraram uma fonte real de clientes novos. O trabalho da Attiva é diferenciado e comprometido."
    },
    {
      name: "Nilson Ferreira",
      avatar: "NF", color: "#4285F4",
      stars: 5, time: "há 4 meses",
      service: "Loja Virtual",
      text: "E-commerce entregue com integração total com nosso estoque físico. A sincronização em tempo real evita vender produto sem estoque. Solução técnica impecável!"
    },
    {
      name: "Adriana Mendes",
      avatar: "AM", color: "#34A853",
      stars: 5, time: "há 3 semanas",
      service: "SEO & Indexação",
      text: "Saímos da 8ª página do Google para a 1ª posição em 5 meses. O crescimento de tráfego orgânico é consistente mês a mês. Excelente trabalho técnico e estratégico!"
    },
    {
      name: "Leonardo Barros",
      avatar: "LB", color: "#EA4335",
      stars: 5, time: "há 1 mês",
      service: "App Mobile",
      text: "App desenvolvido com qualidade premium. Testaram em múltiplos dispositivos e entregaram sem nenhum bug. Suporte pós-lançamento ágil e eficiente. Muito satisfeito!"
    },
    {
      name: "Elaine Carvalho",
      avatar: "EC", color: "#FBBC05",
      stars: 5, time: "há 5 semanas",
      service: "Consultoria Digital",
      text: "Diagnóstico digital completo e muito preciso. Identificaram gargalos que não estávamos percebendo e deram um plano claro com prioridades. Nossa eficiência digital triplicou."
    },
    {
      name: "Marcos Teixeira",
      avatar: "MT", color: "#9C27B0",
      stars: 5, time: "há 2 meses",
      service: "Criação de Site",
      text: "Processo de desenvolvimento bem estruturado com entregas parciais para validação. O resultado final superou o briefing. Site lindo e que já gerou novos clientes!"
    },
    {
      name: "Gisele Cunha",
      avatar: "GC", color: "#00BCD4",
      stars: 5, time: "há 1 semana",
      service: "Tráfego Pago",
      text: "A gestão das campanhas é impecável. Eles testam criativos, públicos e placements constantemente para otimizar resultados. Meu ROAS saiu de 1.8x para 5.2x em 3 meses!"
    },
    {
      name: "Vitor Lemos",
      avatar: "VL", color: "#FF5722",
      stars: 5, time: "há 3 meses",
      service: "Sistema Web",
      text: "CRM desenvolvido especificamente para nosso processo comercial. A produtividade do time de vendas aumentou 40% com a automação de tarefas repetitivas. Projeto incrível!"
    },
    {
      name: "Amanda Fonseca",
      avatar: "AF", color: "#607D8B",
      stars: 5, time: "há 6 semanas",
      service: "Gestão de Redes Sociais",
      text: "Equipe criativa, responsiva e com muito domínio das plataformas. Cada campanha é pensada estrategicamente. Os resultados são visíveis e mensuráveis. Top demais!"
    },
    {
      name: "Nelson Rodrigues",
      avatar: "NR", color: "#4285F4",
      stars: 5, time: "há 4 meses",
      service: "SEO & Indexação",
      text: "Métricas de SEO crescendo consistentemente há 6 meses. Posicionamento nos buscadores melhorou para todas as keywords trabalhadas. Trabalho técnico de altíssima qualidade."
    },
    {
      name: "Juliana Pereira",
      avatar: "JP", color: "#34A853",
      stars: 5, time: "há 2 semanas",
      service: "Loja Virtual",
      text: "Nossa loja virtual passou a representar 45% do faturamento total em apenas 3 meses. O design é lindo e a experiência de compra é impecável. Investimento que valeu muito!"
    },
    {
      name: "Eduardo Lima",
      avatar: "EL", color: "#EA4335",
      stars: 5, time: "há 1 mês",
      service: "Criação de Site",
      text: "Site institucional profissional que transmite credibilidade desde o primeiro acesso. Nossos clientes corporativos comentam a qualidade. Representou um salto de imagem enorme!"
    },
    {
      name: "Sandra Costa",
      avatar: "SC", color: "#FBBC05",
      stars: 5, time: "há 5 meses",
      service: "Consultoria Digital",
      text: "A consultoria nos mostrou que estávamos investindo nos canais errados. Com o redirecionamento estratégico, o custo de aquisição caiu 45% e os leads qualificados triplicaram."
    },
    {
      name: "Rodrigo Almeida",
      avatar: "RA", color: "#9C27B0",
      stars: 5, time: "há 3 semanas",
      service: "Tráfego Pago",
      text: "Profissionais que dominam Google Ads e Meta Ads com profundidade. Segmentação cirúrgica e criativos de alta conversão. Resultados que eu não conseguia nem com outras agências."
    },
    {
      name: "Daniela Ribeiro",
      avatar: "DR", color: "#00BCD4",
      stars: 5, time: "há 2 meses",
      service: "App Mobile",
      text: "App para delivery da nossa rede de restaurantes funcionando perfeitamente. Integração com sistema de gestão, notificações push e painel admin completo. Excelente parceria!"
    },
    {
      name: "Claudio Matos",
      avatar: "CM", color: "#FF5722",
      stars: 5, time: "há 1 semana",
      service: "Gestão de Redes Sociais",
      text: "A presença digital da nossa empresa nunca foi tão forte. Conteúdo consistente, identidade visual impecável e engajamento crescendo todo mês. Parceria que renovo sempre!"
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
      id: "lux-residences",
      title: "Lux Residences",
      category: "Imobiliário de Luxo",
      description: "Plataforma de vendas para empreendimentos de alto padrão com tour virtual e agendamento inteligente.",
      image: "https://picsum.photos/seed/luxury/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" fill="#0A0A0A" />
          <path d="M100 220V80H300V220" stroke="#C9A84C" strokeWidth="2" />
          <path d="M150 80V60H250V80" stroke="#C9A84C" strokeWidth="2" />
          <rect x="140" y="110" width="40" height="40" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <rect x="220" y="110" width="40" height="40" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <rect x="140" y="170" width="40" height="40" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <rect x="220" y="170" width="40" height="40" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <path d="M190 220V180H210V220" stroke="#C9A84C" strokeWidth="2" />
          <circle cx="200" cy="40" r="10" stroke="#C9A84C" strokeWidth="1" />
        </svg>
      ),
      results: "Venda de 80% das unidades em apenas 3 meses de lançamento digital.",
      tech: ["React", "Node.js", "Three.js", "Google Ads"],
      timeline: [
        { period: "Mês 01", event: "Lançamento", impact: "10k acessos únicos no primeiro dia.", growth: 0 },
        { period: "Mês 02", event: "Escala", impact: "Custo por lead reduzido em 35%.", growth: 150 },
        { period: "Mês 03", event: "Sucesso", impact: "Recorde de vendas histórico da construtora.", growth: 400 }
      ]
    },
    {
      id: "bio-saude",
      title: "BioSaúde Portal",
      category: "Saúde & Bem-estar",
      description: "Ecossistema digital para agendamento de consultas e telemedicina com foco em UX humanizada.",
      image: "https://picsum.photos/seed/health/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" fill="#0A0A0A" />
          <circle cx="200" cy="140" r="80" stroke="#C9A84C" strokeWidth="2" />
          <path d="M200 90V190M150 140H250" stroke="#C9A84C" strokeWidth="8" strokeLinecap="round" />
          <path d="M120 140Q120 100 200 100Q280 100 280 140" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
          <circle cx="200" cy="140" r="100" stroke="#C9A84C" strokeWidth="1" strokeDasharray="10 10" opacity="0.2" />
        </svg>
      ),
      results: "Redução de 60% nas faltas às consultas através de sistema de notificações inteligente.",
      tech: ["Next.js", "Firebase", "Tailwind CSS", "WhatsApp API"],
      timeline: [
        { period: "Mês 01", event: "MVP", impact: "Primeiros 500 agendamentos online.", growth: 0 },
        { period: "Mês 04", event: "Expansão", impact: "Integração com 15 novas clínicas.", growth: 300 },
        { period: "Mês 08", event: "Liderança", impact: "Maior portal de saúde da região sul.", growth: 800 }
      ]
    },
    {
      id: "agro-smart",
      title: "AgroSmart Dash",
      category: "Agronegócio",
      description: "Dashboard de inteligência de dados para monitoramento de safras e previsão de mercado.",
      image: "https://picsum.photos/seed/agro/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" fill="#0A0A0A" />
          <path d="M50 230H350" stroke="#C9A84C" strokeWidth="2" />
          <path d="M80 230V180M140 230V120M200 230V150M260 230V80M320 230V110" stroke="#C9A84C" strokeWidth="20" opacity="0.6" />
          <path d="M80 180L140 120L200 150L260 80L320 110" stroke="#C9A84C" strokeWidth="3" />
          <circle cx="260" cy="80" r="8" fill="#C9A84C" />
          <path d="M50 50L350 230" stroke="#C9A84C" strokeWidth="1" opacity="0.1" />
        </svg>
      ),
      results: "Otimização de 25% na margem de lucro dos produtores através de dados preditivos.",
      tech: ["Python", "React", "D3.js", "AWS"],
      timeline: [
        { period: "Mês 01", event: "Data Sync", impact: "Conexão com 100 sensores de campo.", growth: 0 },
        { period: "Mês 06", event: "AI Insights", impact: "Previsão de safra com 95% de acerto.", growth: 250 },
        { period: "Mês 12", event: "Escala", impact: "Gestão de mais de 500 mil hectares.", growth: 600 }
      ]
    },
    {
      id: "fin-elite",
      title: "FinElite App",
      category: "Fintech",
      description: "Aplicativo de investimentos para o público ultra-high-net-worth com segurança bancária.",
      image: "https://picsum.photos/seed/finance/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" fill="#0A0A0A" />
          <rect x="130" y="40" width="140" height="200" rx="20" stroke="#C9A84C" strokeWidth="2" />
          <path d="M150 100H250M150 140H210M150 180H230" stroke="#C9A84C" strokeWidth="2" opacity="0.5" />
          <circle cx="200" cy="215" r="10" stroke="#C9A84C" strokeWidth="1" />
          <path d="M200 70C230 70 250 90 250 120" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
          <circle cx="200" cy="140" r="40" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
        </svg>
      ),
      results: "Mais de R$ 500 milhões em ativos sob gestão transacionados via plataforma.",
      tech: ["React Native", "Go", "PostgreSQL", "Biometria"],
      timeline: [
        { period: "Mês 01", event: "Security Audit", impact: "Aprovação em todos os protocolos bancários.", growth: 0 },
        { period: "Mês 05", event: "Beta VIP", impact: "1.000 usuários selecionados convidados.", growth: 100 },
        { period: "Mês 10", event: "Open Market", impact: "Crescimento de 400% na base de usuários.", growth: 400 }
      ]
    },
    {
      id: "edu-connect",
      title: "EduConnect",
      category: "Educação Digital",
      description: "LMS (Learning Management System) gamificado para grandes corporações e treinamentos.",
      image: "https://picsum.photos/seed/education/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" fill="#0A0A0A" />
          <path d="M100 100L200 50L300 100V200H100V100Z" stroke="#C9A84C" strokeWidth="2" />
          <path d="M100 100L200 150L300 100" stroke="#C9A84C" strokeWidth="2" />
          <circle cx="200" cy="110" r="30" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
          <path d="M160 200V230M240 200V230" stroke="#C9A84C" strokeWidth="2" />
          <rect x="140" y="230" width="120" height="10" fill="#C9A84C" opacity="0.5" />
        </svg>
      ),
      results: "Aumento de 75% no engajamento dos colaboradores nos treinamentos internos.",
      tech: ["Vue.js", "Laravel", "Redis", "Socket.io"],
      timeline: [
        { period: "Mês 01", event: "Curriculum Design", impact: "Estruturação de 50 cursos iniciais.", growth: 0 },
        { period: "Mês 06", event: "Gamification", impact: "Taxa de conclusão subiu para 90%.", growth: 200 },
        { period: "Mês 12", event: "Global Rollout", impact: "Uso em 5 países simultaneamente.", growth: 500 }
      ]
    },
    {
      id: "log-master",
      title: "LogMaster AI",
      category: "Logística & Transportes",
      description: "Sistema de roteirização inteligente que utiliza IA para reduzir custos de frete.",
      image: "https://picsum.photos/seed/logistics/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" fill="#0A0A0A" />
          <path d="M80 140H320M200 60V220" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
          <rect x="100" y="100" width="60" height="40" stroke="#C9A84C" strokeWidth="2" />
          <rect x="240" y="140" width="60" height="40" stroke="#C9A84C" strokeWidth="2" />
          <path d="M160 120C200 120 200 160 240 160" stroke="#C9A84C" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="160" cy="120" r="4" fill="#C9A84C" />
          <circle cx="240" cy="160" r="4" fill="#C9A84C" />
        </svg>
      ),
      results: "Economia de R$ 1.2M anuais em combustível para frota de 200 veículos.",
      tech: ["Python", "TensorFlow", "Google Maps API", "React"],
      timeline: [
        { period: "Mês 01", event: "Prototipagem", impact: "Validação de interface com 50 motoristas reais.", growth: 0 },
        { period: "Mês 06", event: "Rollout Nacional", impact: "Redução de 15% no consumo de combustível.", growth: 200 },
        { period: "Mês 12", event: "Otimização Total", impact: "Eficiência logística da frota cresceu 500%.", growth: 500 }
      ]
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
      description: "Otimização de campanhas de tráfego pago focada em conversão qualificada.",
      chartData: [100, 95, 85, 80, 70, 65, 60, 55, 50, 45, 40, 35]
    },
    {
      title: "Retorno sobre Investimento (ROI)",
      metric: "12.5x",
      description: "Média de retorno para e-commerces e negócios locais de alto padrão.",
      chartData: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 12.5]
    }
  ];

const blogPosts = [
    {
      id: "seo-ia-2026",
      title: "O Futuro do SEO em 2026: IA e Busca Semântica",
      category: "SEO",
      date: "15 Mar 2026",
      author: "Leonardo Santana",
      excerpt: "Como as novas atualizações do Google estão priorizando a intenção do usuário e o conteúdo gerado por especialistas.",
      image: "https://picsum.photos/seed/seo/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="140" r="100" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
          <circle cx="200" cy="140" r="60" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
          <g className="neural-nodes">
            <circle className="neural-node" cx="200" cy="140" r="8" fill="#C9A84C" />
            <circle className="neural-node" cx="120" cy="100" r="6" fill="#C9A84C" />
            <circle className="neural-node" cx="280" cy="100" r="6" fill="#C9A84C" />
            <circle className="neural-node" cx="120" cy="180" r="6" fill="#C9A84C" />
            <circle className="neural-node" cx="280" cy="180" r="6" fill="#C9A84C" />
          </g>
          <path className="flow-line" d="M200 140 L120 100 M200 140 L280 100 M200 140 L120 180 M200 140 L280 180" stroke="#C9A84C" strokeWidth="2" opacity="0.5" />
        </svg>
      ),
      content: `
# O Futuro do SEO em 2026: IA e Busca Semântica

O cenário do SEO está mudando drasticamente com a integração da Inteligência Artificial Generativa nos motores de busca. Em 2026, não basta apenas palavras-chave; o Google agora prioriza a **Intenção do Usuário** e a **Autoridade do Especialista (E-E-A-T)**.

## Como a IA está mudando a busca

A Busca Generativa (SGE) do Google agora responde diretamente às perguntas dos usuários, o que significa que o tráfego informativo puro pode diminuir. No entanto, a necessidade de fontes confiáveis e opiniões de especialistas nunca foi tão alta.

### O que é Busca Semântica?

A busca semântica foca no significado por trás das palavras, não apenas nas palavras em si. O Google tenta entender o contexto da pesquisa para entregar o resultado mais relevante, mesmo que a palavra-chave exata não esteja presente.

### Estratégias para 2026:

1.  **Dados Estruturados Avançados:** Ajude a IA a entender seu conteúdo através de Schema.org.
2.  **Conteúdo de Especialista:** Foque em experiências reais, estudos de caso e opiniões que a IA não pode replicar.
3.  **Otimização para Intenção:** Vá além da palavra-chave e responda ao \"porquê\" do usuário.
4.  **Velocidade e UX:** O Google continua priorizando sites que carregam rápido e oferecem uma ótima experiência.

### Conclusão

A Attiva Digital já está implementando essas estratégias para garantir que nossos clientes permaneçam no topo das buscas, mesmo com as mudanças constantes dos algoritmos. O SEO não morreu, ele apenas evoluiu para algo mais humano e inteligente.
      `,
      keywords: ["SEO 2026", "Inteligência Artificial", "Busca Semântica", "Google SGE", "E-E-A-T"],
      metaDescription: "Descubra como a IA e a busca semântica estão transformando o SEO em 2026 e como sua empresa pode se adaptar para continuar no topo do Google."
    },
    {
      id: "ecommerce-escala-2026",
      title: "5 Estratégias para Escalar seu E-commerce este ano",
      category: "E-commerce",
      date: "10 Mar 2026",
      author: "Leonardo Santana",
      excerpt: "Do checkout em uma página ao remarketing dinâmico: o que realmente funciona para vender mais.",
      image: "https://picsum.photos/seed/ecommerce/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="100" y="80" width="200" height="120" rx="8" stroke="#C9A84C" strokeWidth="2" className="wireframe-box" />
          <path d="M120 110 H280 M120 130 H220 M120 150 H180" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <circle cx="250" cy="160" r="20" fill="#C9A84C" className="pulse-circle" />
          <path d="M240 160 L248 168 L260 152" stroke="black" strokeWidth="3" />
        </svg>
      ),
      content: `
# 5 Estratégias para Escalar seu E-commerce este ano

Escalar um e-commerce exige mais do que apenas tráfego; exige conversão e retenção. Aqui estão as 5 estratégias que estão trazendo resultados reais para nossos clientes em 2026.

## 1. Checkout em Uma Página (One-Page Checkout)

Reduza o atrito. Quanto menos cliques entre o carrinho e a confirmação de pagamento, maior a sua taxa de conversão. O checkout em uma página simplifica o processo e diminui o abandono de carrinho.

## 2. Remarketing Dinâmico com IA

Não mostre apenas o produto que o cliente viu. Use IA para mostrar produtos complementares ou ofertas personalizadas baseadas no comportamento de navegação.

## 3. Prova Social em Tempo Real

Exibir notificações de \"Alguém acabou de comprar este item\" ou avaliações recentes cria urgência e confiança imediata.

## 4. Otimização para Mobile-First

Em 2026, mais de 80% das compras online são feitas via smartphone. Seu site deve ser impecável no mobile, com botões fáceis de clicar e carregamento instantâneo.

## 5. Atendimento via WhatsApp Automatizado

Integre um bot de IA no seu WhatsApp para responder dúvidas frequentes e até fechar vendas 24/7. O toque humano ainda é importante, mas a velocidade da IA no primeiro contato é imbatível.

### Como a Attiva Digital pode ajudar?

Nós somos especialistas em transformar e-commerces comuns em máquinas de vendas de alta performance. Entre em contato para uma consultoria gratuita.
      `,
      keywords: ["E-commerce", "Vendas Online", "Escalabilidade", "Marketing Digital", "Checkout"],
      metaDescription: "Aprenda as 5 estratégias essenciais para escalar seu e-commerce em 2026, desde otimização de checkout até automação de vendas."
    },
    {
      id: "branding-luxo-2026",
      title: "Branding de Luxo: Como posicionar sua marca no topo",
      category: "Branding",
      date: "05 Mar 2026",
      author: "Leonardo Santana",
      excerpt: "A psicologia por trás das marcas de alto padrão e como aplicar esses conceitos no seu negócio digital.",
      image: "https://picsum.photos/seed/luxury/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 60 L260 120 L200 180 L140 120 Z" stroke="#C9A84C" strokeWidth="2" className="diamond-path" />
          <path d="M200 60 V180 M140 120 H260" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
          <circle cx="200" cy="120" r="40" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" />
          <g className="sparkles">
            <circle cx="160" cy="80" r="2" fill="#C9A84C" className="sparkle" />
            <circle cx="240" cy="160" r="2" fill="#C9A84C" className="sparkle" />
            <circle cx="220" cy="70" r="3" fill="#C9A84C" className="sparkle" />
          </g>
        </svg>
      ),
      content: `
# Branding de Luxo: Como posicionar sua marca no topo

O luxo não é sobre preço, é sobre **exclusividade, história e percepção de valor**. No mundo digital, o branding de luxo exige uma estética minimalista e uma comunicação que valoriza o silêncio e a sofisticação.

## A Psicologia do Alto Padrão

Marcas de luxo não vendem produtos; elas vendem pertencimento a um grupo seleto e a realização de desejos aspiracionais.

### Pontos chave para o seu posicionamento:

- **Identidade Visual Impecável:** Onde cada pixel importa.
- **Storytelling Emocional:** Conectando a marca a valores aspiracionais.
- **Experiência do Cliente VIP:** O atendimento digital deve ser tão refinado quanto o presencial.

### Como o Branding afeta o preço:

- **Valor Percebido:** Marcas com design premium podem cobrar mais caro por seus produtos ou serviços.
- **Diferenciação:** Em um mercado saturado, ser visualmente único é a única forma de ser lembrado.
- **Consistência:** Uma marca consistente em todos os pontos de contato gera confiança e fidelidade.

### Conclusão

A Attiva Digital ajuda marcas a construírem essa aura de prestígio, elevando o ticket médio e a fidelidade dos clientes através de um design que respira exclusividade.
      `,
      keywords: ["Branding de Luxo", "Marketing de Alto Padrão", "Posicionamento de Marca", "Design Premium"],
      metaDescription: "Entenda como posicionar sua marca no mercado de luxo digital, utilizando psicologia de consumo e design sofisticado para atrair clientes de alto ticket."
    },
    {
      id: "trafego-pago-vs-organico",
      title: "Tráfego Pago vs Orgânico: Onde investir seu orçamento?",
      category: "Marketing",
      date: "01 Mar 2026",
      author: "Leonardo Santana",
      excerpt: "Um guia completo para equilibrar investimentos de curto e longo prazo para um crescimento sustentável.",
      image: "https://picsum.photos/seed/marketing/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 230 L150 180 L250 120 L350 50" stroke="#C9A84C" strokeWidth="3" className="chart-line-up" />
          <rect x="70" y="180" width="30" height="50" fill="#C9A84C" opacity="0.3" />
          <rect x="170" y="120" width="30" height="110" fill="#C9A84C" opacity="0.5" />
          <rect x="270" y="70" width="30" height="160" fill="#C9A84C" opacity="0.8" />
          <line x1="50" y1="230" x2="350" y2="230" stroke="#C9A84C" strokeWidth="1" />
        </svg>
      ),
      content: `
        O dilema eterno: resultados rápidos com anúncios ou autoridade duradoura com conteúdo orgânico? A resposta curta é: **ambos**, mas com o equilíbrio certo para o seu momento de negócio.

        ## Curto Prazo vs Longo Prazo
        O tráfego pago é como um interruptor: você liga e os leads aparecem. O orgânico é como uma floresta: leva tempo para crescer, mas depois oferece sombra constante.

        ### Quando investir em cada um:
        - **Tráfego Pago:** Ideal para lançamentos, promoções sazonais e validação rápida de ofertas.
        - **SEO e Orgânico:** Essencial para reduzir o custo de aquisição (CAC) ao longo do tempo e construir autoridade.

        Entenda como a Attiva Digital gerencia orçamentos de marketing para maximizar o retorno sobre o investimento (ROI) de forma previsível e escalável, utilizando a estratégia de "Cercamento Digital".
      `,
      keywords: ["Tráfego Pago", "SEO", "Marketing de Conteúdo", "ROI", "Estratégia Digital"],
      metaDescription: "Descubra o equilíbrio ideal entre tráfego pago e orgânico para o seu negócio e como maximizar seu ROI com investimentos inteligentes."
    },
    {
      id: "velocidade-carregamento-conversao",
      title: "A Importância da Velocidade de Carregamento para Conversão",
      category: "Tecnologia",
      date: "25 Fev 2026",
      author: "Leonardo Santana",
      excerpt: "Cada milissegundo conta. Descubra como a performance técnica impacta diretamente no seu faturamento.",
      image: "https://picsum.photos/seed/speed/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="140" r="80" stroke="#C9A84C" strokeWidth="2" strokeDasharray="10 5" />
          <path d="M200 140 L260 100" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" className="clock-hand" />
          <circle cx="200" cy="140" r="5" fill="#C9A84C" />
          <path d="M140 220 Q200 180 260 220" stroke="#C9A84C" strokeWidth="2" fill="none" className="speed-curve" />
        </svg>
      ),
      content: `
        Estudos mostram que um atraso de apenas 1 segundo no carregamento pode reduzir as conversões em até 7%. Em 2026, com conexões 5G e usuários cada vez mais impacientes, a performance técnica é uma questão de sobrevivência.

        ## Core Web Vitals e o Google
        O Google utiliza métricas de velocidade como fator de ranqueamento. Um site lento não apenas afasta o usuário, mas também é "punido" nas buscas.

        ### O que otimizamos na Attiva Digital:
        - **LCP (Largest Contentful Paint):** Tempo de carregamento do conteúdo principal.
        - **FID (First Input Delay):** Interatividade da página.
        - **CLS (Cumulative Layout Shift):** Estabilidade visual.

        Seu site é rápido o suficiente para não perder dinheiro? A Attiva Digital utiliza tecnologias de ponta para garantir que seu site carregue em menos de 2 segundos.
      `,
      keywords: ["Velocidade de Site", "Performance Web", "Core Web Vitals", "Taxa de Conversão"],
      metaDescription: "Saiba como a velocidade de carregamento do seu site afeta suas vendas e o que você pode fazer para otimizar a performance técnica hoje mesmo."
    },
    {
      id: "gestao-redes-sociais-comunidade",
      title: "Gestão de Redes Sociais: Além dos Likes e Seguidores",
      category: "Social Media",
      date: "20 Fev 2026",
      author: "Leonardo Santana",
      excerpt: "Como transformar sua audiência em uma comunidade ativa que defende e promove sua marca organicamente.",
      image: "https://picsum.photos/seed/social/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="140" r="30" fill="#C9A84C" opacity="0.8" />
          <circle cx="120" cy="80" r="20" fill="#C9A84C" opacity="0.4" />
          <circle cx="280" cy="80" r="20" fill="#C9A84C" opacity="0.4" />
          <circle cx="120" cy="200" r="20" fill="#C9A84C" opacity="0.4" />
          <circle cx="280" cy="200" r="20" fill="#C9A84C" opacity="0.4" />
          <path d="M180 120 L135 95 M220 120 L265 95 M180 160 L135 185 M220 160 L265 185" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 2" />
        </svg>
      ),
      content: `
        Likes não pagam boletos. O verdadeiro poder das redes sociais in 2026 está no **Engajamento Profundo** e na construção de comunidades.

        ## De Seguidores a Advogados da Marca
        Uma comunidade ativa não apenas consome seu conteúdo, mas o defende e o compartilha, tornando-se um canal de aquisição orgânica poderosíssimo.

        ### Nossa abordagem estratégica:
        - **Conteúdo Nativo:** Adaptando a mensagem para cada plataforma (TikTok, Reels, LinkedIn).
        - **Gestão de Crise e Atendimento:** Transformando reclamações em fãs através de respostas rápidas e humanas.
        - **Estratégia de Influenciadores:** Conectando sua marca com quem realmente tem voz no seu nicho.

        A Attiva Digital não apenas posta; nós construímos relacionamentos que se traduzem em vendas e lealdade à marca.
      `,
      keywords: ["Redes Sociais", "Engajamento", "Comunidade Digital", "Social Media Strategy"],
      metaDescription: "Aprenda a transformar suas redes sociais em uma comunidade vibrante e engajada que impulsiona suas vendas de forma orgânica."
    },
    {
      id: "revolucao-no-code-2026",
      title: "A Revolução do No-Code em 2026",
      category: "Tecnologia",
      date: "15 Fev 2026",
      author: "Leonardo Santana",
      excerpt: "Como ferramentas de baixo código estão democratizando a criação de software e acelerando a inovação.",
      image: "https://picsum.photos/seed/nocode/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="100" y="60" width="200" height="160" rx="10" stroke="#C9A84C" strokeWidth="2" />
          <rect x="120" y="80" width="160" height="30" rx="5" fill="#C9A84C" opacity="0.3" />
          <rect x="120" y="120" width="70" height="30" rx="5" fill="#C9A84C" opacity="0.5" />
          <rect x="210" y="120" width="70" height="30" rx="5" fill="#C9A84C" opacity="0.5" />
          <rect x="120" y="160" width="160" height="40" rx="5" fill="#C9A84C" opacity="0.8" />
        </svg>
      ),
      content: `
# A Revolução do No-Code em 2026

O desenvolvimento de software não é mais exclusividade de programadores experientes. Em 2026, as ferramentas **No-Code** e **Low-Code** atingiram um nível de maturidade que permite a criação de aplicações complexas e escaláveis em tempo recorde.

## O que mudou?

A integração de IA nessas plataformas permite que usuários descrevam funcionalidades em linguagem natural, e a ferramenta gera a lógica e a interface automaticamente.

### Benefícios para Empresas:

- **Velocidade de Lançamento (Time-to-Market):** Ideias viram produtos em dias, não meses.
- **Redução de Custos:** Menor dependência de grandes equipes de desenvolvimento para MVPs.
- **Inovação Descentralizada:** Times de marketing e vendas podem criar suas próprias ferramentas de automação.

A Attiva Digital utiliza o melhor do No-Code para prototipagem rápida e soluções internas ágeis, mantendo o código customizado para o que realmente exige performance extrema.
      `,
      keywords: ["No-Code", "Low-Code", "Desenvolvimento Ágil", "Inovação Digital"],
      metaDescription: "Descubra como o No-Code está mudando o jogo do desenvolvimento de software em 2026 e como sua empresa pode se beneficiar dessa agilidade."
    },
    {
      id: "seguranca-lgpd-marketing",
      title: "Segurança de Dados e LGPD no Marketing Digital",
      category: "Compliance",
      date: "10 Fev 2026",
      author: "Leonardo Santana",
      excerpt: "Proteja seu negócio e a privacidade de seus clientes em um mundo cada vez mais regulado.",
      image: "https://picsum.photos/seed/security/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 60 L280 100 V180 L200 220 L120 180 V100 Z" stroke="#C9A84C" strokeWidth="2" />
          <circle cx="200" cy="140" r="30" stroke="#C9A84C" strokeWidth="1" />
          <path d="M200 125 V155 M185 140 H215" stroke="#C9A84C" strokeWidth="2" />
        </svg>
      ),
      content: `
# Segurança de Dados e LGPD no Marketing Digital

Em 2026, a privacidade não é apenas uma lei, é um diferencial competitivo. Empresas que respeitam os dados dos usuários ganham confiança e lealdade.

## LGPD na Prática

A Lei Geral de Proteção de Dados exige que toda coleta de dados tenha um propósito claro e o consentimento explícito do usuário.

### O que sua agência deve garantir:

- **Transparência:** Políticas de privacidade claras e acessíveis.
- **Segurança:** Armazenamento criptografado e proteção contra vazamentos.
- **Direito ao Esquecimento:** Ferramentas fáceis para o usuário solicitar a exclusão de seus dados.

Na Attiva Digital, a segurança da informação está no DNA de cada projeto, garantindo que sua marca esteja sempre em conformidade e protegida.
      `,
      keywords: ["LGPD", "Segurança de Dados", "Privacidade Digital", "Compliance Marketing"],
      metaDescription: "Saiba como manter seu marketing digital em conformidade com a LGPD e garantir a segurança dos dados dos seus clientes em 2026."
    }
  ];

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle initial hash for blog posts
  useEffect(() => {
    if (!isLoading) {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        const postId = hash.replace('#blog/', '');
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
          setSelectedPost(post);
        }
      }
    }
  }, [isLoading, blogPosts]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleHashChange = () => {
      const newHash = window.location.hash || '#home';
      
      // Handle blog post navigation from hash
      if (newHash.startsWith('#blog/')) {
        const postId = newHash.replace('#blog/', '');
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
          setSelectedPost(post);
        }
      } else {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentHash(newHash);
          window.scrollTo(0, 0);
          setTimeout(() => setIsTransitioning(false), 400);
        }, 400);
      }
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

  const reviews = [
    // ─── COLUNA 1 (18 reviews) ───
    {
      name: "Marcos Oliveira",
      avatar: "MO", color: "#4285F4",
      stars: 5, time: "há 2 semanas",
      service: "Criação de Site",
      text: "Excelente trabalho da equipe Attiva Digital! O site ficou incrível, profissional e muito rápido. Superaram todas as minhas expectativas. Recomendo para qualquer empresa que queira se destacar online.",
      reply: "Obrigado, Marcos! Foi um prazer trabalhar com você. 🚀"
    },
    {
      name: "Camila Ferreira",
      avatar: "CF", color: "#34A853",
      stars: 5, time: "há 1 mês",
      service: "Gestão de Redes Sociais",
      text: "Nossa página cresceu mais de 10 mil seguidores em 5 meses! O conteúdo é estratégico, criativo e engaja de verdade. A equipe é super atenciosa e sempre disponível."
    },
    {
      name: "Roberto Santos",
      avatar: "RS", color: "#EA4335",
      stars: 5, time: "há 3 semanas",
      service: "Sistema Web",
      text: "O sistema que desenvolveram para nossa empresa automatizou processos que antes levavam horas. ROI veio em menos de 2 meses. Profissionalismo impecável do início ao fim."
    },
    {
      name: "Ana Paula Lima",
      avatar: "AL", color: "#FBBC05",
      stars: 5, time: "há 2 meses",
      service: "Tráfego Pago",
      text: "Resultados surpreendentes! Custo por lead caiu 60% e o volume de contatos triplicou. Muito satisfeita com a transparência e os relatórios detalhados que recebo semanalmente."
    },
    {
      name: "Diego Mendes",
      avatar: "DM", color: "#9C27B0",
      stars: 5, time: "há 1 semana",
      service: "Criação de Site",
      text: "Site entregue no prazo, dentro do orçamento e com qualidade que impressiona. Já recebi vários elogios de clientes. Nota 10 para toda a equipe da Attiva Digital!"
    },
    {
      name: "Fernanda Costa",
      avatar: "FC", color: "#00BCD4",
      stars: 5, time: "há 1 mês",
      service: "SEO & Indexação",
      text: "Em 3 meses aparecemos na primeira página do Google para as palavras-chave mais importantes do nosso segmento. Tráfego orgânico cresceu 300%. Trabalho sério e consistente."
    },
    {
      name: "Paulo Rodrigues",
      avatar: "PR", color: "#FF5722",
      stars: 5, time: "há 3 meses",
      service: "Consultoria Digital",
      text: "A consultoria foi um divisor de águas para o nosso negócio. Identificaram oportunidades que não estávamos enxergando e criaram um plano claro e executável. Vale cada centavo!"
    },
    {
      name: "Juliana Machado",
      avatar: "JM", color: "#607D8B",
      stars: 5, time: "há 2 semanas",
      service: "Loja Virtual",
      text: "Nossa loja virtual ficou incrível! Design profissional, checkout simples e integração perfeita com os meios de pagamento. As vendas online cresceram 180% no primeiro mês."
    },
    {
      name: "Carlos Eduardo",
      avatar: "CE", color: "#4285F4",
      stars: 5, time: "há 5 meses",
      service: "Gestão de Redes Sociais",
      text: "Profissionalismo e criatividade de alto nível. Cada post é pensado estrategicamente. Minha marca ganhou autoridade no mercado local de Curitiba. Super recomendo!"
    },
    {
      name: "Larissa Alves",
      avatar: "LA", color: "#34A853",
      stars: 5, time: "há 1 semana",
      service: "App Mobile",
      text: "O aplicativo que desenvolveram para nós é intuitivo, rápido e com visual moderno. Os clientes adoraram! Avaliação 4.8 na App Store logo no lançamento. Equipe excepcional."
    },
    {
      name: "Thiago Pereira",
      avatar: "TP", color: "#EA4335",
      stars: 5, time: "há 4 meses",
      service: "Tráfego Pago",
      text: "Campanhas otimizadas e gerenciadas com total transparência. ROAS de 4.2x no primeiro mês e melhorando todo mês. São especialistas de verdade em performance digital."
    },
    {
      name: "Beatriz Nunes",
      avatar: "BN", color: "#FBBC05",
      stars: 5, time: "há 2 meses",
      service: "Criação de Site",
      text: "Atendimento personalizado e cuidadoso em cada etapa. O site ficou exatamente como eu idealizei — até melhor! Carregamento super rápido e ótima experiência no celular."
    },
    {
      name: "Gustavo Lima",
      avatar: "GL", color: "#9C27B0",
      stars: 5, time: "há 3 semanas",
      service: "SEO & Indexação",
      text: "Estávamos invisíveis no Google. Em 4 meses, 3 das nossas principais palavras-chave estão no top 5. O volume de ligações do Google aumentou 4x. Resultado concreto!"
    },
    {
      name: "Rafaela Souza",
      avatar: "RS", color: "#00BCD4",
      stars: 5, time: "há 6 meses",
      service: "Gestão de Redes Sociais",
      text: "Finalmente uma agência que realmente entende de redes sociais e não fica só repostando frases motivacionais. Conteúdo com estratégia real, engajamento e crescimento de audiência."
    },
    {
      name: "Anderson Martins",
      avatar: "AM", color: "#FF5722",
      stars: 5, time: "há 1 mês",
      service: "Sistema Web",
      text: "Sistema entregue com toda a funcionalidade que precisávamos e mais. O processo foi organizado, com sprints semanais e feedback constante. Time técnico muito competente."
    },
    {
      name: "Patrícia Gonçalves",
      avatar: "PG", color: "#607D8B",
      stars: 5, time: "há 2 semanas",
      service: "Loja Virtual",
      text: "E-commerce completo, integrado com marketplace e com painel de gestão intuitivo. Minhas vendas online já superam as presenciais. Investimento que se pagou rapidamente."
    },
    {
      name: "Leandro Castro",
      avatar: "LC", color: "#4285F4",
      stars: 5, time: "há 3 meses",
      service: "Consultoria Digital",
      text: "A consultoria trouxe clareza total para nossa estratégia digital. Saímos da reunião com um roadmap completo e já vemos resultados nos primeiros 60 dias de implementação."
    },
    {
      name: "Vanessa Torres",
      avatar: "VT", color: "#34A853",
      stars: 5, time: "há 4 semanas",
      service: "Criação de Site",
      text: "Desde o briefing até a entrega, tudo foi conduzido com muita profissionalidade. O site é lindo, responsivo e perfeito em todos os dispositivos. Já recebi vários leads por ele!"
    },
  
    // ─── COLUNA 2 (19 reviews) ───
    {
      name: "Henrique Barros",
      avatar: "HB", color: "#EA4335",
      stars: 5, time: "há 2 meses",
      service: "Tráfego Pago",
      text: "Minha campanha no Meta Ads estava queimando dinheiro antes da Attiva. Eles reestruturaram tudo e em 30 dias o custo por resultado caiu pela metade com o dobro de volume."
    },
    {
      name: "Simone Araújo",
      avatar: "SA", color: "#FBBC05",
      stars: 5, time: "há 1 semana",
      service: "SEO & Indexação",
      text: "Aparecemos no Google Maps como primeira opção na nossa região. O número de clientes que chegam dizendo que nos encontraram no Google triplicou. Trabalho excepcional!"
    },
    {
      name: "Fábio Cardoso",
      avatar: "FC", color: "#9C27B0",
      stars: 5, time: "há 5 meses",
      service: "App Mobile",
      text: "App desenvolvido com qualidade de startup de alto nível. UX impecável, sem bugs, integração com nosso sistema legado funcionando perfeitamente. Entrega antes do prazo!"
    },
    {
      name: "Mônica Ribeiro",
      avatar: "MR", color: "#00BCD4",
      stars: 5, time: "há 3 semanas",
      service: "Gestão de Redes Sociais",
      text: "O conteúdo que produzem para a nossa clínica é educativo, humanizado e altamente engajador. Crescemos organicamente sem precisar impulsionar posts. Estratégia inteligente."
    },
    {
      name: "Rodrigo Freitas",
      avatar: "RF", color: "#FF5722",
      stars: 5, time: "há 2 meses",
      service: "Sistema Web",
      text: "Portal de gestão desenvolvido do zero, com todas as funcionalidades que precisávamos. Interface bonita e fácil de usar. A equipe foi parceira em todo o processo."
    },
    {
      name: "Isabela Moura",
      avatar: "IM", color: "#607D8B",
      stars: 5, time: "há 1 mês",
      service: "Criação de Site",
      text: "Super atenciosos e criativos! O site reflete perfeitamente a identidade da nossa marca. Rápido, seguro com certificado SSL e otimizado para celular. Amei o resultado!"
    },
    {
      name: "Alessandro Vieira",
      avatar: "AV", color: "#4285F4",
      stars: 5, time: "há 6 semanas",
      service: "Loja Virtual",
      text: "Loja virtual entregue em tempo recorde, com integração completa. Design que converte e experiência de compra fluida. As métricas de abandono de carrinho caíram 40%."
    },
    {
      name: "Carina Duarte",
      avatar: "CD", color: "#34A853",
      stars: 5, time: "há 2 semanas",
      service: "Tráfego Pago",
      text: "Gerenciam nossas campanhas com muita atenção e estratégia. Relatórios claros, reuniões mensais produtivas e resultados crescendo mês a mês. Parceria de longo prazo!"
    },
    {
      name: "Marcelo Pinto",
      avatar: "MP", color: "#EA4335",
      stars: 5, time: "há 4 meses",
      service: "Consultoria Digital",
      text: "Diagnóstico preciso e plano de ação realista. Não prometem o impossível — entregam o que é combinado e às vezes superam. Referência em consultoria digital em Curitiba."
    },
    {
      name: "Tatiane Lopes",
      avatar: "TL", color: "#FBBC05",
      stars: 5, time: "há 3 semanas",
      service: "SEO & Indexação",
      text: "Investimos em SEO com a Attiva e o retorno superou todas as expectativas. Hoje 70% dos nossos leads vêm do Google organicamente. Melhor investimento de marketing que fizemos."
    },
    {
      name: "Wellington Cruz",
      avatar: "WC", color: "#9C27B0",
      stars: 5, time: "há 1 mês",
      service: "Gestão de Redes Sociais",
      text: "A equipe entende profundamente cada plataforma e adapta o conteúdo para cada uma. Resultado: engajamento real, seguidores qualificados e crescimento consistente todo mês."
    },
    {
      name: "Nádia Santos",
      avatar: "NS", color: "#00BCD4",
      stars: 5, time: "há 5 semanas",
      service: "Criação de Site",
      text: "O prazo foi respeitado, o orçamento mantido e a qualidade entregue foi além do que eu esperava. O suporte pós-entrega é excelente. Recomendo sem hesitar!"
    },
    {
      name: "Edmilson Rocha",
      avatar: "ER", color: "#FF5722",
      stars: 5, time: "há 7 meses",
      service: "App Mobile",
      text: "Desenvolveram nosso app com atenção a cada detalhe. Processo transparente com entregas semanais para acompanhar. Resultado final ficou melhor do que o protótipo!"
    },
    {
      name: "Priscila Melo",
      avatar: "PM", color: "#607D8B",
      stars: 5, time: "há 2 meses",
      service: "Tráfego Pago",
      text: "Primeira agência que realmente me explicou o que estava sendo feito nas campanhas. Sem enrolação, focados em resultado. Meu faturamento online cresceu 120% em 4 meses."
    },
    {
      name: "Davi Correia",
      avatar: "DC", color: "#4285F4",
      stars: 5, time: "há 1 mês",
      service: "Loja Virtual",
      text: "E-commerce robusto com painel de admin completo. Integração com Mercado Pago, PicPay e boleto funcionando perfeitamente. Design moderno e taxas de conversão excelentes."
    },
    {
      name: "Letícia Campos",
      avatar: "LC", color: "#34A853",
      stars: 5, time: "há 3 meses",
      service: "Gestão de Redes Sociais",
      text: "Em 4 meses nossa comunidade no Instagram virou referência no nosso nicho. Conteúdo autêntico, estratégico e que realmente conecta com o público. Resultado excepcional!"
    },
    {
      name: "Fábio Nascimento",
      avatar: "FN", color: "#EA4335",
      stars: 5, time: "há 6 semanas",
      service: "SEO & Indexação",
      text: "Aparecer na primeira posição do Google para a nossa cidade mudou completamente o volume de clientes. A Attiva Digital sabe o que está fazendo. Investimento que vale muito!"
    },
    {
      name: "Claudia Moraes",
      avatar: "CM", color: "#FBBC05",
      stars: 5, time: "há 2 semanas",
      service: "Sistema Web",
      text: "Sistema de agendamento online que nossos clientes adoraram. Integração com WhatsApp, notificações automáticas e relatórios inteligentes. Reduziu nosso trabalho operacional em 60%."
    },
    {
      name: "Bruno Azevedo",
      avatar: "BA", color: "#9C27B0",
      stars: 5, time: "há 1 mês",
      service: "Consultoria Digital",
      text: "A consultoria da Attiva mudou a visão do nosso time sobre marketing digital. Saímos com um playbook completo e já vemos os resultados nas primeiras semanas de execução."
    },
  
    // ─── COLUNA 3 (18 reviews) ───
    {
      name: "Renata Oliveira",
      avatar: "RO", color: "#00BCD4",
      stars: 5, time: "há 3 meses",
      service: "Criação de Site",
      text: "Site desenvolvido com muito cuidado e atenção à nossa identidade visual. Carrega em menos de 2 segundos e é lindo em qualquer dispositivo. Recebi elogios de todos!"
    },
    {
      name: "Sérgio Batista",
      avatar: "SB", color: "#FF5722",
      stars: 5, time: "há 1 semana",
      service: "Tráfego Pago",
      text: "Gerenciamento profissional das campanhas com foco em resultado real. Eles não ficam jogando desculpas — identificam o problema e ajustam rapidamente. Nota máxima!"
    },
    {
      name: "Cristiane Dias",
      avatar: "CD", color: "#607D8B",
      stars: 5, time: "há 2 meses",
      service: "Gestão de Redes Sociais",
      text: "Minha farmácia nunca teve tanto reconhecimento local. As redes sociais viraram uma fonte real de clientes novos. O trabalho da Attiva é diferenciado e comprometido."
    },
    {
      name: "Nilson Ferreira",
      avatar: "NF", color: "#4285F4",
      stars: 5, time: "há 4 meses",
      service: "Loja Virtual",
      text: "E-commerce entregue com integração total com nosso estoque físico. A sincronização em tempo real evita vender produto sem estoque. Solução técnica impecável!"
    },
    {
      name: "Adriana Mendes",
      avatar: "AM", color: "#34A853",
      stars: 5, time: "há 3 semanas",
      service: "SEO & Indexação",
      text: "Saímos da 8ª página do Google para a 1ª posição em 5 meses. O crescimento de tráfego orgânico é consistente mês a mês. Excelente trabalho técnico e estratégico!"
    },
    {
      name: "Leonardo Barros",
      avatar: "LB", color: "#EA4335",
      stars: 5, time: "há 1 mês",
      service: "App Mobile",
      text: "App desenvolvido com qualidade premium. Testaram em múltiplos dispositivos e entregaram sem nenhum bug. Suporte pós-lançamento ágil e eficiente. Muito satisfeito!"
    },
    {
      name: "Elaine Carvalho",
      avatar: "EC", color: "#FBBC05",
      stars: 5, time: "há 5 semanas",
      service: "Consultoria Digital",
      text: "Diagnóstico digital completo e muito preciso. Identificaram gargalos que não estávamos percebendo e deram um plano claro com prioridades. Nossa eficiência digital triplicou."
    },
    {
      name: "Marcos Teixeira",
      avatar: "MT", color: "#9C27B0",
      stars: 5, time: "há 2 meses",
      service: "Criação de Site",
      text: "Processo de desenvolvimento bem estruturado com entregas parciais para validação. O resultado final superou o briefing. Site lindo e que já gerou novos clientes!"
    },
    {
      name: "Gisele Cunha",
      avatar: "GC", color: "#00BCD4",
      stars: 5, time: "há 1 semana",
      service: "Tráfego Pago",
      text: "A gestão das campanhas é impecável. Eles testam criativos, públicos e placements constantemente para otimizar resultados. Meu ROAS saiu de 1.8x para 5.2x em 3 meses!"
    },
    {
      name: "Vitor Lemos",
      avatar: "VL", color: "#FF5722",
      stars: 5, time: "há 3 meses",
      service: "Sistema Web",
      text: "CRM desenvolvido especificamente para nosso processo comercial. A produtividade do time de vendas aumentou 40% com a automação de tarefas repetitivas. Projeto incrível!"
    },
    {
      name: "Amanda Fonseca",
      avatar: "AF", color: "#607D8B",
      stars: 5, time: "há 6 semanas",
      service: "Gestão de Redes Sociais",
      text: "Equipe criativa, responsiva e com muito domínio das plataformas. Cada campanha é pensada estrategicamente. Os resultados são visíveis e mensuráveis. Top demais!"
    },
    {
      name: "Nelson Rodrigues",
      avatar: "NR", color: "#4285F4",
      stars: 5, time: "há 4 meses",
      service: "SEO & Indexação",
      text: "Métricas de SEO crescendo consistentemente há 6 meses. Posicionamento nos buscadores melhorou para todas as keywords trabalhadas. Trabalho técnico de altíssima qualidade."
    },
    {
      name: "Juliana Pereira",
      avatar: "JP", color: "#34A853",
      stars: 5, time: "há 2 semanas",
      service: "Loja Virtual",
      text: "Nossa loja virtual passou a representar 45% do faturamento total em apenas 3 meses. O design é lindo e a experiência de compra é impecável. Investimento que valeu muito!"
    },
    {
      name: "Eduardo Lima",
      avatar: "EL", color: "#EA4335",
      stars: 5, time: "há 1 mês",
      service: "Criação de Site",
      text: "Site institucional profissional que transmite credibilidade desde o primeiro acesso. Nossos clientes corporativos comentam a qualidade. Representou um salto de imagem enorme!"
    },
    {
      name: "Sandra Costa",
      avatar: "SC", color: "#FBBC05",
      stars: 5, time: "há 5 meses",
      service: "Consultoria Digital",
      text: "A consultoria nos mostrou que estávamos investindo nos canais errados. Com o redirecionamento estratégico, o custo de aquisição caiu 45% e os leads qualificados triplicaram."
    },
    {
      name: "Rodrigo Almeida",
      avatar: "RA", color: "#9C27B0",
      stars: 5, time: "há 3 semanas",
      service: "Tráfego Pago",
      text: "Profissionais que dominam Google Ads e Meta Ads com profundidade. Segmentação cirúrgica e criativos de alta conversão. Resultados que eu não conseguia nem com outras agências."
    },
    {
      name: "Daniela Ribeiro",
      avatar: "DR", color: "#00BCD4",
      stars: 5, time: "há 2 meses",
      service: "App Mobile",
      text: "App para delivery da nossa rede de restaurantes funcionando perfeitamente. Integração com sistema de gestão, notificações push e painel admin completo. Excelente parceria!"
    },
    {
      name: "Claudio Matos",
      avatar: "CM", color: "#FF5722",
      stars: 5, time: "há 1 semana",
      service: "Gestão de Redes Sociais",
      text: "A presença digital da nossa empresa nunca foi tão forte. Conteúdo consistente, identidade visual impecável e engajamento crescendo todo mês. Parceria que renovo sempre!"
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
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="portfolio-svg">
          <path className="draw-line" d="M150 100 H250 V200 H150 Z" stroke="#C9A84C" strokeWidth="2" />
          <path className="draw-line-delay" d="M150 120 H250" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <circle className="pulse-dot" cx="200" cy="150" r="30" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
          <path className="float-icon" d="M180 140 L200 160 L240 120" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
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
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="portfolio-svg">
          <rect className="draw-line" x="120" y="80" width="160" height="120" rx="12" stroke="#C9A84C" strokeWidth="2" />
          <path className="flow-line" d="M140 120 H260 M140 140 H220 M140 160 H180" stroke="#C9A84C" strokeWidth="2" opacity="0.4" />
          <path className="bolt-anim" d="M200 100 L180 140 H220 L200 180" stroke="#C9A84C" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      ),
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
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="portfolio-svg">
          <path className="pulse-path" d="M100 140 H140 L150 100 L170 180 L185 140 H220" stroke="#C9A84C" strokeWidth="3" />
          <circle className="pulse-dot" cx="220" cy="140" r="6" fill="#C9A84C" />
          <path className="draw-line" d="M130 80 Q200 60 270 80 V200 Q200 220 130 200 Z" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
        </svg>
      ),
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
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="portfolio-svg">
          <path className="draw-line" d="M120 180 V100 L200 60 L280 100 V180 H120" stroke="#C9A84C" strokeWidth="2" />
          <rect x="180" y="140" width="40" height="40" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <path className="float-icon" d="M200 100 V140" stroke="#C9A84C" strokeWidth="2" opacity="0.3" />
          <circle className="pulse-dot" cx="200" cy="80" r="10" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
        </svg>
      ),
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
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="portfolio-svg">
          <path className="draw-line" d="M120 100 H280 V200 H120 Z" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
          <path className="book-page" d="M200 100 V200 M200 100 L140 120 V220 L200 200 M200 100 L260 120 V220 L200 200" stroke="#C9A84C" strokeWidth="2" />
          <circle className="neural-node" cx="200" cy="150" r="15" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
        </svg>
      ),
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
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="portfolio-svg">
          <path className="car-body" d="M100 160 H300 L280 120 H120 L100 160 Z" stroke="#C9A84C" strokeWidth="2" />
          <circle className="wheel-spin" cx="140" cy="160" r="15" stroke="#C9A84C" strokeWidth="2" />
          <circle className="wheel-spin" cx="260" cy="160" r="15" stroke="#C9A84C" strokeWidth="2" />
          <path className="speed-line" d="M80 140 H40 M70 150 H30 M80 160 H40" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
        </svg>
      ),
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
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="portfolio-svg">
          <path className="draw-line" d="M200 80 V200 M140 200 H260" stroke="#C9A84C" strokeWidth="2" />
          <path className="scale-swing" d="M140 120 L200 100 L260 120" stroke="#C9A84C" strokeWidth="2" />
          <circle cx="140" cy="140" r="20" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
          <circle cx="260" cy="140" r="20" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
        </svg>
      ),
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
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="portfolio-svg">
          <path className="leaf-anim" d="M200 200 Q150 150 200 100 Q250 150 200 200" stroke="#C9A84C" strokeWidth="2" />
          <circle className="pulse-dot" cx="200" cy="150" r="40" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
          <g className="sparkles-anim">
            <circle cx="170" cy="120" r="2" fill="#C9A84C" />
            <circle cx="230" cy="130" r="2" fill="#C9A84C" />
            <circle cx="210" cy="170" r="2" fill="#C9A84C" />
          </g>
        </svg>
      ),
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
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="portfolio-svg">
          <rect className="draw-line" x="100" y="80" width="200" height="120" rx="8" stroke="#C9A84C" strokeWidth="2" />
          <path className="flow-line" d="M120 110 H280 M120 130 H240 M120 150 H200" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <circle className="pulse-dot" cx="250" cy="160" r="25" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
          <path className="float-icon" d="M240 160 L260 160 L270 140" stroke="#C9A84C" strokeWidth="2" />
        </svg>
      ),
      description: "Dashboard de controle em tempo real para frotas de transporte pesado.",
      tags: ["Real-time Data", "IoT Integration", "Dashboard UX", "Cloud"],
      insight: "Dados em tempo real salvam vidas e dinheiro. A interface foca no que é crítico para o motorista.",
      timeline: [
        { period: "Mês 01", event: "Prototipagem", impact: "Validação de interface com 50 motoristas reais.", growth: 0 },
        { period: "Mês 06", event: "Rollout Nacional", impact: "Redução de 15% no consumo de combustível.", growth: 200 },
        { period: "Mês 12", event: "Otimização Total", impact: "Eficiência logística da frota cresceu 500%.", growth: 500 }
      ]
    }

  ];

// --- Static Data ---
const blogPosts = [
    {
      id: "seo-ia-2026",
      title: "O Futuro do SEO em 2026: IA e Busca Semântica",
      category: "SEO",
      date: "15 Mar 2026",
      author: "Leonardo Santana",
      excerpt: "Como as novas atualizações do Google estão priorizando a intenção do usuário e o conteúdo gerado por especialistas.",
      image: "https://picsum.photos/seed/seo/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="140" r="100" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
          <circle cx="200" cy="140" r="60" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
          <g className="neural-nodes">
            <circle className="neural-node" cx="200" cy="140" r="8" fill="#C9A84C" />
            <circle className="neural-node" cx="120" cy="100" r="6" fill="#C9A84C" />
            <circle className="neural-node" cx="280" cy="100" r="6" fill="#C9A84C" />
            <circle className="neural-node" cx="120" cy="180" r="6" fill="#C9A84C" />
            <circle className="neural-node" cx="280" cy="180" r="6" fill="#C9A84C" />
          </g>
          <path className="flow-line" d="M200 140 L120 100 M200 140 L280 100 M200 140 L120 180 M200 140 L280 180" stroke="#C9A84C" strokeWidth="2" opacity="0.5" />
        </svg>
      ),
      content: `
# O Futuro do SEO em 2026: IA e Busca Semântica

O cenário do SEO está mudando drasticamente com a integração da Inteligência Artificial Generativa nos motores de busca. Em 2026, não basta apenas palavras-chave; o Google agora prioriza a **Intenção do Usuário** e a **Autoridade do Especialista (E-E-A-T)**.

## Como a IA está mudando a busca

A Busca Generativa (SGE) do Google agora responde diretamente às perguntas dos usuários, o que significa que o tráfego informativo puro pode diminuir. No entanto, a necessidade de fontes confiáveis e opiniões de especialistas nunca foi tão alta.

### O que é Busca Semântica?

A busca semântica foca no significado por trás das palavras, não apenas nas palavras em si. O Google tenta entender o contexto da pesquisa para entregar o resultado mais relevante, mesmo que a palavra-chave exata não esteja presente.

### Estratégias para 2026:

1.  **Dados Estruturados Avançados:** Ajude a IA a entender seu conteúdo através de Schema.org.
2.  **Conteúdo de Especialista:** Foque em experiências reais, estudos de caso e opiniões que a IA não pode replicar.
3.  **Otimização para Intenção:** Vá além da palavra-chave e responda ao \"porquê\" do usuário.
4.  **Velocidade e UX:** O Google continua priorizando sites que carregam rápido e oferecem uma ótima experiência.

### Conclusão

A Attiva Digital já está implementando essas estratégias para garantir que nossos clientes permaneçam no topo das buscas, mesmo com as mudanças constantes dos algoritmos. O SEO não morreu, ele apenas evoluiu para algo mais humano e inteligente.
      `,
      keywords: ["SEO 2026", "Inteligência Artificial", "Busca Semântica", "Google SGE", "E-E-A-T"],
      metaDescription: "Descubra como a IA e a busca semântica estão transformando o SEO em 2026 e como sua empresa pode se adaptar para continuar no topo do Google."
    },
    {
      id: "ecommerce-escala-2026",
      title: "5 Estratégias para Escalar seu E-commerce este ano",
      category: "E-commerce",
      date: "10 Mar 2026",
      author: "Leonardo Santana",
      excerpt: "Do checkout em uma página ao remarketing dinâmico: o que realmente funciona para vender mais.",
      image: "https://picsum.photos/seed/ecommerce/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="100" y="80" width="200" height="120" rx="8" stroke="#C9A84C" strokeWidth="2" className="wireframe-box" />
          <path d="M120 110 H280 M120 130 H220 M120 150 H180" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <circle cx="250" cy="160" r="20" fill="#C9A84C" className="pulse-circle" />
          <path d="M240 160 L248 168 L260 152" stroke="black" strokeWidth="3" />
        </svg>
      ),
      content: `
# 5 Estratégias para Escalar seu E-commerce este ano

Escalar um e-commerce exige mais do que apenas tráfego; exige conversão e retenção. Aqui estão as 5 estratégias que estão trazendo resultados reais para nossos clientes em 2026.

## 1. Checkout em Uma Página (One-Page Checkout)

Reduza o atrito. Quanto menos cliques entre o carrinho e a confirmação de pagamento, maior a sua taxa de conversão. O checkout em uma página simplifica o processo e diminui o abandono de carrinho.

## 2. Remarketing Dinâmico com IA

Não mostre apenas o produto que o cliente viu. Use IA para mostrar produtos complementares ou ofertas personalizadas baseadas no comportamento de navegação.

## 3. Prova Social em Tempo Real

Exibir notificações de \"Alguém acabou de comprar este item\" ou avaliações recentes cria urgência e confiança imediata.

## 4. Otimização para Mobile-First

Em 2026, mais de 80% das compras online são feitas via smartphone. Seu site deve ser impecável no mobile, com botões fáceis de clicar e carregamento instantâneo.

## 5. Atendimento via WhatsApp Automatizado

Integre um bot de IA no seu WhatsApp para responder dúvidas frequentes e até fechar vendas 24/7. O toque humano ainda é importante, mas a velocidade da IA no primeiro contato é imbatível.

### Como a Attiva Digital pode ajudar?

Nós somos especialistas em transformar e-commerces comuns em máquinas de vendas de alta performance. Entre em contato para uma consultoria gratuita.
      `,
      keywords: ["E-commerce", "Vendas Online", "Escalabilidade", "Marketing Digital", "Checkout"],
      metaDescription: "Aprenda as 5 estratégias essenciais para escalar seu e-commerce em 2026, desde otimização de checkout até automação de vendas."
    },
    {
      id: "branding-luxo-2026",
      title: "Branding de Luxo: Como posicionar sua marca no topo",
      category: "Branding",
      date: "05 Mar 2026",
      author: "Leonardo Santana",
      excerpt: "A psicologia por trás das marcas de alto padrão e como aplicar esses conceitos no seu negócio digital.",
      image: "https://picsum.photos/seed/luxury/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 60 L260 120 L200 180 L140 120 Z" stroke="#C9A84C" strokeWidth="2" className="diamond-path" />
          <path d="M200 60 V180 M140 120 H260" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
          <circle cx="200" cy="120" r="40" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" />
          <g className="sparkles">
            <circle cx="160" cy="80" r="2" fill="#C9A84C" className="sparkle" />
            <circle cx="240" cy="160" r="2" fill="#C9A84C" className="sparkle" />
            <circle cx="220" cy="70" r="3" fill="#C9A84C" className="sparkle" />
          </g>
        </svg>
      ),
      content: `
# Branding de Luxo: Como posicionar sua marca no topo

O luxo não é sobre preço, é sobre **exclusividade, história e percepção de valor**. No mundo digital, o branding de luxo exige uma estética minimalista e uma comunicação que valoriza o silêncio e a sofisticação.

## A Psicologia do Alto Padrão

Marcas de luxo não vendem produtos; elas vendem pertencimento a um grupo seleto e a realização de desejos aspiracionais.

### Pontos chave para o seu posicionamento:

- **Identidade Visual Impecável:** Onde cada pixel importa.
- **Storytelling Emocional:** Conectando a marca a valores aspiracionais.
- **Experiência do Cliente VIP:** O atendimento digital deve ser tão refinado quanto o presencial.

### Como o Branding afeta o preço:

- **Valor Percebido:** Marcas com design premium podem cobrar mais caro por seus produtos ou serviços.
- **Diferenciação:** Em um mercado saturado, ser visualmente único é a única forma de ser lembrado.
- **Consistência:** Uma marca consistente em todos os pontos de contato gera confiança e fidelidade.

### Conclusão

A Attiva Digital ajuda marcas a construírem essa aura de prestígio, elevando o ticket médio e a fidelidade dos clientes através de um design que respira exclusividade.
      `,
      keywords: ["Branding de Luxo", "Marketing de Alto Padrão", "Posicionamento de Marca", "Design Premium"],
      metaDescription: "Entenda como posicionar sua marca no mercado de luxo digital, utilizando psicologia de consumo e design sofisticado para atrair clientes de alto ticket."
    }
,
    {
      id: "trafego-pago-vs-organico",
      title: "Tráfego Pago vs Orgânico: Onde investir seu orçamento?",
      category: "Marketing",
      date: "01 Mar 2026",
      author: "Leonardo Santana",
      excerpt: "Um guia completo para equilibrar investimentos de curto e longo prazo para um crescimento sustentável.",
      image: "https://picsum.photos/seed/marketing/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 230 L150 180 L250 120 L350 50" stroke="#C9A84C" strokeWidth="3" className="chart-line-up" />
          <rect x="70" y="180" width="30" height="50" fill="#C9A84C" opacity="0.3" />
          <rect x="170" y="120" width="30" height="110" fill="#C9A84C" opacity="0.5" />
          <rect x="270" y="70" width="30" height="160" fill="#C9A84C" opacity="0.8" />
          <line x1="50" y1="230" x2="350" y2="230" stroke="#C9A84C" strokeWidth="1" />
        </svg>
      ),
      content: `
        O dilema eterno: resultados rápidos com anúncios ou autoridade duradoura com conteúdo orgânico? A resposta curta é: **ambos**, mas com o equilíbrio certo para o seu momento de negócio.

        ## Curto Prazo vs Longo Prazo
        O tráfego pago é como um interruptor: você liga e os leads aparecem. O orgânico é como uma floresta: leva tempo para crescer, mas depois oferece sombra constante.

        ### Quando investir em cada um:
        - **Tráfego Pago:** Ideal para lançamentos, promoções sazonais e validação rápida de ofertas.
        - **SEO e Orgânico:** Essencial para reduzir o custo de aquisição (CAC) ao longo do tempo e construir autoridade.

        Entenda como a Attiva Digital gerencia orçamentos de marketing para maximizar o retorno sobre o investimento (ROI) de forma previsível e escalável, utilizando a estratégia de "Cercamento Digital".
      `,
      keywords: ["Tráfego Pago", "SEO", "Marketing de Conteúdo", "ROI", "Estratégia Digital"],
      metaDescription: "Descubra o equilíbrio ideal entre tráfego pago e orgânico para o seu negócio e como maximizar seu ROI com investimentos inteligentes."
    },
    {
      id: "velocidade-carregamento-conversao",
      title: "A Importância da Velocidade de Carregamento para Conversão",
      category: "Tecnologia",
      date: "25 Fev 2026",
      author: "Leonardo Santana",
      excerpt: "Cada milissegundo conta. Descubra como a performance técnica impacta diretamente no seu faturamento.",
      image: "https://picsum.photos/seed/speed/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="140" r="80" stroke="#C9A84C" strokeWidth="2" strokeDasharray="10 5" />
          <path d="M200 140 L260 100" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" className="clock-hand" />
          <circle cx="200" cy="140" r="5" fill="#C9A84C" />
          <path d="M140 220 Q200 180 260 220" stroke="#C9A84C" strokeWidth="2" fill="none" className="speed-curve" />
        </svg>
      ),
      content: `
        Estudos mostram que um atraso de apenas 1 segundo no carregamento pode reduzir as conversões em até 7%. Em 2026, com conexões 5G e usuários cada vez mais impacientes, a performance técnica é uma questão de sobrevivência.

        ## Core Web Vitals e o Google
        O Google utiliza métricas de velocidade como fator de ranqueamento. Um site lento não apenas afasta o usuário, mas também é "punido" nas buscas.

        ### O que otimizamos na Attiva Digital:
        - **LCP (Largest Contentful Paint):** Tempo de carregamento do conteúdo principal.
        - **FID (First Input Delay):** Interatividade da página.
        - **CLS (Cumulative Layout Shift):** Estabilidade visual.

        Seu site é rápido o suficiente para não perder dinheiro? A Attiva Digital utiliza tecnologias de ponta para garantir que seu site carregue em menos de 2 segundos.
      `,
      keywords: ["Velocidade de Site", "Performance Web", "Core Web Vitals", "Taxa de Conversão"],
      metaDescription: "Saiba como a velocidade de carregamento do seu site afeta suas vendas e o que você pode fazer para otimizar a performance técnica hoje mesmo."
    },
    {
      id: "gestao-redes-sociais-comunidade",
      title: "Gestão de Redes Sociais: Além dos Likes e Seguidores",
      category: "Social Media",
      date: "20 Fev 2026",
      author: "Leonardo Santana",
      excerpt: "Como transformar sua audiência em uma comunidade ativa que defende e promove sua marca organicamente.",
      image: "https://picsum.photos/seed/social/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="140" r="30" fill="#C9A84C" opacity="0.8" />
          <circle cx="120" cy="80" r="20" fill="#C9A84C" opacity="0.4" />
          <circle cx="280" cy="80" r="20" fill="#C9A84C" opacity="0.4" />
          <circle cx="120" cy="200" r="20" fill="#C9A84C" opacity="0.4" />
          <circle cx="280" cy="200" r="20" fill="#C9A84C" opacity="0.4" />
          <path d="M180 120 L135 95 M220 120 L265 95 M180 160 L135 185 M220 160 L265 185" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 2" />
        </svg>
      ),
      content: `
        Likes não pagam boletos. O verdadeiro poder das redes sociais in 2026 está no **Engajamento Profundo** e na construção de comunidades.

        ## De Seguidores a Advogados da Marca
        Uma comunidade ativa não apenas consome seu conteúdo, mas o defende e o compartilha, tornando-se um canal de aquisição orgânica poderosíssimo.

        ### Nossa abordagem estratégica:
        - **Conteúdo Nativo:** Adaptando a mensagem para cada plataforma (TikTok, Reels, LinkedIn).
        - **Gestão de Crise e Atendimento:** Transformando reclamações em fãs através de respostas rápidas e humanas.
        - **Estratégia de Influenciadores:** Conectando sua marca com quem realmente tem voz no seu nicho.

        A Attiva Digital não apenas posta; nós construímos relacionamentos que se traduzem em vendas e lealdade à marca.
      `,
      keywords: ["Redes Sociais", "Engajamento", "Comunidade Digital", "Social Media Strategy"],
      metaDescription: "Aprenda a transformar suas redes sociais em uma comunidade vibrante e engajada que impulsiona suas vendas de forma orgânica."
    },
    {
      id: "revolucao-no-code-2026",
      title: "A Revolução do No-Code em 2026",
      category: "Tecnologia",
      date: "15 Fev 2026",
      author: "Leonardo Santana",
      excerpt: "Como ferramentas de baixo código estão democratizando a criação de software e acelerando a inovação.",
      image: "https://picsum.photos/seed/nocode/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="100" y="60" width="200" height="160" rx="10" stroke="#C9A84C" strokeWidth="2" />
          <rect x="120" y="80" width="160" height="30" rx="5" fill="#C9A84C" opacity="0.3" />
          <rect x="120" y="120" width="70" height="30" rx="5" fill="#C9A84C" opacity="0.5" />
          <rect x="210" y="120" width="70" height="30" rx="5" fill="#C9A84C" opacity="0.5" />
          <rect x="120" y="160" width="160" height="40" rx="5" fill="#C9A84C" opacity="0.8" />
        </svg>
      ),
      content: `
# A Revolução do No-Code em 2026

O desenvolvimento de software não é mais exclusividade de programadores experientes. Em 2026, as ferramentas **No-Code** e **Low-Code** atingiram um nível de maturidade que permite a criação de aplicações complexas e escaláveis em tempo recorde.

## O que mudou?

A integração de IA nessas plataformas permite que usuários descrevam funcionalidades em linguagem natural, e a ferramenta gera a lógica e a interface automaticamente.

### Benefícios para Empresas:

- **Velocidade de Lançamento (Time-to-Market):** Ideias viram produtos em dias, não meses.
- **Redução de Custos:** Menor dependência de grandes equipes de desenvolvimento para MVPs.
- **Inovação Descentralizada:** Times de marketing e vendas podem criar suas próprias ferramentas de automação.

A Attiva Digital utiliza o melhor do No-Code para prototipagem rápida e soluções internas ágeis, mantendo o código customizado para o que realmente exige performance extrema.
      `,
      keywords: ["No-Code", "Low-Code", "Desenvolvimento Ágil", "Inovação Digital"],
      metaDescription: "Descubra como o No-Code está mudando o jogo do desenvolvimento de software em 2026 e como sua empresa pode se beneficiar dessa agilidade."
    },
    {
      id: "seguranca-lgpd-marketing",
      title: "Segurança de Dados e LGPD no Marketing Digital",
      category: "Compliance",
      date: "10 Fev 2026",
      author: "Leonardo Santana",
      excerpt: "Proteja seu negócio e a privacidade de seus clientes em um mundo cada vez mais regulado.",
      image: "https://picsum.photos/seed/security/800/600",
      svg: (
        <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 60 L280 100 V180 L200 220 L120 180 V100 Z" stroke="#C9A84C" strokeWidth="2" />
          <circle cx="200" cy="140" r="30" stroke="#C9A84C" strokeWidth="1" />
          <path d="M200 125 V155 M185 140 H215" stroke="#C9A84C" strokeWidth="2" />
        </svg>
      ),
      content: `
# Segurança de Dados e LGPD no Marketing Digital

Em 2026, a privacidade não é apenas uma lei, é um diferencial competitivo. Empresas que respeitam os dados dos usuários ganham confiança e lealdade.

## LGPD na Prática

A Lei Geral de Proteção de Dados exige que toda coleta de dados tenha um propósito claro e o consentimento explícito do usuário.

### O que sua agência deve garantir:

- **Transparência:** Políticas de privacidade claras e acessíveis.
- **Segurança:** Armazenamento criptografado e proteção contra vazamentos.
- **Direito ao Esquecimento:** Ferramentas fáceis para o usuário solicitar a exclusão de seus dados.

Na Attiva Digital, a segurança da informação está no DNA de cada projeto, garantindo que sua marca esteja sempre em conformidade e protegida.
      `,
      keywords: ["LGPD", "Segurança de Dados", "Privacidade Digital", "Compliance Marketing"],
      metaDescription: "Saiba como manter seu marketing digital em conformidade com a LGPD e garantir a segurança dos dados dos seus clientes em 2026."
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
        {selectedPost && (
          <BlogModal 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)} 
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

          <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center p-6 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.15)_0%,transparent_70%)]" />
              <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-gold-primary transition-colors p-2"
            >
              <X size={40} />
            </button>

            <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs">
              <Logo className="mb-8 scale-125" onClick={() => navigate('#home')} />
              
              <div className="flex flex-col items-center gap-4 w-full">
                {['#home', '#servicos', '#sobre', '#portfolio', '#resultados', '#blog', '#contato'].map((hash) => (
                  <button 
                    key={hash}
                    onClick={() => navigate(hash)}
                    className={`text-3xl font-display uppercase tracking-[0.2em] transition-all duration-300 hover:scale-110 ${currentHash === hash ? 'text-gold-primary' : 'text-white/60 hover:text-white'}`}
                  >
                    {hash.replace('#', '') || 'home'}
                  </button>
                ))}
              </div>

              <div className="w-full h-px bg-white/10 my-4" />

              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-8">
                  <a href="https://www.instagram.com/attiva.digital" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold-primary transition-colors hover:scale-125 transform"><Instagram size={28} /></a>
                  <a href="https://www.facebook.com/leonardo.barretto" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold-primary transition-colors hover:scale-125 transform"><Facebook size={28} /></a>
                </div>
                
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2 font-bold">Contato Direto</p>
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold-primary font-mono text-sm tracking-widest hover:underline"
                  >
                    (41) 99874-5632
                  </a>
                </div>
              </div>
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
              initial={{ scale: 0.3, opacity: 0, rotate: -20, y: 100 }}
              animate={{ scale: 1.5, opacity: 1, rotate: 0, y: 0 }}
              transition={{ duration: 2, ease: "circOut" }}
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
                initial={{ opacity: 0, y: 120, scale: 0.7, rotate: -2 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 1.5, ease: "circOut" }}
                className="font-display text-4xl sm:text-6xl md:text-9xl lg:text-[12rem] text-white mb-6 leading-none tracking-tighter"
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
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 1.2, ease: "circOut" }}
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

            <ReviewsSection reviews={reviews} />
            <InstagramFeed />
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
                initial={{ opacity: 0, x: -100, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 1, ease: "circOut" }}
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
                initial={{ opacity: 0, scale: 0.7, rotate: 10, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 1.2, ease: "circOut" }}
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
                    initial={{ opacity: 0, y: 100, scale: 0.8, rotate: i % 2 === 0 ? -2 : 2 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "circOut" }}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
              {portfolio.slice(0, 9).map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.7, y: 120, rotate: i % 2 === 0 ? -3 : 3 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: "circOut" }}
                  onClick={() => setSelectedProject(p)}
                  className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer border border-zinc-800 hover:border-gold-primary/50 transition-all duration-500"
                >
                  {/* 1. Deep background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
                  
                  {/* 2. The SVG (The Hero) - Now with maximum highlight */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-10">
                    {/* Background Glow Effect - More intense */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.3)_0%,transparent_70%)] opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {p.svg ? (
                      <div className="w-full h-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 drop-shadow-[0_0_30px_rgba(201,168,76,0.6)]">
                        {p.svg}
                      </div>
                    ) : (
                      <p.icon size={64} className="opacity-50 text-gold-primary group-hover:scale-125 group-hover:opacity-100 transition-all duration-700 drop-shadow-[0_0_35px_rgba(201,168,76,0.8)]" />
                    )}
                  </div>

                  {/* 3. Readability Overlay - Gradient instead of solid to let SVG pop at top */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-500" />
                  
                  {/* 4. Content - Higher z-index */}
                  <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-500 z-30">
                    <div className="flex items-center gap-2 text-gold-primary text-xs uppercase tracking-[0.2em] font-bold mb-4">
                      <p.icon size={14} /> {p.category}
                    </div>
                    <h4 className="text-2xl md:text-3xl font-display text-white mb-3 leading-tight">{p.title}</h4>
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

            {/* Impact Charts Section */}
            <div className="mb-32">
              <div className="text-center mb-16">
                <h3 className="font-display text-4xl md:text-5xl text-white mb-4">Impacto em Números</h3>
                <div className="w-16 h-1 bg-gold-primary mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: "ROI Médio", value: "12.5x", icon: TrendingUp },
                  { label: "Leads Gerados", value: "2.5M+", icon: Users },
                  { label: "Vendas Diretas", value: "R$ 45M+", icon: ShoppingBag },
                  { label: "Retenção", value: "94%", icon: ShieldCheck }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 text-center group hover:border-gold-primary/30 transition-colors"
                  >
                    <stat.icon size={32} className="text-gold-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-display text-white mb-1">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Comparison Section: Sem Attiva vs Com Attiva */}
            <div className="bg-zinc-900/30 rounded-[3rem] border border-zinc-800 p-8 md:p-16 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 blur-[100px] rounded-full" />
              
              <div className="text-center mb-16">
                <h3 className="font-display text-4xl md:text-5xl text-white mb-4">O Diferencial Attiva</h3>
                <p className="text-zinc-500 uppercase tracking-widest text-xs">Por que somos a escolha das marcas de elite</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
                {/* Visual Connector */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />

                {/* Sem Attiva */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                      <X size={24} />
                    </div>
                    <h4 className="text-2xl font-display text-white">Sem Attiva Digital</h4>
                  </div>
                  {[
                    "Sites lentos e sem conversão",
                    "Tráfego pago sem estratégia de ROI",
                    "Redes sociais sem engajamento real",
                    "Falta de dados para tomada de decisão",
                    "Branding genérico e sem autoridade"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/30" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Com Attiva */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                      <Check size={24} />
                    </div>
                    <h4 className="text-2xl font-display text-gold-primary">Com Attiva Digital</h4>
                  </div>
                  {[
                    "Performance extrema e UX focado em vendas",
                    "Escala previsível com inteligência de dados",
                    "Comunidades ativas e advogados da marca",
                    "Dashboards em tempo real e foco no lucro",
                    "Posicionamento de elite e desejo de consumo"
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 text-white"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-primary shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
                      <span className="text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="mt-16 text-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('#contato')}
                  className="btn-gold px-12 py-5 rounded-full text-sm uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                >
                  Quero o Diferencial Attiva
                </motion.button>
              </div>
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
                  initial={{ opacity: 0, y: 100, scale: 0.8, rotate: i % 2 === 0 ? 2 : -2 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "circOut" }}
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
              {blogPosts.slice(0, 8).map((post, i) => (
                <BlogCard key={i} {...post} delay={i * 0.1} onClick={() => setSelectedPost(post)} />
              ))}
            </div>

            <div className="mt-20 text-center">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="border border-gold-primary text-gold-primary px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-gold-primary hover:text-black transition-all"
              >
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
                  <div className="flex items-center gap-6 group p-4 bg-gold-primary/5 rounded-2xl border border-gold-primary/20 hover:border-gold-primary/50 transition-all">
                    <div className="w-14 h-14 bg-gold-primary rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                      <User size={28} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gold-primary font-bold mb-1">Fale com nossa Especialista</div>
                      <a href={`https://wa.me/${SHELLY_WHATSAPP}`} className="text-2xl text-white hover:text-gold-primary transition-colors font-display tracking-tight">
                        {SHELLY_NAME}: (47) 99703-2739
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center text-gold-primary border border-zinc-800 group-hover:border-gold-primary transition-colors">
                      <MessageCircle />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-zinc-500">WhatsApp Geral</div>
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
                  window.open(`https://wa.me/${SHELLY_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
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
            <h4 className="text-white font-heading font-bold mb-8 uppercase tracking-widest text-sm">Contato</h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-black transition-all">
                  <User size={16} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500">Shelly</div>
                  <a href={`https://wa.me/${SHELLY_WHATSAPP}`} className="text-sm text-white hover:text-gold-primary transition-colors">(47) 99703-2739</a>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-black transition-all">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500">WhatsApp Geral</div>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-sm text-white hover:text-gold-primary transition-colors">(41) 99846-1858</a>
                </div>
              </div>
            </div>
            <h4 className="text-white font-heading font-bold mb-4 uppercase tracking-widest text-xs">Localização</h4>
            <p className="text-ink-silver text-xs opacity-60">Rua Elvira Annibaleto, 117 Ap 22<br />Novo Mundo, Curitiba – PR</p>
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
        href={`https://wa.me/${SHELLY_WHATSAPP}`} 
        target="_blank" 
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 transition-transform animate-bounce group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 px-4 py-2 bg-zinc-900 border border-gold-primary/30 text-white text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Fale com a Shelly agora!
        </span>
      </a>

      <BackToTop />
      <CookieBanner />
    </div>
  );
}
