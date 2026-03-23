'use client'

import {useTransition} from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import {useAppDispatch, useAppSelector} from '@/app/store/hooks'
import {prevStep} from '@/app/store/onboardingSlice'

export default function Step4Success() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const profile = useAppSelector((s) => s.onboarding.profile)
    const [isPending, startTransition] = useTransition()

    function handleGoHome() {
        startTransition(() => {
            localStorage.setItem('onboarding_complete', 'true')
            router.push('/')
        })
    }

    return (
        <div className="flex flex-col items-center gap-6 text-center">
            {/* Avatar */}
            <div className="relative">
                {profile.profilePicture ? (
                    <>
                        <Image
                            src={profile.profilePicture}
                            alt="Profile"
                            width={80}
                            height={80}
                            className="h-20 w-20 rounded-full object-cover ring-4 ring-green-100 dark:ring-green-900"
                        />
                        <span
                            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white text-sm shadow">
                          ✓
                        </span>
                    </>
                ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-400 text-3xl">
                        N/A
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    You&apos;re all set{profile.name ? `, ${profile.name.split(' ')[0]}` : ''}!
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                    Your profile has been set up successfully. Welcome to the app.
                </p>
            </div>

            {/* Summary */}
            <div
                className="w-full rounded-xl border border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 text-left text-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-zinc-500 dark:text-zinc-400">Name</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{profile.name || '—'}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-zinc-500 dark:text-zinc-400">Email</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50 truncate max-w-[60%]">
            {profile.email || '—'}
          </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-zinc-500 dark:text-zinc-400">Age</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{profile.age || '—'}</span>
                </div>
            </div>

            <div className="flex gap-3 w-full">
                <button
                    type="button"
                    onClick={() => dispatch(prevStep())}
                    className="flex-1 rounded-full border border-zinc-200 dark:border-zinc-700 px-6 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                >
                    Back
                </button>
                <button
                    onClick={handleGoHome}
                    disabled={isPending}
                    className="flex-1 rounded-full bg-zinc-900 dark:bg-zinc-50 px-6 py-2.5 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Loading…' : 'Go to Homepage'}
                </button>
            </div>
        </div>
    )
}