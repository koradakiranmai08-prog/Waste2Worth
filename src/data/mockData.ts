import {
  User,
  Organization,
  Facility,
  WasteListing,
  LifecycleMilestone,
  CollectionRequest,
  MaterialRequest,
  NotificationItem,
  AuditLog
} from '../types';

export const INITIAL_USERS: Record<string, User> = {
  industry: {
    id: 'usr_ind_01',
    name: 'Marcus Vance',
    email: 'm.vance@apexchemicals.com',
    role: 'industry',
    organizationId: 'org_ind_01',
    organizationName: 'Apex Precision Materials Ltd',
    title: 'EHS & Sustainability Director'
  },
  recycler: {
    id: 'usr_rec_01',
    name: 'Dr. Elena Rostova',
    email: 'elena@circulatech.org',
    role: 'recycler',
    organizationId: 'org_rec_01',
    organizationName: 'Circulatech Polymer Reclaimers',
    title: 'Head of Circular Logistics'
  },
  facility: {
    id: 'usr_fac_01',
    name: 'Tariq Al-Mansoor',
    email: 'tmansoor@aquaclear-industrial.com',
    role: 'facility',
    organizationId: 'org_fac_01',
    organizationName: 'AquaClear Effluent & HazMat Operations',
    title: 'Chief Operations Officer'
  },
  admin: {
    id: 'usr_adm_01',
    name: 'Kiran Patel',
    email: 'k.patel@state-env-oversight.gov',
    role: 'admin',
    organizationId: 'org_adm_01',
    organizationName: 'State Industrial Ecology Directorate',
    title: 'Chief Verification Auditor'
  }
};

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'org_ind_01',
    name: 'Apex Precision Materials Ltd',
    type: 'Generator',
    contactPerson: 'Marcus Vance',
    email: 'm.vance@apexchemicals.com',
    phone: '+1 (555) 234-8901',
    city: 'Detroit',
    state: 'MI',
    country: 'USA',
    lat: 42.3314,
    lng: -83.0458,
    verified: true,
    licenseNumber: 'EPA-IND-MI-99248',
    certifications: ['ISO 14001:2015', 'Responsible Care RC14001'],
    operatingCapacity: '18,000 MT/year'
  },
  {
    id: 'org_ind_02',
    name: 'Vanguard Technical Textiles',
    type: 'Generator',
    contactPerson: 'Sarah Jenkins',
    email: 'sjenkins@vanguardtextiles.com',
    phone: '+1 (555) 443-1289',
    city: 'Charlotte',
    state: 'NC',
    country: 'USA',
    lat: 35.2271,
    lng: -80.8431,
    verified: true,
    licenseNumber: 'EPA-IND-NC-10842',
    certifications: ['Oeko-Tex STeP', 'ISO 9001'],
    operatingCapacity: '7,500 MT/year'
  },
  {
    id: 'org_rec_01',
    name: 'Circulatech Polymer Reclaimers',
    type: 'Recycler',
    contactPerson: 'Dr. Elena Rostova',
    email: 'elena@circulatech.org',
    phone: '+1 (555) 887-3211',
    city: 'Cleveland',
    state: 'OH',
    country: 'USA',
    lat: 41.4993,
    lng: -81.6944,
    verified: true,
    licenseNumber: 'OH-EPA-RCY-8841',
    certifications: ['ISCC PLUS', 'EuCertPlast', 'ISO 14001'],
    operatingCapacity: '45,000 MT/year',
    acceptedCategories: ['Plastic and Polymer Waste', 'E-Waste', 'Other Industrial By-Products']
  },
  {
    id: 'org_fac_01',
    name: 'AquaClear Effluent & HazMat Operations',
    type: 'Treatment & Collection',
    contactPerson: 'Tariq Al-Mansoor',
    email: 'tmansoor@aquaclear-industrial.com',
    phone: '+1 (555) 612-9900',
    city: 'Toledo',
    state: 'OH',
    country: 'USA',
    lat: 41.6528,
    lng: -83.5379,
    verified: true,
    licenseNumber: 'RCRA-HAZ-OHD-0418',
    certifications: ['RCRA Part B Permit', 'ISO 45001', 'ISO 14001'],
    operatingCapacity: '120,000 m³/year',
    acceptedCategories: ['Industrial Wastewater', 'Chemical Waste', 'Industrial Sludge']
  }
];

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac_01',
    name: 'AquaClear Great Lakes Water & HazMat Recovery',
    facilityType: 'Wastewater Treatment Plant (ETP/STP)',
    city: 'Toledo',
    state: 'OH',
    lat: 41.6528,
    lng: -83.5379,
    verified: true,
    authorizationCode: 'OH-EPA-WTP-99201',
    acceptedCategories: ['Industrial Wastewater', 'Chemical Waste', 'Industrial Sludge'],
    treatmentCapabilities: [
      'Multi-stage Electro-coagulation',
      'Advanced Fenton Oxidation',
      'Membrane Bioreactor (MBR)',
      'Reverse Osmosis Zero Liquid Discharge (ZLD)'
    ],
    annualCapacity: '150,000 m³/year',
    operatingContact: 'AquaClear Operations Dispatch',
    email: 'ops@aquaclear-industrial.com',
    phone: '+1 (555) 612-9900',
    services: ['On-site vacuum tanker collection', 'Lab compliance testing', 'ZLD water return', 'Manifest filing'],
    collectionOffered: true,
    rating: 4.9
  },
  {
    id: 'fac_02',
    name: 'Circulatech Advanced Polymer Reclaimers',
    facilityType: 'Recycling Plant',
    city: 'Cleveland',
    state: 'OH',
    lat: 41.4993,
    lng: -81.6944,
    verified: true,
    authorizationCode: 'OH-RCY-POLY-5512',
    acceptedCategories: ['Plastic and Polymer Waste', 'Textile Waste'],
    treatmentCapabilities: [
      'High-speed Optical Laser Flake Sorting',
      'Hot Caustic Friction Washing',
      'De-volatilizing Twin-Screw Pelletizing',
      'FDA-Compliant Solid-State Polycondensation'
    ],
    annualCapacity: '48,000 MT/year',
    operatingContact: 'Intake Logistics Desk',
    email: 'intake@circulatech.org',
    phone: '+1 (555) 887-3211',
    services: ['Baled and regrind receiving', 'Toll pelletizing', 'Quality certificate issuance'],
    collectionOffered: true,
    rating: 4.8
  },
  {
    id: 'fac_03',
    name: 'Midwest Ferrous & Non-Ferrous Smelting',
    facilityType: 'Material Recovery Facility (MRF)',
    city: 'Gary',
    state: 'IN',
    lat: 41.5934,
    lng: -87.3464,
    verified: true,
    authorizationCode: 'IN-DEM-MET-1102',
    acceptedCategories: ['Metal Scrap', 'E-Waste'],
    treatmentCapabilities: [
      'Heavy Shear & Shredding',
      'Eddy Current Non-Ferrous Separation',
      'Electric Arc Furnace Ingot Casting'
    ],
    annualCapacity: '85,000 MT/year',
    operatingContact: 'Scrap Commercial Desk',
    email: 'intake@midwestferrous.com',
    phone: '+1 (555) 309-8812',
    services: ['Gondola railcar receiving', 'Roll-off dumpster supply', 'Spectrometry assay testing'],
    collectionOffered: true,
    rating: 4.7
  },
  {
    id: 'fac_04',
    name: 'EnviroShield Authorized HazChem Neutralization',
    facilityType: 'Authorized Hazardous-Waste Processor',
    city: 'Detroit',
    state: 'MI',
    lat: 42.3314,
    lng: -83.0458,
    verified: true,
    authorizationCode: 'MID-RCRA-HAZ-0081',
    acceptedCategories: ['Chemical Waste', 'Industrial Sludge', 'Industrial Wastewater'],
    treatmentCapabilities: [
      'Acid/Base Neutralization Reactors',
      'Heavy Metal Precipitation & Filter Press',
      'High-Temperature Catalytic Thermal Oxidation'
    ],
    annualCapacity: '35,000 MT/year',
    operatingContact: 'Hazardous Waste Compliance Manager',
    email: 'compliance@enviroshield-haz.com',
    phone: '+1 (555) 472-9100',
    services: ['EPA e-Manifest integration', 'DOT HazMat certified transport', 'Certificate of Destruction'],
    collectionOffered: true,
    rating: 4.95
  },
  {
    id: 'fac_05',
    name: 'GreenFiber Packaging & Pulp Reclaim',
    facilityType: 'Recycling Plant',
    city: 'Kalamazoo',
    state: 'MI',
    lat: 42.2917,
    lng: -85.5872,
    verified: true,
    authorizationCode: 'MI-EGLE-PULP-4019',
    acceptedCategories: ['Paper and Packaging', 'Textile Waste', 'Organic / Biodegradable Waste'],
    treatmentCapabilities: [
      'Hydrapulping De-inking Systems',
      'Mechanical Fibre Fractionation',
      'Molded Pulp Packaging Forming'
    ],
    annualCapacity: '60,000 MT/year',
    operatingContact: 'Receiving Operations',
    email: 'logistics@greenfiber-pulp.com',
    phone: '+1 (555) 720-3341',
    services: ['Drop trailer exchange', 'Bale moisture scanning', 'Closed-loop carton returns'],
    collectionOffered: false,
    rating: 4.6
  }
];

