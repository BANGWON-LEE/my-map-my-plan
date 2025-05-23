import { pathPropsDataType } from '@/type/marker'

export default function PathChoiceContainer(props: pathPropsDataType) {
  const { data } = props
  console.log('data', data)
  // console.log('type index', choiceKey)

  return (
    <section className="bg-gray-100 mx-auto w-[5rem] rounded-2xl ">
      <div className="border-b-2 border-b-gray-200">
        <button className=" w-[5rem] rounded-t-2xl cursor-pointer py-2 font-bold hover:bg-green-300">
          출발
        </button>
      </div>
      <div>
        <button className="  w-[5rem] rounded-b-2xl cursor-pointer py-2 font-bold hover:bg-red-300">
          도착
        </button>
      </div>
    </section>
  )
}
