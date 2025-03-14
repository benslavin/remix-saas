import type { LoaderFunctionArgs } from 'react-router'
import { Link, Outlet } from 'react-router'
import { redirect } from 'react-router'
import { authenticator } from '#app/modules/auth/auth.server'
import { getDomainPathname } from '#app/utils/misc.server'
import { ROUTE_PATH as HOME_PATH } from '#app/routes/_home+/_layout'
import { ROUTE_PATH as LOGIN_PATH } from '#app/routes/auth+/login'
import { ROUTE_PATH as DASHBOARD_PATH } from '#app/routes/dashboard+/_layout'
import { Logo } from '#app/components/logo'

export const ROUTE_PATH = '/auth' as const

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: DASHBOARD_PATH,
  })
  const pathname = getDomainPathname(request)
  if (pathname === ROUTE_PATH) return redirect(LOGIN_PATH)
  return {}
}

const QUOTES = [
  {
    quote: 'There is nothing impossible to they who will try.',
    author: 'Alexander the Great',
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    quote: 'The best way to predict the future is to create it.',
    author: 'Peter Drucker',
  },
  {
    quote: 'The only limit to our realization of tomorrow will be our doubts of today.',
    author: 'Franklin D. Roosevelt',
  },
  {
    quote: 'The only thing we have to fear is fear itself.',
    author: 'Franklin D. Roosevelt',
  },
]

export default function Layout() {
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]

  return (
    <div className="flex h-screen w-full">
      <div className="absolute top-10 left-1/2 mx-auto flex -translate-x-1/2 transform lg:hidden">
        <Link
          to={HOME_PATH}
          prefetch="intent"
          className="z-10 flex h-10 flex-col items-center justify-center gap-2">
          <Logo />
        </Link>
      </div>
      <div className="bg-card relative hidden h-full w-[50%] flex-col justify-between overflow-hidden p-10 lg:flex">
        <Link
          to={HOME_PATH}
          prefetch="intent"
          className="z-10 flex h-10 w-10 items-center gap-1">
          <Logo />
        </Link>

        <div className="z-10 flex flex-col items-start gap-2">
          <p className="text-primary text-base font-normal">{randomQuote.quote}</p>
          <p className="text-primary/60 text-base font-normal">- {randomQuote.author}</p>
        </div>
        <div className="base-grid absolute top-0 left-0 z-0 h-full w-full opacity-40" />
      </div>
      <div className="border-primary/5 bg-card flex h-full w-full flex-col border-l lg:w-[50%]">
        <Outlet />
      </div>
    </div>
  )
}
