import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { CHARACTERS, SKIN_TONES, THEMES } from '../data/themes';
import './HomeScreen.css';

export default function HomeScreen() {
  const { state, dispatch } = useGame();
  const [step, setStep] = useState('intro');
  const [selectedChar, setSelectedChar] = useState(null);

  const handleStart = () => {
    if (!selectedChar) return;
    dispatch({ type: 'SELECT_CHARACTER', payload: selectedChar });
    const char = CHARACTERS.find(c => c.id === selectedChar);
    const tone = SKIN_TONES.find(t => t.id === char.defaultSkinTone);
    if (tone) dispatch({ type: 'SET_SKIN_TONE', payload: tone.color });
    dispatch({ type: 'NEXT_STAGE' });
  };

  return (
    <div className="home-screen">
      <div className="home-bg-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="particle"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: [0, 1, 0], y: -100, x: Math.sin(i) * 50 }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
            style={{ left: `${(i * 5 + 3) % 100}%`, top: `${50 + (i * 7) % 40}%` }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div key="intro" className="home-intro" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }}>
            <motion.h1 className="home-title" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              BFF Makeover
            </motion.h1>
            <motion.p className="home-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Spa & Dress Up
            </motion.p>
            <motion.p className="home-story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Help your BFF get ready for the college fashion show and impress everyone with an amazing glow-up!
            </motion.p>
            <motion.button className="btn-primary btn-glow" onClick={() => setStep('theme')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Play Now
            </motion.button>
            {state.gallery.length > 0 && (
              <motion.p className="home-gallery-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                You have {state.gallery.length} outfit(s) in your gallery!
              </motion.p>
            )}
          </motion.div>
        )}

        {step === 'theme' && (
          <motion.div key="theme" className="home-theme" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
            <h2>Today's Challenge</h2>
            <motion.div className="theme-card" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.6 }}>
              <span className="theme-emoji">{state.theme.emoji}</span>
              <h3>{state.theme.name}</h3>
              <p>{state.theme.description}</p>
              <div className="theme-colors">
                {state.theme.colors.map((c, i) => (
                  <div key={i} className="theme-color-dot" style={{ background: c }} />
                ))}
              </div>
            </motion.div>
            <div className="theme-actions">
              <button className="btn-secondary" onClick={() => dispatch({ type: 'SET_THEME', payload: THEMES[Math.floor(Math.random() * THEMES.length)] })}>
                Shuffle Theme
              </button>
              <button className="btn-primary" onClick={() => setStep('character')}>
                Accept Challenge
              </button>
            </div>
            <div className="timer-toggle">
              <label>
                <input type="checkbox" checked={state.useTimer} onChange={(e) => dispatch({ type: 'SET_TIMER', payload: e.target.checked })} />
                Speed Challenge (60s timer)
              </label>
            </div>
          </motion.div>
        )}

        {step === 'character' && (
          <motion.div key="character" className="home-character" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
            <h2>Choose Your BFF</h2>
            <div className="character-grid">
              {CHARACTERS.map(char => (
                <motion.div
                  key={char.id}
                  className={`character-card ${selectedChar === char.id ? 'selected' : ''}`}
                  onClick={() => setSelectedChar(char.id)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="character-avatar" style={{ background: SKIN_TONES.find(t => t.id === char.defaultSkinTone)?.color }}>
                    <div className="character-avatar-face">
                      <div className="avatar-eyes">
                        <span className="avatar-eye" />
                        <span className="avatar-eye" />
                      </div>
                      <span className="avatar-smile" />
                    </div>
                  </div>
                  <h3>{char.name}</h3>
                  <p>{char.story}</p>
                </motion.div>
              ))}
            </div>
            <div className="skin-tone-picker">
              <p>Skin Tone</p>
              <div className="skin-tones">
                {SKIN_TONES.map(tone => (
                  <motion.button
                    key={tone.id}
                    className={`skin-tone-btn ${state.skinTone === tone.color ? 'active' : ''}`}
                    style={{ background: tone.color }}
                    onClick={() => dispatch({ type: 'SET_SKIN_TONE', payload: tone.color })}
                    whileHover={{ scale: 1.2 }}
                    title={tone.name}
                  />
                ))}
              </div>
            </div>
            <motion.button className="btn-primary btn-glow" onClick={handleStart} disabled={!selectedChar} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Start Makeover
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
