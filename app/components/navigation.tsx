import type { LoaderData as AdminLoaderData } from '#app/routes/admin+/_layout'
import type { LoaderData as DashboardLoaderData } from '#app/routes/dashboard+/_layout'
import { Link, useLocation, useSubmit, useNavigate } from '@remix-run/react'
import {
  ChevronUp,
  ChevronDown,
  Slash,
  Check,
  Settings,
  LogOut,
  Star,
} from 'lucide-react'
import { PLANS } from '#app/modules/stripe/plans'
import { useRequestInfo } from '#app/utils/hooks/use-request-info'
import { userHasRole, getUserImgSrc, cn } from '#app/utils/misc'
import { ROUTE_PATH as LOGOUT_PATH } from '#app/routes/auth+/logout'
import { ROUTE_PATH as ADMIN_PATH } from '#app/routes/admin+/_layout'
import { ROUTE_PATH as DASHBOARD_PATH } from '#app/routes/dashboard+/_layout'
import { ROUTE_PATH as DASHBOARD_SETTINGS_PATH } from '#app/routes/dashboard+/settings'
import { ROUTE_PATH as DASHBOARD_SETTINGS_BILLING_PATH } from '#app/routes/dashboard+/settings.billing'
import { ThemeSwitcher } from '#app/components/misc/theme-switcher'
import { LanguageSwitcher } from '#app/components/misc/language-switcher'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '#app/components/ui/dropdown-menu'
import { Button, buttonVariants } from '#app/components/ui/button'
import { Logo } from '#app/components/logo'

type NavigationProps = {
  user: AdminLoaderData['user'] | DashboardLoaderData['user'] | null
  planId?: string
}

