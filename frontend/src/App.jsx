import { useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import { useAchievements } from './hooks/useAchievements';
import { useUserMemory } from './hooks/useUserMemory';
import { useDailyChallenges } from './hooks/useDailyChallenges';
import { useHiddenSecrets } from './hooks/useHiddenSecrets';
import { usePersonality } from './hooks/usePersonality';
import { useSystemPersonality } from './hooks/useSystemPersonality';
import { useDailyResetSystem } from './hooks/useDailyResetSystem';
import { useRandomRewards } from './hooks/useRandomRewards';
import { useLiveFeed } from './hooks/useLiveFeed';
import { useInteractiveChoice } from './hooks/useInteractiveChoice';
import { useChaosEngine } from './hooks/useChaosEngine';
import { useCatastrophicGlitch } from './hooks/useCatastrophicGlitch';
import { useAdminTrigger } from './hooks/useAdminTrigger';
import { useDailyBonusSystem } from './hooks/useDailyBonusSystem';
import { useMemeStorm } from './hooks/useMemeStorm';
import { useRoaster } from './hooks/useRoaster';
import { useSuperRareEvents } from './hooks/useSuperRareEvents';
import Hero from './components/Hero';
import InvisibleArea from './components/InvisibleArea';
import ConsoleLogs from './components/ConsoleLogs';
import ChaosProgressBar from './components/ChaosProgressBar';
import RewardPopup from './components/RewardPopup';
import LiveFeed from './components/LiveFeed';
import DecisionModal from './components/DecisionModal';
import GlitchOverlay from './components/GlitchOverlay';
import AdminHiddenNodes from './components/AdminHiddenNodes';
import AdminPanel from './components/AdminPanel';
import DailyBonusModal from './components/DailyBonusModal';
import RoastOverlay from './components/RoastOverlay';
import MemeStormLayer from './components/MemeStormLayer';
import SuperRareEventsLayer from './components/SuperRareEventsLayer';
import InteractionButton from './components/InteractionButton';
import StatsPanel from './components/StatsPanel';
import EffectsLayer from './components/EffectsLayer';
import HiddenSection from './components/HiddenSection';
import AchievementToast from './components/AchievementToast';
import AchievementsPanel from './components/AchievementsPanel';
import DailyChallengesPanel from './components/DailyChallengesPanel';

function App() {
  const { globalState, userState, eventMessage, handleClick, setEventMessage } = useAppState();
  
  // Custom hook exclusively for logic and metrics handling around achievements
  const { unlocked, newUnlocks, clearNewUnlock, timeSpent } = useAchievements(globalState, userState);
  
  // Custom tracking for historical patterns and generating contextual awareness messaging
  const { awarenessMessage, memoryOverrides } = useUserMemory(userState, globalState);
  
  // Daily tracking logic
  const { challenges, dailyTracking, incrementDailyClicks, isCompleted } = useDailyChallenges(globalState);
  const { timeUntilReset, showMidnightEvent } = useDailyResetSystem();

  // Hidden secrets tracking logic for secret combinations
  const { secretMessage, hasSecretTheme, handleInteractionClick, handleInvisibleAreaClick } = useHiddenSecrets();

  // Personality tracking logic
  const { personality, handlePersonalityClick } = usePersonality();

  // Creepy self-aware text logger
  const { logs } = useSystemPersonality(userState, globalState, timeSpent, personality);

  // Random gamified chance system
  const { unlockedRewards, recentReward, handleRewardRoll, clearReward } = useRandomRewards();

  // Fake multi-client network feed mapping logic parsing real server bounds
  const { feed } = useLiveFeed(globalState);

  // Random interactive choice prompts bridging UX
  const { activeChoice, choiceOverride, handleSelect } = useInteractiveChoice();

  // Procedural Chaos Engine generating infinite loop modifiers natively
  const chaosEngineState = useChaosEngine(globalState, userState, timeSpent);

  // Catastrophic glitch ambush trap locking logic sequences
  const { isGlitching, hasAfterEffect, triggerGlitchProbability } = useCatastrophicGlitch();

  // Hidden Secure Admin Layer constraints tracking execution counts
  const { showAdminPanel, hitLeft, hitRight, closeAdmin } = useAdminTrigger();

  // Daily Bonus and Streak tracking returning modal states actively
  const { showBonusModal, streakCount, rewardPayload, claimBonus } = useDailyBonusSystem();

  // Chaotic Meme Injection tracking array milestones scaling dynamically natively
  const { activeMemes } = useMemeStorm(globalState.totalClicks);

  // Dynamic Roaster injecting aggressive feedback physics natively scaling random meme events bounds
  const { activeRoasts, evaluateAction, dismissRoast } = useRoaster(globalState, timeSpent);

  // Super Rare Events monitoring mapping anomalies
  const { activeRareEvent, clearRareEvent, rollForRareEvent } = useSuperRareEvents(globalState.activeEvent);

  const handleAppClick = async () => {
    // Absolute ambush block terminating subsequent state dispatches physically
    if (triggerGlitchProbability()) return;
    if (rollForRareEvent()) return; // Resolves physical blocking dropping local physics instantly if rare occurs!

    evaluateAction(); // Track timestamp loops parsing exact algorithms evaluating user speed behaviors structurally!

    handleInteractionClick();
    handlePersonalityClick();
    incrementDailyClicks();
    handleRewardRoll();
    await handleClick();
  };
  
  const activeRewardThemes = unlockedRewards.filter(r => r.startsWith('theme_')).join(' ');

  useEffect(() => {
    document.body.className = `mood-${globalState.mood || 'calm'} ${memoryOverrides} ${isCompleted ? 'daily-champion' : ''} ${hasSecretTheme ? 'secret-theme' : ''} personality-${personality} ${globalState.activeEvent ? 'global-event-' + globalState.activeEvent : ''} ${activeRewardThemes} ${choiceOverride} ${chaosEngineState.effects} ${hasAfterEffect ? 'after-effect-glitch' : ''}`;
    
    // Inject procedural dynamic CSS properties recursively
    document.body.style.setProperty('--engine-bg', chaosEngineState.bgColor);
    document.body.style.setProperty('--engine-fg', chaosEngineState.fgColor);
  }, [globalState.mood, memoryOverrides, isCompleted, hasSecretTheme, personality, globalState.activeEvent, activeRewardThemes, choiceOverride, chaosEngineState.effects, chaosEngineState.bgColor, chaosEngineState.fgColor, hasAfterEffect]);

  const clearEvent = () => setEventMessage('');

  return (
    <div className={`h-screen w-screen relative overflow-hidden transition-all duration-1000 flex flex-col font-sans ${memoryOverrides ? 'loyalty-filter' : ''}`}>
      
      {/* Invisible Secure Auth Corner Nodes */}
      <AdminHiddenNodes onLeft={hitLeft} onRight={hitRight} />

      {/* Admin Interface Modal Overlay */}
      {showAdminPanel && <AdminPanel onClose={closeAdmin} />}

      {/* Daily Bonus Sequence Lock */}
      {showBonusModal && <DailyBonusModal streak={streakCount} reward={rewardPayload} onClaim={claimBonus} />}

      {/* Dynamic Roaster Logic */}
      <RoastOverlay roasts={activeRoasts} onDismiss={dismissRoast} />

      <MemeStormLayer memes={activeMemes} />

      <SuperRareEventsLayer event={activeRareEvent} onClear={clearRareEvent} />

      <GlitchOverlay active={isGlitching} />
      
      {globalState.activeEvent && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-black font-black text-center py-2 z-[9999] uppercase tracking-[0.3em] animate-pulse">
          ⚠ SYSTEM EVENT TRIGGERED
        </div>
      )}

      {showMidnightEvent && (
        <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center pointer-events-none mix-blend-difference animate-pulse">
            <h1 className="text-4xl md:text-6xl font-mono tracking-widest text-red-500 mb-4 animate-[shake_0.5s_infinite]">A NEW DAY BEGINS...</h1>
            <p className="text-xl font-mono opacity-80 uppercase tracking-widest">Daily Progress Reset</p>
        </div>
      )}
      
      <InvisibleArea onDiscover={handleInvisibleAreaClick} />
      
      {/* Retain isolated Absolute hooks rendering modals natively blocking screen */}
      <RewardPopup reward={recentReward} onClose={clearReward} />
      <DecisionModal choice={activeChoice} onSelect={handleSelect} />
      
      {secretMessage && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[500] text-red-500 font-mono text-2xl animate-bounce pointer-events-none shadow-[0_0_50px_rgba(255,0,0,0.8)] font-black bg-black/90 border-2 border-red-600 px-10 py-6 rounded-lg whitespace-nowrap tracking-widest">
          {secretMessage}
        </div>
      )}

      <EffectsLayer eventMessage={eventMessage} mood={globalState.mood} clearEvent={clearEvent} />
      <AchievementToast achievements={newUnlocks} onDismiss={clearNewUnlock} />
      
      <main className="relative z-10 w-full h-full flex flex-row justify-between items-center text-center px-4 py-8 md:px-8 pointer-events-none max-w-[1800px] mx-auto gap-4">
        
        {/* LEFT COLUMN: Challenges & Achievements */}
        <div className="hidden lg:flex w-[320px] h-full flex-col justify-between items-start pointer-events-auto z-50 shrink-0 mt-8 mb-4">
           {/* Top-Left: Bounties */}
           <div className="w-full origin-top-left scale-90 mb-4">
             <DailyChallengesPanel challenges={challenges} tracking={dailyTracking} isCompleted={isCompleted} timeUntilReset={timeUntilReset} />
           </div>
           
           {/* Middle-Left: Embed terminal logs natively avoiding absolute blocking overlaps */}
           <div className="flex-1 w-full flex items-center justify-start overflow-hidden">
               <ConsoleLogs logs={logs} className="w-full relative px-2" />
           </div>
           
           {/* Bottom-Left: Achievements */}
           <div className="w-full origin-bottom-left scale-90 mt-4">
             <AchievementsPanel unlocked={unlocked} />
           </div>
        </div>
        
        {/* CENTER COLUMN: Core Engine (Hero, Button, Progress, Stats) */}
        <div className="flex-1 w-full h-full flex flex-col justify-between items-center pointer-events-none z-20 mx-auto max-w-3xl pt-10">
           
           {/* Top Boundary: Status & Title Node */}
           <div className="flex-none w-full flex flex-col items-center pointer-events-auto">
              <Hero mood={globalState.mood || 'calm'} awarenessMessage={awarenessMessage} personality={personality} proceduralMessage={chaosEngineState.message} />
           </div>
           
           {/* Center Boundary: Interaction & Chaos Rendering */}
           <div className="flex-1 w-full flex flex-col justify-center items-center pointer-events-auto scale-110 md:scale-125 mb-4 my-8 relative z-20">
              <InteractionButton onClick={handleAppClick} mood={globalState.mood || 'calm'} isHeliEvac={activeRareEvent === 'rare_heli'} />
           </div>
           
           {/* Bottom Boundary: Tracking Logic & Scaling Arrays */}
           <div className="flex-none w-full flex flex-col items-center justify-end pointer-events-auto pb-4 gap-2">
              <div className="w-full max-w-lg mx-auto mb-2 relative z-20">
                 <ChaosProgressBar globalClicks={globalState.totalClicks} />
              </div>
              <div className="scale-90">
                 <StatsPanel global={globalState} user={userState} timeSpent={timeSpent} />
              </div>
           </div>
           
        </div>
        
        {/* RIGHT COLUMN: Hidden Lore & Extra Space */}
        <div className="hidden lg:flex w-[320px] h-full flex-col justify-between items-end pointer-events-auto z-50 shrink-0 mt-16 mb-4">
           {/* Top-Right: Feed securely embedded tracking globally natively scaled precisely */}
           <div className="w-full origin-top-right scale-[0.8] flex justify-end">
             <LiveFeed feed={feed} isEmbedded={true} />
           </div>

           {/* Bottom-Right: Lore Block */}
           {userState.clicks > 15 && (
             <div className="w-full origin-bottom-right scale-90 flex justify-end">
                <HiddenSection mood={globalState.mood || 'calm'} />
             </div>
           )}
        </div>

        {/* MOBILE OVERLAYS: Avoid screen bleeding enforcing specific anchors structurally overlapping tightly natively */}
        <div className="lg:hidden pointer-events-none absolute inset-0 w-full h-full">
           <div className="fixed bottom-2 left-2 scale-[0.6] origin-bottom-left z-50 pointer-events-auto">
              <AchievementsPanel unlocked={unlocked} />
           </div>
           
           <div className="fixed top-28 left-2 scale-[0.5] origin-top-left z-50 pointer-events-auto">
              <DailyChallengesPanel challenges={challenges} tracking={dailyTracking} isCompleted={isCompleted} timeUntilReset={timeUntilReset} />
           </div>
           
           <div className="fixed top-2 right-2 scale-[0.5] origin-top-right z-50 pointer-events-auto">
              <LiveFeed feed={feed} />
           </div>
           
           <ConsoleLogs logs={logs} className="fixed bottom-28 left-2 w-[250px] pointer-events-none z-50" />
           
           {userState.clicks > 15 && (
             <div className="fixed bottom-28 right-2 scale-[0.6] origin-bottom-right z-50 pointer-events-auto">
                <HiddenSection mood={globalState.mood || 'calm'} />
             </div>
           )}
        </div>

      </main>
    </div>
  );
}

export default App;
