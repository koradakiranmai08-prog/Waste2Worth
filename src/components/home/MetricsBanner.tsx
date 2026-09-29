import React from 'react';
import { Package, Recycle, Factory, CheckCircle2 } from 'lucide-react';

export const MetricsBanner: React.FC = () => {
  const metrics = [
    {
      label: 'Industrial Waste Listed',
      value: '142,500',
      unit: 'MT',
      subtext: 'Across 10 verified industrial streams',
      icon: <Package className="w-5 h-5 text-[#06B6D4]" />,
      badge: 'Demo Platform Data'
    },
    {
      label: 'Material Recovered / Reused',
      value: '98,200',
      unit: 'MT',
      subtext: '68.9% aggregate circular recovery efficiency',
      icon: <Recycle className="w-5 h-5 text-[#22C55E]" />,
      badge: 'Demo Platform Data'
    },
    {
      label: 'Participating Facilities',
      value: '340+',
      unit: 'Licensed',
      subtext: 'EPA & state authorized recyclers & ETPs',
      icon: <Factory className="w-5 h-5 text-[#14B8A6]" />,
      badge: 'Demo Platform Data'
    },
    {
      label: 'Completed Custody Transits',
      value: '2,150+',
      unit: 'Manifests',
      subtext: 'Audited digital chain of custody records',
      icon: <CheckCircle2 className="w-5 h-5 text-amber-400" />,
      badge: 'Demo Platform Data'
    }
  ];

  return (
    <section className="bg-[#101C2C] border-y border-[#29394D] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl bg-[#162437] border border-[#29394D] flex flex-col justify-between hover:border-[#14B8A6]/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-[#0B1220] border border-[#29394D]/70">
                  {m.icon}
                </div>
                <span className="text-[11px] font-mono text-[#A7B4C5]/80 uppercase tracking-wider">
                  {m.badge}
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl lg:text-4xl font-extrabold text-[#F8FAFC] tracking-tight font-heading tabular-nums">
                    {m.value}
                  </span>
                  <span className="text-sm font-semibold text-[#22C55E]">
                    {m.unit}
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#F8FAFC] mb-1">
                  {m.label}
                </div>
                <div className="text-xs text-[#A7B4C5] leading-relaxed">
                  {m.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
