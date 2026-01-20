import type { ReactNode } from "react";
import "../App.css";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="lp-root">
      <header className="lp-header bg-emerald-600">
        <div className="lp-container lp-header-inner">
          <div className="lp-logo">
            <img
              src="/logoodc.png"
              alt="Odonto Company - Logo da clínica odontológica"
              className="lp-logo-img"
              loading="eager"
              decoding="async"
            />
          </div>
          <nav
            className="lp-nav"
            role="navigation"
            aria-label="Navegação principal"
          >
            <a
              href="#services"
              className="text-white hover:text-emerald-100 transition-colors"
            >
              Serviços
            </a>
            <a
              href="#flow"
              className="text-white hover:text-emerald-100 transition-colors"
            >
              Como funciona
            </a>
            <a
              href="#contato"
              className="text-white hover:text-emerald-100 transition-colors"
            >
              Contato
            </a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer
        className="lp-footer bg-emerald-700"
        id="contato"
        role="contentinfo"
      >
        <div className="lp-container">
          <p className="text-white">
            © {new Date().getFullYear()} Odonto Company. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
