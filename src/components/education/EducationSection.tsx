import React, { useState } from 'react';
import { 
  BookOpen, 
  Droplet, 
  Recycle, 
  ShieldAlert, 
  HelpCircle, 
  Mail, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle,
  Send
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [contactTopic, setContactTopic] = useState('Regulatory Compliance Verification');
  const [contactMessage, setContactMessage] = useState('');

  const faqs = [
    {
      q: 'Does Waste2Worth physically transport or chemically treat waste?',
      a: 'No. Waste2Worth is a digital logistics coordination, intelligent matchmaking, and digital chain-of-custody platform. Physical transport and chemical processing are handled exclusively by verified, licensed third-party recyclers, certified haulers, and permitted treatment facilities.'
    },
    {
      q: 'How does the platform screen industrial water pollution risk?',
      a: 'Our water pollution screener analyzes submitted effluent parameters—including pH, Chemical Oxygen Demand (COD), Biochemical Oxygen Demand (BOD5), Total Suspended Solids (TSS), and heavy metal traces. Any acute corrosive or toxic indicator immediately flags the stream, restricting open matching and requiring transfer to authorized Zero Liquid Discharge (ZLD) plants.'
    },
    {
      q: 'What happens if a waste stream composition is unknown?',
      a: 'Waste2Worth enforces a strict safety protocol: unknown industrial streams are NEVER automatically categorized as safe or non-hazardous. The platform flags missing tests and directs the generator to accredited ISO 17025 laboratories for certified assay testing.'
    },
    {
      q: 'Can hazardous waste be listed on the public marketplace?',
      a: 'No. The public marketplace is restricted to non-hazardous recyclable byproducts and secondary materials suitable for circular manufacturing. Regulated hazardous waste streams are visible only to accredited, state-licensed HazMat processors and ETPs holding verified RCRA permits.'
    },
    {
      q: 'How are platform environmental impact reports verified?',
      a: 'We strictly distinguish between registered waste, carrier weigh tickets, and certified facility intake logs. Registered volume is never counted as pollution prevented until verified by outbound processing documentation.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactOrg('');
      setContactMessage('');
    }, 4000);
  };

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#06B6D4]" />
          <span>Environmental Science & Compliance Knowledge Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] font-heading">
          Water Protection & Industrial Circularity Principles
        </h1>
        <p className="text-base text-[#A7B4C5] leading-relaxed">
          Understanding the science of watershed preservation, source segregation, and legal regulatory compliance for modern industrial manufacturing.
        </p>
      </div>

      {/* 4 Informational Educational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: How Waste Contaminates Water */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4">
          <div className="p-3 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] w-fit border border-[#06B6D4]/30">
            <Droplet className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#F8FAFC] font-heading">
            How Industrial Waste Contaminates Waterways
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C5] leading-relaxed">
            Industrial runoff doesn't stay on plant grounds. Corrosive rinse baths with extreme pH leach heavy metals from soil into shallow aquifers. High COD/BOD effluents starve aquatic ecosystems of dissolved oxygen, creating catastrophic biological dead zones in receiving rivers and lakes.
          </p>
          <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#29394D]/60 text-xs text-[#06B6D4] space-y-1">
            <strong>Key takeaway:</strong> Pretreatment and automated risk screening prevent irreversible toxic bioaccumulation in human drinking reservoirs.
          </div>
        </div>

        {/* Card 2: Segregation at the Source */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4">
          <div className="p-3 rounded-xl bg-[#22C55E]/10 text-[#22C55E] w-fit border border-[#22C55E]/30">
            <Recycle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#F8FAFC] font-heading">
            Waste Segregation & Circular Economy
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C5] leading-relaxed">
            Mixing incompatible industrial streams destroys recycling viability and creates dangerous exothermic or toxic reactions. Segregating clean homopolymer polypropylene or unadulterated aluminum chips at the machine tool preserves high secondary market value and enables infinite closed-loop remelting.
          </p>
          <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#29394D]/60 text-xs text-[#22C55E] space-y-1">
            <strong>Key takeaway:</strong> Pure, segregated single-stream byproducts convert costly waste disposal into profitable industrial feedstock.
          </div>
        </div>

        {/* Card 3: Safe Handling & Chain of Custody */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4">
          <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 w-fit border border-amber-400/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#F8FAFC] font-heading">
            Safe Handling & Manifest Integrity
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C5] leading-relaxed">
            Every transport batch must have documented secondary containment, proper DOT placarding, and compatible container materials (e.g. 316-stainless or FRP for corrosives). Digital chain of custody ensures that no intermediary diverts material to unauthorized midnight dumping.
          </p>
          <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#29394D]/60 text-xs text-amber-400 space-y-1">
            <strong>Key takeaway:</strong> Regulated hazardous waste must only be transferred with signed electronic manifests and verified gate scale tickets.
          </div>
        </div>

        {/* Card 4: Qualified Environmental Authority Contacts */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#162437] border border-[#29394D] space-y-4">
          <div className="p-3 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] w-fit border border-[#14B8A6]/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#F8FAFC] font-heading">
            Regulatory Guidance & Emergency Protocols
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C5] leading-relaxed">
            Never attempt unverified neutralization or chemical mixing on unidentified drums. For unknown barrels, legacy chemical stockpiles, or acute spills, plant operators must immediately engage accredited hazardous materials response units and notify regional EPA / state environmental protection authorities.
          </p>
          <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#29394D]/60 text-xs text-[#14B8A6] space-y-1">
            <strong>Key takeaway:</strong> Waste2Worth provides direct linkage to certified emergency response and hazardous waste treatment operators.
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
            Operational Clarifications
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl bg-[#162437] border border-[#29394D] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-[#F8FAFC] font-heading cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#A7B4C5] transition-transform ${isOpen ? 'rotate-180 text-[#22C55E]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#A7B4C5] leading-relaxed border-t border-[#29394D]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact & EHS Consultation Form */}
      <div id="contact" className="p-8 sm:p-12 rounded-3xl bg-[#162437] border border-[#29394D] max-w-3xl mx-auto space-y-6 shadow-2xl">
        <div className="space-y-2 text-center">
          <div className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
            Direct Environmental Consultation
          </div>
          <h2 className="text-2xl font-bold text-[#F8FAFC] font-heading">
            Connect with Waste2Worth Compliance Specialists
          </h2>
          <p className="text-xs text-[#A7B4C5]">
            Have inquiries regarding facility verification, industrial water risk screening, or circular exchange onboarding? Submit your details below.
          </p>
        </div>

        {contactSubmitted ? (
          <div className="p-8 rounded-2xl bg-[#0B1220] border border-[#22C55E]/40 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#22C55E] mx-auto" />
            <div className="text-sm font-bold text-[#F8FAFC]">Consultation Inquiry Dispatched</div>
            <p className="text-xs text-[#A7B4C5]">
              Thank you. Our environmental engineering team will review your plant profile and respond within 1 business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[#F8FAFC] font-semibold block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Arthur Pendelton"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#F8FAFC] font-semibold block mb-1">Business Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. arthur@manufacturing-corp.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[#F8FAFC] font-semibold block mb-1">Organization / Plant Name</label>
                <input
                  type="text"
                  placeholder="e.g. Great Lakes Polymer Systems LLC"
                  value={contactOrg}
                  onChange={(e) => setContactOrg(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#F8FAFC] font-semibold block mb-1">Inquiry Topic</label>
                <select
                  value={contactTopic}
                  onChange={(e) => setContactTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                >
                  <option value="Regulatory Compliance Verification">Regulatory Compliance Verification</option>
                  <option value="Facility Network Onboarding">Facility Network Onboarding</option>
                  <option value="Water Pollution Screener Integration">Water Pollution Screener Integration</option>
                  <option value="Bulk Industrial Material Exchange">Bulk Industrial Material Exchange</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[#F8FAFC] font-semibold block mb-1">Detailed Message / Waste Profile *</label>
              <textarea
                rows={4}
                required
                placeholder="Specify your stream composition, estimated annual volumes, current disposal bottlenecks, or certification questions..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#29394D] text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#14B8A6] text-[#0B1220] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:brightness-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#22C55E]/15"
            >
              <Send className="w-4 h-4" />
              <span>Submit Compliance Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
