import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Facility, FacilityType } from '../../types';
import { MapPin, Navigation, ShieldCheck, Factory, Filter, Phone, Mail, ArrowRight } from 'lucide-react';

export const MapPreviewSection: React.FC = () => {
  const { facilities, setActiveTab } = useApp();
  const [selectedFacility, setSelectedFacility] = useState<Facility>(facilities[0]);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredFacilities = facilities.filter(f => {
    if (filterType === 'all') return true;
    return f.facilityType === filterType;
  });

  const facilityTypes: FacilityType[] = [
    'Recycling Plant',
    'Waste Collection Center',
    'Wastewater Treatment Plant (ETP/STP)',
    'Material Recovery Facility (MRF)',
    'Authorized Hazardous-Waste Processor'
  ];

  return (
    <section className="py-20 bg-[#0B1220] border-t border-[#29394D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
              Regional Infrastructure
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight font-heading [text-wrap:balance]">
              Participating Facilities & Treatment Network
            </h2>
            <p className="text-sm sm:text-base text-[#A7B4C5]">
              Explore verified recycling plants, effluent treatment facilities, and material recovery centers. Sensitive generator locations are approximated for privacy.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('network')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#162437] hover:bg-[#101C2C] border border-[#29394D] hover:border-[#14B8A6] rounded-xl transition-all self-start md:self-auto cursor-pointer"
          >
            <span>Full Network Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-medium text-[#A7B4C5] flex items-center gap-1.5 shrink-0 pr-2">
            <Filter className="w-3.5 h-3.5 text-[#22C55E]" />
            Filter Type:
          </span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#22C55E] text-[#0B1220] font-semibold'
                : 'bg-[#162437] text-[#A7B4C5] hover:text-[#F8FAFC] border border-[#29394D]'
            }`}
          >
            All Facilities ({facilities.length})
          </button>
          {facilityTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterType === type
                  ? 'bg-[#22C55E] text-[#0B1220] font-semibold'
                  : 'bg-[#162437] text-[#A7B4C5] hover:text-[#F8FAFC] border border-[#29394D]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Interactive Map & Facility Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Geographic Canvas */}
          <div className="lg:col-span-7 rounded-2xl bg-[#162437] border border-[#29394D] p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[#A7B4C5] mb-4">
              <span className="flex items-center gap-1.5 text-[#22C55E] font-semibold">
                <Navigation className="w-3.5 h-3.5" />
                Midwest & Eastern Industrial Hub Corridor
              </span>
              <span className="font-mono text-[11px] text-[#A7B4C5]/80 bg-[#101C2C] px-2 py-0.5 rounded border border-[#29394D]">
                Interactive Map View (Sample Data)
              </span>
            </div>

            {/* Stylized Vector Grid Map Canvas */}
            <div className="relative aspect-[16/10] w-full rounded-xl bg-[#0B1220] border border-[#29394D]/70 overflow-hidden flex items-center justify-center">
              {/* Regional Watershed & State Contour SVG */}
              <svg className="w-full h-full object-cover opacity-60" viewBox="0 0 600 380" fill="none">
                {/* Water Basin / Great Lakes Representation */}
                <path 
                  d="M180,60 Q260,40 320,70 T420,90 Q480,120 460,180 T360,200 Q280,210 240,170 T160,120 Z" 
                  fill="#06B6D4" 
                  fillOpacity="0.12" 
                  stroke="#06B6D4" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                />
                <text x="290" y="130" fill="#06B6D4" opacity="0.4" fontSize="12" fontFamily="Inter" textAnchor="middle">
                  PROTECTED LAKE BASIN ECOSYSTEM
                </text>

                {/* Road / Freight Transport Corridors */}
                <path d="M120,320 L220,240 L340,210 L450,150 L520,110" stroke="#29394D" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M220,80 L220,240 L280,340" stroke="#29394D" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M340,40 L340,210 L380,320" stroke="#29394D" strokeWidth="2" strokeDasharray="3 3" />

                {/* Subdued Grid Lines */}
                <line x1="50" y1="100" x2="550" y2="100" stroke="#162437" strokeWidth="1" />
                <line x1="50" y1="200" x2="550" y2="200" stroke="#162437" strokeWidth="1" />
                <line x1="50" y1="300" x2="550" y2="300" stroke="#162437" strokeWidth="1" />
                <line x1="150" y1="30" x2="150" y2="350" stroke="#162437" strokeWidth="1" />
                <line x1="300" y1="30" x2="300" y2="350" stroke="#162437" strokeWidth="1" />
                <line x1="450" y1="30" x2="450" y2="350" stroke="#162437" strokeWidth="1" />
              </svg>

              {/* Facility Markers Overlay */}
              {/* Detroit / Toledo / Cleveland / Gary / Charlotte approximate locations on SVG plane */}
              {filteredFacilities.map((fac, idx) => {
                // Approximate coordinate mapping to 0-100%
                let top = 40;
                let left = 50;
                if (fac.city === 'Detroit') { top = 34; left = 48; }
                if (fac.city === 'Toledo') { top = 44; left = 46; }
                if (fac.city === 'Cleveland') { top = 46; left = 62; }
                if (fac.city === 'Gary') { top = 48; left = 32; }
                if (fac.city === 'Kalamazoo') { top = 38; left = 40; }

                const isSelected = selectedFacility.id === fac.id;

                return (
                  <button
                    key={fac.id}
                    onClick={() => setSelectedFacility(fac)}
                    style={{ top: `${top}%`, left: `${left}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                    }`}
                    title={fac.name}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-6 w-6 rounded-full opacity-75 ${
                        fac.facilityType.includes('Wastewater') ? 'bg-[#06B6D4]' : 'bg-[#22C55E]'
                      }`} />
                      <div className={`p-2 rounded-full border shadow-lg ${
                        isSelected 
                          ? 'bg-[#F8FAFC] text-[#0B1220] border-white ring-2 ring-[#22C55E]'
                          : fac.facilityType.includes('Wastewater')
                          ? 'bg-[#06B6D4] text-[#0B1220] border-[#0B1220]'
                          : 'bg-[#22C55E] text-[#0B1220] border-[#0B1220]'
                      }`}>
                        <Factory className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#162437]/95 border border-[#29394D] px-2 py-0.5 rounded text-[10px] font-mono text-[#F8FAFC] shadow pointer-events-none">
                        {fac.city}, {fac.state}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-[#A7B4C5]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
                  <span>Wastewater & HazChem ETP</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  <span>Mechanical & Polymer Reclaimer</span>
                </span>
              </div>
              <span className="text-[#A7B4C5]/80">Click marker to inspect plant</span>
            </div>
          </div>

          {/* Right Selected Facility Profile Spotlight */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#162437] border border-[#29394D] space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-[#06B6D4] uppercase">
                  {selectedFacility.facilityType}
                </span>
                <h3 className="text-lg font-bold text-[#F8FAFC] font-heading mt-0.5">
                  {selectedFacility.name}
                </h3>
                <div className="text-xs text-[#A7B4C5] flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{selectedFacility.city}, {selectedFacility.state}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#22C55E] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified #{selectedFacility.authorizationCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Capacities & Capabilities */}
            <div className="space-y-2 pt-2 border-t border-[#29394D]">
              <div className="text-xs font-semibold text-[#A7B4C5] uppercase tracking-wider">
                Operating Capabilities:
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {selectedFacility.treatmentCapabilities.map((cap, i) => (
                  <div key={i} className="text-xs text-[#F8FAFC] bg-[#0B1220] px-3 py-1.5 rounded-lg border border-[#29394D]/60 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Annual Capacity */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#0B1220] border border-[#29394D]">
                <div className="text-[#A7B4C5]">Annual Intake Capacity:</div>
                <div className="text-sm font-bold text-[#22C55E] font-heading mt-0.5 tabular-nums">
                  {selectedFacility.annualCapacity}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#0B1220] border border-[#29394D]">
                <div className="text-[#A7B4C5]">Logistics Fleet:</div>
                <div className="text-sm font-bold text-[#06B6D4] font-heading mt-0.5">
                  {selectedFacility.collectionOffered ? 'Tanker & Roll-Off' : 'Receiving Only'}
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="pt-2 text-xs text-[#A7B4C5] space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>{selectedFacility.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>{selectedFacility.phone}</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => setActiveTab('network')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#22C55E] hover:brightness-110 active:brightness-95 text-[#0B1220] font-semibold text-xs transition-all text-center cursor-pointer"
            >
              Request Plant Intake & Capacity Booking
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
