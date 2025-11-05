import React, { useContext, useRef, useLayoutEffect, useEffect, useState } from 'react'
import "./Modal.css"
import { Layers } from '../../../../contexts/layers'

export default function Modal() {
  const { modal: content, visible, hideModal, location } = useContext(Layers)
  const modalRef = useRef(null)
  const [pos, setPos] = useState({ left: 0, top: 0 })

  // Positioning logic
  useLayoutEffect(() => {
    if (!visible || !modalRef.current) return

    const el = modalRef.current
    const elRect = el.getBoundingClientRect()
    const gap = 20
    const [x, y] = location

    let left = x
    let top = y

    const spaceRight = window.innerWidth - (x + elRect.width + gap)
    const spaceBottom = window.innerHeight - (y + elRect.height + gap)

    if (spaceRight < 0) left = x - elRect.width - gap
    if (spaceBottom < 0) top = y - elRect.height - gap

    left = Math.min(Math.max(left, gap), window.innerWidth - elRect.width - gap)
    top = Math.min(Math.max(top, gap), window.innerHeight - elRect.height - gap)

    setPos({ left, top })
  }, [location, visible])

  // Click outside logic
  useEffect(() => {
    if (!visible) return

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        hideModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [visible, hideModal])

  return (
    <div className="modal-container">
      {visible && (
        <div
          ref={modalRef}
          className="modal-content"
          style={{
            left: pos.left,
            top: pos.top,
          }}
        >
          {content}
        </div>
      )}
    </div>
  )
}
