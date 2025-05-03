
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 px-4 md:px-8 mt-auto border-t border-border">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground mb-4 md:mb-0">
          © {new Date().getFullYear()} Spotify for Learning
        </div>
        
        <div className="flex items-center space-x-6">
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
          >
            <Github className="h-4 w-4 mr-1" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
