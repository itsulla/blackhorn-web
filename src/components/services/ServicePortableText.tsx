import { PortableText, PortableTextBlock } from '@portabletext/react'

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="pt-4 font-serif text-2xl font-light text-light-text">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="pt-3 font-serif text-xl font-light text-light-text">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
  },
}

export default function ServicePortableText({
  value,
}: {
  value: PortableTextBlock[]
}) {
  return <PortableText value={value} components={components} />
}
