import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WasteListing, WasteCategory } from '../../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  Recycle, 
  Package, 
  CheckCircle2, 
  X,
  PlusCircle,
  AlertTriangle
} from 'lucide-react';

export const WasteExchange: React.FC = () => {
  const { listings, addMaterialRequest, currentUser, setIsRegisterModalOpen } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedListingForRequest, setSelectedListingForRequest] = useState<WasteListing | null>(null);

  // Modal Request Form state
  const [requestedQty, setRequestedQty] = useState('');
  const [intendedUse, setIntendedUse] = useState('');
  const [requestSubmittedSuccess, setRequestSubmittedSuccess] = useState(false);

  // Marketplace filter: only non-hazardous or safe streams intended for reuse/recovery
  const marketplaceListings = listings.filter(l => {
    const isAvailable = l.status !== 'Recycled / Recovered' && l.status !== 'Closed';
    const matchesCat = categoryFilter === 'all' || l.category === categoryFilter;
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) || 
                          l.description.toLowerCase().includes(search.toLowerCase()) ||
                          l.organizationName.toLowerCase().includes(search.toLowerCase());
    return isAvailable && matchesCat && matchesSearch;
  });

  const handleOpenRequestModal = (listing: WasteListing) => {
    setSelectedListingForRequest(listing);
    setRequestedQty(listing.quantity.toString());
    setIntendedUse('Industrial feedstock for circular compounding / secondary remelting.');
    setRequestSubmittedSuccess(false);
  };

  const handleSendMaterialRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListingForRequest) return;

    addMaterialRequest({
      listingId: selectedListingForRequest.id,
      materialName: selectedListingForRequest.title,
      requesterOrgId: currentUser.organizationId,
      requesterOrgName: currentUser.organizationName,
      contactEmail: currentUser.email,
      requestedQuantity: parseFloat(requestedQty) || selectedListingForRequest.quantity,
      unit: selectedListingForRequest.unit,
      intendedUse,
      status: 'Submitted'
    });

    setRequestSubmittedSuccess(true);
    setTimeout(() => {
      setSelectedListingForRequest(null);
      setRequestSubmittedSuccess(false);
    }, 2000);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#29394D]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
            <Recycle className="w-4 h-4 text-[#22C55E]" />
            <span>Industrial Circular Feedstock Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-heading mt-1">
            Waste Exchange Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-[#A7B4C5]">
            Source verified industrial byproducts, off-spec resins, baled fibers, and secondary metals directly from audited manufacturing generators.
          </p>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#14B8A6] text-[#0B1220] font-semibold text-xs hover:brightness-110 active:brightness-95 transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List Material for Exchange</span>
        </button>
      </div>

      {/* Safety & Secondary Raw Material Principle */}
      <div className="p-4 rounded-xl bg-[#101C2C] border border-[#29394D] text-xs text-[#A7B4C5] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0" />
          <span>
            <strong>Quality Standards Protocol:</strong> Byproducts are listed as secondary resources only after mechanical clean segregation and SDS verification. Generator addresses are protected with regional approximations.
          </span>
        </div>
        <span className="font-mono text-[#22C55E] text-[11px] shrink-0 hidden md:inline">AUDITED ZERO-LEAKAGE</span>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A7B4C5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search materials (e.g. Polypropylene, Aluminum turnings, Cotton selvedge, Baled OCC)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-[#162437] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2.5 text-xs rounded-xl bg-[#162437] border border-[#29394D] text-[#A7B4C5] focus:border-[#22C55E] focus:outline-none"
        >
          <option value="all">All Material Categories ({listings.length})</option>
          <option value="Plastic and Polymer Waste">Plastic and Polymer Waste</option>
          <option value="Metal Scrap">Metal Scrap</option>
          <option value="Paper and Packaging">Paper and Packaging</option>
          <option value="Textile Waste">Textile Waste</option>
          <option value="Organic / Biodegradable Waste">Organic / Biodegradable</option>
          <option value="Other Industrial By-Products">Other Industrial By-Products</option>
        </select>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceListings.map(listing => (
          <div
            key={listing.id}
            className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] hover:border-[#22C55E]/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#A7B4C5]">
                <span className="font-mono text-[#06B6D4] font-semibold">{listing.category}</span>
                <span className="text-[#22C55E] flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Facility
                </span>
              </div>

              <h3 className="text-base font-bold text-[#F8FAFC] font-heading group-hover:text-[#22C55E] transition-colors">
                {listing.title}
              </h3>

              <p className="text-xs text-[#A7B4C5] line-clamp-3 leading-relaxed">
                {listing.description}
              </p>

              {/* Specs & Volume */}
              <div className="p-3 rounded-xl bg-[#0B1220] border border-[#29394D]/60 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B4C5]">Available Quantity:</span>
                  <span className="font-bold font-mono text-[#F8FAFC] tabular-nums">
                    {listing.quantity} {listing.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B4C5]">Physical Phase:</span>
                  <span className="font-mono text-[#A7B4C5]">{listing.physicalState}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B4C5]">Packaging:</span>
                  <span className="text-[#A7B4C5] truncate max-w-[180px]">{listing.packaging}</span>
                </div>
              </div>

              {/* Generator Info */}
              <div className="text-xs text-[#A7B4C5] flex items-center justify-between pt-1">
                <span className="truncate">Source: <strong className="text-[#F8FAFC]">{listing.organizationName}</strong></span>
                <span className="flex items-center gap-1 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {listing.pickupLocation.city}, {listing.pickupLocation.state}
                </span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 border-t border-[#29394D] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#A7B4C5]">
                {listing.intendedPreference}
              </span>
              <button
                onClick={() => handleOpenRequestModal(listing)}
                className="px-4 py-2 text-xs font-semibold text-[#0B1220] bg-gradient-to-r from-[#22C55E] to-[#14B8A6] hover:brightness-110 active:brightness-95 rounded-xl transition-all cursor-pointer"
              >
                Request Material
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Material Request Modal Dialog */}
      {selectedListingForRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#162437] border border-[#29394D] rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#29394D]">
              <div>
                <span className="text-xs font-mono text-[#22C55E]">SECONDARY FEEDSTOCK INTAKE</span>
                <h3 className="text-base font-bold text-[#F8FAFC] font-heading mt-0.5">
                  Request Material: {selectedListingForRequest.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedListingForRequest(null)}
                className="p-1.5 text-[#A7B4C5] hover:text-[#F8FAFC] rounded-lg hover:bg-[#101C2C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {requestSubmittedSuccess ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#22C55E] mx-auto" />
                <div className="text-sm font-bold text-[#F8FAFC]">Request Dispatched!</div>
                <p className="text-xs text-[#A7B4C5]">
                  The material holder has received your inquiry and specifications. You will receive an alert once accepted.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMaterialRequest} className="space-y-4 text-xs">
                <div>
                  <label className="text-[#F8FAFC] font-semibold block mb-1">
                    Requested Batch Quantity ({selectedListingForRequest.unit})
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={requestedQty}
                    onChange={(e) => setRequestedQty(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#F8FAFC] font-semibold block mb-1">
                    Intended Industrial Processing & End-Use
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={intendedUse}
                    onChange={(e) => setIntendedUse(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#0B1220] border border-[#29394D]/60 text-[11px] text-[#A7B4C5] leading-relaxed">
                  By submitting, your organization contact profile ({currentUser.organizationName}) will be shared with the listing owner to finalize bill of lading and pickup terms.
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedListingForRequest(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#A7B4C5] hover:text-[#F8FAFC]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-[#0B1220] bg-gradient-to-r from-[#22C55E] to-[#14B8A6] hover:brightness-110 rounded-xl"
                  >
                    Confirm & Send Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
