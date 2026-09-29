import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CollectionRequest } from '../../types';
import { 
  Truck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck
} from 'lucide-react';

export const CollectionRequestsView: React.FC = () => {
  const { 
    collectionRequests, 
    updateCollectionRequestStatus, 
    currentRole, 
    setActiveTab, 
    setSelectedListingId 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRequests = collectionRequests.filter(r => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  const getStatusBadge = (status: CollectionRequest['status']) => {
    switch (status) {
      case 'Completed':
        return <span className="text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded text-xs font-semibold border border-[#22C55E]/30">Completed & Verified</span>;
      case 'Picked Up':
      case 'Delivered':
        return <span className="text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded text-xs font-semibold border border-[#06B6D4]/30">{status}</span>;
      case 'Scheduled':
      case 'Accepted':
        return <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded text-xs font-semibold border border-amber-400/30">{status}</span>;
      case 'Rejected':
        return <span className="text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded text-xs font-semibold border border-rose-400/30">Rejected</span>;
      default:
        return <span className="text-[#A7B4C5] bg-[#162437] px-2 py-0.5 rounded text-xs font-semibold border border-[#29394D]">Pending Review</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#29394D]">
        <div>
          <h2 className="text-2xl font-bold text-[#F8FAFC] font-heading">
            Collection & Logistics Requests
          </h2>
          <p className="text-xs text-[#A7B4C5]">
            Manage dispatch requests, schedule transport tankers, and update verified treatment milestones.
          </p>
        </div>

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl bg-[#162437] border border-[#29394D] text-[#A7B4C5] focus:border-[#22C55E] focus:outline-none"
        >
          <option value="all">All Statuses ({collectionRequests.length})</option>
          <option value="Pending">Pending</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Picked Up">Picked Up</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Role permission info banner */}
      <div className="p-3.5 rounded-xl bg-[#101C2C] border border-[#29394D] text-xs text-[#A7B4C5] flex items-center justify-between">
        <span>
          Current Active Role: <strong className="text-[#F8FAFC] capitalize">{currentRole}</strong> · 
          {currentRole === 'facility' || currentRole === 'recycler' 
            ? ' You have authority to advance intake milestones & weigh tickets.'
            : ' Generator view with real-time transit status monitoring.'}
        </span>
        <button
          onClick={() => setActiveTab('lifecycle')}
          className="text-xs text-[#22C55E] hover:underline shrink-0"
        >
          Open Master Lifecycle Tracker →
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#162437] border border-[#29394D]">
            <Truck className="w-8 h-8 text-[#A7B4C5] mx-auto mb-2" />
            <div className="text-sm font-semibold text-[#F8FAFC]">No collection requests found</div>
            <p className="text-xs text-[#A7B4C5] mt-1">Submit pickup bookings via the Recommendations or Listings page.</p>
          </div>
        ) : (
          filteredRequests.map(req => (
            <div
              key={req.id}
              className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] hover:border-[#14B8A6]/40 transition-all space-y-4 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#06B6D4] font-semibold">
                      REQ #{req.id}
                    </span>
                    <span aria-hidden="true" className="text-[#29394D]">·</span>
                    {getStatusBadge(req.status)}
                  </div>
                  <h3 className="text-base font-bold text-[#F8FAFC] font-heading">
                    {req.listingTitle}
                  </h3>
                  <div className="text-xs text-[#A7B4C5] flex flex-wrap items-center gap-3">
                    <span>Generator: <strong className="text-[#F8FAFC]">{req.generatorOrgName}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Carrier/Facility: <strong className="text-[#22C55E]">{req.facilityName}</strong></span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-[#A7B4C5]">Batch Volume:</div>
                  <div className="text-lg font-bold font-mono text-[#F8FAFC] tabular-nums">
                    {req.quantity} {req.unit}
                  </div>
                  <div className="text-xs text-[#22C55E] font-medium">{req.estimatedCostOrValue}</div>
                </div>
              </div>

              {/* Transit Details & Special Instructions */}
              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#29394D]/60 text-xs text-[#A7B4C5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <strong className="text-[#F8FAFC] block mb-0.5">Handling Instructions:</strong>
                  <span>{req.specialInstructions || 'Standard carrier loading dock procedures.'}</span>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[11px]">Requested Date: <strong className="text-[#F8FAFC]">{req.requestDate}</strong></div>
                  <div className="text-[11px]">Scheduled Pickup: <strong className="text-[#22C55E]">{req.scheduledPickupDate || 'Awaiting slot'}</strong></div>
                </div>
              </div>

              {/* Operator Milestone Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#29394D]">
                <button
                  onClick={() => {
                    setSelectedListingId(req.listingId);
                    setActiveTab('lifecycle');
                  }}
                  className="text-xs font-semibold text-[#06B6D4] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Inspect Timeline & Manifest</span>
                </button>

                {/* Milestone Progression Buttons (For Recycler / Facility / Admin) */}
                <div className="flex items-center gap-2">
                  {req.status === 'Pending' && (
                    <button
                      onClick={() => updateCollectionRequestStatus(req.id, 'Scheduled')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#22C55E] text-[#0B1220] rounded-lg hover:brightness-110 transition-all cursor-pointer"
                    >
                      Accept & Schedule
                    </button>
                  )}
                  {req.status === 'Scheduled' && (
                    <button
                      onClick={() => updateCollectionRequestStatus(req.id, 'Picked Up')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#06B6D4] text-[#0B1220] rounded-lg hover:brightness-110 transition-all cursor-pointer"
                    >
                      Confirm Tanker Pickup
                    </button>
                  )}
                  {req.status === 'Picked Up' && (
                    <button
                      onClick={() => updateCollectionRequestStatus(req.id, 'Delivered')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#14B8A6] text-[#0B1220] rounded-lg hover:brightness-110 transition-all cursor-pointer"
                    >
                      Gate Intake Verified
                    </button>
                  )}
                  {req.status === 'Delivered' && (
                    <button
                      onClick={() => updateCollectionRequestStatus(req.id, 'Completed')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#22C55E] text-[#0B1220] rounded-lg hover:brightness-110 transition-all cursor-pointer"
                    >
                      Mark Treatment Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
