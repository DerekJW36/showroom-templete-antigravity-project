import React, { useState } from 'react';

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface ProductTabsProps {
    tabs: Tab[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="space-y-6">
            <div className="flex border-b border-white/5 overflow-x-auto hide-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="py-4">
                <div className="text-ivory/60 leading-relaxed text-sm animate-in fade-in duration-500">
                    {tabs.find((t) => t.id === activeTab)?.content}
                </div>
            </div>
        </div>
    );
};

export default ProductTabs;
