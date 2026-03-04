// Procedural Ambient Soundscape Engine — Web Audio API
// Generates unique ambient audio for each virtual tour zone with smooth crossfades

type ZoneSoundProfile = {
  baseFreq: number
  harmonics: number[]
  noiseType: 'brown' | 'pink' | 'white'
  noiseLevel: number
  pulseRate?: number
  pulseDepth?: number
  shimmerFreq?: number
  reverbDecay: number
  masterVolume: number
}

const ZONE_PROFILES: ZoneSoundProfile[] = [
  // Zone 0: Smart Home Showcase — warm electronic ambient, gentle beeps
  {
    baseFreq: 80,
    harmonics: [1, 0.5, 0.25, 0.12],
    noiseType: 'brown',
    noiseLevel: 0.03,
    pulseRate: 0.15,
    pulseDepth: 0.3,
    shimmerFreq: 2400,
    reverbDecay: 3,
    masterVolume: 0.12,
  },
  // Zone 1: Home Cinema — deep bass drone, cinematic sub
  {
    baseFreq: 45,
    harmonics: [1, 0.7, 0.3, 0.15, 0.08],
    noiseType: 'brown',
    noiseLevel: 0.04,
    pulseRate: 0.08,
    pulseDepth: 0.5,
    reverbDecay: 5,
    masterVolume: 0.14,
  },
  // Zone 2: Brand Gallery — elegant minimal, soft reverb wash
  {
    baseFreq: 220,
    harmonics: [1, 0.3, 0.1],
    noiseType: 'pink',
    noiseLevel: 0.02,
    shimmerFreq: 3200,
    reverbDecay: 4,
    masterVolume: 0.08,
  },
  // Zone 3: Audio Hi-Fi — warm analog tone, vinyl warmth
  {
    baseFreq: 110,
    harmonics: [1, 0.6, 0.35, 0.2, 0.1],
    noiseType: 'pink',
    noiseLevel: 0.025,
    pulseRate: 0.5,
    pulseDepth: 0.15,
    shimmerFreq: 1800,
    reverbDecay: 3.5,
    masterVolume: 0.10,
  },
  // Zone 4: Lighting Studio — ethereal shimmer pad
  {
    baseFreq: 165,
    harmonics: [1, 0.4, 0.15, 0.05],
    noiseType: 'white',
    noiseLevel: 0.015,
    shimmerFreq: 4000,
    pulseRate: 0.2,
    pulseDepth: 0.4,
    reverbDecay: 6,
    masterVolume: 0.09,
  },
  // Zone 5: Security Hub — digital tech ambiance, scanning pulses
  {
    baseFreq: 60,
    harmonics: [1, 0.3, 0.5, 0.1],
    noiseType: 'white',
    noiseLevel: 0.02,
    pulseRate: 1.2,
    pulseDepth: 0.6,
    shimmerFreq: 5000,
    reverbDecay: 2,
    masterVolume: 0.10,
  },
]

