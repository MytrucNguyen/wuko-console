import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-wuko-bg p-8 text-center">
      <Image
        src="/error.png"
        alt=""
        width={440}
        height={440}
        priority
        className="opacity-90"
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-wuko-heading">
          Page not found
        </h1>
        <p className="max-w-md text-sm text-wuko-text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex h-9 items-center justify-center rounded-md bg-wuko-accent px-4 text-sm font-semibold text-wuko-bg transition-colors hover:bg-wuko-accent-hover"
      >
        Go home
      </Link>
    </main>
  );
}