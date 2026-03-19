import { motion } from 'framer-motion';

export default function Loader({ onDone }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--black)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, gap: 32,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ fontSize: 48, fontWeight: 800, color: 'var(--white)', letterSpacing: '-3px' }}
      >
        R<span style={{ color: 'var(--error)' }}>.</span>
      </motion.div>

      <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={onDone}
          style={{ height: '100%', background: 'var(--error)', borderRadius: 2 }}
        />
      </div>

      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--zinc-500)' }}
      >
        Loading...
      </motion.span>
    </motion.div>
  );
}
