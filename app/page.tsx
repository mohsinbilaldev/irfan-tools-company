'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MapPin,
  Compass,
  Search,
  MessageSquare,
  ShoppingCart,
  Menu,
  X,
  Heart,
  Star,
  Trash2,
  Wrench,
  Zap,
  Hammer,
  Cable,
  Pipette,
  ShieldAlert,
  CheckCircle2,
  Truck,
  Building,
  ArrowRight,
  ChevronUp,
  Map,
  Clock,
  PhoneCall,
  Mail,
  User,
  Plus,
  Minus
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  badge?: string;
  image: string;
  rating: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info';
}

const PRODUCTS: Product[] = [
  {
    id: 'drill-kit',
    name: 'Industrial Cordless Drill Kit',
    price: 18500,
    category: 'Power Tools',
    badge: 'Bestseller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Lyf0aTThOURH3ApYvXaheJqKrf2UDiNIBmTH6vuju0_Vb9oAWjwtn2yiEjTAmqfMCYLC5fOx7x2wBPkM0qvI45pYyuKssBpd-BTnaRfiDgiwwdE1u6heDTJxeoeOVCEdiUGA1TifYpxv-Y6hXjgTRlVuiYTEs6FDrc0VOxll-hpZrRyxwcu1DBI_SvOAq41zd5BNK_KiTxpQX_r1jk5qtI7cdATmgMlaKjx_STrMFhJFEVCs35SokN2Ksz7rBt3FH7SY_mHCZT4',
    rating: 4.5,
    description: 'High-performance cordless impact drill with adjustable torque, battery packs, and dynamic industrial carry case.'
  },
  {
    id: 'wrench-set',
    name: '120-Piece Socket Wrench Set',
    price: 9200,
    category: 'Hand Tools',
    badge: 'New Arrival',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNuNd8q_LiCM9Vgyp3mYONl3YShbTwReuelOk0V72bb0YTqD6sEwqjmVliPGZtZ5kDeTv3iRgMHw46uDUxE2k1ugtED5z4lkIJrwGLeZ-NjJe4iwRWqvIOi1eMbynUFnM1gXhe9nm6wVW4xtGYx5oFVhap_OdRiMWY7Bff0T5YoZ7f1GoIp8-BCTs6nRWskPQx7-aiamdEyQK-fNIbzMvyyC2jNTt5lrp3b3wl17oi9ebcLp-jAiqgsbukW9uAVI9Wz_2E_h4ttGk',
    rating: 5.0,
    description: 'Heavy duty chrome-vanadium steel socket wrenches with quick release rachets configured in standard layout organizer.'
  },
  {
    id: 'welding-helmet',
    name: 'Auto-Darkening Welding Helmet',
    price: 12800,
    category: 'Safety Gear',
    badge: 'Popular',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS7PrNlK5SOlCII_xnJr6_IsMPMDAmfpRXrH_fyH0R8FGGFunNJpU0e1p4b5G8c35nY2UNGu1aT8I2WOD3utPhJr-9hFFIRKHxyeUyd2BDi5XOWjTd226EAIejhhiwLOEvANks237gCZQxdVYZymItcY01QjfJ8Vp2teMwxRiE3MzC_Rmn0u69bQg45yI6_jF9pss63O-QkjwsHmnAbGs5L9ZGCOpOEhKk7_55dHCzdZL9cwTiH2ZCfQefWLR3IULJM9SQGWjSWKc',
    rating: 4.0,
    description: 'Carbon fiber finished helmet with broad field-of-vision panel, dynamic sun sensitivity sensors, and auto-shade controls.'
  },
  {
    id: 'multimeter',
    name: 'Pro-Series Digital Multimeter',
    price: 4500,
    category: 'Electrical',
    badge: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQMTO0sBdHGb_tgjtwjItWYNpoU0L_2RAF56vCbESDNkxp9X6mKrcBQlnHTufECpMhngiL4JpcF8HXY2rFe33J9T90F0a3XNElBnkivqQSxIEYT9Tnd0ZhDtmiSXSMj0ND3ii-KEoLSUHPOorntpK8EjaO1tElF9mJF9o4_8pnAMHi8H3Ekz3UAN4tGuZnECHDy0kuvDMNFPZEcNQVCD11IXomuJ71oBZ3lu-mswHNc169zBzSO6LwBQ6TTYQMr2mIW3nHR1GfY20',
    rating: 4.5,
    description: 'Shockproof yellow jacket test meter featuring wide range indicators for current, frequency, and custom transistor outputs.'
  }
];

