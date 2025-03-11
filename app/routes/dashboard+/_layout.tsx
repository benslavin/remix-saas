import type { LoaderFunctionArgs } from 'react-router'
import { Outlet, redirect, useLoaderData } from 'react-router'
import { requireUser } from '#app/modules/auth/auth.server'
import { prisma } from '#app/utils/db.server'
import { ROUTE_PATH as ONBOARDING_USERNAME_PATH } from '#app/routes/onboarding+/username'
import { Navigation } from '#app/components/navigation'
import { Header } from '#app/components/header'

export const ROUTE_PATH = '/dashboard' as const

export type LoaderData = Exclude<Awaited<ReturnType<typeof loader>>, Response>

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  if (!user.username) return redirect(ONBOARDING_USERNAME_PATH)

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  })

  return {
    user,
    subscription,
  }
}

export default function Dashboard() {
  const { user, subscription } = useLoaderData<typeof loader>()

  return (
    <div className="bg-secondary flex min-h-[100vh] w-full flex-col dark:bg-black">
      <Navigation user={user} planId={subscription?.planId} />
      <Header />
      <Outlet />
    </div>
  )
}
