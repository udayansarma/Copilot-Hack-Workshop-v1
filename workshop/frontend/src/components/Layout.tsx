import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { Menu, X, Github, BookOpen, Trophy, Home, ChevronRight, Sparkles } from 'lucide-react';
import { modules } from '../data/modules';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-github-surface border-r border-github-border
          flex flex-col transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-github-border">
          <Link to="/" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <div className="w-9 h-9 rounded-lg bg-github-accent flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-github-text leading-tight">Copilot Hackathon</h1>
              <p className="text-xs text-github-muted">Workshop Portal</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-github-accent/15 text-github-accent font-medium'
                  : 'text-github-muted hover:text-github-text hover:bg-github-bg'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            <span>Home</span>
          </NavLink>

          <div className="pt-3 pb-1 px-3">
            <p className="text-xs font-semibold text-github-muted uppercase tracking-wider">Modules</p>
          </div>

          {modules.map((mod) => (
            <NavLink
              key={mod.id}
              to={`/module/${mod.id}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group ${
                  isActive
                    ? 'bg-github-accent/15 text-github-accent font-medium'
                    : 'text-github-muted hover:text-github-text hover:bg-github-bg'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-base flex-shrink-0">{mod.icon}</span>
              <span className="flex-1 truncate">{mod.title}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}

          <div className="pt-3 pb-1 px-3">
            <p className="text-xs font-semibold text-github-muted uppercase tracking-wider">Challenge</p>
          </div>

          <NavLink
            to="/hackathon"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-github-accent/15 text-github-accent font-medium'
                  : 'text-github-muted hover:text-github-text hover:bg-github-bg'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <Trophy className="w-4 h-4 flex-shrink-0" />
            <span>Hackathon</span>
          </NavLink>

          <div className="pt-3 pb-1 px-3">
            <p className="text-xs font-semibold text-github-muted uppercase tracking-wider">Reference</p>
          </div>

          <NavLink
            to="/guide"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-github-accent/15 text-github-accent font-medium'
                  : 'text-github-muted hover:text-github-text hover:bg-github-bg'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>Awesome Copilot Guide</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-github-border">
          <a
            href="https://github.com/github/awesome-copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-github-muted hover:text-github-accent transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>awesome-copilot resources</span>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-github-surface/95 backdrop-blur border-b border-github-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-github-bg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-github-accent" />
            <span className="font-semibold text-sm">Copilot Hackathon</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
