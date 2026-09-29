import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  Sparkles, 
  Droplets, 
  Building2, 
  Truck, 
  BarChart3, 
  Settings, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  UserCheck,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { MyWasteListings } from '../waste/MyWasteListings';
import { AiClassificationTool } from '../waste/AiClassificationTool';
import { WaterRiskTool } from '../waste/WaterRiskTool';
import { RecyclingRecommendations } from '../waste/RecyclingRecommendations';
import { CollectionRequestsView } from '../waste/CollectionRequestsView';
import { LifecycleTracker } from '../lifecycle/LifecycleTracker';
import { WasteExchange } from '../marketplace/WasteExchange';
import { ImpactDashboard } from '../impact/ImpactDashboard';
import { AdminPanel } from '../admin/AdminPanel';
import { N8nChatView } from '../chat/N8nChatView';

export const IndustryDashboard: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    listings, 
    collectionRequests, 
    setIsRegisterModalOpen, 
    setActiveTab, 
    setSelectedListingId,
    auditLogs
  } = useApp();

  const [sidebarTab, setSidebarTab] = useState<string>('overview');
  const [collapsed, setCollapsed] = useState(false);

  // Computed metrics from real/mock state
  const totalRegisteredMT = listings.reduce((acc, curr) => {
    let mt = curr.quantity;
    if (curr.unit === 'kg') mt = curr.quantity / 1000;
    if (curr.unit === 'litres') mt = curr.quantity / 1000;
    return acc + mt;
  }, 0);

  const awaitingCollectionCount = listings.filter(l => 
    l.status === 'Pending Review' || l.status === 'Verified' || l.status === 'Matched' || l.status === 'Collection Scheduled'
  ).length;

  const recycledCount = listings.filter(l => l.status === 'Recycled / Recovered').length;
  const activeRequestsCount = collectionRequests.filter(r => r.status !== 'Completed' && r.status !== 'Rejected').length;
  const waterRiskStreams = listings.filter(l => l.category === 'Industrial Wastewater' || l.hazardousStatus === 'Hazardous').length;

  // Monthly generation chart data (Demo figures)
  const monthlyData = [
    { month: 'Apr', generated: 18.5, recovered: 12.2 },
    { month: 'May', generated: 22.1, recovered: 16.8 },
    { month: 'Jun', generated: 19.4, recovered: 14.5 },
    { month: 'Jul', generated: 25.8, recovered: 19.3 },
    { month: 'Aug', generated: 28.2, recovered: 22.0 },
    { month: 'Sep', generated: 24.6, recovered: 18.9 }
  ];

  // Category breakdown for PieChart
  const categoryCounts: Record<string, number> = {};
  listings.forEach(l => {
    categoryCounts[l.category] = (categoryCounts[l.category] || 0) + 1;
  });

  const pieData = Object.keys(categoryCounts).map(cat => ({
    name: cat.split(' ')[0],
    fullName: cat,
    value: categoryCounts[cat]
  }));

  const COLORS = ['#22C55E', '#06B6D4', '#14B8A6', '#F59E0B', '#8B5CF6', '#EC4899'];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'n8n-assistant', label: 'AI Assistant (n8n)', icon: <Bot className="w-4 h-4 text-[#22C55E]" /> },
    { id: 'listings', label: 'My Waste Listings', icon: <FileText className="w-4 h-4" />, count: listings.length },
    { id: 'ai-classification', label: 'AI Classification Lab', icon: <Sparkles className="w-4 h-4 text-[#06B6D4]" /> },
    { id: 'water-risk', label: 'Water Risk Screener', icon: <Droplets className="w-4 h-4 text-[#06B6D4]" /> },
    { id: 'recommendations', label: 'Facility Recommendations', icon: <Building2 className="w-4 h-4" /> },
    { id: 'requests', label: 'Collection Requests', icon: <Truck className="w-4 h-4" />, count: collectionRequests.length },
    { id: 'lifecycle', label: 'Waste Lifecycle Tracker', icon: <Activity className="w-4 h-4" /> },
    { id: 'exchange', label: 'Waste Exchange', icon: <ArrowUpRight className="w-4 h-4" /> },
    { id: 'impact', label: 'ESG Impact Reports', icon: <BarChart3 className="w-4 h-4" /> },
    ...(currentRole === 'admin' ? [{ id: 'admin', label: 'Admin Oversight', icon: <ShieldCheck className="w-4 h-4 text-amber-400" /> }] : []),
    { id: 'settings', label: 'Facility Profile & Credentials', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] flex flex-col md:flex-row">
      {/* Collapsible Sidebar */}
      <aside className={`border-r border-[#29394D] bg-[#101C2C] flex flex-col justify-between shrink-0 transition-all duration-300 ${
        collapsed ? 'w-18' : 'w-full md:w-64 lg:w-72'
      }`}>
        <div className="p-4">
          {/* Organization Badge & Profile */}
          <div className="mb-6 p-3 rounded-xl bg-[#162437] border border-[#29394D] flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-lg bg-[#0B1220] border border-[#29394D] flex items-center justify-center font-bold text-[#22C55E] shrink-0 font-heading">
                {currentUser.organizationName.substring(0, 2).toUpperCase()}
              </div>
              {!collapsed && (
                <div className="truncate">
                  <div className="text-xs font-bold text-[#F8FAFC] truncate font-heading">
                    {currentUser.organizationName}
                  </div>
                  <div className="text-[11px] text-[#A7B4C5] truncate">
                    {currentUser.name}
                  </div>
                </div>
              )}
            </div>
            {!collapsed && (
              <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-1.5 py-0.5 rounded border border-[#22C55E]/20">
                VERIFIED
              </span>
            )}
          </div>

          {/* Quick Register Action */}
          {!collapsed && (
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="w-full mb-6 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#14B8A6] text-[#0B1220] font-semibold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:brightness-95 transition-all shadow-md shadow-[#22C55E]/10 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register New Waste Batch</span>
            </button>
          )}

          {/* Navigation Items */}
          <nav className="space-y-1" aria-label="Dashboard subnavigation">
            {sidebarItems.map(item => {
              const isActive = sidebarTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSidebarTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#162437] text-[#22C55E] font-semibold border border-[#22C55E]/30'
                      : 'text-[#A7B4C5] hover:text-[#F8FAFC] hover:bg-[#162437]/50'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {item.icon}
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!collapsed && item.count !== undefined && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0B1220] border border-[#29394D] text-[#A7B4C5] tabular-nums">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#29394D]/60 text-xs text-[#A7B4C5]">
          {!collapsed && (
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#A7B4C5]/80">ENVIRONMENT: ACTIVE</span>
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="text-xs text-[#22C55E] hover:underline"
              >
                Collapse
              </button>
            </div>
          )}
          {collapsed && (
            <button 
              onClick={() => setCollapsed(false)}
              className="w-full text-center text-xs text-[#22C55E] hover:underline"
            >
              Expand
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#0B1220]">
        {sidebarTab === 'overview' && (
          <div className="space-y-8">
            {/* Header & Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#29394D]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#A7B4C5]">
                  <span>Dashboard</span>
                  <span aria-hidden="true">/</span>
                  <span className="text-[#F8FAFC] font-medium">Facility Operations Overview</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-heading mt-1">
                  Industrial Resource Center
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#A7B4C5] bg-[#162437] px-3 py-1.5 rounded-lg border border-[#29394D]">
                  Reporting Period: Q3 2026 (Demo)
                </span>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-[#0B1220] bg-[#22C55E] hover:brightness-110 rounded-lg transition-all"
                >
                  + Add Listing
                </button>
              </div>
            </div>

            {/* n8n AI Assistant Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#162437] via-[#101C2C] to-[#162437] border border-[#22C55E]/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E] shrink-0">
                  <Bot className="w-6 h-6 text-[#22C55E]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#F8FAFC]">Waste2Worth AI Assistant (n8n Workflow)</h3>
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                      Online
                    </span>
                  </div>
                  <p className="text-xs text-[#A7B4C5] mt-0.5">
                    Ask questions on industrial wastewater regulations, COD/BOD thresholds, hazardous sludge handling, or authorized recycling pathways.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarTab('n8n-assistant')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-[#0B1220] transition-colors shrink-0 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Assistant</span>
              </button>
            </div>

            {/* 5 Overview Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Card 1 */}
              <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
                <div className="text-xs text-[#A7B4C5] mb-1">Total Waste Registered</div>
                <div className="text-2xl font-extrabold text-[#F8FAFC] font-heading tabular-nums">
                  {totalRegisteredMT.toFixed(1)} <span className="text-xs font-normal text-[#22C55E]">MT</span>
                </div>
                <div className="text-[11px] text-[#A7B4C5] mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Across {listings.length} batches</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
                <div className="text-xs text-[#A7B4C5] mb-1">Awaiting Collection</div>
                <div className="text-2xl font-extrabold text-[#06B6D4] font-heading tabular-nums">
                  {awaitingCollectionCount} <span className="text-xs font-normal text-[#A7B4C5]">Batches</span>
                </div>
                <div className="text-[11px] text-[#A7B4C5] mt-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>In active routing queue</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
                <div className="text-xs text-[#A7B4C5] mb-1">Recycled / Recovered</div>
                <div className="text-2xl font-extrabold text-[#22C55E] font-heading tabular-nums">
                  {recycledCount} <span className="text-xs font-normal text-[#A7B4C5]">Batches</span>
                </div>
                <div className="text-[11px] text-[#22C55E] mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Closed-loop certified</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
                <div className="text-xs text-[#A7B4C5] mb-1">Active Collection Bids</div>
                <div className="text-2xl font-extrabold text-amber-400 font-heading tabular-nums">
                  {activeRequestsCount} <span className="text-xs font-normal text-[#A7B4C5]">Transits</span>
                </div>
                <div className="text-[11px] text-[#A7B4C5] mt-2 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fleet dispatched</span>
                </div>
              </div>

              {/* Card 5 */}
              <div className="p-5 rounded-xl bg-[#162437] border border-[#29394D]">
                <div className="text-xs text-[#A7B4C5] mb-1">Water Risk Screening</div>
                <div className="text-2xl font-extrabold text-cyan-300 font-heading tabular-nums">
                  {waterRiskStreams} <span className="text-xs font-normal text-[#A7B4C5]">Protected</span>
                </div>
                <div className="text-[11px] text-cyan-300 mt-2 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Zero direct sewer runoff</span>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Monthly Trend Chart */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-[#162437] border border-[#29394D]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-[#F8FAFC] font-heading">
                      Waste Generation vs. Circular Recovery Trend
                    </h3>
                    <p className="text-xs text-[#A7B4C5]">
                      Monthly metric tons recorded by Apex Precision Materials (Demo Data)
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-[#06B6D4]">
                      <span className="w-3 h-3 rounded-sm bg-[#06B6D4]" />
                      Generated (MT)
                    </span>
                    <span className="flex items-center gap-1.5 text-[#22C55E]">
                      <span className="w-3 h-3 rounded-sm bg-[#22C55E]" />
                      Recovered (MT)
                    </span>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="month" stroke="#A7B4C5" fontSize={12} tickLine={false} />
                      <YAxis stroke="#A7B4C5" fontSize={12} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#101C2C', borderColor: '#29394D', borderRadius: '8px', color: '#F8FAFC' }}
                      />
                      <Bar dataKey="generated" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="recovered" fill="#22C55E" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown Donut */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#162437] border border-[#29394D] flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] font-heading mb-1">
                    Waste Stream Distribution
                  </h3>
                  <p className="text-xs text-[#A7B4C5] mb-4">
                    Active listings by material classification
                  </p>

                  <div className="h-48 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#101C2C', borderColor: '#29394D', borderRadius: '8px', color: '#F8FAFC' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#29394D]/60 text-xs">
                  {pieData.map((d, i) => (
                    <div key={i} className="flex items-center justify-between text-[#A7B4C5]">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="truncate">{d.fullName}</span>
                      </span>
                      <span className="font-mono text-[#F8FAFC] tabular-nums">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Collection Schedule & Recent Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Collection Schedule */}
              <div className="p-6 rounded-2xl bg-[#162437] border border-[#29394D]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#22C55E]" />
                    <h3 className="text-base font-bold text-[#F8FAFC] font-heading">
                      Upcoming Collection Logistics
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSidebarTab('requests')}
                    className="text-xs text-[#22C55E] hover:underline"
                  >
                    View All Requests →
                  </button>
                </div>

                <div className="space-y-3">
                  {collectionRequests.slice(0, 3).map(req => (
                    <div 
                      key={req.id}
                      className="p-3.5 rounded-xl bg-[#101C2C] border border-[#29394D] flex items-center justify-between text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-[#F8FAFC] truncate max-w-xs">{req.listingTitle}</div>
                        <div className="text-[#A7B4C5] flex items-center gap-2">
                          <span>{req.facilityName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#22C55E] font-medium">{req.status}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[#F8FAFC] font-semibold">{req.scheduledPickupDate || 'Pending'}</div>
                        <div className="text-[11px] text-[#A7B4C5]">{req.estimatedCostOrValue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Audit & Activity Log */}
              <div className="p-6 rounded-2xl bg-[#162437] border border-[#29394D]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#06B6D4]" />
                    <h3 className="text-base font-bold text-[#F8FAFC] font-heading">
                      Recent System Activity & Audit Trail
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#A7B4C5]">Immutable Ledger</span>
                </div>

                <div className="space-y-3">
                  {auditLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="p-3 rounded-lg bg-[#0B1220] border border-[#29394D]/60 text-xs">
                      <div className="flex items-center justify-between text-[#A7B4C5] mb-1">
                        <span className="font-semibold text-[#F8FAFC]">{log.actor}</span>
                        <span className="font-mono text-[10px] text-[#A7B4C5]/80">{log.timestamp}</span>
                      </div>
                      <div className="text-[#22C55E] font-mono text-[11px] mb-0.5">{log.action}</div>
                      <div className="text-[#A7B4C5] text-[11px]">{log.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sub-view Routing */}
        {sidebarTab === 'n8n-assistant' && <N8nChatView />}
        {sidebarTab === 'listings' && <MyWasteListings onSelectListing={(id) => { setSelectedListingId(id); setSidebarTab('lifecycle'); }} />}
        {sidebarTab === 'ai-classification' && <AiClassificationTool />}
        {sidebarTab === 'water-risk' && <WaterRiskTool />}
        {sidebarTab === 'recommendations' && <RecyclingRecommendations />}
        {sidebarTab === 'requests' && <CollectionRequestsView />}
        {sidebarTab === 'lifecycle' && <LifecycleTracker />}
        {sidebarTab === 'exchange' && <WasteExchange />}
        {sidebarTab === 'impact' && <ImpactDashboard />}
        {sidebarTab === 'admin' && <AdminPanel />}
        {sidebarTab === 'settings' && (
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold text-[#F8FAFC] font-heading">Facility Profile & Regulatory Credentials</h2>
            <div className="p-6 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#A7B4C5] block mb-1">Organization Legal Name</label>
                  <input readOnly value={currentUser.organizationName} className="w-full bg-[#0B1220] border border-[#29394D] rounded-lg p-2.5 text-[#F8FAFC]" />
                </div>
                <div>
                  <label className="text-[#A7B4C5] block mb-1">EHS Authorized Contact</label>
                  <input readOnly value={currentUser.name} className="w-full bg-[#0B1220] border border-[#29394D] rounded-lg p-2.5 text-[#F8FAFC]" />
                </div>
                <div>
                  <label className="text-[#A7B4C5] block mb-1">EPA / State Operating Permit</label>
                  <input readOnly value="EPA-IND-MI-99248 (Verified)" className="w-full bg-[#0B1220] border border-[#29394D] rounded-lg p-2.5 text-[#22C55E]" />
                </div>
                <div>
                  <label className="text-[#A7B4C5] block mb-1">Business Email</label>
                  <input readOnly value={currentUser.email} className="w-full bg-[#0B1220] border border-[#29394D] rounded-lg p-2.5 text-[#F8FAFC]" />
                </div>
              </div>
              <div className="pt-4 border-t border-[#29394D] flex justify-between items-center text-[#A7B4C5]">
                <span>Data privacy protection active. Public map display shows approximate coordinates only.</span>
                <span className="text-[#22C55E] font-medium">Compliance Active</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
