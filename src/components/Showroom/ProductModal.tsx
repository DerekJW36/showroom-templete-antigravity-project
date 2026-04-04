import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Clock, MapPin, Globe, Phone, ArrowRight } from 'lucide-react';
import ProductTabs from '../Product/ProductTabs';
import type { Product } from '../../data/products';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    return (
        <AnimatePresence>
            {product && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-obsidian border-l border-white/5 z-[70] overflow-y-auto px-12 py-24"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={32} strokeWidth={1} />
                        </button>

                        <div className="space-y-12">
                            <header className="space-y-4">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-gold">{product.id} // {product.category}</span>
                                <h2 className="text-5xl font-display italic">{product.name}</h2>
                                <p className="text-2xl text-gold">{product.price}</p>
                            </header>

                            <div className="aspect-square bg-white/5 overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>

                            <ProductTabs
                                tabs={[
                                    {
                                        id: 'description',
                                        label: 'Description',
                                        content: <p className="italic font-light text-ivory/70 leading-relaxed">"{product.description}"</p>
                                    },
                                    {
                                        id: 'specs',
                                        label: 'Specifications',
                                        content: (
                                            <ul className="space-y-3">
                                                {(product.specs ?? [
                                                    'Material: Premium Luxury Grade',
                                                    'Dimensions: Custom tailored to space',
                                                    'Handcrafted in the Aura Workshop'
                                                ]).map((s, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-xs text-ivory/60">
                                                        <span className="text-gold mt-1">—</span>
                                                        <span>{s}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    },
                                    {
                                        id: 'warranty',
                                        label: 'Warranty',
                                        content: <p className="text-xs text-ivory/60 leading-relaxed">{product.warranty ?? 'Full 10-Year Exclusive Concierge Warranty included with every purchase.'}</p>
                                    },
                                    {
                                        id: 'brand',
                                        label: 'About',
                                        content: <p className="text-xs text-ivory/60 leading-relaxed">{product.brand ?? 'Aura Collective: Shaping the future of high-ticket artifacts since 2026.'}</p>
                                    }
                                ]}
                            />

                            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                                {[
                                    { icon: Shield, label: 'Certificate of Origin', value: 'Verified' },
                                    { icon: Clock, label: 'Delivery Time', value: product.deliveryWeeks ?? '4–6 Weeks' },
                                    { icon: MapPin, label: 'Sourcing Area', value: product.sourcingArea ?? 'Global Archive' },
                                    { icon: Globe, label: 'Customization', value: product.customization ?? 'Available' }
                                ].map((detail, i) => (
                                    <div key={i} className="space-y-2">
                                        <detail.icon size={16} className="text-gold/50" />
                                        <p className="text-[10px] uppercase tracking-widest text-ivory/30">{detail.label}</p>
                                        <p className="text-xs text-ivory/80">{detail.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                {/* Risk-reversal trust signal */}
                                <div className="p-4 border border-white/10 bg-white/5 rounded-sm flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Shield size={16} className="text-gold" />
                                        <span className="text-xs text-ivory/80">14-Day Private Inspection</span>
                                    </div>
                                    <span className="text-[10px] text-ivory/40 uppercase tracking-widest">Guaranteed</span>
                                </div>

                                <button className="luxury-button w-full flex items-center justify-center gap-2">
                                    Secure Reservation <ArrowRight size={16} />
                                </button>

                                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-ivory/30">
                                    No charge until final authenticity verification.
                                </p>

                                <div className="mt-4 p-6 bg-gold/5 border border-gold/20 rounded-sm space-y-4">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold text-center">Bespoke Inquiries & Concierge</p>
                                    <button className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-obsidian font-bold text-sm tracking-widest transition-transform hover:scale-[1.02]">
                                        <Phone size={18} /> 1-800-LUX-AURA
                                    </button>
                                </div>
                                <button className="py-4 text-[10px] uppercase tracking-[0.3em] text-ivory/30 hover:text-white transition-colors">
                                    Request Private Viewing Gallery
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;
