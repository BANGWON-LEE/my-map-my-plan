import Map from '@/components/maps/Map'

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="grid h-[100vh]">
        <main className="grid-1">
          <Map />
        </main>
      </div>
    </div>
  )
}
