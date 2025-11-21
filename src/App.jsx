import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import * as THREE from 'three'

function App() {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // A tiny three.js touch: create a sea-toned color we reuse for glow
    const ocean = new THREE.Color('#2eb3ff')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      headingRef.current,
      { y: 40, opacity: 0, filter: 'blur(6px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1 }
    )
      .fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )

    // Accent glow pulse
    gsap.to(headingRef.current, {
      textShadow: `0 0 24px ${ocean.getStyle()}`,
      repeat: -1,
      yoyo: true,
      duration: 2.2,
      ease: 'sine.inOut'
    })
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* 3D Ocean Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/poZi6bJ4-Htwt04i/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient haze above the ocean for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent" />

      {/* Content */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-sky-400/20 ring-1 ring-sky-300/30 backdrop-blur-sm flex items-center justify-center">
            <span className="text-sky-300 text-xl">🏝️</span>
          </div>
          <span className="text-sky-100 font-semibold tracking-wide">Island Hopper</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-slate-200/90">
          <a href="#destinations" className="hover:text-white transition-colors">Destinations</a>
          <a href="#tours" className="hover:text-white transition-colors">Tours</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center">
        <div className="px-6 sm:px-10 w-full">
          <div className="max-w-3xl">
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_40px_rgba(56,189,248,0.35)]"
            >
              Sail to serene islands, cast lines at dawn, and feel the ocean breathe
            </h1>

            <p ref={subRef} className="mt-5 text-lg sm:text-xl text-slate-200/90 max-w-2xl">
              A cinematic travel hero with a realistic island scene: rocking boat, calm waves, and a lone fisher—crafted with Three.js (via Spline) and animated overlays with GSAP.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
              <a
                href="#explore"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-sky-400 text-slate-900 font-semibold shadow-[0_10px_30px_rgba(56,189,248,0.45)] hover:shadow-[0_14px_40px_rgba(56,189,248,0.6)] transition-shadow"
              >
                Explore trips
              </a>
              <a
                href="#video"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15 backdrop-blur-sm"
              >
                Watch teaser
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
