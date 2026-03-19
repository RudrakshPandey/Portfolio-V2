import { useState } from 'react';
import { motion } from 'framer-motion';
import { RevealUp, StaggerParent, StaggerChild, staggerChildVariants } from '../components/Reveal';
import { skills } from '../data';

const icons = {
  SiJavascript: () => (<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.23-.51.074-1.17l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.704-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>),
  SiTypescript: () => (<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>),
  default: (name) => (<span style={{ fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{name.slice(0, 2).toUpperCase()}</span>),
};

function ProficiencyRing({ level, color }) {
  const r    = 30;
  const circ = 2 * Math.PI * r;
  const dash = (level / 100) * circ;
  return (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
      <motion.circle
        cx="38" cy="38" r={r}
        fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '38px 38px' }}
      />
      <text x="38" y="43" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="var(--font-mono)">
        {level}%
      </text>
    </svg>
  );
}

function SkillCard({ skill }) {
  const [flipped, setFlipped] = useState(false);
  const isFeat = skill.featured;

  return (
    <StaggerChild variants={staggerChildVariants} style={{ perspective: 800 }} onClick={() => setFlipped(f => !f)}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        data-hover
        style={{ position: 'relative', width: '100%', paddingBottom: '115%', transformStyle: 'preserve-3d', cursor: 'pointer' }}
      >
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          background: isFeat ? 'var(--zinc-800)' : 'var(--white)',
          border: '1.5px solid', borderColor: isFeat ? 'transparent' : 'var(--zinc-200)',
          borderRadius: 14,
          /* disc / coin thickness effect */
          boxShadow: isFeat
            ? 'var(--shadow-md)'
            : 'var(--shadow-sm)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '16px 12px', overflow: 'hidden',
        }}>
          {isFeat && <div style={{ position: 'absolute', top: 8, right: 8, width: 6, height: 6, borderRadius: '50%', background: 'var(--error)' }} />}
          <div style={{ width: 46, height: 46, borderRadius: 11, background: isFeat ? 'rgba(255,255,255,0.08)' : 'var(--zinc-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: skill.color }}>
            {icons[skill.icon] ? icons[skill.icon]() : icons.default(skill.name)}
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: isFeat ? 'var(--white)' : 'var(--zinc-700)', textAlign: 'center' }}>{skill.name}</span>
          <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: isFeat ? 'rgba(255,255,255,0.25)' : 'var(--zinc-300)', letterSpacing: 1 }}>tap</span>
        </div>

        {/* BACK — only ring, no text */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'var(--zinc-900)', borderRadius: 14,
          boxShadow: 'var(--shadow-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {flipped && <ProficiencyRing level={skill.level} color={skill.color} />}
        </div>
      </motion.div>
    </StaggerChild>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: 'clamp(64px,10vw,120px) clamp(16px,4vw,48px)', background: 'var(--white)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <RevealUp style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--error)', background: 'rgba(239,68,68,0.08)', padding: '4px 10px', borderRadius: 3 }}>03 — Skills</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 16 }}>My Tech Stack</h2>
          <p style={{ fontSize: 15, color: 'var(--zinc-500)', maxWidth: 480, lineHeight: 1.7 }}>
            Tools I wield daily. <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--zinc-400)' }}>Tap a card to see proficiency.</span>
          </p>
        </RevealUp>
        <StaggerParent style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(116px, 1fr))', gap: 16 }}>
          {skills.map(skill => <SkillCard key={skill.name} skill={skill} />)}
        </StaggerParent>
      </div>
    </section>
  );
}
