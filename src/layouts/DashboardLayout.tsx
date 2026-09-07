import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MobileMenuButton, Sidebar } from '@/components/Sidebar'

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-full bg-surface">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
          <MobileMenuButton onClick={() => setMobileOpen(true)} />
          <div>
            <div className="text-sm font-bold text-text">İş Takip</div>
            <div className="text-xs text-text-muted">Yönetim Paneli</div>
          </div>
        </div>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
