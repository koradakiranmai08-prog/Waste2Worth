import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WasteListing, WasteCategory, HazardousStatus } from '../../types';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ArrowRight, 
  ExternalLink, 
  Droplet, 
  Recycle, 
  FileText, 
  AlertTriangle,
  Building2,
  Clock,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface MyWasteListingsProps {
  onSelectListing: (id: string) => void;
}

export const MyWasteListings: React.FC<MyWasteListingsProps> = ({ onSelectListing }) => {
  const { listings, setIsRegisterModalOpen, setActiveTab, setSelectedListingId } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredListings = listings.filter(l => {
    const matchesCat = filterCategory === 'all' || l.category === filterCategory;
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) || 
                          l.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getStatusBadge = (status: WasteListing['status']) => {
    switch (status) {
      case 'Recycled / Recovered':
        return <span className="text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded text-[11px] font-semibold border border-[#22C55E]/30">Recycled / Recovered</span>;
      case 'In Transit':
      case 'Processing':
        return <span className="text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded text-[11px] font-semibold border border-[#06B6D4]/30">{status}</span>;
      case 'Collection Scheduled':
      case 'Matched':
        return <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-400/30">{status}</span>;
      default:
        return <span className="text-[#A7B4C5] bg-[#162437] px-2 py-0.5 rounded text-[11px] font-semibold border border-[#29394D]">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#29394D]">
        <div>
          <h2 className="text-2xl font-bold text-[#F8FAFC] font-heading">
            Registered Industrial Waste Listings
          </h2>
          <p className="text-xs text-[#A7B4C5]">
            Manage industrial batches, track compliance screening, and inspect lifecycle progress.
          </p>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#14B8A6] text-[#0B1220] font-semibold text-xs hover:brightness-110 active:brightness-95 transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register New Waste</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A7B4C5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search listings by title, material, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#162437] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl bg-[#162437] border border-[#29394D] text-[#A7B4C5] focus:border-[#22C55E] focus:outline-none"
        >
          <option value="all">All Categories ({listings.length})</option>
          <option value="Plastic and Polymer Waste">Plastic & Polymer</option>
          <option value="Metal Scrap">Metal Scrap</option>
          <option value="Industrial Wastewater">Industrial Wastewater</option>
          <option value="Chemical Waste">Chemical Waste</option>
          <option value="Paper and Packaging">Paper & Packaging</option>
          <option value="Textile Waste">Textile Waste</option>
        </select>
      </div>

      {/* Listings Table / Cards */}
      <div className="space-y-4">
        {filteredListings.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#162437] border border-[#29394D]">
            <Recycle className="w-8 h-8 text-[#A7B4C5] mx-auto mb-2" />
            <div className="text-sm font-semibold text-[#F8FAFC]">No matching waste listings found</div>
            <p className="text-xs text-[#A7B4C5] mt-1">Try adjusting search or register a new industrial stream.</p>
          </div>
        ) : (
          filteredListings.map(listing => (
            <div
              key={listing.id}
              className="p-5 rounded-2xl bg-[#162437] border border-[#29394D] hover:border-[#14B8A6]/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-[#06B6D4] font-semibold">
                    {listing.category}
                  </span>
                  <span aria-hidden="true" className="text-[#29394D]">·</span>
                  <span className="text-xs text-[#A7B4C5] font-mono">
                    {listing.physicalState} Phase
                  </span>
                  <span aria-hidden="true" className="text-[#29394D]">·</span>
                  {getStatusBadge(listing.status)}
                </div>

                <h3 className="text-base font-bold text-[#F8FAFC] font-heading">
                  {listing.title}
                </h3>

                <p className="text-xs text-[#A7B4C5] line-clamp-2 leading-relaxed">
                  {listing.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#A7B4C5] pt-1">
                  <div>
                    Quantity: <strong className="text-[#F8FAFC] font-mono tabular-nums">{listing.quantity} {listing.unit}</strong>
                  </div>
                  <span aria-hidden="true">·</span>
                  <div>
                    Hazard: <strong className={listing.hazardousStatus === 'Hazardous' ? 'text-rose-400 font-semibold' : 'text-[#22C55E] font-semibold'}>
                      {listing.hazardousStatus}
                    </strong>
                  </div>
                  {listing.matchedFacilityName && (
                    <>
                      <span aria-hidden="true">·</span>
                      <div className="text-[#06B6D4]">
                        Matched to: <strong>{listing.matchedFacilityName}</strong>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setSelectedListingId(listing.id);
                    onSelectListing(listing.id);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#0B1220] hover:bg-[#101C2C] text-[#22C55E] border border-[#29394D] hover:border-[#22C55E] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timeline</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedListingId(listing.id);
                    setActiveTab('recommendations');
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#0B1220] hover:bg-[#101C2C] text-[#06B6D4] border border-[#29394D] hover:border-[#06B6D4] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Recycler Matches</span>
                </button>

                {listing.category === 'Industrial Wastewater' && (
                  <button
                    onClick={() => {
                      setActiveTab('water-risk');
                    }}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Droplet className="w-3.5 h-3.5" />
                    <span>Water Risk</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
