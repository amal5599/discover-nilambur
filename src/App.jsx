import { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import CategoryPage from './pages/CategoryPage';
import PlaceDetail from './pages/PlaceDetail';
import EventsPage from './pages/EventsPage';
import Guides from './pages/Guides';
import PlanVisit from './pages/PlanVisit';
import About from './pages/About';
import Saved from './pages/Saved';
import NotFound from './pages/NotFound';
import ScrollProgress from './components/common/ScrollProgress';

// Scroll to top utility
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.995, filter: 'blur(15px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, scale: 1.005, filter: 'blur(15px)' }}
    transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1] }} // Elite Inertia Curve
    className="animate-archival-flicker"
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/explore" element={<PageWrapper><Explore /></PageWrapper>} />
              <Route path="/guides" element={<PageWrapper><Guides /></PageWrapper>} />
              <Route path="/plan-your-visit" element={<PageWrapper><PlanVisit /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/saved" element={<PageWrapper><Saved /></PageWrapper>} />
              <Route path="/events" element={<PageWrapper><EventsPage /></PageWrapper>} />
              <Route path="/archive" element={<PageWrapper><EventsPage /></PageWrapper>} />
              <Route path="/:category" element={<PageWrapper><CategoryPage /></PageWrapper>} />
              <Route path="/place/:slug/*" element={<PageWrapper><PlaceDetail /></PageWrapper>} />
              <Route path="/search" element={<PageWrapper><Explore /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
