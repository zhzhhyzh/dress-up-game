import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Character from '../components/Character';
import { HAIR_STYLES, HAIR_COLORS, HAIR_ACCESSORIES } from '../data/makeupAndHair';
import './HairStage.css';

const TABS = [
  { id: 'style', label: 'Style', icon: '💇' },
  { id: 'color', label: 'Color', icon: '🎨' },
  { id: 'accessories', label: 'Accessories', icon: '🎀' },
];

export default function HairStage() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState('style');
  const [dryerActive, setDryerActive] = useState(false);
  const [dryerPos, setDryerPos] = useState({ x: 0, y: 0 });

  // Resolve the actual display color for hair
  const displayHairColor = useMemo(() => {
    const colorObj = HAIR_COLORS.find(c => c.id === state.hair.color) || HAIR_COLORS.find(c => c.color === state.hair.color);
    return colorObj?.color || state.hair.color || '#3b2214';
  }, [state.hair.color]);

  const handleHairChange = (type, value) => {
    dispatch({ type: 'SET_HAIR', payload: { type, value } });
  };

  const handleDryerMove = (e) => {
    if (!dryerActive) return;
    setDryerPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="hair-stage" onMouseMove={handleDryerMove}>
      {dryerActive && (
        <div className="dryer-effect" style={{ left: dryerPos.x - 40, top: dryerPos.y - 40 }}>
          <div className="dryer-particles">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="dryer-particle"
                animate={{
                  x: Math.cos(i * 0.8) * 30 + Math.random() * 20,
                  y: Math.sin(i * 0.8) * 30 + Math.random() * 20,
                  opacity: [1, 0],
                  scale: [0.5, 0],
                }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
          </div>
          <span className="dryer-icon">💨</span>
        </div>
      )}

      <div className="hair-header">
        <h2>Hair Salon</h2>
        <p className="theme-badge">{state.theme.emoji} {state.theme.name}</p>
      </div>

      <div className="hair-layout">
        <div className="hair-preview">
          <motion.div className="character-display" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Character size={280} showClothing={false} />
          </motion.div>
          <motion.button
            className={`dryer-btn ${dryerActive ? 'active' : ''}`}
            onClick={() => setDryerActive(!dryerActive)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {dryerActive ? '💨 Drying...' : '💨 Hair Dryer'}
          </motion.button>
        </div>

        <div className="hair-controls">
          <div className="hair-tabs">
            {TABS.map(tab => (
              <motion.button
                key={tab.id}
                className={`hair-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {activeTab === 'style' && (
            <div className="hair-style-grid">
              {HAIR_STYLES.map(hs => (
                <motion.button
                  key={hs.id}
                  className={`hair-style-btn ${state.hair.style === hs.id ? 'selected' : ''}`}
                  onClick={() => handleHairChange('style', hs.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg viewBox="-30 -45 60 100" width="60" height="80">
                    <ellipse cx="0" cy="-5" rx="14" ry="18" fill="#fdebd0" />
                    <path d={hs.path} transform="translate(0, -5)" fill={displayHairColor} />
                  </svg>
                  <span>{hs.name}</span>
                </motion.button>
              ))}
            </div>
          )}

          {activeTab === 'color' && (
            <div className="hair-color-grid">
              {HAIR_COLORS.map(hc => (
                <motion.button
                  key={hc.id}
                  className={`hair-color-btn ${state.hair.color === (hc.color || hc.id) ? 'selected' : ''}`}
                  onClick={() => handleHairChange('color', hc.color || hc.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div
                    className="color-swatch"
                    style={{
                      background: hc.gradient
                        ? `linear-gradient(180deg, ${hc.gradient[0]}, ${hc.gradient[1]})`
                        : hc.color,
                    }}
                  />
                  <span>{hc.name}</span>
                </motion.button>
              ))}
            </div>
          )}

          {activeTab === 'accessories' && (
            <div className="hair-acc-grid">
              {HAIR_ACCESSORIES.map(acc => (
                <motion.button
                  key={acc.id}
                  className={`hair-acc-btn ${state.hair.accessory === acc.id ? 'selected' : ''}`}
                  onClick={() => handleHairChange('accessory', acc.id)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span className="acc-icon">
                    {acc.id === 'none' ? '🚫' : acc.id === 'bow' ? '🎀' : acc.id === 'headband' ? '👑' : acc.id === 'tiara' ? '👸' : acc.id === 'clips' ? '📎' : acc.id === 'flowers' ? '🌸' : acc.id === 'ribbon' ? '🎗️' : '🟣'}
                  </span>
                  <span>{acc.name}</span>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="stage-nav">
        <button className="btn-secondary" onClick={() => dispatch({ type: 'PREV_STAGE' })}>
          ← Back to Makeup
        </button>
        <button className="btn-primary" onClick={() => dispatch({ type: 'NEXT_STAGE' })}>
          Dress Up →
        </button>
      </div>
    </div>
  );
}
