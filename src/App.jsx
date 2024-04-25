import React, { useRef, useState } from 'react'
import { useEffect } from 'react'

const App = () => {
  const [toggle, setToggle] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const startStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true
      }).then((stream) => {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmedata = () => videoRef.current.play()
      }).catch((err) => {
        alert(err)
      })
  }


  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().map((el) => el?.stop())
    }
  }
  useEffect(() => {
    stopStream()
    if (toggle) startStream()
  }, [toggle])
  return (
    <>
      <div className="wrapper">
        <video style={{ display: toggle ? 'block' : 'none' }} ref={videoRef} muted autoPlay playsInline ></video>
        <div className="boshqaruv">
          <button onClick={() => setToggle((prev) => !prev)}>{toggle ? 'OFF' : 'ON'}</button>
        </div>
      </div>
    </>
  )
}

export default App