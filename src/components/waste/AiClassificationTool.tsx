import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  ArrowRight, 
  ShieldAlert, 
  Upload, 
  FlaskConical,
  RotateCcw
} from 'lucide-react';
import { classifyWasteWithAI } from '../../services/aiService';
import { AIClassificationResult, PhysicalState } from '../../types';
import { useApp } from '../../context/AppContext';

export const AiClassificationTool: React.FC = () => {
  const { setIsRegisterModalOpen } = useApp();

  const [title, setTitle] = useState('Etching Rinse Effluent with Fluoride & Nitric Residues');
  const [physicalState, setPhysicalState] = useState<PhysicalState>('Liquid');
  const [description, setDescription] = useState('Semiconductor wafer acid etching rinse overflow. Acidic bath dragout containing diluted nitric acid and hydrofluoric acid traces. Clarifier pit holding 8,000 L.');
  const [chemicalComposition, setChemicalComposition] = useState('Nitric acid HNO3 ~1.2%, HF ~0.3%, Fluoride ions 280 ppm, dissolved Silicon.');
  const [treatmentHistory, setTreatmentHistory] = useState('Equalization basin only, awaiting specialized neutralization.');
  const [intendedPreference, setIntendedPreference] = useState('Neutralization / Treatment');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIClassificationResult | null>(null);

  const handleRunClassification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await classifyWasteWithAI({
        title,
        physicalState,
        description,
        chemicalComposition,
        treatmentHistory,
        intendedPreference
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = (sampleType: 'polymer' | 'metal' | 'chemical') => {
    if (sampleType === 'polymer') {
      setTitle('Injection Molding Post-Industrial Polypropylene Runners');
      setPhysicalState('Solid');
      setDescription('Virgin-derived homopolymer polypropylene sprues from automotive trim molding. Clean, unpigmented, dry.');
      setChemicalComposition('Polypropylene homopolymer CAS# 9003-07-0 (>99%), heat stabilizer (<0.2%). No halogenated flame retardants.');
      setTreatmentHistory('Clean air-cooled granulator trim.');
      setIntendedPreference('Recycle for Reuse');
    } else if (sampleType === 'metal') {
      setTitle('Centrifuged 6061-T6 Aluminum CNC Machining Turnings');
      setPhysicalState('Solid');
      setDescription('Dry aluminum alloy machining swarf from aerospace bracket milling. Centrifuged to remove synthetic water-soluble coolant.');
      setChemicalComposition('6061-T6 Aluminum alloy: Al balance, Mg 1.0%, Si 0.6%, Cu 0.28%. Residual moisture <0.7%.');
      setTreatmentHistory('Chip wringer centrifuge de-oiled.');
      setIntendedPreference('Material Recovery');
    } else {
      setTitle('Etching Rinse Effluent with Fluoride & Nitric Residues');
      setPhysicalState('Liquid');
      setDescription('Semiconductor wafer acid etching rinse overflow. Acidic bath dragout containing diluted nitric acid and hydrofluoric acid traces. Clarifier pit holding 8,000 L.');
      setChemicalComposition('Nitric acid HNO3 ~1.2%, HF ~0.3%, Fluoride ions 280 ppm, dissolved Silicon.');
      setTreatmentHistory('Equalization basin only, awaiting specialized neutralization.');
      setIntendedPreference('Neutralization / Treatment');
    }
    setResult(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-[#29394D]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#06B6D4]" />
          <span>AI Waste Specification & Recovery Screener</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-heading">
          AI-Assisted Waste Stream Classification
        </h2>
        <p className="text-sm text-[#A7B4C5] leading-relaxed">
          Input industrial byproduct parameters to receive preliminary categorization, identify critical missing laboratory tests, and evaluate circular recovery compatibility.
        </p>
      </div>

      {/* Mandatory Scope & Safety Disclaimer Card */}
      <div className="p-4 rounded-xl bg-[#101C2C] border border-amber-500/30 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-[#A7B4C5]">
          <span className="font-semibold text-[#F8FAFC] block">
            Laboratory Testing & Regulatory Verification Boundary
          </span>
          <p className="text-[11px] leading-relaxed">
            AI suggestions are screening tools only and do not replace accredited laboratory certified testing (EPA / ISO 17025) or jurisdictional compliance permits. AI models do not determine chemical composition from photos alone. Hazardous waste must only be transferred to authorized, licensed treatment facilities.
          </p>
        </div>
      </div>

      {/* Quick Sample Presets */}
      <div className="flex items-center gap-2 text-xs text-[#A7B4C5] overflow-x-auto pb-1">
        <span className="shrink-0 font-medium">Load Industrial Sample:</span>
        <button
          type="button"
          onClick={() => handleLoadSample('chemical')}
          className="px-3 py-1.5 rounded-lg bg-[#162437] hover:bg-[#101C2C] text-[#F8FAFC] border border-[#29394D] transition-colors whitespace-nowrap cursor-pointer"
        >
          Acidic Effluent Rinse
        </button>
        <button
          type="button"
          onClick={() => handleLoadSample('polymer')}
          className="px-3 py-1.5 rounded-lg bg-[#162437] hover:bg-[#101C2C] text-[#F8FAFC] border border-[#29394D] transition-colors whitespace-nowrap cursor-pointer"
        >
          Polypropylene Scrap
        </button>
        <button
          type="button"
          onClick={() => handleLoadSample('metal')}
          className="px-3 py-1.5 rounded-lg bg-[#162437] hover:bg-[#101C2C] text-[#F8FAFC] border border-[#29394D] transition-colors whitespace-nowrap cursor-pointer"
        >
          Aluminum CNC Turnings
        </button>
      </div>

      {/* Main 2-Column: Input Form + AI Results Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <form onSubmit={handleRunClassification} className="lg:col-span-6 p-6 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4 shadow-lg">
          <div>
            <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
              Waste Listing Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
                Physical State *
              </label>
              <select
                value={physicalState}
                onChange={(e) => setPhysicalState(e.target.value as PhysicalState)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
              >
                <option value="Solid">Solid</option>
                <option value="Liquid">Liquid / Aqueous</option>
                <option value="Sludge">Sludge / Cake</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
                Target Preference
              </label>
              <select
                value={intendedPreference}
                onChange={(e) => setIntendedPreference(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
              >
                <option value="Recycle for Reuse">Recycle for Reuse</option>
                <option value="Material Recovery">Material Recovery</option>
                <option value="Neutralization / Treatment">Neutralization / Treatment</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
              Stream Description & Upstream Origin
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
              Known Chemical Formulation & Impurities
            </label>
            <textarea
              rows={2}
              value={chemicalComposition}
              onChange={(e) => setChemicalComposition(e.target.value)}
              placeholder="e.g. CAS numbers, acid percentages, heavy metal parts per million (ppm)..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
              Prior Treatment History
            </label>
            <input
              type="text"
              value={treatmentHistory}
              onChange={(e) => setTreatmentHistory(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#22C55E] text-[#0B1220] font-bold text-xs tracking-wider uppercase hover:brightness-110 active:brightness-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#06B6D4]/15"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Running Molecular AI Analysis...' : 'Classify Industrial Stream'}</span>
          </button>
        </form>

        {/* Right AI Results Dossier */}
        <div className="lg:col-span-6 space-y-4">
          {isLoading && (
            <div className="p-12 rounded-2xl bg-[#162437] border border-[#29394D] text-center space-y-3">
              <div className="w-10 h-10 border-3 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-sm font-bold text-[#F8FAFC] font-heading">
                Synthesizing Environmental Specification...
              </div>
              <p className="text-xs text-[#A7B4C5]">
                Cross-referencing RCRA hazard criteria, ASTM testing protocols, and circular recovery benchmarks.
              </p>
            </div>
          )}

          {!isLoading && !result && (
            <div className="p-12 rounded-2xl bg-[#162437] border border-dashed border-[#29394D] text-center space-y-2">
              <FlaskConical className="w-8 h-8 text-[#A7B4C5] mx-auto" />
              <div className="text-sm font-semibold text-[#F8FAFC]">
                Ready to Analyze Industrial Stream
              </div>
              <p className="text-xs text-[#A7B4C5] max-w-sm mx-auto">
                Fill the stream profile on the left or select a sample preset to generate a certified screening dossier.
              </p>
            </div>
          )}

          {!isLoading && result && (
            <div className="p-6 rounded-2xl bg-[#162437] border border-[#22C55E]/40 space-y-5 shadow-2xl animate-in fade-in duration-200">
              {/* Classification Result Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#29394D]">
                <div>
                  <div className="text-xs font-mono text-[#06B6D4] uppercase">AI Classification Recommendation</div>
                  <h3 className="text-lg font-bold text-[#22C55E] font-heading mt-0.5">
                    {result.suggestedCategory}
                  </h3>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border ${
                  result.confidenceLabel === 'High Probability'
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800'
                    : 'bg-amber-950/40 text-amber-400 border-amber-800'
                }`}>
                  {result.confidenceLabel}
                </span>
              </div>

              {/* Supporting Factors */}
              <div className="space-y-1.5 text-xs">
                <div className="font-semibold text-[#F8FAFC] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Supporting Evidence from Submission:</span>
                </div>
                <ul className="space-y-1 pl-5 list-disc text-[#A7B4C5]">
                  {result.explanation.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Missing Information Checklist */}
              {result.missingInformation.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs space-y-1.5">
                  <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Identified Missing Parameters:</span>
                  </div>
                  <ul className="space-y-1 pl-5 list-disc text-[#A7B4C5]">
                    {result.missingInformation.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Accredited Testing */}
              <div className="space-y-1.5 text-xs">
                <div className="font-semibold text-[#06B6D4] flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Recommended Laboratory Tests:</span>
                </div>
                <div className="space-y-1">
                  {result.recommendedTesting.map((test, i) => (
                    <div key={i} className="p-2 rounded-lg bg-[#0B1220] border border-[#29394D]/60 text-[#F8FAFC] text-[11px]">
                      {test}
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential Recovery Pathways */}
              <div className="space-y-1.5 text-xs">
                <div className="font-semibold text-[#22C55E] flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Supported Circular Recovery Pathways:</span>
                </div>
                <div className="space-y-1">
                  {result.potentialRecoveryPathways.map((pw, i) => (
                    <div key={i} className="p-2 rounded-lg bg-[#101C2C] border border-[#22C55E]/30 text-[#22C55E] text-[11px] font-medium">
                      {pw}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action: Transfer to Registration */}
              <div className="pt-2 border-t border-[#29394D]">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#22C55E] hover:brightness-110 active:brightness-95 text-[#0B1220] font-semibold text-xs tracking-wide uppercase transition-all cursor-pointer text-center"
                >
                  Apply to Official Waste Listing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
