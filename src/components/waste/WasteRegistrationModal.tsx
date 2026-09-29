import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WasteCategory, PhysicalState, HazardousStatus } from '../../types';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Upload, 
  AlertTriangle, 
  FileText, 
  Sparkles,
  ShieldAlert,
  Building2,
  Calendar,
  Layers
} from 'lucide-react';
import { classifyWasteWithAI } from '../../services/aiService';

export const WasteRegistrationModal: React.FC = () => {
  const { isRegisterModalOpen, setIsRegisterModalOpen, addListing, currentUser } = useApp();

  const [step, setStep] = useState(1);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<WasteCategory>('Plastic and Polymer Waste');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<'kg' | 'MT' | 'litres' | 'm³'>('MT');
  const [physicalState, setPhysicalState] = useState<PhysicalState>('Solid');
  const [generationDate, setGenerationDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickupAddress, setPickupAddress] = useState('100 Foundry Way, Loading Dock C');
  const [packaging, setPackaging] = useState('Standard 1,000 kg baffled FIBC bulk bags');
  const [chemicalComposition, setChemicalComposition] = useState('');
  const [treatmentHistory, setTreatmentHistory] = useState('Unprocessed production line excess');
  const [intendedPreference, setIntendedPreference] = useState<'Recycle for Reuse' | 'Material Recovery' | 'Neutralization / Treatment' | 'Open to Matching'>('Recycle for Reuse');
  const [hazardousStatus, setHazardousStatus] = useState<HazardousStatus>('Unknown (Requires Testing)');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);

  if (!isRegisterModalOpen) return null;

  const categories: WasteCategory[] = [
    'Plastic and Polymer Waste',
    'Metal Scrap',
    'Paper and Packaging',
    'Textile Waste',
    'Organic / Biodegradable Waste',
    'Industrial Wastewater',
    'Chemical Waste',
    'Industrial Sludge',
    'E-Waste',
    'Other Industrial By-Products'
  ];

  const handleAiAutoClassify = async () => {
    if (!title && !description) {
      alert('Please fill in a title and brief description first so the AI can analyze your waste stream.');
      return;
    }
    setIsAiLoading(true);
    try {
      const result = await classifyWasteWithAI({
        title,
        description,
        physicalState,
        chemicalComposition,
        treatmentHistory,
        intendedPreference
      });
      setAiSuggestions(result);
      if (result.suggestedCategory && categories.includes(result.suggestedCategory)) {
        setCategory(result.suggestedCategory);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !quantity) {
      alert('Please fill in the required fields.');
      return;
    }

    const numQty = parseFloat(quantity) || 1;

    addListing({
      title,
      organizationId: currentUser.organizationId,
      organizationName: currentUser.organizationName,
      category,
      description: description || 'Industrial byproduct batch logged for circular recovery.',
      quantity: numQty,
      unit,
      physicalState,
      hazardousStatus,
      generationDate,
      pickupLocation: {
        address: pickupAddress,
        city: 'Detroit',
        state: 'MI',
        approxLat: 42.3314,
        approxLng: -83.0458
      },
      packaging,
      chemicalComposition,
      documents: uploadedDocName ? [
        {
          name: uploadedDocName,
          type: 'SDS',
          url: '#',
          date: generationDate
        }
      ] : [],
      photos: [],
      treatmentHistory,
      intendedPreference,
      status: 'Pending Review',
      isMarketplaceVisible: hazardousStatus !== 'Hazardous'
    });

    setIsRegisterModalOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#162437] border border-[#29394D] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#29394D] flex items-center justify-between bg-[#101C2C]">
          <div>
            <div className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
              Step {step} of 4 · Industrial Waste Intake
            </div>
            <h2 className="text-lg font-bold text-[#F8FAFC] font-heading">
              Register Industrial Waste Stream
            </h2>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="p-1.5 text-[#A7B4C5] hover:text-[#F8FAFC] rounded-lg hover:bg-[#162437]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 border-b border-[#29394D] text-xs font-medium text-center">
          <div className={`py-2 border-b-2 transition-colors ${step >= 1 ? 'border-[#22C55E] text-[#22C55E]' : 'border-transparent text-[#A7B4C5]'}`}>
            1. Classification
          </div>
          <div className={`py-2 border-b-2 transition-colors ${step >= 2 ? 'border-[#22C55E] text-[#22C55E]' : 'border-transparent text-[#A7B4C5]'}`}>
            2. Logistics
          </div>
          <div className={`py-2 border-b-2 transition-colors ${step >= 3 ? 'border-[#22C55E] text-[#22C55E]' : 'border-transparent text-[#A7B4C5]'}`}>
            3. Composition & SDS
          </div>
          <div className={`py-2 border-b-2 transition-colors ${step >= 4 ? 'border-[#22C55E] text-[#22C55E]' : 'border-transparent text-[#A7B4C5]'}`}>
            4. Review & Submit
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* STEP 1: Basic Classification */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                  Waste Listing Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Polypropylene Injection Runner Scrap — 3.2 MT"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                    Physical State *
                  </label>
                  <select
                    value={physicalState}
                    onChange={(e) => setPhysicalState(e.target.value as PhysicalState)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                  >
                    <option value="Solid">Solid</option>
                    <option value="Liquid">Liquid (Effluent/Water)</option>
                    <option value="Sludge">Sludge / Filter Cake</option>
                    <option value="Mixed">Mixed Phase</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                    Waste Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as WasteCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#F8FAFC]">
                    Stream Description & Manufacturing Origin
                  </label>
                  <button
                    type="button"
                    onClick={handleAiAutoClassify}
                    disabled={isAiLoading}
                    className="text-xs text-[#06B6D4] hover:text-[#22C55E] font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAiLoading ? 'Analyzing...' : 'AI Auto-Classify'}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  placeholder="Describe manufacturing origin, contamination history, physical appearance, and clean handling conditions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none leading-relaxed"
                />
              </div>

              {aiSuggestions && (
                <div className="p-3.5 rounded-xl bg-[#101C2C] border border-[#06B6D4]/40 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[#06B6D4] font-semibold">
                    <span>AI Assistant Recommendation: {aiSuggestions.suggestedCategory}</span>
                    <span className="font-mono text-[10px]">{aiSuggestions.confidenceLabel}</span>
                  </div>
                  <p className="text-[#A7B4C5] text-[11px] leading-relaxed">
                    {aiSuggestions.explanation?.[0]}
                  </p>
                  <div className="text-[10px] text-amber-400">
                    * Preliminary AI recommendation. Final classification confirmed upon lab report review.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Quantities & Logistics */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="e.g. 3.2 or 500"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                    Unit of Measure *
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                  >
                    <option value="MT">Metric Tons (MT)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="litres">Litres (L)</option>
                    <option value="m³">Cubic Meters (m³)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                  Packaging & Storage Container Details
                </label>
                <input
                  type="text"
                  placeholder="e.g. FIBC 1-ton bulk bags, 55-gal steel drums, IBC totes, roll-off dumpster"
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                  Pickup Facility Loading Address
                </label>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
                <span className="text-[11px] text-[#A7B4C5] mt-1 block">
                  Exact street address is shielded from public browsing until authorized collection scheduling.
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                  Generation Date
                </label>
                <input
                  type="date"
                  value={generationDate}
                  onChange={(e) => setGenerationDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Composition, Hazardousness & SDS */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                  Known Chemical Composition / Ingredients (if available)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 99% Polypropylene homopolymer CAS# 9003-07-0, 0.2% heat stabilizer, 0% toxic additives"
                  value={chemicalComposition}
                  onChange={(e) => setChemicalComposition(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                  Hazardous Classification *
                </label>
                <select
                  value={hazardousStatus}
                  onChange={(e) => setHazardousStatus(e.target.value as HazardousStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                >
                  <option value="Non-Hazardous">Non-Hazardous (Standard Industrial Stream)</option>
                  <option value="Hazardous">Hazardous (Regulated RCRA / Corrosive / Toxic / Flammable)</option>
                  <option value="Unknown (Requires Testing)">Unknown (Requires Accredited Lab Testing)</option>
                </select>
                <div className="mt-1.5 flex items-start gap-2 text-[11px] text-amber-400 bg-amber-950/20 p-2 rounded-lg border border-amber-800/40">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>
                    <strong>Platform Safety Rule:</strong> Unknown streams are never automatically classified as safe. Hazardous streams are routed exclusively to certified HazMat processors.
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                  Upload Safety Data Sheet (SDS) or Lab Report
                </label>
                <div 
                  onClick={() => setUploadedDocName('Safety-Data-Sheet-Batch-Certificate.pdf')}
                  className="p-4 rounded-xl border border-dashed border-[#29394D] hover:border-[#22C55E] bg-[#0B1220] text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-5 h-5 text-[#A7B4C5] mx-auto mb-1" />
                  <div className="text-xs font-medium text-[#F8FAFC]">
                    {uploadedDocName ? uploadedDocName : 'Click to attach sample SDS or ICP lab report'}
                  </div>
                  <div className="text-[10px] text-[#A7B4C5]">PDF, DOCX, or scan up to 25MB</div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F8FAFC] block mb-1.5">
                  Intended Recovery Preference
                </label>
                <select
                  value={intendedPreference}
                  onChange={(e) => setIntendedPreference(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                >
                  <option value="Recycle for Reuse">Recycle for Direct Reuse</option>
                  <option value="Material Recovery">Material Recovery / Secondary Scrap</option>
                  <option value="Neutralization / Treatment">Neutralization / Treatment Plant (ETP/ZLD)</option>
                  <option value="Open to Matching">Open to Best Available Authorized Match</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: Review Before Submission */}
          {step === 4 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#101C2C] border border-[#29394D] space-y-2">
                <div className="text-xs font-bold text-[#22C55E] uppercase tracking-wider mb-2">
                  Summary Verification
                </div>
                <div className="grid grid-cols-2 gap-2 text-[#A7B4C5]">
                  <div>Title: <strong className="text-[#F8FAFC] block">{title}</strong></div>
                  <div>Category: <strong className="text-[#F8FAFC] block">{category}</strong></div>
                  <div>Quantity: <strong className="text-[#F8FAFC] block">{quantity} {unit}</strong></div>
                  <div>Physical State: <strong className="text-[#F8FAFC] block">{physicalState}</strong></div>
                  <div>Hazard Status: <strong className={hazardousStatus === 'Hazardous' ? 'text-rose-400 block' : 'text-[#22C55E] block'}>{hazardousStatus}</strong></div>
                  <div>Recovery Preference: <strong className="text-[#06B6D4] block">{intendedPreference}</strong></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#A7B4C5] text-[11px] leading-relaxed">
                By submitting, you certify that provided specifications reflect known plant measurements. Waste2Worth will screen the entry and match certified regional recyclers and treatment facilities.
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-[#29394D] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-[#A7B4C5] hover:text-[#F8FAFC] flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 text-xs font-semibold text-[#0B1220] bg-[#22C55E] hover:brightness-110 rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-[#0B1220] bg-gradient-to-r from-[#22C55E] to-[#14B8A6] hover:brightness-110 rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#22C55E]/20 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Register Waste</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
