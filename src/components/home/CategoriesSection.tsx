import React, { useState } from 'react';
import { WasteCategory } from '../../types';
import { 
  Layers, 
  Wrench, 
  Package, 
  Scissors, 
  Leaf, 
  Droplet, 
  FlaskConical, 
  Mountain, 
  Cpu, 
  Boxes,
  ArrowRight,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CategoryMeta {
  title: WasteCategory;
  icon: React.ReactNode;
  typicalStreams: string;
  recoveryPathway: string;
  hazardRisk: 'Low' | 'Moderate' | 'High (Requires HazMat Authorization)';
  activeSampleListings: number;
}

export const CategoriesSection: React.FC = () => {
  const { setActiveTab } = useApp();

  const categories: CategoryMeta[] = [
    {
      title: 'Plastic and Polymer Waste',
      icon: <Layers className="w-5 h-5 text-[#22C55E]" />,
      typicalStreams: 'PP runners, HDPE drums, PET preforms, ABS casing scrap',
      recoveryPathway: 'Mechanical flaking, hot de-inking, compounding into FDA/industrial resin pellets',
      hazardRisk: 'Low',
      activeSampleListings: 14
    },
    {
      title: 'Metal Scrap',
      icon: <Wrench className="w-5 h-5 text-[#06B6D4]" />,
      typicalStreams: '6061 Aluminum turnings, copper busbars, tool steel punchouts, swarf',
      recoveryPathway: 'Centrifugal chip de-oiling, briquetting, electric arc secondary remelt',
      hazardRisk: 'Low',
      activeSampleListings: 22
    },
    {
      title: 'Paper and Packaging',
      icon: <Package className="w-5 h-5 text-amber-400" />,
      typicalStreams: 'OCC corrugated clippings, kraft poly-coated liners, core tubes',
      recoveryPathway: 'Hydrapulping, mechanical fractionation, molded fiber trays',
      hazardRisk: 'Low',
      activeSampleListings: 9
    },
    {
      title: 'Textile Waste',
      icon: <Scissors className="w-5 h-5 text-purple-400" />,
      typicalStreams: 'Weaving selvedge, polyester non-woven trimmings, yarn bobbins',
      recoveryPathway: 'Mechanical garnetting, thermal acoustic insulation matting',
      hazardRisk: 'Low',
      activeSampleListings: 7
    },
    {
      title: 'Organic / Biodegradable Waste',
      icon: <Leaf className="w-5 h-5 text-emerald-400" />,
      typicalStreams: 'Food processing byproducts, spent grain, starch residues, cellulosic fines',
      recoveryPathway: 'Industrial anaerobic digestion, biogas biomethane, organic compost',
      hazardRisk: 'Moderate',
      activeSampleListings: 5
    },
    {
      title: 'Industrial Wastewater',
      icon: <Droplet className="w-5 h-5 text-[#06B6D4]" />,
      typicalStreams: 'Plating rinse baths, anodizing wash water, coolant emulsions, boiler blowdown',
      recoveryPathway: 'Electrocoagulation, Fenton oxidation, MBR, RO Zero Liquid Discharge (ZLD)',
      hazardRisk: 'High (Requires HazMat Authorization)',
      activeSampleListings: 18
    },
    {
      title: 'Chemical Waste',
      icon: <FlaskConical className="w-5 h-5 text-rose-400" />,
      typicalStreams: 'Spent solvents, etching acids, spent catalysts, pigment slurries',
      recoveryPathway: 'Fractional solvent distillation, catalytic oxidation, high-temp destruction',
      hazardRisk: 'High (Requires HazMat Authorization)',
      activeSampleListings: 11
    },
    {
      title: 'Industrial Sludge',
      icon: <Mountain className="w-5 h-5 text-yellow-600" />,
      typicalStreams: 'ETP clarifier cake, galvanizing sludge, lime softening precipitated cake',
      recoveryPathway: 'Thermal filter-press drying, cement kiln co-processing, metal vitrification',
      hazardRisk: 'High (Requires HazMat Authorization)',
      activeSampleListings: 8
    },
    {
      title: 'E-Waste',
      icon: <Cpu className="w-5 h-5 text-cyan-300" />,
      typicalStreams: 'Defective circuit boards (PCBs), cable cutoffs, electrical motor armatures',
      recoveryPathway: 'Pyrometallurgical precious metal recovery (Au, Ag, Cu), solder extraction',
      hazardRisk: 'Moderate',
      activeSampleListings: 6
    },
    {
      title: 'Other Industrial By-Products',
      icon: <Boxes className="w-5 h-5 text-slate-400" />,
      typicalStreams: 'Foundry silica sand, coal fly ash, ceramic tile cullet, spent abrasives',
      recoveryPathway: 'Green concrete admixture, pozzolanic binder replacement, asphalt filler',
      hazardRisk: 'Moderate',
      activeSampleListings: 12
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<CategoryMeta>(categories[0]);

  return (
    <section className="py-20 bg-[#101C2C] border-t border-[#29394D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
            Standard Industrial Streams
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight font-heading [text-wrap:balance]">
            Industrial Waste Categories & Circular Pathways
          </h2>
          <p className="text-sm sm:text-base text-[#A7B4C5] leading-relaxed">
            Waste2Worth categorizes industrial outputs into 10 structured domains, enforcing chemical safety boundaries while maximizing resource reclamation.
          </p>
        </div>

        {/* 2-Column: Category Grid + Detailed Stream Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Category Selection Tiles */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((cat, idx) => {
              const isSelected = selectedCategory.title === cat.title;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-4 rounded-xl text-left transition-all border cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#162437] border-[#22C55E] text-[#F8FAFC] shadow-md ring-1 ring-[#22C55E]/40'
                      : 'bg-[#0B1220] border-[#29394D] text-[#A7B4C5] hover:border-[#14B8A6]/40 hover:text-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#0B1220]' : 'bg-[#162437]'}`}>
                      {cat.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{cat.title}</div>
                      <div className="text-[11px] font-mono text-[#A7B4C5]/80">
                        {cat.activeSampleListings} demo batches
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#22C55E]' : 'text-transparent'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Inspector Box */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#162437] border border-[#29394D] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#29394D]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0B1220] border border-[#29394D]">
                  {selectedCategory.icon}
                </div>
                <div>
                  <div className="text-xs font-mono text-[#22C55E] uppercase tracking-wider">Stream Dossier</div>
                  <h3 className="text-lg font-bold text-[#F8FAFC] font-heading">{selectedCategory.title}</h3>
                </div>
              </div>
            </div>

            {/* Typical Streams */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-[#A7B4C5] uppercase tracking-wider">Typical Factory Outputs:</div>
              <div className="text-sm text-[#F8FAFC] bg-[#0B1220] p-3 rounded-lg border border-[#29394D]/60 leading-relaxed">
                {selectedCategory.typicalStreams}
              </div>
            </div>

            {/* Recovery Pathway */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-[#A7B4C5] uppercase tracking-wider">Authorized Circular Pathway:</div>
              <div className="text-sm text-[#22C55E] bg-[#0B1220] p-3 rounded-lg border border-[#29394D]/60 leading-relaxed font-medium">
                {selectedCategory.recoveryPathway}
              </div>
            </div>

            {/* Safety & Hazard Profile */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-[#A7B4C5] uppercase tracking-wider">Hazard & Water Risk Classification:</div>
              <div className={`text-xs p-3 rounded-lg border leading-relaxed flex items-start gap-2.5 ${
                selectedCategory.hazardRisk.includes('High')
                  ? 'bg-rose-950/30 border-rose-800/60 text-rose-300'
                  : selectedCategory.hazardRisk.includes('Moderate')
                  ? 'bg-amber-950/30 border-amber-800/60 text-amber-300'
                  : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
              }`}>
                {selectedCategory.hazardRisk.includes('High') ? (
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                )}
                <div>
                  <strong>{selectedCategory.hazardRisk}</strong>
                  <div className="mt-1 text-[11px] opacity-90">
                    {selectedCategory.hazardRisk.includes('High') 
                      ? 'Requires DOT HazMat transport, uniform e-manifest, and certified treatment facility permit before transfer.'
                      : 'Eligible for direct secondary material exchange subject to buyer material spec verification.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setActiveTab('exchange')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#14B8A6] text-[#0B1220] font-semibold text-xs tracking-wide uppercase hover:brightness-110 active:brightness-95 transition-all text-center"
            >
              Browse Active {selectedCategory.title} Listings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
