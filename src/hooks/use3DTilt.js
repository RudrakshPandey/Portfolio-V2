import { useRef, useCallback } from 'react';

/**
 * use3DTilt — returns event handlers that produce a subtle 3D tilt
 * on a card as the mouse moves across it.
 *
 * Usage:
 *   const { handlers, style } = use3DTilt();
 *   <div {...handlers} style={{ ...style, ...yourStyles }} />
 */
export function use3DTilt(options = {}) {
  const {
    maxTilt    = 8,     // max degrees of tilt
    scale      = 1.025, // slight zoom on hover
    glare      = true,  // show glare reflection
    perspective = 800,
  } = options;

  const cardRef  = useRef(null);
  const glareRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);   // -1 … 1
    const dy    = (e.clientY - cy) / (rect.height / 2);   // -1 … 1

    const rotX  =  dy * maxTilt * -1;   // tilt top/bottom
    const rotY  =  dx * maxTilt;        // tilt left/right

    card.style.transform    = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale},${scale},${scale})`;
    card.style.transition   = 'transform 0.08s linear';

    if (glare && glareRef.current) {
      // glare angle follows mouse position around the card
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      glareRef.current.style.background =
        `linear-gradient(${angle}deg, rgba(255,255,255,0.22) 0%, transparent 65%)`;
      glareRef.current.style.opacity = '1';
    }
  }, [maxTilt, scale, glare, perspective]);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, [glare]);

  return {
    cardRef,
    glareRef,
    handlers: { onMouseMove, onMouseLeave },
  };
}
