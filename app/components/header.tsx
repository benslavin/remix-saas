import { useLocation } from '@remix-run/react'
import { ROUTE_PATH as DASHBOARD_PATH } from '#app/routes/dashboard+/_layout'
import { ROUTE_PATH as BILLING_PATH } from '#app/routes/dashboard+/settings.billing'
import { ROUTE_PATH as SETTINGS_PATH } from '#app/routes/dashboard+/settings'
import { ROUTE_PATH as ADMIN_PATH } from '#app/routes/admin+/_layout'

export function Header() {
  const location = useLocation()
  const allowedLocations = [DASHBOARD_PATH, BILLING_PATH, SETTINGS_PATH, ADMIN_PATH]

  const headerTitle = () => {
    if (location.pathname === DASHBOARD_PATH) return 'Dashboard'
    if (location.pathname === BILLING_PATH) return 'Billing'
    if (location.pathname === SETTINGS_PATH) return 'Settings'
    if (location.pathname === ADMIN_PATH) return 'Admin'
  }
  const headerDescription = () => {
    if (location.pathname === DASHBOARD_PATH)
      return 'Manage your Apps and view your usage.'
    if (location.pathname === SETTINGS_PATH) return 'Manage your account settings.'
    if (location.pathname === BILLING_PATH)
      return 'Manage billing and your subscription plan.'
    if (location.pathname === ADMIN_PATH) return 'Your admin dashboard.'
  }

  if (!allowedLocations.includes(location.pathname as (typeof allowedLocations)[number]))
    return null

  return (
    <header className="border-border bg-card z-10 flex w-full flex-col border-b px-6">
      <div className="mx-auto flex w-full max-w-(--breakpoint-xl) items-center justify-between py-12">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-primary/80 text-3xl font-medium">{headerTitle()}</h1>
          <p className="text-primary/60 text-base font-normal">{headerDescription()}</p>
        </div>
      </div>
    </header>
  )
}
