// 'use client'

export default function Navigation({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[100vh]">
      <div>네비바 들어올 예정</div>
      <main className="flex-1">{children}</main>
    </div>
  )
}
