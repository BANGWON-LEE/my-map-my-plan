import Map from '@/components/maps/Map'
import RecoilRootWrapper from '@/components/wrapper/RecoilWrapper'

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="grid h-[100vh]">
        <main className="grid-1">
          <RecoilRootWrapper>
            <Map />
          </RecoilRootWrapper>
        </main>
      </div>
    </div>
  )
}
