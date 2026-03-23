'use client'

import AuthGuard from '@/app/components/AuthGuard'
import {useAppSelector} from '@/app/store/hooks'
import Step1Profile from './steps/Step1Profile'
import Step2Songs from './steps/Step2Songs'
import Step3Payment from './steps/Step3Payment'
import Step4Success from './steps/Step4Success'

const STEPS = [
    {label: 'Profile'},
    {label: 'Songs'},
    {label: 'Payment'},
    {label: 'Done'},
]

function StepIndicator({currentStep}: { currentStep: number }) {
    return (
        <div className="flex items-center w-full max-w-lg mx-auto mb-8">
            {STEPS.map((step, i) => {
                const stepNum = i + 1
                const isCompleted = stepNum < currentStep
                const isCurrent = stepNum === currentStep

                return (
                    <div key={i} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                            <div
                                className={[
                                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                                    isCompleted
                                        ? 'bg-green-500 text-white'
                                        : isCurrent
                                            ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                                            : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500',
                                ].join(' ')}
                            >
                                {isCompleted ? '✓' : stepNum}
                            </div>
                            <span
                                className={[
                                    'text-xs whitespace-nowrap',
                                    isCurrent
                                        ? 'text-zinc-900 dark:text-zinc-50 font-medium'
                                        : 'text-zinc-400 dark:text-zinc-500',
                                ].join(' ')}
                            >
                {step.label}
              </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div
                                className={[
                                    'h-px flex-1 mx-2 mt-[-1rem] transition-colors',
                                    isCompleted ? 'bg-green-400' : 'bg-zinc-200 dark:bg-zinc-700',
                                ].join(' ')}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

function OnboardingContent() {
    const currentStep = useAppSelector((s) => s.onboarding.currentStep)

    const stepComponents: Record<number, React.JSX.Element> = {
        1: <Step1Profile/>,
        2: <Step2Songs/>,
        3: <Step3Payment/>,
        4: <Step4Success/>,
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 py-10">
            <StepIndicator currentStep={currentStep}/>

            <div
                className="w-full max-w-lg mx-auto rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                {stepComponents[currentStep]}
            </div>
        </div>
    )
}

export default function OnboardingPage() {
    return (
        <AuthGuard>
            <OnboardingContent/>
        </AuthGuard>
    )
}