import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import * as THREE from 'three'

function App() {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  const fishRefs = useRef([])
  const boatRef = useRef(null)
  const islandLeftRef = useRef(null)
  const islandRightRef = useRef(null)

  // helper to assign refs for list items
  const setFishRef = (el, i) => {
    fishRefs.current[i] = el
  }

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

    // Parallax sway for islands
    gsap.to([islandLeftRef.current, islandRightRef.current], {
      y: 6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Gentle boat bob + slight drift
    if (boatRef.current) {
      gsap.to(boatRef.current, {
        y: '-=10',
        rotation: -2,
        transformOrigin: '50% 50%',
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
      gsap.to(boatRef.current, {
        x: '+=12',
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    }

    // School of fish swimming across the hero
    fishRefs.current.forEach((fish, idx) => {
      if (!fish) return
      const startX = -200
      const endX = window.innerWidth + 200
      const baseY = 120 + (idx % 5) * 40 + Math.random() * 40
      gsap.set(fish, { x: startX, y: baseY, opacity: 0.85 + Math.random() * 0.15, scale: 0.7 + Math.random() * 0.8 })

      const swim = () => {
        gsap.fromTo(
          fish,
          { x: startX, rotation: 0 },
          {
            x: endX,
            duration: 10 + Math.random() * 6,
            ease: 'sine.inOut',
            onComplete: () => {
              // reset with a new depth and small vertical wander
              gsap.set(fish, { x: startX, y: baseY + (Math.random() * 60 - 30) })
              swim()
            }
          }
        )
        // a subtle tail wiggle
        gsap.to(fish, {
          rotation: 4,
          duration: 0.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 10
        })
      }
      // small stagger
      gsap.delayedCall(Math.random() * 2, swim)
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

      {/* Foreground decorative islands */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]">
        {/* Left island */}
        <svg ref={islandLeftRef} className="absolute left-[-10%] bottom-[-2%] w-[46vw] max-w-[560px] opacity-70" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="islL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9"/>
            </linearGradient>
          </defs>
          <path d="M0 180 C 90 120, 160 120, 260 170 C 330 200, 430 190, 520 170 L 600 220 L 0 220 Z" fill="url(#islL)"/>
          {/* palms silhouette */}
          <path d="M120 130 c10 -30 40 -30 50 0 c-20 -10 -40 0 -50 0 Z" fill="#0ea5e9" opacity="0.55"/>
          <rect x="135" y="130" width="6" height="40" rx="2" fill="#0ea5e9" opacity="0.6"/>
          <path d="M160 140 c8 -26 30 -26 40 0 c-16 -10 -28 0 -40 0 Z" fill="#38bdf8" opacity="0.45"/>
          <rect x="170" y="140" width="5" height="32" rx="2" fill="#38bdf8" opacity="0.5"/>
        </svg>

        {/* Right island */}
        <svg ref={islandRightRef} className="absolute right-[-8%] bottom-[-1%] w-[40vw] max-w-[500px] opacity-70" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="islR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.85"/>
            </linearGradient>
          </defs>
          <path d="M0 190 C 80 150, 180 140, 260 175 C 340 210, 430 200, 520 175 L 600 220 L 0 220 Z" fill="url(#islR)"/>
          <path d="M420 150 c12 -28 36 -28 48 0 c-18 -10 -34 0 -48 0 Z" fill="#22d3ee" opacity="0.55"/>
          <rect x="432" y="150" width="6" height="34" rx="2" fill="#22d3ee" opacity="0.6"/>
        </svg>
      </div>

      {/* Small foreground boat */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-28 sm:bottom-32 md:bottom-40 z-10">
        <svg ref={boatRef} className="w-40 sm:w-48 md:w-56" viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* hull */}
          <path d="M10 80 L220 80 C220 80 200 110 130 110 C60 110 30 95 10 80 Z" fill="#083344"/>
          {/* deck */}
          <rect x="60" y="50" width="90" height="18" rx="4" fill="#0ea5e9"/>
          {/* mast & sail */}
          <rect x="105" y="20" width="4" height="30" rx="2" fill="#94e7ff"/>
          <path d="M109 22 L150 45 L109 45 Z" fill="#e0f2fe" opacity="0.9"/>
          {/* fisher silhouette */}
          <circle cx="85" cy="58" r="6" fill="#e2e8f0" opacity="0.9"/>
          <rect x="80" y="64" width="10" height="6" rx="2" fill="#e2e8f0" opacity="0.9"/>
          {/* fishing line */}
          <path d="M115 38 C 150 50, 170 70, 180 95" stroke="#e0f2fe" strokeWidth="2" opacity="0.8"/>
        </svg>
      </div>

      {/* Swimming fishes layer */}
      <div className="pointer-events-none absolute inset-0 z-[6]">
        {[...Array(10)].map((_, i) => (
          <svg
            key={i}
            ref={(el) => setFishRef(el, i)}
            className="absolute top-1/3 w-8 sm:w-10 md:w-12 opacity-90"
            viewBox="0 0 64 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* body */}
            <ellipse cx="20" cy="16" rx="14" ry="8" fill="#e0f2fe" />
            {/* tail */}
            <path d="M34 16 L54 8 L54 24 Z" fill="#bae6fd" />
            {/* eye */}
            <circle cx="16" cy="14" r="2" fill="#0c4a6e" />
            {/* highlight */}
            <ellipse cx="24" cy="13" rx="4" ry="2" fill="#ffffff" opacity="0.5" />
          </svg>
        ))}
      </div>

      {/* Content */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-6">
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

      <main className="relative z-20 flex min-h-[calc(100vh-80px)] items-center">
        <div className="px-6 sm:px-10 w-full">
          <div className="max-w-3xl">
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_40px_rgba(56,189,248,0.35)]"
            >
              Sail to serene islands, cast lines at dawn, and feel the ocean breathe
            </h1>

            <p ref={subRef} className="mt-5 text-lg sm:text-xl text-slate-200/90 max-w-2xl">
              A cinematic travel hero with more islands, a gentle boat, and a school of fish gliding beneath—built on a Spline ocean with GSAP motion.
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
