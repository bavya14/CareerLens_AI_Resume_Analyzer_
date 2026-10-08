import { useCallback, useMemo, useState } from 'react';
import type { Page, ResumeAnalysis, ToastType } from '@/types';
import { AppContext } from '@/hooks/useApp';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { ToastContainer } from '@/components/Toast';
import { PageTransition } from '@/components/PageTransition';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AnalyzerPage } from '@/pages/AnalyzerPage';
import { SkillsPage } from '@/pages/SkillsPage';
import { CareersPage } from '@/pages/CareersPage';
import { ImprovementPage } from '@/pages/ImprovementPage';
import { ExplorerPage } from '@/pages/ExplorerPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { toasts, showToast, dismissToast } = useToast();

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const contextValue = useMemo(
    () => ({
      analysis,
      setAnalysis,
      isAnalyzing,
      setIsAnalyzing,
      showToast,
      navigate,
      currentPage,
      theme,
      toggleTheme,
    }),
    [analysis, isAnalyzing, showToast, navigate, currentPage, theme, toggleTheme],
  );

  const isLanding = currentPage === 'landing';

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage />;
      case 'dashboard': return <DashboardPage />;
      case 'analyzer': return <AnalyzerPage />;
      case 'skills': return <SkillsPage />;
      case 'careers': return <CareersPage />;
      case 'improvement': return <ImprovementPage />;
      case 'explorer': return <ExplorerPage />;
      case 'history': return <HistoryPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  if (isLanding) {
    return (
      <AppContext.Provider value={contextValue}>
        <LandingPage />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1">
            <PageTransition key={currentPage}>
              {renderPage()}
            </PageTransition>
          </main>
        </div>
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </AppContext.Provider>
  );
}

export default App;
