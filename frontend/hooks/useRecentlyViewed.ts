'use client'

import { useState, useEffect, useCallback } from 'react'

export interface RecentlyViewedItem {
  id: string
  type: 'solution' | 'project' | 'service' | 'package'
  slug: string
  title: string
  image?: string
  category?: string
  timestamp: number
}

const STORAGE_KEY = 'lexa-recently-viewed'
const MAX_ITEMS = 8

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentlyViewedItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as RecentlyViewedItem[]
        // Filter out items older than 30 days
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
        const validItems = parsed.filter(item => item.timestamp > thirtyDaysAgo)
        setItems(validItems)
        
        // Update storage if items were filtered
        if (validItems.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(validItems))
        }
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error)
    }
    setIsLoaded(true)
  }, [])

  // Add item to recently viewed
  const addItem = useCallback((item: Omit<RecentlyViewedItem, 'timestamp'>) => {
    setItems(prevItems => {
      // Remove existing item with same id and type
      const filtered = prevItems.filter(
        existing => !(existing.id === item.id && existing.type === item.type)
      )
      
      // Add new item at the beginning
      const newItem: RecentlyViewedItem = {
        ...item,
        timestamp: Date.now()
      }
      
      const updated = [newItem, ...filtered].slice(0, MAX_ITEMS)
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error('Error saving recently viewed:', error)
      }
      
      return updated
    })
  }, [])

  // Remove item
  const removeItem = useCallback((id: string, type: string) => {
    setItems(prevItems => {
      const updated = prevItems.filter(
        item => !(item.id === id && item.type === type)
      )
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error('Error saving recently viewed:', error)
      }
      
      return updated
    })
  }, [])

  // Clear all
  const clearAll = useCallback(() => {
    setItems([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing recently viewed:', error)
    }
  }, [])

  return {
    items,
    isLoaded,
    addItem,
    removeItem,
    clearAll
  }
}
