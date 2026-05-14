"use client"

import { useLanguage } from "@/components/language-provider"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react"

const videos = [
  { src: "/videos/video1.mp4" },
  { src: "/videos/video2.mp4" },
  { src: "/videos/video3.mp4" },
]

export default function ReviewsSection() {
  const { lang } = useLanguage()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [mutedMap, setMutedMap] = useState<Record<number, boolean>>({})

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const pauseAllExcept = useCallback((keepIndex: number) => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== keepIndex) {
        v.pause()
      }
    })
  }, [])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
    const selected = emblaApi.selectedScrollSnap()
    videoRefs.current.forEach((v, i) => {
      if (v && i !== selected) v.pause()
    })
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  const handlePlay = (index: number) => {
    pauseAllExcept(index)
  }

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return
    video.muted = !video.muted
    setMutedMap((prev) => ({ ...prev, [index]: video.muted }))
  }

  return (
    <section className="py-20 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ED3D4E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2463] mb-5 text-balance">
            {lang === 'ru' ? 'Видеоотзывы наших клиентов' : 'Биздин кардарлардын видео сын-пикирлери'}
          </h2>
          <p className="text-gray-500 text-lg">
            {lang === 'ru' ? 'Что говорят родители о наших тренировках' : 'Биздин машыгуулар жөнүндө ата-энелер эмне дешет'}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
            <div className="flex -ml-4">
              {videos.map((video, index) => (
                <div className="flex-none pl-4 min-w-[280px] w-full sm:w-[80%] md:w-1/2 lg:w-1/3" key={index}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300">
                    <div className="relative w-full aspect-[9/16] bg-gray-100">
                      <video
                        ref={(el) => { videoRefs.current[index] = el }}
                        src={video.src}
                        className="w-full h-full object-cover"
                        playsInline
                        loop
                        controls
                        preload="metadata"
                        onPlay={() => handlePlay(index)}
                        onVolumeChange={() => {
                          const v = videoRefs.current[index]
                          if (v) setMutedMap((prev) => ({ ...prev, [index]: v.muted }))
                        }}
                      />
                      <button
                        onClick={() => toggleMute(index)}
                        className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                        aria-label={mutedMap[index] ? "Unmute" : "Mute"}
                      >
                        {mutedMap[index] ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="hidden sm:flex absolute -left-8 lg:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-[#0A2463] hover:bg-gray-50 z-10 transition-transform hover:scale-105 border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="hidden sm:flex absolute -right-8 lg:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-[#0A2463] hover:bg-gray-50 z-10 transition-transform hover:scale-105 border border-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
