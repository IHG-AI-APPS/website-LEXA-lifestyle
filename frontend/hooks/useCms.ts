'use client'

import { useState, useEffect, useCallback } from 'react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

const cache: Record<string, { data: any; ts: number }> = {}
const fetchDone: Record<string, boolean> = {}
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

    let cancelled = false
    const controller = new AbortController()

    fetch(`${BACKEND_URL}/api/cms/sections/${key}`, { signal: controller.signal })
      .then(r => r.json())
      .then(d => {
        if (cancelled) return
        fetchDone[key] = true
        if (d?.value) {
          cache[key] = { data: d.value, ts: Date.now() }
          setData(d.value as T)
        } else {
          cache[key] = { data: null, ts: Date.now() }
        }
      })
      .catch(() => { if (!cancelled) fetchDone[key] = true })

    return () => { cancelled = true; controller.abort() }
  }, [key])

  return data
}

// Check if CMS fetch is done and returned no data (useful for auto-seeding)
export function isCmsEmpty(key: string): boolean {
  return !!fetchDone[key] && cache[key]?.data === null
}

// Seed defaults to CMS (idempotent - only creates if not exists)
export async function seedCmsDefaults(key: string, defaults: any): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/cms/register-defaults`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, defaults })
    })
    if (res.ok) {
      const d = await res.json()
      if (d.created) {
        // Update local cache with the seeded data
        cache[key] = { data: defaults, ts: Date.now() }
        return true
      }
    }
    return false
  } catch { return false }
}

export function useCmsBulk(keys: string[]): Record<string, any> {
  const [data, setData] = useState<Record<string, any>>({})
  const keysStr = keys.join(',')

  useEffect(() => {
    if (!keys.length) return
    let cancelled = false
    const controller = new AbortController()

    fetch(`${BACKEND_URL}/api/cms/sections?keys=${keysStr}`, { signal: controller.signal })
      .then(r => r.json())
      .then(d => {
        if (cancelled) return
        if (d && typeof d === 'object') {
          Object.entries(d).forEach(([k, v]) => {
            cache[k] = { data: v, ts: Date.now() }
          })
          setData(d)
        }
      })
      .catch(() => {})

    return () => { cancelled = true; controller.abort() }
  }, [keysStr])

  return data
}
