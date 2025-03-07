import type { Theme, ThemeExtended } from '#app/utils/hooks/use-theme'
import { useSubmit, useFetcher } from '@remix-run/react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useOptimisticThemeMode } from '#app/utils/hooks/use-theme'
import { cn } from '#app/utils/misc'
import { ROUTE_PATH as THEME_PATH } from '#app/routes/resources+/update-theme'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '#app/components/ui/select'

export function ThemeSwitcher({
  userPreference,
  triggerClass,
}: {
  userPreference?: Theme | null
  triggerClass?: string
}) {
  const submit = useSubmit()
  const optimisticMode = useOptimisticThemeMode()
  const mode = optimisticMode ?? userPreference ?? 'system'
  const themes: ThemeExtended[] = ['light', 'dark', 'system']

  return (
    <Select
      onValueChange={(theme) =>
        submit(
          { theme },
          {
            method: 'POST',
            action: THEME_PATH,
            navigate: false,
            fetcherKey: 'theme-fetcher',
          },
        )
      }>
      <SelectTrigger
        className={cn(
          'border-primary/20 bg-secondary hover:border-primary/40 h-6 rounded px-2!',
          triggerClass,
        )}>
        <div className="flex items-start gap-2">
          {mode === 'light' ? (
            <Sun className="h-[14px] w-[14px]" />
          ) : mode === 'dark' ? (
            <Moon className="h-[14px] w-[14px]" />
          ) : (
            <Monitor className="h-[14px] w-[14px]" />
          )}
          <span className="text-xs font-medium">
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem
            key={theme}
            value={theme}
            className={`text-primary/60 text-sm font-medium ${mode === theme && 'text-primary'}`}>
            {theme && theme.charAt(0).toUpperCase() + theme.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function ThemeSwitcherHome() {
  const fetcher = useFetcher({ key: 'theme-fetcher' })
  const themes: ThemeExtended[] = ['light', 'dark', 'system']

  return (
    <fetcher.Form method="POST" action={THEME_PATH} className="flex gap-3">
      {themes.map((theme) => (
        <button key={theme} type="submit" name="theme" value={theme}>
          {theme === 'light' ? (
            <Sun className="text-primary/80 hover:text-primary h-4 w-4" />
          ) : theme === 'dark' ? (
            <Moon className="text-primary/80 hover:text-primary h-4 w-4" />
          ) : (
            <Monitor className="text-primary/80 hover:text-primary h-4 w-4" />
          )}
        </button>
      ))}
    </fetcher.Form>
  )
}
