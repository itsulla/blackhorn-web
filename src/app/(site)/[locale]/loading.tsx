import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark">
      <div className="animate-pulse">
        <Image
          src="/images/logo/blackhorn-logo-dark-en-transparent.png"
          alt=""
          width={140}
          height={21}
          className="h-auto w-[140px] opacity-60"
          priority
        />
      </div>
      <p className="mt-4 font-serif text-xs uppercase tracking-[4px] text-muted/40">
        Blackhorn
      </p>
    </div>
  )
}
