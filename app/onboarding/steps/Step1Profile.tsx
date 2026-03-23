'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setProfile, nextStep } from '@/app/store/onboardingSlice'

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .required('Age is required')
    .integer('Age must be a whole number')
    .min(1, 'Age must be at least 1')
    .max(120, 'Age must be 120 or below'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
})

const inputClass =
  'w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition'

const errorClass = 'text-xs text-red-500 dark:text-red-400 mt-1'

export default function Step1Profile() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((s) => s.onboarding.profile)

  return (
    <Formik
      initialValues={profile}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(setProfile(values))
        dispatch(nextStep())
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
              Personal Profile
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tell us a bit about yourself.
            </p>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Profile Picture <span className="text-zinc-400 font-normal">(optional)</span>
            </label>
            <div className="flex items-center gap-4">
              {values.profilePicture ? (
                <Image
                  src={values.profilePicture}
                  alt="Profile preview"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-lg">
                  ?
                </div>
              )}
              <label className="cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                {values.profilePicture ? 'Change photo' : 'Upload photo'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = (ev) =>
                      setFieldValue('profilePicture', ev.target?.result as string)
                    reader.readAsDataURL(file)
                  }}
                />
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Full Name
            </label>
            <Field id="name" name="name" placeholder="Jane Doe" className={inputClass} />
            <ErrorMessage name="name" component="p" className={errorClass} />
          </div>

          {/* Age */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="age" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Age
            </label>
            <Field
              id="age"
              name="age"
              type="number"
              min={1}
              max={120}
              placeholder="25"
              className={inputClass}
            />
            <ErrorMessage name="age" component="p" className={errorClass} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className={inputClass}
            />
            <ErrorMessage name="email" component="p" className={errorClass} />
          </div>

          <div className="flex justify-end pt-2">
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