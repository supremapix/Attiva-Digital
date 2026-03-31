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
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    { title: "E-commerce Premium", category: "Lojas Virtuais", result: "+210% em vendas" },
    { title: "Portal Imobiliário", category: "Sistemas Web", result: "Automação de leads" },
    { title: "App de Delivery", category: "Apps", result: "10k+ downloads" },
    { title: "Campanha Black Friday", category: "Tráfego Pago", result: "ROI de 12x" },
    { title: "Blog Institucional", category: "SEO", result: "1ª página Google" },
    { title: "Social Media Fashion", category: "Redes Sociais", result: "Engajamento +400%" },
  ];

  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <div className="min-h-screen selection:bg-gold-primary selection:text-black">
      <div id="curtain" className={isTransitioning ? 'curtain-animate' : ''} />

      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Logo onClick={() => navigate('#home')} />
          
          <div className="hidden md:flex gap-8 items-center">
            {['#home', '#servicos', '#sobre', '#portfolio', '#contato'].map((hash) => (
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
            className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-8 backdrop-blur-xl"
          >
            {['#home', '#servicos', '#sobre', '#portfolio', '#contato'].map((hash) => (
              <button 
                key={hash}
                onClick={() => navigate(hash)}
                className="text-3xl font-display text-white uppercase tracking-widest hover:text-gold-primary transition-colors"
              >
                {hash.replace('#', '') || 'home'}
              </button>
            ))}
            <div className="flex gap-6 mt-8">
              <a href="https://www.instagram.com/attiva.digital" target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:scale-110 transition-transform"><Instagram /></a>
              <a href="https://www.facebook.com/leonardo.barretto" target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:scale-110 transition-transform"><Facebook /></a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:scale-110 transition-transform"><MessageCircle /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {currentHash === '#home' && (
          <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
            <ParticleCanvas />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <Logo className="scale-150" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-5xl md:text-8xl lg:text-9xl text-white mb-4 leading-none"
            >
              ATTIVA DIGITAL
            </motion.h1>
            
            <Typewriter />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
              className="font-sans font-light text-lg md:text-2xl tracking-[0.2em] uppercase mb-12"
            >
              Agência de Publicidade Digital | Curitiba — PR
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col md:flex-row gap-6"
            >
              <button 
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
                className="btn-gold px-10 py-4 rounded-full text-sm uppercase tracking-widest flex items-center gap-3 justify-center elderly-friendly-btn"
              >
                <MessageCircle size={20} /> Fale Conosco
              </button>
              <button 
                onClick={() => navigate('#servicos')}
                className="border border-gold-primary text-gold-primary px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-gold-primary hover:text-black transition-all elderly-friendly-btn"
              >
                Nossos Serviços
              </button>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10 text-gold-primary cursor-pointer"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <ChevronDown size={40} />
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
                        <Users size={80} className="text-gold-primary" />
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
                  className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                    <Logo className="opacity-10 scale-150" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-500" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-gold-primary text-xs uppercase tracking-widest font-bold mb-2">{p.category}</span>
                    <h4 className="text-2xl font-heading font-bold text-white mb-2">{p.title}</h4>
                    <p className="text-gold-light font-sans font-semibold mb-6">{p.result}</p>
                    <button className="flex items-center gap-2 text-white font-bold group-hover:text-gold-primary transition-colors">
                      Ver Case <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
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
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 transition-transform animate-bounce"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
