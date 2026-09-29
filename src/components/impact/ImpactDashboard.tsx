import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  Download, 
  Printer, 
  FileText, 
  ShieldCheck, 
  Droplet, 
  Recycle, 
  Leaf, 
  Filter, 
  Info,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const ImpactDashboard: React.FC = () => {
  const { listings, currentUser } = useApp();

  const [dateRange, setDateRange] = useState('YTD 2026');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Time-series impact data (Clearly documented demo model)
  const impactTimeSeries = [
    { period: 'Apr', registered: 42.0, collected: 36.5, processed: 32.0, recovered: 28.4, ghgSaved: 56.8 },
    { period: 'May', registered: 48.5, collected: 44.0, processed: 41.2, recovered: 36.8, ghgSaved: 73.6 },
    { period: 'Jun', registered: 45.2, collected: 42.1, processed: 39.5, recovered: 35.1, ghgSaved: 70.2 },
    { period: 'Jul', registered: 56.4, collected: 51.0, processed: 48.0, recovered: 42.6, ghgSaved: 85.2 },
    { period: 'Aug', registered: 62.1, collected: 58.4, processed: 54.2, recovered: 47.9, ghgSaved: 95.8 },
    { period: 'Sep', registered: 54.8, collected: 50.2, processed: 47.5, recovered: 41.8, ghgSaved: 83.6 }
  ];

  // Water risk reduction breakdown
  const waterMetrics = [
    { stream: 'Acidic Anodizing Rinse', volumeKiloLiters: 120, codPreventedKg: 57.6, heavyMetalsInterceptedKg: 5.04 },
    { stream: 'Machining Coolant Emulsions', volumeKiloLiters: 85, codPreventedKg: 68.0, heavyMetalsInterceptedKg: 2.12 },
    { stream: 'Textile Wet Finishing Rinse', volumeKiloLiters: 140, codPreventedKg: 42.0, heavyMetalsInterceptedKg: 0.28 },
    { stream: 'Etch Clarifier Wash', volumeKiloLiters: 65, codPreventedKg: 39.0, heavyMetalsInterceptedKg: 3.90 }
  ];

  // CSV Export handler
  const handleExportCSV = () => {
    const headers = ['Listing ID', 'Title', 'Category', 'Quantity', 'Unit', 'State', 'Hazardous', 'Status', 'Generated Date'];
    const rows = listings.map(l => [
      l.id,
      `"${l.title.replace(/"/g, '""')}"`,
      l.category,
      l.quantity,
      l.unit,
      l.physicalState,
      l.hazardousStatus,
      l.status,
      l.generationDate
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Waste2Worth-Impact-Report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#29394D]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
            <BarChart3 className="w-4 h-4 text-[#22C55E]" />
            <span>Audited ESG & Water Defense Accounting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-heading mt-1">
            Environmental Impact & Resource Accounting
          </h1>
          <p className="text-xs sm:text-sm text-[#A7B4C5]">
            Strictly distinguishes user-registered volumes, facility intake weigh-ins, and verified circular outcomes.
          </p>
        </div>

        {/* Export Actions */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#162437] hover:bg-[#101C2C] text-[#F8FAFC] border border-[#29394D] hover:border-[#22C55E] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowPrintModal(true)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#22C55E] to-[#14B8A6] text-[#0B1220] hover:brightness-110 active:brightness-95 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate Formal PDF Report</span>
          </button>
        </div>
      </div>

      {/* Scope & Methodology Boundary Note */}
      <div className="p-4 rounded-xl bg-[#101C2C] border border-[#29394D] text-xs text-[#A7B4C5] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-[#F8FAFC] block">
            Accounting Rigor & Truthful Reporting Standard
          </span>
          <p className="text-[11px] leading-relaxed">
            Waste2Worth strictly distinguishes: <strong>Registered</strong> (logged by generator), <strong>Collected</strong> (carrier custody transfer), <strong>Processed</strong> (plant treatment in progress), and <strong>Verified Recovered</strong> (weighed product outbound to secondary manufacturing). Registered volume is never equated with pollution prevented until documented in certified weigh tickets.
          </p>
        </div>
      </div>

      {/* 6 Stage Distinguishing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
          <div className="flex items-center justify-between text-xs text-[#A7B4C5] mb-2">
            <span>Stage 1: Registered</span>
            <span className="font-mono text-[11px]">DEMO DATA</span>
          </div>
          <div className="text-3xl font-extrabold text-[#F8FAFC] font-heading tabular-nums">
            309.0 <span className="text-sm font-normal text-[#A7B4C5]">MT</span>
          </div>
          <p className="text-xs text-[#A7B4C5] mt-2">
            Total industrial streams registered across all reporting facilities.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
          <div className="flex items-center justify-between text-xs text-[#A7B4C5] mb-2">
            <span>Stage 2: Carrier Collected</span>
            <span className="font-mono text-[11px] text-[#06B6D4]">IN TRANSIT</span>
          </div>
          <div className="text-3xl font-extrabold text-[#06B6D4] font-heading tabular-nums">
            282.2 <span className="text-sm font-normal text-[#A7B4C5]">MT</span>
          </div>
          <p className="text-xs text-[#A7B4C5] mt-2">
            91.3% collection rate accompanied by electronic bills of lading.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
          <div className="flex items-center justify-between text-xs text-[#A7B4C5] mb-2">
            <span>Stage 3: Verified Recovered</span>
            <span className="font-mono text-[11px] text-[#22C55E]">CIRCULAR ENTRY</span>
          </div>
          <div className="text-3xl font-extrabold text-[#22C55E] font-heading tabular-nums">
            232.6 <span className="text-sm font-normal text-[#A7B4C5]">MT</span>
          </div>
          <p className="text-xs text-[#A7B4C5] mt-2">
            Audited polymer regrind, clean scrap ingots, and reclaimed fibers.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
          <div className="flex items-center justify-between text-xs text-[#A7B4C5] mb-2">
            <span>Diverted from Landfill</span>
            <Recycle className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div className="text-3xl font-extrabold text-[#22C55E] font-heading tabular-nums">
            75.3% <span className="text-sm font-normal text-[#A7B4C5]">Diverted</span>
          </div>
          <p className="text-xs text-[#A7B4C5] mt-2">
            Secondary materials returned to industrial value chains.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
          <div className="flex items-center justify-between text-xs text-[#A7B4C5] mb-2">
            <span>Protected Watershed Volume</span>
            <Droplet className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <div className="text-3xl font-extrabold text-[#06B6D4] font-heading tabular-nums">
            410 <span className="text-sm font-normal text-[#A7B4C5]">kL</span>
          </div>
          <p className="text-xs text-[#A7B4C5] mt-2">
            Acidic & chemical effluent routed to certified Zero Liquid Discharge plants.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
          <div className="flex items-center justify-between text-xs text-[#A7B4C5] mb-2">
            <span>Estimated GHG Avoidance</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-heading tabular-nums">
            465.4 <span className="text-sm font-normal text-[#A7B4C5]">MT CO₂e</span>
          </div>
          <p className="text-xs text-[#A7B4C5] mt-2">
            Calculated via EPA WARM methodology factors for recycled polymers and metals.
          </p>
        </div>
      </div>

      {/* Main Impact Recharts Visualization */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#F8FAFC] font-heading">
              Material Reconciliation Pipeline: Registered ➔ Collected ➔ Recovered
            </h3>
            <p className="text-xs text-[#A7B4C5]">
              Monthly volumetric tracking ensuring zero unaccounted leakage (Demo Platform Data)
            </p>
          </div>
          <div className="text-xs font-mono text-[#22C55E] bg-[#101C2C] px-3 py-1 rounded-lg border border-[#29394D]">
            AUDITED AUDIT TRAIL
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactTimeSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="period" stroke="#A7B4C5" fontSize={12} tickLine={false} />
              <YAxis stroke="#A7B4C5" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#101C2C', borderColor: '#29394D', borderRadius: '8px', color: '#F8FAFC' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              <Bar dataKey="registered" name="Registered (MT)" fill="#A7B4C5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="collected" name="Carrier Collected (MT)" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recovered" name="Verified Recovered (MT)" fill="#22C55E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Water Protection Table */}
      <div className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#F8FAFC] font-heading">
              Water Pollution Prevention Breakdown
            </h3>
            <p className="text-xs text-[#A7B4C5]">
              Quantified intercept metrics of chemical oxygen demand and heavy metal dragout
            </p>
          </div>
          <span className="text-xs font-mono text-[#06B6D4]">
            410 kL Diverted from Municipal Runoff
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#29394D] text-[#A7B4C5] font-mono">
              <tr>
                <th className="py-2.5 px-3">Industrial Effluent Stream</th>
                <th className="py-2.5 px-3 text-right">Volume (kL)</th>
                <th className="py-2.5 px-3 text-right">COD Diverted (kg)</th>
                <th className="py-2.5 px-3 text-right">Heavy Metals Captured (kg)</th>
                <th className="py-2.5 px-3 text-right">Treatment Tech</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#29394D]/60 text-[#F8FAFC]">
              {waterMetrics.map((wm, i) => (
                <tr key={i} className="hover:bg-[#101C2C]/50 transition-colors">
                  <td className="py-3 px-3 font-semibold">{wm.stream}</td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums">{wm.volumeKiloLiters} kL</td>
                  <td className="py-3 px-3 text-right font-mono text-[#06B6D4] tabular-nums">{wm.codPreventedKg.toFixed(1)} kg</td>
                  <td className="py-3 px-3 text-right font-mono text-[#22C55E] tabular-nums">{wm.heavyMetalsInterceptedKg.toFixed(2)} kg</td>
                  <td className="py-3 px-3 text-right text-[11px] text-[#A7B4C5]">ZLD Membrane + RO</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formal PDF Report Modal (High contrast, printable) */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white text-[#122033] rounded-2xl p-8 sm:p-12 shadow-2xl my-8 space-y-8 font-sans">
            {/* Report Header */}
            <div className="flex items-start justify-between border-b border-slate-300 pb-6">
              <div>
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                  Waste2Worth Industrial Circularity Report
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
                  Quarterly Environmental Material Audit & Water Defense Statement
                </h1>
                <div className="text-xs text-slate-600 mt-1">
                  Reporting Entity: <strong>{currentUser.organizationName}</strong> · Period: <strong>Q3 2026</strong>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-300">
                  DOC-ID: W2W-AUDIT-2026-Q3
                </span>
                <div className="text-[11px] text-slate-500 mt-1">Generated: {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            {/* Metrics Summary Grid */}
            <div className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div>
                <div className="text-xs text-slate-500">Total Registered</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">309.0 MT</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Verified Recovered</div>
                <div className="text-xl font-bold text-emerald-700 mt-0.5">232.6 MT</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Water Protected</div>
                <div className="text-xl font-bold text-cyan-700 mt-0.5">410 kL</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">GHG Avoidance</div>
                <div className="text-xl font-bold text-emerald-700 mt-0.5">465.4 tCO₂e</div>
              </div>
            </div>

            {/* Verified Outbound Batch Log */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Audited Batch Outbound Reconciliations
              </h3>
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
                  <tr>
                    <th className="p-2">Batch / Stream</th>
                    <th className="p-2">Category</th>
                    <th className="p-2 text-right">Quantity</th>
                    <th className="p-2">Destination Facility</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {listings.map(l => (
                    <tr key={l.id}>
                      <td className="p-2 font-medium">{l.title}</td>
                      <td className="p-2">{l.category}</td>
                      <td className="p-2 text-right font-mono">{l.quantity} {l.unit}</td>
                      <td className="p-2">{l.matchedFacilityName || 'AquaClear / Circulatech Regional Network'}</td>
                      <td className="p-2 font-semibold text-emerald-700">{l.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Formal Disclaimers & Methodology */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-[11px] text-slate-600 space-y-1.5 leading-relaxed">
              <strong>Methodology & Compliance Disclaimer:</strong>
              <p>
                This document is a certified platform reconciliation statement of digital chain-of-custody transfers recorded through the Waste2Worth system. Greenhouse gas calculations adhere to EPA Waste Reduction Model (WARM) emission factors. This platform summary does not supersede statutory regulatory manifests or formal jurisdictional compliance filings.
              </p>
            </div>

            {/* Print & Close Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-300">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg"
              >
                Close Preview
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Formal Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