export class AmbientSoundEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private activeNodes: AudioNode[] = []
  private activeOscillators: OscillatorNode[] = []
  private currentZone = -1
  private isMuted = true
  private fadeTime = 1.5

  async init() {
    if (this.ctx) return
    this.ctx = new AudioContext()
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 0
    this.masterGain.connect(this.ctx.destination)
  }

  private createBrownNoise(ctx: AudioContext): AudioNode {
    const bufferSize = 2 * ctx.sampleRate
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      data[i] = (lastOut + 0.02 * white) / 1.02
      lastOut = data[i]
      data[i] *= 3.5
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true
    source.start()
    return source
  }

  private createPinkNoise(ctx: AudioContext): AudioNode {
    const bufferSize = 2 * ctx.sampleRate
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      data[i] *= 0.11
      b6 = white * 0.115926
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true
    source.start()
    return source
  }

  private createWhiteNoise(ctx: AudioContext): AudioNode {
    const bufferSize = 2 * ctx.sampleRate
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true
    source.start()
    return source
  }

  private stopAllNodes() {
    for (const osc of this.activeOscillators) {
      try { osc.stop() } catch {}
    }
    for (const node of this.activeNodes) {
      try { node.disconnect() } catch {}
    }
    this.activeNodes = []
    this.activeOscillators = []
  }

  async playZone(zoneIndex: number) {
    if (!this.ctx || !this.masterGain) await this.init()
    if (!this.ctx || !this.masterGain) return
    if (zoneIndex === this.currentZone) return
    if (this.ctx.state === 'suspended') await this.ctx.resume()

    const profile = ZONE_PROFILES[zoneIndex]
    if (!profile) return

    // Fade out current
    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.linearRampToValueAtTime(0, now + this.fadeTime * 0.6)

    // After fade out, swap sounds
    setTimeout(() => {
      if (!this.ctx || !this.masterGain) return
      this.stopAllNodes()

      const mixBus = this.ctx.createGain()
      mixBus.gain.value = 1
      mixBus.connect(this.masterGain)
      this.activeNodes.push(mixBus)

      // Base tone with harmonics
      profile.harmonics.forEach((amp, i) => {
        const osc = this.ctx!.createOscillator()
        osc.type = i === 0 ? 'sine' : 'triangle'
        osc.frequency.value = profile.baseFreq * (i + 1)

        const gain = this.ctx!.createGain()
        gain.gain.value = amp * 0.15

        // LFO modulation for organic feel
        if (profile.pulseRate && profile.pulseDepth) {
          const lfo = this.ctx!.createOscillator()
          lfo.type = 'sine'
          lfo.frequency.value = profile.pulseRate + i * 0.03
          const lfoGain = this.ctx!.createGain()
          lfoGain.gain.value = amp * 0.15 * profile.pulseDepth
          lfo.connect(lfoGain)
          lfoGain.connect(gain.gain)
          lfo.start()
          this.activeOscillators.push(lfo)
          this.activeNodes.push(lfoGain)
        }

        osc.connect(gain)
        gain.connect(mixBus)
        osc.start()
        this.activeOscillators.push(osc)
        this.activeNodes.push(gain)
      })

      // Filtered noise layer
      let noise: AudioNode
      if (profile.noiseType === 'brown') noise = this.createBrownNoise(this.ctx!)
      else if (profile.noiseType === 'pink') noise = this.createPinkNoise(this.ctx!)
      else noise = this.createWhiteNoise(this.ctx!)

      const noiseFilter = this.ctx!.createBiquadFilter()
      noiseFilter.type = 'lowpass'
      noiseFilter.frequency.value = 800
      noiseFilter.Q.value = 0.7

      const noiseGain = this.ctx!.createGain()
      noiseGain.gain.value = profile.noiseLevel

      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(mixBus)
      this.activeNodes.push(noise, noiseFilter, noiseGain)

      // Shimmer layer (high-frequency texture)
      if (profile.shimmerFreq) {
        const shimmer = this.ctx!.createOscillator()
        shimmer.type = 'sine'
        shimmer.frequency.value = profile.shimmerFreq

        const shimmerLfo = this.ctx!.createOscillator()
        shimmerLfo.type = 'sine'
        shimmerLfo.frequency.value = 0.1

        const shimmerGain = this.ctx!.createGain()
        shimmerGain.gain.value = 0

        const shimmerLfoGain = this.ctx!.createGain()
        shimmerLfoGain.gain.value = 0.008

        shimmerLfo.connect(shimmerLfoGain)
        shimmerLfoGain.connect(shimmerGain.gain)
        shimmer.connect(shimmerGain)
        shimmerGain.connect(mixBus)

        shimmer.start()
        shimmerLfo.start()
        this.activeOscillators.push(shimmer, shimmerLfo)
        this.activeNodes.push(shimmerGain, shimmerLfoGain)
      }

      // Fade in new zone
      const t = this.ctx!.currentTime
      const vol = this.isMuted ? 0 : profile.masterVolume
      this.masterGain.gain.cancelScheduledValues(t)
      this.masterGain.gain.setValueAtTime(0, t)
      this.masterGain.gain.linearRampToValueAtTime(vol, t + this.fadeTime)

      this.currentZone = zoneIndex
    }, this.fadeTime * 600)
  }

  setMuted(muted: boolean) {
    this.isMuted = muted
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    const profile = ZONE_PROFILES[this.currentZone]
    const target = muted ? 0 : (profile?.masterVolume ?? 0.1)
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.linearRampToValueAtTime(target, now + 0.5)
  }

  destroy() {
    this.stopAllNodes()
    if (this.masterGain) { try { this.masterGain.disconnect() } catch {} }
    if (this.ctx) { this.ctx.close().catch(() => {}) }
    this.ctx = null
    this.masterGain = null
    this.currentZone = -1
  }
}
