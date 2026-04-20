import { AnimatePresence, motion } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';
import ProgressBar from './components/ProgressBar';
import HomeScreen from './stages/HomeScreen';
import SpaStage from './stages/SpaStage';
import MakeupStage from './stages/MakeupStage';
import HairStage from './stages/HairStage';
import DressUpStage from './stages/DressUpStage';
import RunwayStage from './stages/RunwayStage';
import ResultsScreen from './stages/ResultsScreen';
import './App.css';

function GameRouter() {
  const { state } = useGame();

  const stageComponents = {
    home: HomeScreen,
    spa: SpaStage,
    makeup: MakeupStage,
    hair: HairStage,
    dressup: DressUpStage,
    runway: RunwayStage,
    results: ResultsScreen,
  };

  const StageComponent = stageComponents[state.currentStage] || HomeScreen;

  return (
    <>
      <ProgressBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentStage}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          style={{ paddingTop: state.currentStage !== 'home' && state.currentStage !== 'runway' && state.currentStage !== 'results' ? '60px' : '0' }}
        >
          <StageComponent />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
