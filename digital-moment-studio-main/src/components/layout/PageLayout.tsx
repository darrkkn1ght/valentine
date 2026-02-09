import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const PageLayout = ({ children, showFooter = true }: PageLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main key={location.pathname} className="flex-1 page-enter">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default PageLayout;