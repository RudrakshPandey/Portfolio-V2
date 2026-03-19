import { motion } from 'framer-motion';
import { RevealUp, StaggerParent, StaggerChild, staggerChildVariants } from '../components/Reveal';
import { use3DTilt } from '../hooks/use3DTilt';
import { certifications } from '../data';

function CertCard({ cert }) {
  const { cardRef, glareRef, handlers } = use3DTilt({ maxTilt: 6, scale: 1.02 });

  return (
    <StaggerChild
      variants={staggerChildVariants}
      /* Height 100% so the outer StaggerChild stretches to fill the grid row */
      style={{ height: '100%' }}
    >
      <div
        ref={cardRef}
        {...handlers}
        style={{
          /* height:100% inherits the grid row height → equal across all cards */
          height: '100%',
          background: cert.dark ? 'var(--zinc-800)' : 'rgba(255,255,255,0.9)',
          border: '1.5px solid',
          borderColor: cert.dark ? 'rgba(255,255,255,0.06)' : 'var(--zinc-200)',
          borderRadius: 16,
          boxShadow: cert.dark ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
          overflow: 'hidden',
          position: 'relative',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div ref={glareRef} style={{ position: 'absolute', inset: 0, borderRadius: 16, opacity: 0, pointerEvents: 'none', zIndex: 10, transition: 'opacity 0.3s ease' }} />

        {/* Accent strip top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: cert.logoColor, borderRadius: '16px 16px 0 0' }} />

        {/* Logo + meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: cert.logoColor, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${cert.logoColor}55`, flexShrink: 0 }}>
            <span style={{ color: 'white', fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{cert.logo}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: 1.5, textTransform: 'uppercase', color: cert.dark ? 'rgba(255,255,255,0.4)' : 'var(--zinc-400)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cert.issuer}</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: cert.logoColor, background: `${cert.logoColor}18`, padding: '2px 8px', borderRadius: 4, display: 'inline-block' }}>{cert.level}</div>
          </div>
        </div>

        {/* Title — flex:1 pushes badge to bottom */}
        <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px', color: cert.dark ? 'var(--white)' : 'var(--black)', lineHeight: 1.4, flex: 1 }}>
          {cert.title}
        </h3>

        {/* Verified badge pinned at bottom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: cert.dark ? 'rgba(255,255,255,0.4)' : 'var(--zinc-400)', letterSpacing: 1 }}>VERIFIED</span>
        </div>
      </div>
    </StaggerChild>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" style={{ padding: 'clamp(64px,10vw,120px) clamp(16px,4vw,48px)', background: 'rgba(250,250,250,0.8)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <RevealUp style={{ marginBottom: 64 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--error)', background: 'rgba(239,68,68,0.08)', padding: '4px 10px', borderRadius: 3, display: 'inline-block', marginBottom: 16 }}>06 — Certifications</span>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 16 }}>Certifications</h2>
          <p style={{ fontSize: 15, color: 'var(--zinc-500)', maxWidth: 480, lineHeight: 1.7 }}>Industry certifications validating my expertise across cloud, AI, and DevOps.</p>
        </RevealUp>

        <StaggerParent style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 24,
          alignItems: 'stretch',     /* ← makes all cells the same row height */
          gridAutoRows: '1fr',       /* ← forces all rows to be equal height */
        }}>
          {certifications.map(c => <CertCard key={c.id} cert={c} />)}
        </StaggerParent>
      </div>
    </section>
  );
}
