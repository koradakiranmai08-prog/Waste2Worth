import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LifecycleMilestone, WasteListing } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  ShieldCheck, 
  FileText, 
  Building2, 
  Truck, 
  Recycle, 
  Droplet, 
  Plus,
  AlertCircle
} from 'lucide-react';

export const LifecycleTracker: React.FC = () => {
  const { 
    listings, 
    lifecycleEvents, 
    addLifecycleEvent, 
    selectedListingId, 
    setSelectedListingId, 
    currentUser, 
    currentRole 
  } = useApp();

  const [activeListingId, setActiveListingId] = useState<string>(selectedListingId || listings[3]?.id || listings[0]?.id || '');
  const [newNote, setNewNote] = useState('');
  const [newStepName, setNewStepName] = useState('Treatment & Neutralization in Progress');

  const currentListing = listings.find(l => l.id === activeListingId) || listings[0];
  const listingEvents = lifecycleEvents.filter(e => e.listingId === activeListingId);

  // Standard 11-stage pipeline definition
  const STANDARD_STAGES = [
    'Waste Registered',
    'Documents Reviewed & Verified',
    'Treatment Facility Matched',
    'Collection Requested',
    'Collection Scheduled',
    'Waste Collected & In Transit',
    'Received at Facility Gate',
    'Treatment & Neutralization in Progress',
    'Processing Completed',
    'Recovered Material Recorded',
    'Final Environmental Certificate Documented'
  ];

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentListing) return;

    addLifecycleEvent({
      listingId: currentListing.id,
      stepName: newStepName,
      timestamp: new Date().toISOString(),
      responsibleOrg: currentUser.organizationName,
      status: 'completed',
      notes: newNote || `Milestone verified by authorized representative ${currentUser.name}.`,
      verifier: `${currentUser.name} (${currentUser.title || 'Auditor'})`
    });

    setNewNote('');
  };

  return (
    <div className="py-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#29394D]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
            <Clock className="w-4 h-4 text-[#22C55E]" />
            <span>Digital Chain of Custody & Traceability</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-heading mt-1">
            Waste Lifecycle Tracking
          </h1>
          <p className="text-xs sm:text-sm text-[#A7B4C5]">
            11-stage auditable timeline documenting registration, lab verification, carrier transport, plant intake, and verified circular outcomes.
          </p>
        </div>

        {/* Listing Selector */}
        <select
          value={activeListingId}
          onChange={(e) => {
            setActiveListingId(e.target.value);
            setSelectedListingId(e.target.value);
          }}
          className="px-3 py-2 text-xs rounded-xl bg-[#162437] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none max-w-xs"
        >
          {listings.map(l => (
            <option key={l.id} value={l.id}>
              {l.title} ({l.quantity} {l.unit})
            </option>
          ))}
        </select>
      </div>

      {/* Active Stream Dossier Card */}
      {currentListing && (
        <div className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-[#06B6D4] font-semibold">{currentListing.category}</span>
                <span aria-hidden="true" className="text-[#29394D]">·</span>
                <span className="text-[#22C55E] font-medium font-mono">STATUS: {currentListing.status}</span>
              </div>
              <h2 className="text-xl font-bold text-[#F8FAFC] font-heading mt-1">
                {currentListing.title}
              </h2>
              <div className="text-xs text-[#A7B4C5] mt-1 flex flex-wrap items-center gap-4">
                <span>Origin: <strong className="text-[#F8FAFC]">{currentListing.organizationName}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Volume: <strong className="text-[#F8FAFC]">{currentListing.quantity} {currentListing.unit}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Hazard Classification: <strong className={currentListing.hazardousStatus === 'Hazardous' ? 'text-rose-400' : 'text-[#22C55E]'}>{currentListing.hazardousStatus}</strong></span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] font-mono text-[#A7B4C5] bg-[#0B1220] px-2.5 py-1 rounded border border-[#29394D]">
                MANIFEST ID: {currentListing.id}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive 11-Stage Timeline */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#162437] border border-[#29394D] space-y-8 shadow-xl">
        <div className="text-xs font-semibold text-[#A7B4C5] uppercase tracking-wider flex items-center justify-between">
          <span>Official Custody Milestones & Inspection Logs</span>
          <span className="font-mono text-[#22C55E]">{listingEvents.length} Recorded Milestones</span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#29394D]">
          {listingEvents.map((evt, idx) => {
            const isCompleted = evt.status === 'completed';
            const isInProgress = evt.status === 'in_progress';

            return (
              <div key={evt.id || idx} className="relative group">
                {/* Node Icon on line */}
                <div className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-[#0B1220] transition-colors ${
                  isCompleted 
                    ? 'border-[#22C55E] text-[#22C55E]' 
                    : isInProgress 
                    ? 'border-[#06B6D4] text-[#06B6D4] animate-pulse' 
                    : 'border-[#29394D] text-[#A7B4C5]'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isInProgress ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <Circle className="w-2 h-2" />
                  )}
                </div>

                {/* Milestone Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#101C2C] border border-[#29394D] hover:border-[#14B8A6]/40 transition-all space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="font-bold text-[#F8FAFC] text-sm font-heading">
                      {evt.stepName}
                    </span>
                    <span className="font-mono text-[#A7B4C5] text-[11px]">
                      {new Date(evt.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-xs text-[#A7B4C5] leading-relaxed">
                    {evt.notes}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#29394D]/60 text-[11px] text-[#A7B4C5]">
                    <div>
                      Responsible Entity: <strong className="text-[#06B6D4]">{evt.responsibleOrg}</strong>
                    </div>
                    {evt.verifier && (
                      <div className="flex items-center gap-1 text-[#22C55E]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified by: {evt.verifier}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Operator Milestone Append Control (Only authorized roles) */}
      <div className="p-6 rounded-2xl bg-[#101C2C] border border-[#29394D] space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#F8FAFC] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>Authorized Custody Advancement Panel</span>
          </div>
          <span className="text-[#A7B4C5]">Logged as: {currentUser.name} ({currentRole})</span>
        </div>

        <form onSubmit={handleAddMilestone} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#A7B4C5] block mb-1">Advance to Milestone Step:</label>
              <select
                value={newStepName}
                onChange={(e) => setNewStepName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
              >
                {STANDARD_STAGES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#A7B4C5] block mb-1">Operational Notes / Scale Ticket Ref:</label>
              <input
                type="text"
                required
                placeholder="e.g. Weigh scale ticket #WS-4819 verified 12,000 L at facility gate..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#A7B4C5]">
              * Milestone submissions are immutably signed to the organization audit log.
            </span>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#22C55E] text-[#0B1220] hover:brightness-110 active:brightness-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Certified Milestone</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
