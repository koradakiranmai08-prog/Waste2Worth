import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  Bell, 
  Menu, 
  X, 
  PlusCircle, 
  LayoutDashboard, 
  ShieldCheck, 
  Building2, 
  Recycle, 
  Cpu, 
  ChevronDown,
  UserCheck,
  Bot
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications, onOpenChat }) => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    currentRole, 
    switchRole, 
    notifications,
    setIsRegisterModalOpen,
    setIsAuthModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; desc: string }> = {
    industry: {
      label: 'Industry Generator',
      icon: <Building2 className="w-4 h-4 text-[#06B6D4]" />,
      desc: 'Apex Precision Materials Ltd'
    },
    recycler: {
      label: 'Recycler / Processor',
      icon: <Recycle className="w-4 h-4 text-[#22C55E]" />,
      desc: 'Circulatech Polymer Reclaimers'
    },
    facility: {
      label: 'Effluent / Treatment Plant',
      icon: <Cpu className="w-4 h-4 text-[#14B8A6]" />,
      desc: 'AquaClear Effluent & HazMat'
    },
    admin: {
      label: 'Regulatory Oversight',
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
      desc: 'State Ecology Directorate'
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'exchange', label: 'Waste Exchange' },
    { id: 'network', label: 'Recycling Network' },
    { id: 'impact', label: 'Impact & Reports' },
    { id: 'about', label: 'About & Safety' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1220]/95 backdrop-blur-md border-b border-[#29394D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand mark */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] rounded-lg transition-transform active:scale-95"
        >
          <Logo />
        </button>

        {/* Zone 2: Navigation Links (Text with subtle hover state) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#A7B4C5]" aria-label="Main Navigation">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 relative whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'text-[#F8FAFC] font-semibold' 
                    : 'hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#22C55E] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Active Role */}
        <div className="flex items-center gap-3">
          {/* Dashboard Switch Button */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border ${
              activeTab === 'dashboard'
                ? 'bg-[#162437] text-[#22C55E] border-[#22C55E]/40 shadow-sm'
                : 'bg-[#101C2C] text-[#A7B4C5] border-[#29394D] hover:text-[#F8FAFC] hover:border-[#14B8A6]/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          {/* AI Chat Assistant Button */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#162437] hover:bg-[#1E3048] text-[#22C55E] border border-[#22C55E]/30 hover:border-[#22C55E] transition-all shadow-sm group"
              title="Open Waste2Worth AI Assistant (powered by n8n)"
            >
              <Bot className="w-3.5 h-3.5 text-[#22C55E] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">AI Chat</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            </button>
          )}

          {/* In-App Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative p-2 text-[#A7B4C5] hover:text-[#F8FAFC] hover:bg-[#162437] rounded-lg border border-[#29394D] transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#06B6D4] text-[10px] font-bold text-[#0B1220] tabular-nums">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Role Switcher Popover */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#F8FAFC] bg-[#162437] hover:bg-[#101C2C] border border-[#29394D] rounded-lg transition-all focus:outline-none"
              title="Switch demo persona/role"
            >
              <span className="flex items-center gap-1.5">
                {roleLabels[currentRole].icon}
                <span className="hidden md:inline font-semibold">{roleLabels[currentRole].label}</span>
              </span>
              <ChevronDown className="w-3 h-3 text-[#A7B4C5]" />
            </button>

            {roleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-xl bg-[#162437] border border-[#29394D] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setRoleDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-[#29394D]/60 text-xs text-[#A7B4C5]">
                  <span className="font-semibold text-[#F8FAFC] block">Switch Active Perspective</span>
                  Select an authenticated user role to explore the multi-sided workflow:
                </div>
                {(Object.keys(roleLabels) as UserRole[]).map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      switchRole(role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 flex items-start gap-2.5 text-xs hover:bg-[#101C2C] transition-colors ${
                      currentRole === role ? 'bg-[#0B1220]/70 text-[#22C55E]' : 'text-[#F8FAFC]'
                    }`}
                  >
                    <div className="mt-0.5">{roleLabels[role].icon}</div>
                    <div>
                      <div className="font-semibold flex items-center gap-1.5">
                        {roleLabels[role].label}
                        {currentRole === role && <UserCheck className="w-3.5 h-3.5 text-[#22C55E]" />}
                      </div>
                      <div className="text-[11px] text-[#A7B4C5] truncate">{roleLabels[role].desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Action CTA */}
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B1220] bg-gradient-to-r from-[#22C55E] to-[#14B8A6] hover:brightness-110 active:brightness-95 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Register Waste</span>
            <span className="sm:hidden">Register</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#A7B4C5] hover:text-[#F8FAFC] hover:bg-[#162437] rounded-lg border border-[#29394D]"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101C2C] border-b border-[#29394D] px-4 pt-3 pb-5 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-[#162437] text-[#22C55E] font-medium' 
                  : 'text-[#A7B4C5] hover:text-[#F8FAFC] hover:bg-[#162437]/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#29394D] flex flex-col gap-2">
            {onOpenChat && (
              <button
                onClick={() => {
                  onOpenChat();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-[#22C55E] bg-[#162437] border border-[#22C55E]/30 rounded-lg font-medium flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#22C55E]" />
                  Waste2Worth AI Assistant (n8n)
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              </button>
            )}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-3 py-2 text-sm text-[#F8FAFC] bg-[#162437] rounded-lg font-medium flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-[#06B6D4]" />
              Open Operational Dashboard
            </button>
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#A7B4C5] hover:text-[#F8FAFC] rounded-lg font-medium"
            >
              Account & Credentials Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
