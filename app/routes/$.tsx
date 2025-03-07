import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { HelpCircle, ExternalLink } from 'lucide-react'
import { siteConfig } from '#app/utils/constants/brand'
import { GenericErrorBoundary } from '#app/components/misc/error-boundary'
import { buttonVariants } from '#app/components/ui/button'
import { ROUTE_PATH as DASHBOARD_PATH } from '#app/routes/dashboard+/_layout'

export const meta: MetaFunction = () => {
  return [{ title: `${siteConfig.siteTitle} - 404 Not Found!` }]
}

export async function loader() {
  throw new Response('Not found', { status: 404 })
}

export default function NotFound() {
  // Due to the loader, this component will never be rendered,
  // but as a good practice, ErrorBoundary will be returned.
  return <ErrorBoundary />
}

export function ErrorBoundary() {
  return (
    <GenericErrorBoundary
      statusHandlers={{
        404: () => (
          <div className="bg-card flex h-screen w-full flex-col items-center justify-center gap-8 rounded-md px-6">
            <div className="border-border bg-card hover:border-primary/40 flex h-16 w-16 items-center justify-center rounded-2xl border">
              <HelpCircle className="text-primary/60 h-8 w-8 stroke-[1.5px]" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-primary text-2xl font-medium">Whoops!</p>
              <p className="text-primary/60 text-center text-lg font-normal">
                Nothing here yet!
              </p>
            </div>
            <Link
              to={DASHBOARD_PATH}
              prefetch="intent"
              className={`${buttonVariants({ variant: 'ghost', size: 'sm' })} gap-2`}>
              <span className="text-primary/60 group-hover:text-primary text-sm font-medium">
                Return to Home
              </span>
              <ExternalLink className="text-primary/60 group-hover:text-primary h-4 w-4 stroke-[1.5px]" />
            </Link>
          </div>
        ),
      }}
    />
  )
}
