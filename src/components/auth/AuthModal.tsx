import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  X, 
  Building2, 
  Recycle, 
  Cpu, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Mail, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, currentRole, switchRole, currentUser } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'switch'>('switch');
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('••••••••••••');
  const [orgName, setOrgName] = useState(currentUser.organizationName);
  const [permitNo, setPermitNo] = useState('EPA-IND-MI-99248');

  if (!isAuthModalOpen) return null;

  const roleDefinitions: Record<UserRole, { label: string; org: string; icon: React.ReactNode; desc: string }> = {
    industry: {
      label: 'Industry / Waste Generator',
      org: 'Apex Precision Materials Ltd',
      icon: <Building2 className="w-5 h-5 text-[#06B6D4]" />,
      desc: 'Register industrial byproducts, screen acute water risk, and find certified off-takers.'
    },
    recycler: {
      label: 'Recycler / Waste Processor',
      org: 'Circulatech Polymer Reclaimers',
      icon: <Recycle className="w-5 h-5 text-[#22C55E]" />,
      desc: 'Browse accepted industrial streams, submit recovery bids, and issue recycling certificates.'
    },
    facility: {
      label: 'Collection & Effluent Plant (ETP/ZLD)',
      org: 'AquaClear Great Lakes HazMat',
      icon: <Cpu className="w-5 h-5 text-[#14B8A6]" />,
      desc: 'Manage tanker dispatches, intake gate tickets, and advance neutralization milestones.'
    },
    admin: {
      label: 'State Regulatory Oversight Auditor',
      org: 'State Ecology Directorate',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      desc: 'Audit facility licenses, review chain of custody manifests, and moderate listings.'
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setIsAuthModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#162437] border border-[#29394D] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-[#29394D] bg-[#101C2C] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
              Identity & Access Management
            </div>
            <h2 className="text-base font-bold text-[#F8FAFC] font-heading mt-0.5">
              Waste2Worth Authentication & Role Console
            </h2>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-[#A7B4C5] hover:text-[#F8FAFC] rounded-lg hover:bg-[#162437]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#29394D] text-xs font-semibold">
          <button
            onClick={() => setAuthMode('switch')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              authMode === 'switch' ? 'text-[#22C55E] border-b-2 border-[#22C55E] bg-[#0B1220]/40' : 'text-[#A7B4C5]'
            }`}
          >
            Quick Persona Switch
          </button>
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              authMode === 'login' ? 'text-[#22C55E] border-b-2 border-[#22C55E] bg-[#0B1220]/40' : 'text-[#A7B4C5]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              authMode === 'register' ? 'text-[#22C55E] border-b-2 border-[#22C55E] bg-[#0B1220]/40' : 'text-[#A7B4C5]'
            }`}
          >
            Register Facility
          </button>
        </div>

        <div className="p-6 space-y-5">
          {authMode === 'switch' && (
            <div className="space-y-3">
              <div className="text-xs text-[#A7B4C5]">
                Switch between verified personas to inspect platform permissions across the circular workflow:
              </div>

              {(Object.keys(roleDefinitions) as UserRole[]).map(r => {
                const isCurrent = currentRole === r;
                return (
                  <button
                    key={r}
                    onClick={() => handleRoleSelect(r)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#101C2C] border-[#22C55E] ring-1 ring-[#22C55E]/40'
                        : 'bg-[#0B1220] border-[#29394D] hover:border-[#14B8A6]/50'
                    }`}
                  >
                    <div className="mt-0.5 p-2 rounded-lg bg-[#162437] shrink-0">
                      {roleDefinitions[r].icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F8FAFC]">
                          {roleDefinitions[r].label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#22C55E] font-medium mt-0.5">
                        {roleDefinitions[r].org}
                      </div>
                      <div className="text-[11px] text-[#A7B4C5] mt-1 leading-relaxed">
                        {roleDefinitions[r].desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {(authMode === 'login' || authMode === 'register') && (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {authMode === 'register' && (
                <div>
                  <label className="text-[#F8FAFC] font-semibold block mb-1">
                    Facility / Company Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-[#F8FAFC] font-semibold block mb-1">
                  Business Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#F8FAFC] font-semibold block mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="text-[#F8FAFC] font-semibold block mb-1">
                    EPA / State Environmental Operating Permit Number
                  </label>
                  <input
                    type="text"
                    value={permitNo}
                    onChange={(e) => setPermitNo(e.target.value)}
                    placeholder="e.g. EPA-IND-MI-99248"
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#14B8A6] text-[#0B1220] font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:brightness-95 transition-all cursor-pointer"
              >
                {authMode === 'login' ? 'Sign In to Dashboard' : 'Submit Facility Verification'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
