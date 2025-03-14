import type { MetaFunction, LoaderFunctionArgs } from 'react-router'
import { useState } from 'react'
import { Link, useLoaderData, useRevalidator } from 'react-router'
import { redirect } from 'react-router'
import { Loader2, BadgeCheck, AlertTriangle, ExternalLink } from 'lucide-react'
import { requireSessionUser } from '#app/modules/auth/auth.server'
import { PLANS } from '#app/modules/stripe/plans'
import { prisma } from '#app/utils/db.server'
import { useInterval } from '#app/utils/hooks/use-interval'
import { siteConfig } from '#app/utils/constants/brand'
import { ROUTE_PATH as DASHBOARD_PATH } from '#app/routes/dashboard+/_layout'
import { buttonVariants } from '#app/components/ui/button'

export const ROUTE_PATH = '/dashboard/checkout'

export const meta: MetaFunction = () => {
  return [{ title: `${siteConfig.siteTitle} - Checkout` }]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionUser = await requireSessionUser(request)
  const subscription = await prisma.subscription.findUnique({
    where: { userId: sessionUser.id },
  })
  if (!subscription) return redirect(DASHBOARD_PATH)

  return { isFreePlan: subscription.planId === PLANS.FREE }
}

export default function DashboardCheckout() {
  const { isFreePlan } = useLoaderData<typeof loader>()
  const { revalidate } = useRevalidator()

  const [retries, setRetries] = useState(0)

  useInterval(
    () => {
      revalidate()
      setRetries(retries + 1)
    },
    isFreePlan && retries !== 3 ? 2_000 : null,
  )

  return (
    <div className="bg-secondary flex h-full w-full px-6 py-8 dark:bg-black">
      <div className="z-10 mx-auto flex h-full w-full max-w-(--breakpoint-xl) gap-12">
        <div className="border-border bg-card flex w-full flex-col rounded-lg border dark:bg-black">
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-primary text-xl font-medium">
                Completing your Checkout
              </h2>
              <p className="text-primary/60 text-sm font-normal">
                We are completing your checkout, please wait ...
              </p>
            </div>
          </div>
          <div className="flex w-full px-6">
            <div className="border-border w-full border-b" />
          </div>
          <div className="relative mx-auto flex w-full flex-col items-center p-6">
            <div className="border-border bg-secondary dark:bg-card relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border px-6 py-24">
              <div className="z-10 flex flex-col items-center gap-4">
                <div className="border-primary/20 bg-card hover:border-primary/40 flex h-16 w-16 items-center justify-center rounded-2xl border">
                  {isFreePlan && retries < 3 && (
                    <Loader2 className="text-primary/60 h-8 w-8 animate-spin stroke-[1.5px]" />
                  )}
                  {!isFreePlan && (
                    <BadgeCheck className="text-primary/60 h-8 w-8 stroke-[1.5px]" />
                  )}
                  {isFreePlan && retries === 3 && (
                    <AlertTriangle className="text-primary/60 h-8 w-8 stroke-[1.5px]" />
                  )}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-primary text-center text-base font-medium">
                    {isFreePlan && retries < 3 && 'Completing your checkout ...'}
                    {!isFreePlan && 'Checkout completed!'}
                    {isFreePlan &&
                      retries === 3 &&
                      "Something went wrong, but don't worry, you will not be charged."}
                  </p>
                </div>
              </div>
              <div className="z-10 flex items-center justify-center">
                <Link
                  to={DASHBOARD_PATH}
                  prefetch="intent"
                  className={`${buttonVariants({ variant: 'ghost', size: 'sm' })} gap-2`}>
                  <span className="text-primary/60 group-hover:text-primary text-sm font-medium">
                    Return to Dashboard
                  </span>
                  <ExternalLink className="text-primary/60 group-hover:text-primary h-4 w-4 stroke-[1.5px]" />
                </Link>
              </div>
              <div className="base-grid absolute h-full w-full opacity-40" />
              <div className="absolute bottom-0 h-full w-full bg-linear-to-t from-[hsl(var(--card))] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
