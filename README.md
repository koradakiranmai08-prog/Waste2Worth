# Waste2Worth — Intelligent Industrial Waste Management & Water Pollution Prevention Platform

> **Tagline:** “From Industrial Waste to Industrial Resource.”  
> **Supporting line:** “Transforming waste into value. Protecting every drop.”

Waste2Worth connects industrial manufacturing facilities that generate waste with authorized recyclers, certified effluent treatment plants (ETP/STP), and industrial re-users to eliminate improper dumping, protect water bodies from acute contamination, and enable closed-loop circular manufacturing.

---

## 1. Core Workflow Architecture

```
[ Industrial Factory ] 
         │ 
         ▼  (1) Waste Registration & Specification Upload
[ Automated Screening Engine ]
   ├── AI Category Classification (Gemini 3.8 Flash + Resilient Fallback)
   ├── Water Pollution Risk Assessment (pH, COD, BOD, TSS, Heavy Metals)
   └── Missing Lab Assay & Hazard Flags
         │
         ▼  (2) Intelligent Facility Matchmaking
[ Permitted Regional Network ]
   ├── Specialized Recyclers (Polymer Flaking, Secondary Metallurgy)
   ├── Wastewater Treatment Plants (Electrocoagulation, Fenton, RO ZLD)
   └── Certified HazMat Destruction Facilities
         │
         ▼  (3) 11-Stage Digital Chain of Custody
[ Lifecycle & Manifest Tracker ]
   ├── E-Manifest Creation & Weigh-In Inspection
   ├── Vacuum Tanker & Carrier Dispatch
   └── Neutralization & Recovery Milestone Advancement
         │
         ▼  (4) Secondary Material & ESG Auditing
[ Closed-Loop Value Chain ]
   ├── Secondary Material Marketplace Exchange
   └── Audited ESG Statements & PDF/CSV Environmental Exports
```

---

## 2. User Roles & Permission Boundaries

1. **Industry (Waste Generator):**
   - Register industrial streams with physical state, packaging, and SDS reports.
   - Run AI waste classification and water pollution risk screenings.
   - Review ranked facility recommendations and submit pickup requests.
   - Track live manifests and download quarterly sustainability reports.

2. **Recycler / Waste Processor:**
   - Manage facility intake capabilities, annual capacity, and accepted streams.
   - Inspect marketplace secondary materials and submit procurement bids.
   - Advance milestone statuses upon weighing and material compounding.

3. **Collection / Effluent Treatment Facility (ETP/ZLD):**
   - Manage tanker logistics, gate intake sample assays (pH/TSS), and treatment reactors.
   - Certify zero-liquid-discharge (ZLD) permeate water return and sludge cake vitrification.

4. **Administrator (State Environmental Directorate):**
   - Verify facility operating licenses and RCRA Part B authorizations.
   - Moderate waste listings, flag uncharacterized chemical batches for lab testing.
   - Audit immutable ledger events and calibrate EPA WARM formula parameters.

---

## 3. Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion
- **Visuals & Charts:** Recharts (responsive time series and donut distributions)
- **Backend:** Express full-stack server mounted with Vite dev middleware
- **AI Integration:** `@google/genai` TypeScript SDK (`gemini-3.8-flash`) with structured `responseSchema` and high-fidelity deterministic fallback engine
- **Map & Spatial:** Interactive coordinate-projected SVG geographic vector engine (independent of third-party map rate limits or broken iframe sandboxes)

---

## 4. Environment Variables (`.env.example`)

```bash
# GEMINI_API_KEY: Injected by Google AI Studio at runtime from user secrets.
# Used for server-side AI waste classification and water risk screening.
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# APP_URL: Production or preview host URL
APP_URL="http://localhost:3000"
```

---

## 5. Development & Deployment

### Running locally
```bash
# Install dependencies
npm install

# Start full-stack development server on port 3000
npm run dev
```

### Production Build
```bash
# Build Vite client assets
npm run build

# Start production server
npm start
```

---

## 6. Environmental Compliance & Scope Boundaries

Waste2Worth is a digital coordination and verification platform. It does not physically process waste or directly measure in-situ water bodies. All AI-generated ratings represent preliminary screenings and require verification by accredited testing laboratories (EPA / ISO 17025) and authorized jurisdictional environmental protection authorities.
