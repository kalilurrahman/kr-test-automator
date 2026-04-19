const apps = [
  "KR App Launcher",
  "FINPROMPT Terminal",
  "GCC Command Center",
  "QualityOps Navigator",
  "AI Literacy Lab",
];

const LINKEDIN_URL = "https://www.linkedin.com/in/kalilurrahman";

const KRFooter = () => (
  <footer className="border-t border-border bg-card mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-background border border-primary/30 flex items-center justify-center">
              <span className="text-sm font-bold text-primary" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                KR
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Kalilur Rahman
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Global IT Director · Kaggle Grandmaster · CIO Next100 2022 · Building tools that matter.
          </p>
        </div>

        {/* Apps */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Portfolio
          </h4>
          <ul className="space-y-1.5">
            {apps.map((app) => (
              <li key={app}>
                <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {app}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Connect
          </h4>
          <ul className="space-y-1.5">
            {[
              { label: "Portfolio", href: LINKEDIN_URL },
              { label: "LinkedIn", href: LINKEDIN_URL },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default KRFooter;
