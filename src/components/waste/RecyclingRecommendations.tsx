import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Facility, WasteListing } from '../../types';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Truck,
  Sparkles
} from 'lucide-react';

export const RecyclingRecommendations: React.FC = () => {
  const { listings, facilities, addCollectionRequest, selectedListingId, setSelectedListingId } = useApp();

  const [activeListingId, setActiveListingId] = useState<string>(selectedListingId || listings[0]?.id || '');
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);

  const currentListing = listings.find(l => l.id === activeListingId) || listings[0];

  // Match recommendation algorithm
  const matches = facilities.map(fac => {
    let matchScore = 0;
    const matchReasons: string[] = [];
    const requiredDocs: string[] = ['Standard Bill of Lading (BOL)'];

    // Category match
    if (fac.acceptedCategories.includes(currentListing.category)) {
      matchScore += 45;
      matchReasons.push(`Permitted & authorized to accept ${currentListing.category}.`);
    } else {
      matchScore -= 30;
    }

    // Hazardous safety rule: Never match hazardous waste with unverified or uncertified facilities
    if (currentListing.hazardousStatus === 'Hazardous') {
      if (fac.facilityType === 'Authorized Hazardous-Waste Processor' || fac.facilityType === 'Wastewater Treatment Plant (ETP/STP)') {
        matchScore += 30;
        matchReasons.push('Holds verified RCRA Part B / HazMat permit required for hazardous waste intake.');
        requiredDocs.push('Uniform Hazardous Waste Manifest', 'Full Certified Laboratory ICP Assay');
      } else {
        matchScore = 0; // Disqualify unverified or standard recyclers
      }
    } else {
      // Non-hazardous stream
      if (fac.facilityType === 'Recycling Plant' || fac.facilityType === 'Material Recovery Facility (MRF)') {
        matchScore += 25;
        matchReasons.push('Optimal high-yield mechanical re-pelletizing and circular compounding capability.');
      }
      requiredDocs.push('Non-Hazardous Generator Certification');
    }

    // Distance estimation (Detroit reference)
    let approxDistance = 45;
    if (fac.city === 'Toledo') approxDistance = 58;
    if (fac.city === 'Cleveland') approxDistance = 168;
    if (fac.city === 'Gary') approxDistance = 240;
    if (fac.city === 'Detroit') approxDistance = 12;

    if (approxDistance < 75) {
      matchScore += 20;
      matchReasons.push(`Close transit radius (~${approxDistance} miles) reduces transport carbon footprint.`);
    } else {
      matchScore += 10;
    }

    return {
      facility: fac,
      matchScore: Math.min(99, Math.max(10, matchScore)),
      matchReasons,
      approxDistance,
      requiredDocs,
      isCompatible: matchScore >= 50
    };
  }).filter(m => m.isCompatible).sort((a, b) => b.matchScore - a.matchScore);

  const handleRequestPickup = (fac: Facility) => {
    if (!currentListing) return;
    addCollectionRequest({
      listingId: currentListing.id,
      listingTitle: currentListing.title,
      generatorOrgId: currentListing.organizationId,
      generatorOrgName: currentListing.organizationName,
      facilityId: fac.id,
      facilityName: fac.name,
      facilityType: fac.facilityType,
      status: 'Pending',
      estimatedCostOrValue: currentListing.hazardousStatus === 'Hazardous' ? '- $1,850.00 (Treatment Fee)' : '+ $1,150.00 (Generator Revenue)',
      specialInstructions: 'Standard transport appointment and intake gate inspection requested.',
      quantity: currentListing.quantity,
      unit: currentListing.unit
    });
    setRequestSuccess(`Collection booking inquiry sent to ${fac.name}!`);
    setTimeout(() => setRequestSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-[#29394D]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#22C55E]" />
          <span>Automated Facility Matchmaker</span>
        </div>
        <h2 className="text-2xl font-bold text-[#F8FAFC] font-heading">
          Smart Recycling & Treatment Recommendations
        </h2>
        <p className="text-xs text-[#A7B4C5]">
          Intelligently matches waste specifications against verified regional facility permits, capacities, and treatment technologies.
        </p>
      </div>

      {requestSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-[#22C55E] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{requestSuccess}</span>
        </div>
      )}

      {/* Select Active Waste Stream */}
      <div className="p-4 rounded-xl bg-[#162437] border border-[#29394D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <label className="text-xs font-semibold text-[#F8FAFC] block">
            Select Active Waste Stream to Match:
          </label>
          <div className="text-[11px] text-[#A7B4C5]">
            Comparing facility intake criteria against this registered batch
          </div>
        </div>

        <select
          value={activeListingId}
          onChange={(e) => {
            setActiveListingId(e.target.value);
            setSelectedListingId(e.target.value);
          }}
          className="px-3 py-2 text-xs rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none max-w-md"
        >
          {listings.map(l => (
            <option key={l.id} value={l.id}>
              {l.title} ({l.quantity} {l.unit})
            </option>
          ))}
        </select>
      </div>

      {/* Current Stream Card Overview */}
      {currentListing && (
        <div className="p-4 rounded-xl bg-[#101C2C] border border-[#29394D] text-xs flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#06B6D4]">{currentListing.category}</span>
            <div className="font-bold text-[#F8FAFC] text-sm">{currentListing.title}</div>
            <div className="text-[#A7B4C5]">{currentListing.description}</div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div>Quantity: <strong className="text-[#F8FAFC]">{currentListing.quantity} {currentListing.unit}</strong></div>
            <span aria-hidden="true" className="text-[#29394D]">·</span>
            <div>Hazard: <strong className={currentListing.hazardousStatus === 'Hazardous' ? 'text-rose-400' : 'text-[#22C55E]'}>{currentListing.hazardousStatus}</strong></div>
          </div>
        </div>
      )}

      {/* Recommendations Cards */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-[#A7B4C5] uppercase tracking-wider">
          Ranked Authorized Facility Matches ({matches.length} Verified Facilities Found)
        </div>

        {matches.map(({ facility, matchScore, matchReasons, approxDistance, requiredDocs }) => (
          <div
            key={facility.id}
            className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] hover:border-[#22C55E]/50 transition-all space-y-4 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#06B6D4] uppercase">
                    {facility.facilityType}
                  </span>
                  <span aria-hidden="true" className="text-[#29394D]">·</span>
                  <span className="text-[#22C55E] text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified #{facility.authorizationCode}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] font-heading mt-0.5">
                  {facility.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#A7B4C5] mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {facility.city}, {facility.state} (~{approxDistance} miles)
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Annual Capacity: {facility.annualCapacity}</span>
                </div>
              </div>

              {/* Compatibility Score */}
              <div className="text-right shrink-0">
                <span className="text-[11px] text-[#A7B4C5] block">Compatibility:</span>
                <span className="text-2xl font-extrabold font-mono text-[#22C55E] tabular-nums">
                  {matchScore}%
                </span>
              </div>
            </div>

            {/* Why It Matches */}
            <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#29394D]/60 space-y-2 text-xs">
              <div className="font-semibold text-[#F8FAFC] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Match Rationale & Technology Capabilities:</span>
              </div>
              <ul className="space-y-1 pl-5 list-disc text-[#A7B4C5]">
                {matchReasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Required Documentation */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
              <div className="flex flex-wrap items-center gap-2 text-[#A7B4C5]">
                <FileText className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Required Documentation:</span>
                {requiredDocs.map((doc, i) => (
                  <span key={i} className="text-[11px] font-mono bg-[#101C2C] px-2 py-0.5 rounded border border-[#29394D] text-[#F8FAFC]">
                    {doc}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleRequestPickup(facility)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#14B8A6] text-[#0B1220] font-semibold text-xs tracking-wide uppercase hover:brightness-110 active:brightness-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Request Pickup / Quote</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