export const INITIAL_LISTINGS: WasteListing[] = [
  {
    id: 'lst_01',
    title: 'Textile Fibre Waste — 250 kg (Demo)',
    organizationId: 'org_ind_02',
    organizationName: 'Vanguard Technical Textiles',
    category: 'Textile Waste',
    description: 'Post-industrial polyester/cotton selvedge trimmings from automotive seat cover fabric weaving. Dry, clean, uncontaminated with machine oil.',
    quantity: 250,
    unit: 'kg',
    physicalState: 'Solid',
    hazardousStatus: 'Non-Hazardous',
    generationDate: '2026-09-15',
    pickupLocation: {
      address: '4200 Northpoint Industrial Blvd',
      city: 'Charlotte',
      state: 'NC',
      approxLat: 35.2271,
      approxLng: -80.8431
    },
    packaging: 'Baled in polypropylene wrap with plastic straps',
    chemicalComposition: '65% Polyethylene Terephthalate (PET), 35% Cotton staple fibre. No fluorochemical DWR coatings applied.',
    documents: [
      {
        name: 'Technical-Data-Sheet-Selvedge-TDS.pdf',
        type: 'Inspection',
        url: '#',
        date: '2026-09-15'
      }
    ],
    photos: [],
    treatmentHistory: 'Untreated cut edge scrap from spinning room looper.',
    intendedPreference: 'Recycle for Reuse',
    status: 'Pending Review',
    createdAt: '2026-09-18T10:14:00Z',
    isMarketplaceVisible: true
  },
  {
    id: 'lst_02',
    title: 'Machining Metal Scrap — 500 kg (Demo)',
    organizationId: 'org_ind_01',
    organizationName: 'Apex Precision Materials Ltd',
    category: 'Metal Scrap',
    description: 'Dry 6061-T6 aluminum CNC mill turnings and swarf. Centrifuged to remove water-soluble synthetic cutting coolants (<0.8% residual coolant oil).',
    quantity: 500,
    unit: 'kg',
    physicalState: 'Solid',
    hazardousStatus: 'Non-Hazardous',
    generationDate: '2026-09-20',
    pickupLocation: {
      address: '100 Foundry Way, Dock 4',
      city: 'Detroit',
      state: 'MI',
      approxLat: 42.3314,
      approxLng: -83.0458
    },
    packaging: 'Steel gaylord bins with moisture-tight vinyl lids',
    chemicalComposition: 'Alloy 6061: Al balance, Mg 0.8–1.2%, Si 0.4–0.8%, Cu 0.15–0.4%, Cr 0.04–0.35%.',
    documents: [
      {
        name: 'Spectrographic-Assay-Report-6061.pdf',
        type: 'Lab Report',
        url: '#',
        date: '2026-09-20'
      }
    ],
    photos: [],
    treatmentHistory: 'Centrifugal chip wringer de-oiled.',
    intendedPreference: 'Material Recovery',
    status: 'Matched',
    matchedFacilityId: 'fac_03',
    matchedFacilityName: 'Midwest Ferrous & Non-Ferrous Smelting',
    createdAt: '2026-09-21T08:30:00Z',
    isMarketplaceVisible: true
  },
  {
    id: 'lst_03',
    title: 'Polypropylene Injection Runner Scrap — 3.2 MT (Demo)',
    organizationId: 'org_ind_01',
    organizationName: 'Apex Precision Materials Ltd',
    category: 'Plastic and Polymer Waste',
    description: 'Clean unprinted virgin-derived homopolymer polypropylene (PP) injection sprue runners. Consistent Melt Flow Index 12 g/10min. No glass fillers.',
    quantity: 3.2,
    unit: 'MT',
    physicalState: 'Solid',
    hazardousStatus: 'Non-Hazardous',
    generationDate: '2026-09-22',
    pickupLocation: {
      address: '100 Foundry Way, Warehouse C',
      city: 'Detroit',
      state: 'MI',
      approxLat: 42.3314,
      approxLng: -83.0458
    },
    packaging: 'Standard 1,000 kg heavy-duty baffled FIBC tote bags on pallets',
    chemicalComposition: 'Polypropylene homopolymer CAS# 9003-07-0 (>99.5%), heat stabilizer (<0.3%).',
    documents: [
      {
        name: 'PP-MFI-Melt-Rheology-Certificate.pdf',
        type: 'Lab Report',
        url: '#',
        date: '2026-09-22'
      }
    ],
    photos: [],
    treatmentHistory: 'Clean in-line regrind separation.',
    intendedPreference: 'Recycle for Reuse',
    status: 'Collection Scheduled',
    matchedFacilityId: 'fac_02',
    matchedFacilityName: 'Circulatech Advanced Polymer Reclaimers',
    createdAt: '2026-09-22T14:10:00Z',
    isMarketplaceVisible: true
  },
  {
    id: 'lst_04',
    title: 'Anodizing Rinse Effluent Wastewater — 12,000 L (Demo)',
    organizationId: 'org_ind_01',
    organizationName: 'Apex Precision Materials Ltd',
    category: 'Industrial Wastewater',
    description: 'Dilute acidic wash water from aluminum finishing line. pH 3.8. Low dissolved heavy metals (Al 42 mg/L, Cr <0.1 mg/L). Requires neutralization and clarifier treatment before sewer/water body discharge.',
    quantity: 12000,
    unit: 'litres',
    physicalState: 'Liquid',
    hazardousStatus: 'Hazardous',
    generationDate: '2026-09-24',
    pickupLocation: {
      address: '100 Foundry Way, Chemical Tank Farm #2',
      city: 'Detroit',
      state: 'MI',
      approxLat: 42.3314,
      approxLng: -83.0458
    },
    packaging: 'Dedicated 15,000 L FRP double-walled holding tank with camlock discharge',
    chemicalComposition: 'Water 98.8%, Sulfuric acid H2SO4 ~0.8%, Dissolved Aluminum ions 42 ppm, Trace surfactants.',
    documents: [
      {
        name: 'Lab-Report-Acid-Rinse-Water-EPA6010.pdf',
        type: 'Lab Report',
        url: '#',
        date: '2026-09-24'
      },
      {
        name: 'Safety-Data-Sheet-Sulfuric-Effluent.pdf',
        type: 'SDS',
        url: '#',
        date: '2026-09-24'
      }
    ],
    photos: [],
    treatmentHistory: 'Equalized in primary buffer pit; awaiting authorized batch neutralization transport.',
    intendedPreference: 'Neutralization / Treatment',
    status: 'In Transit',
    matchedFacilityId: 'fac_01',
    matchedFacilityName: 'AquaClear Great Lakes Water & HazMat Recovery',
    createdAt: '2026-09-24T16:45:00Z',
    isMarketplaceVisible: false
  },
  {
    id: 'lst_05',
    title: 'Corrugated Shipping Box Off-Cuts — 1.8 MT (Demo)',
    organizationId: 'org_ind_02',
    organizationName: 'Vanguard Technical Textiles',
    category: 'Paper and Packaging',
    description: 'Clean OCC unbleached kraft corrugated cardboard cuttings. Dry, baled, no wax coatings or food contamination.',
    quantity: 1.8,
    unit: 'MT',
    physicalState: 'Solid',
    hazardousStatus: 'Non-Hazardous',
    generationDate: '2026-09-25',
    pickupLocation: {
      address: '4200 Northpoint Industrial Blvd',
      city: 'Charlotte',
      state: 'NC',
      approxLat: 35.2271,
      approxLng: -80.8431
    },
    packaging: 'Mill-size wire-tied bales (approx 450 kg each)',
    chemicalComposition: '100% natural cellulose fibre, starch-based corrugating adhesive.',
    documents: [],
    photos: [],
    treatmentHistory: 'Direct hydraulic baler collection.',
    intendedPreference: 'Recycle for Reuse',
    status: 'Recycled / Recovered',
    matchedFacilityId: 'fac_05',
    matchedFacilityName: 'GreenFiber Packaging & Pulp Reclaim',
    createdAt: '2026-09-25T11:00:00Z',
    isMarketplaceVisible: true
  }
];

