import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PRODUCTS from '../../data/products';
import type { Product } from '../../data/products';

export type { Product };

const Gallery: React.FC<{ onSelectItem: (p: Product) => void }> = ({ onSelectItem }) => {
    return (
        <section id="showroom" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-xl">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-sm uppercase tracking-[0.4em] text-gold mb-4"
                    >
                        Curated Collection
                    </motion.h3>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-5xl leading-tight font-display italic"
                    >
                        Select artifacts from the <span className="not-italic">Aura Archive</span>
                    </motion.h2>
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/30 pb-2 border-b border-ivory/10">
                    Showing {String(PRODUCTS.length).padStart(2, '0')} of 42 Items
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {PRODUCTS.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className="group flex flex-col sm:flex-row gap-8 items-center cursor-pointer p-6 glass-morphism hover:border-gold/30 transition-colors"
                        onClick={() => onSelectItem(product)}
                    >
                        {/* Image */}
                        <div className="relative w-full sm:w-1/2 aspect-square overflow-hidden bg-ivory/5 flex-shrink-0">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                            />
                            <div className="absolute top-4 left-4 text-[10px] font-bold text-white/40 group-hover:text-gold transition-colors">
                                {product.id}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="w-full sm:w-1/2 space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-lg uppercase tracking-widest group-hover:text-gold transition-colors font-display italic">{product.name}</h4>
                                    <ArrowUpRight size={16} className="text-gold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0" />
                                </div>
                                <p className="text-[10px] text-ivory/30 uppercase tracking-widest">{product.category}</p>
                            </div>

                            <p className="text-xs text-ivory/40 leading-relaxed line-clamp-3 italic">
                                "{product.description}"
                            </p>

                            <div className="pt-4 border-t border-white/5">
                                <p className="text-sm font-medium text-gold">{product.price}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
