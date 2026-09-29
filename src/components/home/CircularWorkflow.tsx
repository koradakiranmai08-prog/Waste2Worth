import React from 'react';
import { 
  ClipboardList, 
  Sparkles, 
  Droplets, 
  Building2, 
  Truck, 
  Recycle, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CircularWorkflow: React.FC = () => {
  const { setActiveTab, setIsRegisterModalOpen } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Industry Registers Waste',
      desc: 'Plant operators input physical state, volume, generation rate, packaging, and SDS/lab assay reports.',
      icon: <ClipboardList className="w-5 h-5 text-[#22C55E]" />,
      actionLabel: 'Try Registration',
      action: () => setIsRegisterModalOpen(true)
    },
    {
      num: '02',
      title: 'AI Classification & Lab Verification',
      desc: 'Machine learning analyzes molecular constituents, suggests standardized categories, and flags missing hazard data.',
      icon: <Sparkles className="w-5 h-5 text-[#06B6D4]" />,
      actionLabel: 'Test AI Lab',
      action: () => setActiveTab('ai-lab')
    },
    {
      num: '03',
      title: 'Water Pollution Risk Screening',
      desc: 'Critical effluent parameters (pH, COD, BOD, TSS, heavy metals) are calculated to prevent watershed poisoning.',
      icon: <Droplets className="w-5 h-5 text-[#14B8A6]" />,
      actionLabel: 'Water Risk Screener',
      action: () => setActiveTab('water-risk')
    },
    {
      num: '04',
      title: 'Smart Recycler & Plant Matching',
      desc: 'Algorithms match waste with licensed recyclers or ZLD treatment plants based on permits, capacity, and distance.',
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      actionLabel: 'Explore Network',
      action: () => setActiveTab('network')
    },
    {
      num: '05',
      title: 'Custody Dispatch & Lifecycle Tracking',
      desc: 'Secure digital manifests track collection, tanker geofencing, receiving weigh-ins, and multi-stage treatment milestones.',
      icon: <Truck className="w-5 h-5 text-cyan-400" />,
      actionLabel: 'View Lifecycle',
      action: () => setActiveTab('lifecycle')
    },
    {
      num: '06',
      title: 'Resource Recovery & Impact Audit',
      desc: 'Recovered polymers, secondary metals, and purified industrial water return to the economy with verified ESG metrics.',
      icon: <BarChart3 className="w-5 h-5 text-teal-400" />,
      actionLabel: 'View Impact',
      action: () => setActiveTab('impact')
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0B1220] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
            Closed-Loop Resource Stewardship
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight font-heading [text-wrap:balance]">
            How Waste2Worth Transforms Industrial Waste
          </h2>
          <p className="text-sm sm:text-base text-[#A7B4C5] leading-relaxed">
            From initial factory loading bay intake to final circular re-entry, our 6-step coordination framework ensures complete compliance, prevents water pollution, and closes the resource loop.
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] hover:border-[#22C55E]/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold text-[#22C55E] bg-[#101C2C] px-2.5 py-1 rounded-md border border-[#29394D]">
                    STEP {s.num}
                  </span>
                  <div className="p-2 rounded-lg bg-[#101C2C] border border-[#29394D] group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#F8FAFC] mb-2 font-heading">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C5] leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              <button
                onClick={s.action}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22C55E] hover:text-[#06B6D4] transition-colors group-hover:translate-x-1 duration-200 cursor-pointer text-left"
              >
                <span>{s.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Banner Kicker */}
        <div className="mt-12 p-6 rounded-xl bg-[#101C2C] border border-[#29394D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7B4C5]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
            <span><strong>Regulatory Standard:</strong> Hazardous waste streams are exclusively routed to RCRA / state-licensed HazMat processors.</span>
          </div>
          <button
            onClick={() => setActiveTab('about')}
            className="text-xs text-[#06B6D4] hover:underline font-medium shrink-0"
          >
            Review Chain of Custody Protocols →
          </button>
        </div>
      </div>
    </section>
  );
};
