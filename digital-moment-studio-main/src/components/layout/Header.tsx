import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import dmsLogo from '@/assets/dms-logo.png';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img 
            src={dmsLogo} 
            alt="Digital Moment Studio Logo" 
            className="h-8 w-auto"
          />
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            to="/valentine-ask" 
            className={cn(
              "text-sm transition-colors",
              location.pathname === '/valentine-ask'
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Product
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm transition-colors",
              location.pathname === '/about'
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            About
          </Link>
          <Link 
            to="/faq" 
            className={cn(
              "text-sm transition-colors",
              location.pathname === '/faq'
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            FAQ
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-sm transition-colors",
              location.pathname === '/contact'
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Contact
          </Link>
          <Link 
            to="/order" 
            className="text-sm px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg"
          >
            Order Now
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;