export const INITIAL_LIFECYCLE_EVENTS: LifecycleMilestone[] = [
  {
    id: 'lc_01',
    listingId: 'lst_04',
    stepName: 'Waste Registered',
    timestamp: '2026-09-24T16:45:00Z',
    responsibleOrg: 'Apex Precision Materials Ltd',
    status: 'completed',
    notes: 'Registered 12,000 L acidic anodizing rinse effluent. SDS and laboratory test parameters submitted.',
    verifier: 'Marcus Vance (EHS Director)'
  },
  {
    id: 'lc_02',
    listingId: 'lst_04',
    stepName: 'Documents Reviewed & Verified',
    timestamp: '2026-09-25T09:15:00Z',
    responsibleOrg: 'State Industrial Ecology Directorate',
    status: 'completed',
    notes: 'Lab EPA6010 ICP test verified. Heavy metal threshold confirmed under regulated HazMat boundary; certified for batch neutralization.',
    verifier: 'Auditor Kiran Patel (Gov ID #MI-8812)',
    documentRef: 'VERIF-CERT-2026-0941.pdf'
  },
  {
    id: 'lc_03',
    listingId: 'lst_04',
    stepName: 'Treatment Facility Matched',
    timestamp: '2026-09-25T10:30:00Z',
    responsibleOrg: 'Waste2Worth Intelligent Router',
    status: 'completed',
    notes: 'Matched to AquaClear Great Lakes (Permit OH-EPA-WTP-99201) located 58 miles away with available ZLD capacity.'
  },
  {
    id: 'lc_04',
    listingId: 'lst_04',
    stepName: 'Collection Scheduled',
    timestamp: '2026-09-25T14:00:00Z',
    responsibleOrg: 'AquaClear Effluent Logistics',
    status: 'completed',
    notes: 'Assigned 5,000-gal 316-stainless vacuum tanker unit VT-18. HazMat transport manifest logged.'
  },
  {
    id: 'lc_05',
    listingId: 'lst_04',
    stepName: 'Waste Collected & In Transit',
    timestamp: '2026-09-26T08:20:00Z',
    responsibleOrg: 'AquaClear Effluent Logistics',
    status: 'completed',
    notes: 'Tanker loaded and sealed with security tamper-tag #AQ-99410. GPS geofence tracking active.'
  },
  {
    id: 'lc_06',
    listingId: 'lst_04',
    stepName: 'Received at Facility',
    timestamp: '2026-09-26T13:40:00Z',
    responsibleOrg: 'AquaClear Great Lakes Water & HazMat Recovery',
    status: 'in_progress',
    notes: 'Tanker arrived at receiving bay. Intake sample taken for pH and total solids verification.',
    verifier: 'Tariq Al-Mansoor (COO)'
  },
  {
    id: 'lc_07',
    listingId: 'lst_04',
    stepName: 'Treatment & Neutralization in Progress',
    timestamp: '2026-09-27T08:00:00Z',
    responsibleOrg: 'AquaClear Great Lakes Water & HazMat Recovery',
    status: 'pending',
    notes: 'Scheduled for caustic neutralization reactor #3 and ultrafiltration RO system.'
  },
  {
    id: 'lc_08',
    listingId: 'lst_04',
    stepName: 'Water Recovered & Discharged Safely',
    timestamp: 'Estimated 2026-09-29',
    responsibleOrg: 'AquaClear Great Lakes Water & HazMat Recovery',
    status: 'pending',
    notes: 'Targeting 94% purified effluent reuse and dry aluminum hydroxide cake recovery.'
  }
];

