import React from 'react';
import { Sparkles, Droplets, Building2, Truck, BarChart3, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeatureGrid: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="py-20 bg-[#0B1220] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
            Intelligent Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight font-heading [text-wrap:balance]">
            Engineered for Industrial Compliance & Sustainable Circularity
          </h2>
          <p className="text-sm sm:text-base text-[#A7B4C5] leading-relaxed">
            Waste2Worth brings together cutting-edge AI screening, laboratory assay verification, and multi-facility logistics coordination into one cohesive operational cockpit.
          </p>
        </div>

        {/* Feature Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1: AI-Assisted Waste Classification */}
          <div className="rounded-2xl bg-[#162437] border border-[#29394D] overflow-hidden flex flex-col justify-between hover:border-[#22C55E]/50 transition-colors group">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#101C2C] relative">
              <img
                src="/src/assets/images/environmental_specialist_1790654315172.jpg"
                alt="Environmental engineer inspecting automated classification metrics"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162437] via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#06B6D4] mb-2">
                  <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                  <span>AI SPECIFICATION SCREENER</span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] font-heading mb-2">
                  Intelligent Waste Stream Classification
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C5] leading-relaxed">
                  Evaluates submitted physical state, chemical composition, and process origin. Identifies missing laboratory parameters, flags unknown chemical risks, and suggests ASTM/EPA assay testing.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('ai-lab')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#22C55E] hover:text-[#06B6D4] transition-colors cursor-pointer text-left"
              >
                <span>Launch Classification Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Water Pollution Risk Assessment */}
          <div className="rounded-2xl bg-[#162437] border border-[#29394D] overflow-hidden flex flex-col justify-between hover:border-[#06B6D4]/50 transition-colors group">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#101C2C] relative">
              <img
                src="/src/assets/images/water_purification_plant_1790654303778.jpg"
                alt="Modern industrial wastewater treatment plant and clarifiers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162437] via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#06B6D4] mb-2">
                  <Droplets className="w-4 h-4 text-[#06B6D4]" />
                  <span>WATERSHED DEFENSE ENGINE</span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] font-heading mb-2">
                  Water Pollution Risk Assessment
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C5] leading-relaxed">
                  Computes acute screening risk from pH, COD, BOD, TSS, heavy metals, and proximity to natural water bodies. Restricts non-compliant discharge and routes effluent to Zero Liquid Discharge facilities.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('water-risk')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#06B6D4] hover:text-[#22C55E] transition-colors cursor-pointer text-left"
              >
                <span>Run Water Risk Screener</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Material Recovery & Secondary Marketplace */}
          <div className="rounded-2xl bg-[#162437] border border-[#29394D] overflow-hidden flex flex-col justify-between hover:border-[#14B8A6]/50 transition-colors group">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#101C2C] relative">
              <img
                src="/src/assets/images/material_recovery_granules_1790654293117.jpg"
                alt="Sorted recycled polymer pellets and clean copper metal scrap"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162437] via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#14B8A6] mb-2">
                  <BarChart3 className="w-4 h-4 text-[#14B8A6]" />
                  <span>CIRCULAR FEEDSTOCK EXCHANGE</span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] font-heading mb-2">
                  Material Recovery & Secondary Exchange
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C5] leading-relaxed">
                  Search verified non-hazardous industrial recyclables—including sorted engineering plastics, scrap alloys, and baled fibers. Protect sensitive facility addresses while negotiating batch transfers.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('exchange')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#14B8A6] hover:text-[#22C55E] transition-colors cursor-pointer text-left"
              >
                <span>Browse Waste Exchange</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Supporting Banner on Chain of Custody */}
        <div className="p-6 rounded-2xl bg-[#101C2C] border border-[#29394D] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#22C55E]">
              <Truck className="w-4 h-4" />
              <span>Full Manifest Lifecycle Tracking</span>
            </div>
            <h4 className="text-base font-bold text-[#F8FAFC] font-heading">
              11-Stage Digital Custody Timeline
            </h4>
            <p className="text-xs text-[#A7B4C5] leading-relaxed">
              Track waste from registration, compliance review, and carrier dispatch, through facility gate intake, neutralization, and final verified recycled outcome documentation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3">
            <button
              onClick={() => setActiveTab('lifecycle')}
              className="px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#162437] hover:bg-[#0B1220] border border-[#29394D] rounded-xl transition-all"
            >
              Inspect Active Manifest
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className="px-4 py-2.5 text-xs font-semibold text-[#0B1220] bg-[#22C55E] hover:brightness-110 rounded-xl transition-all"
            >
              Generate ESG Impact Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
