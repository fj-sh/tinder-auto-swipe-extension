import React, { ChangeEvent, useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { getHowOftenDislikeInStorage, setHowOftenDislikeInStorage } from './lib/store'

function App() {
  const [howOftenDislike, setHowOftenDislike] = useState('0')

  const changeHowOftenDislike = async (event: ChangeEvent<HTMLSelectElement>) => {
    const howOftenDislikeNumber = Number(event.target.value)
    console.log('howOftenDislikeNumber', howOftenDislikeNumber)
    setHowOftenDislike(event.target.value)
    await setHowOftenDislikeInStorage(howOftenDislikeNumber)
  }

  useEffect(() => {
    getHowOftenDislikeInStorage().then((howOftenDislikeInStorage) => {
      setHowOftenDislike(howOftenDislikeInStorage.toString())
    })
  }, [])
  return (
    <>
      <div className="border p-3 mt-3">
        <p className="mt-1 text-sm text-gray-500 mb-3">
          If you want to click DISLIKE once every few times, set the following values. <br />
          The reason for clicking dislike is to prevent the algorithm from detecting an automatic
          swipe.
        </p>
        <select
          value={howOftenDislike}
          onChange={changeHowOftenDislike}
          aria-label="How Often Dislike"
          className="form-select appearance-none
      block
      w-full
      mt-3
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="0">0</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </>
  )
}

export default App
