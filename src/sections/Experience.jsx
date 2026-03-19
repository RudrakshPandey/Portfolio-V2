import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealUp, RevealLeft } from '../components/Reveal';
import { use3DTilt } from '../hooks/use3DTilt';
import { experience } from '../data';

function LogoBadge({ color, logo }) {
  const bg = color === '#000000' ? 'var(--zinc-800)' : color;
  return (
    <div style={{ width: 38, height: 38, borderRadius: 9, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${bg}44` }}>
      <span style={{ color: 'white', fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{logo}</span>
    </div>
  );
}

function ExperienceCard({ exp, isActive, onClick }) {
  return (
    <motion.div onClick={onClick} layout
      whileHover={!isActive ? { x: 3 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        padding: '20px 24px', borderRadius: 12,
        border: '1.5px solid',
        borderColor: isActive ? 'transparent' : 'var(--zinc-200)',
        background: isActive ? 'var(--zinc-800)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        boxShadow: isActive ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {isActive && <motion.div layoutId="activeBg" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,var(--zinc-800) 0%,var(--zinc-900) 100%)', zIndex: 0 }} />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
            <LogoBadge color={exp.logoColor} logo={exp.logo} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: isActive ? 'var(--white)' : 'var(--black)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{exp.role}</div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--zinc-400)', marginTop: 1 }}>{exp.company} · {exp.period}</div>
            </div>
          </div>
          <motion.div animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.3 }}
            style={{ color: isActive ? 'var(--zinc-400)' : 'var(--zinc-300)', fontSize: 18, flexShrink: 0 }}
          >→</motion.div>
        </div>

        {/* Inline expand for mobile — always visible when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--zinc-400)', marginBottom: 14, marginTop: 12 }}>{exp.description}</p>
              {exp.highlights && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Key Achievements</div>
                  {exp.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--error)', flexShrink: 0, marginTop: 5 }} />
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 4, background: 'rgba(255,255,255,0.08)', color: 'var(--zinc-300)', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function RecruiterCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ padding: '20px 24px', borderRadius: 12, border: '1.5px dashed var(--zinc-300)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden' }}
    >
      <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.06), transparent)', pointerEvents: 'none' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ position: 'absolute', inset: -4, borderRadius: 11, background: 'rgba(239,68,68,0.15)' }} />
          <div style={{ width: 38, height: 38, borderRadius: 9, background: 'linear-gradient(135deg,var(--zinc-200),var(--zinc-300))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <span style={{ fontSize: 18 }}>👀</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Could be you!</div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--zinc-400)', marginTop: 1 }}>Your Company · 2025 → ?</div>
        </div>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--error)', padding: '3px 10px', borderRadius: 20, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', flexShrink: 0 }}>
          HIRING? 👋
        </div>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--zinc-500)', marginBottom: 16 }}>
        Hey recruiter 👋 — this spot is reserved for my next adventure. I ship fast, write clean code, and genuinely care about what I build. If you're looking for someone to own frontend and build cool stuff, let's talk.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <motion.a
          href="https://www.linkedin.com/in/rudrakshpandey/?openDM=true"
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
          style={{ padding: '8px 18px', background: 'var(--black)', color: 'var(--white)', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          Send an Invite
        </motion.a>
        <motion.a
          href="mailto:rudrakshpandey8@gmail.com?subject=Job%20Opportunity&body=Hi%20Rudraksh%2C%0A%0AI%20saw%20your%20portfolio%20and%20want%20to%20discuss%20an%20opportunity.%0A%0ARole%3A%20%0ACompany%3A%20%0ADetails%3A%20"
          whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
          style={{ padding: '8px 18px', background: 'transparent', color: 'var(--zinc-700)', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none', border: '1.5px solid var(--zinc-200)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Email Me
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [active, setActive] = useState(0);
  const { cardRef: detailRef, glareRef: detailGlare, handlers: detailHandlers } = use3DTilt({ maxTilt: 5, scale: 1.01 });
  const activeExp = active < experience.length ? experience[active] : null;

  return (
    <section id="experience" style={{ padding: 'clamp(64px,10vw,120px) clamp(16px,4vw,48px)', background: 'var(--zinc-50)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <RevealUp style={{ marginBottom: 64 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--error)', background: 'rgba(239,68,68,0.08)', padding: '4px 10px', borderRadius: 3, display: 'inline-block', marginBottom: 16 }}>04 — Experience</span>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 16 }}>My Experience</h2>
          <p style={{ fontSize: 15, color: 'var(--zinc-500)', maxWidth: 480, lineHeight: 1.7 }}>Where I've worked and what I've shipped.</p>
        </RevealUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 48, alignItems: 'start' }}>
          <RevealLeft>
            {/* paddingLeft creates the gutter where the line + dots live */}
            <div style={{ paddingLeft: 32, position: 'relative' }}>
              {/* Timeline line — lives in the left gutter */}
              <div style={{
                position: 'absolute',
                left: 9,          /* horizontally centers the 2px line under the 12px dots */
                top: 26,          /* starts at first dot */
                bottom: 26,
                width: 2,
                background: 'linear-gradient(to bottom, var(--zinc-800) 0%, var(--zinc-300) 70%, transparent 100%)',
                borderRadius: 2,
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {experience.map((exp, i) => (
                  <div key={exp.id} style={{ position: 'relative' }}>
                    {/* Dot — absolutely placed in the left gutter */}
                    <motion.div
                      animate={{ scale: active === i ? 1.3 : 1, background: active === i ? 'var(--black)' : 'var(--zinc-300)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{
                        position: 'absolute',
                        left: -27,   /* pull into gutter: -paddingLeft + (paddingLeft/2 - dotSize/2) ≈ -27 */
                        top: 23,
                        width: 14, height: 14,
                        borderRadius: '50%',
                        border: '2.5px solid var(--zinc-50)',
                        zIndex: 2,
                      }}
                    />
                    <ExperienceCard exp={exp} isActive={active === i} onClick={() => setActive(i)} />
                  </div>
                ))}

                {/* Recruiter card */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -27, top: 23, width: 14, height: 14, borderRadius: '50%', border: '2px dashed var(--zinc-300)', background: 'var(--zinc-50)', zIndex: 2 }} />
                  <RecruiterCard />
                </div>
              </div>
            </div>
          </RevealLeft>

          {/* Desktop detail panel — hidden on mobile via CSS */}
          {activeExp && (
            <div className="exp-detail-panel" style={{ position: 'sticky', top: 100, perspective: 900 }}>
              <AnimatePresence mode="wait">
                <motion.div ref={detailRef} key={active}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  {...detailHandlers}
                  style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: '1.5px solid var(--zinc-200)', borderRadius: 16, padding: 32, boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden', willChange: 'transform', transformStyle: 'preserve-3d' }}
                >
                  <div ref={detailGlare} style={{ position: 'absolute', inset: 0, borderRadius: 16, opacity: 0, pointerEvents: 'none', zIndex: 10, transition: 'opacity 0.3s ease' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <LogoBadge color={activeExp.logoColor} logo={activeExp.logo} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{activeExp.company}</div>
                      <div style={{ fontSize: 12, color: 'var(--zinc-400)', fontFamily: 'var(--font-mono)' }}>{activeExp.period} · {activeExp.location}</div>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 12 }}>{activeExp.role}</h3>
                  <p style={{ fontSize: 14, color: 'var(--zinc-500)', lineHeight: 1.75, marginBottom: 24 }}>{activeExp.description}</p>
                  {activeExp.highlights && (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--zinc-400)', marginBottom: 12 }}>Key Achievements</div>
                      {activeExp.highlights.map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--error)', flexShrink: 0, marginTop: 6 }} />
                          <span style={{ fontSize: 13, color: 'var(--zinc-600)', lineHeight: 1.5 }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--zinc-400)', marginBottom: 12 }}>Tech Used</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {activeExp.tags.map(tag => (
                        <span key={tag} style={{ fontSize: 12, fontFamily: 'var(--font-mono)', padding: '5px 12px', borderRadius: 5, background: 'var(--zinc-100)', color: 'var(--zinc-700)', border: '1px solid var(--zinc-200)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      {/* Hide the right panel on mobile — cards already expand inline */}
      <style>{`
        @media (max-width: 700px) {
          .exp-detail-panel { display: none !important; }
        }
      `}</style>
    </section>
  );
}
