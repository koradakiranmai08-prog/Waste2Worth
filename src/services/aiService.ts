import { AIClassificationResult, WaterRiskAssessment } from '../types';

export async function classifyWasteWithAI(data: {
  title: string;
  physicalState: string;
  description: string;
  chemicalComposition?: string;
  treatmentHistory?: string;
  intendedPreference?: string;
}): Promise<AIClassificationResult> {
  try {
    const res = await fetch('/api/ai/classify-waste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn('API route failed, using resilient client-side analysis fallback:', err);
    // Instant client-side environmental heuristic fallback
    const text = `${data.title} ${data.description} ${data.chemicalComposition || ''} ${data.physicalState}`.toLowerCase();
    
    let suggestedCategory = 'Other Industrial By-Products' as any;
    let confidenceLabel: 'High Probability' | 'Preliminary Suggestion' | 'Needs Expert Review' = 'Preliminary Suggestion';
    const explanation: string[] = [];
    const missingInformation: string[] = [];
    const uncertaintyFlags: string[] = [];
    const recommendedTesting: string[] = [];
    const potentialRecoveryPathways: string[] = [];

    if (text.includes('polymer') || text.includes('plastic') || text.includes('polypropylene') || text.includes('pet') || text.includes('flake')) {
      suggestedCategory = 'Plastic and Polymer Waste';
      explanation.push('Identified thermoplastic and polymer scrap terminology in description.');
      potentialRecoveryPathways.push('Optical flake sorting, hot wash, and compounding into industrial resin pellets.');
      recommendedTesting.push('ASTM D1238 Melt Flow Index (MFI) and DSC thermal analysis.');
    } else if (text.includes('water') || text.includes('effluent') || text.includes('rinse') || text.includes('liquid')) {
      suggestedCategory = 'Industrial Wastewater';
      explanation.push('Identified industrial process rinse or liquid effluent descriptors.');
      potentialRecoveryPathways.push('Coagulation, membrane filtration, and Zero Liquid Discharge (ZLD) closed-loop water recovery.');
      recommendedTesting.push('Standard Methods 5220 COD, 5210B BOD5, and EPA 6010 ICP metal screen.');
    } else if (text.includes('metal') || text.includes('aluminum') || text.includes('copper') || text.includes('steel') || text.includes('scrap')) {
      suggestedCategory = 'Metal Scrap';
      explanation.push('Detected industrial alloy and metal machining byproduct markers.');
      potentialRecoveryPathways.push('Secondary smelting, briquetting, and alloy refining.');
      recommendedTesting.push('Optical Emission Spectrometry (OES) chemical alloy verification.');
    } else if (text.includes('textile') || text.includes('selvedge') || text.includes('yarn') || text.includes('fabric')) {
      suggestedCategory = 'Textile Waste';
      explanation.push('Detected non-woven or woven textile scrap identifiers.');
      potentialRecoveryPathways.push('Mechanical fiber opening and industrial acoustic insulation felting.');
      recommendedTesting.push('Fiber blend ratio ASTM D629 and toxic finishing chemical screen.');
    } else if (text.includes('chemical') || text.includes('acid') || text.includes('solvent') || text.includes('toxic')) {
      suggestedCategory = 'Chemical Waste';
      confidenceLabel = 'Needs Expert Review';
      explanation.push('Detected industrial chemical or solvent reagent indicators.');
      uncertaintyFlags.push('Requires verified Safety Data Sheet to determine hazardous waste characteristics.');
      potentialRecoveryPathways.push('Authorized licensed chemical neutralization or solvent distillation recovery.');
      recommendedTesting.push('Full RCRA TCLP (EPA 1311) and ignitability/reactivity testing.');
    }

    if (!data.chemicalComposition || data.chemicalComposition.length < 20) {
      missingInformation.push('Exact chemical formulation and CAS registry percentage breakdown.');
      uncertaintyFlags.push('Unknown chemical constituents may compromise recycling safety.');
    }

    return {
      suggestedCategory,
      confidenceLabel,
      explanation: explanation.length ? explanation : ['Preliminary determination based on physical phase and title characteristics.'],
      missingInformation: missingInformation.length ? missingInformation : ['Third-party laboratory assay report.'],
      uncertaintyFlags: uncertaintyFlags.length ? uncertaintyFlags : ['Verify non-hazardous status with receiving recycler before transport.'],
      recommendedTesting: recommendedTesting.length ? recommendedTesting : ['Independent accredited lab testing.'],
      potentialRecoveryPathways: potentialRecoveryPathways.length ? potentialRecoveryPathways : ['Consult accredited regional recyclers listed on Waste2Worth.'],
      disclaimer: 'Preliminary AI screening only. This evaluation does not replace certified laboratory testing or regulatory compliance determinations.'
    };
  }
}

export async function assessWaterRiskWithAI(params: {
  ph?: string | number;
  cod?: string | number;
  bod?: string | number;
  tss?: string | number;
  heavyMetals?: string;
  toxicSubstances?: string;
  quantity?: string | number;
  unit?: string;
  distanceToWaterBody?: string | number;
  treatmentStatus?: string;
  dischargePathway?: string;
}): Promise<WaterRiskAssessment> {
  try {
    const res = await fetch('/api/ai/assess-water-risk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn('Water risk API route failed, using local calculation fallback:', err);
    const numPh = params.ph ? parseFloat(params.ph.toString()) : null;
    const numCod = params.cod ? parseFloat(params.cod.toString()) : null;
    const numBod = params.bod ? parseFloat(params.bod.toString()) : null;
    const numTss = params.tss ? parseFloat(params.tss.toString()) : null;
    const numDist = params.distanceToWaterBody ? parseFloat(params.distanceToWaterBody.toString()) : null;

    let score = 25;
    const factors: string[] = [];
    const missing: string[] = [];
    const steps: string[] = [];

    if (numPh !== null) {
      if (numPh < 6.0 || numPh > 9.0) {
        score += 25;
        factors.push(`pH ${numPh} is corrosive and outside safe aquatic threshold (6.5–8.5).`);
      } else {
        factors.push(`pH ${numPh} is within neutral discharge range.`);
      }
    } else {
      missing.push('pH level');
    }

    if (numCod !== null) {
      if (numCod > 250) {
        score += 25;
        factors.push(`Chemical Oxygen Demand (${numCod} mg/L) indicates high chemical pollutant concentration.`);
      }
    } else {
      missing.push('Chemical Oxygen Demand (COD)');
    }

    if (numBod !== null) {
      if (numBod > 100) {
        score += 20;
        factors.push(`Biochemical Oxygen Demand (${numBod} mg/L) poses severe risk of aquatic deoxygenation.`);
      }
    } else {
      missing.push('Biochemical Oxygen Demand (BOD5)');
    }

    if (numTss !== null) {
      if (numTss > 100) {
        score += 15;
        factors.push(`Total Suspended Solids (${numTss} mg/L) causes heavy sedimentation.`);
      }
    } else {
      missing.push('Total Suspended Solids (TSS)');
    }

    if (params.heavyMetals && params.heavyMetals.toLowerCase() !== 'none' && params.heavyMetals.trim() !== '') {
      score += 30;
      factors.push(`Reported presence of toxic heavy metals (${params.heavyMetals}): High bioaccumulation risk.`);
      steps.push('Mandatory precipitation and specialized HazMat treatment required.');
    }

    if (numDist !== null && numDist < 500) {
      score += 15;
      factors.push(`Proximity to natural water body (${numDist} m) increases catastrophic overflow exposure.`);
      steps.push('Verify double-containment and automated emergency runoff isolation valving.');
    }

    let riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Insufficient Data to Assess' = 'Moderate Risk';
    if (missing.length >= 3 && numPh === null) {
      riskCategory = 'Insufficient Data to Assess';
      steps.push('Conduct certified laboratory water assay before transporting or disposing.');
    } else if (score >= 60 || (params.heavyMetals && params.heavyMetals.length > 3 && params.heavyMetals.toLowerCase() !== 'none')) {
      riskCategory = 'High Risk';
      steps.push('Do NOT discharge to public sewers or water bodies.');
      steps.push('Engage authorized licensed wastewater treatment plant (ETP/ZLD) immediately.');
    } else if (score <= 35) {
      riskCategory = 'Low Risk';
      steps.push('Verify parameters with certified recycling/reclamation facility.');
    }

    return {
      riskCategory,
      riskScore: Math.min(100, Math.max(10, score)),
      keyContributingFactors: factors.length ? factors : ['Standard parameter baseline evaluated.'],
      missingParameters: missing,
      recommendedNextSteps: steps,
      regulatoryScreeningNotes: 'Informational screening calculation. Real-world water protection requires certified lab compliance per EPA / local water acts.',
      disclaimer: 'Preliminary screening only. Does not replace accredited laboratory certified testing (EPA / ISO 17025).'
    };
  }
}
