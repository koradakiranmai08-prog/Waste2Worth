import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Facility, FacilityType } from '../../types';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Truck, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  List,
  Map as MapIcon
} from 'lucide-react';
import { MapPreviewSection } from '../home/MapPreviewSection';

export const FacilityDirectory: React.FC = () => {
  const { facilities, setActiveTab } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');

  const facilityTypes: FacilityType[] = [
    'Recycling Plant',
    'Waste Collection Center',
    'Wastewater Treatment Plant (ETP/STP)',
    'Material Recovery Facility (MRF)',
    'Authorized Hazardous-Waste Processor'
  ];

  const filteredFacilities = facilities.filter(f => {
    const matchesType = filterType === 'all' || f.facilityType === filterType;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || 
                          f.city.toLowerCase().includes(search.toLowerCase()) ||
                          f.state.toLowerCase().includes(search.toLowerCase()) ||
                          f.acceptedCategories.some(c => c.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#29394D]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#06B6D4]" />
            <span>Authorized Regional Infrastructure</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-heading mt-1">
            Recycling & Treatment Facility Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#A7B4C5]">
            Verified network of state-licensed recycling plants, zero-liquid-discharge (ZLD) effluent treatment facilities, and accredited HazMat neutralization operators.
          </p>
        </div>

        {/* View Switcher: List vs Map */}
        <div className="flex items-center p-1 rounded-xl bg-[#162437] border border-[#29394D] self-start sm:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'list' ? 'bg-[#22C55E] text-[#0B1220]' : 'text-[#A7B4C5] hover:text-[#F8FAFC]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List Directory</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'map' ? 'bg-[#06B6D4] text-[#0B1220]' : 'text-[#A7B4C5] hover:text-[#F8FAFC]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <MapPreviewSection />
      ) : (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A7B4C5] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search facility by name, city, accepted waste type, or license..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-[#162437] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3.5 py-2.5 text-xs rounded-xl bg-[#162437] border border-[#29394D] text-[#A7B4C5] focus:border-[#22C55E] focus:outline-none"
            >
              <option value="all">All Facility Types ({facilities.length})</option>
              {facilityTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Facilities Cards List */}
          <div className="space-y-5">
            {filteredFacilities.map(facility => (
              <div
                key={facility.id}
                className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] hover:border-[#14B8A6]/50 transition-all space-y-5 shadow-lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-[#06B6D4] font-semibold">
                        {facility.facilityType}
                      </span>
                      <span aria-hidden="true" className="text-[#29394D]">·</span>
                      <span className="text-[#22C55E] text-xs font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Permit #{facility.authorizationCode}
                      </span>
                      <span aria-hidden="true" className="text-[#29394D]">·</span>
                      <span className="text-xs text-amber-400 font-mono">
                        ★ {facility.rating} Rating
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[#F8FAFC] font-heading">
                      {facility.name}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#A7B4C5]">
                      <span className="flex items-center gap-1 text-[#F8FAFC]">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {facility.city}, {facility.state}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Annual Throughput: <strong className="text-[#22C55E] font-mono">{facility.annualCapacity}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Logistics: <strong className="text-[#06B6D4]">{facility.collectionOffered ? 'Carrier Fleet Available' : 'Gate Receiving Only'}</strong></span>
                    </div>
                  </div>

                  {/* Contact / Dispatch Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab('recommendations')}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#22C55E] to-[#14B8A6] text-[#0B1220] hover:brightness-110 active:brightness-95 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Book Intake Allocation
                    </button>
                  </div>
                </div>

                {/* Accepted Waste Categories */}
                <div className="space-y-1.5 text-xs">
                  <div className="font-semibold text-[#A7B4C5]">Accepted Permitted Streams:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {facility.acceptedCategories.map((cat, i) => (
                      <span key={i} className="text-[11px] font-mono bg-[#0B1220] text-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#29394D]">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Treatment Technologies */}
                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#29394D]/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A7B4C5]">
                  {facility.treatmentCapabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#F8FAFC]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                {/* Contact & Dispatch line */}
                <div className="pt-2 border-t border-[#29394D] flex flex-wrap items-center justify-between text-xs text-[#A7B4C5]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span>{facility.email}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#06B6D4]" />
                      <span>{facility.phone}</span>
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#A7B4C5]">
                    Contact: {facility.operatingContact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
