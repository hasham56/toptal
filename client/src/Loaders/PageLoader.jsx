import React, { useState } from 'react'
import { useEffect } from 'react'
import './loaders.css'

const PageLoader = () => {
  const [text, setText] = useState('Page Loading..')

    useEffect( () => {
        setInterval( () => {
          setText(text => text + '.')
      }, 500)
  }, [])
  return (
    <div className="center">
      <h1>{text}</h1>
    </div>
  )
}

export default PageLoader
