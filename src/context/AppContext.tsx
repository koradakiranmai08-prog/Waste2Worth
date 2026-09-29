import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  WasteListing,
  Facility,
  CollectionRequest,
  MaterialRequest,
  LifecycleMilestone,
  NotificationItem,
  AuditLog
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_FACILITIES,
  INITIAL_LISTINGS,
  INITIAL_LIFECYCLE_EVENTS,
  INITIAL_COLLECTION_REQUESTS,
  INITIAL_MATERIAL_REQUESTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  listings: WasteListing[];
  addListing: (listing: Omit<WasteListing, 'id' | 'createdAt'>) => WasteListing;
  updateListing: (id: string, updates: Partial<WasteListing>) => void;
  facilities: Facility[];
  collectionRequests: CollectionRequest[];
  addCollectionRequest: (req: Omit<CollectionRequest, 'id' | 'requestDate'>) => void;
  updateCollectionRequestStatus: (id: string, status: CollectionRequest['status']) => void;
  materialRequests: MaterialRequest[];
  addMaterialRequest: (req: Omit<MaterialRequest, 'id' | 'date'>) => void;
  lifecycleEvents: LifecycleMilestone[];
  addLifecycleEvent: (event: Omit<LifecycleMilestone, 'id'>) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  auditLogs: AuditLog[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedListingId: string | null;
  setSelectedListingId: (id: string | null) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('industry');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS.industry);
  
  // Storage keys with fallback to initial data
  const [listings, setListings] = useState<WasteListing[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_listings');
      return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_facilities');
      return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
    } catch {
      return INITIAL_FACILITIES;
    }
  });

  const [collectionRequests, setCollectionRequests] = useState<CollectionRequest[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_requests');
      return saved ? JSON.parse(saved) : INITIAL_COLLECTION_REQUESTS;
    } catch {
      return INITIAL_COLLECTION_REQUESTS;
    }
  });

  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_mat_requests');
      return saved ? JSON.parse(saved) : INITIAL_MATERIAL_REQUESTS;
    } catch {
      return INITIAL_MATERIAL_REQUESTS;
    }
  });

  const [lifecycleEvents, setLifecycleEvents] = useState<LifecycleMilestone[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_lifecycle');
      return saved ? JSON.parse(saved) : INITIAL_LIFECYCLE_EVENTS;
    } catch {
      return INITIAL_LIFECYCLE_EVENTS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('w2w_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedListingId, setSelectedListingId] = useState<string | null>('lst_04');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist state changes safely
  useEffect(() => {
    try {
      localStorage.setItem('w2w_listings', JSON.stringify(listings));
    } catch (e) {
      console.warn('Failed to save listings to localStorage', e);
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem('w2w_requests', JSON.stringify(collectionRequests));
    } catch (e) {
      console.warn('Failed to save requests to localStorage', e);
    }
  }, [collectionRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('w2w_mat_requests', JSON.stringify(materialRequests));
    } catch (e) {
      console.warn('Failed to save material requests to localStorage', e);
    }
  }, [materialRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('w2w_lifecycle', JSON.stringify(lifecycleEvents));
    } catch (e) {
      console.warn('Failed to save lifecycle events to localStorage', e);
    }
  }, [lifecycleEvents]);

  useEffect(() => {
    try {
      localStorage.setItem('w2w_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save notifications to localStorage', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('w2w_audit_logs', JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Failed to save audit logs to localStorage', e);
    }
  }, [auditLogs]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(INITIAL_USERS[role]);
  };

  const addListing = (data: Omit<WasteListing, 'id' | 'createdAt'>): WasteListing => {
    const newId = `lst_${Date.now()}`;
    const newListing: WasteListing = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString()
    };

    setListings(prev => [newListing, ...prev]);

    // Add initial lifecycle step
    const initialMilestone: LifecycleMilestone = {
      id: `lc_${Date.now()}`,
      listingId: newId,
      stepName: 'Waste Registered',
      timestamp: new Date().toISOString(),
      responsibleOrg: data.organizationName,
      status: 'completed',
      notes: `Registered ${data.quantity} ${data.unit} of ${data.category}. Awaiting documentation screening.`
    };
    setLifecycleEvents(prev => [...prev, initialMilestone]);

    // Add audit log
    const audit: AuditLog = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      actor: currentUser.name,
      action: 'REGISTER_LISTING',
      targetType: 'WasteListing',
      targetId: newId,
      details: `Created listing: ${data.title} (${data.quantity} ${data.unit})`
    };
    setAuditLogs(prev => [audit, ...prev]);

    // Add notification
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'New Industrial Waste Registered',
      message: `${data.title} was registered successfully and queued for intelligent facility matching.`,
      type: 'success',
      timestamp: 'Just now',
      read: false,
      link: 'listings'
    };
    setNotifications(prev => [notif, ...prev]);

    return newListing;
  };

  const updateListing = (id: string, updates: Partial<WasteListing>) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const addCollectionRequest = (req: Omit<CollectionRequest, 'id' | 'requestDate'>) => {
    const newReq: CollectionRequest = {
      ...req,
      id: `req_${Date.now()}`,
      requestDate: new Date().toISOString().split('T')[0]
    };
    setCollectionRequests(prev => [newReq, ...prev]);

    // Update listing status
    updateListing(req.listingId, {
      status: 'Matched',
      matchedFacilityId: req.facilityId,
      matchedFacilityName: req.facilityName
    });

    // Add lifecycle event
    const lcEvent: LifecycleMilestone = {
      id: `lc_${Date.now()}`,
      listingId: req.listingId,
      stepName: 'Facility Matched & Collection Requested',
      timestamp: new Date().toISOString(),
      responsibleOrg: req.facilityName,
      status: 'in_progress',
      notes: `Formal collection engagement submitted to ${req.facilityName}. Pickup scheduling initiated.`
    };
    setLifecycleEvents(prev => [...prev, lcEvent]);

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Collection Engagement Initiated',
      message: `Request sent to ${req.facilityName} for pickup of ${req.listingTitle}.`,
      type: 'info',
      timestamp: 'Just now',
      read: false,
      link: 'requests'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateCollectionRequestStatus = (id: string, status: CollectionRequest['status']) => {
    setCollectionRequests(prev => prev.map(item => {
      if (item.id === id) {
        // Also update matching listing
        let listingStatus: WasteListing['status'] = 'Matched';
        if (status === 'Scheduled') listingStatus = 'Collection Scheduled';
        if (status === 'Picked Up') listingStatus = 'In Transit';
        if (status === 'Delivered') listingStatus = 'Processing';
        if (status === 'Completed') listingStatus = 'Recycled / Recovered';

        updateListing(item.listingId, { status: listingStatus });

        // Add lifecycle event
        const milestone: LifecycleMilestone = {
          id: `lc_${Date.now()}`,
          listingId: item.listingId,
          stepName: `Status Updated: ${status}`,
          timestamp: new Date().toISOString(),
          responsibleOrg: currentUser.organizationName,
          status: status === 'Completed' ? 'completed' : 'in_progress',
          notes: `Collection milestone progressed to '${status}' by authorized operator.`
        };
        setLifecycleEvents(prevLc => [...prevLc, milestone]);

        return { ...item, status };
      }
      return item;
    }));
  };

  const addMaterialRequest = (req: Omit<MaterialRequest, 'id' | 'date'>) => {
    const newReq: MaterialRequest = {
      ...req,
      id: `mreq_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setMaterialRequests(prev => [newReq, ...prev]);

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Secondary Material Inquiry Submitted',
      message: `Request for ${req.requestedQuantity} ${req.unit} of ${req.materialName} sent to listing owner.`,
      type: 'info',
      timestamp: 'Just now',
      read: false,
      link: 'exchange'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const addLifecycleEvent = (event: Omit<LifecycleMilestone, 'id'>) => {
    const newEvent: LifecycleMilestone = {
      ...event,
      id: `lc_${Date.now()}`
    };
    setLifecycleEvents(prev => [...prev, newEvent]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        listings,
        addListing,
        updateListing,
        facilities,
        collectionRequests,
        addCollectionRequest,
        updateCollectionRequestStatus,
        materialRequests,
        addMaterialRequest,
        lifecycleEvents,
        addLifecycleEvent,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        auditLogs,
        activeTab,
        setActiveTab,
        selectedListingId,
        setSelectedListingId,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
