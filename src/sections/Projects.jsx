import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RevealUp, StaggerParent, StaggerChild, staggerChildVariants } from '../components/Reveal';
import { projects } from '../data';

/* Very subtle 3-deg tilt, no y-lift, no scale — just a gentle tilt on move */
function useSubtleTilt() {
  const ref = useRef(null);
  const onMouseMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    el.style.transform  = `perspective(1000px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
    el.style.transition = 'transform 0.08s linear';
  }, []);
  const onMouseLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
  }, []);
  return { ref, handlers: { onMouseMove, onMouseLeave } };
}

function ProjectCard({ project }) {
  const { ref, handlers } = useSubtleTilt();
  return (
    <StaggerChild variants={staggerChildVariants} style={{ height: '100%' }}>
      <div
        ref={ref}
        {...handlers}
        style={{
          background: project.dark ? 'var(--zinc-800)' : 'rgba(255,255,255,0.9)',
          border: '1.5px solid',
          borderColor: project.dark ? 'rgba(255,255,255,0.06)' : 'var(--zinc-200)',
          borderRadius: 16,
          boxShadow: project.dark ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', height: '100%',
          willChange: 'transform',
        }}
      >
        {/* Thumbnail */}
        <div style={{ height: 160, background: project.dark ? 'linear-gradient(135deg,var(--zinc-900),var(--zinc-700))' : 'linear-gradient(135deg,var(--zinc-100),var(--zinc-200))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 30% 50%, ${project.dark ? 'rgba(239,68,68,0.12)' : 'rgba(0,0,0,0.04)'} 0%, transparent 60%)` }} />
          <div style={{ width: 64, height: 64, borderRadius: 14, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} style={{ background: (Math.floor(i / 4) + i) % 2 === 0 ? (project.dark ? 'var(--white)' : 'var(--black)') : 'transparent', aspectRatio: '1' }} />
            ))}
          </div>
          <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: project.dark ? 'var(--zinc-400)' : 'var(--zinc-500)', padding: '4px 10px', borderRadius: 4, background: project.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', border: '1px solid', borderColor: project.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>{project.year}</div>
          {project.featured && <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--error)', padding: '3px 8px', borderRadius: 4, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>Featured</div>}
        </div>

        {/* Body */}
        <div style={{ padding: '24px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.4px', color: project.dark ? 'var(--white)' : 'var(--black)', marginBottom: 4 }}>{project.title}</h3>
          {project.subtitle && <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: project.dark ? 'var(--zinc-400)' : 'var(--zinc-500)', marginBottom: 10 }}>{project.subtitle}</div>}
          <p style={{ fontSize: 13, lineHeight: 1.7, color: project.dark ? 'var(--zinc-400)' : 'var(--zinc-500)', flex: 1, marginBottom: 20 }}>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 4, background: project.dark ? 'rgba(255,255,255,0.07)' : 'var(--zinc-100)', color: project.dark ? 'var(--zinc-300)' : 'var(--zinc-600)', border: '1px solid', borderColor: project.dark ? 'rgba(255,255,255,0.08)' : 'var(--zinc-200)' }}>{tag}</span>
            ))}
          </div>
          <motion.a href={project.link} target="_blank" rel="noopener noreferrer" whileHover={{ x: 4 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: project.dark ? 'var(--white)' : 'var(--black)', paddingTop: 16, borderTop: '1px solid', borderColor: project.dark ? 'rgba(255,255,255,0.08)' : 'var(--zinc-200)', marginTop: 'auto' }}
          >View Project ↗</motion.a>
        </div>
      </div>
    </StaggerChild>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: 'clamp(64px,10vw,120px) clamp(16px,4vw,48px)', background: 'rgba(255,255,255,0.7)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <RevealUp style={{ marginBottom: 64 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--error)', background: 'rgba(239,68,68,0.08)', padding: '4px 10px', borderRadius: 3, display: 'inline-block', marginBottom: 16 }}>05 — Projects</span>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 16 }}>My Projects</h2>
          <p style={{ fontSize: 15, color: 'var(--zinc-500)', maxWidth: 480, lineHeight: 1.7 }}>Things I've built on the side — real products with real users.</p>
        </RevealUp>
        {/* v4 exact column sizing */}
        <StaggerParent style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))', gap: 24, alignItems: 'stretch' }}>
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </StaggerParent>
      </div>
    </section>
  );
}
