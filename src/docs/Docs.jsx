import React, { useEffect } from 'react'

import "./Docs.css"

export default function Docs() {
  useEffect(() =>{
    document.title = 'Flamality | Docs'
  },[])
  return (
    <div></div>
  )
}
