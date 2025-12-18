import type { ReactNode } from "react";
import "../App.css";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="lp-root">
      <header className="lp-header">
        <div className="lp-container lp-header-inner">
          <span className="lp-logo">Odonto Sorriso</span>
          <nav className="lp-nav">
            <a href="#services">Serviços</a>
            <a href="#flow">Como funciona</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="lp-footer" id="contato">
        <div className="lp-container">
          <p>
            © {new Date().getFullYear()} Odonto Sorriso. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
