import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Character from '../components/Character';
import { CLOTHING } from '../data/clothing';
import './DressUpStage.css';

const CATEGORIES = [
  { id: 'tops', label: 'Tops', icon: '👚', slot: 'top' },
  { id: 'bottoms', label: 'Bottoms', icon: '👖', slot: 'bottom' },
  { id: 'dresses', label: 'Dresses', icon: '👗', slot: 'dress' },
  { id: 'shoes', label: 'Shoes', icon: '👠', slot: 'shoes' },
  { id: 'outerwear', label: 'Outerwear', icon: '🧥', slot: 'outerwear' },
  { id: 'accessories', label: 'Accessories', icon: '💍', slot: 'accessories' },
];

export default function DressUpStage() {
  const { state, dispatch } = useGame();
  const [activeCategory, setActiveCategory] = useState('tops');
  const [colorPickerItem, setColorPickerItem] = useState(null);

  const category = CATEGORIES.find(c => c.id === activeCategory);
  const items = CLOTHING[activeCategory] || [];

  const themeItems = useMemo(() => {
    return items.filter(item => item.themes?.includes(state.theme.id));
  }, [items, state.theme.id]);

  const otherItems = useMemo(() => {
    return items.filter(item => !item.themes?.includes(state.theme.id));
  }, [items, state.theme.id]);

  const handleItemClick = (item) => {
    const slot = category.slot;
    if (slot === 'accessories') {
      dispatch({ type: 'SET_CLOTHING', payload: { type: 'accessories', value: item.id } });
    } else {
      // If selecting a dress, clear top/bottom. If selecting top/bottom, clear dress.
      if (slot === 'dress') {
        dispatch({ type: 'CLEAR_CLOTHING_SLOT', payload: 'top' });
        dispatch({ type: 'CLEAR_CLOTHING_SLOT', payload: 'bottom' });
      } else if (slot === 'top' || slot === 'bottom') {
        dispatch({ type: 'CLEAR_CLOTHING_SLOT', payload: 'dress' });
      }

      const currentValue = state.clothing[slot];
      if (currentValue === item.id) {
        dispatch({ type: 'CLEAR_CLOTHING_SLOT', payload: slot });
      } else {
        dispatch({ type: 'SET_CLOTHING', payload: { type: slot, value: item.id } });
      }
    }
  };

  const isSelected = (item) => {
    const slot = category.slot;
    if (slot === 'accessories') {
      return state.clothing.accessories.includes(item.id);
    }
    return state.clothing[slot] === item.id;
  };

  const randomizeOutfit = () => {
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const useDress = Math.random() > 0.5;
    const outfit = {
      top: useDress ? null : randomItem(CLOTHING.tops)?.id || null,
      bottom: useDress ? null : randomItem(CLOTHING.bottoms)?.id || null,
      dress: useDress ? randomItem(CLOTHING.dresses)?.id || null : null,
      shoes: randomItem(CLOTHING.shoes)?.id || null,
      outerwear: Math.random() > 0.6 ? randomItem(CLOTHING.outerwear)?.id || null : null,
      accessories: CLOTHING.accessories
        .filter(() => Math.random() > 0.7)
        .slice(0, 3)
        .map(a => a.id),
    };
    dispatch({ type: 'RANDOMIZE_OUTFIT', payload: outfit });
  };

  const renderItem = (item) => {
    const selected = isSelected(item);
    const isThemeMatch = item.themes?.includes(state.theme.id);

    return (
      <motion.button
        key={item.id}
        className={`clothing-item ${selected ? 'selected' : ''} ${isThemeMatch ? 'theme-match' : ''}`}
        onClick={() => handleItemClick(item)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        layout
      >
        <div className="item-preview" style={{ background: item.color }}>
          {isThemeMatch && <span className="theme-sparkle">✨</span>}
        </div>
        <span className="item-name">{item.name}</span>
        {selected && <span className="item-check">✓</span>}
      </motion.button>
    );
  };

  const outfitSummary = useMemo(() => {
    const parts = [];
    if (state.clothing.dress) parts.push('Dress');
    else {
      if (state.clothing.top) parts.push('Top');
      if (state.clothing.bottom) parts.push('Bottom');
    }
    if (state.clothing.shoes) parts.push('Shoes');
    if (state.clothing.outerwear) parts.push('Outerwear');
    if (state.clothing.accessories.length) parts.push(`${state.clothing.accessories.length} Acc.`);
    return parts.join(' + ') || 'No items selected';
  }, [state.clothing]);

  return (
    <div className="dressup-stage">
      <div className="dressup-header">
        <h2>Dress Up</h2>
        <p className="theme-badge">{state.theme.emoji} {state.theme.name}</p>
        <p className="outfit-summary">{outfitSummary}</p>
      </div>

      <div className="dressup-layout">
        <div className="dressup-preview">
          <motion.div className="character-display" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Character size={320} />
          </motion.div>
          <motion.button className="randomize-btn" onClick={randomizeOutfit} whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            🎲 Randomize
          </motion.button>
        </div>

        <div className="dressup-controls">
          <div className="category-tabs">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} className="items-container" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {themeItems.length > 0 && (
                <>
                  <p className="items-section-label">✨ Theme Matches</p>
                  <div className="items-grid">
                    {themeItems.map(renderItem)}
                  </div>
                </>
              )}
              {otherItems.length > 0 && (
                <>
                  <p className="items-section-label">All {category.label}</p>
                  <div className="items-grid">
                    {otherItems.map(renderItem)}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <button className="btn-clear" onClick={() => dispatch({ type: 'CLEAR_CLOTHING_SLOT', payload: category.slot })}>
            Clear {category.label}
          </button>
        </div>
      </div>

      <div className="stage-nav">
        <button className="btn-secondary" onClick={() => dispatch({ type: 'PREV_STAGE' })}>
          ← Back to Hair
        </button>
        <button className="btn-primary btn-glow" onClick={() => dispatch({ type: 'NEXT_STAGE' })}>
          Hit the Runway! →
        </button>
      </div>
    </div>
  );
}
