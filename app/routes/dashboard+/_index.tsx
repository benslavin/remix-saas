import type { MetaFunction, LoaderFunctionArgs } from 'react-router'
import { Plus, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { requireUser } from '#app/modules/auth/auth.server'
import { prisma } from '#app/utils/db.server'
import { cn } from '#app/utils/misc.js'
import { siteConfig } from '#app/utils/constants/brand'
import { buttonVariants } from '#app/components/ui/button'

export const meta: MetaFunction = () => {
  return [{ title: `${siteConfig.siteTitle} - Dashboard` }]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  })
  return { user, subscription }
}

export default function DashboardIndex() {
  const { t } = useTranslation()

  return (
    <div className="bg-secondary flex h-full w-full px-6 py-8 dark:bg-black">
      <div className="z-10 mx-auto flex h-full w-full max-w-(--breakpoint-xl) gap-12">
        <div className="border-border bg-card flex w-full flex-col rounded-lg border dark:bg-black">
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-primary text-xl font-medium">Get Started</h2>
              <p className="text-primary/60 text-sm font-normal">
                Explore the Dashboard and get started with your first app.
              </p>
            </div>
          </div>
          <div className="flex w-full px-6">
            <div className="border-border w-full border-b" />
          </div>
          <div className="relative mx-auto flex w-full flex-col items-center p-6">
            <div className="border-border bg-secondary dark:bg-card relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border px-6 py-24">
              <div className="z-10 flex max-w-[460px] flex-col items-center gap-4">
                <div className="border-primary/20 bg-card hover:border-primary/40 flex h-16 w-16 items-center justify-center rounded-2xl border">
                  <Plus className="text-primary/60 h-8 w-8 stroke-[1.5px]" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-primary text-base font-medium">{t('title')}</p>
                  <p className="text-primary/60 text-center text-base font-normal">
                    {t('description')}
                  </p>
                  <span className="hidden items-center rounded-full bg-green-500/5 px-3 py-1 text-xs font-medium tracking-tight text-green-700 ring-1 ring-green-600/20 backdrop-blur-md select-none ring-inset md:flex dark:bg-green-900/40 dark:text-green-100">
                    TIP: Try changing the language!
                  </span>
                </div>
              </div>
              <div className="z-10 flex items-center justify-center">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/dev-xo/remix-saas/tree/main/docs#welcome-to-%EF%B8%8F-remix-saas-documentation"
                  className={cn(
                    `${buttonVariants({ variant: 'ghost', size: 'sm' })} gap-2`,
                  )}>
                  <span className="text-primary/60 group-hover:text-primary text-sm font-medium">
                    Explore Documentation
                  </span>
                  <ExternalLink className="text-primary/60 group-hover:text-primary h-4 w-4 stroke-[1.5px]" />
                </a>
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
