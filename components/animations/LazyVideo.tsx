'use client'

import { useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
}

export default function LazyVideo({ src, poster, className, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(videoRef, { margin: '200px' })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView) {
      video.play().catch((error) => {
        // Autoplay might be blocked by browser or if the video is already playing
        if (error.name !== 'AbortError') {
          console.warn('Video playback failed:', error)
        }
      })
    } else {
      video.pause()
    }
  }, [isInView])

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      preload="metadata"
      muted
      playsInline
      loop
      {...props}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
