import { NavLink } from 'react-router-dom'
import {
  Building2,
  CheckSquare,
  ChevronLeft,
  ClipboardList,
  LogOut,
  Menu,
  Settings,
  X,
} from 'lucide-react'
import { useAuth } from '@/contexts/authContext'

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapse: () => void
  onCloseMobile: () => void
}

const navItems = [
  { to: '/', label: 'İş Takip Listesi', icon: ClipboardList, end: true },
  { to: '/firmalar', label: 'Firmalar', icon: Building2, end: false },
  { to: '/ayarlar', label: 'Ayarlar', icon: Settings, end: false },
]

export function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  const { signOut, user, isMockAuth } = useAuth()

  const content = (
    <div className="flex h-full flex-col">
      <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
          <CheckSquare className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-wide text-white">İŞ TAKİP</div>
            <div className="text-[11px] font-medium tracking-wider text-sidebar-muted">
              YÖNETİM PANELİ
            </div>
          </div>
        )}
        <button
          type="button"
          className="ml-auto rounded-md p-1 text-sidebar-muted hover:bg-sidebar-hover hover:text-white lg:hidden"
          onClick={onCloseMobile}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-sidebar-muted hover:bg-sidebar-hover hover:text-white'
              } ${collapsed ? 'justify-center px-2' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-3">
        {!collapsed && user?.email && (
          <div className="truncate px-2 text-xs text-sidebar-muted">
            {user.email}
            {isMockAuth && ' (demo)'}
          </div>
        )}
        <button
          type="button"
          onClick={() => void signOut()}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted transition hover:bg-sidebar-hover hover:text-white ${
            collapsed ? 'justify-center px-2' : ''
          }`}
          title={collapsed ? 'Çıkış Yap' : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Çıkış Yap</span>}
        </button>
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`hidden w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted transition hover:bg-sidebar-hover hover:text-white lg:flex ${
            collapsed ? 'justify-center px-2' : ''
          }`}
        >
          <ChevronLeft className={`h-5 w-5 shrink-0 transition ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span>Menüyü Daralt</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          aria-label="Menüyü kapat"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transition-transform duration-200 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 bg-sidebar transition-all duration-200 lg:block ${
          collapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        {content}
      </aside>
    </>
  )
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-border bg-white p-2 text-text lg:hidden"
      aria-label="Menüyü aç"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
