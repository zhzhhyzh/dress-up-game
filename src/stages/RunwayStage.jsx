import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Character from '../components/Character';
import { CLOTHING } from '../data/clothing';
import { RANKS } from '../data/themes';
import './RunwayStage.css';

export default function RunwayStage() {
  const { state, dispatch } = useGame();
  const [phase, setPhase] = useState('walking'); // walking, scoring, done
  const [showFlash, setShowFlash] = useState(false);
  const [scoreRevealed, setScoreRevealed] = useState(0);

  const scores = useMemo(() => {
    const { clothing, theme } = state;

    // Calculate style score (items equipped)
    let itemCount = 0;
    if (clothing.dress) itemCount += 2;
    else {
      if (clothing.top) itemCount++;
      if (clothing.bottom) itemCount++;
    }
    if (clothing.shoes) itemCount++;
    if (clothing.outerwear) itemCount++;
    itemCount += clothing.accessories.length;
    const styleScore = Math.min(100, itemCount * 15);

    // Calculate theme adherence
    let themeMatches = 0;
    let totalItems = 0;
    const checkTheme = (category, id) => {
      if (!id) return;
      totalItems++;
      const item = CLOTHING[category]?.find(i => i.id === id);
      if (item?.themes?.includes(theme.id)) themeMatches++;
    };
    checkTheme('tops', clothing.top);
    checkTheme('bottoms', clothing.bottom);
    checkTheme('dresses', clothing.dress);
    checkTheme('shoes', clothing.shoes);
    checkTheme('outerwear', clothing.outerwear);
    clothing.accessories.forEach(id => checkTheme('accessories', id));
    const themeScore = totalItems > 0 ? Math.round((themeMatches / totalItems) * 100) : 0;

    // Creativity - variety of items
    const creativityScore = Math.min(100, itemCount * 12 + (clothing.accessories.length > 2 ? 20 : 0));

    // Wow factor - combination bonus (use deterministic randomness based on item count)
    const wowBonus = (itemCount * 7 + themeMatches * 13) % 20;
    const wowFactor = Math.round((styleScore * 0.3 + themeScore * 0.3 + creativityScore * 0.2 + wowBonus));

    const total = Math.round((styleScore + themeScore + creativityScore + wowFactor) / 4);

    return { style: styleScore, themeAdherence: themeScore, creativity: creativityScore, wowFactor: Math.min(100, wowFactor), total };
  }, [state.clothing, state.theme]);

  useEffect(() => {
    // Walking phase camera flashes
    if (phase === 'walking') {
      const flashInterval = setInterval(() => {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 100);
      }, 800);

      const timer = setTimeout(() => {
        clearInterval(flashInterval);
        setPhase('scoring');
      }, 4000);

      return () => { clearInterval(flashInterval); clearTimeout(timer); };
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'scoring' && scoreRevealed < 4) {
      const timer = setTimeout(() => setScoreRevealed(prev => prev + 1), 600);
      return () => clearTimeout(timer);
    }
    if (phase === 'scoring' && scoreRevealed >= 4) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_SCORES', payload: scores });
        setPhase('done');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, scoreRevealed, scores, dispatch]);

  const scoreToStars = (score) => {
    if (score >= 90) return 5;
    if (score >= 70) return 4;
    if (score >= 50) return 3;
    if (score >= 30) return 2;
    return 1;
  };

  const renderStars = (score, delay = 0, prefix = 'star') => (
    <div className="stars-row">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={`${prefix}-${i}`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + i * 0.1, type: 'spring', stiffness: 300 }}
          className={i < scoreToStars(score) ? 'star-filled' : 'star-empty'}
        >
          {i < scoreToStars(score) ? '⭐' : '☆'}
        </motion.span>
      ))}
    </div>
  );

  const rank = [...RANKS].reverse().find(r => scores.total >= r.minScore) || RANKS[0];

  const scoreCategories = [
    { label: 'Style', score: scores.style, icon: '👗' },
    { label: 'Theme Match', score: scores.themeAdherence, icon: '🎯' },
    { label: 'Creativity', score: scores.creativity, icon: '🎨' },
    { label: 'Wow Factor', score: scores.wowFactor, icon: '💫' },
  ];

  return (
    <div className="runway-stage">
      {showFlash && <div className="camera-flash" />}

      {phase === 'walking' && (
        <div className="runway-walk">
          <div className="runway-bg">
            <div className="runway-lights">
              {[...Array(10)].map((_, i) => (
                <motion.div key={`spot-${i}`} className="spotlight" style={{ left: `${i * 10 + 5}%` }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
            <div className="runway-carpet" />
          </div>

          <motion.div
            className="runway-character"
            initial={{ y: 300, scale: 0.6 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 3.5, ease: 'easeOut' }}
          >
            <Character size={300} animate={false} />
          </motion.div>

          <div className="crowd-sounds">
            {[...Array(6)].map((_, i) => (
              <motion.span key={`crowd-${i}`} className="crowd-emoji"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 0], y: -40 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                style={{ left: `${10 + i * 15}%` }}
              >
                {['👏', '😍', '🔥', '💕', '✨', '🎉'][i]}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {(phase === 'scoring' || phase === 'done') && (
        <motion.div className="scoring-panel" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <h2>Judges' Scores</h2>
          <p className="theme-badge">{state.theme.emoji} {state.theme.name}</p>

          <div className="scores-grid">
            {scoreCategories.map((cat, i) => (
              i < scoreRevealed && (
                <motion.div key={cat.label} className="score-card" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <span className="score-icon">{cat.icon}</span>
                  <div className="score-info">
                    <span className="score-label">{cat.label}</span>
                    {renderStars(cat.score, 0.2, cat.label)}
                    <span className="score-number">{cat.score}/100</span>
                  </div>
                </motion.div>
              )
            ))}
          </div>

          {phase === 'done' && (
            <motion.div className="total-score" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className="rank-badge">
                <span className="rank-icon">{rank.icon}</span>
                <span className="rank-title">{rank.title}</span>
              </div>
              <div className="total-number">{scores.total}<span>/100</span></div>
              <motion.button className="btn-primary btn-glow" onClick={() => dispatch({ type: 'NEXT_STAGE' })} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                See Results
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
