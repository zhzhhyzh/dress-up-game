import { motion } from 'framer-motion';
import { useGame, STAGES } from '../context/GameContext';
import './ProgressBar.css';

const STAGE_LABELS = {
  home: { label: 'Start', icon: '🏠' },
  spa: { label: 'Spa', icon: '🧖' },
  makeup: { label: 'Makeup', icon: '💄' },
  hair: { label: 'Hair', icon: '💇' },
  dressup: { label: 'Dress Up', icon: '👗' },
  runway: { label: 'Runway', icon: '🌟' },
  results: { label: 'Results', icon: '🏆' },
};

export default function ProgressBar() {
  const { state, dispatch } = useGame();
  const currentIdx = STAGES.indexOf(state.currentStage);

  if (state.currentStage === 'home' || state.currentStage === 'runway' || state.currentStage === 'results') {
    return null;
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-steps">
        {STAGES.filter(s => s !== 'home' && s !== 'results').map((stage, i) => {
          const stageIdx = STAGES.indexOf(stage);
          const isCurrent = state.currentStage === stage;
          const isPast = currentIdx > stageIdx;
          const info = STAGE_LABELS[stage];

          return (
            <div key={stage} className={`progress-step ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''}`}>
              {i > 0 && <div className={`progress-line ${isPast ? 'filled' : ''}`} />}
              <motion.div
                className="progress-dot"
                animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                onClick={() => isPast && dispatch({ type: 'SET_STAGE', payload: stage })}
                style={{ cursor: isPast ? 'pointer' : 'default' }}
              >
                <span>{info.icon}</span>
              </motion.div>
              <span className="progress-label">{info.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
