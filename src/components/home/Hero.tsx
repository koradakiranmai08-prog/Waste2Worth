import React from 'react';
import { ArrowRight, ShieldCheck, Droplet, Recycle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Hero: React.FC = () => {
  const { setIsRegisterModalOpen, setActiveTab } = useApp();

  return (
    <section className="relative overflow-hidden bg-[#0B1220] pt-8 pb-20 lg:pt-16 lg:pb-28">
      {/* Background ambient lighting accents */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#22C55E]/15 via-[#06B6D4]/10 to-transparent blur-3xl rounded-full" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Mission, Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Contextual unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#22C55E] tracking-wide uppercase">
              <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>Industrial Circular Logistics & Watershed Defense</span>
              <span aria-hidden="true" className="text-[#29394D]">·</span>
              <span className="text-[#06B6D4] lowercase">verified facilities only</span>
            </div>

            {/* Main Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] tracking-tight font-heading leading-[1.12] [text-wrap:balance]">
              Turn Industrial Waste into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#14B8A6] to-[#06B6D4]">Valuable Resources.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#A7B4C5] leading-relaxed max-w-2xl font-normal">
              Waste2Worth connects industrial manufacturing facilities with certified recyclers, licensed treatment plants, and circular material reclaimers. Prevent improper industrial disposal, shield waterways from toxic contamination, and turn byproducts into industrial feedstock.
            </p>

            {/* Action Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0B1220] bg-gradient-to-r from-[#22C55E] to-[#14B8A6] hover:brightness-110 active:brightness-95 rounded-xl shadow-lg shadow-[#22C55E]/15 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Register Your Waste</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('exchange');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] bg-[#162437] hover:bg-[#101C2C] border border-[#29394D] hover:border-[#14B8A6]/60 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore the Platform</span>
              </button>
            </div>

            {/* Value affirmations */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#29394D]/60 text-xs text-[#A7B4C5]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Authorized Facilities Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>Water Risk Screening</span>
              </div>
              <div className="flex items-center gap-2">
                <Recycle className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <span>End-to-End Custody Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#29394D] bg-[#162437] shadow-2xl group">
              {/* Generated Hero Asset */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#101C2C] relative">
                <img
                  src="/src/assets/images/hero_industrial_facility_1790654278880.jpg"
                  alt="Modern sustainable eco-industrial water reclamation and recycling facility"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback container in case of asset issue
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-[#101C2C]', 'to-[#162437]');
                    }
                  }}
                />
                {/* Subtle dark vignette scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-80" />
              </div>

              {/* Foreground interactive card highlight */}
              <div className="p-5 bg-[#162437]/90 backdrop-blur-sm border-t border-[#29394D]">
                <div className="flex items-center justify-between text-xs text-[#A7B4C5] mb-2">
                  <span className="font-semibold text-[#F8FAFC]">Active Closed-Loop Dispatch</span>
                  <span className="font-mono text-[#22C55E]">DEMO STREAM #9941</span>
                </div>
                <div className="text-sm font-semibold text-[#F8FAFC] mb-1">
                  12,000 L Acidic Effluent ➔ Pure Water & Al(OH)₃ Cake
                </div>
                <div className="text-xs text-[#A7B4C5] flex items-center justify-between pt-2">
                  <span>Routing: Detroit Fab ➔ AquaClear Great Lakes</span>
                  <span className="text-[#06B6D4] font-medium">98.4% Diverted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
