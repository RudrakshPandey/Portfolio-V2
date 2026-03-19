import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealLeft, RevealRight, RevealUp } from '../components/Reveal';
import { personal } from '../data';

const tabs = ['Personal', 'About Me'];

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section id="about" style={{ padding: 'clamp(64px,10vw,120px) clamp(16px,4vw,48px)', background: 'rgba(250,250,250,0.8)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <RevealUp style={{ marginBottom: 64 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--error)', background: 'rgba(239,68,68,0.08)', padding: '4px 10px', borderRadius: 3, display: 'inline-block', marginBottom: 16 }}>02 — About</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-2px' }}>A bit about me</h2>
        </RevealUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(24px,5vw,64px)', alignItems: 'start' }}>
          <RevealLeft>
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: '1.5px solid var(--zinc-200)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}
            >
              <div style={{ background: 'var(--black)', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 80, height: 80, borderRadius: 12, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} style={{ background: (Math.floor(i / 4) + i) % 2 === 0 ? 'var(--white)' : 'var(--black)', aspectRatio: '1' }} />
                  ))}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>{personal.name}</div>
                  <div style={{ color: 'var(--zinc-400)', fontSize: 13, marginTop: 4 }}>SDE @ TCS</div>
                </div>
              </div>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--zinc-200)', display: 'flex', gap: 8 }}>
                {tabs.map((tab, i) => (
                  <motion.button key={tab} onClick={() => setActiveTab(i)} whileTap={{ scale: 0.95 }}
                    style={{ padding: '6px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, background: activeTab === i ? 'var(--black)' : 'transparent', color: activeTab === i ? 'var(--white)' : 'var(--zinc-500)', border: '1.5px solid', borderColor: activeTab === i ? 'var(--black)' : 'var(--zinc-200)', transition: 'all 0.2s ease' }}
                  >{tab}</motion.button>
                ))}
              </div>
              <div style={{ padding: 20 }}>
                <AnimatePresence mode="wait">
                  <motion.p key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                    style={{ fontSize: 13, color: 'var(--zinc-500)', lineHeight: 1.7 }}
                  >
                    {activeTab === 0 ? personal.bio : personal.bio2}
                  </motion.p>
                </AnimatePresence>
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Location', value: personal.location },
                    { label: 'Email',    value: personal.email },
                    { label: 'Phone',    value: personal.phone },
                    { label: 'Status',   value: 'Open to opportunities' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, color: 'var(--zinc-400)', textTransform: 'uppercase' }}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </RevealLeft>

          <RevealRight>
            <div>
              <p style={{ fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.8, color: 'var(--zinc-600)', marginBottom: 24 }}>{personal.bio}</p>
              <p style={{ fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.8, color: 'var(--zinc-600)', marginBottom: 40 }}>{personal.bio2}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 16 }}>
                {[
                  { num: '2.5+', label: 'Years at TCS' },
                  { num: '10M+', label: 'Daily Txns' },
                  { num: '500+', label: 'Active Users' },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1.5px solid var(--zinc-200)', borderRadius: 12, textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div style={{ fontSize: 'clamp(28px,3vw,36px)', fontWeight: 800, letterSpacing: '-2px' }}>{stat.num}</div>
                    <div style={{ fontSize: 12, color: 'var(--zinc-400)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealRight>
        </div>
      </div>
    </section>
  );
}
