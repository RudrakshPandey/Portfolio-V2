import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'About',          href: '#about',          id: 'about',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { label: 'Skills',         href: '#skills',         id: 'skills',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { label: 'Experience',     href: '#experience',     id: 'experience',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
  { label: 'Projects',       href: '#projects',       id: 'projects',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
  { label: 'Certifications', href: '#certifications', id: 'certifications',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg> },
  { label: 'Contact',        href: '#contact',        id: 'contact',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [activeId,   setActiveId]   = useState('');
  const [pillStyle,  setPillStyle]  = useState({ left: 0, width: 0, opacity: 0 });
  const [resumeOpen, setResumeOpen] = useState(false);
  const navRef   = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' }
    );
    links.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el  = linkRefs.current[activeId];
    const nav = navRef.current;
    if (!el || !nav) { setPillStyle(s => ({ ...s, opacity: 0 })); return; }
    const nr = nav.getBoundingClientRect();
    const lr = el.getBoundingClientRect();
    setPillStyle({ left: lr.left - nr.left - 8, width: lr.width + 16, opacity: 1 });
  }, [activeId]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── DESKTOP HEADER ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 clamp(16px,4vw,48px)', height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
          transition: 'background 0.5s ease, box-shadow 0.5s ease',
          gap: 16,
        }}
      >
        {/* Logo */}
        <motion.a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        >
          <motion.span whileHover={{ rotate: 8 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{ width: 34, height: 34, background: 'var(--black)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <span style={{ color: 'white', fontSize: 14, fontWeight: 800 }}>R.</span>
          </motion.span>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px' }}>Rudraksh</span>
        </motion.a>

        {/* Desktop pill nav */}
        <nav ref={navRef} className="desktop-nav-pill"
          style={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', flex: 1, justifyContent: 'center' }}
        >
          <motion.div
            animate={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
            transition={{ type: 'spring', stiffness: 380, damping: 38, mass: 0.8 }}
            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', height: 32, background: 'var(--black)', borderRadius: 7, pointerEvents: 'none', zIndex: 0 }}
          />
          {links.map((link, i) => {
            const isActive = activeId === link.id;
            return (
              <motion.a key={link.label}
                ref={el => { linkRefs.current[link.id] = el; }}
                href={link.href} onClick={e => scrollTo(e, link.href)}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', zIndex: 1, fontSize: 13, fontWeight: isActive ? 600 : 500, color: isActive ? 'var(--white)' : 'var(--zinc-600)', padding: '6px 12px', borderRadius: 7, textDecoration: 'none', transition: 'color 0.2s ease', whiteSpace: 'nowrap' }}
                whileHover={!isActive ? { color: 'var(--black)' } : {}}
              >{link.label}</motion.a>
            );
          })}
        </nav>

        {/* Resume CTA */}
        <motion.button onClick={() => setResumeOpen(true)}
          className="desktop-resume-btn"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ background: 'var(--black)', color: 'var(--white)', padding: '9px 20px', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}
        >
          Resume <span style={{ fontSize: 11, opacity: 0.7 }}>↓</span>
        </motion.button>
      </motion.header>

      {/* ── MOBILE FLOATING BOTTOM NAV ── */}
      <MobileNav activeId={activeId} onResumeClick={() => setResumeOpen(true)} scrollTo={scrollTo} />

      {/* ── RESUME MODAL ── */}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}

/* ── Mobile nav — centered pill at bottom ── */
function MobileNav({ activeId, onResumeClick, scrollTo }) {
  const [tooltip, setTooltip]   = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback((e, label) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip(label);
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
  }, []);
  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const homeIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  const resumeIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>;

  return (
    <>
      {/* Fixed tooltip rendered at page level so it's never clipped */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="nav-tooltip"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: 100, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 16,
          /* Center horizontally — x:-50% is handled by framer-motion above */
          left: '50%',
          zIndex: 100,
          background: 'rgba(10,10,10,0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 26,
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          /* Do NOT use width:fit-content — let content drive width */
          width: 'max-content',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {/* Home */}
        <MobileBtn
          href="#" label="Home" icon={homeIcon}
          isActive={!activeId}
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        />

        <NavDivider />

        {links.map(link => (
          <MobileBtn key={link.id}
            href={link.href} label={link.label} icon={link.icon}
            isActive={activeId === link.id}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            onClick={e => scrollTo(e, link.href)}
          />
        ))}

        <NavDivider />

        {/* Resume */}
        <motion.button
          onClick={onResumeClick}
          onMouseEnter={e => handleMouseEnter(e, 'Resume')}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          style={{ width: 38, height: 38, borderRadius: 14, background: 'var(--error)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}
        >
          {resumeIcon}
        </motion.button>
      </motion.nav>
    </>
  );
}

function MobileBtn({ href, label, icon, isActive, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <motion.a
      href={href} onClick={onClick}
      onMouseEnter={e => onMouseEnter(e, label)}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.88 }}
      style={{
        width: 38, height: 38, borderRadius: 12,
        background: isActive ? 'rgba(255,255,255,0.14)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isActive ? 'white' : 'rgba(255,255,255,0.45)',
        textDecoration: 'none',
        transition: 'background 0.2s ease, color 0.2s ease',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {isActive && (
        <motion.div
          layoutId="mobileActiveDot"
          style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'var(--error)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      {icon}
    </motion.a>
  );
}

function NavDivider() {
  return <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)', margin: '0 3px', flexShrink: 0 }} />;
}

/* ── Resume Modal ── */
function ResumeModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9000, backdropFilter: 'blur(8px)' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              zIndex: 9001,
              width: 'min(95vw,960px)',
              height: 'min(92vh,700px)',
              background: '#0e0e0e',
              borderRadius: 20,
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* Top bar */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0, background: '#141414' }}>
              <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
                {['#ef4444','#f59e0b','#22c55e'].map((c, i) => (
                  <motion.div key={i} onClick={i === 0 ? onClose : undefined}
                    whileHover={{ scale: 1.2 }}
                    style={{ width: 13, height: 13, borderRadius: '50%', background: c, cursor: i === 0 ? 'pointer' : 'default' }}
                  />
                ))}
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>rudraksh.dev/resume.pdf</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <motion.a href="/resume.pdf" download="Rudraksh_Pandey_Resume.pdf"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  style={{ padding: '7px 14px', background: 'var(--error)', color: 'white', borderRadius: 8, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/rudrakshpandey/?openDM=true"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', borderRadius: 8, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', whiteSpace: 'nowrap' }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Send Job Invite
                </motion.a>
              </div>
            </div>

            {/* PDF */}
            <div style={{ flex: 1, overflow: 'hidden', background: '#1a1a1a' }}>
              <iframe src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="Rudraksh Pandey Resume"
              />
            </div>

            {/* Bottom */}
            <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: '#141414' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 800 }}>R.</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>Rudraksh Pandey</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'var(--email-display, inline)' }}>rudrakshpandey8@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.25)' }} />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)', letterSpacing: 1, whiteSpace: 'nowrap' }}>OPEN TO WORK</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
