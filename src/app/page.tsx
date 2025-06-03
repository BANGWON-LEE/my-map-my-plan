// import Main from '@/components/Main'
// import Map from '@/components/maps/Map'
import Map from '@/components/maps/Map'
// import MapClient from '@/components/maps/MapClient'
// import Image from 'next/image'

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="grid h-[100vh]">
        {/* <Header /> */}
        <main className="grid-1">
          {/* <MapClient /> */}
          <Map />
        </main>
      </div>
    </div>
  )
}
