import { createContext, useContext, useReducer, useEffect } from 'react';
import { THEMES } from '../data/themes';

const STAGES = ['home', 'spa', 'makeup', 'hair', 'dressup', 'runway', 'results'];

const getRandomTheme = () => THEMES[Math.floor(Math.random() * THEMES.length)];

const getDailyTheme = () => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return THEMES[seed % THEMES.length];
};

const initialState = {
  currentStage: 'home',
  character: null,
  skinTone: '#E8B98D',
  theme: getRandomTheme(),
  dailyTheme: getDailyTheme(),
  useTimer: false,
  timerSeconds: 60,
  spaCompleted: false,
  spaProgress: 0,
  makeup: {
    foundation: null,
    eyeshadow: null,
    eyeliner: null,
    lipstick: null,
    blush: null,
    eyebrows: 'natural',
    lashes: 'natural',
  },
  hair: {
    style: 'long-straight',
    color: '#3b2214',
    accessory: 'none',
  },
  clothing: {
    top: null,
    bottom: null,
    dress: null,
    shoes: null,
    outerwear: null,
    accessories: [],
  },
  scores: {
    style: 0,
    themeAdherence: 0,
    creativity: 0,
    wowFactor: 0,
    total: 0,
  },
  gallery: [],
  achievements: [],
};

function loadState() {
  try {
    const saved = localStorage.getItem('dressup-game-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialState, gallery: parsed.gallery || [], achievements: parsed.achievements || [] };
    }
  } catch (e) { /* ignore */ }
  return initialState;
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_STAGE':
      return { ...state, currentStage: action.payload };
    case 'NEXT_STAGE': {
      const idx = STAGES.indexOf(state.currentStage);
      if (idx < STAGES.length - 1) return { ...state, currentStage: STAGES[idx + 1] };
      return state;
    }
    case 'PREV_STAGE': {
      const idx = STAGES.indexOf(state.currentStage);
      if (idx > 0) return { ...state, currentStage: STAGES[idx - 1] };
      return state;
    }
    case 'SELECT_CHARACTER':
      return { ...state, character: action.payload };
    case 'SET_SKIN_TONE':
      return { ...state, skinTone: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_TIMER':
      return { ...state, useTimer: action.payload };
    case 'SET_SPA_PROGRESS':
      return { ...state, spaProgress: action.payload, spaCompleted: action.payload >= 100 };
    case 'COMPLETE_SPA':
      return { ...state, spaCompleted: true, spaProgress: 100 };
    case 'SET_MAKEUP':
      return { ...state, makeup: { ...state.makeup, [action.payload.type]: action.payload.value } };
    case 'SET_HAIR':
      return { ...state, hair: { ...state.hair, [action.payload.type]: action.payload.value } };
    case 'SET_CLOTHING':
      if (action.payload.type === 'accessories') {
        const accs = [...state.clothing.accessories];
        const idx = accs.indexOf(action.payload.value);
        if (idx >= 0) accs.splice(idx, 1);
        else accs.push(action.payload.value);
        return { ...state, clothing: { ...state.clothing, accessories: accs } };
      }
      return { ...state, clothing: { ...state.clothing, [action.payload.type]: action.payload.value } };
    case 'CLEAR_CLOTHING_SLOT':
      if (action.payload === 'accessories') {
        return { ...state, clothing: { ...state.clothing, accessories: [] } };
      }
      return { ...state, clothing: { ...state.clothing, [action.payload]: null } };
    case 'SET_CLOTHING_COLOR':
      return { ...state, clothingColors: { ...state.clothingColors, [action.payload.id]: action.payload.color } };
    case 'RANDOMIZE_OUTFIT':
      return { ...state, clothing: action.payload };
    case 'SET_SCORES':
      return { ...state, scores: action.payload };
    case 'ADD_TO_GALLERY':
      return { ...state, gallery: [action.payload, ...state.gallery].slice(0, 20) };
    case 'ADD_ACHIEVEMENT':
      if (state.achievements.includes(action.payload)) return state;
      return { ...state, achievements: [...state.achievements, action.payload] };
    case 'NEW_GAME':
      return {
        ...initialState,
        theme: getRandomTheme(),
        dailyTheme: getDailyTheme(),
        gallery: state.gallery,
        achievements: state.achievements,
      };
    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, loadState);

  useEffect(() => {
    const toSave = { gallery: state.gallery, achievements: state.achievements };
    localStorage.setItem('dressup-game-state', JSON.stringify(toSave));
  }, [state.gallery, state.achievements]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export { STAGES };
