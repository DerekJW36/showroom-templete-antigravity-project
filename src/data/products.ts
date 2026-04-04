import img01 from '../assets/images/01.png';
import img02 from '../assets/images/02.png';
import img03 from '../assets/images/03.png';
import img04 from '../assets/images/04.png';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    description: string;
    specs?: string[];
    warranty?: string;
    brand?: string;
    deliveryWeeks?: string;
    sourcingArea?: string;
    customization?: string;
}

const PRODUCTS: Product[] = [
    {
        id: '01',
        name: 'Obsidian Horizon',
        category: 'Sculptural Furniture',
        price: '$12,500',
        image: img01,
        description: 'A seamless monolith carved from volcanic glass, designed to command the atmosphere of any modern gallery space.',
        specs: [
            'Material: Volcanic obsidian glass composite',
            'Dimensions: 220cm x 85cm x 95cm',
            'Weight: 180 kg — white-glove delivery included',
            'Handcrafted in the Aura Workshop, Kyoto'
        ],
        warranty: 'Lifetime structural guarantee with annual concierge maintenance.',
        brand: 'Aura x Studio Nakamura — a limited collaboration of 12 pieces worldwide.',
        deliveryWeeks: '6-8 Weeks',
        sourcingArea: 'Kyoto, Japan',
        customization: 'Available'
    },
    {
        id: '02',
        name: 'Ether Chronograph',
        category: 'Horology',
        price: '$45,000',
        image: img02,
        description: 'Precision engineering meets abstract minimalism. Hand-assembled with 144 components of rare platinum alloy.',
        specs: [
            'Movement: In-house calibre AG-02, 72hr power reserve',
            'Case: 40mm platinum Pt950, 11.4mm thick',
            'Crystal: Sapphire, anti-reflective both sides',
            'Water resistance: 100m'
        ],
        warranty: 'Full 5-year manufacturer warranty. Lifetime servicing at Aura Atelier.',
        brand: 'Aura Horology — Geneva, est. 2018. Each piece individually numbered.',
        deliveryWeeks: '4-6 Weeks',
        sourcingArea: 'Geneva, Switzerland',
        customization: 'Dial colour and strap on request'
    },
    {
        id: '03',
        name: 'Lumina Sphere',
        category: 'Ambient Lighting',
        price: '$8,200',
        image: img03,
        description: 'A floating orb of warm gold light, utilizing magnetic levitation to create a centerpiece of serene transcendence.',
        specs: [
            'Levitation height: 25mm plus or minus 3mm',
            'Light source: 2700K warm LED, CRI 98',
            'Base: Solid brass with matte black finish',
            'Power: Wireless induction — no visible cables'
        ],
        warranty: '3-year full warranty on levitation system. Bulb lifetime: 50,000 hrs.',
        brand: 'Aura Lighting x Murano Glass Studio — handblown in Venice.',
        deliveryWeeks: '3-5 Weeks',
        sourcingArea: 'Venice, Italy',
        customization: 'Glass colour and diameter available'
    },
    {
        id: '04',
        name: 'Apex Grandeur',
        category: 'Investment Vessels',
        price: '$150,000',
        image: img04,
        description: 'An aerodynamically perfect form, hand-finished in brushed bronze and titanium. One of six in existence.',
        specs: [
            'Body: Grade 5 titanium with hand-applied bronze patina',
            'Capacity: 6 litres',
            'Edition: 1 of 6 — certificate of authenticity included',
            'Display plinth: Rotisserie motor, solid walnut'
        ],
        warranty: 'Certified by independent appraisers. Buyback programme at 90% of purchase price.',
        brand: 'Aura Artefacts — investment-grade collectibles since 2020.',
        deliveryWeeks: '8-12 Weeks',
        sourcingArea: 'London, UK',
        customization: 'Engraving available'
    }
];

export default PRODUCTS;
