import { configureStore } from '@reduxjs/toolkit'
import onboardingReducer from './onboardingSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      onboarding: onboardingReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']