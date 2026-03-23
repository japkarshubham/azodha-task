'use client'

import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setSongs, nextStep, prevStep } from '@/app/store/onboardingSlice'

const validationSchema = Yup.object({
  songs: Yup.array()
    .of(Yup.string().trim().required('Song name cannot be empty'))
    .min(1, 'Add at least one song'),
})

const inputClass =
  'flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition'

const errorClass = 'text-xs text-red-500 dark:text-red-400 mt-1'

export default function Step2Songs() {
  const dispatch = useAppDispatch()
  const songs = useAppSelector((s) => s.onboarding.songs)

  return (
    <Formik
      initialValues={{ songs }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(setSongs(values.songs))
        dispatch(nextStep())
      }}
    >
      {({ values, errors, touched }) => (
        <Form className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
              Favorite Songs
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Add the songs you love. You can add as many as you like.
            </p>
          </div>

          <FieldArray name="songs">
            {({ push, remove }) => (
              <div className="flex flex-col gap-3">
                {values.songs.map((_, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-zinc-400 w-5 text-right shrink-0">
                        {index + 1}.
                      </span>
                      <Field
                        name={`songs.${index}`}
                        placeholder={`Song ${index + 1}`}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        disabled={values.songs.length === 1}
                        onClick={() => remove(index)}
                        className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Remove song"
                      >
                        ×
                      </button>
                    </div>
                    {touched.songs &&
                      errors.songs &&
                      typeof errors.songs[index] === 'string' && (
                        <p className={`${errorClass} ml-7`}>{errors.songs[index] as string}</p>
                      )}
                  </div>
                ))}

                {typeof errors.songs === 'string' && touched.songs && (
                  <p className={errorClass}>{errors.songs}</p>
                )}

                <button
                  type="button"
                  onClick={() => push('')}
                  className="flex items-center gap-2 self-start rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-200 transition"
                >
                  <span className="text-base leading-none">+</span> Add song
                </button>
              </div>
            )}
          </FieldArray>

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