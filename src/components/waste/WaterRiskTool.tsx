import React, { useState } from 'react';
import { 
  Droplets, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  FileCheck, 
  HelpCircle,
  Building2,
  ArrowRight
} from 'lucide-react';
import { assessWaterRiskWithAI } from '../../services/aiService';
import { WaterRiskAssessment } from '../../types';
import { useApp } from '../../context/AppContext';

export const WaterRiskTool: React.FC = () => {
  const { setActiveTab } = useApp();

  const [ph, setPh] = useState<string>('3.8');
  const [cod, setCod] = useState<string>('480');
  const [bod, setBod] = useState<string>('160');
  const [tss, setTss] = useState<string>('120');
  const [heavyMetals, setHeavyMetals] = useState<string>('Dissolved Aluminum (42 ppm), Trace Hexavalent Chromium (0.08 ppm)');
  const [toxicSubstances, setToxicSubstances] = useState<string>('Sulfuric acid dragout (0.8%), fluorinated surfactants');
  const [quantity, setQuantity] = useState<string>('12000');
  const [unit, setUnit] = useState<string>('litres');
  const [distanceToWaterBody, setDistanceToWaterBody] = useState<string>('350');
  const [treatmentStatus, setTreatmentStatus] = useState<string>('Untreated raw effluent');
  const [dischargePathway, setDischargePathway] = useState<string>('Potential municipal stormwater retention canal');
  const [testSource, setTestSource] = useState<string>('Internal In-line Spectrometer Probe #4');

  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState<WaterRiskAssessment | null>(null);

  const handleAssess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await assessWaterRiskWithAI({
        ph,
        cod,
        bod,
        tss,
        heavyMetals,
        toxicSubstances,
        quantity,
        unit,
        distanceToWaterBody,
        treatmentStatus,
        dischargePathway
      });
      setAssessment(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreset = (type: 'acidic' | 'clean_rinse' | 'insufficient') => {
    if (type === 'acidic') {
      setPh('3.8');
      setCod('480');
      setBod('160');
      setTss('120');
      setHeavyMetals('Dissolved Aluminum (42 ppm), Chromium (0.08 ppm)');
      setDistanceToWaterBody('350');
      setTreatmentStatus('Untreated raw effluent');
    } else if (type === 'clean_rinse') {
      setPh('7.2');
      setCod('45');
      setBod('18');
      setTss('15');
      setHeavyMetals('None detected (<0.01 ppm)');
      setDistanceToWaterBody('1200');
      setTreatmentStatus('Secondary clarified & neutralized');
    } else {
      setPh('');
      setCod('');
      setBod('');
      setTss('');
      setHeavyMetals('');
      setDistanceToWaterBody('');
      setTreatmentStatus('Unknown / Unmeasured');
    }
    setAssessment(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-[#29394D]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
          <Droplets className="w-4 h-4 text-[#06B6D4]" />
          <span>Watershed Protection Screener</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-heading">
          Water Pollution Risk Assessment
        </h2>
        <p className="text-sm text-[#A7B4C5] leading-relaxed">
          Screen industrial wastewater, rinse effluent, and chemical leachate before transport or discharge to safeguard municipal aquifers, rivers, and coastal habitats.
        </p>
      </div>

      {/* Mandatory Regulatory Screening Disclaimer */}
      <div className="p-4 rounded-xl bg-[#101C2C] border border-[#06B6D4]/30 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
        <div className="space-y-1 text-[#A7B4C5]">
          <span className="font-semibold text-[#F8FAFC] block">
            Preliminary Screening Notice (Not Certified Legal Permitting)
          </span>
          <p className="text-[11px] leading-relaxed">
            This module provides non-binding screening guidance based on typical industrial wastewater indicators. It does not replace certified laboratory assays, EPA National Pollutant Discharge Elimination System (NPDES) permits, or authorized municipal pretreatment discharge limits. High-risk or unknown effluent must never be discharged to open water bodies.
          </p>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex items-center gap-2 text-xs text-[#A7B4C5] overflow-x-auto pb-1">
        <span className="shrink-0 font-medium">Load Effluent Profile:</span>
        <button
          type="button"
          onClick={() => handlePreset('acidic')}
          className="px-3 py-1.5 rounded-lg bg-[#162437] hover:bg-[#101C2C] text-[#F8FAFC] border border-[#29394D] transition-colors whitespace-nowrap cursor-pointer"
        >
          Acidic Anodizing Rinse (High Risk)
        </button>
        <button
          type="button"
          onClick={() => handlePreset('clean_rinse')}
          className="px-3 py-1.5 rounded-lg bg-[#162437] hover:bg-[#101C2C] text-[#F8FAFC] border border-[#29394D] transition-colors whitespace-nowrap cursor-pointer"
        >
          Treated Tertiary Effluent (Low Risk)
        </button>
        <button
          type="button"
          onClick={() => handlePreset('insufficient')}
          className="px-3 py-1.5 rounded-lg bg-[#162437] hover:bg-[#101C2C] text-[#F8FAFC] border border-[#29394D] transition-colors whitespace-nowrap cursor-pointer"
        >
          Unmeasured Parameters (Insufficient Data)
        </button>
      </div>

      {/* 2-Column: Inputs + Assessment Scoreboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs */}
        <form onSubmit={handleAssess} className="lg:col-span-6 p-6 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4 shadow-lg">
          <div className="text-xs font-bold text-[#F8FAFC] font-heading border-b border-[#29394D] pb-2">
            Effluent Chemical & Physical Assay Inputs
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
                pH Level (0 - 14)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 7.0 (Neutral)"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#06B6D4] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
                COD (mg/L)
              </label>
              <input
                type="number"
                step="any"
                placeholder="Chemical Oxygen Demand"
                value={cod}
                onChange={(e) => setCod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#06B6D4] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
                BOD5 (mg/L)
              </label>
              <input
                type="number"
                step="any"
                placeholder="Biochemical Oxygen Demand"
                value={bod}
                onChange={(e) => setBod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#06B6D4] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
                TSS (mg/L)
              </label>
              <input
                type="number"
                step="any"
                placeholder="Total Suspended Solids"
                value={tss}
                onChange={(e) => setTss(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#06B6D4] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
              Heavy Metals Concentration (where available)
            </label>
            <input
              type="text"
              placeholder="e.g. Lead, Cadmium, Hexavalent Chromium, Mercury ppm..."
              value={heavyMetals}
              onChange={(e) => setHeavyMetals(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#06B6D4] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
                Volume & Unit
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#06B6D4] focus:outline-none"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="px-2 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC]"
                >
                  <option value="litres">L</option>
                  <option value="m³">m³</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
                Distance to Water Body (meters)
              </label>
              <input
                type="number"
                placeholder="e.g. 350 meters"
                value={distanceToWaterBody}
                onChange={(e) => setDistanceToWaterBody(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#06B6D4] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#F8FAFC] block mb-1">
              Current Treatment Status
            </label>
            <select
              value={treatmentStatus}
              onChange={(e) => setTreatmentStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-xs text-[#F8FAFC] focus:border-[#06B6D4] focus:outline-none"
            >
              <option value="Untreated raw effluent">Untreated raw effluent (High contamination potential)</option>
              <option value="Primary sedimentation / Equalized">Primary sedimentation / Equalized</option>
              <option value="Secondary clarified & neutralized">Secondary clarified & neutralized</option>
              <option value="Tertiary / RO ZLD permeate">Tertiary / RO ZLD permeate</option>
              <option value="Unknown / Unmeasured">Unknown / Unmeasured</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#14B8A6] text-[#0B1220] font-bold text-xs tracking-wider uppercase hover:brightness-110 active:brightness-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#06B6D4]/15"
          >
            <Droplets className="w-4 h-4" />
            <span>{isLoading ? 'Calculating Aquatic Toxicity...' : 'Calculate Water Risk Screening'}</span>
          </button>
        </form>

        {/* Right Assessment Dossier */}
        <div className="lg:col-span-6 space-y-4">
          {!assessment && !isLoading && (
            <div className="p-12 rounded-2xl bg-[#162437] border border-dashed border-[#29394D] text-center space-y-2">
              <Activity className="w-8 h-8 text-[#A7B4C5] mx-auto" />
              <div className="text-sm font-semibold text-[#F8FAFC]">
                Ready to Screen Effluent Stream
              </div>
              <p className="text-xs text-[#A7B4C5] max-w-sm mx-auto">
                Fill the parameter indicators on the left to calculate acute aquatic risk indices and identify missing EPA parameters.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="p-12 rounded-2xl bg-[#162437] border border-[#29394D] text-center space-y-3">
              <div className="w-10 h-10 border-3 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-sm font-bold text-[#F8FAFC] font-heading">
                Executing Aquatic Risk Screening Algorithm...
              </div>
            </div>
          )}

          {assessment && !isLoading && (
            <div className="p-6 rounded-2xl bg-[#162437] border border-[#06B6D4]/40 space-y-5 shadow-2xl animate-in fade-in duration-200">
              {/* Score Header */}
              <div className="flex items-start justify-between pb-3 border-b border-[#29394D]">
                <div>
                  <div className="text-xs font-mono text-[#06B6D4] uppercase">Screening Result</div>
                  <h3 className={`text-xl font-extrabold font-heading mt-0.5 ${
                    assessment.riskCategory === 'High Risk'
                      ? 'text-rose-400'
                      : assessment.riskCategory === 'Moderate Risk'
                      ? 'text-amber-400'
                      : assessment.riskCategory === 'Low Risk'
                      ? 'text-[#22C55E]'
                      : 'text-[#A7B4C5]'
                  }`}>
                    {assessment.riskCategory}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#A7B4C5]">Screening Index:</div>
                  <div className="text-2xl font-extrabold font-mono tabular-nums text-[#F8FAFC]">
                    {assessment.riskScore}<span className="text-xs text-[#A7B4C5]">/100</span>
                  </div>
                </div>
              </div>

              {/* Key Contributing Risk Factors */}
              <div className="space-y-1.5 text-xs">
                <div className="font-semibold text-[#F8FAFC] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Contributing Environmental Factors:</span>
                </div>
                <ul className="space-y-1 pl-5 list-disc text-[#A7B4C5]">
                  {assessment.keyContributingFactors.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Missing Critical Parameters */}
              {assessment.missingParameters.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-amber-800/40 text-xs space-y-1.5">
                  <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Unmeasured Critical Laboratory Parameters:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {assessment.missingParameters.map((p, i) => (
                      <span key={i} className="text-[11px] font-mono bg-[#162437] text-amber-300 px-2 py-0.5 rounded border border-amber-800/60">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Next Steps */}
              <div className="space-y-1.5 text-xs">
                <div className="font-semibold text-[#06B6D4] flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Recommended Actionable Protocol:</span>
                </div>
                <div className="space-y-1">
                  {assessment.recommendedNextSteps.map((step, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#0B1220] border border-[#29394D]/60 text-[#F8FAFC] text-[11px] leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Route to Treatment Plant */}
              <div className="pt-2 border-t border-[#29394D]">
                <button
                  onClick={() => setActiveTab('network')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#14B8A6] hover:brightness-110 active:brightness-95 text-[#0B1220] font-semibold text-xs tracking-wide uppercase transition-all cursor-pointer text-center"
                >
                  Match with Authorized Wastewater Treatment Plant (ETP/ZLD)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
