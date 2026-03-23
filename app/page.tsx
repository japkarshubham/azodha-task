import AuthGuard from "@/app/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <section className="text-white w-full max-w-3xl rounded-3xl px-8 py-14 text-center backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
            Homepage
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 ">
            Welcome to the platform. Your homepage now opens with a dedicated
            welcome page and message.
          </p>
        </section>
      </main>
    </AuthGuard>
  );
}