export function Navigation({ user, planId }: NavigationProps) {
  const navigate = useNavigate()
  const submit = useSubmit()
  const requestInfo = useRequestInfo()

  const location = useLocation()
  const isAdminPath = location.pathname === ADMIN_PATH
  const isDashboardPath = location.pathname === DASHBOARD_PATH
  const isSettingsPath = location.pathname === DASHBOARD_SETTINGS_PATH
  const isBillingPath = location.pathname === DASHBOARD_SETTINGS_BILLING_PATH

  return (
    <nav className="border-border bg-card sticky top-0 z-50 flex w-full flex-col border-b px-6">
      <div className="mx-auto flex w-full max-w-(--breakpoint-xl) items-center justify-between py-3">
        <div className="flex h-10 items-center gap-2">
          <Link
            to={DASHBOARD_PATH}
            prefetch="intent"
            className="flex h-10 items-center gap-1">
            <Logo />
          </Link>
          <Slash className="text-primary/10 h-6 w-6 -rotate-12 stroke-[1.5px]" />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-primary/5 gap-2 px-2">
                <div className="flex items-center gap-2">
                  {user?.image?.id ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      alt={user.username ?? user.email}
                      src={getUserImgSrc(user.image?.id)}
                    />
                  ) : (
                    <span className="h-8 w-8 rounded-full bg-linear-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
                  )}

                  <p className="text-primary/80 text-sm font-medium">
                    {user?.username || ''}
                  </p>
                  <span className="bg-primary/10 text-primary/80 flex h-5 items-center rounded-full px-2 text-xs font-medium">
                    {(planId && planId.charAt(0).toUpperCase() + planId.slice(1)) ||
                      'Free'}
                  </span>
                </div>
                <span className="flex flex-col items-center justify-center">
                  <ChevronUp className="text-primary/60 relative top-[3px] h-[14px] w-[14px] stroke-[1.5px]" />
                  <ChevronDown className="text-primary/60 relative bottom-[3px] h-[14px] w-[14px] stroke-[1.5px]" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} className="bg-card min-w-56 p-2">
              <DropdownMenuLabel className="text-primary/60 flex items-center text-xs font-normal">
                Personal Account
              </DropdownMenuLabel>
              <DropdownMenuItem className="bg-secondary h-10 w-full cursor-pointer justify-between rounded-md px-2">
                <div className="flex items-center gap-2">
                  {user?.image?.id ? (
                    <img
                      className="h-6 w-6 rounded-full object-cover"
                      alt={user.username ?? user.email}
                      src={getUserImgSrc(user.image?.id)}
                    />
                  ) : (
                    <span className="h-6 w-6 rounded-full bg-linear-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
                  )}

                  <p className="text-primary/80 text-sm font-medium">
                    {user?.username || ''}
                  </p>
                </div>
                <Check className="text-primary/60 h-[18px] w-[18px] stroke-[1.5px]" />
              </DropdownMenuItem>

              {planId && planId === PLANS.FREE && (
                <>
                  <DropdownMenuSeparator className="mx-0 my-2" />
                  <DropdownMenuItem className="p-0 focus:bg-transparent">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => navigate(DASHBOARD_SETTINGS_BILLING_PATH)}>
                      Upgrade to PRO
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex h-10 items-center gap-3">
          <a
            href="https://github.com/dev-xo/remix-saas/tree/main/docs#welcome-to-%EF%B8%8F-remix-saas-documentation"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: 'link', size: 'sm' }),
              'group text-primary/80 hover:text-primary flex gap-3 px-0 hover:no-underline',
            )}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary/80 group-hover:text-primary h-6 w-6 transition"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="hidden items-center gap-1 rounded-full bg-green-500/5 px-2 py-1.5 pr-2.5 text-xs font-semibold tracking-tight text-green-600 ring-1 ring-green-600/20 backdrop-blur-xs transition-all duration-300 select-none ring-inset group-hover:brightness-110 md:flex dark:bg-yellow-800/40 dark:text-yellow-100 dark:ring-yellow-200/50">
              <Star
                className="h-3 w-3 text-green-600 dark:text-yellow-100"
                fill="currentColor"
              />
              +1.4K Documentation
            </span>
          </a>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                {user?.image?.id ? (
                  <img
                    className="min-h-8 min-w-8 rounded-full object-cover"
                    alt={user.username ?? user.email}
                    src={getUserImgSrc(user.image?.id)}
                  />
                ) : (
                  <span className="min-h-8 min-w-8 rounded-full bg-linear-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={8}
              className="bg-card fixed -right-4 min-w-56 p-2">
              <DropdownMenuItem className="group flex-col items-start focus:bg-transparent">
                <p className="text-primary/80 group-hover:text-primary group-focus:text-primary text-sm font-medium">
                  {user?.username || ''}
                </p>
                <p className="text-primary/60 text-sm">{user?.email}</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="group h-9 w-full cursor-pointer justify-between rounded-md px-2"
                onClick={() => navigate(DASHBOARD_SETTINGS_PATH)}>
                <span className="text-primary/60 group-hover:text-primary group-focus:text-primary text-sm">
                  Settings
                </span>
                <Settings className="text-primary/60 group-hover:text-primary group-focus:text-primary h-[18px] w-[18px] stroke-[1.5px]" />
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  'group flex h-9 justify-between rounded-md px-2 hover:bg-transparent',
                )}>
                <span className="text-primary/60 group-hover:text-primary group-focus:text-primary w-full text-sm">
                  Theme
                </span>
                <ThemeSwitcher userPreference={requestInfo.userPrefs.theme} />
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  'group flex h-9 justify-between rounded-md px-2 hover:bg-transparent',
                )}>
                <span className="text-primary/60 group-hover:text-primary group-focus:text-primary w-full text-sm">
                  Language
                </span>
                <LanguageSwitcher />
              </DropdownMenuItem>

              <DropdownMenuSeparator className="mx-0 my-2" />

              <DropdownMenuItem
                className="group h-9 w-full cursor-pointer justify-between rounded-md px-2"
                onClick={() => submit({}, { action: LOGOUT_PATH, method: 'POST' })}>
                <span className="text-primary/60 group-hover:text-primary group-focus:text-primary text-sm">
                  Log Out
                </span>
                <LogOut className="text-primary/60 group-hover:text-primary group-focus:text-primary h-[18px] w-[18px] stroke-[1.5px]" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-(--breakpoint-xl) items-center gap-3">
        {user && userHasRole(user, 'admin') && (
          <div
            className={`flex h-12 items-center border-b-2 ${isAdminPath ? 'border-primary' : 'border-transparent'}`}>
            <Link
              to={ADMIN_PATH}
              prefetch="intent"
              className={cn(
                `${buttonVariants({ variant: 'ghost', size: 'sm' })} text-primary/80`,
              )}>
              Admin
            </Link>
          </div>
        )}
        <div
          className={`flex h-12 items-center border-b-2 ${isDashboardPath ? 'border-primary' : 'border-transparent'}`}>
          <Link
            to={DASHBOARD_PATH}
            prefetch="intent"
            className={cn(
              `${buttonVariants({ variant: 'ghost', size: 'sm' })} text-primary/80`,
            )}>
            Dashboard
          </Link>
        </div>
        <div
          className={`flex h-12 items-center border-b-2 ${isSettingsPath ? 'border-primary' : 'border-transparent'}`}>
          <Link
            to={DASHBOARD_SETTINGS_PATH}
            prefetch="intent"
            className={cn(
              `${buttonVariants({ variant: 'ghost', size: 'sm' })} text-primary/80`,
            )}>
            Settings
          </Link>
        </div>
        <div
          className={`flex h-12 items-center border-b-2 ${isBillingPath ? 'border-primary' : 'border-transparent'}`}>
          <Link
            to={DASHBOARD_SETTINGS_BILLING_PATH}
            prefetch="intent"
            className={cn(
              `${buttonVariants({ variant: 'ghost', size: 'sm' })} text-primary/80`,
            )}>
            Billing
          </Link>
        </div>
      </div>
    </nav>
  )
}
