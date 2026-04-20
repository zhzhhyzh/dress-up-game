import { useId } from 'react';
import { useGame } from '../context/GameContext';
import { HAIR_STYLES, HAIR_COLORS, MAKEUP_OPTIONS } from '../data/makeupAndHair';
import { CLOTHING } from '../data/clothing';

export default function Character({ size = 400, animate = true, showClothing = true, showMakeup = true, showHair = true }) {
  const { state } = useGame();
  const { skinTone, makeup, hair, clothing } = state;
  const w = size;
  const h = size * 1.4;
  const cx = 0;
  const cy = 0;

  const uid = useId().replace(/:/g, '');

  const hairStyle = HAIR_STYLES.find(s => s.id === hair.style) || HAIR_STYLES[0];
  const hairColorObj = HAIR_COLORS.find(c => c.id === hair.color) || HAIR_COLORS.find(c => c.color === hair.color);
  const hairColor = hairColorObj?.gradient ? `url(#hg-${uid})` : (hairColorObj?.color || hair.color);
  const hairColorSolid = hairColorObj?.color || hairColorObj?.gradient?.[0] || hair.color || '#3b2214';

  const hasMakeup = (val) => val && val !== 'none';

  const eyeshadowColor = hasMakeup(makeup.eyeshadow)
    ? (MAKEUP_OPTIONS.eyeshadow.find(e => e.id === makeup.eyeshadow)?.color || 'transparent')
    : 'transparent';
  const lipColor = hasMakeup(makeup.lipstick)
    ? (MAKEUP_OPTIONS.lipstick.find(l => l.id === makeup.lipstick)?.color || 'transparent')
    : 'transparent';
  const blushColor = hasMakeup(makeup.blush)
    ? (MAKEUP_OPTIONS.blush.find(b => b.id === makeup.blush)?.color || 'transparent')
    : 'transparent';
  const eyelinerStyle = hasMakeup(makeup.eyeliner)
    ? (MAKEUP_OPTIONS.eyeliner.find(e => e.id === makeup.eyeliner)?.style || 'none')
    : 'none';
  const foundationObj = hasMakeup(makeup.foundation) ? MAKEUP_OPTIONS.foundation.find(f => f.id === makeup.foundation) : null;
  const lashObj = hasMakeup(makeup.lashes) ? MAKEUP_OPTIONS.lashes.find(l => l.id === makeup.lashes) : MAKEUP_OPTIONS.lashes[0];
  const browShape = makeup.eyebrows || 'natural';

  const topItem = clothing.top ? CLOTHING.tops.find(t => t.id === clothing.top) : null;
  const bottomItem = clothing.bottom ? CLOTHING.bottoms.find(b => b.id === clothing.bottom) : null;
  const dressItem = clothing.dress ? CLOTHING.dresses.find(d => d.id === clothing.dress) : null;
  const shoeItem = clothing.shoes ? CLOTHING.shoes.find(s => s.id === clothing.shoes) : null;
  const outerwearItem = clothing.outerwear ? CLOTHING.outerwear.find(o => o.id === clothing.outerwear) : null;

  // 3D skin shading helpers
  const skinLight = shadeColor(skinTone, 12);
  const skinMid = skinTone;
  const skinDark = shadeColor(skinTone, -18);
  const skinDeep = shadeColor(skinTone, -30);

  const renderEyebrow = (x, flip = false) => {
    const s = flip ? -1 : 1;
    const brows = {
      natural: `M${x - 6 * s},${cy - 28} Q${x - 2 * s},${cy - 31.5} ${x + 2 * s},${cy - 31} Q${x + 5 * s},${cy - 30} ${x + 7 * s},${cy - 28.5}`,
      arched: `M${x - 6 * s},${cy - 27} Q${x - 1 * s},${cy - 34} ${x + 3 * s},${cy - 32} Q${x + 6 * s},${cy - 29} ${x + 7 * s},${cy - 27}`,
      straight: `M${x - 6 * s},${cy - 29.5} L${x + 7 * s},${cy - 29.5}`,
      thick: `M${x - 6 * s},${cy - 27.5} Q${x},${cy - 33} ${x + 7 * s},${cy - 28}`,
      thin: `M${x - 5 * s},${cy - 29} Q${x},${cy - 31} ${x + 6 * s},${cy - 29}`,
    };
    return brows[browShape] || brows.natural;
  };

  const renderEyeliner = (x, flip = false) => {
    if (eyelinerStyle === 'none') return null;
    const dir = flip ? -1 : 1;
    const suffix = flip ? 'r' : 'l';
    const ey = cy - 20;
    const styles = {
      thin: <path key={`liner-${suffix}`} d={`M${x - 5.5 * dir},${ey + 2} Q${x},${ey - 1} ${x + 5.5 * dir},${ey + 2}`} stroke="#1a1a1a" strokeWidth="0.7" fill="none" />,
      winged: <path key={`liner-${suffix}`} d={`M${x - 5.5 * dir},${ey + 2} Q${x},${ey - 1} ${x + 5.5 * dir},${ey + 1} L${x + 8 * dir},${ey - 2}`} stroke="#1a1a1a" strokeWidth="0.9" fill="none" />,
      thick: <path key={`liner-${suffix}`} d={`M${x - 5.5 * dir},${ey + 2} Q${x},${ey - 2} ${x + 5.5 * dir},${ey + 2}`} stroke="#1a1a1a" strokeWidth="1.6" fill="none" />,
      smudge: <path key={`liner-${suffix}`} d={`M${x - 5 * dir},${ey + 2} Q${x},${ey - 1} ${x + 5 * dir},${ey + 2}`} stroke="#333" strokeWidth="2.2" fill="none" opacity="0.4" />,
    };
    return styles[eyelinerStyle];
  };

  const renderLashes = (x, flip = false) => {
    const dir = flip ? -1 : 1;
    const len = (lashObj?.length || 1) * 2.5;
    const ey = cy - 20;
    return (
      <g>
        <line x1={x - 4.5 * dir} y1={ey - 2} x2={x - 5.5 * dir} y2={ey - 2 - len} stroke="#1a1a1a" strokeWidth="0.5" />
        <line x1={x - 2.5 * dir} y1={ey - 3} x2={x - 2.5 * dir} y2={ey - 3 - len - 0.5} stroke="#1a1a1a" strokeWidth="0.5" />
        <line x1={x} y1={ey - 3.5} x2={x} y2={ey - 3.5 - len - 0.8} stroke="#1a1a1a" strokeWidth="0.5" />
        <line x1={x + 2.5 * dir} y1={ey - 3} x2={x + 3 * dir} y2={ey - 3 - len - 0.5} stroke="#1a1a1a" strokeWidth="0.5" />
        <line x1={x + 4.5 * dir} y1={ey - 2} x2={x + 5.5 * dir} y2={ey - 2 - len} stroke="#1a1a1a" strokeWidth="0.5" />
      </g>
    );
  };

  const renderHairAccessory = () => {
    const acc = hair.accessory;
    if (!acc || acc === 'none') return null;
    const accComponents = {
      bow: (
        <g transform={`translate(${cx + 14}, ${cy - 40})`}>
          <path d="M0,0 C-8,-6 -12,-2 -8,2 C-12,6 -8,10 0,4 C8,10 12,6 8,2 C12,-2 8,-6 0,0 Z" fill="#ff69b4" stroke="#e05595" strokeWidth="0.5" />
          <circle cx="0" cy="2" r="1.5" fill="#e05595" />
        </g>
      ),
      headband: (
        <path d={`M${cx - 22},${cy - 32} Q${cx},${cy - 44} ${cx + 22},${cy - 32}`} stroke="#ffd700" strokeWidth="2.5" fill="none" />
      ),
      tiara: (
        <g transform={`translate(${cx}, ${cy - 40})`}>
          <path d="M-12,2 L-8,-4 L-4,0 L0,-8 L4,0 L8,-4 L12,2 Z" fill="#ffd700" stroke="#daa520" strokeWidth="0.5" />
          <circle cx="0" cy="-7" r="1.5" fill="#ff69b4" />
          <circle cx="-8" cy="-3" r="1" fill="#87ceeb" />
          <circle cx="8" cy="-3" r="1" fill="#87ceeb" />
        </g>
      ),
      clips: (
        <g>
          <rect x={cx - 20} y={cy - 34} width="5" height="2" rx="1" fill="#ffd700" />
          <rect x={cx + 15} y={cy - 34} width="5" height="2" rx="1" fill="#ffd700" />
        </g>
      ),
      flowers: (
        <g transform={`translate(${cx}, ${cy - 40})`}>
          {[-12, -6, 0, 6, 12].map((x, i) => (
            <g key={`flower-${i}`} transform={`translate(${x}, ${Math.sin(i) * 1.5})`}>
              <circle cx="0" cy="0" r="2.5" fill={['#ffb6c1', '#fff44f', '#98fb98', '#ff69b4', '#87ceeb'][i]} />
              <circle cx="0" cy="0" r="0.8" fill="#ffd700" />
            </g>
          ))}
        </g>
      ),
      ribbon: (
        <g transform={`translate(${cx + 16}, ${cy - 36})`}>
          <path d="M0,0 L-4,8 L0,6 L4,8 Z" fill="#ff69b4" />
          <rect x="-2" y="-1" width="4" height="2" rx="1" fill="#e05595" />
        </g>
      ),
      scrunchie: (
        <circle cx={cx + 14} cy={cy - 36} r="3.5" fill="#9966cc" stroke="#7744aa" strokeWidth="1" />
      ),
    };
    return accComponents[acc] || null;
  };

  const renderClothingItem = (category, item) => {
    if (!item) return null;
    const color = item.color;
    switch (category) {
      case 'top':
        return (
          <g key="top">
            <path d={`M${cx - 16},${cy + 30} Q${cx - 22},${cy + 28} ${cx - 28},${cy + 32} L${cx - 26},${cy + 52} L${cx - 16},${cy + 48} L${cx - 16},${cy + 68} L${cx + 16},${cy + 68} L${cx + 16},${cy + 48} L${cx + 26},${cy + 52} L${cx + 28},${cy + 32} Q${cx + 22},${cy + 28} ${cx + 16},${cy + 30} Z`} fill={color} stroke={shadeColor(color, -20)} strokeWidth="0.7" />
            {item.id === 'sequin' && <path d={`M${cx - 16},${cy + 30} L${cx + 16},${cy + 30} L${cx + 16},${cy + 68} L${cx - 16},${cy + 68} Z`} fill={`url(#sh-${uid})`} opacity="0.3" />}
          </g>
        );
      case 'bottom':
        return (
          <g key="bottom">
            {item.id.includes('skirt') ? (
              <path d={`M${cx - 16},${cy + 66} L${cx - 24},${cy + 105} L${cx + 24},${cy + 105} L${cx + 16},${cy + 66} Z`} fill={color} stroke={shadeColor(color, -20)} strokeWidth="0.7" />
            ) : (
              <path d={`M${cx - 16},${cy + 66} L${cx - 14},${cy + 105} L${cx - 2},${cy + 105} L${cx},${cy + 78} L${cx + 2},${cy + 105} L${cx + 14},${cy + 105} L${cx + 16},${cy + 66} Z`} fill={color} stroke={shadeColor(color, -20)} strokeWidth="0.7" />
            )}
          </g>
        );
      case 'dress':
        return (
          <g key="dress">
            <path d={`M${cx - 16},${cy + 30} Q${cx - 22},${cy + 28} ${cx - 28},${cy + 32} L${cx - 26},${cy + 52} L${cx - 16},${cy + 48} L${cx - 26},${cy + 105} L${cx + 26},${cy + 105} L${cx + 16},${cy + 48} L${cx + 26},${cy + 52} L${cx + 28},${cy + 32} Q${cx + 22},${cy + 28} ${cx + 16},${cy + 30} Z`} fill={color} stroke={shadeColor(color, -20)} strokeWidth="0.7" />
            {item.id === 'ballgown' && (
              <path d={`M${cx - 26},${cy + 85} Q${cx},${cy + 78} ${cx + 26},${cy + 85} L${cx + 30},${cy + 105} L${cx - 30},${cy + 105} Z`} fill={shadeColor(color, 15)} opacity="0.4" />
            )}
          </g>
        );
      case 'shoes':
        return (
          <g key="shoes">
            <ellipse cx={cx - 7} cy={cy + 108} rx="7" ry="3.5" fill={color} stroke={shadeColor(color, -30)} strokeWidth="0.5" />
            <ellipse cx={cx + 7} cy={cy + 108} rx="7" ry="3.5" fill={color} stroke={shadeColor(color, -30)} strokeWidth="0.5" />
            {(item.id === 'heels' || item.id === 'kitten') && (
              <g>
                <line x1={cx - 9} y1={cy + 110} x2={cx - 11} y2={cy + 115} stroke={color} strokeWidth="1.5" />
                <line x1={cx + 9} y1={cy + 110} x2={cx + 11} y2={cy + 115} stroke={color} strokeWidth="1.5" />
              </g>
            )}
          </g>
        );
      case 'outerwear':
        return (
          <g key="outerwear">
            <path d={`M${cx - 18},${cy + 30} L${cx - 32},${cy + 28} L${cx - 30},${cy + 58} L${cx - 18},${cy + 54} L${cx - 18},${cy + 82} L${cx + 18},${cy + 82} L${cx + 18},${cy + 54} L${cx + 30},${cy + 58} L${cx + 32},${cy + 28} L${cx + 18},${cy + 30} Z`} fill={color} stroke={shadeColor(color, -20)} strokeWidth="0.7" opacity="0.9" />
            <line x1={cx} y1={cy + 32} x2={cx} y2={cy + 82} stroke={shadeColor(color, -10)} strokeWidth="0.5" strokeDasharray="2,2" />
          </g>
        );
      default:
        return null;
    }
  };

  const renderAccessory = (accId) => {
    const accessoryRenderers = {
      'necklace-chain': <path d={`M${cx - 9},${cy + 22} Q${cx},${cy + 30} ${cx + 9},${cy + 22}`} stroke="#ffd700" strokeWidth="1" fill="none" />,
      'necklace-choker': <path d={`M${cx - 10},${cy + 20} Q${cx},${cy + 22} ${cx + 10},${cy + 20}`} stroke="#1a1a1a" strokeWidth="2" fill="none" />,
      'necklace-pearl': (
        <g>
          {[-8, -4, 0, 4, 8].map((x, i) => (
            <circle key={`pearl-${i}`} cx={cx + x} cy={cy + 22 + Math.abs(x) * 0.3} r="1.2" fill="#fffdd0" stroke="#ddd" strokeWidth="0.3" />
          ))}
        </g>
      ),
      'earrings-hoop': (
        <g>
          <circle cx={cx - 19} cy={cy - 8} r="3.5" stroke="#ffd700" strokeWidth="0.8" fill="none" />
          <circle cx={cx + 19} cy={cy - 8} r="3.5" stroke="#ffd700" strokeWidth="0.8" fill="none" />
        </g>
      ),
      'earrings-drop': (
        <g>
          <line x1={cx - 19} y1={cy - 10} x2={cx - 19} y2={cy - 4} stroke="#c0c0c0" strokeWidth="0.4" />
          <circle cx={cx - 19} cy={cy - 2} r="1.8" fill="#e0e0ff" />
          <line x1={cx + 19} y1={cy - 10} x2={cx + 19} y2={cy - 4} stroke="#c0c0c0" strokeWidth="0.4" />
          <circle cx={cx + 19} cy={cy - 2} r="1.8" fill="#e0e0ff" />
        </g>
      ),
      'earrings-stud': (
        <g>
          <circle cx={cx - 18.5} cy={cy - 8} r="1.3" fill="#ffffff" stroke="#ddd" strokeWidth="0.3" />
          <circle cx={cx + 18.5} cy={cy - 8} r="1.3" fill="#ffffff" stroke="#ddd" strokeWidth="0.3" />
        </g>
      ),
      'sunglasses': (
        <g>
          <rect x={cx - 13} y={cy - 22} width="10" height="7" rx="2" fill="#1a1a1a" opacity="0.85" />
          <rect x={cx + 3} y={cy - 22} width="10" height="7" rx="2" fill="#1a1a1a" opacity="0.85" />
          <line x1={cx - 3} y1={cy - 18.5} x2={cx + 3} y2={cy - 18.5} stroke="#1a1a1a" strokeWidth="0.8" />
        </g>
      ),
      'glasses-cat': (
        <g>
          <path d={`M${cx - 13},${cy - 21} L${cx - 13},${cy - 15} L${cx - 3},${cy - 15} L${cx - 2},${cy - 23} Z`} fill="none" stroke="#ff0000" strokeWidth="0.8" />
          <path d={`M${cx + 13},${cy - 21} L${cx + 13},${cy - 15} L${cx + 3},${cy - 15} L${cx + 2},${cy - 23} Z`} fill="none" stroke="#ff0000" strokeWidth="0.8" />
          <line x1={cx - 2} y1={cy - 18} x2={cx + 2} y2={cy - 18} stroke="#ff0000" strokeWidth="0.8" />
        </g>
      ),
      'hat-beret': (
        <g>
          <ellipse cx={cx} cy={cy - 36} rx="22" ry="6" fill="#2f2f2f" />
          <ellipse cx={cx - 4} cy={cy - 40} rx="18" ry="8" fill="#2f2f2f" />
          <circle cx={cx - 4} cy={cy - 47} r="1.5" fill="#2f2f2f" />
        </g>
      ),
      'hat-bucket': (
        <g>
          <path d={`M${cx - 20},${cy - 32} L${cx - 16},${cy - 42} L${cx + 16},${cy - 42} L${cx + 20},${cy - 32} Z`} fill="#90ee90" />
          <ellipse cx={cx} cy={cy - 32} rx="23" ry="3.5" fill="#7dcc7d" />
        </g>
      ),
      'crown': (
        <g transform={`translate(${cx}, ${cy - 40})`}>
          <path d="M-14,4 L-14,-2 L-9,2 L-4,-5 L0,2 L4,-5 L9,2 L14,-2 L14,4 Z" fill="#ffd700" stroke="#daa520" strokeWidth="0.5" />
          <circle cx="0" cy="-3" r="1.8" fill="#ff0000" />
          <circle cx="-9" cy="0" r="1" fill="#4169e1" />
          <circle cx="9" cy="0" r="1" fill="#4169e1" />
        </g>
      ),
      'scarf': <path d={`M${cx - 10},${cy + 20} Q${cx - 4},${cy + 26} ${cx + 2},${cy + 30} L${cx + 4},${cy + 36} L${cx + 7},${cy + 33} L${cx + 4},${cy + 26} Q${cx + 2},${cy + 22} ${cx + 10},${cy + 20}`} fill="#87ceeb" stroke="#6bb3d9" strokeWidth="0.5" />,
      'belt': <rect x={cx - 16} y={cy + 63} width="32" height="3" rx="1" fill="#c0c0c0" stroke="#999" strokeWidth="0.3" />,
      'bracelet': <circle cx={cx - 26} cy={cy + 50} r="2.5" stroke="#ffd700" strokeWidth="0.8" fill="none" />,
      'gloves': (
        <g>
          <rect x={cx - 30} y={cy + 42} width="7" height="12" rx="3" fill="#1a1a1a" />
          <rect x={cx + 23} y={cy + 42} width="7" height="12" rx="3" fill="#1a1a1a" />
        </g>
      ),
      'bag-clutch': <rect x={cx + 30} y={cy + 52} width="11" height="7" rx="2" fill="#1a1a2e" stroke="#111" strokeWidth="0.4" />,
      'bag-tote': (
        <g transform={`translate(${cx + 32}, ${cy + 42})`}>
          <rect x="0" y="0" width="12" height="14" rx="2" fill="#c4b5a0" stroke="#a0916e" strokeWidth="0.4" />
          <path d="M2,-3 Q6,-7 10,-3" stroke="#a0916e" strokeWidth="0.8" fill="none" />
        </g>
      ),
      'bag-mini': (
        <g transform={`translate(${cx + 30}, ${cy + 47})`}>
          <rect x="0" y="0" width="9" height="7" rx="3" fill="#ff69b4" stroke="#e05595" strokeWidth="0.4" />
          <line x1="4.5" y1="-2.5" x2="4.5" y2="0" stroke="#e05595" strokeWidth="0.7" />
        </g>
      ),
    };
    return accessoryRenderers[accId] || null;
  };

  return (
    <svg viewBox={`${-w / 2} ${-h * 0.3} ${w} ${h}`} width={size} height={size * 1.4} style={{ overflow: 'visible' }}>
      <defs>
        {hairColorObj?.gradient && (
          <linearGradient id={`hg-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hairColorObj.gradient[0]} />
            <stop offset="100%" stopColor={hairColorObj.gradient[1]} />
          </linearGradient>
        )}
        <pattern id={`sh-${uid}`} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="transparent" />
          <circle cx="2" cy="2" r="0.5" fill="white" opacity="0.6" />
        </pattern>
        {/* 3D face shading - radial highlight */}
        <radialGradient id={`face3d-${uid}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={skinLight} stopOpacity="1" />
          <stop offset="50%" stopColor={skinMid} stopOpacity="1" />
          <stop offset="100%" stopColor={skinDark} stopOpacity="1" />
        </radialGradient>
        {/* Forehead highlight */}
        <radialGradient id={`fh-${uid}`} cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        {/* Nose highlight */}
        <linearGradient id={`nose-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={skinDark} stopOpacity="0.3" />
          <stop offset="40%" stopColor={skinLight} stopOpacity="0.5" />
          <stop offset="100%" stopColor={skinDark} stopOpacity="0.2" />
        </linearGradient>
        {/* Hair depth gradient */}
        <linearGradient id={`hd-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={shadeColor(hairColorSolid, 15)} stopOpacity="1" />
          <stop offset="100%" stopColor={shadeColor(hairColorSolid, -25)} stopOpacity="1" />
        </linearGradient>
      </defs>

      <g>
        {/* Body */}
        <g>
          {/* Neck with 3D shadow */}
          <path d={`M${cx - 7},${cy + 16} Q${cx - 7},${cy + 28} ${cx - 6},${cy + 30} L${cx + 6},${cy + 30} Q${cx + 7},${cy + 28} ${cx + 7},${cy + 16} Z`} fill={skinMid} />
          <path d={`M${cx - 7},${cy + 16} Q${cx - 7},${cy + 20} ${cx - 4},${cy + 20} L${cx - 2},${cy + 30} L${cx - 6},${cy + 30} Q${cx - 7},${cy + 28} ${cx - 7},${cy + 16} Z`} fill={skinDark} opacity="0.3" />
          {/* Shoulders + Torso */}
          <path d={`M${cx - 16},${cy + 30} Q${cx - 18},${cy + 48} ${cx - 14},${cy + 68} L${cx + 14},${cy + 68} Q${cx + 18},${cy + 48} ${cx + 16},${cy + 30} Z`} fill={skinMid} stroke={skinDeep} strokeWidth="0.4" />
          {/* Arms */}
          <path d={`M${cx - 16},${cy + 30} Q${cx - 28},${cy + 34} ${cx - 26},${cy + 55}`} stroke={skinMid} strokeWidth="7.5" fill="none" strokeLinecap="round" />
          <path d={`M${cx + 16},${cy + 30} Q${cx + 28},${cy + 34} ${cx + 26},${cy + 55}`} stroke={skinMid} strokeWidth="7.5" fill="none" strokeLinecap="round" />
          {/* Hands */}
          <ellipse cx={cx - 26} cy={cy + 56} rx="3.5" ry="4" fill={skinMid} />
          <ellipse cx={cx + 26} cy={cy + 56} rx="3.5" ry="4" fill={skinMid} />
          {/* Legs */}
          <path d={`M${cx - 8},${cy + 68} L${cx - 7},${cy + 105}`} stroke={skinMid} strokeWidth="8.5" strokeLinecap="round" />
          <path d={`M${cx + 8},${cy + 68} L${cx + 7},${cy + 105}`} stroke={skinMid} strokeWidth="8.5" strokeLinecap="round" />
        </g>

        {/* Clothing */}
        {showClothing && (
          <g>
            {dressItem ? renderClothingItem('dress', dressItem) : (
              <>
                {renderClothingItem('bottom', bottomItem)}
                {renderClothingItem('top', topItem)}
              </>
            )}
            {renderClothingItem('shoes', shoeItem)}
            {renderClothingItem('outerwear', outerwearItem)}
          </g>
        )}

        {/* Hair - back layer (behind head) */}
        {showHair && hairStyle.backPath && (
          <path d={hairStyle.backPath} transform={`translate(${cx}, ${cy - 10})`} fill={hairColor} opacity="0.6" />
        )}

        {/* Head - 3D realistic face */}
        <g>
          {/* Face shape - jawline + cheeks with 3D gradient */}
          <path d={`M${cx - 18},${cy - 18} C${cx - 20},${cy - 35} ${cx - 16},${cy - 42} ${cx},${cy - 42} C${cx + 16},${cy - 42} ${cx + 20},${cy - 35} ${cx + 18},${cy - 18} C${cx + 17},${cy - 5} ${cx + 14},${cy + 6} ${cx + 10},${cy + 12} Q${cx + 5},${cy + 17} ${cx},${cy + 18} Q${cx - 5},${cy + 17} ${cx - 10},${cy + 12} C${cx - 14},${cy + 6} ${cx - 17},${cy - 5} ${cx - 18},${cy - 18} Z`} fill={`url(#face3d-${uid})`} />
          {/* Forehead highlight for 3D */}
          <ellipse cx={cx - 2} cy={cy - 30} rx="10" ry="8" fill={`url(#fh-${uid})`} />
          {/* Foundation overlay */}
          {foundationObj && (
            <path d={`M${cx - 18},${cy - 18} C${cx - 20},${cy - 35} ${cx - 16},${cy - 42} ${cx},${cy - 42} C${cx + 16},${cy - 42} ${cx + 20},${cy - 35} ${cx + 18},${cy - 18} C${cx + 17},${cy - 5} ${cx + 14},${cy + 6} ${cx + 10},${cy + 12} Q${cx + 5},${cy + 17} ${cx},${cy + 18} Q${cx - 5},${cy + 17} ${cx - 10},${cy + 12} C${cx - 14},${cy + 6} ${cx - 17},${cy - 5} ${cx - 18},${cy - 18} Z`} fill={skinLight} opacity={foundationObj.opacity * 0.6} />
          )}
          {/* Jawline shadow for depth */}
          <path d={`M${cx - 14},${cy + 4} Q${cx - 10},${cy + 12} ${cx - 6},${cy + 14} Q${cx},${cy + 16} ${cx + 6},${cy + 14} Q${cx + 10},${cy + 12} ${cx + 14},${cy + 4}`} fill={skinDeep} opacity="0.12" />
          {/* Temple shadows */}
          <ellipse cx={cx - 16} cy={cy - 22} rx="3" ry="8" fill={skinDark} opacity="0.1" />
          <ellipse cx={cx + 16} cy={cy - 22} rx="3" ry="8" fill={skinDark} opacity="0.1" />
          {/* Ears */}
          <ellipse cx={cx - 18.5} cy={cy - 10} rx="3" ry="5" fill={skinMid} stroke={skinDark} strokeWidth="0.3" />
          <ellipse cx={cx + 18.5} cy={cy - 10} rx="3" ry="5" fill={skinMid} stroke={skinDark} strokeWidth="0.3" />
          <ellipse cx={cx - 18.5} cy={cy - 10} rx="1.5" ry="3" fill={skinDark} opacity="0.2" />
          <ellipse cx={cx + 18.5} cy={cy - 10} rx="1.5" ry="3" fill={skinDark} opacity="0.2" />
        </g>

        {/* Face features */}
        {showMakeup && (
          <g>
            {/* Eyeshadow */}
            {eyeshadowColor !== 'transparent' && (
              <g>
                <ellipse cx={cx - 8} cy={cy - 20} rx="7" ry="4.5" fill={eyeshadowColor} opacity="0.45" />
                <ellipse cx={cx + 8} cy={cy - 20} rx="7" ry="4.5" fill={eyeshadowColor} opacity="0.45" />
              </g>
            )}

            {/* Eye sockets (subtle depth) */}
            <ellipse cx={cx - 8} cy={cy - 18} rx="7" ry="5" fill={skinDark} opacity="0.06" />
            <ellipse cx={cx + 8} cy={cy - 18} rx="7" ry="5" fill={skinDark} opacity="0.06" />

            {/* Eyeliner */}
            {renderEyeliner(cx - 8, false)}
            {renderEyeliner(cx + 8, true)}

            {/* Eyebrows */}
            <path d={renderEyebrow(cx - 8)} stroke={shadeColor(hairColorSolid, -30)} strokeWidth={browShape === 'thick' ? 2 : browShape === 'thin' ? 0.7 : 1.3} fill="none" strokeLinecap="round" />
            <path d={renderEyebrow(cx + 8, true)} stroke={shadeColor(hairColorSolid, -30)} strokeWidth={browShape === 'thick' ? 2 : browShape === 'thin' ? 0.7 : 1.3} fill="none" strokeLinecap="round" />

            {/* Eyes - more realistic with depth */}
            <g>
              {/* Eye whites with subtle shadow at top */}
              <ellipse cx={cx - 8} cy={cy - 18} rx="5.5" ry="4" fill="white" />
              <ellipse cx={cx + 8} cy={cy - 18} rx="5.5" ry="4" fill="white" />
              {/* Upper eyelid crease shadow */}
              <path d={`M${cx - 13},${cy - 18.5} Q${cx - 8},${cy - 22.5} ${cx - 3},${cy - 18.5}`} stroke={skinDark} strokeWidth="0.5" fill="none" opacity="0.3" />
              <path d={`M${cx + 3},${cy - 18.5} Q${cx + 8},${cy - 22.5} ${cx + 13},${cy - 18.5}`} stroke={skinDark} strokeWidth="0.5" fill="none" opacity="0.3" />
              {/* Iris */}
              <circle cx={cx - 7.5} cy={cy - 17.5} r="3.2" fill="#5a7a50" />
              <circle cx={cx + 7.5} cy={cy - 17.5} r="3.2" fill="#5a7a50" />
              {/* Iris detail ring */}
              <circle cx={cx - 7.5} cy={cy - 17.5} r="3.2" fill="none" stroke="#3d5a35" strokeWidth="0.4" />
              <circle cx={cx + 7.5} cy={cy - 17.5} r="3.2" fill="none" stroke="#3d5a35" strokeWidth="0.4" />
              {/* Pupil */}
              <circle cx={cx - 7.5} cy={cy - 17.5} r="1.7" fill="#111" />
              <circle cx={cx + 7.5} cy={cy - 17.5} r="1.7" fill="#111" />
              {/* Light reflection (catchlight) */}
              <circle cx={cx - 6.5} cy={cy - 18.8} r="0.9" fill="white" />
              <circle cx={cx + 8.5} cy={cy - 18.8} r="0.9" fill="white" />
              <circle cx={cx - 8} cy={cy - 16.5} r="0.4" fill="white" opacity="0.6" />
              <circle cx={cx + 7} cy={cy - 16.5} r="0.4" fill="white" opacity="0.6" />
              {/* Upper eyelid line */}
              <path d={`M${cx - 13},${cy - 18} Q${cx - 8},${cy - 22} ${cx - 3},${cy - 18}`} stroke="#2a2a2a" strokeWidth="0.8" fill="none" />
              <path d={`M${cx + 3},${cy - 18} Q${cx + 8},${cy - 22} ${cx + 13},${cy - 18}`} stroke="#2a2a2a" strokeWidth="0.8" fill="none" />
              {/* Lower lash line */}
              <path d={`M${cx - 12},${cy - 17} Q${cx - 8},${cy - 14} ${cx - 4},${cy - 17}`} stroke="#5a4a3a" strokeWidth="0.3" fill="none" opacity="0.5" />
              <path d={`M${cx + 4},${cy - 17} Q${cx + 8},${cy - 14} ${cx + 12},${cy - 17}`} stroke="#5a4a3a" strokeWidth="0.3" fill="none" opacity="0.5" />
            </g>

            {/* Lashes */}
            {renderLashes(cx - 8)}
            {renderLashes(cx + 8, true)}

            {/* Blush */}
            {blushColor !== 'transparent' && (
              <g>
                <ellipse cx={cx - 13} cy={cy - 5} rx="6" ry="4" fill={blushColor} opacity="0.4" />
                <ellipse cx={cx + 13} cy={cy - 5} rx="6" ry="4" fill={blushColor} opacity="0.4" />
              </g>
            )}

            {/* Nose - 3D with bridge highlight and shadow */}
            <g>
              {/* Nose bridge */}
              <path d={`M${cx - 1.5},${cy - 14} L${cx - 2},${cy - 4} Q${cx - 3},${cy - 1} ${cx - 4},${cy} Q${cx},${cy + 1.5} ${cx + 4},${cy} Q${cx + 3},${cy - 1} ${cx + 2},${cy - 4} L${cx + 1.5},${cy - 14}`} fill="none" stroke={skinDeep} strokeWidth="0.4" opacity="0.35" />
              {/* Nose highlight */}
              <path d={`M${cx - 0.5},${cy - 12} L${cx - 0.5},${cy - 3}`} stroke={skinLight} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
              {/* Nostrils */}
              <ellipse cx={cx - 2.5} cy={cy + 0.5} rx="1.5" ry="1" fill={skinDeep} opacity="0.25" />
              <ellipse cx={cx + 2.5} cy={cy + 0.5} rx="1.5" ry="1" fill={skinDeep} opacity="0.25" />
            </g>

            {/* Lips - realistic with cupid's bow */}
            <g>
              {/* Upper lip */}
              <path d={`M${cx - 7},${cy + 7} Q${cx - 4},${cy + 5.5} ${cx - 1.5},${cy + 5.5} L${cx},${cy + 6.5} L${cx + 1.5},${cy + 5.5} Q${cx + 4},${cy + 5.5} ${cx + 7},${cy + 7}`} fill={lipColor !== 'transparent' ? lipColor : shadeColor(skinTone, -12)} />
              {/* Lower lip */}
              <path d={`M${cx - 7},${cy + 7} Q${cx - 3},${cy + 11} ${cx},${cy + 11.5} Q${cx + 3},${cy + 11} ${cx + 7},${cy + 7}`} fill={lipColor !== 'transparent' ? shadeColor(lipColor, -8) : shadeColor(skinTone, -18)} />
              {/* Lip highlight */}
              <ellipse cx={cx} cy={cy + 9} rx="3" ry="1.2" fill="white" opacity={lipColor !== 'transparent' ? 0.18 : 0.08} />
              {/* Lip line */}
              <path d={`M${cx - 7},${cy + 7} L${cx + 7},${cy + 7}`} stroke={skinDeep} strokeWidth="0.3" opacity="0.3" />
            </g>

            {/* Philtrum (subtle) */}
            <path d={`M${cx - 1},${cy + 2} L${cx - 1.2},${cy + 5.5} M${cx + 1},${cy + 2} L${cx + 1.2},${cy + 5.5}`} stroke={skinDark} strokeWidth="0.3" opacity="0.15" />

            {/* Chin highlight */}
            <ellipse cx={cx} cy={cy + 14} rx="4" ry="2.5" fill={skinLight} opacity="0.12" />
          </g>
        )}

        {/* Hair - front layer (tight to head) */}
        {showHair && (
          <g>
            <path d={hairStyle.path} transform={`translate(${cx}, ${cy - 10})`} fill={hairColor} />
            {/* Hair shine/highlight */}
            <path d={hairStyle.path} transform={`translate(${cx}, ${cy - 10})`} fill={`url(#hd-${uid})`} opacity="0.2" />
          </g>
        )}

        {/* Hair Accessory */}
        {showHair && renderHairAccessory()}

        {/* Accessories */}
        {showClothing && clothing.accessories.map(accId => (
          <g key={accId}>{renderAccessory(accId)}</g>
        ))}
      </g>
    </svg>
  );
}

function shadeColor(color, percent) {
  if (!color || color === 'transparent') return color;
  if (typeof color !== 'string' || !color.startsWith('#') || color.length < 7) return color;
  try {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    if (isNaN(R) || isNaN(G) || isNaN(B)) return color;
    R = Math.min(255, Math.max(0, Math.round(R * (100 + percent) / 100)));
    G = Math.min(255, Math.max(0, Math.round(G * (100 + percent) / 100)));
    B = Math.min(255, Math.max(0, Math.round(B * (100 + percent) / 100)));
    return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
  } catch {
    return color;
  }
}
