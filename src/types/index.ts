export type UserRole = 'industry' | 'recycler' | 'facility' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
  organizationName: string;
  avatar?: string;
  title?: string;
}

export type FacilityType = 
  | 'Recycling Plant'
  | 'Waste Collection Center'
  | 'Wastewater Treatment Plant (ETP/STP)'
  | 'Material Recovery Facility (MRF)'
  | 'Authorized Hazardous-Waste Processor';

export interface Organization {
  id: string;
  name: string;
  type: 'Generator' | 'Recycler' | 'Treatment & Collection' | 'Regulatory';
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  verified: boolean;
  licenseNumber: string;
  certifications: string[];
  operatingCapacity?: string;
  acceptedCategories?: WasteCategory[];
}

export type WasteCategory =
  | 'Plastic and Polymer Waste'
  | 'Metal Scrap'
  | 'Paper and Packaging'
  | 'Textile Waste'
  | 'Organic / Biodegradable Waste'
  | 'Industrial Wastewater'
  | 'Chemical Waste'
  | 'Industrial Sludge'
  | 'E-Waste'
  | 'Other Industrial By-Products';

export type PhysicalState = 'Solid' | 'Liquid' | 'Sludge' | 'Mixed';

export type HazardousStatus = 'Non-Hazardous' | 'Hazardous' | 'Unknown (Requires Testing)';

export type ListingStatus = 
  | 'Pending Review'
  | 'Verified'
  | 'Matched'
  | 'Collection Scheduled'
  | 'In Transit'
  | 'Processing'
  | 'Recycled / Recovered'
  | 'Closed';

export interface WasteListing {
  id: string;
  title: string;
  organizationId: string;
  organizationName: string;
  category: WasteCategory;
  description: string;
  quantity: number;
  unit: 'kg' | 'MT' | 'litres' | 'm³';
  physicalState: PhysicalState;
  hazardousStatus: HazardousStatus;
  generationDate: string;
  pickupLocation: {
    address: string;
    city: string;
    state: string;
    approxLat: number;
    approxLng: number;
  };
  packaging: string;
  chemicalComposition?: string;
  documents: {
    name: string;
    type: 'SDS' | 'Lab Report' | 'Chain of Custody' | 'Inspection';
    url: string;
    date: string;
  }[];
  photos: string[];
  treatmentHistory?: string;
  intendedPreference: 'Recycle for Reuse' | 'Material Recovery' | 'Neutralization / Treatment' | 'Open to Matching';
  status: ListingStatus;
  matchedFacilityId?: string;
  matchedFacilityName?: string;
  createdAt: string;
  isMarketplaceVisible: boolean;
}

export interface LifecycleMilestone {
  id: string;
  listingId: string;
  stepName: string;
  timestamp: string;
  responsibleOrg: string;
  status: 'completed' | 'in_progress' | 'pending';
  notes: string;
  verifier?: string;
  documentRef?: string;
}

export interface CollectionRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  generatorOrgId: string;
  generatorOrgName: string;
  facilityId: string;
  facilityName: string;
  facilityType: FacilityType;
  requestDate: string;
  scheduledPickupDate?: string;
  status: 'Pending' | 'Accepted' | 'Scheduled' | 'Picked Up' | 'Delivered' | 'Completed' | 'Rejected';
  estimatedCostOrValue?: string;
  specialInstructions?: string;
  quantity: number;
  unit: string;
}

export interface MaterialRequest {
  id: string;
  listingId: string;
  materialName: string;
  requesterOrgId: string;
  requesterOrgName: string;
  contactEmail: string;
  requestedQuantity: number;
  unit: string;
  intendedUse: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Declined';
  date: string;
}

export interface Facility {
  id: string;
  name: string;
  facilityType: FacilityType;
  city: string;
  state: string;
  lat: number;
  lng: number;
  verified: boolean;
  authorizationCode: string;
  acceptedCategories: WasteCategory[];
  treatmentCapabilities: string[];
  annualCapacity: string;
  operatingContact: string;
  email: string;
  phone: string;
  services: string[];
  collectionOffered: boolean;
  rating: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
}

export interface AIClassificationResult {
  suggestedCategory: WasteCategory;
  confidenceLabel: 'High Probability' | 'Preliminary Suggestion' | 'Needs Expert Review';
  explanation: string[];
  missingInformation: string[];
  uncertaintyFlags: string[];
  recommendedTesting: string[];
  potentialRecoveryPathways: string[];
  disclaimer: string;
}

export interface WaterRiskAssessment {
  riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Insufficient Data to Assess';
  riskScore: number; // 0 - 100
  keyContributingFactors: string[];
  missingParameters: string[];
  recommendedNextSteps: string[];
  regulatoryScreeningNotes: string;
  disclaimer: string;
}