export const INITIAL_COLLECTION_REQUESTS: CollectionRequest[] = [
  {
    id: 'req_01',
    listingId: 'lst_03',
    listingTitle: 'Polypropylene Injection Runner Scrap — 3.2 MT (Demo)',
    generatorOrgId: 'org_ind_01',
    generatorOrgName: 'Apex Precision Materials Ltd',
    facilityId: 'fac_02',
    facilityName: 'Circulatech Advanced Polymer Reclaimers',
    facilityType: 'Recycling Plant',
    requestDate: '2026-09-23',
    scheduledPickupDate: '2026-09-30',
    status: 'Scheduled',
    estimatedCostOrValue: '+ $1,150.00 (Generator Revenue)',
    specialInstructions: 'Forklift required for loading gaylord bins. Dock height 48 inches.',
    quantity: 3.2,
    unit: 'MT'
  },
  {
    id: 'req_02',
    listingId: 'lst_04',
    listingTitle: 'Anodizing Rinse Effluent Wastewater — 12,000 L (Demo)',
    generatorOrgId: 'org_ind_01',
    generatorOrgName: 'Apex Precision Materials Ltd',
    facilityId: 'fac_01',
    facilityName: 'AquaClear Great Lakes Water & HazMat Recovery',
    facilityType: 'Wastewater Treatment Plant (ETP/STP)',
    requestDate: '2026-09-25',
    scheduledPickupDate: '2026-09-26',
    status: 'Picked Up',
    estimatedCostOrValue: '- $1,850.00 (Treatment Fee)',
    specialInstructions: 'Requires DOT corrosive liquid placard and ground bonding during transfer.',
    quantity: 12000,
    unit: 'litres'
  },
  {
    id: 'req_03',
    listingId: 'lst_02',
    listingTitle: 'Machining Metal Scrap — 500 kg (Demo)',
    generatorOrgId: 'org_ind_01',
    generatorOrgName: 'Apex Precision Materials Ltd',
    facilityId: 'fac_03',
    facilityName: 'Midwest Ferrous & Non-Ferrous Smelting',
    facilityType: 'Material Recovery Facility (MRF)',
    requestDate: '2026-09-22',
    scheduledPickupDate: '2026-10-02',
    status: 'Accepted',
    estimatedCostOrValue: '+ $620.00 (Market Scrap Value)',
    specialInstructions: 'Roll-off container drop-off requested for next machining batch.',
    quantity: 500,
    unit: 'kg'
  }
];

