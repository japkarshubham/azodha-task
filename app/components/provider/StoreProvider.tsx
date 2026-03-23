'use client'

import {useEffect, useRef} from 'react'
import {Provider} from 'react-redux'
import {makeStore, AppStore} from '../../store'
import {loadFromStorage} from '../../store/onboardingSlice'

let store: any = null;
export default function StoreProvider({children}: { children: React.ReactNode }) {

    if (!store) {
        store = makeStore()

        // Synchronous read so Redux state is correct before first paint
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('onboarding_state')

            if (saved) {
                try {
                    store.dispatch(loadFromStorage(JSON.parse(saved)))
                } catch {
                    // ignore corrupted saved state
                }
            }
        }
    }

    useEffect(() => {
        return store.subscribe(() => {
            const state = store.getState()
            console.log(state, "___state")
            localStorage.setItem('onboarding_state', JSON.stringify(state.onboarding))
        })
    }, [])

    return <Provider store={store}>{children}</Provider>
}