const CATEGORIES = [
  { 
    id: 'Hand Tools', 
    label: 'Hand Tools', 
    icon: Wrench, 
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&h=400&q=80' 
  },
  { 
    id: 'Power Tools', 
    label: 'Power Tools', 
    icon: Zap, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Lyf0aTThOURH3ApYvXaheJqKrf2UDiNIBmTH6vuju0_Vb9oAWjwtn2yiEjTAmqfMCYLC5fOx7x2wBPkM0qvI45pYyuKssBpd-BTnaRfiDgiwwdE1u6heDTJxeoeOVCEdiUGA1TifYpxv-Y6hXjgTRlVuiYTEs6FDrc0VOxll-hpZrRyxwcu1DBI_SvOAq41zd5BNK_KiTxpQX_r1jk5qtI7cdATmgMlaKjx_STrMFhJFEVCs35SokN2Ksz7rBt3FH7SY_mHCZT4' 
  },
  { 
    id: 'Hardware', 
    label: 'Hardware', 
    icon: Hammer, 
    image: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&w=400&h=400&q=80' 
  },
  { 
    id: 'Electrical', 
    label: 'Electrical', 
    icon: Cable, 
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&h=400&q=80' 
  },
  { 
    id: 'Plumbing', 
    label: 'Plumbing', 
    icon: Pipette, 
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=400&h=400&q=80' 
  },
  { 
    id: 'Safety Gear', 
    label: 'Safety Gear', 
    icon: ShieldAlert, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS7PrNlK5SOlCII_xnJr6_IsMPMDAmfpRXrH_fyH0R8FGGFunNJpU0e1p4b5G8c35nY2UNGu1aT8I2WOD3utPhJr-9hFFIRKHxyeUyd2BDi5XOWjTd226EAIejhhiwLOEvANks237gCZQxdVYZymItcY01QjfJ8Vp2teMwxRiE3MzC_Rmn0u69bQg45yI6_jF9pss63O-QkjwsHmnAbGs5L9ZGCOpOEhKk7_55dHCzdZL9cwTiH2ZCfQefWLR3IULJM9SQGWjSWKc' 
  }
];

