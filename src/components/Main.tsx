// 'use client'

import Header from './layout/Header'

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-[100vh]">
      <Header />
      <main className="grid-1">{children}</main>
    </div>
  )
}
