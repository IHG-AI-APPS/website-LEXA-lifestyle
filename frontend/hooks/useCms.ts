'use client'

import { useState, useEffect } from 'react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

const cache: Record<string, { data: any; ts: number }> = {}
const CACHE_TTL = 60000 // 1 min client-side cache

export function useCms<T = any>(key: string, fallback: T): T {
  const [data, setData] = useState<T>(() => {
    const cached = cache[key]
    if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data as T
    return fallback
  })

  useEffect(() => {
    if (!key || key === '_noop_') return
    const cached = cache[key]
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setData(cached.data as T)
      return
    }

    fetch(`${BACKEND_URL}/api/cms/sections/${key}`)
      .then(r => r.json())
      .then(d => {
        if (d?.value) {
          cache[key] = { data: d.value, ts: Date.now() }
          setData(d.value as T)
        }
      })
      .catch(() => {})
  }, [key])

  return data
}

export function useCmsBulk(keys: string[]): Record<string, any> {
  const [data, setData] = useState<Record<string, any>>({})

  useEffect(() => {
    if (!keys.length) return
    const keysStr = keys.join(',')
    fetch(`${BACKEND_URL}/api/cms/sections?keys=${keysStr}`)
      .then(r => r.json())
      .then(d => {
        if (d && typeof d === 'object') {
          Object.entries(d).forEach(([k, v]) => {
            cache[k] = { data: v, ts: Date.now() }
          })
          setData(d)
        }
      })
      .catch(() => {})
  }, [keys.join(',')])

  return data
}
