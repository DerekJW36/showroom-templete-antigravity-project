import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Menu,
    X,
    ShoppingBag,
    ChevronDown,
    Instagram,
    Twitter,
    ShieldCheck,
    Search,
    Phone,
    MapPin
} from 'lucide-react';
import Gallery from './components/Showroom/Gallery';
import ProductModal from './components/Showroom/ProductModal';
import GlobeBackground from './components/Background/GlobeBackground';
import type { Product } from './data/products';

const TopBanner: React.FC = () => (
    <div className="top-banner tracking-widest font-bold">
        FREE SECURE GLOBAL SHIPPING &bull; 100% AUTHENTICITY GUARANTEED &bull; 1-800-LUX-AURA
    </div>
);

const SearchBar: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`search-container ${className}`}>
        <Search size={20} className="text-gold" />
        <input
            type="text"
            placeholder="Search our exclusive collection..."
            className="search-input"
        />
    </div>
);

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // GSAP Parallax — only run once the hero element is mounted
        let ctx: ReturnType<typeof gsap.context> | undefined;
        if (heroRef.current) {
            ctx = gsap.context(() => {
                gsap.to('.hero-bg', {
                    yPercent: 30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });
                gsap.to('.hero-content', {
                    yPercent: -20,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }, heroRef);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            ctx?.revert();
        };
    }, []);

    return (
        <div className="min-h-screen obsidian-gradient">
            <GlobeBackground />
            <TopBanner />
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'top-0 py-4 glass-morphism' : 'top-[36px] py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-12">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-2xl font-display tracking-widest luxury-text-gradient uppercase cursor-pointer"
                        >
                            Aura
                        </motion.h1>

                        <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-medium text-ivory/60">
                            {['Collection', 'Showroom', 'Designers', 'Concierge'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold transition-colors">{item}</a>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-8 items-center">
                        <div className="hidden md:flex items-center gap-2 text-gold font-medium tracking-widest text-[10px]">
                            <Phone size={14} /> 1-800-LUX-AURA
                        </div>
                        <button className="text-white hover:text-gold transition-colors">
                            <ShoppingBag size={20} strokeWidth={1} />
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white md:hidden"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main>
                <section ref={heroRef} className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
                    {/* Background Elements */}
                    <div className="hero-bg absolute inset-0 z-0 h-[120%] -top-[10%]">
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        {/* Globe shines through from behind App container */}
                    </div>

                    <div className="hero-content relative z-20 text-center px-6 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <h2 className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">Investment Grade Quality</h2>
                            <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
                                Acquire the World's Most <span className="italic">Coveted Artifacts</span>
                            </h1>
                            <p className="text-lg md:text-xl text-ivory/60 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
                                A private collection of investment-grade horology, design, and art. Avoid the waitlists and acquire verified masterpieces today.
                            </p>

                            <SearchBar className="mb-10" />

                            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                                <button className="luxury-button">
                                    Enter Private Showroom
                                </button>
                                <button className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-ivory/40 hover:text-white transition-colors">
                                    Schedule Concierge Call <ArrowRight size={14} />
                                </button>
                            </div>

                            <div className="mt-12 flex justify-center gap-8 items-center text-[9px] uppercase tracking-[0.2em] text-ivory/30">
                                <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-gold" /> Authenticity Verified</span>
                                <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-gold" /> Fully Insured Transit</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/20">Scroll to Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />
                    </motion.div>
                </section>

                {/* Gallery Section */}
                <Gallery onSelectItem={(p: any) => setSelectedProduct(p)} />

                {/* Feature Section Placeholder */}
                <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h3 className="text-sm uppercase tracking-widest text-gold mb-4">The Craftsmanship</h3>
                        <h2 className="text-4xl md:text-5xl mb-8 leading-snug">Immersive. Scalable. Invisible Excellence.</h2>
                        <p className="text-ivory/40 leading-relaxed mb-8">
                            Our interactive showroom uses state-of-the-art motion orchestration to deliver a browsing experience that feels as premium as the products themselves. Every transition is calculated, every pixel is purposeful.
                        </p>
                        <div className="flex items-center gap-4 text-xs font-medium">
                            <ShieldCheck className="text-gold" size={20} />
                            <span className="text-ivory/60 uppercase tracking-widest">Guaranteed Exclusivity</span>
                        </div>
                    </motion.div>

                    <div className="relative aspect-[4/5] glass-morphism overflow-hidden rounded-sm group">
                        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <img
                            src="/images/luxury_sculpture_centerpiece_1771800493274.png"
                            alt="Luxury Detail"
                            className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-[2s] group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-black/60 backdrop-blur-sm">
                            <p className="text-[10px] uppercase tracking-widest text-gold mb-2">Material Archive</p>
                            <p className="text-xs text-white/60">Sourced from the most rare minerals across the globe.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Minimalist */}
            <footer className="py-24 border-t border-white/5 bg-black">
                <div className="max-w-7xl mx-auto px-6 block md:flex justify-between items-start">
                    <div className="mb-12 md:mb-0">
                        <h2 className="text-2xl font-display text-gold mb-4">Aura</h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/30">The New Standard of Digital Showrooms</p>
                    </div>
                    <div className="flex gap-12">
                        <div className="flex flex-col gap-4 text-[10px] uppercase tracking-widest text-ivory/40">
                            <p className="text-ivory/60 mb-2">Social</p>
                            <a href="#" className="hover:text-gold">Instagram</a>
                            <a href="#" className="hover:text-gold">Catalog</a>
                        </div>
                        <div className="flex flex-col gap-4 text-[10px] uppercase tracking-widest text-ivory/40">
                            <p className="text-ivory/60 mb-2">Legal</p>
                            <a href="#" className="hover:text-gold">Privacy</a>
                            <a href="#" className="hover:text-gold">Terms</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-24 text-[9px] uppercase tracking-[0.4em] text-white/10 text-center">
                    &copy; 2026 Aura Collective. All rights reserved.
                </div>
            </footer>

            {/* Product Detail Modal */}
            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};

export default App;
