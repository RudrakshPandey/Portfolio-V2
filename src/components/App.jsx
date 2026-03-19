import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import '../styles/global.css';

import Cursor         from './Cursor';
import Loader         from './Loader';
import Navbar         from './Navbar';
import Footer         from './Footer';

import Hero           from '../sections/Hero';
import About          from '../sections/About';
import Skills         from '../sections/Skills';
import Experience     from '../sections/Experience';
import Projects       from '../sections/Projects';
import Certifications from '../sections/Certifications';
import Contact        from '../sections/Contact';

export default function App() {
  const [loaded, setLoaded]     = useState(false);
  // Show cursor on any non-touch device (includes tablets with mouse/trackpad)
  // Uses pointer:fine which catches all mice/trackpads but not touchscreens
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsPointer(mq.matches);
    const handler = (e) => setIsPointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <>
      {isPointer && <Cursor />}

      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