let toastCounter = 0;
function getNextToastId(): string {
  toastCounter += 1;
  return "toast-id-" + toastCounter;
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Modals / forms state
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteType, setQuoteType] = useState('Commercial');
  const [quoteMessage, setQuoteMessage] = useState('');
  
  // Toast notifications state
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Show / hide floating buttons on scroll
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Counter states trigger when component mounts
  const [verifiedProductsCount, setVerifiedProductsCount] = useState(0);
  const [happyClientsCount, setHappyClientsCount] = useState(0);

  useEffect(() => {
    // Scroll event listener
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animating counters on load
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setVerifiedProductsCount(Math.min(Math.floor((500 / steps) * currentStep), 500));
      setHappyClientsCount(Math.min(Math.floor((1000 / steps) * currentStep), 1000));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = getNextToastId();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    addToast(`Added ${product.name} to your cart!`, 'success');
  };

  const removeFromCart = (id: string, name: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast(`Removed ${name} from your cart.`, 'info');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Filter Catalog
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) return;
    addToast(`Successfully submitted quote request for ${quoteName}!`, 'success');
    // Reset
    setQuoteName('');
    setQuotePhone('');
    setQuoteMessage('');
    setIsQuoteOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface-bg font-sans leading-relaxed selection:bg-safety-orange selection:text-white antialiased">
      {/* Toast notifications container */}
      <div className="fixed top-24 right-6 z-[120] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className="bg-industrial-navy text-white p-4 border-l-4 border-safety-orange shadow-2xl rounded-sm flex items-center gap-3 pointer-events-auto"
            >
              <CheckCircle2 className="text-safety-orange flex-shrink-0 w-5 h-5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">{toast.type === 'success' ? 'SUCCESS' : 'INFO'}</p>
                <p className="font-display font-medium text-sm mt-0.5">{toast.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top Banner / Announcement */}
      <header className="bg-industrial-navy text-white py-2 px-6 md:px-12 sticky top-0 z-50 flex flex-wrap justify-between items-center text-xs font-medium border-b border-white/10">
        <div className="flex items-center gap-6">
          <a href="tel:03319917072" className="flex items-center gap-2 hover:text-safety-orange transition-colors">
            <Phone className="w-4 h-4 text-safety-orange" />
            <span>0331 9917072</span>
          </a>
          <span className="hidden md:inline text-white/20">|</span>
          <div className="hidden md:flex items-center gap-2 text-white/80">
            <MapPin className="w-4 h-4 text-safety-orange" />
            <span>Kamran Khan Tower, Swat Mingora, Pakistan</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-1 sm:mt-0">
          <button
            onClick={() => window.open('https://www.google.com/maps?q=Kamran+Khan+Tower+Swat+Mingora', '_blank')}
            className="flex items-center gap-1.5 hover:text-safety-orange transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider"
          >
            <Compass className="w-4 h-4 text-safety-orange" />
            <span>Get Directions</span>
          </button>
        </div>
      </header>

      {/* Secondary Sticky Nav Header */}
      <nav className="bg-white sticky top-[33px] z-40 w-full shadow-sm border-b border-[#c5c6cf] transition-all">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedCategory(null)}>
            <div className="bg-industrial-navy text-white w-10 h-10 flex items-center justify-center rounded-sm group-hover:bg-safety-orange transition-standard">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-extrabold text-industrial-navy tracking-tighter leading-none">ITC</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Tools Company</span>
            </div>
          </div>

          {/* Links for desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#home" className="font-display text-sm font-semibold text-industrial-navy border-b-2 border-industrial-navy pb-1">
              Home
            </a>
            <a href="#products" className="font-display text-sm font-semibold text-gray-500 hover:text-industrial-navy transition-standard">
              Products
            </a>
            <a href="#categories" className="font-display text-sm font-semibold text-gray-500 hover:text-industrial-navy transition-standard">
              Categories
            </a>
            <a href="#about" className="font-display text-sm font-semibold text-gray-500 hover:text-industrial-navy transition-standard">
              About
            </a>
            <a href="#contact" className="font-display text-sm font-semibold text-gray-500 hover:text-industrial-navy transition-standard">
              Contact
            </a>
          </div>

          {/* Action cluster on right */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-standard text-industrial-navy cursor-pointer"
                title="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <a
                href="https://wa.me/923319917072"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:bg-green-50 text-green-600 rounded-full transition-standard cursor-pointer"
                title="WhatsApp Contact"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
              </a>

              {/* Cart trigger button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-standard text-industrial-navy relative cursor-pointer"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartTotalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-safety-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {cartTotalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Request Quote Button */}
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="hidden md:block bg-safety-orange hover:bg-industrial-navy text-white px-6 py-3 font-bold uppercase text-xs transition-standard tracking-wider"
            >
              Get Quote
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="lg:hidden p-2 text-industrial-navy"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Global Full-Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-industrial-navy/95 z-[100] flex flex-col items-center pt-24 px-6 backdrop-blur-sm"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-standard"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="w-full max-w-2xl px-4">
              <input
                autoFocus
                type="text"
                placeholder="Search tools, hardware, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/20 text-white text-3xl font-display focus:border-safety-orange focus:ring-0 placeholder:text-white/20 transition-standard py-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchOpen(false);
                    // Scroll to products
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-6">Press enter search, or select category below</p>
              
              <div className="mt-8 text-white/40 text-sm font-bold uppercase tracking-widest">Trending Categories</div>
              <div className="mt-4 flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <span
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsSearchOpen(false);
                      const el = document.getElementById('products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 border transition-standard hover:bg-white hover:text-industrial-navy cursor-pointer text-xs font-bold tracking-wider ${
                      selectedCategory === cat.id
                        ? 'border-safety-orange bg-safety-orange text-white'
                        : 'border-white/20 text-white'
                    }`}
                  >
                    {cat.label}
                  </span>
                ))}
                {selectedCategory && (
                  <span
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsSearchOpen(false);
                    }}
                    className="px-4 py-2 border border-dashed border-red-500 text-red-400 hover:bg-red-500 hover:text-white cursor-pointer text-xs font-bold tracking-wider"
                  >
                    Clear Filter
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-[850px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-[12000s] scale-110"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuALLEBRdzEmMuRh_QnRgS9JfMsVHxJ4-WCB2OusnU4Ymyp2eo93h6EgJflFsR1BYRJZ8aK4cuVknF7S06ysmne-AUGMNS_Z6qmayO4WiD0g0xm06sUgIpRKXh1i4PzFpeaJEFpqXiuEQaSsTv1zRZg4R0Y_mBsPfYtiIXaUPIzRrVkK6XZ_a261ydh7l_CbkL-8xEAAx2CtB6-RpsJrlmhuMvjaBgorW7ccoXYSSBtlNMGBBenzX1ATupovX4rIeUVjDO8dHidJWr8')`
            }}
          />
          {/* Dark moody gradient mask for corporate-industrial brand feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-navy via-industrial-navy/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 bg-safety-orange/20 border border-safety-orange/40 px-4 py-1.5 text-safety-orange font-bold text-xs uppercase tracking-widest rounded-sm">
              <span className="w-2.5 h-2.5 bg-safety-orange rounded-full animate-pulse" />
              Trusted Since 1998
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Quality Tools & <br />
              Hardware for <br />
              <span className="text-safety-orange">Every Job.</span>
            </h1>

            <div className="flex flex-wrap gap-y-3 gap-x-6 font-bold text-xs tracking-wider text-white/85 uppercase">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-safety-orange" /> Genuine Products</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-safety-orange" /> Competitive Prices</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-safety-orange" /> Expert Advice</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#products"
                className="bg-safety-orange hover:bg-white hover:text-industrial-navy text-white px-8 py-4 font-bold uppercase text-sm tracking-wider transition-standard rounded-sm text-center"
              >
                Explore Catalog
              </a>
              <a
                href="#contact"
                className="border border-white/40 hover:bg-white/10 text-white px-8 py-4 font-bold uppercase text-sm tracking-wider transition-standard rounded-sm text-center"
              >
                Contact Sales
              </a>
            </div>
          </div>

          {/* Floating Contact Card on Desktop */}
          <div className="hidden md:flex justify-end">
            <div className="glass-card p-8 max-w-sm w-full space-y-6 text-white shadow-2xl rounded-sm">
              <h3 className="font-display text-xl font-bold border-b border-white/10 pb-4 uppercase tracking-wider">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-safety-orange mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase text-white/40 font-bold block mb-0.5">Call Expert</span>
                    <a className="font-display text-lg font-bold hover:text-safety-orange transition-colors" href="tel:03319917072">
                      0331 9917072
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-safety-orange mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase text-white/40 font-bold block mb-0.5">Visit Store</span>
                    <p className="text-sm text-white/80 leading-relaxed font-sans">
                      Kamran Khan Tower, Swat Mingora, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsQuoteOpen(true)}
                className="w-full bg-white text-industrial-navy py-4 font-bold uppercase text-xs tracking-widest hover:bg-safety-orange hover:text-white transition-standard rounded-sm"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Categories Grid Section */}
      <section id="categories" className="py-20 px-6 md:px-12 bg-white border-b border-[#e4e2e1]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <p className="text-xs font-bold text-safety-orange uppercase tracking-widest mb-1">Our Specialties</p>
              <h2 className="font-display text-3xl font-extrabold text-industrial-navy uppercase">Core Categories</h2>
              <div className="w-20 h-1.5 bg-safety-orange mt-3" />
            </div>
            
            {/* View Catalog Reset Filter / Selector */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-industrial-navy hover:text-safety-orange font-bold text-sm tracking-wide flex items-center gap-2 group transition-colors uppercase"
            >
              View All Categories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : cat.id);
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group border p-6 text-center transition-standard cursor-pointer flex flex-col justify-center items-center ${
                    isSelected
                      ? 'border-safety-orange bg-[#fcf9f8] shadow-md ring-1 ring-safety-orange'
                      : 'border-[#c5c6cf] hover:border-safety-orange hover:bg-[#f6f3f2]'
                  }`}
                >
                  <div className={`relative w-full aspect-square mb-4 overflow-hidden border transition-standard rounded-sm ${
                    isSelected ? 'border-safety-orange bg-[#fcf9f8]' : 'border-[#c5c6cf] group-hover:border-safety-orange'
                  }`}>
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 768px) 50vw, 16vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {/* Visual overlay gradient */}
                    <div className={`absolute inset-0 transition-standard ${
                      isSelected ? 'bg-safety-orange/15' : 'bg-industrial-navy/5 group-hover:bg-transparent'
                    }`} />
                    
                    {/* Miniature premium category icon badge */}
                    <div className={`absolute bottom-2.5 right-2.5 w-8 h-8 flex items-center justify-center rounded-sm shadow-sm transition-standard ${
                      isSelected 
                        ? 'bg-safety-orange text-white' 
                        : 'bg-white/95 text-industrial-navy group-hover:bg-safety-orange group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-display text-xs font-bold tracking-wider uppercase text-industrial-navy whitespace-nowrap">
                    {cat.label}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Inventory / Products List */}
      <section id="products" className="py-20 px-6 md:px-12 bg-[#f6f3f2]">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold text-safety-orange uppercase tracking-widest block">Premium Hardware Catalog</span>
            <h2 className="font-display text-3xl font-extrabold text-industrial-navy uppercase">Featured Inventory</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-sans text-sm">
              Precision engineered tools from world-leading brands. Sourced directly, fully validated, and backed by expert service.
            </p>
            {selectedCategory && (
              <div className="inline-flex items-center gap-2 bg-industrial-navy text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm mt-3">
                <span>Showing: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory(null)} className="hover:text-safety-orange transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-[#c5c6cf] group hover:shadow-xl hover:border-gray-300 transition-standard flex flex-col h-full rounded-sm overflow-hidden"
              >
                {/* Product Image Area */}
                <div className="relative aspect-square overflow-hidden bg-white/80 p-4 flex items-center justify-center border-b border-gray-100">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={350}
                    height={350}
                    className="object-contain max-h-[250px] w-auto transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    priority={p.id === 'drill-kit'}
                  />

                  {/* Badge */}
                  {p.badge && (
                    <div
                      className={`absolute top-4 left-4 text-[10px] font-bold px-2 py-1 uppercase tracking-widest text-white ${
                        p.badge === 'Bestseller'
                          ? 'bg-safety-orange'
                          : p.badge === 'New Arrival'
                          ? 'bg-industrial-navy'
                          : 'bg-emerald-600'
                      }`}
                    >
                      {p.badge}
                    </div>
                  )}

                  {/* Quick Quote trigger */}
                  <button
                    onClick={() => {
                      setQuoteMessage(`I would like to receive a custom quote for: ${p.name}`);
                      setIsQuoteOpen(true);
                    }}
                    className="absolute top-4 right-4 bg-white/95 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-standard hover:bg-safety-orange hover:text-white shadow-sm border border-gray-100"
                    title="Get product quote"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Product details */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-mono">
                    {p.category}
                  </p>
                  <h4 className="font-display text-sm font-bold text-industrial-navy leading-tight mb-2 group-hover:text-safety-orange transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-normal">
                    {p.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4 border-t border-gray-100 pt-3">
                      <span className="font-mono text-lg font-bold text-industrial-navy tracking-tight">
                        ₨ {p.price.toLocaleString()}
                      </span>
                      
                      {/* Rating stars */}
                      <div className="flex items-center text-safety-orange">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const fill = i < Math.floor(p.rating);
                          return (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${fill ? 'fill-current' : 'text-gray-300'}`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-industrial-navy text-white text-xs py-3 font-bold uppercase tracking-widest hover:bg-safety-orange transition-standard cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-16 text-center bg-white border border-[#c5c6cf]">
                <p className="text-gray-400 uppercase font-bold text-xs tracking-widest mb-2 font-mono">No Products Found</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="text-safety-orange font-bold text-sm tracking-wide underline uppercase"
                >
                  Clear all search filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose ITC / Engineering Trust Section */}
      <section className="py-20 px-6 md:px-12 bg-industrial-navy text-white relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Context Stats / Brand Info */}
            <div className="space-y-8">
              <span className="text-xs font-bold text-safety-orange uppercase tracking-widest block font-mono">Precision Procurement</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Engineering Trust <br />
                In Every Tool
              </h2>
              <p className="text-white/70 text-sm max-w-xl leading-relaxed font-sans">
                {"Irfan Tools Company (ITC) is Swat's premier destination for professional grade architectural and industrial hardware. We don't just sell tools—we engineer relationships and supply high-grade durability to support every workshop, site builder, and contractor."}
              </p>

              {/* Counters */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-standard">
                  <h4 className="font-display text-4xl font-extrabold text-safety-orange mb-1">
                    {verifiedProductsCount}+
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">Verified Products</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-standard">
                  <h4 className="font-display text-4xl font-extrabold text-safety-orange mb-1">
                    {happyClientsCount}+
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">Happy Clients</p>
                </div>
              </div>
            </div>

            {/* Grid layout cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-industrial-navy">
              <div className="bg-white p-6 rounded-sm flex flex-col justify-start">
                <div className="bg-orange-50 text-safety-orange w-12 h-12 flex items-center justify-center rounded-sm mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wide mb-2">Authenticity Guaranteed</h4>
                <p className="text-gray-500 text-xs leading-normal">
                  Sourced straight from certified global manufacturers. Guaranteed original Makita, Bosch, and trusted top-tier mechanical lines.
                </p>
              </div>

              <div className="bg-white p-6 rounded-sm flex flex-col justify-start">
                <div className="bg-orange-50 text-safety-orange w-12 h-12 flex items-center justify-center rounded-sm mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wide mb-2">Fast Logistics</h4>
                <p className="text-gray-500 text-xs leading-normal">
                  Immediate dispatch to sites, workshops, and commercial outlets throughout Mingora, Swat and suburban districts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-sm flex flex-col justify-start">
                <div className="bg-orange-50 text-safety-orange w-12 h-12 flex items-center justify-center rounded-sm mb-4">
                  <User className="w-6 h-6" />
                </div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wide mb-2">Expert Consultation</h4>
                <p className="text-gray-500 text-xs leading-normal">
                  Our experienced sales and engineering professionals assist in identifying proper catalog criteria, matching task guidelines precisely.
                </p>
              </div>

              <div className="bg-white p-6 rounded-sm flex flex-col justify-start">
                <div className="bg-orange-50 text-safety-orange w-12 h-12 flex items-center justify-center rounded-sm mb-4">
                  <Building className="w-6 h-6" />
                </div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wide mb-2">Industrial Value</h4>
                <p className="text-gray-500 text-xs leading-normal">
                  High mechanical endurance matching budget bounds. We facilitate structured contractor bulk prices and custom credit flows.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Story / About Section */}
      <section id="about" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Facade image showcase */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl rounded-sm border border-gray-200">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNbCVGB28lol8oBXCegcFT3eCN_GzEcHUnoHlJYHW01Vaf5HcQklwa9Gs_sg-xWkJJlvHH1WQSQfw7QZGEIz9GwP2O_Wxg4FkXm68SuaqItXm4hlIaEi_wC0Cvd0YfFHrZa4gsKCMAAAPnmImkBx1j0dvhBXNM68G5kx4-dP73Iup42cr4hc-4eQ1o8KPb1SQ8Y1IelFTGAc72S_QzX87DMpm9-CvqWkgkXajsyrWsMOgJaAahaTumGVCLeOSHxnLTteiA6OR_bz8"
                alt="Irfan Tools Company Storefront"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 bg-safety-orange p-8 text-white hidden md:block rounded-sm shadow-xl border border-white/10">
              <p className="font-display text-4xl font-extrabold tracking-tight mb-1">25+</p>
              <p className="text-[10px] font-bold uppercase tracking-widest font-mono">Years Experience</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold text-safety-orange uppercase tracking-widest block font-mono">Establishing Benchmarks</span>
            <h2 className="font-display text-3xl font-extrabold text-industrial-navy uppercase leading-snug">
              {"Building Swat's Infrastructure"} <br />
              Since 1998
            </h2>
            <div className="w-16 h-1 bg-safety-orange" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {"Founded in the commercial capital of Mingora, Swat, Irfan Tools Company (ITC) began with a straightforward conviction: that local construction contractors and engineers deserve uncomplicated access to top-tier, certified industrial machinery."}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              {"Over the last twenty-five years, our company has evolved from a small hardware dealer to the region's preferred supply depot. We work with leading names in regional civil engineering and real estate, validating that every structure built sits on a foundation of absolute precision and tool integrity."}
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  setQuoteMessage("Hi ITC! I would love to explore your complete product catalog and physical inventory options.");
                  setIsQuoteOpen(true);
                }}
                className="border-2 border-industrial-navy text-industrial-navy hover:bg-industrial-navy hover:text-white px-8 py-4 font-bold text-xs uppercase tracking-widest transition-standard rounded-sm text-center"
              >
                Learn Our History
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-12 bg-[#f6f3f2]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 border-b border-gray-200 pb-10">
            <div>
              <span className="text-xs font-bold text-safety-orange uppercase tracking-widest block font-mono mb-1">Customer Verification</span>
              <h2 className="font-display text-3xl font-extrabold text-industrial-navy uppercase">What Professionals Say</h2>
            </div>

            {/* Total verified ratings */}
            <div className="flex items-center gap-6 bg-white p-6 border border-[#c5c6cf] rounded-sm shrink-0">
              <div className="text-center">
                <p className="font-mono text-4xl font-extrabold text-industrial-navy leading-none">5.0</p>
                <div className="flex text-safety-orange mt-2 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <div className="h-12 w-[1px] bg-gray-300" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">VERIFIED STORE</p>
                <p className="text-xs font-extrabold text-industrial-navy uppercase mt-0.5 leading-none">RATINGS</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 border-l-4 border-safety-orange shadow-sm rounded-sm">
              <div className="flex text-safety-orange mb-6 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-base font-medium text-industrial-navy mb-8 italic leading-relaxed">
                {"\"ITC is the only storefront in Mingora where our engineering teams can consistently secure authentic Bosch parts and original Makita hardware. Their mechanical insights are profound, and they salvaged our project pipeline timeline twice this season.\""}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-industrial-navy flex items-center justify-center text-white font-bold font-display uppercase">
                  MK
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-industrial-navy uppercase leading-none mb-1">Muhammad Khan</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-mono">Structural Engineer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 border-l-4 border-safety-orange shadow-sm rounded-sm">
              <div className="flex text-safety-orange mb-6 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-base font-medium text-industrial-navy mb-8 italic leading-relaxed">
                {"\"Superior customer resolution and absolute price transparency. They coordinated a bulky commercial supply shipment of safety kits and specialized multimeters to our regional layout area in two hours. Outstanding local provider.\""}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-industrial-navy flex items-center justify-center text-white font-bold font-display uppercase">
                  ZA
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-industrial-navy uppercase leading-none mb-1">Zeeshan Ahmed</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-mono">Lead Contractor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Store Location details */}
      <section id="contact" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Real Interactive Iframe Map (instead of mockup) */}
            <div className="lg:col-span-8 min-h-[450px] relative rounded-sm overflow-hidden border border-gray-200">
              <iframe
                title="Google Map location of Irfan Tools Company - Kamran Khan Tower Mingora"
                src="https://maps.google.com/maps?q=Kamran%20Khan%20Tower,%20Mingora%20Swat,%20Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[450px] border-0"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            {/* Store details panel */}
            <div className="lg:col-span-4 bg-industrial-navy p-8 md:p-10 text-white space-y-8 flex flex-col justify-center rounded-sm">
              <div>
                <span className="text-xs font-bold text-safety-orange uppercase tracking-widest block font-mono">Physical Office</span>
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-wide border-b border-white/15 pb-4 mt-1">Store Location</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80 leading-relaxed font-sans">
                    Kamran Khan Tower, Ground Floor, 19130 Swat Mingora, Khyber Pakhtunkhwa, Pakistan
                  </p>
                </div>

                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wider">Mon - Sat: 08:00 - 19:00</p>
                    <p className="text-xs text-white/50 font-mono mt-0.5">Sunday: Closed / Emergency On-Call Only</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-white/40 block font-bold font-mono uppercase">Direct Sales Dial</span>
                    <a className="font-display font-bold hover:text-safety-orange transition-colors text-base" href="tel:03319917072">
                      0331 9917072
                    </a>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.open('https://www.google.com/maps?q=Kamran+Khan+Tower+Swat+Mingora', '_blank')}
                className="w-full py-4 bg-white text-industrial-navy font-bold uppercase text-xs tracking-widest hover:bg-safety-orange hover:text-white transition-standard rounded-sm cursor-pointer"
              >
                Get Precise Directions
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Quick CTA Block */}
      <section className="bg-safety-orange py-16 text-white text-center">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight max-w-3xl mx-auto mb-8">
            Need a Bulk Price Quotation for your Next Project?
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="tel:03319917072"
              className="w-full sm:w-auto bg-industrial-navy text-white hover:bg-white hover:text-industrial-navy px-8 py-4 font-bold uppercase text-xs tracking-widest transition-standard flex items-center justify-center gap-2 rounded-sm"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Call Now</span>
            </a>
            
            <button
              onClick={() => {
                setQuoteMessage("Please send me the commercial wholesale price list.");
                setIsQuoteOpen(true);
              }}
              className="w-full sm:w-auto bg-white text-industrial-navy hover:bg-industrial-navy hover:text-white px-8 py-4 font-bold uppercase text-xs tracking-widest transition-standard rounded-sm cursor-pointer"
            >
              Request Price List
            </button>
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer className="bg-[#0e1726] text-white pt-20 pb-8 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Branding detail */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white text-industrial-navy w-10 h-10 flex items-center justify-center rounded-sm">
                  <Wrench className="w-5 h-5 text-industrial-navy" />
                </div>
                <span className="font-display text-2xl font-extrabold tracking-tight">ITC TOOLS</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed max-w-xs font-sans">
                {"Swat's premier commercial depot for industrial grade tools, power equipment, and elite safety systems since 1998. Supplying reliability for structural developers."}
              </p>
              
              <div className="flex gap-4">
                <a
                  href="https://wa.me/923319917072"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-safety-orange hover:border-safety-orange transition-standard rounded-sm text-white/60 hover:text-white"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href="tel:03319917072"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-safety-orange hover:border-safety-orange transition-standard rounded-sm text-white/60 hover:text-white"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Products link lists */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-3">Products</h4>
              <ul className="space-y-3.5 text-white/50 text-xs font-medium font-sans">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        const el = document.getElementById('products');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-safety-orange transition-colors text-left"
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick action links */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-3">Quick Links</h4>
              <ul className="space-y-3.5 text-white/50 text-xs font-medium font-sans">
                <li>
                  <a href="#about" className="hover:text-safety-orange transition-colors">About Company</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-safety-orange transition-colors">Store Locator</a>
                </li>
                <li>
                  <button onClick={() => { setIsQuoteOpen(true); }} className="hover:text-safety-orange transition-colors text-left">
                    Bulk Quote Program
                  </button>
                </li>
                <li>
                  <button onClick={() => addToast("Compliance checklist copy has been mailed to your IP.", "info")} className="hover:text-safety-orange transition-colors text-left">
                    Safety Compliance Certifications
                  </button>
                </li>
                <li>
                  <button onClick={() => addToast("Our privacy specifications align strictly with regional hardware laws.", "info")} className="hover:text-safety-orange transition-colors text-left">
                    Privacy Protection Guidelines
                  </button>
                </li>
              </ul>
            </div>

            {/* Working times */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-3">Business Hours</h4>
              <div className="space-y-3 text-white/50 text-xs font-sans">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span className="font-mono text-white/80">08:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-mono text-white/80">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between text-safety-orange font-bold">
                  <span>Sunday:</span>
                  <span>CLOSED</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 text-center text-white/30 text-[9px] font-bold uppercase tracking-[0.3em]">
            © 2024 Irfan Tools Company (ITC). All Rights Reserved. Designed for Professionals.
          </div>
        </div>
      </footer>

      {/* Persistent Floating Back To Top & WhatsApp Widget */}
      <div className="fixed bottom-8 right-8 z-[90] flex flex-col gap-3">
        {/* Scroll back up widget */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 bg-industrial-navy text-white hover:bg-safety-orange flex items-center justify-center rounded-sm transition-standard shadow-2xl cursor-pointer border border-white/10"
              title="Back to Top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Float Widget */}
        <a
          href="https://wa.me/923319917072"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-brand-green text-white flex items-center justify-center rounded-full shadow-2xl hover:scale-105 transition-transform relative group"
          title="Contact via WhatsApp"
        >
          <span className="absolute inset-0 bg-brand-green rounded-full animate-ping opacity-25" />
          <MessageSquare className="w-6 h-6 fill-current text-white relative z-10" />
        </a>
      </div>

      {/* Slider / Cart Drawer overlay menu */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-[105]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-industrial-navy text-white">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-safety-orange" />
                  <h3 className="font-display font-bold uppercase tracking-wider text-base">Your Shopping Cart</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items scroll */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 space-y-4 flex flex-col items-center">
                    <ShoppingCart className="w-16 h-16 opacity-10 text-industrial-navy animate-pulse" />
                    <div>
                      <p className="font-display text-sm font-bold uppercase tracking-wider text-industrial-navy">Your cart is empty</p>
                      <p className="text-xs text-gray-400 mt-1 font-sans">Add certified tools from our catalog to get started</p>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-3 border-b border-gray-100"
                    >
                      {/* Thumbnail photo */}
                      <div className="w-16 h-16 bg-gray-50 rounded-sm relative shrink-0 p-1 flex items-center justify-center border border-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="object-contain max-h-14"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Content column */}
                      <div className="flex-grow min-w-0">
                        <h4 className="font-display text-xs font-bold text-industrial-navy uppercase truncate">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-safety-orange font-mono font-bold tracking-wider mt-0.5 uppercase">
                          ₨ {item.price.toLocaleString()}
                        </p>

                        {/* Quantity management */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-industrial-navy w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.name)}
                        className="text-gray-400 hover:text-red-500 transition-colors self-center p-2"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer footer summary */}
              <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50">
                <div className="flex justify-between font-display text-lg font-bold text-industrial-navy">
                  <span>Subtotal:</span>
                  <span className="font-mono text-safety-orange">₨ {cartSubtotal.toLocaleString()}</span>
                </div>
                
                <button
                  disabled={cart.length === 0}
                  onClick={() => {
                    addToast("Order checkout successfully configured. Sending to sales manager...", "success");
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className={`w-full text-xs py-4 font-bold uppercase tracking-widest text-center transition-standard ${
                    cart.length === 0
                      ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                      : 'bg-industrial-navy text-white hover:bg-safety-orange cursor-pointer'
                  }`}
                >
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quote / Price Sheet request popup modal */}
      <AnimatePresence>
        {isQuoteOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteOpen(false)}
              className="fixed inset-0 bg-black/60 z-[115] backdrop-blur-sm"
            />

            {/* Card modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-white shadow-2xl z-[120] rounded-sm overflow-hidden flex flex-col px-4 sm:px-0"
            >
              <div className="p-6 bg-industrial-navy text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-safety-orange" />
                  <h3 className="font-display font-medium text-lg uppercase tracking-wider">Request Bulk Price Quote</h3>
                </div>
                <button
                  onClick={() => setIsQuoteOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="p-6 sm:p-8 space-y-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full border border-[#c5c6cf] focus:border-safety-orange focus:ring-0 rounded-none h-12 px-4 text-sm focus:outline-none transition-standard"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mb-2">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      placeholder="e.g. 0331 9917072"
                      className="w-full border border-[#c5c6cf] focus:border-safety-orange focus:ring-0 rounded-none h-12 px-4 text-sm focus:outline-none transition-standard"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mb-2">
                      Project Type
                    </label>
                    <select
                      value={quoteType}
                      onChange={(e) => setQuoteType(e.target.value)}
                      className="w-full border border-[#c5c6cf] focus:border-safety-orange focus:ring-0 rounded-none h-12 px-3 text-sm focus:outline-none bg-white transition-standard"
                    >
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>Residential</option>
                      <option>Personal Workshop</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mb-2">
                    Message / Special Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={quoteMessage}
                    onChange={(e) => setQuoteMessage(e.target.value)}
                    placeholder="Describe your bulk requirements, sizes, specific brands (Bosch, Makita) and desired timeline..."
                    className="w-full border border-[#c5c6cf] focus:border-safety-orange focus:ring-0 rounded-none p-4 text-sm focus:outline-none transition-standard"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-safety-orange text-white text-xs py-4 font-bold uppercase tracking-widest hover:bg-industrial-navy transition-standard cursor-pointer"
                >
                  Submit Quote Request
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
