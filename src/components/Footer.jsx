import { motion } from 'framer-motion';
import { personal } from '../data';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', color: 'var(--white)', padding: 'clamp(32px,5vw,48px) clamp(16px,4vw,48px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: 'var(--error)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 14, fontWeight: 800 }}>R.</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>{personal.name}</span>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--zinc-500)' }}>© {new Date().getFullYear()} — Built with React + Framer Motion</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {Object.entries(personal.social).map(([key, href]) => (
            <motion.a key={key} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, color: 'var(--white)' }}
              style={{ fontSize: 13, color: 'var(--zinc-500)', fontWeight: 500, textTransform: 'capitalize', textDecoration: 'none' }}
            >{key}</motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
