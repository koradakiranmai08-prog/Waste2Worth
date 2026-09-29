import React from 'react';
import { AlertOctagon, CheckCircle2, Droplets, Flame, Skull, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProblemSolution: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="py-20 bg-[#F4F8F6] text-[#122033] border-y border-[#29394D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">
            Critical Environmental Context
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#122033] tracking-tight font-heading [text-wrap:balance]">
            The Industrial Waste & Water Pollution Crisis
          </h2>
          <p className="text-base text-[#475569] leading-relaxed">
            Over 300 million metric tons of industrial byproducts are produced annually. Without organized transparent matchmaking and early risk screening, toxic residues, heavy metals, and uncontrolled effluents frequently contaminate municipal water basins and underground aquifers.
          </p>
        </div>

        {/* Side-by-side Comparative Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Uncoordinated Linear Model */}
          <div className="p-8 rounded-2xl bg-white border border-red-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100">
                  <AlertOctagon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-950 font-heading">
                    The Conventional "Dump & Siphon" Model
                  </h3>
                  <div className="text-xs text-red-700">Fragmented disposal, hidden water hazards</div>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-[#334155]">
                <li className="flex items-start gap-3">
                  <Skull className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-950 block">Runoff into Surface Water Bodies:</strong>
                    Untreated rinse wastewater and leaking stockpiles wash heavy metals, toxic surfactants, and micro-contaminants directly into local rivers and municipal reservoirs.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-950 block">Resource Depletion & Landfill Overload:</strong>
                    Valuable polymers, alloys, and process water are buried or incinerated, generating massive greenhouse gas emissions instead of being re-compounded.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertOctagon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-950 block">Compliance Blindspots & Heavy Penalties:</strong>
                    Lack of auditable manifests exposes generators to severe regulatory fines and environmental cleanup liabilities under EPA and state water pollution acts.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-red-100 text-xs text-red-700 font-medium">
              Consequence: Chronic aquatic toxicity, permanent aquifer depletion, and economic waste.
            </div>
          </div>

          {/* The Waste2Worth Circular Framework */}
          <div className="p-8 rounded-2xl bg-white border border-[#22C55E]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-[#16A34A] border border-emerald-100">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-950 font-heading">
                    The Waste2Worth Circular Framework
                  </h3>
                  <div className="text-xs text-[#16A34A] font-semibold">Intelligent matchmaking, audited zero-leakage pathways</div>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-[#334155]">
                <li className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950 block">Automated Water Risk Interception:</strong>
                    Real-time calculation of pH, COD, BOD, and TSS identifies water hazards at source, instantly rerouting corrosive or toxic effluent to authorized ZLD plants.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950 block">Closed-Loop Secondary Feedstock Matching:</strong>
                    Industrial byproducts are classified, laboratory verified, and matched with re-processors, turning disposal cost centers into secondary raw material revenues.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950 block">Cryptographically Auditable Chain of Custody:</strong>
                    Every batch records digital signatures, transport custody geofencing, receiving weigh tickets, and environmental certificate generation.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs text-[#16A34A] font-semibold">
                Outcome: Complete watershed defense & profitable circularity.
              </span>
              <button
                onClick={() => setActiveTab('water-risk')}
                className="text-xs font-bold text-[#0D9488] hover:underline"
              >
                Screen Effluent Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
