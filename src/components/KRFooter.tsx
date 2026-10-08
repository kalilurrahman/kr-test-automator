import { Link } from "react-router-dom";
import { LayoutDashboard, Info, MessageSquare, Linkedin } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/kalilurrahman";

const KRFooter = () => (
  <footer className="border-t border-border bg-card mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src="/brand/validaira-mark.svg" alt="" className="w-9 h-9 rounded-lg" />
            <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Validaira
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI-native quality engineering. Built by Kalilur Rahman — Global IT Director · Kaggle Grandmaster · CIO Next100 2022.
          </p>
        </div>

        {/* Internal navigation */}
        <div>
          <h4
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Explore
          </h4>
          <ul className="space-y-1.5">
            <FooterLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <FooterLink to="/about" icon={Info} label="About" />
            <FooterLink to="/feedback" icon={MessageSquare} label="Feedback" />
          </ul>
        </div>

        {/* External */}
        <div>
          <h4
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Connect
          </h4>
          <ul className="space-y-1.5">
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

const FooterLink = ({ to, icon: Icon, label }: { to: string; icon: typeof LayoutDashboard; label: string }) => (
  <li>
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </Link>
  </li>
);

export default KRFooter;
