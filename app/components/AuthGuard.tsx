'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    const onboardingComplete = localStorage.getItem('onboarding_complete')

    if (!user) {
      router.replace('/login')
      return
    }

    if (pathname === '/' && !onboardingComplete) {
      router.replace('/onboarding')
      return
    }

    if (pathname.startsWith('/onboarding') && onboardingComplete === 'true') {
      router.replace('/')
      return
    }

    setReady(true)
  }, [pathname, router])

  if (!ready) return null

  return <>{children}</>
}