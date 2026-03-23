'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import AuthGuard from '@/app/components/AuthGuard'

function OnboardingContent() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleComplete() {
    startTransition(() => {
      localStorage.setItem('onboarding_complete', 'true')
      router.push('/')
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 p-10 shadow-sm ring-1 ring-black/5 dark:ring-white/10 text-center">
        <div className="mb-6 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-2xl">
            👋
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          Welcome aboard!
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto leading-relaxed">
          Let&apos;s get you set up. Complete the steps below to start using the app.
        </p>

        <ol className="text-left mb-8 flex flex-col gap-3">
          {['Set up your profile', 'Configure your preferences', 'Explore the dashboard'].map(
            (step, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-lg border border-zinc-100 dark:border-zinc-800 px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50 text-xs font-medium text-white dark:text-zinc-900">
                  {i + 1}
                </span>
                {step}
              </li>
            ),
          )}
        </ol>

        <button
          onClick={handleComplete}
          disabled={isPending}
          className="w-full rounded-full bg-zinc-900 dark:bg-zinc-50 px-4 py-2.5 text-sm font-medium text-white dark:text-zinc-900 transition hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Finishing up…' : 'Complete onboarding'}
        </button>
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <OnboardingContent />
    </AuthGuard>
  )
}