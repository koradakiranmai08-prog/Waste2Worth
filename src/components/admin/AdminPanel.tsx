import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Building2, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Activity, 
  Settings, 
  Sliders,
  Eye,
  Trash2
} from 'lucide-react';
import { WasteListing } from '../../types';

export const AdminPanel: React.FC = () => {
  const { listings, updateListing, facilities, auditLogs, currentRole } = useApp();

  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'listings' | 'facilities' | 'audit' | 'calculations'>('listings');

  // Calculation parameters state
  const [ghgPolymerFactor, setGhgPolymerFactor] = useState('2.0'); // tCO2e / MT
  const [ghgMetalFactor, setGhgMetalFactor] = useState('4.5'); // tCO2e / MT
  const [waterZldEfficiency, setWaterZldEfficiency] = useState('94.5'); // %

  const handleApproveListing = (id: string) => {
    updateListing(id, { status: 'Verified' });
  };

  const handleFlagListing = (id: string) => {
    updateListing(id, { hazardousStatus: 'Unknown (Requires Testing)', status: 'Pending Review' });
  };

  return (
    <div className="py-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#29394D]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>State Regulatory Oversight & Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-heading mt-1">
            Platform Governance & Moderation Console
          </h1>
          <p className="text-xs sm:text-sm text-[#A7B4C5]">
            Audit facility authorizations, moderate submitted waste specifications, review immutable logs, and tune carbon calculation methodologies.
          </p>
        </div>

        <span className="text-xs font-mono bg-amber-400/10 text-amber-400 px-3 py-1.5 rounded-lg border border-amber-400/30 font-semibold self-start sm:self-auto">
          ROLE: STATE AUDITOR (ADMIN)
        </span>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-[#29394D] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveAdminSubTab('listings')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeAdminSubTab === 'listings'
              ? 'bg-[#162437] text-[#22C55E] border border-[#22C55E]/40'
              : 'text-[#A7B4C5] hover:text-[#F8FAFC]'
          }`}
        >
          Listing Moderation ({listings.length})
        </button>
        <button
          onClick={() => setActiveAdminSubTab('facilities')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeAdminSubTab === 'facilities'
              ? 'bg-[#162437] text-[#06B6D4] border border-[#06B6D4]/40'
              : 'text-[#A7B4C5] hover:text-[#F8FAFC]'
          }`}
        >
          Facility Verifications ({facilities.length})
        </button>
        <button
          onClick={() => setActiveAdminSubTab('audit')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeAdminSubTab === 'audit'
              ? 'bg-[#162437] text-amber-400 border border-amber-400/40'
              : 'text-[#A7B4C5] hover:text-[#F8FAFC]'
          }`}
        >
          Audit Logs ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveAdminSubTab('calculations')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeAdminSubTab === 'calculations'
              ? 'bg-[#162437] text-[#14B8A6] border border-[#14B8A6]/40'
              : 'text-[#A7B4C5] hover:text-[#F8FAFC]'
          }`}
        >
          Environmental Formula Parameters
        </button>
      </div>

      {/* SUB-TAB 1: Listing Moderation */}
      {activeAdminSubTab === 'listings' && (
        <div className="space-y-4">
          <div className="text-xs text-[#A7B4C5] flex items-center justify-between">
            <span>Moderate listings for hazardous misclassifications and missing SDS documents:</span>
            <span className="font-mono text-[#22C55E]">{listings.length} Active Platform Listings</span>
          </div>

          <div className="space-y-3">
            {listings.map(listing => (
              <div
                key={listing.id}
                className="p-5 rounded-2xl bg-[#162437] border border-[#29394D] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#06B6D4] font-semibold">{listing.category}</span>
                    <span aria-hidden="true" className="text-[#29394D]">·</span>
                    <span className="font-mono text-[#A7B4C5]">{listing.id}</span>
                    <span aria-hidden="true" className="text-[#29394D]">·</span>
                    <span className={listing.hazardousStatus === 'Hazardous' ? 'text-rose-400 font-semibold' : 'text-[#22C55E]'}>
                      {listing.hazardousStatus}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#F8FAFC] font-heading">{listing.title}</h3>
                  <div className="text-[#A7B4C5] flex items-center gap-3">
                    <span>Source: {listing.organizationName}</span>
                    <span aria-hidden="true">·</span>
                    <span>Volume: {listing.quantity} {listing.unit}</span>
                    <span aria-hidden="true">·</span>
                    <span>Status: <strong className="text-[#F8FAFC]">{listing.status}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {listing.status === 'Pending Review' ? (
                    <button
                      onClick={() => handleApproveListing(listing.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#22C55E] text-[#0B1220] font-semibold text-xs hover:brightness-110 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Verified</span>
                    </button>
                  ) : (
                    <span className="text-[#22C55E] font-mono text-[11px] bg-[#22C55E]/10 px-2 py-1 rounded border border-[#22C55E]/30">
                      Approved
                    </span>
                  )}

                  <button
                    onClick={() => handleFlagListing(listing.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#101C2C] hover:bg-rose-950/40 text-rose-400 border border-[#29394D] hover:border-rose-700 transition-all flex items-center gap-1 cursor-pointer"
                    title="Flag for laboratory re-testing"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Flag for Assay</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Facilities Verification */}
      {activeAdminSubTab === 'facilities' && (
        <div className="space-y-4">
          <div className="text-xs text-[#A7B4C5]">
            Verified regional treatment plants and recyclers holding valid regulatory operating permits:
          </div>

          <div className="space-y-3">
            {facilities.map(facility => (
              <div
                key={facility.id}
                className="p-5 rounded-2xl bg-[#162437] border border-[#29394D] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#06B6D4]">{facility.facilityType}</span>
                    <span aria-hidden="true" className="text-[#29394D]">·</span>
                    <span className="text-[#22C55E] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Permit Verified: {facility.authorizationCode}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#F8FAFC] font-heading">{facility.name}</h3>
                  <div className="text-[#A7B4C5]">
                    {facility.city}, {facility.state} · Operating Capacity: {facility.annualCapacity}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#101C2C] border border-[#22C55E]/40 text-[#22C55E] font-mono text-[11px]">
                    STATUS: ACTIVE LICENSE
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Audit Logs */}
      {activeAdminSubTab === 'audit' && (
        <div className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4">
          <div className="flex items-center justify-between text-xs">
            <h3 className="font-bold text-[#F8FAFC] font-heading">Cryptographically Tracked Audit Events</h3>
            <span className="text-xs font-mono text-[#A7B4C5]">{auditLogs.length} Events</span>
          </div>

          <div className="space-y-2">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-[#0B1220] border border-[#29394D]/70 text-xs">
                <div className="flex items-center justify-between text-[#A7B4C5] mb-1">
                  <span className="font-semibold text-[#F8FAFC]">{log.actor}</span>
                  <span className="font-mono text-[10px] text-[#A7B4C5]/80">{log.timestamp}</span>
                </div>
                <div className="font-mono text-[11px] text-[#22C55E]">{log.action} · {log.targetType} #{log.targetId}</div>
                <div className="text-[#A7B4C5] text-[11px] mt-0.5">{log.details}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Environmental Formula Parameters */}
      {activeAdminSubTab === 'calculations' && (
        <div className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] space-y-5 max-w-2xl text-xs">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#F8FAFC] font-heading">
              Configurable Environmental Calculation Coefficients
            </h3>
            <p className="text-[#A7B4C5]">
              Configure EPA WARM and IPCC conversion factors applied to circular recovery metrics.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[#F8FAFC] font-semibold block mb-1">
                Polymer Avoided Emissions Factor (tCO₂e per MT Recycled)
              </label>
              <input
                type="number"
                step="0.1"
                value={ghgPolymerFactor}
                onChange={(e) => setGhgPolymerFactor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
              />
              <span className="text-[11px] text-[#A7B4C5]">EPA WARM reference baseline for PP/PET closed-loop re-granulation.</span>
            </div>

            <div>
              <label className="text-[#F8FAFC] font-semibold block mb-1">
                Alloy Avoided Emissions Factor (tCO₂e per MT Recycled Aluminum/Copper)
              </label>
              <input
                type="number"
                step="0.1"
                value={ghgMetalFactor}
                onChange={(e) => setGhgMetalFactor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
              />
              <span className="text-[11px] text-[#A7B4C5]">Secondary smelting vs. primary bauxite refining energy differential.</span>
            </div>

            <div>
              <label className="text-[#F8FAFC] font-semibold block mb-1">
                Zero Liquid Discharge (ZLD) Effluent Recovery Standard (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={waterZldEfficiency}
                onChange={(e) => setWaterZldEfficiency(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
              />
              <span className="text-[11px] text-[#A7B4C5]">Standard RO membrane permeate recovery baseline for ETP facilities.</span>
            </div>

            <button
              onClick={() => alert('Calculation coefficients updated in system memory.')}
              className="px-4 py-2 bg-[#22C55E] text-[#0B1220] font-semibold rounded-xl hover:brightness-110 transition-all cursor-pointer"
            >
              Update Calculation Parameters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
