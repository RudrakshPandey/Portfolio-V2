import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personal } from '../data';

function Typewriter({ roles }) {
  const [index, setIndex]         = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const current = roles[index % roles.length];

  useEffect(() => {
    const word = current.text;
    let t;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 75);
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    else { setDeleting(false); setIndex(i => i + 1); }
    return () => clearTimeout(t);
  }, [displayed, deleting, current]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <motion.span
        key={index % roles.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: current.color,
          color: current.color === '#61DAFB' ? '#000' : '#fff',
          padding: '2px 12px 4px',
          borderRadius: 5,
          minWidth: 10,
          display: 'inline-block',
        }}
      >
        {displayed}
      </motion.span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: 'steps(1)' }}
        style={{ display: 'inline-block', width: 3, height: '0.85em', background: current.color, borderRadius: 2, verticalAlign: 'middle' }}
      />
    </span>
  );
}

function FloatingIllustration() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: '100%', maxWidth: 300 }}
      className="hero-illustration"
    >
      <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        <rect x="60" y="70" width="180" height="130" rx="10" fill="var(--zinc-800)" />
        <rect x="70" y="80" width="160" height="110" rx="5" fill="#0d0d0d" />
        <rect x="84" y="95"  width="72" height="7" rx="3.5" fill="#ef4444" opacity="0.95" />
        <rect x="84" y="109" width="96" height="6" rx="3"   fill="#3178C6" opacity="0.8" />
        <rect x="84" y="121" width="60" height="6" rx="3"   fill="#61DAFB" opacity="0.7" />
        <rect x="90" y="133" width="84" height="6" rx="3"   fill="var(--zinc-600)" opacity="0.6" />
        <rect x="90" y="145" width="48" height="6" rx="3"   fill="#22c55e" opacity="0.7" />
        <rect x="84" y="157" width="66" height="6" rx="3"   fill="var(--zinc-500)" opacity="0.4" />
        <rect x="136" y="200" width="28" height="18" rx="3" fill="var(--zinc-700)" />
        <rect x="118" y="215" width="64" height="8"  rx="4" fill="var(--zinc-600)" />
        <circle cx="150" cy="48" r="20" fill="var(--zinc-300)" />
        <rect x="130" y="68" width="40" height="28" rx="8" fill="var(--zinc-800)" />
        <rect x="10"  y="80"  width="44" height="22" rx="6" fill="#000" />
        <text x="32"  y="95"  textAnchor="middle" fill="white"  fontSize="9" fontFamily="JetBrains Mono" fontWeight="700">JS</text>
        <rect x="246" y="100" width="44" height="22" rx="6" fill="#3178C6" />
        <text x="268" y="115" textAnchor="middle" fill="white"  fontSize="9" fontFamily="JetBrains Mono" fontWeight="700">TS</text>
        <rect x="14"  y="160" width="50" height="22" rx="6" fill="#61DAFB" />
        <text x="39"  y="175" textAnchor="middle" fill="#000"   fontSize="8" fontFamily="JetBrains Mono" fontWeight="700">React</text>
        <rect x="236" y="155" width="54" height="22" rx="6" fill="#000" />
        <text x="263" y="170" textAnchor="middle" fill="white"  fontSize="8" fontFamily="JetBrains Mono" fontWeight="700">Next.js</text>
        <rect x="14"  y="230" width="50" height="22" rx="6" fill="#E0234E" />
        <text x="39"  y="245" textAnchor="middle" fill="white"  fontSize="8" fontFamily="JetBrains Mono" fontWeight="700">Nest</text>
        <rect x="236" y="225" width="50" height="22" rx="6" fill="#FF9900" />
        <text x="261" y="240" textAnchor="middle" fill="white"  fontSize="8" fontFamily="JetBrains Mono" fontWeight="700">AWS</text>
      </svg>
    </motion.div>
  );
}

