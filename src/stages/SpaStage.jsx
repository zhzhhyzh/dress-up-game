import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import './SpaStage.css';

const SPA_STEPS = [
  { id: 'wash', name: 'Face Wash', icon: '🧽', instruction: 'Click and drag across the face to cleanse!', target: 15 },
  { id: 'mask', name: 'Face Mask', icon: '🧖', instruction: 'Click to apply the mask, then wait for it to dry!', target: 100 },
  { id: 'pimples', name: 'Clear Skin', icon: '✨', instruction: 'Click on the red blemishes to clear them!', target: 5 },
  { id: 'eyepatches', name: 'Eye Patches', icon: '👀', instruction: 'Click on left eye area, then right eye area!', target: 2 },
  { id: 'moisturize', name: 'Moisturize', icon: '💧', instruction: 'Click and drag the cream across the face!', target: 15 },
];

export default function SpaStage() {
  const { dispatch } = useGame();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [pimples, setPimples] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 25 + Math.random() * 50,
      y: 20 + Math.random() * 45,
      active: true,
    }))
  );
  const [maskTimer, setMaskTimer] = useState(0);
  const [maskApplied, setMaskApplied] = useState(false);
  const [eyePatches, setEyePatches] = useState({ left: false, right: false });
  const [trails, setTrails] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const faceRef = useRef(null);
  const isDragging = useRef(false);
  const advancingRef = useRef(false);

  const step = SPA_STEPS[currentStep];

  useEffect(() => {
    if (maskApplied && maskTimer < 100) {
      const interval = setInterval(() => {
        setMaskTimer(prev => {
          const next = Math.min(prev + 3, 100);
          if (next >= 100) {
            setStepProgress(100);
            clearInterval(interval);
          }
          return next;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [maskApplied, maskTimer]);

  const addSparkle = useCallback((x, y) => {
    const id = Date.now() + Math.random();
    setSparkles(prev => [...prev.slice(-8), { id, x, y }]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 600);
  }, []);

  const getRelativePos = useCallback((e) => {
    if (!faceRef.current) return null;
    const rect = faceRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    };
  }, []);

  const handleFaceMove = useCallback((e) => {
    if (!isDragging.current) return;
    const pos = getRelativePos(e);
    if (!pos) return;

    if (step.id === 'wash' || step.id === 'moisturize') {
      setTrails(prev => [...prev.slice(-15), { x: pos.x, y: pos.y, id: Date.now() + Math.random() }]);
      setStepProgress(prev => Math.min(prev + 2.5, step.target));
      if (Math.random() > 0.3) addSparkle(pos.x, pos.y);
    }
  }, [step, addSparkle, getRelativePos]);

  const handleFaceDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    const pos = getRelativePos(e);
    if (!pos) return;

    if (step.id === 'wash' || step.id === 'moisturize') {
      setTrails(prev => [...prev.slice(-15), { x: pos.x, y: pos.y, id: Date.now() + Math.random() }]);
      setStepProgress(prev => Math.min(prev + 2.5, step.target));
      addSparkle(pos.x, pos.y);
    }

    if (step.id === 'mask' && !maskApplied) {
      setMaskApplied(true);
      addSparkle(50, 50);
    }

    if (step.id === 'pimples') {
      setPimples(prev => prev.map(p => {
        const dist = Math.sqrt((p.x - pos.x) ** 2 + (p.y - pos.y) ** 2);
        if (dist < 12 && p.active) {
          addSparkle(p.x, p.y);
          setStepProgress(prev => prev + 1);
          return { ...p, active: false };
        }
        return p;
      }));
    }

    if (step.id === 'eyepatches') {
      if (pos.x < 50 && !eyePatches.left) {
        setEyePatches(prev => ({ ...prev, left: true }));
        setStepProgress(prev => prev + 1);
        addSparkle(35, 35);
      } else if (pos.x >= 50 && !eyePatches.right) {
        setEyePatches(prev => ({ ...prev, right: true }));
        setStepProgress(prev => prev + 1);
        addSparkle(65, 35);
      }
    }
  }, [step, maskApplied, eyePatches, addSparkle, getRelativePos]);

  const handleFaceUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const advanceStep = useCallback(() => {
    if (advancingRef.current) return;
    advancingRef.current = true;

    if (currentStep < SPA_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setStepProgress(0);
      setTrails([]);
      setProgress(((currentStep + 1) / SPA_STEPS.length) * 100);
      setTimeout(() => { advancingRef.current = false; }, 300);
    } else {
      setIsComplete(true);
      setProgress(100);
      dispatch({ type: 'COMPLETE_SPA' });
    }
  }, [currentStep, dispatch]);

  useEffect(() => {
    if (stepProgress >= step.target && !isComplete && !advancingRef.current) {
      const timeout = setTimeout(advanceStep, 600);
      return () => clearTimeout(timeout);
    }
  }, [stepProgress, step.target, advanceStep, isComplete]);

  if (isComplete) {
    return (
      <div className="spa-stage">
        <motion.div className="spa-complete" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <div className="glow-circle" />
          <h2>Glow Up Complete!</h2>
          <p>Your skin is looking radiant and fresh!</p>
          <div className="spa-stars">
            {[...Array(5)].map((_, i) => (
              <motion.span key={`star-${i}`} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}>
                ⭐
              </motion.span>
            ))}
          </div>
          <motion.button className="btn-primary btn-glow" onClick={() => dispatch({ type: 'NEXT_STAGE' })} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ position: 'relative', zIndex: 10 }}>
            Continue to Makeup
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="spa-stage">
      <div className="spa-header">
        <h2>Spa & Skincare</h2>
        <div className="spa-progress-bar">
          <motion.div className="spa-progress-fill" animate={{ width: `${progress}%` }} />
        </div>
        <div className="spa-steps-dots">
          {SPA_STEPS.map((s, i) => (
            <div key={s.id} className={`spa-dot ${i <= currentStep ? 'active' : ''} ${i === currentStep ? 'current' : ''}`}>
              {s.icon}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step.id} className="spa-content" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
          <p className="spa-instruction">{step.instruction}</p>

          <div
            className={`spa-face-area ${step.id === 'wash' || step.id === 'moisturize' ? 'draggable' : 'clickable'}`}
            ref={faceRef}
            onMouseDown={handleFaceDown}
            onMouseUp={handleFaceUp}
            onMouseLeave={handleFaceUp}
            onMouseMove={handleFaceMove}
            onTouchStart={handleFaceDown}
            onTouchEnd={handleFaceUp}
            onTouchMove={handleFaceMove}
          >
            <div className="spa-face">
              <div className="spa-face-inner">
                <div className="spa-eyes">
                  <div className="spa-eye"><div className="spa-pupil" /></div>
                  <div className="spa-eye"><div className="spa-pupil" /></div>
                </div>
                <div className="spa-nose" />
                <div className="spa-mouth" />
              </div>

              {/* Face mask overlay */}
              {(step.id === 'mask' || maskApplied) && maskApplied && (
                <motion.div className="face-mask-overlay" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} style={{ background: `linear-gradient(180deg, #98fb98 ${maskTimer}%, #c8ffc8 100%)` }}>
                  {maskTimer < 100 && <span className="mask-timer">{Math.round(maskTimer)}%</span>}
                </motion.div>
              )}

              {/* Pimples */}
              {step.id === 'pimples' && pimples.map(p => p.active && (
                <motion.div key={`pimple-${p.id}`} className="pimple" style={{ left: `${p.x}%`, top: `${p.y}%` }} whileHover={{ scale: 1.3 }} />
              ))}

              {/* Eye patches */}
              {(eyePatches.left || eyePatches.right) && (
                <>
                  {eyePatches.left && <motion.div className="eye-patch left" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
                  {eyePatches.right && <motion.div className="eye-patch right" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
                </>
              )}

              {/* Wash/Moisturize trails */}
              {trails.map(t => (
                <motion.div key={t.id} className={`trail-dot ${step.id}`} style={{ left: `${t.x}%`, top: `${t.y}%` }} initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: 0, opacity: 0 }} transition={{ duration: 1 }} />
              ))}

              {/* Sparkles */}
              {sparkles.map(s => (
                <motion.div key={s.id} className="sparkle" style={{ left: `${s.x}%`, top: `${s.y}%` }} initial={{ scale: 0, rotate: 0 }} animate={{ scale: [0, 1.5, 0], rotate: 180 }} transition={{ duration: 0.6 }}>
                  ✨
                </motion.div>
              ))}
            </div>
          </div>

          <div className="step-progress">
            <div className="step-progress-bar">
              <motion.div className="step-progress-fill" animate={{ width: `${Math.min((stepProgress / step.target) * 100, 100)}%` }} />
            </div>
            <span>{Math.min(Math.round((stepProgress / step.target) * 100), 100)}%</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <button className="btn-secondary spa-skip" onClick={() => { setIsComplete(true); dispatch({ type: 'COMPLETE_SPA' }); }}>
        Skip Spa
      </button>
    </div>
  );
}
