import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Digital Moment Studio
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Crafting digital experiences that turn moments into memories.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Experience
              </h4>
              <Link 
                to="/valentine-ask" 
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                Valentine Ask
              </Link>
            </div>

            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Contact
              </h4>
              <a 
                href="https://wa.me/2348129744447"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Digital Moment Studio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;