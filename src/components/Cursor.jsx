import { useEffect, useRef, useCallback } from 'react';

/**
 * PLUS-SIGN MAGNETIC CURSOR — v4 exact restore
 * + cross → × on hover (45°), red on hover/click, shrinks on click.
 * Magnetic pull toward a,button,[data-hover]. No trailing ring.
 */

const LERP_NORMAL = 0.18;
const LERP_MAGNET = 0.22;
const MAGNET_DIST = 80;
const MAGNET_STR  = 0.38;

export default function Cursor() {
  const wrapRef = useRef(null);
  const svgRef  = useRef(null);

  const mouse  = useRef({ x: -200, y: -200 });
  const pos    = useRef({ x: -200, y: -200 });
  const flags  = useRef({ hovered: false, clicked: false, visible: false });
  const magnet = useRef({ active: false, tx: 0, ty: 0 });
  const raf    = useRef(null);

  const tick = useCallback(() => {
    const m  = mouse.current;
    const p  = pos.current;
    const fl = flags.current;
    const mg = magnet.current;

    // magnetic pull
    let pulled = false;
    if (fl.visible) {
      const targets = document.querySelectorAll('a,button,[data-hover]');
      for (const el of targets) {
        const r  = el.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = m.x - cx;
        const dy = m.y - cy;
        if (Math.sqrt(dx * dx + dy * dy) < MAGNET_DIST) {
          mg.active = true;
          mg.tx = m.x - dx * MAGNET_STR;
          mg.ty = m.y - dy * MAGNET_STR;
          pulled = true;
          break;
        }
      }
    }
    if (!pulled) mg.active = false;

    const tx = mg.active ? mg.tx : m.x;
    const ty = mg.active ? mg.ty : m.y;
    const lt = mg.active ? LERP_MAGNET : LERP_NORMAL;

    p.x += (tx - p.x) * lt;
    p.y += (ty - p.y) * lt;

    if (wrapRef.current) {
      const size = fl.clicked ? 13 : fl.hovered ? 28 : 22;
      const half = size / 2;
      wrapRef.current.style.transform = `translate(${p.x - half}px,${p.y - half}px)`;
      wrapRef.current.style.width     = size + 'px';
      wrapRef.current.style.height    = size + 'px';
      wrapRef.current.style.opacity   = fl.visible ? '1' : '0';
    }

    if (svgRef.current) {
      const rot   = fl.hovered ? 45 : 0;
      const color = (fl.hovered || fl.clicked) ? '#ef4444' : '#000000';
      svgRef.current.style.transform = `rotate(${rot}deg)`;
      svgRef.current.querySelectorAll('rect').forEach(r => r.setAttribute('fill', color));
    }

    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const onMove  = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!flags.current.visible) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        flags.current.visible = true;
      }
    };
    const onOver  = (e) => { if (e.target.closest('a,button,[data-hover],input,textarea')) flags.current.hovered = true; };
    const onOut   = (e) => { if (e.target.closest('a,button,[data-hover],input,textarea')) flags.current.hovered = false; };
    const onDown  = () => { flags.current.clicked = true; };
    const onUp    = () => { flags.current.clicked = false; };
    const onLeave = () => { flags.current.visible = false; };
    const onEnter = () => { flags.current.visible = true; };

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mouseover',  onOver,  { passive: true });
    window.addEventListener('mouseout',   onOut,   { passive: true });
    window.addEventListener('mousedown',  onDown,  { passive: true });
    window.addEventListener('mouseup',    onUp,    { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseover',  onOver);
      window.removeEventListener('mouseout',   onOut);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [tick]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: 22, height: 22,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        transition: 'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
        willChange: 'transform',
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 22 22"
        width="100%" height="100%"
        style={{ display: 'block', transformOrigin: 'center', transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        <rect x="0" y="9" width="22" height="4" rx="2" fill="#000000" />
        <rect x="9" y="0" width="4" height="22" rx="2" fill="#000000" />
      </svg>
    </div>
  );
}
