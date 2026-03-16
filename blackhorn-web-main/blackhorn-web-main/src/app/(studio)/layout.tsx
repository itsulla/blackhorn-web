export const metadata = {
  title: 'Blackhorn CMS',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div style={{ height: '100vh', overflow: 'auto' }}>{children}</div>
}
