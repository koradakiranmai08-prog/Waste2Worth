import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { MetricsBanner } from './components/home/MetricsBanner';
import { CircularWorkflow } from './components/home/CircularWorkflow';
import { ProblemSolution } from './components/home/ProblemSolution';
import { FeatureGrid } from './components/home/FeatureGrid';
import { CategoriesSection } from './components/home/CategoriesSection';
import { MapPreviewSection } from './components/home/MapPreviewSection';
import { CallToAction } from './components/home/CallToAction';
import { IndustryDashboard } from './components/dashboard/IndustryDashboard';
import { WasteExchange } from './components/marketplace/WasteExchange';
import { FacilityDirectory } from './components/network/FacilityDirectory';
import { ImpactDashboard } from './components/impact/ImpactDashboard';
import { EducationSection } from './components/education/EducationSection';
import { AiClassificationTool } from './components/waste/AiClassificationTool';
import { WaterRiskTool } from './components/waste/WaterRiskTool';
import { LifecycleTracker } from './components/lifecycle/LifecycleTracker';
import { RecyclingRecommendations } from './components/waste/RecyclingRecommendations';
import { AdminPanel } from './components/admin/AdminPanel';
import { WasteRegistrationModal } from './components/waste/WasteRegistrationModal';
import { AuthModal } from './components/auth/AuthModal';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1220] text-[#F8FAFC]">
      {/* Top Bar Contract Navbar */}
      <Navbar onOpenNotifications={() => setNotificationsOpen(true)} />

      {/* Main View Router */}
      <div className="flex-1">
        {activeTab === 'home' && (
          <main>
            <Hero />
            <MetricsBanner />
            <CircularWorkflow />
            <ProblemSolution />
            <FeatureGrid />
            <CategoriesSection />
            <MapPreviewSection />
            <CallToAction />
          </main>
        )}

        {activeTab === 'how-it-works' && (
          <main className="py-6">
            <CircularWorkflow />
            <ProblemSolution />
          </main>
        )}

        {activeTab === 'dashboard' && (
          <main>
            <IndustryDashboard />
          </main>
        )}

        {activeTab === 'exchange' && (
          <main>
            <WasteExchange />
          </main>
        )}

        {activeTab === 'network' && (
          <main>
            <FacilityDirectory />
          </main>
        )}

        {activeTab === 'impact' && (
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            <ImpactDashboard />
          </main>
        )}

        {activeTab === 'about' && (
          <main>
            <EducationSection />
          </main>
        )}

        {activeTab === 'ai-lab' && (
          <main className="py-10 px-4 sm:px-6 lg:px-8">
            <AiClassificationTool />
          </main>
        )}

        {activeTab === 'water-risk' && (
          <main className="py-10 px-4 sm:px-6 lg:px-8">
            <WaterRiskTool />
          </main>
        )}

        {activeTab === 'lifecycle' && (
          <main className="py-10 px-4 sm:px-6 lg:px-8">
            <LifecycleTracker />
          </main>
        )}

        {activeTab === 'recommendations' && (
          <main className="py-10 px-4 sm:px-6 lg:px-8">
            <RecyclingRecommendations />
          </main>
        )}

        {activeTab === 'admin' && (
          <main className="py-10 px-4 sm:px-6 lg:px-8">
            <AdminPanel />
          </main>
        )}
      </div>

      {/* Global Modals & Drawers */}
      <WasteRegistrationModal />
      <AuthModal />
      <NotificationDrawer 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
