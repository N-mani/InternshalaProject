import axios from 'axios'
import { useEffect, useState, useRef } from 'react'

function InternshalaTask() {
  const [data, setData] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    axios.get('https://api.punkapi.com/v2/beers').then((res) => {
      console.log(res.data)
      setData(res.data)
    })
  }, [])

  useEffect(() => {
    inputRef.current.focus()
  })
  return (
    <>
      <input
        type="text"
        value={searchItem}
        placeholder="Search..."
        onChange={(e) => setSearchItem(e.target.value)}
        ref={inputRef}
        className="m-2 p-3 border-2 rounded-lg shadow-lg "
      />
      <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 ">
        {data
          .filter((val) => {
            return searchItem === ''
              ? val
              : val.name.toLowerCase().includes(searchItem.toLowerCase())
          })
          .map((item) => (
            <article
              key={item.id}
              className="border-2 rounded-lg shadow-xl w-[450px] h-[450px] flex flex-col m-auto mt-5 items-center  hover:scale-95 cursor-pointer duration-300 justify-between"
            >
              <h1 className="text-[20px] font-bold m-1 p-1 lg:text-[22px]">
                {item.name}
              </h1>
              <img
                src={item.image_url}
                alt=""
                className="m-1 p-1 w-[40px] hover:scale-[1.7] duration-500 "
              />
              <h3 className="m-1 p-1 text-[15px] font-semibold lg:text-[17px]">
                {item.tagline}
              </h3>
              <p className="m-1 p-1 text-[14px] font-medium ">
                {item.description}
              </p>
            </article>
          ))}
      </ul>
    </>
  )
}

export default InternshalaTask
