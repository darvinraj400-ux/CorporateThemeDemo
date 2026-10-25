import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowUpRight, ArrowRight, ChevronDown, ChevronRight,
  Target, BarChart3, Cpu, Users, CheckCircle2, Circle,
  Mail, Phone, MapPin, Linkedin, Twitter,
  ArrowLeft, Clock, Calendar
} from 'lucide-react';
import { services, getServiceById } from './data/services';
import { caseStudies, getCaseStudyById, getCaseStudiesByService } from './data/caseStudies';
import { articles, articleCategories } from './data/insights';
import { teamMembers } from './data/team';
import {
  getAssessmentResult, challengeOptions, situationOptions, outcomeOptions,
  type AssessmentAnswers
} from './lib/assessment';
import { validateForm, hasErrors, initialFormData, type FormData } from './lib/validation';

// ─── ANIMATION VARIANTS ───
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// ─── HEADER ───
function Header({ onNavigate }: { onNavigate: (section: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { label: 'Expertise', section: 'expertise' },
    { label: 'Our Approach', section: 'approach' },
    { label: 'Case Studies', section: 'case-studies' },
    { label: 'Insights', section: 'insights' },
    { label: 'About', section: 'about' },
    { label: 'Contact', section: 'contact' }
  ];

  const handleNav = (section: string) => {
    setMobileOpen(false);
    onNavigate(section);
  };

  const headerTop = announcementDismissed || scrolled ? 'top-0' : 'top-8';

  return (
    <>
      {!announcementDismissed && !scrolled && (
        <div className="fixed top-0 left-0 right-0 z-[51] bg-navy text-white/80 text-xs py-2 transition-all duration-300">
          <div className="container-corporate flex items-center justify-center gap-2">
            <span>Independent consulting practice — helping organizations navigate complexity with clarity.</span>
            <button
              onClick={() => setAnnouncementDismissed(true)}
              className="ml-2 text-white/50 hover:text-white p-0.5"
              aria-label="Dismiss announcement"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${headerTop} ${
          scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-border-grey shadow-sm' : 'bg-white'
        }`}
      >
        <div className="container-corporate flex items-center justify-between h-16 md:h-18">
          <button
            onClick={() => handleNav('hero')}
            className="flex items-center gap-2 font-semibold text-navy text-lg tracking-tight"
            aria-label="Corporate Consulting - Home"
          >
            <div className="w-8 h-8 bg-navy rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">CC</span>
            </div>
            <span className="hidden sm:inline">Corporate Consulting</span>
          </button>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map(item => (
              <button
                key={item.section}
                onClick={() => handleNav(item.section)}
                className="text-sm font-medium text-graphite hover:text-professional-blue transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('contact')}
              className="hidden md:inline-flex items-center gap-2 bg-professional-blue text-white px-4 py-2 text-sm font-medium rounded hover:bg-bright-blue transition-colors"
            >
              TALK TO OUR TEAM
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-graphite hover:text-navy"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-4">
              <span className="text-white font-semibold text-lg">Corporate Consulting</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white hover:text-pale-blue"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4 mt-4">
              {navItems.map(item => (
                <button
                  key={item.section}
                  onClick={() => handleNav(item.section)}
                  className="text-left text-white text-lg font-medium py-3 px-4 rounded hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('contact')}
                className="mt-4 bg-professional-blue text-white py-3 px-4 rounded font-medium text-center hover:bg-bright-blue transition-colors"
              >
                TALK TO OUR TEAM
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ───
function Hero({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <section id="hero" className="pt-28 md:pt-36 pb-16 md:pb-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(20,38,61,0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pale-blue/20 to-transparent pointer-events-none" />
      <div className="container-corporate relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-professional-blue mb-4">
              Independent Consulting / Strategy & Execution
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy leading-[1.1] mb-6">
              Turn complexity<br />into forward motion.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate max-w-lg mb-8 leading-relaxed">
              Practical strategy and clear execution for teams ready to make their next move.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 bg-professional-blue text-white px-6 py-3 text-sm font-semibold rounded hover:bg-bright-blue transition-colors"
              >
                TALK TO OUR TEAM
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('expertise')}
                className="inline-flex items-center justify-center gap-2 border border-border-grey text-graphite px-6 py-3 text-sm font-semibold rounded hover:border-professional-blue hover:text-professional-blue transition-colors"
              >
                EXPLORE OUR EXPERTISE
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-8 text-sm text-slate italic font-serif">
              Clear thinking. Practical outcomes.
            </motion.p>
          </motion.div>

          {/* Mobile hero image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:hidden mt-8"
          >
            <div className="aspect-[16/9] rounded-lg overflow-hidden relative shadow-lg">
              <img
                src="https://image.qwenlm.ai/generated-images/52e9cbc3-e153-4a54-aeb0-ab47fe0a32a4/_result.png"
                alt="Abstract architectural composition representing strategic clarity"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden relative shadow-2xl">
              <img
                src="https://image.qwenlm.ai/generated-images/52e9cbc3-e153-4a54-aeb0-ab47fe0a32a4/_result.png"
                alt="Abstract architectural composition representing strategic clarity and forward momentum"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="text-white/80 text-xs font-mono backdrop-blur-sm bg-navy/30 px-3 py-1.5 rounded">
                  STRATEGY · OPERATIONS · DIGITAL · CHANGE
                </div>
                <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-navy/20">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TRUST STRIP ───
function TrustStrip() {
  const items = [
    { icon: Target, label: 'Strategy' },
    { icon: BarChart3, label: 'Operations' },
    { icon: Cpu, label: 'Digital Transformation' },
    { icon: Users, label: 'Organizational Change' }
  ];

  return (
    <section className="border-y border-border-grey bg-soft-grey py-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, transparent 49%, rgba(40,90,197,0.3) 50%, transparent 51%)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      <div className="container-corporate relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
              <item.icon className="w-5 h-5 text-professional-blue shrink-0" />
              <span className="text-sm font-medium text-graphite">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERTISE SECTION ───
function ExpertiseSection({ onNavigate, onSelectService }: { onNavigate: (section: string) => void; onSelectService: (id: string) => void }) {
  const serviceIcons = [Target, BarChart3, Cpu, Users];

  return (
    <section id="expertise" className="section-padding bg-white relative">
      {/* Subtle decorative corner element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pale-blue/30 to-transparent pointer-events-none" />
      <div className="container-corporate relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-professional-blue mb-3">
            01 / Our Expertise
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Clear thinking for meaningful business change.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate max-w-2xl mb-12 text-lg">
            We work with teams to understand the challenge, prioritize the right actions, and build a practical route forward.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border-grey rounded-lg p-6 md:p-8 hover:border-professional-blue/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded bg-pale-blue flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-professional-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-slate font-mono mb-1">{service.number}</p>
                    <h3 className="text-xl font-semibold text-navy">{service.title}</h3>
                  </div>
                </div>
                <p className="text-slate mb-4 leading-relaxed">{service.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.problems.slice(0, 3).map((p, j) => (
                    <span key={j} className="text-xs bg-soft-grey text-graphite px-2.5 py-1 rounded">
                      {p.length > 35 ? p.slice(0, 35) + '…' : p}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="text-sm font-medium text-professional-blue hover:text-bright-blue inline-flex items-center gap-1 transition-colors"
                  >
                    View details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-sm font-medium text-slate hover:text-graphite inline-flex items-center gap-1 transition-colors"
                  >
                    Discuss this area
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── APPROACH SECTION ───
function ApproachSection() {
  const steps = [
    { number: '01', title: 'Understand', description: 'Clarify the challenge, context, stakeholder perspectives, and desired outcomes.', activities: ['Stakeholder interviews', 'Context mapping', 'Objective clarification'] },
    { number: '02', title: 'Define', description: 'Identify priorities, evaluate options, and establish a practical direction.', activities: ['Priority assessment', 'Option evaluation', 'Direction setting'] },
    { number: '03', title: 'Plan', description: 'Translate the agreed direction into a sequence of actions, responsibilities, and decision points.', activities: ['Action sequencing', 'Responsibility assignment', 'Milestone definition'] },
    { number: '04', title: 'Execute & Learn', description: 'Support implementation, review progress, and adjust the approach when new information becomes available.', activities: ['Implementation support', 'Progress review', 'Course correction'] }
  ];

  return (
    <section id="approach" className="section-padding bg-soft-grey relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(20,38,61,0.5) 35px, rgba(20,38,61,0.5) 36px)`
        }} />
      </div>
      <div className="container-corporate relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="mb-12"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-professional-blue mb-3">
            03 / How We Work
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
            A clear path from the first question to the next move.
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg p-6 border border-border-grey"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-professional-blue font-mono">{step.number}</span>
                <div className="flex-1 h-px bg-border-grey" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">{step.title}</h3>
              <p className="text-sm text-slate mb-4 leading-relaxed">{step.description}</p>
              <ul className="space-y-1.5">
                {step.activities.map((a, j) => (
                  <li key={j} className="text-xs text-graphite flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-muted-teal shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES SECTION ───
function CaseStudiesSection({ onSelectCaseStudy }: { onSelectCaseStudy: (id: string) => void }) {
  const [filter, setFilter] = useState<string>('all');

  const filteredStudies = filter === 'all'
    ? caseStudies
    : caseStudies.filter(cs => cs.serviceId === filter);

  return (
    <section id="case-studies" className="section-padding bg-white relative">
      {/* Subtle decorative element */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pale-blue/20 to-transparent pointer-events-none -translate-x-1/2 translate-y-1/2" />
      <div className="container-corporate relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="mb-8"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-professional-blue mb-3">
            02 / Selected Case Studies
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Ideas are only useful when they lead somewhere.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate max-w-2xl text-lg">
            Illustrative examples showing how consulting work can be structured and presented clearly.
          </motion.p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm rounded font-medium transition-colors ${
              filter === 'all' ? 'bg-navy text-white' : 'bg-soft-grey text-graphite hover:bg-border-grey'
            }`}
          >
            All
          </button>
          {services.map(s => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className={`px-3 py-1.5 text-sm rounded font-medium transition-colors ${
                filter === s.id ? 'bg-navy text-white' : 'bg-soft-grey text-graphite hover:bg-border-grey'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {filteredStudies.length === 0 ? (
          <div className="text-center py-12 text-slate">
            <p>No case studies match this filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredStudies.map((cs, i) => (
              <motion.article
                key={cs.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border-grey rounded-lg overflow-hidden hover:border-professional-blue/30 hover:shadow-sm transition-all group"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded backdrop-blur-sm font-medium">
                      {cs.industry}
                    </span>
                  </div>
                  {cs.isIllustrative && (
                    <div className="absolute top-3 right-3">
                      <span className="text-xs bg-white/20 text-white/90 px-2 py-0.5 rounded backdrop-blur-sm">
                        Illustrative
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-professional-blue transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-slate mb-4 line-clamp-2">{cs.challenge}</p>
                  <button
                    onClick={() => onSelectCaseStudy(cs.id)}
                    className="text-sm font-medium text-professional-blue inline-flex items-center gap-1 hover:text-bright-blue transition-colors"
                  >
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── PHILOSOPHY SECTION ───
function PhilosophySection() {
  const principles = [
    { title: 'Clarity Over Complexity', description: 'Make the real decision easier to understand.' },
    { title: 'Evidence Over Assumptions', description: 'Use appropriate information, context, and analysis to support recommendations.' },
    { title: 'Progress Over Presentation', description: 'Create work that supports decisions and execution, not just attractive slides.' },
    { title: 'Collaboration Over Silos', description: 'Help the right people work toward a shared understanding of the challenge.' }
  ];

  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 50px, rgba(68,127,232,0.2) 50px, rgba(68,127,232,0.2) 51px)`
        }} />
      </div>
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-professional-blue/10 to-transparent pointer-events-none" />
      <div className="container-corporate relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
              Good decisions start with clear thinking.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/70 mb-10 leading-relaxed">
              Complex challenges rarely benefit from unnecessary complexity. We help teams make sense of competing priorities, understand their options, and focus on the steps that move the work forward.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6">
              {principles.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-l-2 border-professional-blue pl-5"
                >
                  <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                  <p className="text-white/60 text-sm">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://image.qwenlm.ai/generated-images/04a489a0-ebfb-4668-b952-21899ffc6b88/_result.png"
                alt="Strategic workspace with diagrams and planning materials"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── INSIGHTS SECTION ───
function InsightsSection() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = categoryFilter === 'all'
    ? articles
    : articles.filter(a => a.category === categoryFilter);

  return (
    <section id="insights" className="section-padding bg-soft-grey relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-20 w-40 h-40 border border-border-grey/50 rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-border-grey/50 rounded-full pointer-events-none" />
      <div className="container-corporate relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="mb-8"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-professional-blue mb-3">
            Insights & Resources
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Practical thinking for business challenges.
          </motion.h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 text-sm rounded font-medium transition-colors ${
              categoryFilter === 'all' ? 'bg-navy text-white' : 'bg-white text-graphite hover:bg-border-grey border border-border-grey'
            }`}
          >
            All
          </button>
          {articleCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-sm rounded font-medium transition-colors ${
                categoryFilter === cat ? 'bg-navy text-white' : 'bg-white text-graphite hover:bg-border-grey border border-border-grey'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => {
            // Map articles to relevant images based on service area
            const articleImages: Record<string, string> = {
              'business-strategy': 'https://image.qwenlm.ai/generated-images/eb3a4785-1c2a-4cb3-a2bb-d12f741cceb6/_result.png',
              'operational-excellence': 'https://image.qwenlm.ai/generated-images/8a167887-2faa-4ec7-bfda-e16ce448328c/_result.png',
              'digital-transformation': 'https://image.qwenlm.ai/generated-images/8a8e5072-b761-42a2-80fd-3f320347c2d8/_result.png',
              'organizational-change': 'https://image.qwenlm.ai/generated-images/2e23b6ac-c399-4afb-b921-eb684652327f/_result.png'
            };
            const articleImage = article.serviceId ? articleImages[article.serviceId] : null;

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg border border-border-grey hover:border-professional-blue/30 hover:shadow-sm transition-all group overflow-hidden"
              >
                {articleImage && (
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src={articleImage}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-professional-blue bg-pale-blue px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-navy mb-2 group-hover:text-professional-blue transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate mb-4 line-clamp-3">{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-xs font-medium text-professional-blue inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── TEAM SECTION ───
function TeamSection() {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-pale-blue/20 to-transparent pointer-events-none" />
      <div className="container-corporate relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="mb-12"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-professional-blue mb-3">
            About Us
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Experienced practitioners, practical approach.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate max-w-2xl text-lg">
            Our team brings deep consulting experience across strategy, operations, technology, and organizational change.
          </motion.p>
          <motion.p variants={fadeUp} className="text-xs text-slate mt-3 italic">
            Note: Team profiles shown are sample representations for demonstration purposes.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-border-grey rounded-lg overflow-hidden hover:shadow-md transition-all group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-soft-grey">
                <img
                  src={member.portrait}
                  alt={`${member.name}, ${member.role}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-navy mb-1">{member.name}</h3>
                <p className="text-sm text-professional-blue font-medium mb-3">{member.role}</p>
                <p className="text-xs text-slate mb-3 leading-relaxed line-clamp-3">{member.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {member.expertise.slice(0, 2).map((e, j) => (
                    <span key={j} className="text-xs bg-soft-grey text-graphite px-2 py-0.5 rounded">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BUSINESS READINESS ASSESSMENT ───
function ReadinessAssessment({ onNavigate, onPrefillService }: { onNavigate: (section: string) => void; onPrefillService?: (serviceId: string) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({ challenge: '', situation: '', outcome: '' });
  const [showResult, setShowResult] = useState(false);

  const steps = [
    { title: 'What is your main challenge?', options: challengeOptions, key: 'challenge' as const },
    { title: 'How would you describe your current situation?', options: situationOptions, key: 'situation' as const },
    { title: 'What outcome are you looking for?', options: outcomeOptions, key: 'outcome' as const }
  ];

  const handleSelect = (value: string) => {
    const key = steps[step].key;
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({ challenge: '', situation: '', outcome: '' });
    setShowResult(false);
  };

  const result = showResult ? getAssessmentResult(answers) : null;

  return (
    <section id="assessment" className="section-padding bg-pale-blue relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-professional-blue/10 rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-professional-blue/10 rounded-full pointer-events-none" />
      <div className="container-corporate max-w-3xl relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-professional-blue mb-3">
            Interactive Tool
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Business Readiness Assessment
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate max-w-xl mx-auto">
            A quick assessment to help identify which consulting area may best suit your current challenge. This is a preliminary discovery tool, not a formal diagnostic.
          </motion.p>
        </motion.div>

        <div className="bg-white rounded-lg border border-border-grey p-6 md:p-8 shadow-sm">
          {/* Progress */}
          {!showResult && (
            <div className="flex items-center gap-2 mb-8">
              {steps.map((_, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    i < step ? 'bg-professional-blue text-white' :
                    i === step ? 'bg-navy text-white' : 'bg-soft-grey text-slate'
                  }`}>
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 ${i < step ? 'bg-professional-blue' : 'bg-border-grey'}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!showResult && !result ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-navy mb-6">{steps[step].title}</h3>
                <div className="space-y-2">
                  {steps[step].options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        answers[steps[step].key] === opt.value
                          ? 'border-professional-blue bg-pale-blue text-navy'
                          : 'border-border-grey hover:border-professional-blue/50 hover:bg-soft-grey text-graphite'
                      }`}
                    >
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 text-sm text-slate hover:text-graphite inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                )}
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-pale-blue rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-professional-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Recommended Area: {result.serviceTitle}</h3>
                  <p className="text-slate text-sm">{result.explanation}</p>
                </div>

                <div className="bg-soft-grey rounded-lg p-5 mb-6">
                  <h4 className="text-sm font-semibold text-navy mb-3">Suggested Discussion Topics</h4>
                  <ul className="space-y-2">
                    {result.discussionTopics.map((topic, i) => (
                      <li key={i} className="text-sm text-graphite flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-professional-blue mt-0.5 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onPrefillService?.(result.serviceId);
                      onNavigate('contact');
                    }}
                    className="flex-1 bg-professional-blue text-white py-3 px-4 rounded font-medium text-sm hover:bg-bright-blue transition-colors text-center"
                  >
                    Discuss This With Our Team
                  </button>
                  <button
                    onClick={() => {
                      const service = getServiceById(result.serviceId);
                      if (service) {
                        const el = document.getElementById('expertise');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex-1 border border-border-grey text-graphite py-3 px-4 rounded font-medium text-sm hover:border-professional-blue transition-colors text-center"
                  >
                    Explore Service Details
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 border border-border-grey text-slate py-3 px-4 rounded font-medium text-sm hover:bg-soft-grey transition-colors text-center"
                  >
                    Start Over
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT FORM ───
function ContactSection({ prefillService }: { prefillService?: string }) {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    serviceInterest: prefillService || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (prefillService) {
      setFormData(prev => ({ ...prev, serviceInterest: prefillService }));
    }
  }, [prefillService]);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors as Record<string, string>);
      return;
    }
    setStatus('submitting');
    // Simulate submission (no real backend)
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <section id="contact" className="section-padding bg-white">
        <div className="container-corporate max-w-2xl">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-6 bg-pale-blue rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-professional-blue" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-4">Thank you for your inquiry.</h2>
            <p className="text-slate mb-6">
              This is a demonstration form. In a live environment, your inquiry would be received by our team. We typically respond within one business day.
            </p>
            <p className="text-sm text-slate mb-8">
              Your submitted information: <strong>{formData.fullName}</strong> from <strong>{formData.organization}</strong> — interested in <strong>{services.find(s => s.id === formData.serviceInterest)?.title || formData.serviceInterest}</strong>.
            </p>
            <button
              onClick={() => { setFormData(initialFormData); setStatus('idle'); }}
              className="text-sm font-medium text-professional-blue hover:text-bright-blue"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-soft-grey relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-bl from-professional-blue to-transparent" />
      </div>
      <div className="container-corporate relative">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-professional-blue mb-3">
                04 / Let's Talk
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Your next move starts with a conversation.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate mb-8 leading-relaxed">
                Tell us a little about the challenge you're working through. We'll use the information to understand what kind of discussion may be helpful.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-graphite">
                  <Mail className="w-4 h-4 text-professional-blue" />
                  <span>hello@corporateconsulting.example</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-graphite">
                  <Phone className="w-4 h-4 text-professional-blue" />
                  <span>+1 (555) 000-0000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-graphite">
                  <MapPin className="w-4 h-4 text-professional-blue" />
                  <span>Available for remote and on-site engagements</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-soft-grey rounded-lg p-6 md:p-8 border border-border-grey" noValidate>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-graphite mb-1.5">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={e => handleChange('fullName', e.target.value)}
                    className={`w-full px-3 py-2.5 rounded border text-sm bg-white ${
                      errors.fullName ? 'border-red-400' : 'border-border-grey'
                    } focus:border-professional-blue focus:ring-1 focus:ring-professional-blue outline-none transition-colors`}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  />
                  {errors.fullName && <p id="fullName-error" className="text-xs text-red-500 mt-1" role="alert">{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-graphite mb-1.5">
                    Work email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className={`w-full px-3 py-2.5 rounded border text-sm bg-white ${
                      errors.email ? 'border-red-400' : 'border-border-grey'
                    } focus:border-professional-blue focus:ring-1 focus:ring-professional-blue outline-none transition-colors`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-xs text-red-500 mt-1" role="alert">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-graphite mb-1.5">
                    Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={e => handleChange('organization', e.target.value)}
                    className={`w-full px-3 py-2.5 rounded border text-sm bg-white ${
                      errors.organization ? 'border-red-400' : 'border-border-grey'
                    } focus:border-professional-blue focus:ring-1 focus:ring-professional-blue outline-none transition-colors`}
                    aria-invalid={!!errors.organization}
                    aria-describedby={errors.organization ? 'organization-error' : undefined}
                  />
                  {errors.organization && <p id="organization-error" className="text-xs text-red-500 mt-1" role="alert">{errors.organization}</p>}
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-graphite mb-1.5">
                    Role or position <span className="text-slate text-xs">(optional)</span>
                  </label>
                  <input
                    id="role"
                    type="text"
                    value={formData.role}
                    onChange={e => handleChange('role', e.target.value)}
                    className="w-full px-3 py-2.5 rounded border border-border-grey text-sm bg-white focus:border-professional-blue focus:ring-1 focus:ring-professional-blue outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="serviceInterest" className="block text-sm font-medium text-graphite mb-1.5">
                  Consulting area of interest <span className="text-red-500">*</span>
                </label>
                <select
                  id="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={e => handleChange('serviceInterest', e.target.value)}
                  className={`w-full px-3 py-2.5 rounded border text-sm bg-white ${
                    errors.serviceInterest ? 'border-red-400' : 'border-border-grey'
                  } focus:border-professional-blue focus:ring-1 focus:ring-professional-blue outline-none transition-colors`}
                  aria-invalid={!!errors.serviceInterest}
                >
                  <option value="">Select a consulting area</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                {errors.serviceInterest && <p className="text-xs text-red-500 mt-1" role="alert">{errors.serviceInterest}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="challenge" className="block text-sm font-medium text-graphite mb-1.5">
                  Describe your challenge <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="challenge"
                  rows={4}
                  value={formData.challenge}
                  onChange={e => handleChange('challenge', e.target.value)}
                  className={`w-full px-3 py-2.5 rounded border text-sm bg-white resize-none ${
                    errors.challenge ? 'border-red-400' : 'border-border-grey'
                  } focus:border-professional-blue focus:ring-1 focus:ring-professional-blue outline-none transition-colors`}
                  placeholder="Briefly describe the challenge or opportunity you're working through..."
                  aria-invalid={!!errors.challenge}
                  aria-describedby={errors.challenge ? 'challenge-error' : undefined}
                />
                {errors.challenge && <p id="challenge-error" className="text-xs text-red-500 mt-1" role="alert">{errors.challenge}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-graphite mb-1.5">
                  Preferred contact method
                </label>
                <div className="flex gap-4">
                  {['email', 'phone', 'video-call'].map(method => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={e => handleChange('preferredContact', e.target.value)}
                        className="accent-professional-blue"
                      />
                      <span className="text-sm text-graphite capitalize">{method.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={e => handleChange('consent', e.target.checked)}
                    className="mt-0.5 accent-professional-blue"
                  />
                  <span className="text-xs text-slate">
                    I consent to Corporate Consulting using the information provided to respond to my inquiry. <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-red-500 mt-1" role="alert">{errors.consent}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-professional-blue text-white py-3 px-6 rounded font-semibold text-sm hover:bg-bright-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-slate mt-3 text-center">
                This is a demonstration form. No data is transmitted to a server.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <footer className="bg-deep-navy text-white py-12 md:py-16 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>
      <div className="container-corporate relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-professional-blue rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">CC</span>
              </div>
              <span className="font-semibold">Corporate Consulting</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Clarity for your next move. Independent consulting for organizations navigating complex business challenges.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Expertise</h4>
            <ul className="space-y-2">
              {services.map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('expertise')}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Company</h4>
            <ul className="space-y-2">
              {['Our Approach', 'Case Studies', 'Insights', 'About', 'Contact'].map(item => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase().replace(' ', '-'))}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Connect</h4>
            <div className="space-y-2 text-sm text-white/50">
              <p>hello@corporateconsulting.example</p>
              <p>+1 (555) 000-0000</p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Corporate Consulting. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            This is a demonstration website. No real consulting services are offered.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── SERVICE DETAIL MODAL ───
function ServiceDetailModal({ serviceId, onClose, onNavigate }: { serviceId: string; onClose: () => void; onNavigate: (section: string) => void }) {
  const service = getServiceById(serviceId);
  const relatedCaseStudies = getCaseStudiesByService(serviceId);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!service) return null;

  const serviceImages: Record<string, string> = {
    'business-strategy': 'https://image.qwenlm.ai/generated-images/eb3a4785-1c2a-4cb3-a2bb-d12f741cceb6/_result.png',
    'operational-excellence': 'https://image.qwenlm.ai/generated-images/8a167887-2faa-4ec7-bfda-e16ce448328c/_result.png',
    'digital-transformation': 'https://image.qwenlm.ai/generated-images/8a8e5072-b761-42a2-80fd-3f320347c2d8/_result.png',
    'organizational-change': 'https://image.qwenlm.ai/generated-images/2e23b6ac-c399-4afb-b921-eb684652327f/_result.png'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/50 flex items-start justify-center overflow-y-auto p-4 pt-20"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-xl"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${service.title} details`}
      >
        {serviceImages[service.id] && (
          <div className="h-40 relative overflow-hidden rounded-t-lg">
            <img
              src={serviceImages[service.id]}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/30 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <p className="text-white/70 text-xs font-mono mb-1">{service.number}</p>
              <h2 className="text-xl font-bold text-white">{service.title}</h2>
            </div>
          </div>
        )}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border-grey p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-professional-blue bg-pale-blue px-2 py-0.5 rounded">{service.number}</span>
            <span className="text-sm font-semibold text-navy">{service.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-soft-grey rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-graphite" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Overview</h3>
            <p className="text-slate leading-relaxed">{service.summary}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Common Challenges</h3>
            <ul className="space-y-2">
              {service.problems.map((p, i) => (
                <li key={i} className="text-sm text-graphite flex items-start gap-2">
                  <Circle className="w-3 h-3 text-professional-blue mt-1 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Areas of Work</h3>
            <div className="flex flex-wrap gap-2">
              {service.areas.map((a, i) => (
                <span key={i} className="text-sm bg-pale-blue text-navy px-3 py-1 rounded">{a}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Approach</h3>
            <ol className="space-y-2">
              {service.approach.map((a, i) => (
                <li key={i} className="text-sm text-graphite flex items-start gap-3">
                  <span className="text-xs font-mono text-professional-blue mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  {a}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Example Deliverables</h3>
            <ul className="space-y-2">
              {service.deliverables.map((d, i) => (
                <li key={i} className="text-sm text-graphite flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-muted-teal mt-0.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {service.faqs.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {service.faqs.map((faq, i) => (
                  <details key={i} className="border border-border-grey rounded-lg group">
                    <summary className="p-4 cursor-pointer text-sm font-medium text-navy hover:text-professional-blue list-none flex items-center justify-between">
                      {faq.question}
                      <ChevronDown className="w-4 h-4 text-slate group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-sm text-slate leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {relatedCaseStudies.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Related Case Studies</h3>
              <div className="space-y-2">
                {relatedCaseStudies.map(cs => (
                  <div key={cs.id} className="text-sm text-graphite border border-border-grey rounded p-3">
                    <p className="font-medium text-navy">{cs.title}</p>
                    <p className="text-xs text-slate mt-1">{cs.industry} · Illustrative</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-border-grey">
            <button
              onClick={() => { onClose(); onNavigate('contact'); }}
              className="w-full bg-professional-blue text-white py-3 px-6 rounded font-semibold text-sm hover:bg-bright-blue transition-colors flex items-center justify-center gap-2"
            >
              Discuss {service.title} With Our Team
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CASE STUDY DETAIL MODAL ───
function CaseStudyDetailModal({ caseStudyId, onClose, onNavigate, onNavigateCaseStudy }: { caseStudyId: string; onClose: () => void; onNavigate: (section: string) => void; onNavigateCaseStudy?: (id: string) => void }) {
  const cs = getCaseStudyById(caseStudyId);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!cs) return null;

  const relatedService = getServiceById(cs.serviceId);
  const currentIndex = caseStudies.findIndex(c => c.id === caseStudyId);
  const prevCase = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCase = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/50 flex items-start justify-center overflow-y-auto p-4 pt-20"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-xl"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Case study: ${cs.title}`}
      >
        <div className="sticky top-0 bg-white border-b border-border-grey p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs bg-pale-blue text-professional-blue px-2 py-0.5 rounded font-medium">{cs.industry}</span>
            {cs.isIllustrative && <span className="text-xs text-slate italic">Illustrative</span>}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-soft-grey rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-graphite" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">{cs.title}</h2>
          </div>

          <div className="rounded-lg overflow-hidden">
            <img
              src={cs.image}
              alt={cs.title}
              className="w-full h-56 object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Initial Challenge</h3>
            <p className="text-slate leading-relaxed">{cs.challenge}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Engagement Objectives</h3>
            <ul className="space-y-2">
              {cs.objectives.map((o, i) => (
                <li key={i} className="text-sm text-graphite flex items-start gap-2">
                  <Target className="w-3.5 h-3.5 text-professional-blue mt-0.5 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Approach</h3>
            <ol className="space-y-2">
              {cs.approach.map((a, i) => (
                <li key={i} className="text-sm text-graphite flex items-start gap-3">
                  <span className="text-xs font-mono text-professional-blue mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  {a}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Deliverables</h3>
            <ul className="space-y-2">
              {cs.deliverables.map((d, i) => (
                <li key={i} className="text-sm text-graphite flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-muted-teal mt-0.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Key Considerations</h3>
            <ul className="space-y-2">
              {cs.considerations.map((c, i) => (
                <li key={i} className="text-sm text-graphite flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-slate mt-0.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-pale-blue rounded-lg p-5">
            <h3 className="text-sm font-semibold text-navy mb-2">Outcome Summary</h3>
            <p className="text-sm text-graphite leading-relaxed">{cs.outcomeSummary}</p>
          </div>

          {relatedService && (
            <div className="border-t border-border-grey pt-6">
              <p className="text-sm text-slate mb-2">Related service:</p>
              <p className="text-base font-semibold text-professional-blue">{relatedService.title}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-border-grey pt-6">
            {prevCase ? (
              <button
                onClick={() => onNavigateCaseStudy?.(prevCase.id)}
                className="text-sm text-slate hover:text-professional-blue flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Previous: </span>{prevCase.title.slice(0, 30)}…
              </button>
            ) : <div />}
            {nextCase ? (
              <button
                onClick={() => onNavigateCaseStudy?.(nextCase.id)}
                className="text-sm text-slate hover:text-professional-blue flex items-center gap-1 transition-colors"
              >
                <span className="hidden sm:inline">Next: </span>{nextCase.title.slice(0, 30)}…
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : <div />}
          </div>

          <div className="pt-4 border-t border-border-grey">
            <button
              onClick={() => { onClose(); onNavigate('contact'); }}
              className="w-full bg-professional-blue text-white py-3 px-6 rounded font-semibold text-sm hover:bg-bright-blue transition-colors flex items-center justify-center gap-2"
            >
              Discuss a Similar Challenge
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── BACK TO TOP ───
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-navy text-white rounded-full shadow-lg flex items-center justify-center hover:bg-professional-blue transition-colors"
      aria-label="Back to top"
    >
      <ChevronDown className="w-4 h-4 rotate-180" />
    </motion.button>
  );
}

// ─── MAIN APP ───
function AppContent() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);
  const [prefillService, setPrefillService] = useState<string>('');

  const scrollTo = useCallback((section: string) => {
    const sectionMap: Record<string, string> = {
      'hero': 'hero',
      'expertise': 'expertise',
      'approach': 'approach',
      'case-studies': 'case-studies',
      'insights': 'insights',
      'about': 'about',
      'contact': 'contact',
      'assessment': 'assessment'
    };
    const targetId = sectionMap[section] || section;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSelectService = (id: string) => {
    setSelectedService(id);
  };

  const handleSelectCaseStudy = (id: string) => {
    setSelectedCaseStudy(id);
  };

  const handleNavigateToContact = (section: string) => {
    if (selectedService) {
      setPrefillService(selectedService);
    }
    scrollTo(section);
  };

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-professional-blue focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to main content
      </a>

      <Header onNavigate={scrollTo} />

      <main id="main-content">
        <Hero onNavigate={scrollTo} />
        <TrustStrip />
        <ExpertiseSection onNavigate={scrollTo} onSelectService={handleSelectService} />
        <ApproachSection />
        <CaseStudiesSection onSelectCaseStudy={handleSelectCaseStudy} />
        <PhilosophySection />
        <ReadinessAssessment onNavigate={scrollTo} onPrefillService={(id) => setPrefillService(id)} />
        <InsightsSection />
        <TeamSection />
        <ContactSection prefillService={prefillService} />
      </main>

      <Footer onNavigate={scrollTo} />
      <BackToTop />

      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal
            serviceId={selectedService}
            onClose={() => setSelectedService(null)}
            onNavigate={handleNavigateToContact}
          />
        )}
        {selectedCaseStudy && (
          <CaseStudyDetailModal
            caseStudyId={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
            onNavigate={handleNavigateToContact}
            onNavigateCaseStudy={(id) => setSelectedCaseStudy(id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
