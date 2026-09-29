import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// -------------------------------------------------------------
// AI-Assisted Waste Classification Endpoint
// -------------------------------------------------------------
app.post('/api/ai/classify-waste', async (req, res) => {
  try {
    const { title, physicalState, description, chemicalComposition, treatmentHistory, intendedPreference } = req.body;

    if (!title && !description) {
      return res.status(400).json({ error: 'Please provide waste title or description.' });
    }

    if (ai) {
      try {
        const prompt = `You are a certified industrial waste management and circular economy specialist assistant for the "Waste2Worth" platform.
Analyze this industrial waste submission carefully and provide a structured classification:
- Listing Title: ${title || 'N/A'}
- Physical State: ${physicalState || 'Unknown'}
- Waste Description: ${description || 'N/A'}
- Known Chemical Composition: ${chemicalComposition || 'Not provided'}
- Treatment History: ${treatmentHistory || 'None'}
- Intended Preference: ${intendedPreference || 'Open to Matching'}

IMPORTANT RULES:
1. Do not classify unknown or uncharacterized chemical waste as safe or non-hazardous.
2. Flag missing parameters, uncertainties, and suggest accredited laboratory tests.
3. Suggest the most accurate Waste Category among:
   - Plastic and Polymer Waste
   - Metal Scrap
   - Paper and Packaging
   - Textile Waste
   - Organic / Biodegradable Waste
   - Industrial Wastewater
   - Chemical Waste
   - Industrial Sludge
   - E-Waste
   - Other Industrial By-Products
4. Clearly state that this is a preliminary AI screening requiring verification by qualified personnel.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                suggestedCategory: {
                  type: Type.STRING,
                  description: 'The most probable standard waste category.'
                },
                confidenceLabel: {
                  type: Type.STRING,
                  description: 'Preliminary Suggestion, Needs Expert Review, or High Probability'
                },
                explanation: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Specific user-provided factors that support this suggestion.'
                },
                missingInformation: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Critical missing testing or compositional parameters.'
                },
                uncertaintyFlags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Specific potential hazards or unknown variables.'
                },
                recommendedTesting: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Standard EPA / ASTM laboratory tests recommended.'
                },
                potentialRecoveryPathways: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Safe circular reuse, mechanical recycling, or authorized treatment options.'
                },
                disclaimer: {
                  type: Type.STRING,
                  description: 'Formal environmental disclaimer.'
                }
              },
              required: [
                'suggestedCategory',
                'confidenceLabel',
                'explanation',
                'missingInformation',
                'uncertaintyFlags',
                'recommendedTesting',
                'potentialRecoveryPathways',
                'disclaimer'
              ]
            }
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          return res.json(parsed);
        }
      } catch (genErr) {
        console.warn('Gemini API call failed, falling back to rule engine:', genErr);
      }
    }

    // High-fidelity fallback rule-based classification engine
    const textCorpus = `${title} ${description} ${chemicalComposition} ${physicalState}`.toLowerCase();
    
    let suggestedCategory = 'Other Industrial By-Products';
    let confidenceLabel: 'Preliminary Suggestion' | 'Needs Expert Review' | 'High Probability' = 'Preliminary Suggestion';
    const explanation: string[] = [];
    const missingInformation: string[] = [];
    const uncertaintyFlags: string[] = [];
    const recommendedTesting: string[] = [];
    const potentialRecoveryPathways: string[] = [];

    if (textCorpus.includes('plastic') || textCorpus.includes('polymer') || textCorpus.includes('polypropylene') || textCorpus.includes('pet') || textCorpus.includes('hdpe') || textCorpus.includes('resin')) {
      suggestedCategory = 'Plastic and Polymer Waste';
      explanation.push('Identified polymeric descriptors and resin markers in user submission.');
      potentialRecoveryPathways.push('Optical flake sorting, hot wash, and twin-screw de-volatilizing re-pelletizing.');
      recommendedTesting.push('ASTM D1238 Melt Flow Index (MFI) & Differential Scanning Calorimetry (DSC) for polymer purity.');
    } else if (textCorpus.includes('water') || textCorpus.includes('effluent') || textCorpus.includes('rinse') || textCorpus.includes('wash') || textCorpus.includes('liquid')) {
      suggestedCategory = 'Industrial Wastewater';
      explanation.push('Identified aqueous fluid discharge and industrial rinse/wash descriptors.');
      potentialRecoveryPathways.push('Advanced electro-coagulation, Fenton oxidation, and membrane RO water recovery.');
      recommendedTesting.push('EPA 150.1 pH, EPA 410.4 COD, EPA 405.1 BOD5, and EPA 6010 ICP-OES Heavy Metals screening.');
    } else if (textCorpus.includes('metal') || textCorpus.includes('aluminum') || textCorpus.includes('steel') || textCorpus.includes('copper') || textCorpus.includes('swarf') || textCorpus.includes('scrap')) {
      suggestedCategory = 'Metal Scrap';
      explanation.push('Detected non-ferrous or ferrous metallurgy, machining chips, or swarf terms.');
      potentialRecoveryPathways.push('Centrifugal oil de-watering, shredding, and electric arc furnace ingot remelt.');
      recommendedTesting.push('X-Ray Fluorescence (XRF) alloy grade verification and residual coolant moisture analysis.');
    } else if (textCorpus.includes('textile') || textCorpus.includes('yarn') || textCorpus.includes('selvedge') || textCorpus.includes('cotton') || textCorpus.includes('fabric')) {
      suggestedCategory = 'Textile Waste';
      explanation.push('Detected weaving cut-offs, natural or synthetic fibre composition.');
      potentialRecoveryPathways.push('Mechanical garnetting and non-woven acoustic / thermal insulation fleece conversion.');
      recommendedTesting.push('AATCC fibre blend ratio identification and hazardous azo-dye extraction screening.');
    } else if (textCorpus.includes('acid') || textCorpus.includes('solvent') || textCorpus.includes('chemical') || textCorpus.includes('toxic') || textCorpus.includes('corrosive')) {
      suggestedCategory = 'Chemical Waste';
      confidenceLabel = 'Needs Expert Review';
      explanation.push('Detected chemical reagent or reactive industrial substance keywords.');
      uncertaintyFlags.push('Chemical reagents may exhibit corrosive, ignitable, or toxic RCRA characteristics.');
      potentialRecoveryPathways.push('Authorized high-temperature thermal oxidation or solvent fractional distillation recovery.');
      recommendedTesting.push('Toxicity Characteristic Leaching Procedure (TCLP EPA 1311), flash point, and full SDS review.');
    } else if (textCorpus.includes('sludge') || textCorpus.includes('filter cake') || textCorpus.includes('sediment')) {
      suggestedCategory = 'Industrial Sludge';
      confidenceLabel = 'Needs Expert Review';
      explanation.push('Detected semi-solid filter cake or clarifier underflow descriptors.');
      potentialRecoveryPathways.push('Filter press thermal dewatering, heavy metal stabilization, and authorized co-processing.');
      recommendedTesting.push('Paint filter liquids test (EPA 9095B) and heavy metal leachability (TCLP).');
    }

    if (!chemicalComposition || chemicalComposition.length < 15) {
      missingInformation.push('Detailed quantitative chemical composition or CAS register breakdown.');
      uncertaintyFlags.push('Unknown chemical additives may affect safe transport and recycling compatibility.');
    }
    if (!description || description.length < 30) {
      missingInformation.push('Specific manufacturing upstream origin and contamination history.');
    }

    return res.json({
      suggestedCategory,
      confidenceLabel,
      explanation: explanation.length ? explanation : ['Preliminary match based on provided physical state and title descriptors.'],
      missingInformation: missingInformation.length ? missingInformation : ['Complete Safety Data Sheet (SDS) Section 3 disclosure.'],
      uncertaintyFlags: uncertaintyFlags.length ? uncertaintyFlags : ['Exact composition requires confirmation before cross-jurisdiction transport.'],
      recommendedTesting: recommendedTesting.length ? recommendedTesting : ['Independent third-party laboratory assay report.'],
      potentialRecoveryPathways: potentialRecoveryPathways.length ? potentialRecoveryPathways : ['Consult verified licensed processing facilities on the platform.'],
      disclaimer: 'Preliminary AI screening only. This evaluation does not constitute certified laboratory analysis or legal environmental compliance. Verification by certified EHS professionals is required.'
    });
  } catch (err: any) {
    console.error('Classification error:', err);
    res.status(500).json({ error: 'Failed to process waste classification.' });
  }
});

// -------------------------------------------------------------
// Water Pollution Risk Assessment Endpoint
// -------------------------------------------------------------
app.post('/api/ai/assess-water-risk', async (req, res) => {
  try {
    const {
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
    } = req.body;

    const numPh = ph !== undefined && ph !== '' ? parseFloat(ph) : null;
    const numCod = cod !== undefined && cod !== '' ? parseFloat(cod) : null;
    const numBod = bod !== undefined && bod !== '' ? parseFloat(bod) : null;
    const numTss = tss !== undefined && tss !== '' ? parseFloat(tss) : null;
    const numDist = distanceToWaterBody !== undefined && distanceToWaterBody !== '' ? parseFloat(distanceToWaterBody) : null;

    // Calculate preliminary screening score
    let riskScore = 20; // baseline
    const contributingFactors: string[] = [];
    const missingParameters: string[] = [];
    const recommendedNextSteps: string[] = [];

    // pH screening
    if (numPh !== null) {
      if (numPh < 6.0 || numPh > 9.0) {
        riskScore += 25;
        contributingFactors.push(`pH ${numPh} outside safe aquatic neutral zone (6.5–8.5); risks biological shock and pipeline corrosion.`);
      } else {
        contributingFactors.push(`pH ${numPh} is within normal neutralizing range.`);
      }
    } else {
      missingParameters.push('pH level');
    }

    // COD screening
    if (numCod !== null) {
      if (numCod > 250) {
        riskScore += 25;
        contributingFactors.push(`Elevated Chemical Oxygen Demand (COD: ${numCod} mg/L) indicates high organic/chemical pollutant load.`);
      } else {
        contributingFactors.push(`COD (${numCod} mg/L) is within manageable discharge thresholds.`);
      }
    } else {
      missingParameters.push('Chemical Oxygen Demand (COD)');
    }

    // BOD screening
    if (numBod !== null) {
      if (numBod > 100) {
        riskScore += 20;
        contributingFactors.push(`High Biochemical Oxygen Demand (BOD: ${numBod} mg/L) will cause severe dissolved oxygen depletion in receiving waters.`);
      }
    } else {
      missingParameters.push('Biochemical Oxygen Demand (BOD5)');
    }

    // TSS screening
    if (numTss !== null) {
      if (numTss > 100) {
        riskScore += 15;
        contributingFactors.push(`Total Suspended Solids (${numTss} mg/L) causes water turbidity and benthic smothering.`);
      }
    } else {
      missingParameters.push('Total Suspended Solids (TSS)');
    }

    // Heavy metals presence
    if (heavyMetals && heavyMetals.trim() && heavyMetals.toLowerCase() !== 'none') {
      riskScore += 30;
      contributingFactors.push(`Reported presence of toxic heavy metals (${heavyMetals}): High risk of bioaccumulation in aquatic food chains.`);
      recommendedNextSteps.push('Prioritize selective chemical precipitation and microfiltration to avoid severe environmental penalties.');
    }

    // Proximity to natural water body
    if (numDist !== null) {
      if (numDist < 500) {
        riskScore += 15;
        contributingFactors.push(`High proximity to natural water body (${numDist} meters): heightened risk of accidental stormwater overflow.`);
        recommendedNextSteps.push('Ensure secondary containment berms and automated shutoff storm diversion gates are functional.');
      }
    }

    // Treatment status
    if (treatmentStatus === 'Untreated raw effluent') {
      riskScore += 20;
      contributingFactors.push('Effluent is untreated raw discharge; direct release is strictly prohibited under water pollution acts.');
    }

    // Determine category
    let riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Insufficient Data to Assess' = 'Moderate Risk';
    if (missingParameters.length >= 3 && numPh === null && numCod === null) {
      riskCategory = 'Insufficient Data to Assess';
      recommendedNextSteps.push('Conduct certified laboratory test (pH, COD, BOD, TSS, Heavy Metals) prior to any disposal or matching.');
    } else if (riskScore >= 60 || (heavyMetals && heavyMetals.toLowerCase().includes('lead') || heavyMetals?.toLowerCase().includes('mercury') || heavyMetals?.toLowerCase().includes('cadmium'))) {
      riskCategory = 'High Risk';
      recommendedNextSteps.push('STOP: Do not discharge to public sewers or open waterways.');
      recommendedNextSteps.push('Dispatch to an authorized wastewater treatment plant (ETP) or certified HazMat neutralization processor.');
      recommendedNextSteps.push('Prepare EPA/RCRA uniform hazardous waste manifest.');
    } else if (riskScore <= 35) {
      riskCategory = 'Low Risk';
      recommendedNextSteps.push('Verify parameters with receiving wastewater reclamation facility for potential industrial closed-loop reuse.');
    } else {
      riskCategory = 'Moderate Risk';
      recommendedNextSteps.push('Primary pH neutralization and coagulant settling recommended before transfer.');
    }

    return res.json({
      riskCategory,
      riskScore: Math.min(100, Math.max(10, riskScore)),
      keyContributingFactors: contributingFactors.length ? contributingFactors : ['Standard screening values provided.'],
      missingParameters,
      recommendedNextSteps,
      regulatoryScreeningNotes: 'Preliminary water-risk screening based on general industrial effluent indicators. Does not constitute an official NPDES permit evaluation or legal discharge authorization.',
      disclaimer: 'This screening tool is an informational aid. Real-world discharge must strictly comply with local environmental protection regulations and accredited laboratory assays.'
    });
  } catch (err: any) {
    console.error('Water risk error:', err);
    res.status(500).json({ error: 'Failed to process water risk screening.' });
  }
});

// -------------------------------------------------------------
// Dev & Production Static Serving
// -------------------------------------------------------------
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Waste2Worth full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
