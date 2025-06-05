'use client'

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-[100vh]">
      <main className="grid-1">{children}</main>
    </div>
  )
}
