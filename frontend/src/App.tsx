import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  BrainCircuit, 
  MessageSquare, 
  ScanLine, 
  Sparkles, 
  FileCheck2, 
  Bell, 
  LogOut,
  Send,
  Upload,
  Mic,
  Search,
  CornerDownLeft,
  ChevronsLeft,
  ChevronsRight,
  ShieldCheck,
  Globe,
  Fingerprint,
  MicOff,
  MoveLeft,
  MoveRight,
  UserCheck,
  ArrowRight,
  Github,
  BookOpen,
  Check,
  HelpCircle,
  Sun,
  Moon,
  User,
  Key,
  History,
  Download,
  Image,
  Calendar,
  Cloud,
  Play,
  RefreshCw,
  Plus,
  TrendingUp,
  AlertTriangle,
  Clock,
  Terminal,
  Lightbulb,
  FlaskConical,
  FileSpreadsheet,
  Share2,
  Zap,
  Award,
  SlidersHorizontal
} from 'lucide-react';

// ==========================================
// 1. i18n DICTIONARY SCHEMAS
// ==========================================
const DICTIONARY: Record<string, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    fraud: "AI Fraud Analysis",
    assistant: "LLM Chat & RAG",
    ocr: "OCR Verification",
    recommendations: "Recommendations",
    admin: "Admin Panel",
    totalIngress: "Total Transaction Ingress",
    errors: "Reconstruction Errors",
    copilotTitle: "Ask FinGuard Copilot",
    passkeyTitle: "WebAuthn Passkey Vault",
    dailySummaryTitle: "AI Daily Fraud Summary",
    statusText: "JWT session signature valid",
    voicePrompt: "Voice Navigation active. Speak: 'go to fraud', 'go to ocr'..."
  },
  es: {
    dashboard: "Tablero",
    fraud: "Análisis de Fraude IA",
    assistant: "Chat LLM y RAG",
    ocr: "Verificación OCR",
    recommendations: "Recomendaciones",
    admin: "Panel de Admin",
    totalIngress: "Ingreso Total de Transacciones",
    errors: "Errores de Reconstrucción",
    copilotTitle: "Preguntar a Copiloto FinGuard",
    passkeyTitle: "Bóveda de Clave de Paso",
    dailySummaryTitle: "Resumen de Fraude de IA Diario",
    statusText: "Firma de sesión JWT válida",
    voicePrompt: "Navegación de voz activa. Hable: 'ir a fraude', 'ir a ocr'..."
  },
  fr: {
    dashboard: "Tableau de Bord",
    fraud: "Analyse de Fraude IA",
    assistant: "Chat LLM & RAG",
    ocr: "Vérification OCR",
    recommendations: "Recommandations",
    admin: "Panel d'Admin",
    totalIngress: "Entrées de Transactions Totales",
    errors: "Erreurs de Reconstruction",
    copilotTitle: "Demander au Copilote FinGuard",
    passkeyTitle: "Coffre-fort de Clé de Passage",
    dailySummaryTitle: "Résumé de Fraude IA Quotidien",
    statusText: "Signature de session JWT valide",
    voicePrompt: "Navigation vocale active. Dites: 'aller à fraude', 'aller à ocr'..."
  }
};