const socialLinks = [
  { label: 'GitHub',   icon: 'GH', href: personal.social.github  },
  { label: 'LinkedIn', icon: 'in', href: personal.social.linkedin },
  { label: 'Twitter',  icon: '𝕏',  href: personal.social.twitter  },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yContent      = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const yIllustration = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity       = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px clamp(16px,4vw,48px) 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Radial tint overlays */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 15% 50%, rgba(239,68,68,0.04) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(49,120,198,0.04) 0%, transparent 50%)`, pointerEvents: 'none', zIndex: 0 }} />

      {/* ── DESKTOP layout: side-by-side ── */}
      <div className="hero-desktop" style={{ width: '100%', maxWidth: 1200, margin: '0 auto', gridTemplateColumns: '1fr auto', gap: 'clamp(32px,5vw,64px)', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div style={{ y: yContent, opacity }}>
          <HeroContent />
        </motion.div>
        <motion.div style={{ y: yIllustration, opacity }}
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* <FloatingIllustration /> */}
        </motion.div>
      </div>

      {/* ── MOBILE layout: centered single column ── */}
      <div className="hero-mobile" style={{ width: '100%', maxWidth: 480, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Mini illustration top
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 140, margin: '0 auto 24px', opacity: 0.9 }}
        >
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
            <rect x="60" y="70" width="180" height="130" rx="10" fill="var(--zinc-800)" />
            <rect x="70" y="80" width="160" height="110" rx="5" fill="#0d0d0d" />
            <rect x="84" y="95" width="72" height="7" rx="3.5" fill="#ef4444" opacity="0.95" />
            <rect x="84" y="109" width="96" height="6" rx="3" fill="#3178C6" opacity="0.8" />
            <rect x="84" y="121" width="60" height="6" rx="3" fill="#61DAFB" opacity="0.7" />
            <rect x="90" y="133" width="84" height="6" rx="3" fill="var(--zinc-600)" opacity="0.6" />
            <rect x="90" y="145" width="48" height="6" rx="3" fill="#22c55e" opacity="0.7" />
            <rect x="136" y="200" width="28" height="18" rx="3" fill="var(--zinc-700)" />
            <rect x="118" y="215" width="64" height="8" rx="4" fill="var(--zinc-600)" />
            <circle cx="150" cy="48" r="20" fill="var(--zinc-300)" />
            <rect x="130" y="68" width="40" height="28" rx="8" fill="var(--zinc-800)" />
          </svg>
        </motion.div> */}

        {/* Available badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1.5px solid var(--zinc-200)', borderRadius: 'var(--radius-full)', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--zinc-500)', marginBottom: 20, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
          Open to opportunities
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          style={{ fontSize: 'clamp(30px,9vw,48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 4 }}
        >
          Hello I'm
        </motion.h1>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
          style={{ fontSize: 'clamp(30px,9vw,48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 8 }}
        >
          {personal.name}.
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ fontSize: 'clamp(18px,5vw,28px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 6, display: 'flex', justifyContent: 'center' }}
        >
          <Typewriter roles={personal.role} />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          style={{ fontSize: 'clamp(15px,4vw,20px)', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--zinc-300)', marginBottom: 20 }}
        >
          {personal.tagline}
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--zinc-500)', marginBottom: 28, maxWidth: 360, margin: '0 auto 28px' }}
        >
          {personal.bio}
        </motion.p>

        {/* Social + CTA */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}
        >
          {socialLinks.map(s => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.12, y: -3 }} whileTap={{ scale: 0.95 }}
              style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--zinc-800)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            >{s.icon}</motion.a>
          ))}
          <motion.a href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{ padding: '11px 24px', borderRadius: 8, background: 'var(--black)', color: 'var(--white)', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            View Projects →
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1 }}
      >
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: 2, color: 'var(--zinc-400)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom,var(--zinc-400),transparent)' }}
        />
      </motion.div>

      <style>{`
        .hero-mobile  { display: none;  }
        .hero-desktop { display: grid;  }
        @media (max-width: 900px) {
          .hero-mobile  { display: block; }
          .hero-desktop { display: none;  }
        }
      `}</style>
    </section>
  );
}

function HeroContent() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1.5px solid var(--zinc-200)', borderRadius: 'var(--radius-full)', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--zinc-500)', marginBottom: 32, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
        Open to opportunities
      </motion.div>

      <div style={{ marginBottom: 24 }}>
        {["Hello I'm", personal.name + '.'].map((line, i) => (
          <motion.h1 key={i}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2.5px', display: 'block' }}
          >{line}</motion.h1>
        ))}
        <motion.h2
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(22px,4vw,52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginTop: 6 }}
        >
          <Typewriter roles={personal.role} />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(18px,3vw,40px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'var(--zinc-300)', lineHeight: 1.1 }}
        >
          {personal.tagline}
        </motion.p>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.75, color: 'var(--zinc-500)', maxWidth: 520, marginBottom: 36 }}
      >
        {personal.bio}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        {[
          { label: 'GitHub', icon: 'GH', href: personal.social.github },
          { label: 'LinkedIn', icon: 'in', href: personal.social.linkedin },
          { label: 'Twitter', icon: '𝕏', href: personal.social.twitter },
        ].map(s => (
          <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.12, y: -3 }} whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--zinc-800)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)' }}
          >{s.icon}</motion.a>
        ))}
        <motion.a href="#projects"
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{ padding: '10px 24px', borderRadius: 'var(--radius-md)', background: 'var(--black)', color: 'var(--white)', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8, textDecoration: 'none' }}
        >
          View Projects →
        </motion.a>
      </motion.div>
    </div>
  );
}
