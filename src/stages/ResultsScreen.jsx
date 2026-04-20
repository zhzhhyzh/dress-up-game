import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Character from '../components/Character';
import { RANKS } from '../data/themes';
import './ResultsScreen.css';

const ACHIEVEMENTS = [
  { id: 'spa_master', name: 'Spa Master', icon: '🧖', condition: (s) => s.spaCompleted },
  { id: 'makeup_artist', name: 'Makeup Artist', icon: '💄', condition: (s) => Object.values(s.makeup).filter(Boolean).length >= 4 },
  { id: 'hair_stylist', name: 'Hair Stylist', icon: '💇', condition: (s) => s.hair.accessory !== 'none' },
  { id: 'fashionista', name: 'Fashionista', icon: '👗', condition: (s) => { const c = s.clothing; return (c.dress || (c.top && c.bottom)) && c.shoes; } },
  { id: 'accessory_queen', name: 'Accessory Queen', icon: '💍', condition: (s) => s.clothing.accessories.length >= 3 },
  { id: 'theme_master', name: 'Theme Master', icon: '🎯', condition: (s) => s.scores.themeAdherence >= 70 },
  { id: 'perfect_score', name: 'Perfect Score', icon: '💯', condition: (s) => s.scores.total >= 90 },
  { id: 'style_icon', name: 'Style Icon', icon: '👑', condition: (s) => s.scores.total >= 85 },
];

export default function ResultsScreen() {
  const { state, dispatch } = useGame();
  const characterRef = useRef(null);

  const rank = useMemo(() => {
    return [...RANKS].reverse().find(r => state.scores.total >= r.minScore) || RANKS[0];
  }, [state.scores.total]);

  const earnedAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter(a => a.condition(state));
  }, [state]);

  useEffect(() => {
    // Add achievements
    earnedAchievements.forEach(a => {
      dispatch({ type: 'ADD_ACHIEVEMENT', payload: a.id });
    });

    // Save to gallery
    dispatch({
      type: 'ADD_TO_GALLERY',
      payload: {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
        date: new Date().toLocaleDateString(),
        theme: state.theme,
        scores: state.scores,
        rank: rank.title,
        character: state.character,
        skinTone: state.skinTone,
        makeup: { ...state.makeup },
        hair: { ...state.hair },
        clothing: { ...state.clothing },
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePlayAgain = () => {
    dispatch({ type: 'NEW_GAME' });
  };

  return (
    <div className="results-screen">
      <div className="results-confetti">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`confetti-${i}`}
            className="confetti-piece"
            style={{
              left: `${(i * 3.3 + 2) % 100}%`,
              background: ['#ff69b4', '#ffd700', '#87ceeb', '#98fb98', '#ff6347', '#9966cc'][i % 6],
              width: `${6 + (i % 5) * 2}px`,
              height: `${6 + ((i + 2) % 5) * 2}px`,
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: '100vh', opacity: 0, rotate: 360 + i * 30 }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>

      <motion.div className="results-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <h1>Fashion Show Complete!</h1>

        <div className="results-layout">
          <div className="results-character" ref={characterRef}>
            <Character size={280} animate={false} />
          </div>

          <div className="results-info">
            <motion.div className="final-rank" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }}>
              <span className="final-rank-icon">{rank.icon}</span>
              <span className="final-rank-title">{rank.title}</span>
              <span className="final-score">{state.scores.total}/100</span>
            </motion.div>

            <div className="score-breakdown">
              <div className="score-row">
                <span>👗 Style</span>
                <div className="score-bar"><div style={{ width: `${state.scores.style}%` }} /></div>
                <span>{state.scores.style}</span>
              </div>
              <div className="score-row">
                <span>🎯 Theme</span>
                <div className="score-bar"><div style={{ width: `${state.scores.themeAdherence}%` }} /></div>
                <span>{state.scores.themeAdherence}</span>
              </div>
              <div className="score-row">
                <span>🎨 Creativity</span>
                <div className="score-bar"><div style={{ width: `${state.scores.creativity}%` }} /></div>
                <span>{state.scores.creativity}</span>
              </div>
              <div className="score-row">
                <span>💫 Wow</span>
                <div className="score-bar"><div style={{ width: `${state.scores.wowFactor}%` }} /></div>
                <span>{state.scores.wowFactor}</span>
              </div>
            </div>

            <div className="achievements-section">
              <h3>Achievements Earned</h3>
              <div className="achievements-grid">
                {earnedAchievements.length > 0 ? earnedAchievements.map((a, i) => (
                  <motion.div key={a.id} className="achievement-badge" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}>
                    <span className="achievement-icon">{a.icon}</span>
                    <span className="achievement-name">{a.name}</span>
                  </motion.div>
                )) : (
                  <p className="no-achievements">Keep trying to unlock achievements!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="results-actions">
          <motion.button className="btn-primary btn-glow" onClick={handlePlayAgain} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Play Again
          </motion.button>
        </div>

        {state.gallery.length > 1 && (
          <div className="gallery-section">
            <h3>Your Gallery ({state.gallery.length} looks)</h3>
            <div className="gallery-scroll">
              {state.gallery.slice(1).map((look) => (
                <div key={look.id} className="gallery-item">
                  <div className="gallery-theme">{look.theme.emoji}</div>
                  <div className="gallery-score">{look.scores.total}/100</div>
                  <div className="gallery-rank">{look.rank}</div>
                  <div className="gallery-date">{look.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
