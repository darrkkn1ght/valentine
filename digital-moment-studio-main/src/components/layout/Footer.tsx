import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dmsLogo from '@/assets/dms-logo.png';
import dmsLogoDark from '@/assets/dms-logo-dark.png';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is set
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <Link to="/" className="mb-4 hover:opacity-80 transition-opacity">
              <img 
                src={isDark ? dmsLogoDark : dmsLogo} 
                alt="Digital Moment Studio Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-xs text-muted-foreground">
              Create unforgettable moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/valentine-ask" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Valentine Ask
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Custom Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Theme Toggle */}
          <div className="flex flex-col items-start">
            <h4 className="font-medium text-foreground mb-4 text-sm">Theme</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="gap-2"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  Dark
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {currentYear} Digital Moment Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;