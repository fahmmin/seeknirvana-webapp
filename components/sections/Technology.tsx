'use client'

import { motion } from 'framer-motion'
import { Cpu, Activity, Thermometer, Waves, Bluetooth, Battery } from 'lucide-react'
import FadeIn from '../animations/FadeIn'

const specs = [
  {
    icon: Activity,
    title: 'HRV Sensor',
    value: '512Hz',
    description: 'High-frequency heart rate variability — your coherence in real time, before your mind registers it.',
  },
  {
    icon: Waves,
    title: 'Accelerometer',
    value: '3-Axis',
    description: 'Detects micro-movements and sleep position changes with exceptional sensitivity.',
  },
  {
    icon: Thermometer,
    title: 'Temperature',
    value: '±0.1°C',
    description: 'Skin temperature monitoring for illness detection and cycle tracking.',
  },
  {
    icon: Bluetooth,
    title: 'Connectivity',
    value: 'BLE 5.2',
    description: 'Low-energy Bluetooth for seamless app synchronisation and firmware updates.',
  },
  {
    icon: Battery,
    title: 'Battery Life',
    value: '7 Days',
    description: 'One hour of charge, seven days of continuous sensing.',
  },
  {
    icon: Cpu,
    title: 'AI Engine',
    value: 'Edge AI',
    description: 'On-device ML runs privately on the ring — your patterns decoded for your growth, not a cloud.',
  },
]

export default function Technology() {
  return (
    <section id="technology" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-nirvana-cyan/5 via-transparent to-nirvana-purple/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-20">
          <span className="text-nirvana-cyan text-sm tracking-widest uppercase mb-4 block">
            Hardware for the Intention Economy
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Intention </span>
            <span className="gradient-text">Hardware</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/60">
            Each sensor is a tool of self-sovereignty — measuring the biological signals that algorithms exploit, so <em>you</em> can read them first.
          </p>
        </FadeIn>

        {/* Tech Visualization */}
        <FadeIn delay={0.2} className="mb-20">
          <div className="relative max-w-4xl mx-auto">
            {/* Central Ring Display */}
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Outer Glow Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border border-nirvana-cyan/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-nirvana-cyan/40"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateX(180px) translateY(-50%)`,
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                className="absolute inset-8 rounded-full border border-nirvana-jade/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div
                className="absolute inset-16 rounded-full border border-nirvana-gold/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* Center Logo */}
              <motion.div 
                className="absolute inset-24 rounded-full overflow-hidden bg-nirvana-dark border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <img
                  src="/images/SeekNirvana_Logo.png"
                  alt="Seek Nirvana"
                  className="w-full h-full object-cover scale-125"
                />
              </motion.div>

              {/* Sensor Points */}
              {[
                { angle: 0, label: 'HRV', color: 'bg-nirvana-cyan' },
                { angle: 120, label: 'TEMP', color: 'bg-nirvana-jade' },
                { angle: 240, label: 'ACC', color: 'bg-nirvana-gold' },
              ].map((sensor) => (
                <motion.div
                  key={sensor.label}
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${sensor.color}`}
                    style={{
                      transform: `rotate(${sensor.angle}deg) translateX(100px)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specs.map((spec, index) => (
            <FadeIn key={spec.title} delay={index * 0.1} className="h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group p-6 rounded-xl glass-card h-full"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-nirvana-cyan/10 flex items-center justify-center flex-shrink-0">
                    <spec.icon className="w-5 h-5 text-nirvana-cyan" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-white font-medium">{spec.title}</h3>
                      <span className="text-nirvana-cyan text-sm font-mono">{spec.value}</span>
                    </div>
                    <p className="text-white/50 text-sm">{spec.description}</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
