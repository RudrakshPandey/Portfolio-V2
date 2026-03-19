import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealUp, RevealLeft, RevealRight } from '../components/Reveal';
import { personal } from '../data';

function Input({ label, type = 'text', placeholder, value, onChange, error, multiline }) {
  const [focused, setFocused] = useState(false);
  const style = {
    width: '100%', fontFamily: 'var(--font-sans)', fontSize: 14, padding: '12px 16px',
    borderRadius: 8, border: '1.5px solid',
    borderColor: error ? 'var(--error)' : focused ? 'var(--black)' : 'var(--zinc-200)',
    background: focused ? 'var(--white)' : 'var(--zinc-50)',
    outline: 'none', color: 'var(--black)',
    transition: 'border-color 0.2s ease, background 0.2s ease',
    resize: multiline ? 'vertical' : 'none',
    minHeight: multiline ? 120 : 'auto',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--zinc-700)' }}>{label}</label>
      {multiline
        ? <textarea style={style} placeholder={placeholder} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} rows={5} />
        : <input type={type} style={style} placeholder={placeholder} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      }
      {error && (
        <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 12, color: 'var(--error)', fontFamily: 'var(--font-mono)' }}
        >{error}</motion.span>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    /* Build mailto: link with form data as the email body */
    const subject = encodeURIComponent(`Message from ${form.name} via Portfolio`);
    const body    = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    const mailtoLink = `mailto:rudrakshpandey8@gmail.com?subject=${subject}&body=${body}`;

    /* Open the user's email client with body pre-filled */
    window.location.href = mailtoLink;

    /* Show success state */
    setSent(true);
  };

  return (
    <section id="contact" style={{ padding: 'clamp(64px,10vw,120px) clamp(16px,4vw,48px)', background: 'var(--zinc-50)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <RevealUp style={{ marginBottom: 64 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--error)', background: 'rgba(239,68,68,0.08)', padding: '4px 10px', borderRadius: 3, display: 'inline-block', marginBottom: 16 }}>07 — Contact</span>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 16 }}>Get In Touch</h2>
          <p style={{ fontSize: 15, color: 'var(--zinc-500)', maxWidth: 480, lineHeight: 1.7 }}>I'm always open to new opportunities and collaborations. Drop me a message!</p>
        </RevealUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 'clamp(24px,5vw,64px)' }}>
          <RevealLeft>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: '📍', label: 'Location', value: personal.location },
                { icon: '✉️', label: 'Email',    value: personal.email    },
                { icon: '💼', label: 'Status',   value: 'Open to opportunities' },
              ].map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                  whileHover={{ x: 4 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', background: 'rgba(255,255,255,0.9)', borderRadius: 12, border: '1.5px solid var(--zinc-200)', boxShadow: 'var(--shadow-sm)', backdropFilter: 'blur(8px)' }}
                >
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--zinc-400)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                style={{ padding: '24px', background: 'var(--black)', borderRadius: 16, color: 'var(--white)', marginTop: 4 }}
              >
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8 }}>Let's build something great together.</div>
                <p style={{ fontSize: 13, color: 'var(--zinc-400)', lineHeight: 1.6 }}>Whether it's a product, a design system, or a full stack app — I'm in.</p>
              </motion.div>
            </div>
          </RevealLeft>

          <RevealRight>
            <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: '1.5px solid var(--zinc-200)', borderRadius: 16, padding: 32, boxShadow: 'var(--shadow-md)' }}>
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                  >
                    <Input label="Your Name"      placeholder="Rudraksh Pandey" value={form.name}    onChange={e => setForm({ ...form, name: e.target.value })}    error={errors.name} />
                    <Input label="Email Address"  type="email" placeholder="hello@example.com" value={form.email}   onChange={e => setForm({ ...form, email: e.target.value })}   error={errors.email} />
                    <Input label="Message"        placeholder="How can I help you?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} error={errors.message} multiline />

                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      style={{ background: 'var(--black)', color: 'var(--white)', padding: '14px 24px', borderRadius: 8, fontSize: 14, fontWeight: 700, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                    >
                      Send Message →
                    </motion.button>
                    <p style={{ fontSize: 11, color: 'var(--zinc-400)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                      Opens your email client with the message pre-filled.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '48px 24px', textAlign: 'center' }}
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 15 }}
                      style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}
                    >✓</motion.div>
                    <h3 style={{ fontSize: 20, fontWeight: 700 }}>Email client opened!</h3>
                    <p style={{ fontSize: 14, color: 'var(--zinc-500)' }}>Your message has been pre-filled. Just hit send in your email app!</p>
                    <motion.button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      style={{ padding: '10px 24px', background: 'transparent', border: '1.5px solid var(--zinc-200)', borderRadius: 8, fontSize: 13, fontWeight: 600, color: 'var(--zinc-600)' }}
                    >
                      Send Another
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealRight>
        </div>
      </div>
    </section>
  );
}
