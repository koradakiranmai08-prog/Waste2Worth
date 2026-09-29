import React from 'react';
import { Logo } from '../common/Logo';
import { Shield, Droplet, Recycle, AlertTriangle, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-[#080E18] border-t border-[#29394D] text-[#A7B4C5] text-sm">
      {/* Environmental Compliance Notice & Scope Boundary Banner */}
      <div className="border-b border-[#29394D]/70 bg-[#101C2C]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 text-xs leading-relaxed text-[#A7B4C5]">
            <div className="flex items-center gap-2 text-amber-400 font-semibold shrink-0">
              <AlertTriangle className="w-4 h-4" />
              <span>Environmental & Platform Disclaimer</span>
            </div>
            <p className="text-[11px] text-[#A7B4C5]/90">
              Waste2Worth is a digital logistics, intelligent coordination, and circular exchange platform. The platform does not directly process industrial waste, measure physical effluent in-situ, or issue binding regulatory permits. All data entries, AI-assisted classifications, and water risk indices represent preliminary screenings that require verification by accredited environmental testing laboratories and authorized jurisdictional regulatory bodies.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-[#A7B4C5] leading-relaxed max-w-sm">
              Connecting waste-generating industries with accredited recyclers, certified effluent treatment plants, and circular material recovery facilities to eliminate improper industrial disposal and safeguard waterways.
            </p>
            <div className="text-xs space-y-1 text-[#A7B4C5]/80">
              <div><strong className="text-[#F8FAFC]">Tagline:</strong> “From Industrial Waste to Industrial Resource.”</div>
              <div><strong className="text-[#F8FAFC]">Mission:</strong> “Transforming waste into value. Protecting every drop.”</div>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-[#F8FAFC] tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('exchange')} className="hover:text-[#22C55E] transition-colors">
                  Waste Exchange
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('network')} className="hover:text-[#22C55E] transition-colors">
                  Recycling Network
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-[#22C55E] transition-colors">
                  Industry Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-lab')} className="hover:text-[#22C55E] transition-colors">
                  AI Waste Classification
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('water-risk')} className="hover:text-[#06B6D4] transition-colors">
                  Water Pollution Risk Screener
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Compliance */}
          <div>
            <h4 className="text-xs font-semibold text-[#F8FAFC] tracking-wider uppercase mb-4">Compliance & Safety</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#F8FAFC] transition-colors">
                  Water Contamination Science
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#F8FAFC] transition-colors">
                  Waste Segregation Principles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#F8FAFC] transition-colors">
                  Hazardous Waste Protocols
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('impact')} className="hover:text-[#F8FAFC] transition-colors">
                  Impact Calculation Methodology
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-[#F8FAFC] transition-colors">
                  Facility Verification Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-[#F8FAFC] tracking-wider uppercase mb-4">Institutional</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#F8FAFC] transition-colors">
                  Environmental Standards FAQ
                </button>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }} className="hover:text-[#F8FAFC] transition-colors">
                  Data Governance & Privacy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }} className="hover:text-[#F8FAFC] transition-colors">
                  Platform Terms of Service
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }} className="hover:text-[#F8FAFC] transition-colors">
                  Support & EHS Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with quiet copyright */}
        <div className="mt-12 pt-8 border-t border-[#29394D]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7B4C5]/80">
          <div>
            © {new Date().getFullYear()} Waste2Worth Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-[#22C55E]">
              <Recycle className="w-3.5 h-3.5" />
              Circular Resource Network
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#06B6D4]">
              <Droplet className="w-3.5 h-3.5" />
              Water Protection Assurance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
