'use client'

import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setPayment, nextStep, prevStep } from '@/app/store/onboardingSlice'

const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Must be exactly 16 digits')
    .required('Card number is required'),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format')
    .required('Expiry date is required'),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, 'Must be 3 or 4 digits')
    .required('CVV is required'),
})

const inputClass =
  'w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition font-mono tracking-wider'

const errorClass = 'text-xs text-red-500 dark:text-red-400 mt-1'

// Strip non-digits, keep only up to maxLen digits
function digitsOnly(value: string, maxLen: number) {
  return value.replace(/\D/g, '').slice(0, maxLen)
}

// Format MM/YY: auto-insert slash after 2 digits
function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export default function Step3Payment() {
  const dispatch = useAppDispatch()
  const payment = useAppSelector((s) => s.onboarding.payment)

  return (
    <Formik
      initialValues={payment}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(setPayment(values))
        dispatch(nextStep())
      }}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
              Payment Information
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Enter your card details. This information is stored locally only.
            </p>
          </div>

          {/* Card Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Card Number
            </label>
            <input
              name="cardNumber"
              inputMode="numeric"
              value={values.cardNumber}
              onChange={(e) => setFieldValue('cardNumber', digitsOnly(e.target.value, 16))}
              placeholder="1234567812345678"
              maxLength={16}
              className={inputClass}
            />
            {touched.cardNumber && errors.cardNumber && (
              <p className={errorClass}>{errors.cardNumber}</p>
            )}
          </div>

          <div className="flex gap-4">
            {/* Expiry */}
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Expiry Date
              </label>
              <input
                name="expiryDate"
                inputMode="numeric"
                value={values.expiryDate}
                onChange={(e) => setFieldValue('expiryDate', formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className={inputClass}
              />
              {touched.expiryDate && errors.expiryDate && (
                <p className={errorClass}>{errors.expiryDate}</p>
              )}
            </div>

            {/* CVV */}
            <div className="flex flex-col gap-1.5 w-28">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">CVV</label>
              <input
                name="cvv"
                type="password"
                inputMode="numeric"
                value={values.cvv}
                onChange={(e) => setFieldValue('cvv', digitsOnly(e.target.value, 4))}
                placeholder="•••"
                maxLength={4}
                className={inputClass}
              />
              {touched.cvv && errors.cvv && <p className={errorClass}>{errors.cvv}</p>}
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => dispatch(prevStep())}
              className="rounded-full border border-zinc-200 dark:border-zinc-700 px-6 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-6 py-2.5 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}