export const INITIAL_MATERIAL_REQUESTS: MaterialRequest[] = [
  {
    id: 'mreq_01',
    listingId: 'lst_03',
    materialName: 'Polypropylene Injection Runner Scrap',
    requesterOrgId: 'org_rec_01',
    requesterOrgName: 'Circulatech Polymer Reclaimers',
    contactEmail: 'intake@circulatech.org',
    requestedQuantity: 3.2,
    unit: 'MT',
    intendedUse: 'Compounding with post-consumer resin for industrial automotive battery cases.',
    status: 'Approved',
    date: '2026-09-23'
  },
  {
    id: 'mreq_02',
    listingId: 'lst_01',
    materialName: 'Textile Fibre Waste — Selvedge trimmings',
    requesterOrgId: 'org_fac_05',
    requesterOrgName: 'GreenFiber Packaging & Pulp Reclaim',
    contactEmail: 'logistics@greenfiber-pulp.com',
    requestedQuantity: 250,
    unit: 'kg',
    intendedUse: 'Non-woven thermal acoustic insulation fleece manufacturing.',
    status: 'Under Review',
    date: '2026-09-24'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'Wastewater Transport Transit Confirmed',
    message: 'Tanker VT-18 from AquaClear has picked up 12,000 L Anodizing Rinse Effluent. Custody manifest #AQ-99410 signed.',
    type: 'info',
    timestamp: '2 hours ago',
    read: false,
    link: 'lifecycle'
  },
  {
    id: 'notif_02',
    title: 'Recycling Recommendation Match',
    message: 'High-compatibility match (96%) found for your Polypropylene scrap with Circulatech Polymer Reclaimers.',
    type: 'success',
    timestamp: '5 hours ago',
    read: false,
    link: 'recommendations'
  },
  {
    id: 'notif_03',
    title: 'Water Risk Screening Complete',
    message: 'AI screening flagged high COD/acidity for untreated rinse water. Immediate specialized neutralization routed.',
    type: 'warning',
    timestamp: '1 day ago',
    read: true,
    link: 'water-risk'
  },
  {
    id: 'notif_04',
    title: 'Facility Verification Verified',
    message: 'Apex Precision Materials environmental operating permit EPA-IND-MI-99248 re-certified by oversight administrator.',
    type: 'success',
    timestamp: '2 days ago',
    read: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud_01',
    timestamp: '2026-09-26 13:40:12',
    actor: 'Tariq Al-Mansoor (AquaClear)',
    action: 'CONFIRM_INTAKE',
    targetType: 'WasteListing',
    targetId: 'lst_04',
    details: 'Verified pH 3.8 and specific gravity 1.02 at intake gate bay 2.'
  },
  {
    id: 'aud_02',
    timestamp: '2026-09-25 09:15:44',
    actor: 'Kiran Patel (State Auditor)',
    action: 'VERIFY_LAB_REPORT',
    targetType: 'WasteDocument',
    targetId: 'doc_9918',
    details: 'EPA6010 ICP test verified compliant with RCRA treatment permit.'
  },
  {
    id: 'aud_03',
    timestamp: '2026-09-24 16:45:00',
    actor: 'Marcus Vance (Apex Materials)',
    action: 'REGISTER_LISTING',
    targetType: 'WasteListing',
    targetId: 'lst_04',
    details: 'Created listing: 12,000 L Anodizing Rinse Effluent Wastewater.'
  },
  {
    id: 'aud_04',
    timestamp: '2026-09-23 11:20:00',
    actor: 'Dr. Elena Rostova (Circulatech)',
    action: 'SUBMIT_COLLECTION_BID',
    targetType: 'CollectionRequest',
    targetId: 'req_01',
    details: 'Offered $1,150 purchase value for 3.2 MT virgin-derived PP runners.'
  }
];
