export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
import Profile from '@/components/auth/Profile'
import LogMain from '@/components/log/LogMain.server'

export default function Log() {
  return (
    <div className="w-full h-full">
      <div className="grid h-[100vh]">
        <main className="grid-1">
          <Profile />
          <LogMain />
        </main>
      </div>
    </div>
  )
}
