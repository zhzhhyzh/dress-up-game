import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Character from '../components/Character';
import { MAKEUP_OPTIONS } from '../data/makeupAndHair';
import './MakeupStage.css';

const TABS = [
  { id: 'foundation', label: 'Foundation', icon: '🧴' },
  { id: 'eyeshadow', label: 'Eyes', icon: '👁️' },
  { id: 'eyeliner', label: 'Liner', icon: '✏️' },
  { id: 'lipstick', label: 'Lips', icon: '💄' },
  { id: 'blush', label: 'Blush', icon: '🌸' },
  { id: 'eyebrows', label: 'Brows', icon: '🖌️' },
  { id: 'lashes', label: 'Lashes', icon: '🦋' },
];

export default function MakeupStage() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState('foundation');
  const [showBefore, setShowBefore] = useState(false);

  const options = MAKEUP_OPTIONS[activeTab] || [];

  const handleSelect = (item) => {
    dispatch({ type: 'SET_MAKEUP', payload: { type: activeTab, value: item.id } });
  };

  const isSelected = (item) => state.makeup[activeTab] === item.id;

  return (
    <div className="makeup-stage">
      <div className="makeup-header">
        <h2>Makeup Studio</h2>
        <p className="theme-badge">{state.theme.emoji} {state.theme.name}</p>
      </div>

      <div className="makeup-layout">
        <div className="makeup-preview">
          <motion.div
            className="character-display"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {showBefore ? (
              <Character size={280} showMakeup={false} showClothing={false} />
            ) : (
              <Character size={280} showClothing={false} />
            )}
          </motion.div>
          <button
            className="before-after-btn"
            onMouseDown={() => setShowBefore(true)}
            onMouseUp={() => setShowBefore(false)}
            onMouseLeave={() => setShowBefore(false)}
          >
            {showBefore ? '👀 Before' : '✨ Hold for Before'}
          </button>
        </div>

        <div className="makeup-controls">
          <div className="makeup-tabs">
            {TABS.map(tab => (
              <motion.button
                key={tab.id}
                className={`makeup-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="makeup-options">
            {options.map(item => (
              <motion.button
                key={item.id}
                className={`makeup-option ${isSelected(item) ? 'selected' : ''}`}
                onClick={() => handleSelect(item)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {item.color && item.color !== 'transparent' ? (
                  <div className="option-color-swatch" style={{ background: item.color }} />
                ) : (
                  <div className="option-icon">{item.id === 'none' ? '🚫' : '✨'}</div>
                )}
                <span className="option-name">{item.name}</span>
                {isSelected(item) && <span className="option-check">✓</span>}
              </motion.button>
            ))}
          </div>

          <button className="btn-clear" onClick={() => {
            const clearValue = ['eyebrows', 'lashes'].includes(activeTab) ? 'natural' : 'none';
            dispatch({ type: 'SET_MAKEUP', payload: { type: activeTab, value: clearValue } });
          }}>
            Clear {TABS.find(t => t.id === activeTab)?.label}
          </button>
        </div>
      </div>

      <div className="stage-nav">
        <button className="btn-secondary" onClick={() => dispatch({ type: 'PREV_STAGE' })}>
          ← Back to Spa
        </button>
        <button className="btn-primary" onClick={() => dispatch({ type: 'NEXT_STAGE' })}>
          Hair Salon →
        </button>
      </div>
    </div>
  );
}