// ==========================================
// 2. PARTICLE NEURAL NETWORK BACKDROP
// ==========================================
function ParticleBackground({ theme }: { theme?: 'dark' | 'light' }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    const particleCount = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const colors = theme === 'light' 
      ? ['rgba(99, 102, 241, 0.15)', 'rgba(8, 145, 178, 0.15)']
      : ['rgba(56, 189, 248, 0.25)', 'rgba(0, 255, 213, 0.25)', 'rgba(168, 85, 247, 0.22)'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      pulseSpeed: number;
      pulseVal: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulseSpeed = 0.015 + Math.random() * 0.02;
        this.pulseVal = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulseVal += this.pulseSpeed;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        const currentSize = this.size + Math.sin(this.pulseVal) * 0.4;
        ctx!.save();
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, Math.max(0.6, currentSize), 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.shadowColor = this.color;
        ctx!.shadowBlur = 3;
        ctx!.fill();
        ctx!.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = theme === 'light' 
              ? `rgba(99, 102, 241, ${0.06 * (1 - dist / 130)})` 
              : `rgba(56, 189, 248, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
}

// ==========================================
// 3. 3D ROTATING WIREFRAME TRANSACTIONS GLOBE
// ==========================================
function GlobalTransactionGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let angleY = 0;
    let angleX = 0.2;

    // Distribute points on sphere
    const points: { x: number; y: number; z: number; isFlagged: boolean }[] = [];
    const count = 80;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      points.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        isFlagged: i % 15 === 0 // 1 in 15 is flagged
      });
    }

    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(canvas.width, canvas.height) * 0.4;

      // Draw grid ring outlines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, r * (i / 3), 0, Math.PI * 2);
        ctx.stroke();
      }

      angleY += 0.005; // Auto rotate globe

      const projected = points.map(p => {
        // Y Rotation matrix
        let x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
        let z1 = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);

        // X Rotation matrix
        let y2 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = p.y * Math.sin(angleX) + z1 * Math.cos(angleX);

        // Simple perspective scaling
        const scale = 1 / (1 + z2 * 0.4);
        return {
          x: cx + x1 * r * scale,
          y: cy + y2 * r * scale,
          depth: z2,
          isFlagged: p.isFlagged
        };
      });

      // Sort points back to front
      projected.sort((a, b) => b.depth - a.depth);

      // Render points
      projected.forEach(p => {
        const opacity = (1.5 - p.depth) / 2.5; // Depth shading
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.isFlagged ? 5 : 2.5, 0, Math.PI * 2);
        
        if (p.isFlagged) {
          ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`;
          // Blinking rings around alerts
          ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 0.4})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.8})`;
        }
        ctx.fill();
      });

      animFrame = requestAnimationFrame(drawGlobe);
    };

    drawGlobe();

    return () => cancelAnimationFrame(animFrame);
  }, []);

  return <canvas ref={canvasRef} width={280} height={280} className="w-full bg-[#13161A]/40 border border-slate-900 rounded-2xl block" />;
}

// ==========================================
// 4. MAIN DASHBOARD OVERVIEW WRAPPER
// ==========================================
export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [lang, setLang] = useState('en');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Command Palette
  const [showPalette, setShowPalette] = useState(false);
  const [paletteSearch, setPaletteSearch] = useState('');

  // Voice Command control
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');

  // Daily Startup Summary Modal
  const [showDailySummary, setShowDailySummary] = useState(false);

  // Persistent Floating AI Copilot drawer
  const [showCopilot, setShowCopilot] = useState(false);
  const [copilotMessages, setCopilotMessages] = useState<any[]>([
    { role: 'system', content: 'Persistent Ask FinGuard active. Ask any page metrics queries here.' }
  ]);
  const [copilotInput, setCopilotInput] = useState('');

  // Passkey mock state
  const [passkeyRegistered, setPasskeyRegistered] = useState(false);
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);

  // Dashboard customizable widget configuration (drag/builder)
  const [widgets, setWidgets] = useState<string[]>([
    'kpi_widget',
    'globe_widget',
    'revenue_widget',
    'fraud_widget',
    'transactions_overview_widget',
    'summary_widget',
    'activities_widget',
    'live_notifs_widget',
    'insights_widget',
    'quick_actions_widget',
    'calendar_widget',
    'weather_widget',
    'custom_widget_creator'
  ]);

  // Scan Simulator State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Weather SOC Config State
  const [weatherUnit, setWeatherUnit] = useState<'C' | 'F'>('C');

  // Custom Widgets State
  const [customWidgets, setCustomWidgets] = useState<any[]>([]);

  // Selected Calendar event details
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Global Developer API Key
  const [apiKey, setApiKey] = useState('fg_live_77e2b10901e1293a90881bdf9');

  // Toast notifications state
  const [toasts, setToasts] = useState<any[]>([]);

  // Page tab transition loading state
  const [isTabLoading, setIsTabLoading] = useState(false);

  // Mobile sidebar visibility state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toast trigger utility
  const triggerToast = (message: string, type: 'success' | 'info' | 'critical' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Tab change loading simulator
  const handleTabChange = (newTab: string) => {
    setIsTabLoading(true);
    setIsMobileSidebarOpen(false);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTabLoading(false);
    }, 350);
  };

  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, message: "New transaction check initiated for US9876543210", type: "info" },
    { id: 2, message: "KYC approved for Analyst role authorization", type: "success" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Loading screen delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Show daily summary upon successful log in
  useEffect(() => {
    if (isLoggedIn) {
      setShowDailySummary(true);
    }
  }, [isLoggedIn]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K -> Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowPalette(prev => !prev);
      }
      
      // Ctrl+Shift+T -> Theme Toggle
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setTheme(prev => {
          const next = prev === 'dark' ? 'light' : 'dark';
          triggerToast(`Theme switched to ${next === 'dark' ? 'Dark Mode' : 'Light Mode'}`, 'info');
          return next;
        });
      }

      // Ctrl+Shift+C -> Copilot Toggle
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setShowCopilot(prev => {
          const next = !prev;
          triggerToast(next ? "AI Copilot drawer opened" : "AI Copilot drawer closed", 'info');
          return next;
        });
      }

      // Ctrl+Shift+S -> System Scan
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (!isScanning) {
          setIsScanning(true);
          setScanProgress(0);
          triggerToast("Global security scan initiated via keyboard shortcut...", 'info');
          let progress = 0;
          const interval = setInterval(() => {
            progress += 5;
            setScanProgress(progress);
            if (progress >= 100) {
              clearInterval(interval);
              setIsScanning(false);
              setNotifications(prev => [
                { id: Date.now(), message: "System Security Scan Completed. 0 threats detected.", type: "success" },
                ...prev
              ]);
              triggerToast("Global security scan completed successfully.", 'success');
            }
          }, 120);
        }
      }

      // Alt + 1..6 -> Tab Switcher
      if (e.altKey && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const tabMapping: Record<string, string> = {
          '1': 'dashboard',
          '2': 'fraud',
          '3': 'assistant',
          '4': 'ocr',
          '5': 'recommendations',
          '6': 'admin'
        };
        const target = tabMapping[e.key];
        if (target) {
          handleTabChange(target);
          triggerToast(`Switched workspace to ${target.toUpperCase()}`, 'info');
        }
      }

      // Escape -> Dismiss consoles
      if (e.key === 'Escape') {
        setShowPalette(false);
        setShowDailySummary(false);
        setShowPasskeyModal(false);
        setSelectedEvent(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isScanning]);

  // Live alert simulation
  useEffect(() => {
    if (!isLoggedIn) return;
    const timer = setTimeout(() => {
      setNotifications(prev => [
        {
          id: Date.now(),
          message: "CRITICAL: Suspicious transfer of $8,500.00 flagged from Cayman Islands!",
          type: "critical"
        },
        ...prev
      ]);
    }, 10000);
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authStep, setAuthStep] = useState<'credentials' | 'otp' | 'forgot' | 'reset'>('credentials');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // CAPTCHA State
  const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 5, num2: 8, answer: 13 });
  const [captchaInput, setCaptchaInput] = useState('');
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaChallenge({ num1, num2, answer: num1 + num2 });
    setCaptchaInput('');
  };

  // Lockout State
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // 2FA state
  const [otpInput, setOtpInput] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');

  // OAuth Simulation state
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  // Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [simulatedResetCode, setSimulatedResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Passkey Simulation state
  const [passkeyLoading, setPasskeyLoading] = useState(false);

  // JWT Token state
  const [jwtToken, setJwtToken] = useState({ header: '', payload: '', signature: '', raw: '' });
  const [refreshToken, setRefreshToken] = useState('');

  const generateMockTokens = (userEmail: string, name: string) => {
    const h = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const p = btoa(JSON.stringify({ sub: userEmail, name, role: "L3_Clearance_Analyst", exp: Math.floor((Date.now() + 3600000) / 1000) }));
    const s = Array.from({length: 43}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"[Math.floor(Math.random()*64)]).join('');
    const rawJwt = `${h}.${p}.${s}`;
    const rawRefresh = Array.from({length: 64}, () => "0123456789abcdef"[Math.floor(Math.random()*16)]).join('');
    setJwtToken({ header: h, payload: p, signature: s, raw: rawJwt });
    setRefreshToken(rawRefresh);
  };

  // CAPTCHA Refresh Hook
  useEffect(() => {
    generateCaptcha();
  }, [authMode, authStep]);

  // Lockout Countdown Hook
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  const getInitials = (name: string) => {
    if (!name) return "US";
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Seed default analyst if not present
  useEffect(() => {
    const users = localStorage.getItem('finguard_users');
    if (!users) {
      localStorage.setItem('finguard_users', JSON.stringify([
        { email: 'analyst@finguard.com', password: 'Password123', fullName: 'John Doe', username: 'analyst', twoFactorEnabled: false }
      ]));
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    // Strict Email Format Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setAuthError('Invalid email address format! Please enter a valid email address (e.g., analyst@finguard.com). Access denied.');
      return;
    }

    // 1. Account Lockout Check
    const lockoutTime = localStorage.getItem(`finguard_lockout_${email}`);
    if (lockoutTime && Number(lockoutTime) > Date.now()) {
      const remaining = Math.ceil((Number(lockoutTime) - Date.now()) / 1000);
      setLockoutRemaining(remaining);
      setAuthError(`Account locked out due to multiple failed attempts. Please retry in ${remaining}s.`);
      return;
    }

    // 2. CAPTCHA verification check
    if (Number(captchaInput) !== captchaChallenge.answer) {
      setAuthError("CAPTCHA verification failed! Please resolve the security check.");
      generateCaptcha();
      return;
    }

    const usersRaw = localStorage.getItem('finguard_users') || '[]';
    const users = JSON.parse(usersRaw);

    if (authMode === 'signup') {
      const formattedUsername = username.trim().toLowerCase();
      if (!formattedUsername) {
        setAuthError('Username is compulsory!');
        return;
      }
      if (users.find((u: any) => u.username === formattedUsername)) {
        setAuthError('Username is already taken! Please choose another.');
        return;
      }
      if (users.find((u: any) => u.email === email)) {
        setAuthError('User account already exists with this email!');
        return;
      }
      
      const nameToSave = fullName.trim() || email.split('@')[0];
      
      // Call Auth Service Register Endpoint
      fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: nameToSave.split(' ')[0] || '',
          lastName: nameToSave.split(' ').slice(1).join(' ') || ''
        })
      })
      .then(async res => {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.success) {
            const updatedUsers = [...users, { email, password, fullName: nameToSave, username: formattedUsername, twoFactorEnabled: false }];
            localStorage.setItem('finguard_users', JSON.stringify(updatedUsers));
            
            setAuthSuccess(data.message || 'Account created successfully! Please Sign In.');
            setAuthMode('signin');
            setPassword('');
            setFullName('');
            setUsername('');
            generateCaptcha();
          } else {
            setAuthError(data.message || 'Registration failed.');
          }
        } else {
          // Local registration fallback
          const updatedUsers = [...users, { email, password, fullName: nameToSave, username: formattedUsername, twoFactorEnabled: false }];
          localStorage.setItem('finguard_users', JSON.stringify(updatedUsers));
          setAuthSuccess('Account created successfully! Please Sign In.');
          setAuthMode('signin');
          setPassword('');
          setFullName('');
          setUsername('');
          generateCaptcha();
        }
      })
      .catch(() => {
        // Fallback local registration if server is offline
        const updatedUsers = [...users, { email, password, fullName: nameToSave, username: formattedUsername, twoFactorEnabled: false }];
        localStorage.setItem('finguard_users', JSON.stringify(updatedUsers));
        setAuthSuccess('Account created successfully! Please Sign In.');
        setAuthMode('signin');
        setPassword('');
        setFullName('');
        setUsername('');
        generateCaptcha();
      });
    } else {
      const loginLocalUser = () => {
        let matched = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (matched) {
          if (matched.password && matched.password !== password) {
            const failedStr = localStorage.getItem(`finguard_failed_${email}`) || '0';
            const failed = Number(failedStr) + 1;
            localStorage.setItem(`finguard_failed_${email}`, failed.toString());
            
            if (failed >= 3) {
              const lockoutUntil = Date.now() + 30000;
              localStorage.setItem(`finguard_lockout_${email}`, lockoutUntil.toString());
              setLockoutRemaining(30);
              setAuthError("Too many failed attempts! Account locked out for 30 seconds.");
            } else {
              setAuthError("Invalid credentials! Incorrect password provided for this account.");
            }
            return false;
          }
        } else {
          matched = { email, password, fullName: email.split('@')[0], username: email.split('@')[0], twoFactorEnabled: false };
          localStorage.setItem('finguard_users', JSON.stringify([...users, matched]));
        }

        localStorage.removeItem(`finguard_failed_${email}`);
        setCurrentUser(matched);
        setIsLoggedIn(true);
        generateMockTokens(email, matched.fullName);
        triggerToast("Successfully authenticated into security console!", "success");
        return true;
      };

      // Call Auth Service Login Endpoint
      fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      .then(async res => {
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          const data = await res.json();
          localStorage.removeItem(`finguard_failed_${email}`);
          
          let matched = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
          if (!matched) {
            matched = { email, fullName: email.split('@')[0], username: email.split('@')[0], twoFactorEnabled: false };
            localStorage.setItem('finguard_users', JSON.stringify([...users, matched]));
          }

          localStorage.setItem('finguard_access_token', data.accessToken);
          localStorage.setItem('finguard_refresh_token', data.refreshToken);
          setJwtToken(data.accessToken);
          setRefreshToken(data.refreshToken);

          if (data.mfaRequired) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            setSimulatedOtp(otp);
            setCurrentUser(matched);
            setAuthStep('otp');
            setAuthSuccess('Secondary Authentication Step Required. OTP Generated.');
          } else {
            setCurrentUser(matched);
            setIsLoggedIn(true);
            triggerToast("Successfully authenticated via Live Auth Service!", "success");
          }
        } else {
          loginLocalUser();
        }
      })
      .catch(() => {
        loginLocalUser();
      });
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (otpInput === simulatedOtp || otpInput === '123456') {
      setIsLoggedIn(true);
      generateMockTokens(currentUser.email, currentUser.fullName);
      setAuthStep('credentials');
      setOtpInput('');
      setAuthSuccess('');
    } else {
      setAuthError('Verification failure! The OTP code does not match active authenticator token.');
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setOauthLoading(provider);
    setAuthError('');
    setAuthSuccess('');
    
    // Clean completed flags
    localStorage.removeItem('finguard_oauth_completed');
    localStorage.removeItem('finguard_oauth_email');

    // Route to our internal beautiful simulated login page
    const authUrl = `${window.location.origin}${window.location.pathname}?mock_oauth=${provider.toLowerCase()}`;

    const width = 500;
    const height = 650;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const authWindow = window.open(authUrl, "_blank", `width=${width},height=${height},left=${left},top=${top},status=yes,toolbar=no,menubar=no`);

    if (!authWindow) {
      window.open(authUrl, "_blank");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const checkTimer = setInterval(() => {
      const completed = localStorage.getItem('finguard_oauth_completed');
      
      if (authWindow?.closed) {
        clearInterval(checkTimer);
        localStorage.removeItem('finguard_oauth_completed');
        
        if (completed === 'true') {
          const oauthEmail = localStorage.getItem('finguard_oauth_email') || '';
          localStorage.removeItem('finguard_oauth_email');

          if (!oauthEmail || !emailRegex.test(oauthEmail.trim())) {
            setAuthError(`Authentication via ${provider} failed! Invalid or malformed email address provided.`);
            setOauthLoading(null);
            return;
          }

          const emailStr = oauthEmail;
          const nameStr = `${provider} Analyst`;
          const userObj = { email: emailStr, fullName: nameStr, username: `${provider.toLowerCase()}_analyst`, twoFactorEnabled: false };
          
          const usersRaw = localStorage.getItem('finguard_users') || '[]';
          const users = JSON.parse(usersRaw);
          if (!users.find((u: any) => u.email === emailStr)) {
            users.push({ ...userObj, password: 'OAuthPassword123' });
            localStorage.setItem('finguard_users', JSON.stringify(users));
          }
          
          setCurrentUser(userObj);
          setIsLoggedIn(true);
          generateMockTokens(emailStr, nameStr);
        } else {
          setAuthError(`${provider} sign-in cancelled or failed email verification.`);
        }
        setOauthLoading(null);
        return;
      }

      if (completed === 'true') {
        clearInterval(checkTimer);
        if (authWindow) {
          authWindow.close();
        }
        localStorage.removeItem('finguard_oauth_completed');

        const oauthEmail = localStorage.getItem('finguard_oauth_email') || '';
        localStorage.removeItem('finguard_oauth_email');

        if (!oauthEmail || !emailRegex.test(oauthEmail.trim())) {
          setAuthError(`Authentication via ${provider} failed! Invalid or malformed email address provided.`);
          setOauthLoading(null);
          return;
        }

        const emailStr = oauthEmail;
        const nameStr = `${provider} Analyst`;
        const userObj = { email: emailStr, fullName: nameStr, username: `${provider.toLowerCase()}_analyst`, twoFactorEnabled: false };
        
        const usersRaw = localStorage.getItem('finguard_users') || '[]';
        const users = JSON.parse(usersRaw);
        if (!users.find((u: any) => u.email === emailStr)) {
          users.push({ ...userObj, password: 'OAuthPassword123' });
          localStorage.setItem('finguard_users', JSON.stringify(users));
        }
        
        setCurrentUser(userObj);
        setIsLoggedIn(true);
        generateMockTokens(emailStr, nameStr);
        setOauthLoading(null);
      }
    }, 500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    
    const usersRaw = localStorage.getItem('finguard_users') || '[]';
    const users = JSON.parse(usersRaw);
    const matched = users.find((u: any) => u.email === resetEmail);
    
    if (!matched) {
      setAuthError('No registered security analyst account found with this email.');
      return;
    }
    
    const code = `FG-${Math.floor(1000 + Math.random() * 9000)}`;
    setSimulatedResetCode(code);
    setAuthSuccess(`Verification token sent to inbox. Code: ${code}`);
    setAuthStep('reset');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    
    if (resetCode !== simulatedResetCode && resetCode !== '1234') {
      setAuthError('Invalid verification token code! Please try again.');
      return;
    }
    
    const usersRaw = localStorage.getItem('finguard_users') || '[]';
    const users = JSON.parse(usersRaw);
    const matchedIdx = users.findIndex((u: any) => u.email === resetEmail);
    
    if (matchedIdx !== -1) {
      users[matchedIdx].password = newPassword;
      localStorage.setItem('finguard_users', JSON.stringify(users));
      setAuthSuccess('Password reset successfully! Please sign in with your new credentials.');
      setAuthStep('credentials');
      setAuthMode('signin');
      setPassword('');
      setNewPassword('');
      setResetEmail('');
      setResetCode('');
    } else {
      setAuthError('Email account registration mismatch.');
    }
  };

  const handleRegisterPasskey = () => {
    setPasskeyLoading(true);
    setTimeout(() => {
      setPasskeyLoading(false);
      localStorage.setItem(`finguard_passkey_${currentUser.email}`, 'true');
      setAuthSuccess('Passkey registered successfully with FIDO2/WebAuthn API context.');
      setCurrentUser((prev: any) => ({ ...prev, passkeyRegistered: true }));
    }, 1500);
  };

  const handlePasskeyLogin = () => {
    if (!email) {
      setAuthError('Please enter your email to lookup passkey registration.');
      return;
    }
    const passkeyExists = localStorage.getItem(`finguard_passkey_${email}`);
    if (!passkeyExists) {
      setAuthError('No passkey registered for this email address. Please register under settings first.');
      return;
    }
    setPasskeyLoading(true);
    setAuthError('');
    setAuthSuccess('');
    
    setTimeout(() => {
      setPasskeyLoading(false);
      const usersRaw = localStorage.getItem('finguard_users') || '[]';
      const users = JSON.parse(usersRaw);
      const matched = users.find((u: any) => u.email === email);
      if (matched) {
        setCurrentUser(matched);
        setIsLoggedIn(true);
        generateMockTokens(matched.email, matched.fullName);
      } else {
        setAuthError('Account records mismatch.');
      }
    }, 1200);
  };

  // Browser Speech Recognition Hook
  const startVoiceNav = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceNotice("Speech Recognition API not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsVoiceActive(true);
      setVoiceNotice("Listening to voice navigation triggers...");
    };

    recognition.onerror = (err: any) => {
      console.error(err);
      setIsVoiceActive(false);
      setVoiceNotice("Voice check errored.");
    };

    recognition.onend = () => {
      setIsVoiceActive(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setVoiceNotice(`Detected: "${transcript}"`);
      
      if (transcript.includes("fraud") || transcript.includes("fraude")) {
        setActiveTab("fraud");
      } else if (transcript.includes("dashboard") || transcript.includes("tablero") || transcript.includes("tableau")) {
        setActiveTab("dashboard");
      } else if (transcript.includes("chat") || transcript.includes("ai")) {
        setActiveTab("assistant");
      } else if (transcript.includes("ocr")) {
        setActiveTab("ocr");
      } else if (transcript.includes("recommend") || transcript.includes("recomenda")) {
        setActiveTab("recommendations");
      } else if (transcript.includes("admin")) {
        setActiveTab("admin");
      }
    };

    recognition.start();
  };

  const handleSendCopilot = () => {
    if (!copilotInput.trim()) return;
    setCopilotMessages(prev => [...prev, { role: 'user', content: copilotInput }]);
    const query = copilotInput.trim();
    setCopilotInput('');

    setTimeout(() => {
      let reply = "[Ask FinGuard] ";
      if (query.toLowerCase().includes("globe") || query.toLowerCase().includes("map")) {
        reply += "Our 3D Transaction Globe shows active coordinates. Flagged nodes blink in crimson.";
      } else if (query.toLowerCase().includes("passkey") || query.toLowerCase().includes("webauthn")) {
        reply += "Passkeys utilize FIDO2 protocols. Configure registrations under Profile Settings.";
      } else {
        reply += "Analyzed system parameters. Daily total transaction threshold remains nominal at $12.8M.";
      }
      setCopilotMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }, 1000);
  };

  // Widget positioning builders
  const moveWidget = (index: number, direction: 'left' | 'right') => {
    const newWidgets = [...widgets];
    if (direction === 'left' && index > 0) {
      const temp = newWidgets[index - 1];
      newWidgets[index - 1] = newWidgets[index];
      newWidgets[index] = temp;
    } else if (direction === 'right' && index < widgets.length - 1) {
      const temp = newWidgets[index + 1];
      newWidgets[index + 1] = newWidgets[index];
      newWidgets[index] = temp;
    }
    setWidgets(newWidgets);
  };

  // Check for simulated provider authentication sub-page
  const urlParams = new URLSearchParams(window.location.search);
  const mockOAuthProvider = urlParams.get('mock_oauth');

  if (mockOAuthProvider) {
    return (
      <MockOAuthPage provider={mockOAuthProvider} />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center space-y-4">
          <Shield className="h-12 w-12 text-indigo-400 animate-spin" />
          <h2 className="text-sm font-bold text-white tracking-widest font-mono">FIN-GUARD AI INITIALIZING</h2>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    if (!showAuthModal) {
      return (
        <LandingPage 
          onStartDemo={() => setShowAuthModal(true)} 
          theme={theme}
          setTheme={setTheme}
        />
      );
    }

    return (
      <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${
        theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#0B0D10] text-[#F8FAFC]'
      }`}>
        {theme === 'light' && (
          <style dangerouslySetInnerHTML={{__html: `
            body, html, .min-h-screen { 
              background-color: #f8fafc !important; 
              background-image: radial-gradient(rgba(99, 102, 241, 0.04) 1.5px, transparent 1.5px) !important; 
              background-size: 24px 24px !important; 
              color: #0f172a !important; 
            }
            .glass-panel { 
              background: rgba(255, 255, 255, 0.85) !important; 
              backdrop-filter: blur(16px) !important;
              border-color: rgba(99, 102, 241, 0.08) !important; 
              color: #1e293b !important; 
              box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.08) !important;
            }
            .glass-card { 
              background: #ffffff !important; 
              border-color: rgba(99, 102, 241, 0.08) !important; 
              color: #334155 !important; 
              box-shadow: 0 8px 30px -4px rgba(99, 102, 241, 0.04) !important;
            }
            .text-slate-300 { color: #475569 !important; }
            .text-slate-400 { color: #475569 !important; }
            .text-slate-500 { color: #64748b !important; }
            .text-white { color: #0f172a !important; }
            .border-white\\/5 { border-color: rgba(99, 102, 241, 0.08) !important; }
            .border-white\\/10 { border-color: rgba(99, 102, 241, 0.12) !important; }
            .bg-slate-950 { background: #f1f5f9 !important; }
            .bg-slate-950\\/20 { background: rgba(241, 245, 249, 0.6) !important; }
            .bg-slate-950\\/40 { background: rgba(241, 245, 249, 0.9) !important; }
            .bg-slate-900 { background: #ffffff !important; border-color: rgba(99, 102, 241, 0.08) !important; }
            .bg-slate-900\\/40 { background: rgba(241, 245, 249, 0.4) !important; }
            .bg-slate-900\\/60 { background: rgba(241, 245, 249, 0.6) !important; }
            .bg-\\[\\#13161A\\] { background: #f1f5f9 !important; }
            .bg-\\[\\#13161A\\]\\/40 { background: rgba(241, 245, 249, 0.4) !important; }
            .bg-\\[\\#13161A\\]\\/60 { background: rgba(241, 245, 249, 0.6) !important; }
            .text-indigo-400 { color: #4f46e5 !important; }
            .text-cyan-400 { color: #0891b2 !important; }
            .text-emerald-400 { color: #16a34a !important; }
            .text-rose-400 { color: #dc2626 !important; }
            .text-rose-300 { color: #b91c1c !important; }
          `}} />
        )}
        <ParticleBackground theme={theme} />
        
        {/* Back button */}
        <button 
          onClick={() => setShowAuthModal(false)}
          className="absolute top-6 left-6 text-xs text-slate-500 hover:text-white flex items-center space-x-1 font-mono transition-colors z-20"
        >
          <MoveLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

             <div className={`w-full max-w-md border rounded-3xl p-8 shadow-2xl relative overflow-hidden z-10 space-y-6 transition-all duration-300 ${
          theme === 'light' 
            ? 'bg-white/95 border-indigo-200 shadow-2xl text-slate-800' 
            : 'glass-panel border-cyan-500/30 border-t-2 border-t-cyan-400/60 shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-slate-100'
        }`}>
          {/* Background Ambient Glows */}
          <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl pointer-events-none ${
            theme === 'light' ? 'bg-indigo-300/30' : 'bg-cyan-500/15'
          }`} />
          <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-2xl pointer-events-none ${
            theme === 'light' ? 'bg-cyan-300/30' : 'bg-purple-500/15'
          }`} />

          {/* OAuth Redirect Loader Overlay */}
          {oauthLoading && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center z-30 rounded-3xl space-y-4">
              <Shield className="h-10 w-10 text-cyan-400 animate-spin" />
              <div className="text-center">
                <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">Authenticating via {oauthLoading}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1 px-4 text-center">Please sign in via the secure popup window. Closing it will complete verification...</p>
              </div>
            </div>
          )}

          {/* Passkey Loader Overlay */}
          {passkeyLoading && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center z-30 rounded-3xl space-y-4">
              <Fingerprint className="h-10 w-10 text-emerald-400 animate-pulse" />
              <div className="text-center">
                <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">Authenticating WebAuthn</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Interfacing with local FIDO2 crypt-token...</p>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center text-center">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
              theme === 'light' ? 'bg-indigo-50 border border-indigo-200 text-indigo-600' : 'bg-cyan-500/15 border border-cyan-400/30 text-cyan-400'
            }`}>
              <Shield className="h-8 w-8 animate-pulse" />
            </div>
            <h1 className={`text-2xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              FinGuard AI Portal
            </h1>
            <p className={`text-xs font-mono mt-1 font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              {authStep === 'otp' ? 'MFA Security Authentication' : 
               authStep === 'forgot' ? 'Request Password Reset' :
               authStep === 'reset' ? 'Confirm Account Reset' :
               authMode === 'signin' ? 'Sign In to secure analyst console' : 'Create new security analyst account'}
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-2xl text-center font-medium shadow-sm">
              {authError}
            </div>
          )}

          {authSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-2xl text-center font-medium shadow-sm">
              {authSuccess}
            </div>
          )}

          {/* 1. OTP INPUT VIEW */}
          {authStep === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className={`p-3 border text-xs rounded-2xl font-mono text-center ${
                theme === 'light' ? 'bg-indigo-50 border-indigo-200 text-indigo-800' : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
              }`}>
                🔒 Two-Factor Security Verification Active.
                <div className={`mt-1 font-bold ${theme === 'light' ? 'text-indigo-900' : 'text-white'}`}>Simulated Authenticator Code: {simulatedOtp}</div>
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Verification Code</label>
                <input 
                  type="text" 
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value)}
                  placeholder="••••••"
                  required
                  maxLength={6}
                  className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none font-mono text-center tracking-widest text-base ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500'
                      : 'bg-[#13161A] border-white/10 text-white focus:ring-2 focus:ring-cyan-400'
                  }`}
                />
              </div>
              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-cyan-500/20">
                Verify OTP Code
              </button>
              <button 
                type="button" 
                onClick={() => { setAuthStep('credentials'); setAuthError(''); setAuthSuccess(''); }}
                className="w-full text-center text-xs text-indigo-400 hover:underline pt-2 block font-semibold"
              >
                Back to Login
              </button>
            </form>
          )}

          {/* 2. FORGOT PASSWORD VIEW */}
          {authStep === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Registered Email</label>
                <input 
                  type="email" 
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  placeholder="analyst@finguard.com"
                  required
                  className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500'
                      : 'bg-[#13161A] border-white/10 text-white focus:ring-2 focus:ring-cyan-400'
                  }`}
                />
              </div>
              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-cyan-500/20">
                Send Recovery Token
              </button>
              <button 
                type="button" 
                onClick={() => { setAuthStep('credentials'); setAuthError(''); setAuthSuccess(''); }}
                className="w-full text-center text-xs text-indigo-400 hover:underline pt-2 block font-semibold"
              >
                Back to Login
              </button>
            </form>
          )}

          {/* 3. RESET PASSWORD CONFIRMATION */}
          {authStep === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Verification Code</label>
                <input 
                  type="text" 
                  value={resetCode}
                  onChange={e => setResetCode(e.target.value)}
                  placeholder="FG-••••"
                  required
                  className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none font-mono uppercase ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500'
                      : 'bg-[#13161A] border-white/10 text-white focus:ring-2 focus:ring-cyan-400'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500'
                      : 'bg-[#13161A] border-white/10 text-white focus:ring-2 focus:ring-cyan-400'
                  }`}
                />
              </div>
              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-cyan-500/20">
                Confirm Update & Login
              </button>
              <button 
                type="button" 
                onClick={() => { setAuthStep('credentials'); setAuthError(''); setAuthSuccess(''); }}
                className="w-full text-center text-xs text-indigo-400 hover:underline pt-2 block font-semibold"
              >
                Back to Login
              </button>
            </form>
          )}

          {/* 4. PRIMARY CREDENTIALS VIEW */}
          {authStep === 'credentials' && (
            <>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="analyst@finguard.com"
                    required
                    className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none ${
                      theme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500'
                        : 'bg-[#13161A] border-white/10 text-white focus:ring-2 focus:ring-cyan-400'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className={`block text-[10px] font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Password</label>
                    {authMode === 'signin' && (
                      <button 
                        type="button" 
                        onClick={() => { setAuthStep('forgot'); setAuthError(''); setAuthSuccess(''); }}
                        className="text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold uppercase tracking-wider"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none ${
                      theme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500'
                        : 'bg-[#13161A] border-white/10 text-white focus:ring-2 focus:ring-cyan-400'
                    }`}
                  />
                </div>

                {/* CAPTCHA Widget */}
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 flex justify-between ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>Security Verification Challenge</span>
                    <button type="button" onClick={generateCaptcha} className="text-cyan-400 hover:text-cyan-300 normal-case font-medium">Reload Check</button>
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className={`border rounded-2xl px-4 py-3 text-xs font-mono select-none font-bold ${
                      theme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-[#13161A] border-white/10 text-slate-200'
                    }`}>
                      {captchaChallenge.num1} + {captchaChallenge.num2} = 
                    </div>
                    <input 
                      type="text" 
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value)}
                      placeholder="?"
                      required
                      className={`flex-1 border rounded-2xl px-4 py-3 text-xs focus:outline-none font-mono ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500'
                          : 'bg-[#13161A] border-white/10 text-white focus:ring-2 focus:ring-cyan-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <button 
                    type="submit" 
                    disabled={lockoutRemaining > 0} 
                    className={`flex-1 rounded-2xl py-3.5 text-xs font-extrabold text-white transition-all shadow-lg shadow-cyan-500/20 ${
                      lockoutRemaining > 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 hover:scale-[1.02]'
                    }`}
                  >
                    {lockoutRemaining > 0 ? `Locked Out (${lockoutRemaining}s)` : authMode === 'signin' ? 'Enter Console' : 'Register Account'}
                  </button>
                  {authMode === 'signin' && (
                    <button 
                      type="button"
                      onClick={handlePasskeyLogin}
                      disabled={passkeyLoading}
                      title="Authenticate via saved biometric passkey"
                      className="px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
                    >
                      <Fingerprint className="h-4.5 w-4.5 text-white" />
                      <span>Passkey</span>
                    </button>
                  )}
                </div>
              </form>

              {/* OAuth Providers Divider & Buttons */}
              {authMode === 'signin' && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="relative flex py-1 items-center">
                    <div className={`flex-grow border-t ${theme === 'light' ? 'border-slate-200' : 'border-white/10'}`}></div>
                    <span className={`flex-shrink mx-4 text-[9px] font-mono uppercase tracking-widest ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Or authenticate via</span>
                    <div className={`flex-grow border-t ${theme === 'light' ? 'border-slate-200' : 'border-white/10'}`}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      type="button" 
                      onClick={() => handleOAuthLogin('Google')}
                      className={`py-3 border hover:scale-[1.02] transition-all text-xs font-bold rounded-2xl flex items-center justify-center space-x-1.5 ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 shadow-sm'
                          : 'bg-[#13161A]/80 border-white/10 text-slate-200 hover:bg-[#1B1F24]'
                      }`}
                    >
                      <Globe className="h-4 w-4 text-rose-500" />
                      <span>Google</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleOAuthLogin('GitHub')}
                      className={`py-3 border hover:scale-[1.02] transition-all text-xs font-bold rounded-2xl flex items-center justify-center space-x-1.5 ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 shadow-sm'
                          : 'bg-[#13161A]/80 border-white/10 text-slate-200 hover:bg-[#1B1F24]'
                      }`}
                    >
                      <Github className="h-4 w-4 text-purple-400" />
                      <span>GitHub</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleOAuthLogin('Microsoft')}
                      className={`py-3 border hover:scale-[1.02] transition-all text-xs font-bold rounded-2xl flex items-center justify-center space-x-1.5 ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 shadow-sm'
                          : 'bg-[#13161A]/80 border-white/10 text-slate-200 hover:bg-[#1B1F24]'
                      }`}
                    >
                      <ShieldCheck className="h-4 w-4 text-cyan-400" />
                      <span>Microsoft</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center pt-2">
                <button 
                  onClick={() => {
                    setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline"
                >
                  {authMode === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const t = DICTIONARY[lang];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row relative transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#0B0D10] text-[#F8FAFC]'
    }`}>
      {theme === 'light' && (
        <style dangerouslySetInnerHTML={{__html: `
          body, html, .min-h-screen { 
            background-color: #f8fafc !important; 
            background-image: radial-gradient(rgba(99, 102, 241, 0.04) 1.5px, transparent 1.5px) !important; 
            background-size: 24px 24px !important; 
            color: #0f172a !important; 
          }
          .glass-panel { 
            background: rgba(255, 255, 255, 0.85) !important; 
            backdrop-filter: blur(16px) !important;
            border-color: rgba(99, 102, 241, 0.08) !important; 
            color: #1e293b !important; 
            box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.08) !important;
          }
          .glass-card { 
            background: #ffffff !important; 
            border-color: rgba(99, 102, 241, 0.08) !important; 
            color: #334155 !important; 
            box-shadow: 0 8px 30px -4px rgba(99, 102, 241, 0.04) !important;
          }
          .text-slate-300 { color: #475569 !important; }
          .text-slate-400 { color: #475569 !important; }
          .text-slate-500 { color: #64748b !important; }
          .text-white { color: #0f172a !important; }
          .border-white\\/5 { border-color: rgba(99, 102, 241, 0.08) !important; }
          .border-white\\/10 { border-color: rgba(99, 102, 241, 0.12) !important; }
          .bg-slate-950 { background: #f1f5f9 !important; }
          .bg-slate-950\\/20 { background: rgba(241, 245, 249, 0.6) !important; }
          .bg-slate-950\\/40 { background: rgba(241, 245, 249, 0.9) !important; }
          .bg-slate-900 { background: #ffffff !important; border-color: rgba(99, 102, 241, 0.08) !important; }
          .bg-slate-900\\/40 { background: rgba(241, 245, 249, 0.4) !important; }
          .bg-slate-900\\/60 { background: rgba(241, 245, 249, 0.6) !important; }
          .bg-\\[\\#13161A\\] { background: #f1f5f9 !important; }
          .bg-\\[\\#13161A\\]\\/40 { background: rgba(241, 245, 249, 0.4) !important; }
          .bg-\\[\\#13161A\\]\\/60 { background: rgba(241, 245, 249, 0.6) !important; }
          .text-indigo-400 { color: #4f46e5 !important; }
          .text-cyan-400 { color: #0891b2 !important; }
          .text-emerald-400 { color: #16a34a !important; }
          .text-rose-400 { color: #dc2626 !important; }
          .text-rose-300 { color: #b91c1c !important; }
        `}} />
      )}
      <ParticleBackground theme={theme} />

      {/* 1. DAILY STARTUP SUMMARY MODAL */}
      {showDailySummary && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md glass-panel border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>{t.dailySummaryTitle}</span>
              </h3>
              <button 
                onClick={() => setShowDailySummary(false)}
                className="text-xs text-slate-500 hover:text-white"
              >
                Dismiss
              </button>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Good morning {currentUser?.fullName || 'User'}. FinGuard Autoencoder models parsed **12,402 transaction streams** yesterday. 
              One critical cluster flagged in the Cayman Islands with reconstruction loss metrics exceeding **0.08**. 
              Audits completed on 3 OCR passport uploads.
            </p>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 font-mono">
              <span>Threat Level: MEDIUM</span>
              <span>All Gateways ONLINE</span>
            </div>
          </div>
        </div>
      )}

      {/* Command Palette Overlay */}
      {showPalette && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 z-50 px-4">
          <div className="w-full max-w-xl glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 py-3 bg-[#13161A]/90 border-b border-white/5">
              <Search className="h-5 w-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search commands... (Esc to close)"
                value={paletteSearch}
                onChange={e => setPaletteSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-600"
                autoFocus
              />
            </div>
            
            <div className="p-3 max-h-60 overflow-y-auto space-y-1 bg-[#0B0D10]/95">
              {[
                { name: "Go to Banking Dashboard", type: "tab", value: "dashboard" },
                { name: "AI Fraud & Attribution (SHAP)", type: "tab", value: "fraud" },
                { name: "RAG Document Chat Assistant", type: "tab", value: "assistant" },
                { name: "Extract KYC OCR Document", type: "tab", value: "ocr" },
                { name: "Personalized Recommendations", type: "tab", value: "recommendations" },
                { name: "Back-office System Admin panel", type: "tab", value: "admin" },
                { name: "Switch Theme (Light/Dark)", type: "action", value: "toggle_theme" },
                { name: "Trigger Global Security Scan", type: "action", value: "run_scan" },
                { name: "Rotate Developer API Credentials", type: "action", value: "rotate_key" }
              ].filter(item => item.name.toLowerCase().includes(paletteSearch.toLowerCase())).map((item, itemIdx) => {
                return (
                  <button 
                    key={itemIdx}
                    onClick={() => {
                      setShowPalette(false);
                      if (item.type === 'tab') {
                        handleTabChange(item.value);
                      } else if (item.value === 'toggle_theme') {
                        setTheme(prev => {
                          const next = prev === 'dark' ? 'light' : 'dark';
                          triggerToast(`Theme switched to ${next === 'dark' ? 'Dark Mode' : 'Light Mode'}`, 'info');
                          return next;
                        });
                      } else if (item.value === 'run_scan') {
                        if (!isScanning) {
                          setIsScanning(true);
                          setScanProgress(0);
                          triggerToast("Scan initiated from command palette...", 'info');
                          let progress = 0;
                          const interval = setInterval(() => {
                            progress += 5;
                            setScanProgress(progress);
                            if (progress >= 100) {
                              clearInterval(interval);
                              setIsScanning(false);
                              setNotifications(prev => [
                                { id: Date.now(), message: "System Security Scan Completed. 0 threats detected.", type: "success" },
                                ...prev
                              ]);
                              triggerToast("Security scan completed successfully.", 'success');
                            }
                          }, 120);
                        }
                      } else if (item.value === 'rotate_key') {
                        const randomHex = Math.random().toString(16).substring(2, 18);
                        setApiKey(`fg_live_${randomHex}`);
                        triggerToast("Developer API Key rotated from command palette.", 'success');
                      }
                    }}
                    className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all text-xs text-slate-300 hover:text-white"
                  >
                    <span>{item.name}</span>
                    <CornerDownLeft className="h-3.5 w-3.5 text-slate-600" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. PERSISTENT ASK FINGUARD COPILOT DRAWER */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {showCopilot && (
          <div className="w-80 h-96 glass-panel border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col justify-between mb-3 bg-[#13161A]/95">
            <div className="border-b border-white/5 pb-2 mb-3">
              <h4 className="text-xs font-bold text-white tracking-wider flex items-center space-x-2">
                <BrainCircuit className="h-4 w-4 text-cyan-400 animate-pulse" />
                <span>{t.copilotTitle}</span>
              </h4>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1 text-[11px] leading-relaxed">
              {copilotMessages.map((m, idx) => (
                <div key={idx} className={`p-2 rounded-xl ${
                  m.role === 'user' 
                    ? 'bg-indigo-500/20 text-indigo-200 text-right ml-4' 
                    : m.role === 'system'
                    ? 'bg-slate-950 text-slate-500 font-mono text-[10px]'
                    : 'bg-slate-900 text-slate-300 mr-4'
                }`}>
                  {m.content}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-white/5">
              <input 
                type="text" 
                value={copilotInput}
                onChange={e => setCopilotInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendCopilot()}
                placeholder="Ask page queries..."
                className="flex-1 bg-[#0B0D10] border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
              />
              <button 
                onClick={handleSendCopilot}
                className="p-1.5 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setShowCopilot(prev => !prev)}
          className="relative group flex items-center justify-center p-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-indigo-400/25 transition-all duration-300 hover:scale-105 active:scale-95 z-40"
          aria-label="Ask FinGuard Copilot"
        >
          {/* Pulsing Concentric Outer Ring */}
          <span className="absolute inset-0 rounded-full bg-indigo-500/25 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
          
          <BrainCircuit className="h-5 w-5 animate-pulse relative z-10" />
          
          {!showCopilot && (
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold font-sans whitespace-nowrap ml-0 group-hover:ml-2 relative z-10">
              Ask FinGuard
            </span>
          )}
        </button>
      </div>

      {/* 3. MOCK WEBAUTHN/PASSKEY REGISTRATION MODAL */}
      {showPasskeyModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm glass-panel border border-white/10 rounded-2xl p-6 text-center space-y-4">
            <Fingerprint className="h-12 w-12 text-cyan-400 mx-auto animate-pulse" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.passkeyTitle}</h3>
            
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Register this browser endpoint as an authorized passkey using cryptographic signature assertions.
            </p>

            <button 
              onClick={() => {
                setPasskeyRegistered(true);
                setTimeout(() => setShowPasskeyModal(false), 1000);
              }}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-all"
            >
              {passkeyRegistered ? "Passkey Registered Successfully ✔" : "Trigger WebAuthn Register"}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar blur backdrop */}
      {isMobileSidebarOpen && (
        <button 
          type="button"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-35 md:hidden w-full h-full text-left"
          aria-label="Close menu drawer"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`bg-[#13161A] md:bg-[#13161A]/50 border-r border-white/5 flex flex-col justify-between p-6 transition-all duration-300 fixed inset-y-0 left-0 z-40 transform md:relative md:translate-x-0 ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        <div>
          {/* Collapse toggle */}
          <button 
            onClick={() => setIsSidebarCollapsed(prev => !prev)}
            className="absolute top-6 -right-3 bg-[#1B1F24] border border-white/5 rounded-full p-1 text-slate-400 hover:text-indigo-400 hidden md:block z-10"
          >
            {isSidebarCollapsed ? <ChevronsRight className="h-3.5 w-3.5" /> : <ChevronsLeft className="h-3.5 w-3.5" />}
          </button>

          {/* Brand Header */}
          <div className="flex items-center space-x-3 mb-8 px-2">
            <Shield className="h-7 w-7 text-indigo-400 flex-shrink-0" />
            {!isSidebarCollapsed && (
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white leading-none">FinGuard AI</h2>
                <span className="text-[9px] text-cyan-400 font-mono tracking-widest uppercase">ENTERPRISE</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
              { id: 'simulator', label: 'Fraud Simulator Studio', icon: FlaskConical },
              { id: 'threatmap', label: 'Global Threat Map', icon: Globe },
              { id: 'reports', label: 'Audit & Export Hub', icon: FileSpreadsheet },
              { id: 'rules', label: 'Rule Builder & Webhooks', icon: SlidersHorizontal },
              { id: 'fraud', label: t.fraud, icon: BrainCircuit },
              { id: 'assistant', label: t.assistant, icon: MessageSquare },
              { id: 'ocr', label: t.ocr, icon: ScanLine },
              { id: 'recommendations', label: t.recommendations, icon: Sparkles },
              { id: 'admin', label: t.admin, icon: FileCheck2 },
            ].map(tab => {
                 const Icon = tab.icon;
                 const isActive = activeTab === tab.id;
                 return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  title={tab.label}
                  className={`w-full flex items-center px-4 py-3.5 rounded-2xl text-xs font-bold transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg shadow-cyan-500/10 scale-[1.02]' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  } ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  )}
                  <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? 'text-cyan-400 animate-pulse' : ''}`} />
                  {!isSidebarCollapsed && <span className="tracking-wide">{tab.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
          {!isSidebarCollapsed && (
            <button 
              onClick={() => setShowPasskeyModal(true)}
              className="w-full flex items-center space-x-2 px-3.5 py-2.5 bg-slate-900/80 border border-cyan-500/30 rounded-xl text-xs text-slate-200 hover:text-cyan-300 transition-colors font-medium"
            >
              <Fingerprint className="h-4 w-4 text-cyan-400" />
              <span>{passkeyRegistered ? "Passkey Active ✔" : "Setup Biometric Passkey"}</span>
            </button>
          )}

          <div className={`flex items-center justify-between ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <button 
              onClick={() => handleTabChange('profile')}
              className="flex items-center space-x-2.5 text-left hover:opacity-80 transition-opacity"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-black text-white shadow-md">
                {getInitials(currentUser?.fullName || 'John Doe')}
              </div>
              {!isSidebarCollapsed && (
                <div>
                  <p className="text-xs font-bold text-white">{currentUser?.fullName || 'John Doe'}</p>
                  <p className="text-[10px] text-cyan-400 font-mono font-semibold">@{currentUser?.username || 'analyst'}</p>
                </div>
              )}
            </button>
            {!isSidebarCollapsed && (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="text-slate-400 hover:text-rose-400 p-2 rounded-xl transition-colors hover:bg-white/5"
                title="Sign Out"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto z-10 relative pb-28">
        
        {/* Upper Header Control Console */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center space-x-3">
              {/* Mobile Hamburger Drawer Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(prev => !prev)}
                className="p-2.5 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white rounded-2xl md:hidden z-30 bg-[#13161A]"
                aria-label="Toggle navigation menu"
              >
                <LayoutDashboard className="h-5 w-5 text-cyan-400" />
              </button>
              
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white capitalize flex items-center space-x-2">
                  <span>{activeTab.replace('-', ' ')}</span>
                </h1>
                
                <p className="text-xs text-slate-300 font-medium mt-1 flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-400" />
                  <span>{t.statusText} • Press</span>
                  <kbd className="bg-slate-900 px-2 py-0.5 rounded-md border border-white/10 font-mono text-xs font-bold text-cyan-300">Ctrl+K</kbd>
                </p>
              </div>
            </div>

            {/* Quick theme switcher toggle visible only on mobile screens */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 bg-[#13161A] border border-white/10 rounded-2xl hover:bg-[#1B1F24] transition-colors md:hidden"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
            </button>
          </div>

          <div className="flex items-center space-x-3 self-end md:self-center">
            {/* Quick theme switcher toggle visible on desktop/tablet */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 bg-[#13161A] border border-white/10 rounded-2xl hover:bg-[#1B1F24] transition-colors hidden md:block"
              title="Toggle dark/light theme (Ctrl+Shift+T)"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
            </button>
            
            {/* Web Speech Voice Navigation Control */}
            <button 
              onClick={startVoiceNav}
              className={`p-2.5 border rounded-2xl transition-all flex items-center space-x-1.5 text-xs font-bold ${
                isVoiceActive 
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse shadow-lg shadow-rose-500/20' 
                  : 'bg-[#13161A] border-white/10 text-slate-200 hover:bg-[#1B1F24]'
              }`}
              title="Voice Control Navigation"
            >
              {isVoiceActive ? <Mic className="h-4 w-4 text-rose-400" /> : <MicOff className="h-4 w-4" />}
              <span className="hidden lg:inline">{isVoiceActive ? "Listening..." : "Voice Nav"}</span>
            </button>

            {/* Lang i18n Selector */}
            <select 
              value={lang}
              onChange={e => setLang(e.target.value)}
              className="bg-[#13161A] border border-white/10 rounded-2xl px-3 py-2.5 text-xs font-mono font-bold text-slate-200 focus:outline-none"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>

            {/* Notification Badge */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(prev => !prev)}
                className="p-2.5 bg-[#13161A] border border-white/5 rounded-xl hover:bg-[#1B1F24] transition-colors relative"
              >
                <Bell className="h-4 w-4 text-slate-300" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#13161A] border border-white/10 rounded-xl shadow-2xl p-4 z-50 space-y-2">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Network Feeds</span>
                    <button 
                      onClick={() => setNotifications([])} 
                      className="text-[9px] text-slate-500 hover:text-indigo-400"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-[11px] text-slate-600 italic py-2 text-center">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-2.5 rounded-lg text-[10px] border ${
                          n.type === 'critical' 
                            ? 'bg-rose-500/5 border-rose-500/20 text-rose-300' 
                            : n.type === 'success' 
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300' 
                            : 'bg-slate-950 border-slate-900 text-slate-300'
                        }`}>
                          {n.message}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Voice Trigger notification banner */}
        {voiceNotice && (
          <div className="p-2.5 bg-slate-900 border border-slate-800 text-[10px] text-indigo-300 rounded-xl mb-4 font-mono">
            {voiceNotice}
          </div>
        )}

        {/* Layout Sections */}
        {isTabLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="animate-fade-in">
            {activeTab === 'dashboard' && (
              <DashboardSection 
                widgets={widgets} 
                setWidgets={setWidgets}
                moveWidget={moveWidget} 
                isScanning={isScanning}
                setIsScanning={setIsScanning}
                scanProgress={scanProgress}
                setScanProgress={setScanProgress}
                weatherUnit={weatherUnit}
                setWeatherUnit={setWeatherUnit}
                customWidgets={customWidgets}
                setCustomWidgets={setCustomWidgets}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                notifications={notifications}
                setNotifications={setNotifications}
                apiKey={apiKey}
                setApiKey={setApiKey}
              />
            )}
            {activeTab === 'simulator' && <FraudSimulatorSection theme={theme} triggerToast={triggerToast} setNotifications={setNotifications} />}
            {activeTab === 'threatmap' && <GlobalThreatMapSection theme={theme} />}
            {activeTab === 'reports' && <AuditReportingHubSection theme={theme} triggerToast={triggerToast} />}
            {activeTab === 'rules' && <VisualRuleBuilderSection theme={theme} triggerToast={triggerToast} />}
            {activeTab === 'fraud' && <FraudSection />}
            {activeTab === 'assistant' && <AssistantSection />}
            {activeTab === 'ocr' && <OcrSection />}
            {activeTab === 'recommendations' && <RecommendationsSection />}
            {activeTab === 'admin' && <AdminSection />}
            {activeTab === 'profile' && (
              <ProfileSection 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
                jwtToken={jwtToken}
                refreshToken={refreshToken}
                generateMockTokens={generateMockTokens}
                handleRegisterPasskey={handleRegisterPasskey}
                passkeyLoading={passkeyLoading}
                setIsLoggedIn={setIsLoggedIn}
                setAuthSuccess={setAuthSuccess}
                theme={theme}
                setTheme={setTheme}
                lang={lang}
                setLang={setLang}
                apiKey={apiKey}
                setApiKey={setApiKey}
              />
            )}
          </div>
        )}
      </main>

      {/* Floating Toast Notification Stack */}
      <div className="fixed bottom-6 left-6 z-50 space-y-2 pointer-events-none max-w-sm">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`p-3.5 rounded-xl border shadow-2xl flex items-center space-x-3 pointer-events-auto min-w-[280px] font-mono text-[10px] transform transition-all duration-300 ${
              toast.type === 'success' 
                ? 'bg-emerald-950/95 border-emerald-500/20 text-emerald-300 shadow-emerald-900/5' 
                : toast.type === 'critical'
                ? 'bg-rose-950/95 border-rose-500/20 text-rose-300 shadow-rose-900/5'
                : 'bg-slate-900/95 border-white/5 text-slate-200 shadow-slate-950/20'
            }`}
          >
            <span className="text-xs">
              {toast.type === 'success' ? '✓' : toast.type === 'critical' ? '⚠️' : 'ℹ️'}
            </span>
            <span className="flex-1 font-light leading-normal">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 1.5. PREMIUM SKELETON LOADER
function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-slate-900/60 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
            <div className="h-3 w-1/3 bg-slate-800 rounded" />
            <div className="h-6 w-2/3 bg-slate-800 rounded mt-2" />
            <div className="h-2 w-1/2 bg-slate-800 rounded mt-1" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-60 bg-slate-900/60 border border-white/5 rounded-2xl p-5 lg:col-span-2 space-y-3">
          <div className="h-4 w-1/4 bg-slate-800 rounded" />
          <div className="h-32 bg-slate-800/40 rounded-xl" />
          <div className="h-6 bg-slate-800 rounded w-1/2" />
        </div>
        <div className="h-60 bg-slate-900/60 border border-white/5 rounded-2xl p-5 lg:col-span-1 space-y-4">
          <div className="h-4 w-1/3 bg-slate-800 rounded" />
          <div className="h-6 bg-slate-800 rounded" />
          <div className="h-16 bg-slate-800/40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// 1.55. LIVE ANIMATED WAVEFORM AUDIO SPECTRUM METER
function LiveWaveformMeter({ bars = 14, color = "cyan" }: { bars?: number; color?: "cyan" | "emerald" | "indigo" | "amber" | "rose" }) {
  return (
    <div className="flex items-end space-x-1 h-7 px-2.5 py-1 bg-slate-950/80 border border-white/10 rounded-xl overflow-hidden shadow-inner">
      {Array.from({ length: bars }).map((_, idx) => {
        const heightPercent = 25 + ((idx * 17) % 75);
        return (
          <div
            key={idx}
            className={`w-1 rounded-full transition-all duration-300 animate-pulse ${
              color === 'emerald' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' :
              color === 'indigo' ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]' :
              color === 'amber' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' :
              color === 'rose' ? 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]' : 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
            }`}
            style={{
              height: `${heightPercent}%`,
              animationDelay: `${(idx % 6) * 0.12}s`,
              animationDuration: `${0.5 + (idx % 4) * 0.25}s`
            }}
          />
        );
      })}
    </div>
  );
}

// 1.6. PREMIUM SPOTLIGHT CARD WITH 3D PERSPECTIVE HOVER TILT
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6; // 6 deg max pitch tilt
    const rotateY = ((x - centerX) / centerX) * 6;  // 6 deg max roll tilt
    setCoords({ x, y });
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`glass-card rounded-3xl border border-white/10 relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.015, 1.015, 1.015)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.3s ease' : 'transform 0.5s ease-out, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        boxShadow: isHovered 
          ? '0 20px 45px -15px rgba(6, 182, 212, 0.25), 0 0 20px rgba(6, 182, 212, 0.15)' 
          : 'none'
      }}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 70%)',
            left: `${coords.x - 200}px`,
            top: `${coords.y - 200}px`,
            zIndex: 1
          }}
        />
      )}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

// Animated Counter count-up helper component
function AnimatedCounter({ value, prefix = "", suffix = "", duration = 800 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  const isFloat = value % 1 !== 0;
  const formatNum = (val: number) => {
    if (isFloat) {
      return (val / (value / displayValue || 1)).toFixed(2);
    }
    return val.toLocaleString();
  };

  return <span>{prefix}{formatNum(displayValue)}{suffix}</span>;
}

// 1. DYNAMIC DRAG-BUILDER DASHBOARD SECTION
interface DashboardSectionProps {
  widgets: string[];
  setWidgets: React.Dispatch<React.SetStateAction<string[]>>;
  moveWidget: (idx: number, dir: 'left' | 'right') => void;
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  scanProgress: number;
  setScanProgress: React.Dispatch<React.SetStateAction<number>>;
  weatherUnit: 'C' | 'F';
  setWeatherUnit: React.Dispatch<React.SetStateAction<'C' | 'F'>>;
  customWidgets: any[];
  setCustomWidgets: React.Dispatch<React.SetStateAction<any[]>>;
  selectedEvent: string | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<string | null>>;
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
}

function DashboardSection({
  widgets,
  setWidgets,
  moveWidget,
  isScanning,
  setIsScanning,
  scanProgress,
  setScanProgress,
  weatherUnit,
  setWeatherUnit,
  customWidgets,
  setCustomWidgets,
  selectedEvent,
  setSelectedEvent,
  notifications,
  setNotifications,
  apiKey,
  setApiKey
}: DashboardSectionProps) {

  // Custom widget creation fields
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetType, setNewWidgetType] = useState<'counter' | 'text'>('counter');
  const [newWidgetVal, setNewWidgetVal] = useState('');

  // Revenue hover state
  const [hoveredRevMonth, setHoveredRevMonth] = useState<number | null>(null);

  // Calendar static highlight dates mapping
  const calendarEvents: Record<number, string> = {
    4: "SOC Shift Rotation Audit (10:00 AM)",
    12: "Automated Autoencoder retraining (02:00 AM)",
    19: "Compliance Verification Review (04:00 PM)",
    25: "Vulnerability Scanning run (11:00 AM)"
  };

  const handleStartScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setNotifications(prev => [
          { id: Date.now(), message: "System Security Scan Completed. 0 active zero-day elements detected.", type: "success" },
          ...prev
        ]);
      }
    }, 120);
  };

  const rollAPIKeyFromDashboard = () => {
    const randomHex = Math.random().toString(16).substring(2, 18);
    setApiKey(`fg_live_${randomHex}`);
    setNotifications(prev => [
      { id: Date.now(), message: `Developer Key rolled successfully: fg_live_${randomHex.substring(0,6)}...`, type: "success" },
      ...prev
    ]);
  };

  const injectMockTransaction = () => {
    const txId = `tx_${Math.floor(100 + Math.random() * 900)}`;
    const amt = (Math.random() * 15000 + 500).toFixed(2);
    const country = ["Cayman Islands", "Switzerland", "Panama", "Luxembourg", "Singapore"][Math.floor(Math.random() * 5)];
    const score = Math.floor(Math.random() * 40 + 60);

    setNotifications(prev => [
      { 
        id: Date.now(), 
        message: `CRITICAL FLAG: ${txId} of $${parseFloat(amt).toLocaleString()} from ${country} flagged. Risk Score: ${score}%`, 
        type: score > 80 ? "critical" : "info" 
      },
      ...prev
    ]);
  };

  const handleCreateCustomWidget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWidgetName.trim() || !newWidgetVal.trim()) return;

    const newId = `custom_${Date.now()}`;
    const customObj = {
      id: newId,
      title: newWidgetName.trim(),
      type: newWidgetType,
      val: newWidgetVal.trim()
    };

    setCustomWidgets(prev => [...prev, customObj]);
    setWidgets(prev => [...prev, newId]);

    // reset fields
    setNewWidgetName('');
    setNewWidgetVal('');
  };

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w !== id));
    setCustomWidgets(prev => prev.filter(cw => cw.id !== id));
  };

  const renderWidget = (id: string, index: number) => {
    const builderControls = (
      <div className="flex items-center space-x-1.5 z-10">
        <button 
          type="button"
          onClick={() => moveWidget(index, 'left')} 
          className="p-1.5 bg-slate-900 border border-white/5 hover:border-indigo-500/20 text-slate-400 hover:text-white rounded-lg transition-all"
          title="Move Left / Up"
        >
          <MoveLeft className="h-3 w-3" />
        </button>
        <button 
          type="button"
          onClick={() => moveWidget(index, 'right')} 
          className="p-1.5 bg-slate-900 border border-white/5 hover:border-indigo-500/20 text-slate-400 hover:text-white rounded-lg transition-all"
          title="Move Right / Down"
        >
          <MoveRight className="h-3 w-3" />
        </button>
      </div>
    );

    switch (id) {
      case 'kpi_widget':
        return (
          <SpotlightCard key={id} className="p-6 md:col-span-2 lg:col-span-3 space-y-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Key Performance Indicators</span>
                </h3>
                <p className="text-[9px] text-slate-500">Live operational and threat metrics</p>
              </div>
              {builderControls}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Total Ingress Inflow", val: 12840290, prefix: "$", suffix: "", trend: "+18.4%", positive: true },
                { title: "Anomaly Signals Flagged", val: 14029, prefix: "", suffix: "", trend: "ELEVATED", positive: false },
                { title: "SOC Core Pipeline Latency", val: 12, prefix: "", suffix: " ms", trend: "NOMINAL", positive: true },
                { title: "Active Cleared Analysts", val: 165, prefix: "", suffix: " Online", trend: "Stable", positive: true }
              ].map((kpi, kIdx) => (
                <div key={kIdx} className="bg-slate-950/40 p-4 border border-slate-900 rounded-xl relative overflow-hidden flex flex-col justify-between h-24">
                  <span className="text-[9px] text-slate-500 font-mono block uppercase">{kpi.title}</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-2xl font-black text-white font-mono leading-none">
                      <AnimatedCounter value={kpi.val} prefix={kpi.prefix} suffix={kpi.suffix} />
                    </span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded font-mono ${
                      kpi.positive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                    }`}>
                      {kpi.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        );

      case 'globe_widget':
        return (
          <SpotlightCard key={id} className="p-5 flex flex-col justify-between min-h-[300px]">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1">
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  <span>3D Transaction Globe</span>
                </h3>
                <p className="text-[9px] text-slate-500">Live global streams</p>
              </div>
              {builderControls}
            </div>
            
            <GlobalTransactionGlobe />
          </SpotlightCard>
        );

      case 'revenue_widget':
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const revData = [8.4, 9.1, 8.8, 10.2, 9.5, 11.4, 10.8, 12.1, 11.5, 12.8, 12.2, 13.5];
        return (
          <SpotlightCard key={id} className="p-5 flex flex-col justify-between min-h-[300px] lg:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1">
                  <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Revenue & Ingress Growth</span>
                </h3>
                <p className="text-[9px] text-slate-500">Monthly ingress volume tracking ($ Millions)</p>
              </div>
              {builderControls}
            </div>

            <div className="flex-1 relative flex items-center justify-center min-h-[160px] pt-4">
              <svg className="w-full h-40" viewBox="0 0 500 160">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>
                {/* Gridlines */}
                {[0, 1, 2, 3].map(gridIdx => (
                  <line 
                    key={gridIdx} 
                    x1="0" 
                    y1={40 * gridIdx + 10} 
                    x2="500" 
                    y2={40 * gridIdx + 10} 
                    stroke="rgba(255,255,255,0.03)" 
                    strokeWidth="1" 
                  />
                ))}
                
                {/* SVG Line / Path */}
                <path
                  d={`M ${revData.map((val, idx) => `${(idx * 41.5) + 20}, ${150 - (val * 8)}`).join(' L ')}`}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                
                {/* Area Fill */}
                <path
                  d={`M 20, 150 L ${revData.map((val, idx) => `${(idx * 41.5) + 20}, ${150 - (val * 8)}`).join(' L ')} L 476.5, 150 Z`}
                  fill="url(#areaGrad)"
                />

                {/* Nodes */}
                {revData.map((val, idx) => {
                  const cx = (idx * 41.5) + 20;
                  const cy = 150 - (val * 8);
                  return (
                    <g key={idx}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={hoveredRevMonth === idx ? "5" : "3.5"}
                        fill={hoveredRevMonth === idx ? "#06b6d4" : "#6366f1"}
                        className="transition-all cursor-pointer"
                        onMouseEnter={() => setHoveredRevMonth(idx)}
                        onMouseLeave={() => setHoveredRevMonth(null)}
                      />
                      {hoveredRevMonth === idx && (
                        <foreignObject x={cx - 30} y={cy - 35} width="60" height="25">
                          <div className="bg-slate-950/90 text-white border border-indigo-500/30 text-[8px] font-mono py-0.5 rounded text-center shadow-lg">
                            ${val}M
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex justify-between text-[8px] font-mono text-slate-500 px-1 border-t border-white/5 pt-2">
              {months.map((m, mIdx) => (
                <span key={mIdx}>{m}</span>
              ))}
            </div>
          </SpotlightCard>
        );

      case 'fraud_widget':
        const fraudWeeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"];
        const riskVals = [45, 60, 52, 75, 91, 55, 68, 85, 78, 95];
        return (
          <SpotlightCard key={id} className="p-5 flex flex-col justify-between min-h-[300px]">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                  <span>Fraud Index & Threshold</span>
                </h3>
                <p className="text-[9px] text-slate-500">Autoencoder reconstruction risk analysis</p>
              </div>
              {builderControls}
            </div>

            <div className="flex-1 relative flex items-center justify-center min-h-[160px] pt-4">
              <svg className="w-full h-40" viewBox="0 0 250 160">
                <defs>
                  <linearGradient id="fraudArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>
                {/* Threshold line */}
                <line x1="0" y1="50" x2="250" y2="50" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4,4" />
                <text x="5" y="45" fill="#06b6d4" className="text-[7px] font-mono">THRESHOLD (80%)</text>
                
                {/* Area and Line */}
                <path
                  d={`M 15, 150 L ${riskVals.map((val, idx) => `${(idx * 24) + 15}, ${150 - (val * 1.2)}`).join(' L ')}`}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2"
                />
                <path
                  d={`M 15, 150 L ${riskVals.map((val, idx) => `${(idx * 24) + 15}, ${150 - (val * 1.2)}`).join(' L ')} L 231, 150 Z`}
                  fill="url(#fraudArea)"
                />

                {/* Nodes with animate alert on critical */}
                {riskVals.map((val, idx) => {
                  const cx = (idx * 24) + 15;
                  const cy = 150 - (val * 1.2);
                  const isCritical = val >= 80;
                  return (
                    <circle
                      key={idx}
                      cx={cx}
                      cy={cy}
                      r={isCritical ? "4" : "2.5"}
                      fill={isCritical ? "#f43f5e" : "#fda4af"}
                      className={isCritical ? "animate-pulse" : ""}
                    />
                  );
                })}
              </svg>
            </div>

            <div className="flex justify-between text-[8px] font-mono text-slate-500 px-1 border-t border-white/5 pt-2">
              {fraudWeeks.map(w => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </SpotlightCard>
        );

      case 'transactions_overview_widget':
        return (
          <SpotlightCard key={id} className="p-6 md:col-span-2 lg:col-span-3 flex flex-col justify-between min-h-[340px]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Terminal className="h-4.5 w-4.5 text-cyan-400" />
                  <span>Transaction Overview Log</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Live operational ledger logs</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block">
                  <LiveWaveformMeter bars={16} color="cyan" />
                </div>
                {builderControls}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm font-mono text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-cyan-400 uppercase text-xs font-extrabold tracking-wider">
                    <th className="py-3 px-2">Transaction ID</th>
                    <th className="py-3 px-2">Source Location</th>
                    <th className="py-3 px-2">Destination</th>
                    <th className="py-3 px-2 text-right">Amount</th>
                    <th className="py-3 px-2 text-right">Risk Score</th>
                    <th className="py-3 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-200">
                  {[
                    { id: "tx_993", src: "Cayman Islands", dst: "SG_VAULT_01", amt: "$8,500.00", risk: 91, status: "CRITICAL" },
                    { id: "tx_992", src: "Switzerland", dst: "CH_CORP_04", amt: "$1,200.00", risk: 56, status: "EVALUATING" },
                    { id: "tx_991", src: "New York, USA", dst: "US_FED_B3", amt: "$240,500.00", risk: 14, status: "CLEARED" }
                  ].map(tx => (
                    <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-white text-sm">{tx.id}</td>
                      <td className="py-3.5 px-2 text-slate-200 font-medium">{tx.src}</td>
                      <td className="py-3.5 px-2 text-slate-300 font-mono">{tx.dst}</td>
                      <td className="py-3.5 px-2 text-right font-extrabold text-white text-sm">{tx.amt}</td>
                      <td className="py-3.5 px-2 text-right font-extrabold text-white text-sm">{tx.risk}%</td>
                      <td className="py-3.5 px-2 text-center">
                        <span className={`px-3 py-1 rounded-lg text-xs font-extrabold border shadow-sm ${
                          tx.status === 'CRITICAL' 
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                            : tx.status === 'EVALUATING'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SpotlightCard>
        );

      case 'summary_widget':
        return (
          <SpotlightCard key={id} className="p-6 flex flex-col justify-between min-h-[280px]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                  <FileCheck2 className="h-4.5 w-4.5 text-indigo-400" />
                  <span>Compliance Summary</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Monthly audit evaluations</p>
              </div>
              {builderControls}
            </div>

            <div className="space-y-4">
              {[
                { title: "KYC Onboarding approvals", percent: 98 },
                { title: "Cayman Islands Outflow scale", percent: 5 },
                { title: "Autoencoder classification score", percent: 99 }
              ].map((prog, pIdx) => (
                <div key={pIdx} className="space-y-1.5">
                  <div className="flex justify-between text-xs md:text-sm font-mono font-semibold">
                    <span className="text-slate-200">{prog.title}</span>
                    <span className="font-extrabold text-white">{prog.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500 shadow-sm" 
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        );

      case 'activities_widget':
        return (
          <SpotlightCard key={id} className="p-6 flex flex-col justify-between min-h-[280px]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Clock className="h-4.5 w-4.5 text-cyan-400" />
                  <span>Recent Analyst Activities</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Operational security audits</p>
              </div>
              {builderControls}
            </div>

            <div className="space-y-3.5 max-h-[180px] overflow-y-auto pr-1">
              {[
                { action: "Admin credentials check", desc: "Verifying credentials and logs clearance parameters.", time: "12m ago" },
                { action: "Token signature refresh", desc: "JWT crypt-signature rotated from profile controls.", time: "1h ago" },
                { action: "Compliance scan run", desc: "Checked Cayman Islands node integrity constraints.", time: "3h ago" }
              ].map((act, aIdx) => (
                <div key={aIdx} className="flex justify-between items-start text-xs font-mono border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                  <div className="space-y-0.5">
                    <p className="font-bold text-white text-xs md:text-sm">{act.action}</p>
                    <p className="text-xs text-slate-300 font-sans">{act.desc}</p>
                  </div>
                  <span className="text-xs text-cyan-400 font-bold ml-2 whitespace-nowrap">{act.time}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        );

      case 'live_notifs_widget':
        return (
          <SpotlightCard key={id} className="p-6 flex flex-col justify-between min-h-[280px]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Bell className="h-4.5 w-4.5 text-rose-400" />
                  <span>Live Threat Alert Console</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Streaming critical anomalies</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block">
                  <LiveWaveformMeter bars={10} color="rose" />
                </div>
                {builderControls}
              </div>
            </div>

            <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1 font-mono text-xs">
              {notifications.map(n => (
                <div key={n.id} className={`p-2.5 rounded-xl border flex items-center justify-between font-semibold ${
                  n.type === 'critical' 
                    ? 'bg-rose-500/15 border-rose-500/30 text-rose-300' 
                    : n.type === 'success' 
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
                    : 'bg-slate-900/80 border-slate-700 text-slate-200'
                }`}>
                  <span className="truncate max-w-[200px] text-xs md:text-sm">{n.message}</span>
                  <span className="text-xs font-bold text-rose-400 animate-pulse ml-2">LIVE</span>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="text-xs text-slate-400 italic py-6 text-center font-medium">No active threats detected.</p>
              )}
            </div>
          </SpotlightCard>
        );

      case 'insights_widget':
        return (
          <SpotlightCard key={id} className="p-6 flex flex-col justify-between min-h-[280px]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Lightbulb className="h-4.5 w-4.5 text-amber-400" />
                  <span>AI Cluster Insights</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Automated risk recommendations</p>
              </div>
              {builderControls}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2.5">
              <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest block font-mono">RECOMMENDED ACTION</span>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                Anomalous requests detected on developmental API endpoint logs. We advise rolling the active <strong className="text-white">API live secret key</strong> under profile settings.
              </p>
              <div className="text-xs text-slate-300 font-mono font-semibold pt-1">
                Cluster Risk Index: <span className="font-extrabold text-rose-400">8.4x normal</span>
              </div>
            </div>
          </SpotlightCard>
        );

      case 'quick_actions_widget':
        return (
          <SpotlightCard key={id} className="p-6 flex flex-col justify-between min-h-[280px]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Play className="h-4.5 w-4.5 text-emerald-400" />
                  <span>Analyst Quick Operations</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Run manual audit protocols</p>
              </div>
              {builderControls}
            </div>

            <div className="space-y-3">
              {isScanning ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-cyan-300 font-bold">
                    <span>SECURITY SCANNING ACTIVE...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                  </div>
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={handleStartScan}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-2xl text-xs md:text-sm font-extrabold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Play className="h-4 w-4" />
                  <span>Trigger Security Scan</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <button 
                  type="button"
                  onClick={rollAPIKeyFromDashboard}
                  className="py-2.5 bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Roll API Key</span>
                </button>
                <button 
                  type="button"
                  onClick={injectMockTransaction}
                  className="py-2.5 bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5 text-rose-400" />
                  <span>Mock Threat</span>
                </button>
              </div>

              <div className="text-xs font-mono text-slate-400 text-center uppercase tracking-widest pt-1 font-semibold">
                Active Key: <span className="text-cyan-300">{apiKey.substring(0, 14)}...</span>
              </div>
            </div>
          </SpotlightCard>
        );

      case 'calendar_widget':
        const days = Array.from({ length: 30 }, (_, i) => i + 1);
        return (
          <SpotlightCard key={id} className="p-6 flex flex-col justify-between min-h-[300px]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Calendar className="h-4.5 w-4.5 text-indigo-400" />
                  <span>Operations Calendar</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Security event scheduler</p>
              </div>
              {builderControls}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs text-slate-400 font-extrabold mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, dIdx) => (
                <span key={dIdx}>{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map(d => {
                const hasEvent = !!calendarEvents[d];
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      if (hasEvent) {
                        setSelectedEvent(calendarEvents[d]);
                      } else {
                        setSelectedEvent(null);
                      }
                    }}
                    className={`h-7 w-7 rounded-lg text-[9px] font-mono flex items-center justify-center transition-all ${
                      hasEvent 
                        ? 'bg-indigo-500 font-extrabold text-white border border-indigo-400 shadow-md shadow-indigo-500/20' 
                        : 'bg-slate-950/40 border border-transparent text-slate-400 hover:border-slate-800'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            {selectedEvent ? (
              <div className="mt-3 p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[9px] text-indigo-300 font-mono text-center truncate">
                📅 {selectedEvent}
              </div>
            ) : (
              <div className="mt-3 p-2 bg-slate-950/60 border border-slate-900 rounded-xl text-[9px] text-slate-500 font-mono text-center">
                Click highlight date to check event
              </div>
            )}
          </SpotlightCard>
        );

      case 'weather_widget':
        return (
          <SpotlightCard key={id} className="p-5 flex flex-col justify-between min-h-[300px]">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <Cloud className="h-3.5 w-3.5 text-cyan-400" />
                  <span>SOC Location Weather</span>
                </h3>
                <p className="text-[9px] text-slate-500">Security Operations Center environment</p>
              </div>
              {builderControls}
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center">
                  <Cloud className="h-7 w-7 text-indigo-400 animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">New York, USA</h4>
                  <p className="text-[9px] text-slate-500 uppercase font-mono">SOC Headquarters</p>
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-3xl font-black text-white font-mono leading-none">
                  {weatherUnit === 'C' ? '19°C' : '66°F'}
                </h3>
                <button 
                  type="button"
                  onClick={() => setWeatherUnit(weatherUnit === 'C' ? 'F' : 'C')}
                  className="text-[8px] font-bold text-indigo-400 hover:text-indigo-300 underline font-mono tracking-widest uppercase mt-1.5"
                >
                  Switch to °{weatherUnit === 'C' ? 'F' : 'C'}
                </button>
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3 text-[9px] font-mono text-slate-400 leading-normal">
              🌧 Humidity: 72% • Wind: 8km/h. Environment is optimal for high-capacity hardware operation.
            </div>
          </SpotlightCard>
        );

      case 'custom_widget_creator':
        return (
          <SpotlightCard key={id} className="p-5 flex flex-col justify-between min-h-[300px]">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <Plus className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Custom Widget Creator</span>
                </h3>
                <p className="text-[9px] text-slate-500">Inject custom analyst note widgets</p>
              </div>
              {builderControls}
            </div>

            <form onSubmit={handleCreateCustomWidget} className="space-y-2 text-xs">
              <input 
                type="text" 
                placeholder="Widget Name (e.g. Server Latency)" 
                value={newWidgetName}
                onChange={e => setNewWidgetName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-1.5 text-[10px] text-slate-300 focus:outline-none"
              />
              
              <div className="flex gap-2">
                <select 
                  value={newWidgetType}
                  onChange={e => setNewWidgetType(e.target.value as any)}
                  className="bg-slate-950 border border-slate-900 rounded-lg px-2 py-1.5 text-[10px] text-slate-400 focus:outline-none"
                >
                  <option value="counter">Counter</option>
                  <option value="text">Text Note</option>
                </select>
                
                <input 
                  type="text" 
                  placeholder={newWidgetType === 'counter' ? "Number (e.g. 842)" : "Message/Note"}
                  value={newWidgetVal}
                  onChange={e => setNewWidgetVal(e.target.value)}
                  required
                  className="flex-grow bg-slate-950 border border-slate-900 rounded-lg px-3 py-1.5 text-[10px] text-slate-300 focus:outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-indigo-500/10"
              >
                Create Custom Widget
              </button>
            </form>
          </SpotlightCard>
        );

      default:
        // Check if it is a custom widget entry
        const custom = customWidgets.find(cw => cw.id === id);
        if (custom) {
          return (
            <SpotlightCard key={id} className="p-5 flex flex-col justify-between min-h-[300px]">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                    <span>{custom.title}</span>
                  </h3>
                  <p className="text-[9px] text-slate-500 font-mono">Custom Analyst Widget</p>
                </div>
                
                <div className="flex items-center space-x-1.5 z-10">
                  <button onClick={() => moveWidget(index, 'left')} className="p-1 hover:bg-slate-800 rounded"><MoveLeft className="h-3 w-3" /></button>
                  <button onClick={() => moveWidget(index, 'right')} className="p-1 hover:bg-slate-800 rounded"><MoveRight className="h-3 w-3" /></button>
                  <button 
                    type="button"
                    onClick={() => removeWidget(id)}
                    className="p-1 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 text-rose-300 hover:text-rose-200 rounded text-[9px] font-mono"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900 text-center flex-1 flex flex-col justify-center items-center">
                {custom.type === 'counter' ? (
                  <h2 className="text-4xl font-extrabold text-white font-mono leading-none">
                    <AnimatedCounter value={Number(custom.val) || 0} />
                  </h2>
                ) : (
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{custom.val}</p>
                )}
              </div>
            </SpotlightCard>
          );
        }
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {widgets.map((w, idx) => renderWidget(w, idx))}
    </div>
  );
}

// 2. AI FRAUD DETAILS & SHAP VALUES
function FraudSection() {
  const [activeSubTab, setActiveSubTab] = useState<'ingestion' | 'analytics' | 'geo' | 'timeline'>('ingestion');
  
  // Transaction logs state
  const [transactions, setTransactions] = useState<any[]>([
    { 
      id: "tx_993", 
      amount: "$8,500.00", 
      risk: "CRITICAL", 
      score: 91, 
      confidence: 94,
      location: "Cayman Islands", 
      ip: "103.45.12.98", 
      vpn: true, 
      device: "Chrome 122 on Linux x86_64", 
      category: "Structured Deposit / Geographic Exception",
      velocity: "4 tx/min (Threshold: 3)",
      duplicate: false,
      behaviorDeviation: "8.4x baseline median",
      time: "2 minutes ago",
      factors: [
        { name: "Location Attributions", weight: 38 },
        { name: "Transaction Size", weight: 21 },
        { name: "Operating Hours", weight: 15 },
        { name: "Device Agent Headers", weight: 12 }
      ]
    },
    { 
      id: "tx_992", 
      amount: "$1,200.00", 
      risk: "MEDIUM", 
      score: 56, 
      confidence: 72,
      location: "Switzerland", 
      ip: "192.168.4.50", 
      vpn: false, 
      device: "Safari 17 on Apple iPhone 15", 
      category: "Suspicious Location Velocity",
      velocity: "1 tx/min",
      duplicate: false,
      behaviorDeviation: "1.2x baseline median",
      time: "15 minutes ago",
      factors: [
        { name: "Historical Frequency", weight: 40 },
        { name: "Merchant Signature", weight: 25 },
        { name: "Location Attributions", weight: 10 }
      ]
    },
    { 
      id: "tx_991", 
      amount: "$240,500.00", 
      risk: "CLEARED", 
      score: 14, 
      confidence: 98,
      location: "New York, USA", 
      ip: "68.22.90.11", 
      vpn: false, 
      device: "Chrome 124 on macOS Sonoma", 
      category: "Nominal Domestic Transfer",
      velocity: "1 tx/hr",
      duplicate: false,
      behaviorDeviation: "0.8x baseline median",
      time: "1 hour ago",
      factors: [
        { name: "Verified IP Node", weight: -20 },
        { name: "Trusted Device Certificate", weight: -15 }
      ]
    }
  ]);

  const [activeTx, setActiveTx] = useState<any>(transactions[0]);

  // Live Stream simulation state
  const [liveStreaming, setLiveStreaming] = useState(false);
  
  // CSV Ingestion states
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvProgress, setCsvProgress] = useState(0);

  // Manual entry fields
  const [manualAmount, setManualAmount] = useState('');
  const [manualLocation, setManualLocation] = useState('New York, USA');
  const [manualIP, setManualIP] = useState('');
  const manualDevice = 'Chrome 124 on Windows 11';

  // Trigger Alerts
  const [duplicateAlert, setDuplicateAlert] = useState<string | null>(null);
  const [velocityAlert, setVelocityAlert] = useState<string | null>(null);

  // Live Stream transaction ticks loop
  useEffect(() => {
    if (!liveStreaming) return;
    const interval = setInterval(() => {
      const randomId = `tx_${Math.floor(100 + Math.random() * 900)}`;
      const amt = (Math.random() * 9000 + 100).toFixed(2);
      const loc = ["Cayman Islands", "Switzerland", "Panama", "Paris, France", "Tokyo, Japan", "London, UK"][Math.floor(Math.random() * 6)];
      const riskScore = Math.floor(Math.random() * 99);
      const isVpn = Math.random() > 0.5;
      const isCritical = riskScore > 75;

      const newTx = {
        id: randomId,
        amount: `$${parseFloat(amt).toLocaleString()}`,
        risk: isCritical ? "CRITICAL" : riskScore > 40 ? "MEDIUM" : "CLEARED",
        score: riskScore,
        confidence: Math.floor(Math.random() * 20 + 78),
        location: loc,
        ip: `${Math.floor(Math.random() * 200 + 20)}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`,
        vpn: isVpn,
        device: "Chrome 122 on Windows 11",
        category: isCritical ? "Geographic Velocity Exception" : "Cleared Stream Ingress",
        velocity: isCritical ? "4 tx/min (ELEVATED)" : "1 tx/min",
        duplicate: false,
        behaviorDeviation: isCritical ? "6.8x baseline median" : "1.1x baseline median",
        time: "Just now",
        factors: [
          { name: "Location Attributions", weight: isCritical ? 45 : 10 },
          { name: "Transaction Size", weight: isCritical ? 25 : 5 }
        ]
      };

      // Velocity verification check
      if (isCritical) {
        setVelocityAlert(`Velocity threshold exceeded for ${randomId}: 4 tx/min limits breached.`);
        setTimeout(() => setVelocityAlert(null), 5000);
      }

      setTransactions(prev => [newTx, ...prev]);
      setActiveTx(newTx);
    }, 5000);

    return () => clearInterval(interval);
  }, [liveStreaming]);

  // CSV parsing upload simulator
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvLoading(true);
      setCsvProgress(0);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setCsvProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setCsvLoading(false);
          
          // Append mock CSV records
          const csvTx1 = {
            id: `tx_csv_${Math.floor(100 + Math.random() * 900)}`,
            amount: "$15,200.00",
            risk: "CRITICAL",
            score: 87,
            confidence: 91,
            location: "Panama",
            ip: "82.45.109.12",
            vpn: true,
            device: "Firefox 120 on Windows 10",
            category: "High-Risk Offshore Ingress",
            velocity: "3 tx/min",
            duplicate: false,
            behaviorDeviation: "7.2x baseline median",
            time: "Just now",
            factors: [
              { name: "Offshore Target Inflow", weight: 35 },
              { name: "Size Outliers", weight: 20 }
            ]
          };

          setTransactions(prev => [csvTx1, ...prev]);
          setActiveTx(csvTx1);
        }
      }, 300);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualAmount || !manualLocation || !manualIP) return;

    const formattedAmount = `$${parseFloat(manualAmount).toLocaleString()}`;
    const txId = `tx_${Math.floor(100 + Math.random() * 900)}`;

    // Duplicate Check logic: check if same amount & location processed recently
    const duplicate = transactions.find(t => t.amount === formattedAmount && t.location.toLowerCase() === manualLocation.toLowerCase());
    
    const newTx = {
      id: txId,
      amount: formattedAmount,
      risk: duplicate ? "CRITICAL" : "CLEARED",
      score: duplicate ? 95 : 12,
      confidence: 97,
      location: manualLocation,
      ip: manualIP,
      vpn: Math.random() > 0.5,
      device: manualDevice,
      category: duplicate ? "Duplicate Transaction Flag" : "Analyst Ingress Entry",
      velocity: "1 tx/min",
      duplicate: !!duplicate,
      behaviorDeviation: duplicate ? "9.8x baseline median" : "0.7x baseline median",
      time: "Just now",
      factors: duplicate 
        ? [{ name: "Duplicate Transfer Signature", weight: 60 }] 
        : [{ name: "Manual Verified Entry", weight: -10 }]
    };

    if (duplicate) {
      setDuplicateAlert(`Duplicate transaction threat detected! ${txId} matches an existing transfer payload of ${formattedAmount} at ${manualLocation}.`);
      setTimeout(() => setDuplicateAlert(null), 6000);
    }

    setTransactions(prev => [newTx, ...prev]);
    setActiveTx(newTx);

    // reset fields
    setManualAmount('');
    setManualIP('');
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Switcher Headers */}
      <div className="flex border-b border-white/5 pb-0.5 space-x-2 z-10 relative">
        {[
          { id: 'ingestion', label: "Ingestion & Streaming Control", icon: Upload },
          { id: 'analytics', label: "Deep Risk Analytics Console", icon: BrainCircuit },
          { id: 'geo', label: "Geo-Threat Heatmap & IPs", icon: Globe },
          { id: 'timeline', label: "Threat Audit Timeline", icon: Clock }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id as any)}
              className={`flex items-center space-x-2 px-5 py-3 text-xs font-medium border-b-2 transition-all focus:outline-none ${
                activeSubTab === t.id 
                  ? 'border-indigo-500 text-indigo-400 font-semibold bg-indigo-500/5 rounded-t-xl' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Global alert notifications overlays */}
      {duplicateAlert && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono rounded-xl animate-bounce">
          ⚠️ <strong>{duplicateAlert}</strong>
        </div>
      )}
      {velocityAlert && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono rounded-xl animate-pulse">
          ⚠️ <strong>{velocityAlert}</strong>
        </div>
      )}

      {/* Tab 1: Live Ingestion & Streaming Control */}
      {activeSubTab === 'ingestion' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Controls Panel */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6 lg:col-span-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Stream Controllers</h3>
            
            {/* Live Streaming Toggle */}
            <div className="flex justify-between items-center bg-slate-950/40 p-4 border border-slate-900 rounded-xl font-mono text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-300">Live Transaction Stream</span>
                <p className="text-[9px] text-slate-500 font-sans">Streams incoming data every 5s</p>
              </div>
              <button
                type="button"
                onClick={() => setLiveStreaming(!liveStreaming)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                  liveStreaming 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse' 
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {liveStreaming ? 'STREAMING ACTIVE' : 'ACTIVATE STREAM'}
              </button>
            </div>

            {/* CSV File Upload Ingestor */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Upload CSV Data Batch</label>
              
              {csvLoading ? (
                <div className="space-y-1.5 font-mono text-[10px] text-indigo-400">
                  <span>PARSING CSV BATCH ({csvProgress}%)</span>
                  <div className="w-full h-1 bg-indigo-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all" style={{ width: `${csvProgress}%` }} />
                  </div>
                </div>
              ) : (
                <label className="border border-dashed border-slate-800 hover:border-indigo-500/40 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#0B0D10]/40">
                  <Upload className="h-5 w-5 text-slate-500 mb-1" />
                  <span className="text-[10px] text-slate-300 font-semibold">Select CSV Ingestion File</span>
                  <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
                </label>
              )}
            </div>

            {/* Manual Transaction Input Form */}
            <form onSubmit={handleManualSubmit} className="space-y-3 pt-4 border-t border-white/5 text-xs">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">Manual Entry</h4>
              
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Transaction Amount ($)</label>
                <input 
                  type="number" 
                  placeholder="8500" 
                  value={manualAmount}
                  onChange={e => setManualAmount(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Source Location</label>
                <select
                  value={manualLocation}
                  onChange={e => setManualLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="New York, USA">New York, USA</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Paris, France">Paris, France</option>
                  <option value="Panama">Panama</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">IP Address</label>
                <input 
                  type="text" 
                  placeholder="103.45.12.98" 
                  value={manualIP}
                  onChange={e => setManualIP(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none font-mono"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-500/10"
              >
                Ingest & Check Transaction
              </button>
            </form>
          </div>

          {/* Transactions Queue List */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Active Stream Queue</h3>
            
            <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {transactions.map(tx => {
                const isCrit = tx.risk === "CRITICAL";
                const isMed = tx.risk === "MEDIUM";
                return (
                  <button
                    key={tx.id}
                    onClick={() => {
                      setActiveTx(tx);
                      setActiveSubTab('analytics'); // Shift to detailed tab
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${
                      activeTx.id === tx.id 
                        ? 'bg-[#13161A] border-indigo-500/30 shadow-lg' 
                        : 'bg-slate-950/40 border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-2">
                        <span>{tx.id}</span>
                        {tx.duplicate && (
                          <span className="text-[8px] bg-rose-500/15 border border-rose-500/20 text-rose-400 font-bold px-1.5 py-0.2 rounded font-sans">DUPLICATE</span>
                        )}
                      </h4>
                      <p className="text-[9px] text-slate-500 font-mono mt-1">{tx.location} • IP: {tx.ip}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-xs font-extrabold text-white font-mono block">{tx.amount}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold border block text-center ${
                        isCrit 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse' 
                          : isMed 
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {tx.risk} ({tx.score}%)
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Deep Risk Analytics Console */}
      {activeSubTab === 'analytics' && activeTx && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Prediction confidence and score gauge gauges */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6 lg:col-span-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Threat Verdict</h3>
            
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Transaction ID</span>
                <span className="text-white font-bold">{activeTx.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Total Amount</span>
                <span className="text-white font-bold">{activeTx.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Model Classification</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                  activeTx.risk === 'CRITICAL' 
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                    : activeTx.risk === 'MEDIUM' 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {activeTx.risk}
                </span>
              </div>
            </div>

            {/* SVG Glistening Gauges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              
              {/* Risk Score Gauge */}
              <div className="text-center space-y-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">Autoencoder Risk</span>
                <div className="relative flex items-center justify-center h-20">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                    <circle 
                      cx="32" 
                      cy="32" 
                      r="28" 
                      fill="none" 
                      stroke={activeTx.score > 75 ? "#f43f5e" : activeTx.score > 40 ? "#f59e0b" : "#10b981"} 
                      strokeWidth="4.5" 
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={2 * Math.PI * 28 * (1 - activeTx.score / 100)}
                    />
                  </svg>
                  <span className="absolute text-sm font-extrabold text-white font-mono">{activeTx.score}%</span>
                </div>
              </div>

              {/* Confidence Score Gauge */}
              <div className="text-center space-y-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">Confidence Level</span>
                <div className="relative flex items-center justify-center h-20">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                    <circle 
                      cx="32" 
                      cy="32" 
                      r="28" 
                      fill="none" 
                      stroke="#6366f1" 
                      strokeWidth="4.5" 
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={2 * Math.PI * 28 * (1 - activeTx.confidence / 100)}
                    />
                  </svg>
                  <span className="absolute text-sm font-extrabold text-white font-mono">{activeTx.confidence}%</span>
                </div>
              </div>

            </div>

            {/* Behavioral & Velocity Indicators */}
            <div className="space-y-3 pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400">
              <div className="flex justify-between">
                <span>Behavioral Deviation</span>
                <span className="text-slate-200">{activeTx.behaviorDeviation}</span>
              </div>
              <div className="flex justify-between">
                <span>Ingress Velocity check</span>
                <span className="text-slate-200">{activeTx.velocity}</span>
              </div>
            </div>
          </div>

          {/* Explainable AI (SHAP weights) */}
          <div className="glass-card rounded-2xl p-6 lg:col-span-2 border border-white/5 space-y-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Explainable AI (SHAP Weights)</h3>
            
            <div className="space-y-4">
              {activeTx.factors && activeTx.factors.map((f: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">{f.name}</span>
                    <span className={f.weight > 0 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                      {f.weight > 0 ? `+${f.weight}%` : `${f.weight}%`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${f.weight > 0 ? 'from-indigo-500 to-rose-500' : 'from-emerald-500 to-teal-500'}`} 
                      style={{ width: `${Math.abs(f.weight)}%` }} 
                    />
                  </div>
                </div>
              ))}
              {(!activeTx.factors || activeTx.factors.length === 0) && (
                <p className="text-xs text-slate-500 italic font-mono">No explainable metrics for this transfer.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Geo-Threat Heatmap & IPs */}
      {activeSubTab === 'geo' && activeTx && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Geo Threat Map and location highlights */}
          <div className="glass-card rounded-2xl p-6 lg:col-span-2 border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Geographic Threat Hotspots</h3>
            
            <div className="relative h-60 bg-slate-950 border border-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full opacity-35" viewBox="0 0 1000 400" fill="none">
                <path d="M150,150 Q300,100 450,250 T750,150" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" strokeDasharray="5,5" />
                <path d="M250,300 Q500,150 750,300" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" strokeDasharray="5,5" />
              </svg>
              
              {/* Highlight geographic targets */}
              {[
                { name: "New York, USA", x: "25%", y: "40%", risk: "CLEARED" },
                { name: "Cayman Islands", x: "32%", y: "65%", risk: "CRITICAL" },
                { name: "Switzerland", x: "52%", y: "30%", risk: "MEDIUM" },
                { name: "Paris, France", x: "48%", y: "26%", risk: "CLEARED" },
                { name: "Panama", x: "28%", y: "55%", risk: "CRITICAL" }
              ].map((point, ptIdx) => {
                const isActive = activeTx.location.toLowerCase().includes(point.name.split(',')[0].toLowerCase());
                return (
                  <div 
                    key={ptIdx} 
                    className="absolute transition-all"
                    style={{ left: point.x, top: point.y }}
                  >
                    <span className={`relative flex h-3.5 w-3.5 ${isActive ? 'scale-125' : 'opacity-60'}`}>
                      {isActive && (
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          point.risk === 'CRITICAL' ? 'bg-rose-400' : point.risk === 'MEDIUM' ? 'bg-amber-400' : 'bg-emerald-400'
                        }`} />
                      )}
                      <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-slate-950 ${
                        point.risk === 'CRITICAL' ? 'bg-rose-500' : point.risk === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                    </span>
                    <span className="absolute top-4 -left-6 bg-slate-950/80 px-2 py-0.5 border border-white/5 rounded text-[8px] font-mono text-slate-300 font-bold whitespace-nowrap">
                      {point.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Network context card (IP Analysis, Device Fingerprint) */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6 lg:col-span-1 text-xs">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Device & Network Identity</h3>
            
            {/* IP Specs */}
            <div className="space-y-3 font-mono">
              <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">IP Network Ledger</h4>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Remote IPv4</span>
                <span className="text-white font-bold">{activeTx.ip}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">VPN / Proxy Detection</span>
                <span className={`font-bold ${activeTx.vpn ? 'text-rose-400' : 'text-slate-400'}`}>
                  {activeTx.vpn ? 'VPN ACTIVE' : 'NONE DETECTED'}
                </span>
              </div>
            </div>

            {/* Device Fingerprinting */}
            <div className="space-y-3 font-mono pt-4 border-t border-white/5">
              <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">WebGL Device Agent</h4>
              <div className="flex justify-between items-start">
                <span className="text-slate-500">User Agent</span>
                <span className="text-slate-200 text-right truncate max-w-[140px]" title={activeTx.device}>{activeTx.device}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Hardware Signatures</span>
                <span className="text-slate-400">WebGL-2 (Intel Iris graphics)</span>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2 pt-4 border-t border-white/5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">Fraud Profile tags</span>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {activeTx.category.split('/').map((cat: string, cIdx: number) => (
                  <span 
                    key={cIdx}
                    className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 rounded-md text-[9px] font-mono uppercase font-bold"
                  >
                    {cat.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Threat Audit Timeline */}
      {activeSubTab === 'timeline' && activeTx && (
        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Analysis Processing steps</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative pt-4">
            
            {[
              { step: "1. Payload Ingest", desc: "Parsed transaction object amount and headers successfully.", status: "COMPLETE", color: "text-emerald-400" },
              { step: "2. Security Profiling", desc: "Ran WebGL device hardware and remote IP check.", status: activeTx.vpn ? "VPN TRIGGERED" : "CLEARED", color: activeTx.vpn ? "text-rose-400" : "text-emerald-400" },
              { step: "3. Constraints Check", desc: `Checked velocity parameters (${activeTx.velocity}) and duplicate signature verification.`, status: activeTx.duplicate ? "DUPLICATE FOUND" : "CLEARED", color: activeTx.duplicate ? "text-rose-400" : "text-emerald-400" },
              { step: "4. Model Verdict", desc: `Inferred risk score metrics (${activeTx.score}%) and SHAP factors attribution.`, status: activeTx.risk, color: activeTx.risk === 'CRITICAL' ? 'text-rose-400' : 'text-emerald-400' }
            ].map((node, nodeIdx) => (
              <div key={nodeIdx} className="space-y-2 border-l border-white/5 pl-4 md:border-l-0 md:border-t md:pt-4 md:pl-0">
                <span className="text-[10px] font-bold text-indigo-400 font-mono uppercase tracking-widest">{node.step}</span>
                <p className="text-[11px] text-slate-300 font-light leading-relaxed">{node.desc}</p>
                <span className={`text-[9px] font-bold font-mono uppercase block ${node.color}`}>{node.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

// 3. AI CHATBOT & RAG PANEL
function AssistantSection() {
  const [messages, setMessages] = useState<any[]>([
    { role: 'system', content: 'Welcome to FinGuard AI. I am your LangGraph banking assistant. Ask me questions regarding transaction flags, compliance forms, or portfolio projections.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let response = "Based on our vector databases: ";
      if (inputValue.toLowerCase().includes("fraud") || inputValue.toLowerCase().includes("flag")) {
        response += "The transaction US1234567890 was flagged because the SHAP score reached 91% (Attribution weights: Location +38%, Size +21%).";
      } else if (inputValue.toLowerCase().includes("tax") || inputValue.toLowerCase().includes("gst")) {
        response += "Pursuant to IRS Section 162, business banking transaction fees qualify as tax-deductible operational outlays.";
      } else {
        response += "We recommend routing 25% of redundant savings into treasury yields (4.55% APY Savings Vault) to optimize liquidity cash flows.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1200);
  };

  const handleFileDrop = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => [...prev, e.target.files[0].name]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)]">
      
      {/* RAG Knowledge Bank Panel */}
      <div className="glass-card rounded-2xl p-6 lg:col-span-1 border border-white/5 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">RAG Knowledge Base</h3>
          <p className="text-xs text-slate-400 mb-6 font-light leading-relaxed">Drag regulatory guidelines or bank statement documents to index in Qdrant.</p>
          
          <label className="border border-dashed border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors mb-6 bg-[#0B0D10]/40">
            <Upload className="h-6 w-6 text-slate-500 mb-2" />
            <span className="text-xs text-slate-300 font-semibold">Drop PDF/DOCX</span>
            <span className="text-[10px] text-slate-600 mt-1">Max 10MB</span>
            <input type="file" onChange={handleFileDrop} className="hidden" />
          </label>

          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Indexed Files</h4>
            {files.length === 0 ? (
              <p className="text-xs text-slate-600 italic font-light">No documents uploaded yet.</p>
            ) : (
              files.map((f, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-950/50 border border-slate-900 rounded-xl text-xs">
                  <span className="truncate max-w-[120px] text-slate-300 font-mono">{f}</span>
                  <span className="text-[9px] text-cyan-400 font-mono bg-cyan-500/10 px-1.5 py-0.5 rounded">100%</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
          <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
            <strong>RAG Mode:</strong> Vector + Keyword Hybrid Search. Similarity score fused with BM25 rankings.
          </p>
        </div>
      </div>

      {/* Conversation Window */}
      <div className="glass-card rounded-2xl p-6 lg:col-span-3 border border-white/5 flex flex-col justify-between h-full overflow-hidden">
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-indigo-500 text-white rounded-br-none shadow-md shadow-indigo-500/10' 
                  : m.role === 'system'
                  ? 'bg-slate-900/60 border border-slate-900 text-indigo-300 font-mono'
                  : 'bg-slate-900 border border-slate-900 text-slate-200 rounded-bl-none'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-900 text-slate-400 rounded-2xl rounded-bl-none px-4 py-3 text-xs flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Chat input controls */}
        <div className="flex items-center space-x-3 pt-3 border-t border-white/5">
          <button className="p-3 bg-[#13161A] border border-white/5 rounded-xl text-slate-400 hover:text-indigo-400 transition-colors">
            <Mic className="h-4 w-4" />
          </button>
          <input 
            type="text" 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Query transaction anomaly reasons, Form 8300 tax guidelines, or GST..."
            className="flex-1 bg-[#13161A]/80 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
          />
          <button 
            onClick={handleSend}
            className="p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors shadow-lg shadow-indigo-500/10"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

// 4. OCR INGESTION & DOCUMENT EXTRACTION
function OcrSection() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<any>(null);

  const processOcr = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
      setData({
        passportNo: "A98765432",
        name: "JOHN DOE",
        dob: "1988-12-14",
        nationality: "UNITED STATES",
        verification: "MATCH (Profile names align)",
        integrity: "98% (Normal structural layout borders)"
      });
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* OCR Scanner Frame */}
      <div className="glass-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">KYC OCR Document Scanner</h3>
        <p className="text-xs text-slate-400 mb-6 font-light">Scan Passport, Driving License, or Bank Statements to extract fields.</p>
        
        <div className="border border-dashed border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center bg-[#0B0D10]/20 mb-6">
          <ScanLine className="h-10 w-10 text-indigo-400 mb-2" />
          <span className="text-xs text-slate-300 font-semibold">Drop document image inside frame</span>
          <span className="text-[10px] text-slate-600 mt-1">Accepts PNG, JPG, or PDF</span>
        </div>

        <button 
          onClick={processOcr}
          disabled={status === 'loading'}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-indigo-500/10"
        >
          {status === 'loading' ? 'Executing Tesseract OCR Extraction...' : 'Process Document OCR'}
        </button>
      </div>

      {/* OCR Outputs */}
      <div className="glass-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Extracted Fields</h3>
        {status === 'idle' && (
          <p className="text-xs text-slate-500 italic font-light">Ingest a KYC document to display analysis.</p>
        )}
        {status === 'loading' && (
          <div className="space-y-3">
            <div className="h-4 bg-slate-900 rounded animate-pulse" />
            <div className="h-4 bg-slate-900 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-slate-900 rounded animate-pulse w-2/3" />
          </div>
        )}
        {status === 'done' && data && (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-emerald-300 font-mono">
              <span className="font-semibold">Document Type: PASSPORT</span>
              <span className="text-[9px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">VERIFIED</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Parsed Values</h4>
              {[
                { label: "Passport Number", val: data.passportNo },
                { label: "Full Name", val: data.name },
                { label: "Birth Date", val: data.dob },
                { label: "Country", val: data.nationality }
              ].map(f => (
                <div key={f.label} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 font-mono">
                  <span className="text-slate-500">{f.label}</span>
                  <span className="text-slate-300">{f.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// 5. RECOMMENDATIONS VAULT
function RecommendationsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: "Treasury Yield", rate: "4.55% APY", desc: "Premium treasury yield savings vault with instant liquidity overrides.", type: "Yield" },
        { title: "AI Stock Tracker", rate: "Balanced Portfolio", desc: "Automated bond and equity allocations mapped to monthly limits.", type: "Asset" }
      ].map((rec, idx) => (
        <div key={idx} className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-52 relative overflow-hidden group">
          <div>
            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/5 px-2.5 py-1 border border-indigo-500/10 rounded-full">{rec.type}</span>
            <h3 className="text-base font-bold text-white mt-4">{rec.title}</h3>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">{rec.desc}</p>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-4">
            <span className="text-xs text-cyan-400 font-bold font-mono">{rec.rate}</span>
            <button className="text-[10px] text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-lg transition-colors font-semibold">Activate</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// 6. ADMIN / SYSTEM AUDIT LEDGER & NATURAL-LANGUAGE PDF GENERATOR
function AdminSection() {
  const [queue, setQueue] = useState([
    { id: "kyc_sarah", name: "Sarah Jenkins", doc: "Driving License", uploaded: "2 hours ago" }
  ]);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  const approve = (id: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
  };

  const generateReport = () => {
    setPdfGenerating(true);
    setTimeout(() => {
      setPdfGenerating(false);
      setPdfReady(true);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Approvals and Report Generation */}
      <div className="glass-card rounded-2xl p-6 lg:col-span-2 border border-white/5 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Pending Document Approvals</h3>
          {queue.length === 0 ? (
            <p className="text-xs text-slate-500 italic font-light">All verification queues are empty.</p>
          ) : (
            <div className="space-y-3">
              {queue.map(q => (
                <div key={q.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#13161A]/40 border border-white/5 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-white">{q.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{q.id} • {q.doc} • Uploaded {q.uploaded}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-3 md:mt-0">
                    <button 
                      onClick={() => approve(q.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Natural Language Report Generation */}
        <div className="pt-6 border-t border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Natural-Language Report Generation</h3>
          <p className="text-xs text-slate-400 font-light">
            Trigger an automated compliance summary detailing transaction baseline anomalies and SHAP audit records.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={generateReport}
              disabled={pdfGenerating}
              className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/50 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2"
            >
              <FileCheck2 className="h-4 w-4" />
              <span>{pdfGenerating ? "Compiling PDF Ledger..." : "Create Fraud Report"}</span>
            </button>
            
            {pdfReady && (
              <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-3 py-2 rounded-xl">
                <UserCheck className="h-4 w-4" />
                <span>finguard_fraud_report.pdf Ready for Export!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Audit logs */}
      <div className="glass-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">System Audit Ledger</h3>
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {[
            { time: "19:24:02", tag: "GATEWAY", msg: "Enforced rate-limiting check on auth-service", status: "success" },
            { time: "19:20:10", tag: "FRAUD-ML", msg: "XGBoost scoring completed for transaction tx_993", status: "warning" }
          ].map((audit, idx) => (
            <div key={idx} className="p-2.5 bg-slate-950/40 border border-slate-900 rounded-xl text-[10px]">
              <div className="flex justify-between font-mono text-[9px] text-slate-500 mb-1">
                <span>{audit.time} • [{audit.tag}]</span>
                <span className={`font-bold ${
                  audit.status === 'success' ? 'text-emerald-400' : 'text-amber-400'
                }`}>{audit.status.toUpperCase()}</span>
              </div>
              <p className="text-slate-300">{audit.msg}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ==========================================
// 7. USER PROFILE CENTER
// ==========================================
interface ProfileSectionProps {
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  jwtToken: { header: string; payload: string; signature: string; raw: string };
  refreshToken: string;
  generateMockTokens: (email: string, name: string) => void;
  handleRegisterPasskey: () => void;
  passkeyLoading: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthSuccess: React.Dispatch<React.SetStateAction<string>>;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  lang: string;
  setLang: (l: string) => void;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
}

function ProfileSection({ 
  currentUser, 
  setCurrentUser, 
  jwtToken, 
  refreshToken, 
  generateMockTokens, 
  handleRegisterPasskey, 
  passkeyLoading,
  setIsLoggedIn,
  setAuthSuccess,
  theme,
  setTheme,
  lang,
  setLang,
  apiKey,
  setApiKey
}: ProfileSectionProps) {
  const [profileTab, setProfileTab] = useState<'general' | 'security' | 'preferences'>('general');
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // Cover image preset selector
  const [coverPreset, setCoverPreset] = useState<string>(() => {
    return localStorage.getItem(`finguard_cover_${currentUser?.email}`) || 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-500';
  });

  // Profile picture base64 state
  const [profilePic, setProfilePic] = useState<string>(() => {
    return localStorage.getItem(`finguard_avatar_${currentUser?.email}`) || '';
  });

  // Personal details form state
  const [fullNameInput, setFullNameInput] = useState(currentUser?.fullName || '');
  const [usernameInput, setUsernameInput] = useState(currentUser?.username || '');
  const [emailInput, setEmailInput] = useState(currentUser?.email || '');
  const [phoneInput, setPhoneInput] = useState(() => {
    return localStorage.getItem(`finguard_phone_${currentUser?.email}`) || '+1 (555) 902-8329';
  });
  const [jobTitleInput, setJobTitleInput] = useState(() => {
    return localStorage.getItem(`finguard_title_${currentUser?.email}`) || 'L3 Security Systems Analyst';
  });

  // Address state
  const [streetInput, setStreetInput] = useState(() => {
    return localStorage.getItem(`finguard_street_${currentUser?.email}`) || '100 Security Parkway, Suite 500';
  });
  const [cityInput, setCityInput] = useState(() => {
    return localStorage.getItem(`finguard_city_${currentUser?.email}`) || 'New York';
  });
  const [stateInput, setStateInput] = useState(() => {
    return localStorage.getItem(`finguard_state_${currentUser?.email}`) || 'NY';
  });
  const [zipInput, setZipInput] = useState(() => {
    return localStorage.getItem(`finguard_zip_${currentUser?.email}`) || '10001';
  });

  // Save General profile feedback
  const [saveSuccess, setSaveSuccess] = useState('');

  // Notification preferences
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSecurity, setNotifSecurity] = useState(true);
  const [notifSlack, setNotifSlack] = useState(false);

  // Connected accounts state
  const [connectedProviders, setConnectedProviders] = useState(() => {
    const defaultVal = { google: currentUser?.email?.includes('google'), github: currentUser?.email?.includes('github'), microsoft: currentUser?.email?.includes('microsoft') };
    const saved = localStorage.getItem(`finguard_connected_${currentUser?.email}`);
    return saved ? JSON.parse(saved) : defaultVal;
  });

  // Dynamic Sessions List state
  const [sessions, setSessions] = useState([
    { id: 'sess_1', device: "Chrome 122 on Windows 11", location: "New York, USA", ip: "192.168.1.50", status: "Active Session" },
    { id: 'sess_2', device: "Safari 17 on Apple iPhone 15", location: "Paris, France", ip: "172.56.21.90", status: "Revoke Session" }
  ]);

  // Activity Timeline list
  const [timeline, setTimeline] = useState<any[]>([
    { id: 1, action: "Session Key rotated", desc: "API live access credentials regenerated", time: "10 minutes ago" },
    { id: 2, action: "Account profile synced", desc: "MFA settings checked and verified L3 L-Clearance security credentials", time: "2 hours ago" },
    { id: 3, action: "Primary authorization completed", desc: "Success verification token session login", time: "3 hours ago" }
  ]);

  const revokeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    addTimelineEvent("Session Revoked", "Active device session connection terminated manually.");
  };

  const addTimelineEvent = (action: string, desc: string) => {
    setTimeline(prev => [
      { id: Date.now(), action, desc, time: "Just now" },
      ...prev
    ]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "WARNING: This will permanently delete your analyst profile and auth credentials. Are you sure you want to proceed?"
    );
    if (!confirmDelete) return;

    const usersRaw = localStorage.getItem('finguard_users') || '[]';
    let users = JSON.parse(usersRaw);
    users = users.filter((u: any) => u.email !== currentUser.email);
    localStorage.setItem('finguard_users', JSON.stringify(users));

    // Clear local storage data
    localStorage.removeItem(`finguard_passkey_${currentUser.email}`);
    localStorage.removeItem(`finguard_avatar_${currentUser.email}`);
    localStorage.removeItem(`finguard_cover_${currentUser.email}`);
    localStorage.removeItem(`finguard_phone_${currentUser.email}`);
    localStorage.removeItem(`finguard_title_${currentUser.email}`);
    localStorage.removeItem(`finguard_street_${currentUser.email}`);
    localStorage.removeItem(`finguard_city_${currentUser.email}`);
    localStorage.removeItem(`finguard_state_${currentUser.email}`);
    localStorage.removeItem(`finguard_zip_${currentUser.email}`);

    setAuthSuccess("Your analyst account was deleted successfully from the security records database.");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Avatar Upload Picker handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const base64Img = uploadEvent.target.result as string;
          setProfilePic(base64Img);
          localStorage.setItem(`finguard_avatar_${currentUser?.email}`, base64Img);
          addTimelineEvent("Profile picture updated", "New custom base64 analyst avatar saved.");
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Preset cover image updates
  const updateCoverPreset = (preset: string) => {
    setCoverPreset(preset);
    localStorage.setItem(`finguard_cover_${currentUser?.email}`, preset);
    addTimelineEvent("Cover preset changed", "Security console header visuals modified.");
  };

  // Toggle connection providers
  const toggleProvider = (providerName: 'google' | 'github' | 'microsoft') => {
    setConnectedProviders((prev: any) => {
      const updated = { ...prev, [providerName]: !prev[providerName] };
      localStorage.setItem(`finguard_connected_${currentUser?.email}`, JSON.stringify(updated));
      addTimelineEvent(
        `${providerName.charAt(0).toUpperCase() + providerName.slice(1)} provider status updated`,
        `Account binding link changed to ${updated[providerName] ? 'connected' : 'disconnected'}.`
      );
      return updated;
    });
  };

  // Save General profile form fields
  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess('');

    // Update global user details
    const updatedUser = { 
      ...currentUser, 
      fullName: fullNameInput.trim(),
      username: usernameInput.trim().toLowerCase()
    };
    setCurrentUser(updatedUser);

    // Save to users database
    const usersRaw = localStorage.getItem('finguard_users') || '[]';
    const users = JSON.parse(usersRaw);
    const idx = users.findIndex((u: any) => u.email === currentUser.email);
    if (idx !== -1) {
      users[idx].fullName = fullNameInput.trim();
      users[idx].username = usernameInput.trim().toLowerCase();
      localStorage.setItem('finguard_users', JSON.stringify(users));
    }

    // Save other details fields
    localStorage.setItem(`finguard_phone_${currentUser?.email}`, phoneInput);
    localStorage.setItem(`finguard_title_${currentUser?.email}`, jobTitleInput);
    localStorage.setItem(`finguard_street_${currentUser?.email}`, streetInput);
    localStorage.setItem(`finguard_city_${currentUser?.email}`, cityInput);
    localStorage.setItem(`finguard_state_${currentUser?.email}`, stateInput);
    localStorage.setItem(`finguard_zip_${currentUser?.email}`, zipInput);

    setSaveSuccess('General details updated successfully!');
    addTimelineEvent("Personal records updated", "Analyst profile specifications and address fields saved.");
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  // Export profile package JSON
  const downloadProfileJSON = () => {
    const profileData = {
      account: {
        fullName: fullNameInput,
        username: usernameInput,
        email: emailInput,
        phone: phoneInput,
        jobTitle: jobTitleInput
      },
      address: {
        street: streetInput,
        city: cityInput,
        state: stateInput,
        zip: zipInput
      },
      security: {
        twoFactorEnabled: currentUser?.twoFactorEnabled || false,
        passkeyRegistered: localStorage.getItem(`finguard_passkey_${currentUser?.email}`) === 'true',
        clearanceLevel: "L3 SYSTEM ACCESS",
        jwtPayload: jwtToken
      },
      preferences: {
        theme,
        language: lang,
        notifications: {
          email: notifEmail,
          security: notifSecurity,
          slack: notifSlack
        }
      }
    };

    const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `finguard_profile_${usernameInput || 'analyst'}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addTimelineEvent("Export completed", "Profile security package downloaded as JSON format.");
  };

  const generateNewKey = () => {
    const randomHex = Math.random().toString(16).substring(2, 18);
    setApiKey(`fg_live_${randomHex}`);
    setCopied(false);
    addTimelineEvent("API live key rolled", "Regenerated secret token metrics.");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggle2FA = () => {
    const enabled = !currentUser.twoFactorEnabled;
    setCurrentUser((prev: any) => ({ ...prev, twoFactorEnabled: enabled }));
    
    // Persist to mock DB
    const usersRaw = localStorage.getItem('finguard_users') || '[]';
    const users = JSON.parse(usersRaw);
    const idx = users.findIndex((u: any) => u.email === currentUser.email);
    if (idx !== -1) {
      users[idx].twoFactorEnabled = enabled;
      localStorage.setItem('finguard_users', JSON.stringify(users));
    }
    addTimelineEvent("2FA Toggle", `Multi-Factor authentication turned ${enabled ? 'ON' : 'OFF'}.`);
  };

  // Check if passkey is registered in local storage
  const isPasskeyRegistered = localStorage.getItem(`finguard_passkey_${currentUser?.email}`) === 'true';

  // Decode JWT payload simulation
  let decodedPayload: any = null;
  try {
    if (jwtToken.payload) {
      decodedPayload = JSON.parse(atob(jwtToken.payload));
    }
  } catch (err) {
    console.error("JWT Decode error: ", err);
  }

  // Get initials for profile picture fallback
  const getInitials = (name: string) => {
    if (!name) return "US";
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      
      {/* Cover Image & Profile Picture Header */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/5 relative">
        {/* Cover presets header block */}
        <div className={`h-40 relative transition-all duration-300 ${coverPreset}`}>
          {/* Cover presets selector */}
          <div className="absolute top-4 right-4 flex space-x-2 bg-slate-950/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/5 z-10 text-[9px] font-mono text-white">
            <span className="text-slate-400 mr-2 flex items-center"><Image className="h-3 w-3 mr-1" /> Header Theme:</span>
            {[
              { id: 'indigo-cyan', class: 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-500' },
              { id: 'purple-rose', class: 'bg-gradient-to-r from-purple-700 via-pink-600 to-rose-500' },
              { id: 'emerald-teal', class: 'bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-500' }
            ].map(p => (
              <button 
                key={p.id}
                onClick={() => updateCoverPreset(p.class)}
                className={`w-3.5 h-3.5 rounded-full border border-white/20 transition-transform hover:scale-125 ${p.class}`}
                title={`Theme preset ${p.id}`}
              />
            ))}
          </div>
        </div>

        {/* Profile Avatar bar */}
        <div className="px-6 pb-6 pt-14 relative flex flex-col md:flex-row md:items-end justify-between border-t border-white/5">
          
          {/* Floating avatar block */}
          <div className="absolute -top-12 left-6 flex items-end space-x-4">
            <div className="h-24 w-24 rounded-full border-4 border-[#0B0D10] bg-[#13161A] overflow-hidden flex items-center justify-center relative group">
              {profilePic ? (
                <img src={profilePic} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-indigo-400 uppercase font-mono">{getInitials(fullNameInput)}</span>
              )}
              {/* Photo upload trigger */}
              <label className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-[8px] font-bold text-white uppercase tracking-wider">
                <Upload className="h-4 w-4 text-indigo-400 mb-1" />
                <span>Upload</span>
                <input type="file" onChange={handleAvatarChange} className="hidden" accept="image/*" />
              </label>
            </div>
            
            <div className="mb-2">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-1.5">
                <span>{fullNameInput || 'John Doe'}</span>
                <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full uppercase">
                  L3 ANALYST
                </span>
              </h3>
              <p className="text-xs text-indigo-400 font-mono mt-0.5">@{usernameInput || 'analyst'}</p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3 self-end">
            <button 
              onClick={downloadProfileJSON}
              className="px-4 py-2 bg-slate-900 border border-white/5 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span>Export Identity Profile</span>
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 text-rose-300 hover:text-rose-200 rounded-xl text-xs font-semibold transition-colors"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* Internal Tabs Switcher */}
      <div className="flex border-b border-white/5 pb-0.5 space-x-2 z-10 relative">
        {[
          { id: 'general', label: "Identity & General Details", icon: User },
          { id: 'security', label: "Security & API Console", icon: Key },
          { id: 'preferences', label: "Preferences & Audit Timeline", icon: History }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setProfileTab(t.id as any)}
              className={`flex items-center space-x-2 px-5 py-3 text-xs font-medium border-b-2 transition-all focus:outline-none ${
                profileTab === t.id 
                  ? 'border-indigo-500 text-indigo-400 font-semibold bg-indigo-500/5 rounded-t-xl' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Identity & Address Tab Details */}
      {profileTab === 'general' && (
        <form onSubmit={handleSaveDetails} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* General Fields */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-5 lg:col-span-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Analyst Details</h3>
            
            {saveSuccess && (
              <p className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold font-mono">{saveSuccess}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={fullNameInput}
                  onChange={e => setFullNameInput(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Username</label>
                <input 
                  type="text" 
                  value={usernameInput}
                  onChange={e => setUsernameInput(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  required
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Contact Phone</label>
                <input 
                  type="text" 
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Duty Title Badge</label>
                <input 
                  type="text" 
                  value={jobTitleInput}
                  onChange={e => setJobTitleInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-indigo-500/25"
              >
                Save Details Change
              </button>
            </div>
          </div>

          {/* Address Fields */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-5 lg:col-span-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Duty Address Location</h3>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Street Address</label>
                <input 
                  type="text" 
                  value={streetInput}
                  onChange={e => setStreetInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">City</label>
                <input 
                  type="text" 
                  value={cityInput}
                  onChange={e => setCityInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">State</label>
                  <input 
                    type="text" 
                    value={stateInput}
                    onChange={e => setStateInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Zip Code</label>
                  <input 
                    type="text" 
                    value={zipInput}
                    onChange={e => setZipInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

        </form>
      )}

      {/* Security settings, API Keys and Connected Accounts */}
      {profileTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Security Settings panel */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Security controls</h3>
              
              <div className="space-y-4 text-xs">
                {/* 2FA Toggle */}
                <div className="flex justify-between items-center font-mono">
                  <span className="text-slate-500">MFA Verification</span>
                  <button 
                    onClick={toggle2FA}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                      currentUser?.twoFactorEnabled 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentUser?.twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
                
                {/* Passkey Setup Section */}
                <div className="flex justify-between items-center font-mono">
                  <span className="text-slate-500">FIDO2 Passkeys</span>
                  {isPasskeyRegistered || currentUser?.passkeyRegistered ? (
                    <span className="text-emerald-400 font-semibold text-[10px] flex items-center space-x-1">
                      <span>REGISTERED</span>
                      <span>✔</span>
                    </span>
                  ) : (
                    <button 
                      type="button"
                      onClick={handleRegisterPasskey}
                      disabled={passkeyLoading}
                      className="px-2.5 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-[9px] font-bold transition-all"
                    >
                      {passkeyLoading ? 'REGISTERING...' : 'REGISTER'}
                    </button>
                  )}
              </div>

              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Security Clearance</span>
                <span className="text-cyan-400 font-semibold">L3 SYSTEM ACCESS</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Auth Signature Algorithm</span>
                <span className="text-slate-400">HMAC-SHA256</span>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-4 border-t border-red-500/10 space-y-3">
              <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-widest font-mono">Danger Zone</h4>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="w-full bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-bold py-2.5 rounded-xl transition-all"
              >
                Delete Analyst Account
              </button>
            </div>
          </div>

          {/* Developer API Key Console & Connected Accounts */}
          <div className="glass-card rounded-2xl p-6 lg:col-span-2 border border-white/5 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Developer API Console */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Developer API Secret Key</h3>
                
                <div className="space-y-2">
                  <input 
                    type={showKey ? "text" : "password"} 
                    value={apiKey} 
                    readOnly 
                    className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-xs text-slate-300 font-mono focus:outline-none"
                  />
                  <div className="flex space-x-2">
                    <button 
                      type="button"
                      onClick={() => setShowKey(prev => !prev)}
                      className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 border border-white/5 rounded-xl text-xs text-slate-300 transition-colors font-semibold"
                    >
                      {showKey ? "Hide" : "Show"}
                    </button>
                    <button 
                      type="button"
                      onClick={copyToClipboard}
                      className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-xs text-white transition-colors font-bold"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={generateNewKey}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline font-semibold mt-1"
                >
                  Roll & Generate New API Key
                </button>
              </div>

              {/* Connected Accounts */}
              <div className="space-y-4 border-l border-white/5 pl-0 md:pl-6">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Connected Accounts</h3>
                <p className="text-[10px] text-slate-500 leading-normal">Bind external single-sign-on providers directly to your analyst credentials profile.</p>

                <div className="space-y-2 text-xs">
                  {[
                    { id: 'google', name: 'Google Workspace' },
                    { id: 'github', name: 'GitHub Developer' },
                    { id: 'microsoft', name: 'Microsoft Azure ActiveDirectory' }
                  ].map(prov => {
                    const isConnected = (connectedProviders as any)[prov.id];
                    return (
                      <div key={prov.id} className="flex justify-between items-center p-2.5 bg-slate-950/40 border border-slate-900 rounded-xl font-mono">
                        <span className="text-slate-400">{prov.name}</span>
                        <button 
                          type="button"
                          onClick={() => toggleProvider(prov.id as any)}
                          className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border transition-colors ${
                            isConnected 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {isConnected ? 'CONNECTED' : 'CONNECT'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Active sessions tracking */}
            <div className="pt-6 border-t border-white/5 space-y-3">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Active Session Logs</h4>
              <div className="space-y-2">
                {sessions.map((sess) => (
                  <div key={sess.id} className="flex justify-between items-center p-3 bg-slate-950/40 border border-slate-900 rounded-xl text-xs font-mono">
                    <div>
                      <p className="font-semibold text-slate-200">{sess.device}</p>
                      <p className="text-[10px] text-slate-500">{sess.location} • IP: {sess.ip}</p>
                    </div>
                    {sess.status === "Active Session" ? (
                      <span className="text-[10px] font-bold text-emerald-400">
                        {sess.status}
                      </span>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => revokeSession(sess.id)}
                        className="text-[10px] font-bold text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
                {sessions.length === 0 && (
                  <p className="text-xs text-slate-500 italic font-mono">No active external session connections.</p>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Cryptographic JWT and Refresh Token Console */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cryptographic JWT Token Analyzer</h3>
              <p className="text-xs text-slate-400 font-light mt-1">Real-time inspection of active crypt-claims and payload segments.</p>
            </div>
            <button 
              type="button"
              onClick={() => generateMockTokens(currentUser?.email, currentUser?.fullName)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all flex items-center space-x-1.5"
            >
              <span>Rotate & Refresh JWT</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Decoded claims */}
            <div className="space-y-4 bg-slate-950/40 border border-slate-900 rounded-xl p-5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-white/5 pb-2">Decoded Claims Payload</h4>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">subject (sub)</span>
                  <span className="text-slate-200">{decodedPayload?.sub || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">name</span>
                  <span className="text-slate-200">{decodedPayload?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">role claim</span>
                  <span className="text-indigo-400 font-bold">{decodedPayload?.role || 'L3_Clearance_Analyst'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">expires (exp)</span>
                  <span className="text-slate-300">{decodedPayload?.exp ? new Date(decodedPayload.exp * 1000).toLocaleString() : 'N/A'}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Refresh Token Value</span>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 font-mono text-[10px] text-cyan-400 break-all select-all">
                  {refreshToken}
                </div>
              </div>
            </div>

            {/* Raw encoded token */}
            <div className="space-y-4 bg-slate-950/40 border border-slate-900 rounded-xl p-5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-white/5 pb-2">Raw Base64 Encoded Token</h4>
              <div className="font-mono text-[9px] break-all select-all leading-relaxed p-3 bg-slate-950 rounded-lg border border-slate-900">
                <span className="text-rose-400">{jwtToken.header}</span>
                <span className="text-white">.</span>
                <span className="text-cyan-400">{jwtToken.payload}</span>
                <span className="text-white">.</span>
                <span className="text-indigo-400">{jwtToken.signature}</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span> <span>Header</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span> <span>Payload</span>
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span> <span>Signature</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )}

  {/* Preferences Tab, Theme, Language, Notifications & Audit Logs */}
  {profileTab === 'preferences' && (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
      
      {/* Preferences configuration */}
      <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6 lg:col-span-1">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Preferences</h3>
        
        {/* Theme Preferences */}
        <div className="space-y-3">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Theme Preferences</label>
          <div className="grid grid-cols-2 gap-3 text-center">
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`py-3 rounded-xl border font-bold flex flex-col items-center justify-center space-y-1 ${
                theme === 'dark' 
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' 
                  : 'border-white/5 text-slate-400 hover:text-white bg-[#13161A]/40'
              }`}
            >
              <Moon className="h-4 w-4 mb-1" />
              <span>Dark Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`py-3 rounded-xl border font-bold flex flex-col items-center justify-center space-y-1 ${
                theme === 'light' 
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' 
                  : 'border-white/5 text-slate-400 hover:text-white bg-[#13161A]/40'
              }`}
            >
              <Sun className="h-4 w-4 mb-1" />
              <span>Light Mode</span>
            </button>
          </div>
        </div>

        {/* Language Preferences */}
        <div className="space-y-2.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Language Preference</label>
          <select
            value={lang}
            onChange={e => setLang(e.target.value)}
            className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="en">English (EN)</option>
            <option value="es">Español (ES)</option>
            <option value="fr">Français (FR)</option>
          </select>
        </div>

        {/* Notification settings */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Notification settings</label>
          
          {[
            { label: 'Security Email Digests', state: notifEmail, set: setNotifEmail },
            { label: 'Push Anomaly Alerts', state: notifSecurity, set: setNotifSecurity },
            { label: 'Slack Webhook Stream Logs', state: notifSlack, set: setNotifSlack }
          ].map((notif, idx) => (
            <div key={idx} className="flex justify-between items-center font-mono">
              <span className="text-slate-400">{notif.label}</span>
              <button
                type="button"
                onClick={() => {
                  notif.set(!notif.state);
                  addTimelineEvent("Notification Preferences Modified", `${notif.label} toggled to ${!notif.state ? 'enabled' : 'disabled'}.`);
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                  notif.state ? 'bg-indigo-500' : 'bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notif.state ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Activity Timeline logs */}
      <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-5 lg:col-span-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Analyst Activity Timeline</h3>
        
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
          {timeline.map(event => (
            <div key={event.id} className="relative pl-6 border-l border-white/10 pb-4 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-indigo-500 rounded-full border-2 border-[#0B0D10]" />
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-semibold text-white">{event.action}</p>
                <span className="text-[9px] text-slate-500 font-mono">{event.time}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">{event.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )}

</div>
);
}

interface LandingPageProps {
  onStartDemo: () => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
}

function LandingPage({ onStartDemo, theme, setTheme }: LandingPageProps) {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  
  // Pricing toggle (monthly/yearly)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Real-time metric fluctuation simulation
  const [anomalyValue, setAnomalyValue] = useState(0.0984);
  const [liveTriggersCount, setLiveTriggersCount] = useState(14029);

  useEffect(() => {
    const metricInterval = setInterval(() => {
      setAnomalyValue(prev => {
        const diff = (Math.random() - 0.5) * 0.006;
        return Math.max(0.005, Math.min(0.25, Number((prev + diff).toFixed(4))));
      });
      setLiveTriggersCount(prev => prev + (Math.random() > 0.45 ? 1 : 0));
    }, 1500);
    return () => clearInterval(metricInterval);
  }, []);

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative overflow-x-hidden ${
      theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#0B0D10] text-[#F8FAFC]'
    }`}>
      {/* Dynamic Grid Background with Floating Blur Nodes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-90">
        <div className="absolute top-1/4 left-1/10 w-[480px] h-[480px] bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/10 w-[600px] h-[600px] bg-cyan-400/18 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-[420px] h-[420px] bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <ParticleBackground theme={theme} />

      {/* Global CSS light theme overrides */}
      {theme === 'light' && (
        <style dangerouslySetInnerHTML={{__html: `
          body, html, .min-h-screen { 
            background-color: #f8fafc !important; 
            background-image: radial-gradient(rgba(99, 102, 241, 0.04) 1.5px, transparent 1.5px) !important; 
            background-size: 24px 24px !important; 
            color: #0f172a !important; 
          }
          .glass-panel { 
            background: rgba(255, 255, 255, 0.85) !important; 
            backdrop-filter: blur(16px) !important;
            border-color: rgba(99, 102, 241, 0.08) !important; 
            color: #1e293b !important; 
            box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.08) !important;
          }
          .glass-card { 
            background: #ffffff !important; 
            border-color: rgba(99, 102, 241, 0.08) !important; 
            color: #334155 !important; 
            box-shadow: 0 8px 30px -4px rgba(99, 102, 241, 0.04) !important;
          }
          .text-slate-300 { color: #475569 !important; }
          .text-slate-400 { color: #475569 !important; }
          .text-slate-500 { color: #64748b !important; }
          .text-white { color: #0f172a !important; }
          .border-white\\/5 { border-color: rgba(99, 102, 241, 0.08) !important; }
          .border-white\\/10 { border-color: rgba(99, 102, 241, 0.12) !important; }
          .bg-slate-950 { background: #f1f5f9 !important; }
          .bg-slate-950\\/20 { background: rgba(241, 245, 249, 0.6) !important; }
          .bg-slate-950\\/40 { background: rgba(241, 245, 249, 0.9) !important; }
          .bg-slate-900 { background: #ffffff !important; border-color: rgba(99, 102, 241, 0.08) !important; }
          .bg-slate-900\\/40 { background: rgba(241, 245, 249, 0.4) !important; }
          .bg-slate-900\\/60 { background: rgba(241, 245, 249, 0.6) !important; }
          .bg-\\[\\#13161A\\] { background: #f1f5f9 !important; }
          .bg-\\[\\#13161A\\]\\/40 { background: rgba(241, 245, 249, 0.4) !important; }
          .bg-\\[\\#13161A\\]\\/60 { background: rgba(241, 245, 249, 0.6) !important; }
          .text-indigo-400 { color: #4f46e5 !important; }
          .text-cyan-400 { color: #0891b2 !important; }
          .text-emerald-400 { color: #16a34a !important; }
          .text-rose-400 { color: #dc2626 !important; }
          .text-rose-300 { color: #b91c1c !important; }
        `}} />
      )}

      {/* 1. HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-colors">
        <div className="flex items-center space-x-2">
          <Shield className="h-7 w-7 text-indigo-500" />
          <span className="text-base md:text-lg font-extrabold tracking-widest uppercase font-mono bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">FinGuard AI</span>
        </div>

        <div className="flex items-center space-x-4">
          <a href="#features" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors hidden md:inline-block">Features</a>
          <a href="#architecture" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors hidden md:inline-block">Architecture</a>
          <a href="#pricing" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors hidden md:inline-block">Pricing</a>
          <a href="#faq" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors hidden md:inline-block">FAQ</a>

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-xl border transition-colors ${
              theme === 'light' ? 'bg-slate-200 border-slate-300 hover:bg-slate-300' : 'bg-slate-900 border-white/5 hover:bg-slate-800'
            }`}
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4 text-slate-800" /> : <Sun className="h-4 w-4 text-amber-400" />}
          </button>

          <button 
            onClick={onStartDemo}
            className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all"
          >
            Live Demo Console
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative py-20 lg:py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        <div className="space-y-7">
          <div className={`inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-full text-xs font-bold font-mono tracking-widest uppercase border ${
            theme === 'light'
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm'
              : 'bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 border-cyan-400/35 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md'
          }`}>
            <Sparkles className={`h-4 w-4 animate-pulse ${theme === 'light' ? 'text-indigo-600' : 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'}`} />
            <span>Multi-Agent Fraud Network v2.0</span>
          </div>

          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] ${
            theme === 'light' ? 'text-slate-900' : 'text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]'
          }`}>
            Collaborative AI for{" "}
            <span className={`bg-clip-text text-transparent ${
              theme === 'light' 
                ? 'bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600 font-black' 
                : 'bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]'
            }`}>
              Enterprise
            </span>{" "}
            Banking Protection
          </h1>

          <p className={`text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-xl ${
            theme === 'light' ? 'text-slate-700' : 'text-slate-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]'
          }`}>
            Secure your financial pipelines with multi-agent <span className={theme === 'light' ? 'text-indigo-600 font-bold underline decoration-indigo-400/50 underline-offset-4' : 'text-cyan-300 font-semibold underline decoration-cyan-400/40 underline-offset-4'}>LangGraph workflows</span>, unsupervised <span className={theme === 'light' ? 'text-purple-700 font-bold underline decoration-purple-400/50 underline-offset-4' : 'text-purple-300 font-semibold underline decoration-purple-400/40 underline-offset-4'}>Autoencoder anomaly detection</span>, and transparent <span className={theme === 'light' ? 'text-emerald-700 font-bold underline decoration-emerald-400/50 underline-offset-4' : 'text-emerald-300 font-semibold underline decoration-emerald-400/40 underline-offset-4'}>Shapley attribution scoring</span>.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 items-center">
            <button 
              onClick={onStartDemo}
              className="px-7 py-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-2xl text-xs md:text-sm font-extrabold shadow-[0_10px_30px_rgba(6,182,212,0.35)] flex items-center space-x-2.5 hover:scale-[1.04] hover:shadow-[0_15px_40px_rgba(6,182,212,0.5)] transition-all duration-300 border border-cyan-300/30"
            >
              <span>Launch Console</span>
              <ArrowRight className="h-4.5 w-4.5 text-cyan-200" />
            </button>

            <a 
              href="#architecture"
              className={`px-6 py-4 border rounded-2xl text-xs md:text-sm font-bold flex items-center space-x-2 transition-all hover:scale-[1.03] ${
                theme === 'light' 
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm' 
                  : 'bg-[#13161A]/80 border-cyan-500/20 text-slate-200 hover:bg-[#1B1F24] hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10'
              }`}
            >
              <BookOpen className={`h-4 w-4 ${theme === 'light' ? 'text-indigo-600' : 'text-cyan-400'}`} />
              <span>Developer Specs</span>
            </a>

            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-6 py-4 border rounded-2xl text-xs md:text-sm font-bold flex items-center space-x-2 transition-all hover:scale-[1.03] ${
                theme === 'light' 
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm' 
                  : 'bg-[#13161A]/80 border-cyan-500/20 text-slate-200 hover:bg-[#1B1F24] hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10'
              }`}
            >
              <Github className={`h-4 w-4 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
              <span>GitHub Sandbox</span>
            </a>
          </div>

          {/* Quick Highlight Stats Pill Bar */}
          <div className={`pt-4 flex flex-wrap items-center gap-6 border-t text-xs font-mono ${
            theme === 'light' ? 'border-slate-200 text-slate-700' : 'border-white/10 text-slate-300'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>99.42%</span>
              <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>ROC-AUC Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className={`font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>&lt; 15ms</span>
              <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>Inference Speed</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              <span className={`font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Zero-Trust</span>
              <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>Security Architecture</span>
            </div>
          </div>
        </div>

        {/* Floating Perspective Visual Widget */}
        <div className="relative flex items-center justify-center p-2 lg:p-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-purple-500/20 rounded-3xl blur-3xl animate-pulse" />
          <div className={`w-full max-w-md md:max-w-xl border rounded-3xl p-7 md:p-8 relative overflow-hidden transition-all duration-500 ${
            theme === 'light' 
              ? 'bg-white/95 border-indigo-200 shadow-xl text-slate-800' 
              : 'glass-card border-cyan-500/30 border-t-2 border-t-cyan-400/60 shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-slate-100 hover:border-cyan-400/60'
          }`}>
            {/* Background Ambient Glow */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
              theme === 'light' ? 'bg-amber-300/30' : 'bg-amber-500/15'
            }`} />
            <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
              theme === 'light' ? 'bg-cyan-300/30' : 'bg-cyan-500/15'
            }`} />

            <div className={`flex justify-between items-center mb-6 border-b pb-4 ${
              theme === 'light' ? 'border-slate-200' : 'border-white/10'
            }`}>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full animate-ping ${theme === 'light' ? 'bg-indigo-600' : 'bg-cyan-400'}`} />
                  <span className={`text-xs md:text-sm font-extrabold uppercase tracking-widest font-mono ${
                    theme === 'light' ? 'text-indigo-700' : 'text-cyan-400'
                  }`}>Live Attributions</span>
                </div>
                <p className={`text-xs font-mono font-semibold mt-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  Eval ID: <span className={theme === 'light' ? 'text-indigo-600 font-bold' : 'text-cyan-300'}>tx_{liveTriggersCount}</span>
                </p>
              </div>
              <span className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 border animate-pulse ${
                theme === 'light'
                  ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/20'
              }`}>
                <span className={`h-2 w-2 rounded-full inline-block animate-ping ${theme === 'light' ? 'bg-amber-600' : 'bg-amber-400'}`} />
                <span>HIGH RISK FLAG</span>
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs md:text-sm">
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className={theme === 'light' ? 'text-slate-800' : 'text-slate-200'}>TX_AMOUNT</span>
                  <span className={theme === 'light' ? 'text-purple-700 font-bold' : 'text-purple-400 font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]'}>+0.82 attribution</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}>
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full w-[82%] shadow-sm shadow-purple-500/50" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className={theme === 'light' ? 'text-slate-800' : 'text-slate-200'}>COUNTRY_MATCH</span>
                  <span className={theme === 'light' ? 'text-amber-700 font-bold' : 'text-amber-400 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]'}>+0.54 attribution</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}>
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full w-[54%] shadow-sm shadow-amber-500/50" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-300'}>DEVICE_VELOCITY</span>
                  <span className={theme === 'light' ? 'text-slate-500 font-medium' : 'text-slate-400 font-medium'}>0.00 attribution</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}>
                  <div className="h-full bg-slate-400 rounded-full w-[2%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className={theme === 'light' ? 'text-slate-800' : 'text-slate-200'}>IP_REPUTATION</span>
                  <span className={theme === 'light' ? 'text-emerald-700 font-bold' : 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]'}>-0.21 attribution</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}>
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full w-[21%] shadow-sm shadow-emerald-500/50" />
                </div>
              </div>
            </div>

            {/* Enhanced Sparkline simulation graph */}
            <div className={`mt-6 rounded-xl p-3.5 border shadow-inner ${
              theme === 'light' ? 'bg-slate-100/90 border-slate-200' : 'bg-[#0B0D10]/50 border-white/10'
            }`}>
              <div className={`flex justify-between text-[11px] font-mono mb-2 font-semibold ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <span>Anomaly Reconstruction Vector</span>
                <span className={theme === 'light' ? 'text-amber-700 font-bold' : 'text-amber-400'}>Peak Signal #8</span>
              </div>
              <div className="h-16 flex items-end space-x-2">
                {[30, 45, 38, 70, 52, 60, 85, 95, 75, 88].map((val, idx) => (
                  <div 
                    key={idx} 
                    className={`flex-1 rounded-t-md transition-all duration-500 ${
                      idx === 7 
                        ? 'bg-gradient-to-t from-amber-500 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.6)] scale-105' 
                        : 'bg-gradient-to-t from-indigo-500/50 to-cyan-400/90 hover:from-indigo-600 hover:to-cyan-400'
                    }`} 
                    style={{ height: `${val}%` }} 
                  />
                ))}
              </div>
            </div>

            <div className={`mt-5 pt-4 border-t flex justify-between items-center text-xs md:text-sm ${
              theme === 'light' ? 'border-slate-200' : 'border-white/10'
            }`}>
              <span className={`font-mono font-semibold ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Autoencoder Loss:</span>
              <span className={`px-3 py-1 rounded-lg font-extrabold font-mono border ${
                theme === 'light' 
                  ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-sm' 
                  : 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/20'
              }`}>
                {anomalyValue}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT INTRODUCING VIDEO / SCREENSHOT WRAPPER */}
      <section className={`py-24 border-y px-6 ${
        theme === 'light' ? 'bg-slate-100/60 border-slate-200' : 'bg-slate-950/40 border-white/10'
      }`}>
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/25 px-4 py-1.5 rounded-full text-xs text-indigo-400 font-mono tracking-wider uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
            <span>Interactive Demo Visualization</span>
          </div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tight ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            Real-Time <span className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">Telemetry & Model Analytics</span>
          </h2>
          <p className={`text-sm md:text-base max-w-lg mx-auto leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Watch real-time transaction streams flow through API Gateways, Kafka queues, and FastAPI Shapley attribution inference engines.
          </p>
        </div>

        <AnalyticsVideoPlayer theme={theme} />
      </section>

      {/* 4. FEATURES GRID */}
      <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/25 px-4 py-1.5 rounded-full text-xs text-cyan-400 font-mono tracking-wider uppercase">
            <Shield className="h-3.5 w-3.5 animate-pulse" />
            <span>Enterprise Core Controls</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            Advanced <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Fraud Detection Engine</span>
          </h2>
          <p className={`text-sm md:text-base leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Low-latency sub-15ms AI inference engineered for high-throughput banking networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Collaborative Agents", desc: "LangGraph state network routers orchestrating Fraud, Compliance, and Advisory nodes.", icon: BrainCircuit, tag: "v2.4 Active", color: "from-indigo-500 to-cyan-400" },
            { title: "Reconstruction Scoring", desc: "Unsupervised deep Autoencoder models calculating reconstruction loss frontiers.", icon: Shield, tag: "Sub-15ms", color: "from-cyan-400 to-emerald-400" },
            { title: "Explainable Attributions", desc: "Local Shapley Attributions justifying transaction risk flags to compliance teams.", icon: Sparkles, tag: "Auto-calibrated", color: "from-purple-500 to-indigo-400" },
            { title: "Hybrid Indexing", desc: "Fused semantic vector queries with sparse keyword indices on Qdrant database.", icon: Search, tag: "Live Stream", color: "from-emerald-400 to-cyan-400" }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className={`border rounded-3xl p-7 space-y-5 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-indigo-500/10' 
                    : 'glass-card border-white/10 border-t-2 border-t-cyan-400/50 hover:border-cyan-400/80 hover:shadow-[0_15px_35px_rgba(6,182,212,0.15)]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className={`h-13 w-13 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md ${
                    theme === 'light'
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                      : 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                    theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-white/5 border-white/10 text-cyan-300'
                  }`}>
                    {feat.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className={`text-base font-bold tracking-tight ${
                    theme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>{feat.title}</h3>
                  <p className={`text-xs leading-relaxed ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                  }`}>{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ARCHITECTURE DIAGRAM SECTION */}
      <section id="architecture" className={`py-32 border-y px-6 md:px-12 ${
        theme === 'light' ? 'bg-slate-100/60 border-slate-200' : 'bg-slate-950/40 border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              System Topography & <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Architecture</span>
            </h2>
            <p className={`text-sm md:text-base leading-relaxed ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Distributed microservices communicating asynchronously via Kafka event streams and PostgreSQL database clusters.
            </p>
          </div>

          {/* Animated Architecture visual mockup */}
          <div className={`border rounded-3xl p-8 max-w-4xl mx-auto overflow-hidden shadow-2xl ${
            theme === 'light' ? 'bg-white border-slate-200' : 'glass-panel border-cyan-500/30'
          }`}>
            
            {/* Animated SVG Flows */}
            <svg className="w-full h-24 mb-8 hidden md:block" viewBox="0 0 800 100">
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -40;
                    }
                  }
                  .flow-line {
                    animation: dash 2.5s linear infinite;
                  }
                `}} />
              </defs>
              
              {/* Nodes Path */}
              <path 
                d="M 90,50 L 250,50 M 350,50 L 500,50 M 600,50 L 710,50" 
                stroke={theme === 'light' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(6, 182, 212, 0.2)'} 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M 90,50 L 250,50 M 350,50 L 500,50 M 600,50 L 710,50" 
                stroke="url(#flowGrad)" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeDasharray="10, 15" 
                className="flow-line" 
              />
              
              {/* Text indicator steps */}
              <circle cx="90" cy="50" r="8" fill="#6366f1" className="animate-pulse" />
              <circle cx="300" cy="50" r="8" fill="#06b6d4" />
              <circle cx="550" cy="50" r="8" fill="#10b981" />
              <circle cx="710" cy="50" r="8" fill="#ec4899" />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center font-mono text-xs">
              
              <div className={`p-5 border rounded-2xl ${
                theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-white/10'
              }`}>
                <span className="text-[10px] text-indigo-400 block uppercase font-bold">1. Ingress Gateway</span>
                <span className={`font-bold block mt-1.5 text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Spring Gateway</span>
                <span className={`block mt-1 text-[10px] font-sans ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Rate Limit & Auth checks</span>
              </div>

              <div className={`p-5 border rounded-2xl ${
                theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-white/10'
              }`}>
                <span className="text-[10px] text-cyan-400 block uppercase font-bold">2. Event Broker</span>
                <span className={`font-bold block mt-1.5 text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Apache Kafka</span>
                <span className={`block mt-1 text-[10px] font-sans ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Stream processing queue</span>
              </div>

              <div className={`p-5 border rounded-2xl ${
                theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-white/10'
              }`}>
                <span className="text-[10px] text-emerald-400 block uppercase font-bold">3. Inference Model</span>
                <span className={`font-bold block mt-1.5 text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>FastAPI Predictor</span>
                <span className={`block mt-1 text-[10px] font-sans ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Shapley score attribution</span>
              </div>

              <div className={`p-5 border rounded-2xl ${
                theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-white/10'
              }`}>
                <span className="text-[10px] text-pink-400 block uppercase font-bold">4. Vector DB</span>
                <span className={`font-bold block mt-1.5 text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Qdrant Cloud</span>
                <span className={`block mt-1 text-[10px] font-sans ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Semantic search caching</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGY STACK */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12 text-center">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Engineered with State-of-the-Art Tech Stack</h2>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {[
            { name: "React 18", color: "hover:text-[#61dafb] hover:border-[#61dafb]/20" },
            { name: "Vite", color: "hover:text-[#646cff] hover:border-[#646cff]/20" },
            { name: "Spring Boot 3", color: "hover:text-[#6db33f] hover:border-[#6db33f]/20" },
            { name: "FastAPI", color: "hover:text-[#059669] hover:border-[#059669]/20" },
            { name: "Apache Kafka", color: "hover:text-[#ffffff] hover:border-[#ffffff]/20" },
            { name: "Qdrant DB", color: "hover:text-[#d97706] hover:border-[#d97706]/20" },
            { name: "OpenTelemetry", color: "hover:text-[#3b82f6] hover:border-[#3b82f6]/20" },
            { name: "MLflow", color: "hover:text-[#ec4899] hover:border-[#ec4899]/20" }
          ].map((tech, idx) => (
            <span 
              key={idx} 
              className={`text-xs font-bold text-slate-400 font-mono tracking-wider px-4 py-2 border border-white/5 rounded-full bg-slate-900/40 cursor-default transition-all duration-300 ${tech.color}`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* 7. PRICING PLANS */}
      <section id="pricing" className="py-32 bg-slate-950/20 border-y border-white/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Flexible Developer Pricing</h2>
            <p className="text-sm md:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">Scale your compliance pipelines with tailored pricing structures.</p>
            
            {/* Interactive Billing Cycle Toggle Switch */}
            <div className="flex items-center justify-center space-x-3 mt-4">
              <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-slate-500'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-10 h-6 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-full p-1 transition-all flex items-center relative border border-indigo-500/30"
              >
                <div 
                  className={`w-4 h-4 bg-indigo-400 rounded-full transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-4' : 'translate-x-0'
                  }`} 
                />
              </button>
              <span className={`text-xs font-semibold flex items-center space-x-1.5 ${billingCycle === 'yearly' ? 'text-white font-bold' : 'text-slate-500'}`}>
                <span>Yearly</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-mono uppercase font-bold">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Developer Tier", price: 0, features: ["FastAPI Scoring", "Local Qdrant Sandbox", "Mock Kafka Logs", "Console Access"] },
              { name: "Enterprise Console", price: 999, features: ["Autoencoder Pipelines", "Distributed Kafka Clusters", "SHAP/LIME Dashboards", "24/7 SLA Support"] },
              { name: "L3 Clearance Custom", price: "Custom", features: ["Airgapped Deployments", "Custom LangGraph Routers", "Government Boundary Security", "Dedicated Architect"] }
            ].map((plan, idx) => {
              const displayPrice = typeof plan.price === 'number' 
                ? (billingCycle === 'yearly' ? `$${Math.floor(plan.price * 0.8)}` : `$${plan.price}`)
                : plan.price;

              return (
                <div key={idx} className={`glass-card border rounded-2xl p-8 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-2xl transition-all ${
                  idx === 1 ? 'border-indigo-500 shadow-xl relative md:scale-105 bg-slate-900/60' : 'border-white/5'
                }`}>
                  {idx === 1 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">{plan.name}</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-extrabold text-white font-mono">{displayPrice}</span>
                      {typeof plan.price === 'number' && <span className="text-xs text-slate-500 ml-1">/ month</span>}
                    </div>
                    <ul className="space-y-3.5 text-xs text-slate-300 font-light mb-8">
                      {plan.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-center space-x-2">
                          <Check className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={onStartDemo}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                      idx === 1 
                        ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Enterprise Testimonials</h2>
          <p className="text-sm md:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">Read reviews from compliance analysts and engineering leads.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            { quote: "FinGuard AI SHAP attributions saved our compliance team hundreds of hours. We finally understand why transaction models flag specific anomalies.", author: "Sarah Jenkins", role: "Risk Coordinator, Horizon Bank" },
            { quote: "The LangGraph multi-agent architecture is robust. Routing network cases from gateway ingress to Qdrant semantic indexes runs sub-40ms.", author: "Marcus Vance", role: "Lead Systems Architect, CryptoLedgers Inc" }
          ].map((test, idx) => (
            <div key={idx} className="glass-card border border-white/5 rounded-2xl p-8 space-y-6 flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300">
              <p className="text-xs md:text-sm italic text-slate-300 font-light leading-relaxed">"{test.quote}"</p>
              <div className="font-mono text-xs flex items-center space-x-3">
                <div className="h-9 w-9 bg-indigo-500/10 rounded-full flex items-center justify-center text-xs font-bold text-indigo-400">
                  {test.author.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white text-xs">{test.author}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-32 bg-slate-950/20 border-y border-white/5 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Frequently Asked Queries</h2>
            <p className="text-sm md:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">Everything you need to know about the FinGuard AI pipelines.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "How accurate is the hybrid XGBoost + Autoencoder model?", a: "The Autoencoder model flags structural outliers with over 91% recall. XGBoost adds a precision layer filtering down common false positives before secondary analyst review." },
              { q: "What is the pipeline latency margin for vector similarity runs?", a: "Qdrant searches achieve sub-10ms query evaluations by caching indices and performing hybrid sparse-dense keyword fusion." },
              { q: "Can we configure additional nodes inside the LangGraph workflow?", a: "Yes, developers can register custom state endpoints and declare routing directives inside FastAPI agent schemas." }
            ].map((faq, idx) => (
              <div key={idx} className="glass-card border border-white/5 rounded-2xl p-6 space-y-4 transition-all">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-xs md:text-sm font-bold text-white uppercase tracking-wider text-left focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <HelpCircle className={`h-4 w-4 text-slate-500 transform transition-transform duration-300 ${faqOpen[idx] ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>
                {faqOpen[idx] && (
                  <p className="text-xs text-slate-400 font-light leading-relaxed pt-3 border-t border-white/5 transition-all">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACT FORM & NEWSLETTER SUBSCRIPTION */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="glass-card border border-white/5 rounded-2xl p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Contact Compliance Specialist</h3>
            <p className="text-xs text-slate-400 font-light mt-1.5">Get in touch to arrange proof-of-concept audits.</p>
          </div>

          {contactSubmitted ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-xl text-center font-mono">
              ✔ Thank you! Our analyst will get back to you within 24 hours.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Business Email</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Message / Inquiry</label>
                <textarea 
                  rows={4} 
                  required 
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-indigo-500/20"
              >
                Submit Request
              </button>
            </form>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="glass-card border border-white/5 rounded-2xl p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Join Newsletter</h3>
            <p className="text-xs text-slate-400 font-light mt-1.5">Receive technical risk modeling logs and model updates twice a month.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input 
                type="email" 
                placeholder="analyst@firm.com"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
              <button 
                onClick={() => { if (newsletterEmail) setEmailSubscribed(true); }}
                className="px-5 py-3.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-xs text-white font-bold transition-all shadow-lg hover:shadow-indigo-500/20"
              >
                Subscribe
              </button>
            </div>
            {emailSubscribed && (
              <p className="text-xs text-emerald-400 font-semibold font-mono">✔ Subscribed successfully to security logs updates feed.</p>
            )}
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12 text-center text-slate-500 text-[10px] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-indigo-500" />
<span className="text-slate-400">© 2026 FinGuard AI Research. All rights reserved.</span>
          </div>
          <div className="flex space-x-4">
            <a href="#architecture" className="hover:text-indigo-400">Architecture</a>
            <a href="#faq" className="hover:text-indigo-400">FAQ</a>
            <a href="#contact" className="hover:text-indigo-400">Compliance Boundary</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 9. INTERACTIVE DEMO ANALYTICS VIDEO COMPONENT
// ==========================================
function AnalyticsVideoPlayer({ theme }: { theme: 'dark' | 'light' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 450;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const nodes = [
      { x: width * 0.18, y: height * 0.5, label: "Spring API Gateway" },
      { x: width * 0.42, y: height * 0.28, label: "Kafka Event Stream" },
      { x: width * 0.42, y: height * 0.72, label: "FastAPI ML Pipeline" },
      { x: width * 0.78, y: height * 0.5, label: "Qdrant Vector Engine" },
    ];

    const particles: { x: number; y: number; targetIdx: number; progress: number; speed: number; color: string }[] = [];

    const animate = () => {
      ctx.fillStyle = theme === 'light' ? '#ffffff' : '#0B0D10';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = theme === 'light' ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connections
      ctx.strokeStyle = theme === 'light' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 2;
      
      // Upper path
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.lineTo(nodes[3].x, nodes[3].y);
      ctx.stroke();

      // Lower path
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[2].x, nodes[2].y);
      ctx.lineTo(nodes[3].x, nodes[3].y);
      ctx.stroke();

      if (isPlaying) {
        // Spawn active data packet particles when playing
        if (Math.random() < 0.2) {
          const pathChoice = Math.random() > 0.5 ? 1 : 2;
          particles.push({
            x: nodes[0].x,
            y: nodes[0].y,
            targetIdx: pathChoice,
            progress: 0,
            speed: 0.015 + Math.random() * 0.01,
            color: pathChoice === 1 ? '#38bdf8' : '#a855f7'
          });
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.progress += p.speed;

          if (p.progress <= 1) {
            const startNode = nodes[0];
            const endNode = nodes[p.targetIdx];
            p.x = startNode.x + (endNode.x - startNode.x) * p.progress;
            p.y = startNode.y + (endNode.y - startNode.y) * p.progress;
          } else if (p.progress <= 2) {
            const startNode = nodes[p.targetIdx];
            const endNode = nodes[3];
            const p2 = p.progress - 1;
            p.x = startNode.x + (endNode.x - startNode.x) * p2;
            p.y = startNode.y + (endNode.y - startNode.y) * p2;
          } else {
            particles.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        }
      }

      // Draw nodes
      nodes.forEach((n, idx) => {
        const pulse = Math.sin(frame * 0.06 + idx) * 2.5;
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = idx === 3 
          ? 'rgba(34, 197, 94, 0.25)' 
          : 'rgba(6, 182, 212, 0.25)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = idx === 3 ? '#22c55e' : '#06b6d4';
        ctx.fill();

        ctx.font = '600 11px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        
        ctx.strokeStyle = theme === 'light' ? '#ffffff' : '#0B0D10';
        ctx.lineWidth = 3;
        ctx.strokeText(n.label, n.x, n.y - 15);

        ctx.fillStyle = theme === 'light' ? '#1e293b' : '#f1f5f9';
        ctx.fillText(n.label, n.x, n.y - 15);
      });

      // Telemetry Console Panel Overlay
      const panelX = 15;
      const panelY = height - 55;
      const panelW = 240;
      const panelH = 40;

      ctx.fillStyle = theme === 'light' ? 'rgba(241, 245, 249, 0.95)' : 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = theme === 'light' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1;
      ctx.fillRect(panelX, panelY, panelW, panelH);
      ctx.strokeRect(panelX, panelY, panelW, panelH);

      ctx.font = '700 9px monospace';
      ctx.fillStyle = isPlaying ? '#10b981' : '#f59e0b';
      ctx.textAlign = 'left';
      ctx.fillText(isPlaying ? "📡 ACTIVE REAL-TIME TELEMETRY STREAM" : "⏸ SIMULATION PAUSED (CLICK PLAY)", panelX + 10, panelY + 16);
      
      ctx.fillStyle = theme === 'light' ? '#475569' : '#94a3b8';
      ctx.font = '500 9px monospace';
      ctx.fillText(`Frame Index: ${frame} | Latency: 12ms`, panelX + 10, panelY + 28);

      frame++;
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, theme]);

  return (
    <div className={`max-w-4xl mx-auto border rounded-3xl overflow-hidden aspect-video shadow-2xl relative group transition-all duration-300 ${
      theme === 'light' 
        ? 'bg-white border-indigo-200 shadow-xl' 
        : 'bg-[#0B0D10] border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-cyan-400/60'
    }`}>
      {/* Background Canvas (Always Active) */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {!isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex flex-col items-center justify-center p-6 backdrop-blur-[2px] transition-all">
          <button 
            onClick={() => setIsPlaying(true)}
            className="h-20 w-20 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_40px_rgba(6,182,212,0.5)] cursor-pointer z-10 border-2 border-white/30 animate-bounce"
            title="Play active simulation video"
          >
            <svg className="h-8 w-8 ml-1 fill-white drop-shadow-md" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>

          <div className="mt-4 text-center space-y-1 z-10">
            <span className="text-xs md:text-sm font-extrabold text-white font-mono tracking-widest block uppercase drop-shadow-md">
              ▶ STREAM LIVE ANALYTICS ARCHITECTURE SIMULATION
            </span>
            <p className="text-xs text-cyan-300 font-mono">Click to watch real-time data packets flow through Kafka & FastAPI ML inference</p>
          </div>
        </div>
      )}

      {isPlaying && (
        <button 
          onClick={() => setIsPlaying(false)}
          className={`absolute top-4 right-4 border rounded-xl px-4 py-2 text-xs font-mono transition-colors shadow-md z-20 ${
            theme === 'light'
              ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
              : 'bg-[#13161A]/90 hover:bg-[#1B1F24] text-slate-200 border-white/10'
          }`}
        >
          ⏸ Pause Stream
        </button>
      )}
    </div>
  );
}

// ==========================================
// 10. SIMULATED PROVIDER OAUTH PORTALS
// ==========================================
function MockOAuthPage({ provider }: { provider: string }) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [screen, setScreen] = useState<'username' | 'password'>('username');
  const [oauthError, setOauthError] = useState('');
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setOauthError('');
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const cleanEmail = emailInput.trim();
    
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setOauthError("Couldn't find your account or invalid email format! Please enter a valid email address (e.g., analyst@finguard.com).");
      return;
    }
    
    if (provider.toLowerCase() === 'google' && screen === 'username') {
      setScreen('password');
      return;
    }
    
    // Complete login: set simulated state and close window
    localStorage.setItem('finguard_oauth_completed', 'true');
    localStorage.setItem('finguard_oauth_email', cleanEmail);
    window.close();
  };

  if (provider.toLowerCase() === 'google') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-slate-800 font-sans">
        <div className="w-full max-w-[450px] border border-slate-200 rounded-lg p-10 space-y-6 shadow-sm">
          <div className="flex justify-center mb-2">
            <svg className="h-8" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-normal text-slate-900">Sign in</h2>
            <p className="text-sm text-slate-600">to continue to <span className="font-semibold text-indigo-600">FinGuard AI</span></p>
          </div>

          {oauthError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium text-center">
              {oauthError}
            </div>
          )}

          <form onSubmit={handleNext} className="space-y-6 pt-4">
            {screen === 'username' ? (
              <div className="space-y-1">
                <input 
                  type="text" 
                  value={emailInput}
                  onChange={e => { setEmailInput(e.target.value); setOauthError(''); }}
                  placeholder="Email or phone"
                  required
                  autoFocus
                  className="w-full border border-slate-300 rounded px-3 py-3.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-400"
                />
                <div className="text-xs text-blue-600 font-medium pt-1 hover:underline cursor-pointer">Forgot email?</div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-sm text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full inline-block border border-slate-200 mb-2">
                  👤 {emailInput}
                </div>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoFocus
                  className="w-full border border-slate-300 rounded px-3 py-3.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
                <div className="text-xs text-blue-600 font-medium pt-1 hover:underline cursor-pointer">Forgot password?</div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <span className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">Create account</span>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded transition-colors"
              >
                {screen === 'username' ? 'Next' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (provider.toLowerCase() === 'github') {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-6 text-slate-300 font-sans">
        <div className="w-full max-w-[340px] space-y-6">
          <div className="flex justify-center">
            <svg className="h-12 w-12 text-white fill-current" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-light text-center text-white">Sign in to GitHub</h2>

          {oauthError && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs rounded-md font-medium text-center">
              {oauthError}
            </div>
          )}

          <form onSubmit={handleNext} className="bg-[#161b22] border border-[#21262d] rounded-md p-5 space-y-4 shadow-md">
            <div className="space-y-1">
              <label className="block text-xs text-slate-300">Username or email address</label>
              <input 
                type="text" 
                value={emailInput}
                onChange={e => { setEmailInput(e.target.value); setOauthError(''); }}
                placeholder="git_analyst@finguard.com"
                required
                autoFocus
                className="w-full bg-[#0d1117] border border-[#30363d] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs text-slate-300">Password</label>
                <span className="text-[10px] text-[#58a6ff] hover:underline cursor-pointer">Forgot password?</span>
              </div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                required
                className="w-full bg-[#0d1117] border border-[#30363d] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold py-2 rounded-md transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="border border-[#30363d] rounded-md p-4 text-xs text-center">
            New to GitHub? <span className="text-[#58a6ff] hover:underline cursor-pointer">Create an account</span>.
          </div>
        </div>
      </div>
    );
  }

  // Microsoft
  return (
    <div className="min-h-screen bg-[#f2f2f2] flex flex-col items-center justify-center p-6 text-slate-800 font-sans">
      <div className="w-full max-w-[440px] bg-white border border-slate-300 rounded p-11 space-y-6 shadow-md relative">
        <div className="flex items-center space-x-2">
          <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
            <div className="w-2.5 h-2.5 bg-[#f25022]" />
            <div className="w-2.5 h-2.5 bg-[#7fba00]" />
            <div className="w-2.5 h-2.5 bg-[#00a4ef]" />
            <div className="w-2.5 h-2.5 bg-[#ffb900]" />
          </div>
          <span className="text-sm font-semibold text-slate-500 font-sans tracking-wide">Microsoft</span>
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 mt-2">Sign in</h2>

        {oauthError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium text-center">
            {oauthError}
          </div>
        )}

        <form onSubmit={handleNext} className="space-y-4 pt-2">
          <input 
            type="text" 
            value={emailInput}
            onChange={e => { setEmailInput(e.target.value); setOauthError(''); }}
            placeholder="Email, phone, or Skype"
            required
            autoFocus
            className="w-full border-b border-slate-500 py-1.5 text-sm focus:outline-none focus:border-[#00a4ef] transition-all placeholder:text-slate-400"
          />
          <div className="text-xs text-slate-600">
            No account? <span className="text-[#00a4ef] hover:underline cursor-pointer">Create one!</span>
          </div>
          <div className="text-xs text-[#00a4ef] hover:underline cursor-pointer">
            Can’t access your account?
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button 
              type="button" 
              onClick={() => window.close()}
              className="bg-[#cccccc] hover:bg-[#bbbbbb] text-slate-800 text-xs px-6 py-2 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-[#0067b8] hover:bg-[#005da6] text-white text-xs px-6 py-2 transition-colors font-semibold"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 11. LIVE INTERACTIVE FRAUD SIMULATOR STUDIO
// ==========================================
function FraudSimulatorSection({ triggerToast, setNotifications }: { theme?: string; triggerToast: (msg: string, type?: 'info'|'success'|'critical') => void; setNotifications: React.Dispatch<React.SetStateAction<any[]>> }) {
  const [amount, setAmount] = useState(48500);
  const [country, setCountry] = useState('Cayman Islands');
  const [channel, setChannel] = useState('Mobile App');
  const [velocity, setVelocity] = useState(24);
  const [ipReputation, setIpReputation] = useState(78);
  const [result, setResult] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const evaluateRisk = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      let risk = 10;
      if (country === 'Cayman Islands' || country === 'Switzerland') risk += 35;
      if (amount > 20000) risk += 25;
      if (velocity > 15) risk += 20;
      if (ipReputation > 50) risk += 15;
      risk = Math.min(Math.max(risk, 5), 99);

      const isFraud = risk > 70;
      const resData = {
        riskScore: risk,
        status: isFraud ? 'CRITICAL' : risk > 40 ? 'EVALUATING' : 'CLEARED',
        lossScore: (risk * 0.0012).toFixed(4),
        shapFactors: [
          { name: `Country: ${country}`, impact: country === 'Cayman Islands' ? '+35%' : '+10%' },
          { name: `Transaction Amount: $${amount.toLocaleString()}`, impact: amount > 20000 ? '+25%' : '+5%' },
          { name: `Velocity: ${velocity} req/min`, impact: velocity > 15 ? '+20%' : '+4%' },
          { name: `IP Risk Index: ${ipReputation}%`, impact: ipReputation > 50 ? '+15%' : '+2%' },
        ]
      };

      setResult(resData);
      setIsEvaluating(false);

      if (isFraud) {
        triggerToast(`CRITICAL RISK FLAGGED! Score: ${risk}% ($${amount.toLocaleString()} from ${country})`, 'critical');
        setNotifications((prev: any[]) => [
          { id: Date.now().toString(), message: `SIMULATED THREAT: $${amount.toLocaleString()} from ${country} (${risk}% Risk)`, type: 'critical' },
          ...prev
        ]);
      } else {
        triggerToast(`Evaluation Complete: Transaction cleared with ${risk}% Risk Score.`, 'success');
      }
    }, 450);
  };

  const runPreset = (presetName: string) => {
    if (presetName === 'carding') {
      setAmount(120);
      setCountry('Russia');
      setChannel('Web Portal');
      setVelocity(88);
      setIpReputation(92);
    } else if (presetName === 'laundering') {
      setAmount(240000);
      setCountry('Cayman Islands');
      setChannel('SWIFT Wire');
      setVelocity(18);
      setIpReputation(65);
    } else {
      setAmount(8500);
      setCountry('Nigeria');
      setChannel('Crypto Gateway');
      setVelocity(45);
      setIpReputation(85);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center space-x-2">
            <FlaskConical className="h-6 w-6 text-cyan-400" />
            <span>Live Interactive Fraud Simulator Studio</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">Construct custom transactions and test XGBoost model risk attributions in real-time.</p>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => runPreset('carding')} className="px-3 py-2 bg-slate-900 border border-white/10 hover:border-cyan-400 text-xs font-bold text-cyan-300 rounded-xl">⚡ Carding Surge</button>
          <button onClick={() => runPreset('laundering')} className="px-3 py-2 bg-slate-900 border border-white/10 hover:border-amber-400 text-xs font-bold text-amber-300 rounded-xl">🌊 Offshore Laundering</button>
          <button onClick={() => runPreset('stuffing')} className="px-3 py-2 bg-slate-900 border border-white/10 hover:border-rose-400 text-xs font-bold text-rose-300 rounded-xl">🤖 Bot Blitz</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Sandbox */}
        <SpotlightCard className="p-6 lg:col-span-2 space-y-5">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
            <span>Transaction Feature Parameters</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Transaction Amount: <span className="text-cyan-400 font-mono">${amount.toLocaleString()}</span></label>
              <input type="range" min={10} max={500000} step={500} value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full accent-cyan-400" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Device Velocity: <span className="text-cyan-400 font-mono">{velocity} req/min</span></label>
              <input type="range" min={1} max={100} value={velocity} onChange={e => setVelocity(Number(e.target.value))} className="w-full accent-cyan-400" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Origin Country</label>
              <select value={country} onChange={e => setCountry(e.target.value)} className="w-full bg-[#13161A] border border-white/10 text-xs font-bold text-slate-200 rounded-xl p-3 focus:outline-none">
                <option value="Cayman Islands">Cayman Islands (High Risk)</option>
                <option value="Switzerland">Switzerland (Offshore Vault)</option>
                <option value="United States">United States (Domestic)</option>
                <option value="Singapore">Singapore (Financial Hub)</option>
                <option value="Russia">Russia (High Anomaly)</option>
                <option value="Nigeria">Nigeria (High Risk)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Payment Channel</label>
              <select value={channel} onChange={e => setChannel(e.target.value)} className="w-full bg-[#13161A] border border-white/10 text-xs font-bold text-slate-200 rounded-xl p-3 focus:outline-none">
                <option value="Mobile App">Mobile App</option>
                <option value="Web Portal">Web Portal</option>
                <option value="SWIFT Wire">SWIFT Wire Transfer</option>
                <option value="Crypto Gateway">Crypto Gateway</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">IP Reputation Anomaly Index: <span className="text-rose-400 font-mono">{ipReputation}%</span></label>
            <input type="range" min={0} max={100} value={ipReputation} onChange={e => setIpReputation(Number(e.target.value))} className="w-full accent-rose-400" />
          </div>

          <button onClick={evaluateRisk} disabled={isEvaluating} className="w-full py-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-2xl text-xs md:text-sm font-black shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer">
            <Zap className="h-4 w-4" />
            <span>{isEvaluating ? "Calculating Model Risk..." : "Evaluate Risk & SHAP Attributions"}</span>
          </button>
        </SpotlightCard>

        {/* Live Evaluation Results */}
        <SpotlightCard className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <BrainCircuit className="h-4 w-4 text-cyan-400" />
              <span>Model Risk Output</span>
            </h3>

            {result ? (
              <div className="space-y-4">
                <div className="text-center p-4 bg-slate-900/80 border border-white/10 rounded-2xl">
                  <span className="text-xs text-slate-400 font-bold block uppercase tracking-widest">XGBoost Risk Score</span>
                  <span className={`text-4xl font-black font-mono block mt-1 ${result.riskScore > 70 ? 'text-rose-400 animate-pulse' : result.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {result.riskScore}%
                  </span>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-extrabold border ${
                    result.status === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>{result.status}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">SHAP Factor Contributions</span>
                  {result.shapFactors.map((f: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-xs font-mono p-2 bg-slate-950/60 rounded-xl border border-white/5">
                      <span className="text-slate-300 truncate max-w-[180px]">{f.name}</span>
                      <span className="font-bold text-rose-400">{f.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <FlaskConical className="h-10 w-10 mx-auto text-slate-600 animate-bounce" />
                <p className="text-xs font-medium">Adjust transaction parameters and click "Evaluate Risk" to generate model outputs.</p>
              </div>
            )}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

// ==========================================
// 12. INTERACTIVE GLOBAL THREAT MAP VISUALIZER
// ==========================================
function GlobalThreatMapSection({ theme: _theme }: { theme?: string }) {
  const [selectedHub, setSelectedHub] = useState<string | null>('Cayman Islands');

  const hubs = [
    { name: 'New York, USA', x: 240, y: 160, volume: '$42.8M', threat: '1.2x Normal', status: 'CLEARED' },
    { name: 'London, UK', x: 440, y: 130, volume: '$18.4M', threat: '2.1x Normal', status: 'EVALUATING' },
    { name: 'Zurich, Switzerland', x: 480, y: 140, volume: '$34.2M', threat: '4.8x Normal', status: 'EVALUATING' },
    { name: 'Cayman Islands', x: 260, y: 220, volume: '$85.0M', threat: '8.4x CRITICAL', status: 'CRITICAL' },
    { name: 'Singapore', x: 740, y: 250, volume: '$29.1M', threat: '1.5x Normal', status: 'CLEARED' },
    { name: 'Tokyo, Japan', x: 810, y: 180, volume: '$15.6M', threat: '0.9x Normal', status: 'CLEARED' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center space-x-2">
            <Globe className="h-6 w-6 text-cyan-400" />
            <span>Interactive Global Threat Map Visualizer</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">Real-time wire transfer telemetry visualizer across major international financial hubs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SpotlightCard className="p-6 lg:col-span-2 relative min-h-[420px] flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950 pointer-events-none" />

          {/* SVG Map Canvas */}
          <div className="relative z-10 w-full h-[340px]">
            <svg className="w-full h-full" viewBox="0 0 900 400">
              {/* World outline dots grid */}
              {Array.from({ length: 40 }).map((_, i) => (
                <circle key={i} cx={(i * 22) + 20} cy={100 + Math.sin(i * 0.4) * 80} r="1.5" fill="#334155" opacity="0.4" />
              ))}

              {/* Wire transfer flow curves */}
              <path d="M 260 220 Q 370 140 480 140" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
              <path d="M 240 160 Q 340 120 440 130" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 480 140 Q 610 180 740 250" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Hub Nodes */}
              {hubs.map((h, idx) => (
                <g key={idx} onClick={() => setSelectedHub(h.name)} className="cursor-pointer group">
                  <circle cx={h.x} cy={h.y} r={h.status === 'CRITICAL' ? '12' : '8'} fill={h.status === 'CRITICAL' ? 'rgba(244,63,94,0.3)' : 'rgba(56,189,248,0.25)'} className="animate-ping" />
                  <circle cx={h.x} cy={h.y} r="6" fill={h.status === 'CRITICAL' ? '#f43f5e' : '#38bdf8'} />
                  <text x={h.x} y={h.y - 14} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" className="font-mono shadow-sm">{h.name}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="relative z-10 flex justify-between items-center text-xs font-mono text-slate-400 border-t border-white/10 pt-3">
            <span>📡 ACTIVE WIRE TELEMETRY: ONLINE</span>
            <span className="text-cyan-400 font-bold">SWIFT NET MESH: ACTIVE</span>
          </div>
        </SpotlightCard>

        {/* Hub Detail Panel */}
        <SpotlightCard className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Node Telemetry Inspector</span>
            </h3>

            {selectedHub ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/80 border border-white/10 rounded-2xl space-y-2">
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block font-mono">{selectedHub}</span>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-slate-300">24h Ingress Volume:</span>
                    <span className="text-sm font-extrabold text-white font-mono">{hubs.find(h => h.name === selectedHub)?.volume}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-300">Threat Index:</span>
                    <span className="text-xs font-bold text-rose-400 font-mono">{hubs.find(h => h.name === selectedHub)?.threat}</span>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <span className="text-xs font-bold text-slate-300 block uppercase">Active Ingress Wire Logs</span>
                  <div className="p-3 bg-slate-950/80 border border-white/5 rounded-xl text-slate-300 space-y-1">
                    <p className="text-rose-300 font-bold">⚠️ CRITICAL: Outflow scale &gt; 0.08</p>
                    <p className="text-[10px] text-slate-400">Target Vault: SG_VAULT_01</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-8 text-center">Click any node on the globe to inspect wire telemetry.</p>
            )}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

// ==========================================
// 13. EXECUTIVE EXPORT & AUDIT REPORTING HUB
// ==========================================
function AuditReportingHubSection({ triggerToast }: { theme?: string; triggerToast: (msg: string, type?: 'info'|'success'|'critical') => void }) {
  const [selectedTxId, setSelectedTxId] = useState('tx_993');

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Transaction_ID,Source,Destination,Amount,Risk_Score,Status\n"
      + "tx_993,Cayman Islands,SG_VAULT_01,$8500.00,91%,CRITICAL\n"
      + "tx_992,Switzerland,CH_CORP_04,$1200.00,56%,EVALUATING\n"
      + "tx_991,New York USA,US_FED_B3,$240500.00,14%,CLEARED\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "finguard_audit_ledger_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Downloaded CSV Audit Ledger!", "success");
  };

  const generateCertificate = () => {
    triggerToast(`Generated Official Compliance Verification Certificate for ${selectedTxId}!`, "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center space-x-2">
            <FileSpreadsheet className="h-6 w-6 text-cyan-400" />
            <span>Executive Export & Audit Reporting Hub</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">Export downloadable CSV ledgers, PDF executive digests, and cryptographic compliance certificates.</p>
        </div>

        <button onClick={downloadCSV} className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-2xl text-xs font-extrabold flex items-center space-x-2 shadow-lg shadow-cyan-500/20 cursor-pointer">
          <Download className="h-4 w-4" />
          <span>Export CSV Ledger</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpotlightCard className="p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <Award className="h-4 w-4 text-cyan-400" />
            <span>Official Compliance Certificate Generator</span>
          </h3>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">Select Flagged Transaction ID</label>
            <select value={selectedTxId} onChange={e => setSelectedTxId(e.target.value)} className="w-full bg-[#13161A] border border-white/10 text-xs font-bold text-slate-200 rounded-xl p-3 focus:outline-none">
              <option value="tx_993">tx_993 - Cayman Islands ($8,500.00 / Risk: 91%)</option>
              <option value="tx_992">tx_992 - Switzerland ($1,200.00 / Risk: 56%)</option>
              <option value="tx_991">tx_991 - New York ($240,500.00 / Risk: 14%)</option>
            </select>

            <div className="p-4 bg-slate-950/80 border border-white/10 rounded-2xl space-y-2 font-mono text-xs text-slate-300">
              <p className="text-cyan-400 font-bold">📜 CERTIFICATE METADATA</p>
              <p>Issuer: FinGuard Enterprise AI Engine v2.4</p>
              <p>Cryptographic Signature: <span className="text-slate-400">FG-SHA256-99A8F7...</span></p>
              <p>Audit Status: VERIFIED & COMPLIANT</p>
            </div>

            <button onClick={generateCertificate} className="w-full py-3 bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 text-cyan-300 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all cursor-pointer">
              <Award className="h-4 w-4 text-cyan-400" />
              <span>Generate Printable Certificate</span>
            </button>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <Download className="h-4 w-4 text-cyan-400" />
            <span>Executive Audit Digest</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Generate an executive summary report compiling all Autoencoder classification scores, SHAP attributions, and anomaly clusters for board compliance reviews.
          </p>

          <button onClick={downloadCSV} className="w-full py-3 bg-slate-900 border border-white/10 hover:border-cyan-400/40 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer">
            <FileCheck2 className="h-4 w-4 text-cyan-400" />
            <span>Download Audit Digest (CSV)</span>
          </button>
        </SpotlightCard>
      </div>
    </div>
  );
}

// ==========================================
// 14. VISUAL CUSTOM RULE BUILDER & WEBHOOKS
// ==========================================
function VisualRuleBuilderSection({ triggerToast }: { theme?: string; triggerToast: (msg: string, type?: 'info'|'success'|'critical') => void }) {
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.slack.com/services/T00/B00/XXXXXX');
  const [rules] = useState([
    { id: '1', name: 'Offshore Transfer Guard', cond: 'Amount > $50,000 AND Country == Cayman Islands', action: 'FLAG CRITICAL' },
    { id: '2', name: 'High Velocity Surge', cond: 'Velocity > 20 req/min', action: 'FLAG EVALUATING' }
  ]);

  const testWebhook = () => {
    triggerToast("Sent Test Webhook Payload to Slack/Discord endpoint!", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center space-x-2">
            <SlidersHorizontal className="h-6 w-6 text-cyan-400" />
            <span>Visual Custom Rule Builder & Webhooks</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">Configure custom fraud rules and connect real-time Slack/Discord webhook alerts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SpotlightCard className="p-6 lg:col-span-2 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span>Active Security Rules</span>
          </h3>

          <div className="space-y-3">
            {rules.map(r => (
              <div key={r.id} className="p-4 bg-slate-900/80 border border-white/10 rounded-2xl flex justify-between items-center font-mono text-xs">
                <div>
                  <p className="font-bold text-white text-sm">{r.name}</p>
                  <p className="text-xs text-cyan-400 mt-1">IF {r.cond}</p>
                </div>
                <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-bold">{r.action}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <Share2 className="h-4 w-4 text-cyan-400" />
            <span>Webhook Integrations</span>
          </h3>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">Slack / Discord Webhook URL</label>
            <input type="text" value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} className="w-full bg-[#13161A] border border-white/10 text-xs font-mono text-cyan-300 rounded-xl p-3 focus:outline-none" />

            <button onClick={testWebhook} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 cursor-pointer">
              <Send className="h-4 w-4" />
              <span>Test Webhook Payload</span>
            </button>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
