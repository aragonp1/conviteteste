
import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import RSVPScreen from './screens/RSVPScreen';
import LocationScreen from './screens/LocationScreen';
import GiftsScreen from './screens/GiftsScreen';
import DecorativeBackground from './components/DecorativeBackground';

enum Page {
  HOME = 'home',
  RSVP = 'rsvp',
  LOCATION = 'location',
  GIFTS = 'gifts',
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  // Simple Hash Routing Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (Object.values(Page).includes(hash as Page)) {
        setCurrentPage(hash as Page);
      } else {
        setCurrentPage(Page.HOME);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page) => {
    window.location.hash = `#/${page}`;
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <HomeScreen onNavigate={navigateTo} />;
      case Page.RSVP:
        return <RSVPScreen onBack={() => navigateTo(Page.HOME)} />;
      case Page.LOCATION:
        return <LocationScreen onBack={() => navigateTo(Page.HOME)} />;
      case Page.GIFTS:
        return <GiftsScreen onBack={() => navigateTo(Page.HOME)} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center selection:bg-primary/20">
      <DecorativeBackground />
      <div className="w-full max-w-md relative z-10 flex flex-col min-h-screen">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
export { Page };
