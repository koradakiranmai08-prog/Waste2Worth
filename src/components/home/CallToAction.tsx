import React from 'react';
import { ArrowRight, Factory, Recycle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CallToAction: React.FC = () => {
  const { setIsRegisterModalOpen, switchRole, setActiveTab } = useApp();

  return (
    <section className="py-20 bg-gradient-to-b from-[#0B1220] to-[#101C2C] relative overflow-hidden border-t border-[#29394D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#162437] via-[#101C2C] to-[#0B1220] border border-[#29394D] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle gradient glow */}
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#22C55E]/10 via-[#06B6D4]/10 to-transparent blur-2xl rounded-full pointer-events-none" 
          />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Industrial Ecology Network</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight font-heading leading-tight [text-wrap:balance]">
              Ready to Turn Industrial Waste into Circular Value?
            </h2>

            <p className="text-base sm:text-lg text-[#A7B4C5] leading-relaxed">
              Join leading chemical manufacturers, automotive fabricators, plastic recyclers, and effluent treatment operators already coordinating on Waste2Worth. Prevent water contamination, reduce regulatory risks, and monetize recovered resources.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0B1220] bg-gradient-to-r from-[#22C55E] to-[#14B8A6] hover:brightness-110 active:brightness-95 rounded-xl shadow-lg shadow-[#22C55E]/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Factory className="w-4 h-4" />
                <span>Register Industrial Waste</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  switchRole('recycler');
                  setActiveTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] bg-[#162437] hover:bg-[#101C2C] border border-[#29394D] hover:border-[#22C55E]/60 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <Recycle className="w-4 h-4 text-[#22C55E]" />
                <span>Join as Certified Recycler</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
