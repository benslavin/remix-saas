import type { LoaderFunctionArgs } from 'react-router'
import { Outlet } from 'react-router'
import { redirect } from 'react-router'
import { requireUser } from '#app/modules/auth/auth.server'
import { getDomainPathname } from '#app/utils/misc.server'
import { ROUTE_PATH as DASHBOARD_PATH } from '#app/routes/dashboard+/_layout'
import { ROUTE_PATH as ONBOARDING_USERNAME_PATH } from '#app/routes/onboarding+/username'
import { Logo } from '#app/components/logo'

export const ROUTE_PATH = '/onboarding' as const

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)

  const pathname = getDomainPathname(request)
  const isOnboardingPathname = pathname === ROUTE_PATH
  const isOnboardingUsernamePathname = pathname === ONBOARDING_USERNAME_PATH

  if (isOnboardingPathname) return redirect(DASHBOARD_PATH)
  if (user.username && isOnboardingUsernamePathname) return redirect(DASHBOARD_PATH)

  return {}
}

export default function Onboarding() {
  return (
    <div className="bg-card relative flex h-screen w-full">
      <div className="absolute top-8 left-1/2 mx-auto -translate-x-1/2 transform justify-center">
        <Logo />
      </div>
      <div className="z-10 h-screen w-screen">
        <Outlet />
      </div>
      <div className="base-grid fixed h-screen w-screen opacity-40" />
      <div className="fixed bottom-0 h-screen w-screen bg-linear-to-t from-[hsl(var(--card))] to-transparent" />
    </div>
  )
}
