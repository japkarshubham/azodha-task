import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProfileData {
  name: string
  age: string
  email: string
  profilePicture: string // base64 data URL or ''
}

export interface PaymentData {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export interface OnboardingState {
  currentStep: number // 1–4
  profile: ProfileData
  songs: string[]
  payment: PaymentData
}

const initialState: OnboardingState = {
  currentStep: 1,
  profile: { name: '', age: '', email: '', profilePicture: '' },
  songs: [''],
  payment: { cardNumber: '', expiryDate: '', cvv: '' },
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    nextStep(state) {
      if (state.currentStep < 4) state.currentStep += 1
    },
    prevStep(state) {
      if (state.currentStep > 1) state.currentStep -= 1
    },
    setProfile(state, action: PayloadAction<ProfileData>) {
      state.profile = action.payload
    },
    setSongs(state, action: PayloadAction<string[]>) {
      state.songs = action.payload
    },
    setPayment(state, action: PayloadAction<PaymentData>) {
      state.payment = action.payload
    },
    loadFromStorage(_state, action: PayloadAction<Partial<OnboardingState>>) {
      const saved = action.payload
      return {
        ...initialState,
        ...saved,
        profile: { ...initialState.profile, ...saved.profile },
        payment: { ...initialState.payment, ...saved.payment },
        songs: saved.songs?.length ? saved.songs : initialState.songs,
      }
    },
  },
})

export const { nextStep, prevStep, setProfile, setSongs, setPayment, loadFromStorage } =
  onboardingSlice.actions
export default onboardingSlice.reducer