import { useState, useCallback, useRef } from 'react';
import AppShell from './components/AppShell';
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import ProductResultScreen from './screens/ProductResultScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import ContributionScreen from './screens/ContributionScreen';
import UnlockScreen from './screens/UnlockScreen';
import ComparisonScreen from './screens/ComparisonScreen';
import RoutineScreen from './screens/RoutineScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import TransparencyScreen from './screens/TransparencyScreen';
import ProfileScreen from './screens/ProfileScreen';
import SkinGoalsScreen from './screens/SkinGoalsScreen';
import ScanConfirmScreen from './screens/ScanConfirmScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import IngredientDetailScreen from './screens/IngredientDetailScreen';
import ScoreDetailScreen from './screens/ScoreDetailScreen';
import ScanHistoryScreen from './screens/ScanHistoryScreen';
import BuyScreen from './screens/BuyScreen';
import GoalsScreen from './screens/GoalsScreen';
import ReviewScreen from './screens/ReviewScreen';
import FeedbackButton from './components/FeedbackButton';
import type { AltContext } from './screens/ProductResultScreen';
import type { Screen } from './types';

interface Meta { title?: string; showBack?: boolean; }

const meta: Record<Screen, Meta> = {
  home:             {},
  scan:             {},
  'scan-confirm':   { title: 'Confirm product', showBack: true },
  'product-result': { title: 'Product analysis', showBack: true },
  ingredients:      { title: 'Ingredients',       showBack: true },
  contribution:     { title: 'Contribute',         showBack: true },
  unlock:           { title: 'Smarter Options',    showBack: true },
  comparison:       { title: 'Compare products',   showBack: true },
  routine:          {},
  discover:         {},
  transparency:     { title: 'How It Works',       showBack: true },
  profile:          {},
  'skin-goals':     { title: 'Skin Goals',          showBack: true },
  notifications:    { title: 'Notifications',        showBack: true },
  favourites:       { title: 'Favourites',            showBack: true },
  'ingredient-detail': { title: 'Ingredient',          showBack: true },
  'score-detail':      { title: 'Score breakdown',     showBack: true },
  'scan-history':      { title: 'Scan history',          showBack: true },
  'buy':               { title: 'Checkout',              showBack: true },
  'goals':             { title: 'My goals',              showBack: true },
  'review':            { title: 'Write a review',        showBack: true },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [history, setHistory] = useState<Screen[]>([]);
  const [animKey, setAnimKey] = useState(0);

  const fromAlt = useRef(false);

  const navigate = useCallback((next: Screen) => {
    if (next === 'product-result' && !fromAlt.current) setBetterReason(null);
    setFromScan(next === 'product-result' && screen === 'scan');
    fromAlt.current = false;
    setHistory((h) => [...h, screen]);
    setScreen(next);
    setAnimKey((k) => k + 1);
  }, [screen]);

  const goBack = useCallback(() => {
    const prev = history[history.length - 1];
    if (prev !== 'product-result') setBetterReason(null);
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setScreen(prev);
      setAnimKey((k) => k + 1);
    }
  }, [history]);

  const [productFav, setProductFav] = useState(false);
  const [scoreId, setScoreId] = useState('foryou');
  const [betterReason, setBetterReason] = useState<AltContext | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [fromScan, setFromScan] = useState(false);
  const handleAlt = useCallback((ctx: AltContext) => {
    setBetterReason(ctx);
    fromAlt.current = true;
    navigate('product-result');
  }, [navigate]);

  const scoreLabels: Record<string, string> = { foryou: 'Your goals', planet: 'Planet', price: 'Price', routine: 'Routine fit' };
  const m = screen === 'score-detail'
    ? { title: scoreLabels[scoreId] ?? 'Score breakdown', showBack: true }
    : meta[screen];

  const navigateScore = (id: string) => { setScoreId(id); navigate('score-detail'); };

  const feedbackScreens: Screen[] = ['product-result', 'score-detail', 'comparison'];

  const skipBtn = screen === 'scan-confirm' ? (
    <button
      onClick={() => navigate('product-result')}
      className="tap-scale flex items-center gap-1 text-[12px] font-medium text-[#9ca3af]"
    >
      Skip
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  ) : feedbackScreens.includes(screen) ? <FeedbackButton onOpen={() => setShowReview(true)} hasReviewed={hasReviewed} /> : undefined;

  const renderScreen = () => {
    switch (screen) {
      case 'home':             return <HomeScreen        onNavigate={navigate} />;
      case 'scan':             return <ScanScreen        onNavigate={navigate} />;
      case 'scan-confirm':     return <ScanConfirmScreen onNavigate={navigate} onReviewed={() => setHasReviewed(true)} />;
      case 'product-result':   return <ProductResultScreen onNavigate={navigate} fav={productFav} onFav={() => setProductFav(f => !f)} onScoreDetail={navigateScore} betterCtx={betterReason ?? undefined} onAlt={handleAlt} fromScan={fromScan} />;
      case 'ingredients':      return <IngredientsScreen />;
      case 'contribution':     return <ContributionScreen onNavigate={navigate} />;
      case 'unlock':           return <UnlockScreen      onNavigate={navigate} />;
      case 'comparison':       return <ComparisonScreen  onNavigate={navigate} />;
      case 'routine':          return <RoutineScreen     onNavigate={navigate} />;
      case 'discover':         return <DiscoverScreen    onNavigate={navigate} />;
      case 'transparency':     return <TransparencyScreen onNavigate={navigate} />;
      case 'profile':          return <ProfileScreen     onNavigate={navigate} />;
      case 'skin-goals':       return <SkinGoalsScreen       onNavigate={navigate} />;
      case 'notifications':    return <NotificationsScreen   onNavigate={navigate} />;
      case 'favourites':           return <FavouritesScreen         onNavigate={navigate} />;
      case 'ingredient-detail':    return <IngredientDetailScreen   onNavigate={navigate} />;
      case 'score-detail':         return <ScoreDetailScreen        onNavigate={navigate} scoreId={scoreId} />;
      case 'scan-history':         return <ScanHistoryScreen        onNavigate={navigate} />;
      case 'buy':                  return <BuyScreen                onNavigate={navigate} />;
      case 'goals':                return <GoalsScreen              onNavigate={navigate} />;
      case 'review':               return null;
    }
  };

  return (
    <>
      <AppShell screen={screen} onNavigate={navigate} onBack={goBack}
        showBack={m.showBack} title={m.title} animKey={animKey} headerRight={skipBtn}>
        {renderScreen()}
      </AppShell>

      {/* ── Review overlay — covers AppShell entirely ── */}
      {showReview && (
        <ReviewScreen
          onClose={() => setShowReview(false)}
          hasReviewed={hasReviewed}
          onReviewed={() => setHasReviewed(true)}
        />
      )}
    </>
  );
}
